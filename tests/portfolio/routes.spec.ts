import { test,expect } from '@playwright/test';
import { projects } from '../../app/data/portfolio/catalog';
import { serviceCatalog } from '../../app/data/portfolio/services';
const routes=['/','/projects','/services','/about','/contact','/privacy',...projects.map(p=>`/projects/${p.slug}`),...serviceCatalog.map(s=>`/services/${s.slug}`)];
for(const route of routes)test(`SSR, hydration and metadata: ${route}`,async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&/Hydration|Minified React|Warning:|Error:/.test(m.text()))errors.push(m.text());});
 const response=await page.goto(route);expect(response?.status()).toBe(200);
 await expect(page.locator('main h1')).toHaveCount(1);await expect(page.locator('main h1')).toBeVisible();await expect(page).toHaveTitle(/KashCrop/);await page.waitForTimeout(400);
 await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href','https://kashcrop.in'+route);await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content',/social-cover\.jpg$/);
 expect(errors).toEqual([]);expect(await page.locator('main').innerText()).not.toContain('Design exploration');
});
test('client-side navigation preserves the application rather than reloading the document',async({page})=>{
 await page.goto('/');await page.evaluate(()=>{(window as unknown as Record<string,string>).appMarker='preserved';});await page.getByRole('navigation',{name:'Main navigation',exact:true}).getByRole('link',{name:'Work'}).click();await expect(page).toHaveURL(/\/projects$/);expect(await page.evaluate(()=>(window as unknown as Record<string,string>).appMarker)).toBe('preserved');await expect(page.locator('main h1')).toBeFocused();
});
test('unknown routes and records return actual 404 responses',async({request})=>{for(const route of ['/nothing-here','/projects/unknown-record','/services/unknown-discipline']){const response=await request.get(route);expect(response.status()).toBe(404);expect(await response.text()).toContain('A little off');}});
test('legacy paths and project aliases redirect to canonical pages',async({request})=>{for(const [source,target]of [['/work','/projects'],['/studio','/about'],['/projects/skuast-plant-health-clinic','/projects/plant-health-clinic'],['/projects/garden-guardians','/projects/baghban']]){const response=await request.get(source,{maxRedirects:0});expect(response.status()).toBe(301);expect(response.headers().location).toBe(target);}});
test('sitemap and media are shipped by the actual build',async({request})=>{const sitemap=await request.get('/sitemap.xml');expect(sitemap.status()).toBe(200);const xml=await sitemap.text();for(const route of routes)expect(xml).toContain(`<loc>https://kashcrop.in${route}</loc>`);const image=await request.get('/media/portfolio/social-cover.jpg');expect(image.status()).toBe(200);expect(image.headers()['content-type']).toContain('image/jpeg');});
test('the core portfolio remains useful without JavaScript',async({browser,baseURL})=>{
 const context=await browser.newContext({javaScriptEnabled:false,baseURL});
 try {
  const page=await context.newPage();
  await page.goto('/');
  await expect(page.getByRole('heading',{name:'Good ideas. Beautifully built.'})).toBeVisible();
  await page.getByRole('link',{name:'Explore BaghBani',exact:true}).click();
  await expect(page).toHaveURL(/\/projects\/baghban\/?$/);
  await expect(page.getByRole('heading',{name:'BaghBani',exact:true})).toBeVisible();
  await page.goto('/contact');
  await expect(page.locator('form')).toHaveAttribute('action','https://api.web3forms.com/submit');
  expect(await page.locator('form').getAttribute('novalidate')).toBeNull();
 } finally {await context.close();}
});
