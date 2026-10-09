import {test, expect} from '@playwright/test';
test.use({viewport: {width: 390, height: 844}, isMobile: true, hasTouch: true});

test('mobile project chapters have direct links and no horizontal overflow',async({page})=>{
 await page.goto('/');
 await expect(page.locator('.fw-feature')).toHaveCount(2);
 for(const feature of ['.fw-feature-bagh','.fw-feature-clinic']){
  const section=page.locator(feature);
  await section.scrollIntoViewIfNeeded();
  await expect(section.getByRole('link',{name:'Explore the case study'})).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 }
 await expect(page.locator('#selected-work .fw-work-row')).toHaveCount(4);
});

test('touch navigation to Plant Health Clinic does not trap scrolling',async({page})=>{
 await page.goto('/');
 const story=page.locator('.fw-feature-clinic');
 await story.scrollIntoViewIfNeeded();
 await story.getByRole('link',{name:'Explore the case study'}).tap();
 await expect(page).toHaveURL(/\/projects\/plant-health-clinic\/?$/);
 await expect(page.locator('main h1')).toBeVisible();
 await expect(page.locator('body')).not.toHaveClass(/has-overlay/);
});

test('mobile navigation keeps close reachable and restores focus', async ({page}) => {
  await page.goto('/');
  const opener = page.getByRole('button', {name: 'Open navigation'});
  await opener.tap();
  const dialog = page.locator('#mobile-menu');
  await expect(dialog).toBeVisible();
  const close = page.getByRole('button', {name: 'Close navigation'});
  const box = (await close.boundingBox())!;
  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.x + box.width).toBeLessThanOrEqual(390);
  expect(box.height).toBeGreaterThanOrEqual(43.5);
  await close.tap();
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();
  await expect(page.locator('body')).not.toHaveClass(/has-overlay/);
});

test('phone collection opens an actual project capture and releases the viewer', async ({page}) => {
  await page.goto('/projects');
  await page.getByRole('link', {name: 'Inspect screens', exact: true}).first().tap();
  await expect(page.locator('#project-viewer')).toBeVisible();
  await expect(page.locator('#project-viewer h2')).toHaveText('BaghBani');
  await page.getByRole('button', {name: 'Next project screen'}).tap();
  await expect(page.locator('.viewer-screen-heading h3')).toHaveText('Orchard setup');
  await page.getByRole('button', {name: 'Close project viewer'}).tap();
  await expect(page.locator('#project-viewer')).not.toBeVisible();
  await expect(page.locator('body')).not.toHaveClass(/has-overlay/);
});

test('phone about page keeps its people, principles and contact action readable', async ({page}) => {
  await page.goto('/about');
  await expect(page.locator('.ap-founder-heading h2')).toContainText('Hazik');
  await expect(page.locator('.ap-principles article')).toHaveCount(3);
  await page.getByRole('link', {name: 'Start a conversation'}).tap();
  await expect(page).toHaveURL(/\/contact$/);
  expect(await page.locator('#inquiry-name').evaluate(element => parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(16);
});
