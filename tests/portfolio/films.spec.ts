import { test, expect } from '@playwright/test';
import { readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const captures = process.env.FILM_QA_OUTPUT || 'artifacts/interface-films/browser';
const cache = process.env.PORTFOLIO_FONT_CACHE;
const projectSlugs = ['baghban','plant-health-clinic','treat-my-fish','skiie','trace-amp','kashcrop'];

test.beforeEach(async ({ context, baseURL }) => {
 const origin = new URL(baseURL!).origin;
 const manifest = cache ? JSON.parse(await readFile(path.join(cache,'manifest.json'),'utf8')) : undefined;
 await context.route('**/*', async route => {
  const url=route.request().url(), parsed=new URL(url);
  if (parsed.origin === origin || ['data:','blob:'].includes(parsed.protocol)) return route.continue();
  if(parsed.hostname==='fonts.googleapis.com') return route.fulfill({contentType:'text/css',body:cache ? await readFile(path.join(cache,'fonts.css'),'utf8') : ''});
  if(cache && manifest.assets[url]) return route.fulfill({contentType:'font/woff2',body:await readFile(path.join(cache,manifest.assets[url]))});
  return route.abort();
 });
 await mkdir(captures,{recursive:true});
});
async function assertPlaying(page: import('@playwright/test').Page, selector: string) {
 await expect.poll(()=>page.locator(selector).evaluate((e:HTMLVideoElement)=>e.readyState>=3 && !e.paused && e.currentTime>.15)).toBe(true);
 const state=await page.locator(selector).evaluate((e:HTMLVideoElement)=>({width:e.videoWidth,height:e.videoHeight,muted:e.muted,inline:e.playsInline,loop:e.loop,error:e.error?.message??null}));
 expect(state.muted).toBe(true); expect(state.inline).toBe(true); expect(state.loop).toBe(true); expect(state.error).toBeNull();
 expect(state.width).toBeGreaterThan(0); expect(state.height).toBeGreaterThan(0);
 return state;
}
test('hero selection releases the previous decoder; manual pause and play work', async ({ page }) => {
 await page.goto('/');
 await assertPlaying(page,'#scene-garden video');
 await expect(page.locator('video[src]')).toHaveCount(1);
 const hero=page.locator('#product-stage');
 await hero.getByRole('button',{name:'Pause Baghban film'}).click();
 await expect(page.locator('video[src]')).toHaveCount(0);
 await hero.getByRole('button',{name:'Play Baghban film'}).click();
 await assertPlaying(page,'#scene-garden video');
 await page.getByRole('tab',{name:/Plant Health Clinic/}).click();
 await assertPlaying(page,'#scene-phc video');
 await expect(page.locator('#scene-garden video')).not.toHaveAttribute('src');
 await expect(page.locator('video[src]')).toHaveCount(1);
 await page.getByRole('button',{name:'Front view',exact:true}).click();
 await expect(hero).toHaveAttribute('data-pose','flat');
 expect(await page.locator('a button,a input,a a').count()).toBe(0);
});
test('offscreen and hidden-document players release their source', async ({ page }) => {
 await page.goto('/'); await assertPlaying(page,'#scene-garden video');
 await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));});
 await expect(page.locator('video[src]')).toHaveCount(0);
 await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:false});document.dispatchEvent(new Event('visibilitychange'));});
 await assertPlaying(page,'#scene-garden video');
 await page.locator('footer.contact-section').scrollIntoViewIfNeeded();
 await expect(page.locator('video[src]')).toHaveCount(0);
});
test('all six project films play and preserve visible posters and static details', async ({ page }) => {
 for (const slug of projectSlugs) {
  await page.goto('/projects/'+slug);
  await expect(page.locator('main h1')).toBeVisible();
  const state=await assertPlaying(page,'.project-detail-hero video');
  expect(state.width).toBe(1920);expect(state.height).toBe(1080);
  expect(await page.locator('.film-poster').evaluate((e:HTMLImageElement)=>e.complete&&e.naturalWidth>0)).toBe(true);
  await page.getByText('About this interface film',{exact:true}).click();
  await expect(page.locator('.project-film-note')).toContainText('Synthetic demonstration');
  await expect(page.locator('.project-narrative')).toBeVisible();
 }
});
test('reel takes over only when its narrative room enters the viewport', async ({ page }) => {
 await page.goto('/');
 await expect(page.locator('[data-film=portfolio-reel] video')).not.toHaveAttribute('src');
 await page.locator('.portfolio-film-room').scrollIntoViewIfNeeded();
 await assertPlaying(page,'[data-film=portfolio-reel] video');
 await expect(page.locator('video[src]')).toHaveCount(1);
 await expect(page.locator('#scene-garden video')).not.toHaveAttribute('src');
 await page.locator('.portfolio-film-room').screenshot({path:path.join(captures,'reel-desktop.png')});
});
test('reduced motion and save-data issue no MP4 requests', async ({ page }) => {
 const requests:string[]=[];page.on('request',r=>{if(r.url().includes('.mp4'))requests.push(r.url());});
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/');await page.locator('.portfolio-film-room').scrollIntoViewIfNeeded();
 await expect(page.locator('video[src]')).toHaveCount(0);
 expect(requests).toEqual([]);
 await page.goto('about:blank');
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.addInitScript(()=>Object.defineProperty(navigator,'connection',{configurable:true,value:Object.assign(new EventTarget(),{saveData:true})}));
 await page.goto('/projects');
 await page.locator('.work-index-grid').scrollIntoViewIfNeeded();
 await expect(page.locator('video[src]')).toHaveCount(0);
 await expect(page.getByText('Data saving · still frame').first()).toBeVisible();
 expect(requests).toEqual([]);
});
test('a failed movie retains its real poster', async ({ page }) => {
 await page.route('**/media/projects/baghban/film-square.mp4',r=>r.fulfill({status:503,body:''}));
 await page.goto('/');
 await expect(page.locator('#scene-garden')).toContainText('Film unavailable · still frame');
 expect(await page.locator('#scene-garden .film-poster').evaluate((e:HTMLImageElement)=>e.complete&&e.naturalWidth>0)).toBe(true);
 await expect(page.locator('#scene-garden video')).not.toHaveAttribute('src');
});
for(const width of [320,390,820,1440]) test('film rooms fit and preserve controls at '+width+'px',async({page})=>{
 await page.setViewportSize({width,height:width<800?844:1000});
 await page.goto('/'); await assertPlaying(page,'#scene-garden video');
 await page.evaluate(()=>document.fonts.ready);
 const media=await page.locator('#scene-garden .interface-film').boundingBox(),stage=await page.locator('#product-stage').boundingBox(),top=await page.locator('.stage-top').boundingBox(),bottom=await page.locator('.stage-bottom').boundingBox();
 expect(media!.y).toBeGreaterThanOrEqual(top!.y+top!.height-2);
 expect(media!.y+media!.height).toBeLessThanOrEqual(bottom!.y+2);
 expect(media!.x).toBeGreaterThanOrEqual(stage!.x);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.screenshot({path:path.join(captures,'hero-'+width+'.png'),fullPage:false});
 await page.goto('/projects/skiie');await assertPlaying(page,'.project-detail-hero video');
 await page.screenshot({path:path.join(captures,'detail-'+width+'.png'),fullPage:false});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('server HTML includes posters and no MP4 sources without JavaScript',async({browser,baseURL})=>{
 const context=await browser.newContext({javaScriptEnabled:false,baseURL,reducedMotion:'reduce'});
 const page=await context.newPage();
 await page.route('**/*',r=>new URL(r.request().url()).origin===new URL(baseURL!).origin?r.continue():r.fulfill({status:200,body:''}));
 await page.goto('/');
 await expect(page.locator('#scene-garden .film-poster')).toBeVisible();
 await expect(page.locator('video[src]')).toHaveCount(0);
 await expect(page.locator('main h1')).toBeVisible();
 await context.close();
});

test('poster and playing film occupy the same layout footprint',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/projects/baghban');await page.evaluate(()=>document.fonts.ready);
 const film=page.locator('.project-detail-hero .interface-film'),before=await film.boundingBox();
 await page.emulateMedia({reducedMotion:'no-preference'});await assertPlaying(page,'.project-detail-hero video');
 const after=await film.boundingBox();
 expect(Math.abs(after!.height-before!.height)).toBeLessThan(1);
 expect(Math.abs(after!.width-before!.width)).toBeLessThan(1);
});
test('index play controls remain outside links and transfer the decoder',async({page})=>{
 await page.goto('/projects');
 await page.locator('.work-index-item').first().scrollIntoViewIfNeeded();
 await expect.poll(()=>page.locator('.work-index video[src]').count()).toBe(1);
 expect(await page.locator('.project-cover-link a button').count()).toBe(0);
 const candidates=page.locator('.work-index .film-toggle');
 const firstName=await candidates.nth(0).getAttribute('aria-label');
 const target=firstName?.startsWith('Play')?candidates.nth(0):candidates.nth(1);
 await target.click();
 await expect(page.locator('.work-index video[src]')).toHaveCount(1);
 await expect(target).toHaveAttribute('aria-label',/^Pause/);
});
test.describe('genuine phone films',()=>{
 test.use({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 test('all six phone films use the portrait source and readable artwork',async({page})=>{
  for(const slug of projectSlugs){
   await page.goto('/projects/'+slug);
   const frame=page.locator('.project-detail-hero .film-frame');
   await frame.scrollIntoViewIfNeeded();
   const state=await assertPlaying(page,'.project-detail-hero video');
   expect(state.width).toBeLessThan(state.height);
   await expect(page.locator('.project-detail-hero video')).toHaveAttribute('src',/film-mobile.mp4/);
   expect(await page.locator('.film-poster').evaluate((e:HTMLImageElement)=>e.currentSrc)).toContain('poster-mobile.webp');
   expect((await frame.boundingBox())!.width).toBeGreaterThan(300);
   await frame.screenshot({path:path.join(captures,slug+'-phone.png')});
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 });
});

test('service previews never nest media controls inside navigation links',async({page})=>{
 for(const route of ['/services','/services/full-stack-apps']){
  await page.goto(route);await expect(page.locator('html')).toHaveAttribute('data-motion','on');
  expect(await page.locator('a button').count(),route).toBe(0);
 }
});

test('film pages have no serious accessibility, runtime, or media-response failures',async({page})=>{
 const errors:string[]=[],responses:string[]=[];
 page.on('pageerror',error=>errors.push(error.message));
 page.on('response',response=>{if(response.status()>=400&&response.url().includes('/media/'))responses.push(response.status()+' '+response.url());});
 for(const route of ['/','/projects','/projects/baghban','/projects/plant-health-clinic','/projects/treat-my-fish','/projects/skiie','/projects/trace-amp','/projects/kashcrop']){
  await page.goto(route);await page.evaluate(()=>document.fonts.ready);
  await page.addScriptTag({path:'node_modules/axe-core/axe.min.js'});
  const serious=await page.evaluate(async()=>{const result=await (window as any).axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});return result.violations.filter((item:any)=>['serious','critical'].includes(item.impact)).map((item:any)=>({id:item.id,nodes:item.nodes.map((n:any)=>n.target)}));});
  expect(serious,route).toEqual([]);
  expect(await page.locator('video[src]').count()).toBeLessThanOrEqual(1);
 }
 expect(errors).toEqual([]);expect(responses).toEqual([]);
});
