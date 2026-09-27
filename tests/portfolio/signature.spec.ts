import { test, expect } from '@playwright/test';

test('the new homepage has connected, substantial visual chapters', async ({ page }) => {
 const errors: string[] = []; page.on('pageerror', e => errors.push(e.message));
 await page.goto('/');
 await expect(page.locator('#hero-title')).toContainText('Good work.');
 for (const id of ['work','anatomy','care-story','craft','studio']) await expect(page.locator(`#${id}`)).toHaveCount(1);
 await expect(page.getByRole('button',{name:'Take the studio tour'})).toBeVisible();
 await expect(page.getByRole('heading',{name:'Beauty is the surface. The thinking goes deeper.'})).toBeAttached();
 expect(errors).toEqual([]);
});

test('product anatomy exposes all four layers and responds to keyboard control', async ({ page }) => {
 await page.goto('/'); await page.locator('#anatomy').scrollIntoViewIfNeeded();
 const tabs = page.getByRole('tablist',{name:'Explore the product layers'});
 await tabs.getByRole('tab',{name:/Workflow/}).click();
 await expect(page.locator('#anatomy-detail')).toContainText('What happens next.');
 await page.keyboard.press('End'); await expect(tabs.getByRole('tab',{name:/Infrastructure/})).toHaveAttribute('aria-selected','true');
 await expect(page.locator('#anatomy-detail')).toContainText('What holds it together.');
 await page.locator('#layer-separation').focus(); await page.keyboard.press('Home');
 await expect(page.locator('#layer-separation')).toHaveValue('0');
 await page.keyboard.press('End'); await expect(page.locator('#layer-separation')).toHaveValue('100');
 await expect(page.locator('.anatomy-visual-note')).toContainText('Illustrated internals');
});

test('Three.js enhances the real product view and is loaded below the fold', async ({ page }) => {
 const chunks: string[]=[];page.on('request',r=>{if(r.url().includes('AnatomyCanvas'))chunks.push(r.url());});
 await page.goto('/');await page.waitForTimeout(500);expect(chunks).toHaveLength(0);
 await page.locator('#anatomy').scrollIntoViewIfNeeded();
 await expect(page.locator('.anatomy-visual')).toHaveAttribute('data-renderer','webgl',{timeout:18000});
 const before=await page.locator('.anatomy-canvas').screenshot();
 await page.locator('#layer-separation').fill('100');await page.waitForTimeout(1600);
 const after=await page.locator('.anatomy-canvas').screenshot();expect(before.equals(after)).toBe(false);
 await page.goto('/about');await expect(page.locator('.anatomy-canvas')).toHaveCount(0);
});

test('WebGL failure retains the static view and usable semantic controls', async ({ page }) => {
 await page.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type:string,...args:unknown[]){if(type==='webgl'||type==='webgl2'||type==='experimental-webgl')return null;return original.apply(this,[type,...args] as never);} as typeof original;});
 await page.goto('/');await page.locator('#anatomy').scrollIntoViewIfNeeded();await page.waitForTimeout(1800);
 await expect(page.locator('.anatomy-visual')).toHaveAttribute('data-renderer','poster');
 await expect(page.locator('.anatomy-poster img')).toBeVisible();
 await page.getByRole('tab',{name:/Data What the system remembers/}).click();
 await expect(page.locator('#anatomy-detail')).toContainText('What the system remembers.');
});

test('the studio tour supports pause, all scenes, focus containment and close', async ({ page }) => {
 await page.goto('/');const trigger=page.getByRole('button',{name:'Take the studio tour'});await trigger.click();
 const tour=page.getByRole('dialog',{name:'The work, in focus.'});await expect(tour).toBeVisible();
 await page.getByRole('button',{name:'Pause tour'}).click();await expect(page.getByRole('button',{name:'Play tour'})).toBeVisible();
 await tour.getByRole('button',{name:/Plant Health Clinic/}).click();await expect(tour.locator('.tour-description h2')).toHaveText('Expertise, a little closer.');
 await tour.getByRole('button',{name:/SKIIE/}).click();await expect(tour.locator('.tour-browser')).toBeVisible();
 await page.getByRole('button',{name:'Close studio tour'}).focus();await page.keyboard.press('Shift+Tab');
 expect(await page.evaluate(()=>!!document.activeElement?.closest('.studio-tour'))).toBe(true);
 await page.keyboard.press('Escape');await expect(tour).not.toBeVisible();await expect(trigger).toBeFocused();
 await expect(page.locator('body')).not.toHaveClass(/has-overlay/);
});

test('the tour advances only after the visitor opens it and can enter a real project', async ({ page }) => {
 await page.goto('/');await expect(page.locator('.studio-tour')).toHaveCount(0);
 await page.getByRole('button',{name:'Take the studio tour'}).click();
 await expect(page.locator('.tour-scene')).toHaveAttribute('data-scene','phc',{timeout:10000});
 await page.getByRole('button',{name:'Pause tour'}).click();await page.getByRole('link',{name:'Explore this project',exact:true}).click();
 await expect(page).toHaveURL(/\/projects\/plant-health-clinic$/);await expect(page.locator('.studio-tour')).toHaveCount(0);await expect(page.locator('body')).not.toHaveClass(/has-overlay/);
});

test('workflow sequence shows context, draft and expert review without fake diagnoses', async ({ page }) => {
 await page.goto('/');for(const [label,index,title] of [['Context','1','Bring the knowledge closer.'],['Draft','2','Assist. Don’t replace.'],['Review','3','The expert makes the call.']] as const){
  await page.getByRole('button',{name:`Step ${Number(index)+1}: ${label}`}).click();await expect(page.locator('.care-visual')).toHaveAttribute('data-step',index);await expect(page.locator('.care-narrative h3')).toHaveText(title);
 }
 await expect(page.locator('.care-visual-bottom')).toContainText('No live diagnosis');
 await page.getByRole('button',{name:'Play workflow sequence'}).click();await expect(page.locator('.care-visual')).toHaveAttribute('data-step','1',{timeout:5000});
 await page.getByRole('button',{name:'Pause workflow sequence'}).click();await page.waitForTimeout(3000);await expect(page.locator('.care-visual')).toHaveAttribute('data-step','1');
});

test('the real interface specimen responds to layout, spacing and selection', async ({ page }) => {
 const writes:string[]=[];page.on('request',r=>{if(r.method()==='POST')writes.push(r.url());});
 await page.goto('/');await page.locator('#craft').scrollIntoViewIfNeeded();
 await page.getByRole('button',{name:'Wide',exact:true}).click();await expect(page.locator('#study-width')).toHaveValue('650');
 await expect.poll(()=>page.locator('.study-app-body').evaluate(e=>getComputedStyle(e).display)).toBe('grid');
 await page.getByRole('button',{name:'Compact',exact:true}).click();await expect(page.locator('.study-screen')).toHaveAttribute('data-density','compact');
 await page.getByRole('button',{name:/Expert consultation A little clarity/}).click();await page.getByRole('button',{name:'Evening',exact:true}).click();
 await expect(page.locator('.study-summary')).toContainText('Evening');await page.getByRole('button',{name:'Preview selection',exact:true}).click();
 await expect(page.locator('.study-summary')).toContainText('No appointment was created.');expect(writes).toEqual([]);
 await page.getByRole('button',{name:'Reset the study'}).click();await expect(page.locator('#study-width')).toHaveValue('390');await expect(page.locator('.study-screen')).toHaveAttribute('data-density','roomy');
 await expect(page.locator('.study-summary')).toContainText('Orchard planning');await expect(page.locator('.study-summary')).toContainText('Morning');
});

test('the screen atlas opens the correct actual capture and filters remain direct', async ({ page }) => {
 await page.goto('/projects');await expect(page.locator('.screen-atlas')).toBeVisible();
 await page.getByRole('link',{name:'Inspect Plant Health Clinic: Farmer home',exact:true}).click();
 await expect(page.locator('#project-viewer')).toBeVisible();await expect(page.locator('#project-viewer h2')).toHaveText('Plant Health Clinic');
 await page.keyboard.press('Escape');await page.getByRole('navigation',{name:'Filter projects by discipline'}).getByRole('link',{name:'Research',exact:true}).click();
 await expect(page.locator('.screen-atlas')).toHaveCount(0);await expect(page.locator('.work-index-item')).toHaveCount(1);
});

test('the studio method keeps all information accessible while the artifact changes', async ({ page }) => {
 await page.goto('/about');await expect(page.locator('.method-stories article')).toHaveCount(4);
 await page.locator('#method-2').scrollIntoViewIfNeeded();await expect(page.locator('.method-stage')).toHaveAttribute('data-active','2');
 await page.locator('#method-3').scrollIntoViewIfNeeded();await expect(page.locator('.method-stage')).toHaveAttribute('data-active','3');
 await expect(page.locator('.method-handover')).toContainText('Scope and handover are agreed per project.');
});

test('reduced motion bypasses WebGL, smooth scrolling and autoplay without losing content', async ({ page }) => {
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');await page.locator('#anatomy').scrollIntoViewIfNeeded();
 await expect(page.locator('html')).toHaveAttribute('data-motion','off');await expect(page.locator('html')).not.toHaveClass(/lenis/);
 await expect(page.locator('.anatomy-visual')).toHaveAttribute('data-renderer','poster');await expect(page.locator('.anatomy-canvas')).toHaveCount(0);
 await page.getByRole('button',{name:'Take the studio tour'}).click();await expect(page.getByRole('button',{name:'Play tour'})).toBeDisabled();
 await page.getByRole('button',{name:'Close studio tour'}).click();await page.getByRole('button',{name:'Step 4: Review'}).click();await expect(page.locator('.care-narrative')).toContainText('The expert makes the call.');
});

test('without JavaScript the portfolio, layer poster and real project links remain visible', async ({ browser,baseURL }) => {
 const context=await browser.newContext({javaScriptEnabled:false,baseURL,viewport:{width:390,height:844}});const page=await context.newPage();
 try{await page.goto('/');await expect(page.locator('#hero-title')).toBeVisible();await page.locator('#anatomy').scrollIntoViewIfNeeded();await expect(page.locator('.anatomy-poster img')).toBeVisible();
 await expect(page.locator('#anatomy-detail')).toContainText('What people touch.');await page.getByRole('link',{name:'See the product behind the study'}).click();await expect(page).toHaveURL(/\/projects\/baghban\/?$/);await expect(page.locator('main h1')).toHaveText('Baghban');
 }finally{await context.close();}
});
