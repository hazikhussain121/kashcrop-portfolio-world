import {test, expect} from '@playwright/test';

test('Fieldwork homepage leads with a true studio manifesto and actual interfaces', async ({page}) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('main h1')).toContainText('HAS TO WORK.');
  await expect(page.getByRole('heading', {name: /Proof, not/})).toBeVisible();
  await expect(page.locator('.fw-feature')).toHaveCount(2);
  for(const feature of ['bagh','clinic']){
    const image=page.locator('.fw-feature-'+feature+' .fw-screen-primary img');
    await image.scrollIntoViewIfNeeded();
    await expect.poll(()=>image.evaluate((element: HTMLImageElement)=>element.complete&&element.naturalWidth>0)).toBe(true);
  }
  await expect(page.getByRole('link', {name: 'Enter the work'})).toHaveAttribute('href','#selected-work');
  await expect(page.locator('.site-header').getByRole('link', {name: 'Start a project'})).toHaveAttribute('href','/contact');
  expect(errors).toEqual([]);
});

test('ordinary wheel input scrolls the document and retains sticky navigation',async({page})=>{
 await page.goto('/');
 await page.mouse.move(1300,800);await page.mouse.wheel(0,620);
 await expect.poll(()=>page.evaluate(()=>scrollY)).toBeGreaterThan(300);
 await expect(page.locator('.site-header')).toHaveClass(/is-scrolled/);
 await expect(page.getByRole('navigation',{name:'Main navigation',exact:true})).toBeVisible();
 await expect(page.locator('body')).not.toHaveClass(/has-overlay/);
 expect(await page.evaluate(()=>getComputedStyle(document.body).overflowY)).not.toBe('hidden');
});

test('selected case-file links remain navigable without carousel state',async({page})=>{
 await page.goto('/');
 await expect(page.locator('#selected-work .fw-feature-bagh a[href="/projects/baghban"]')).toHaveCount(1);
 await expect(page.locator('#selected-work .fw-feature-clinic a[href="/projects/plant-health-clinic"]')).toHaveCount(1);
 await expect(page.locator('.fw-work-row')).toHaveCount(4);
 await page.locator('.fw-feature-bagh').getByRole('link',{name:'Explore the case study'}).focus();
 await page.keyboard.press('Enter');
 await expect(page).toHaveURL(/\/projects\/baghban\/?$/);
 await expect(page.locator('main h1')).toHaveText('BaghBani');
 await expect(page.getByRole('heading',{name:/Farming is/})).toBeVisible();
});

test('BaghBani preserves real source material and five gallery captures',async({page})=>{
 await page.goto('/projects/baghban');
 await expect(page.locator('.fw-case-evidence-item')).toHaveCount(5);
 await page.getByRole('link',{name:'Explore the calendar'}).click();
 await expect(page.locator('#project-viewer')).toBeVisible();
 await expect(page.locator('.viewer-screen-heading h3')).toHaveText('Seasonal calendar');
 await page.getByRole('button',{name:'Close project viewer'}).click();
 await expect(page.locator('#project-viewer')).not.toBeVisible();
 await page.getByText('About these product captures',{exact:true}).click();
 await expect(page.locator('.fw-case-provenance')).toContainText('review build');
});

test('reduced motion shows the complete editorial story without automatic choreography',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/');
 await expect(page.locator('html')).toHaveAttribute('data-motion','off');
 await expect(page.locator('html')).not.toHaveClass(/lenis/);
 await expect(page.locator('.fw-feature-bagh')).toBeVisible();
 await expect(page.locator('.fw-feature-clinic')).toBeVisible();
 await expect(page.locator('.fw-capability')).toHaveCount(3);
});

test('project browsing and returning home preserve ordinary scrolling',async({page})=>{
 await page.goto('/');
 await page.getByRole('navigation',{name:'Main navigation',exact:true}).getByRole('link',{name:'Work',exact:true}).click();
 await expect(page).toHaveURL(/\/projects$/);
 await page.locator('#site-header').getByRole('link',{name:'KashCrop Innovations home'}).click();
 await expect(page.locator('main h1')).toBeVisible();
 await expect(page.locator('body')).not.toHaveClass(/has-overlay/);
 await page.mouse.wheel(0,700);
 await expect.poll(()=>page.evaluate(()=>scrollY)).toBeGreaterThan(200);
});
