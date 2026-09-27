import { test, expect } from '@playwright/test';
test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

test('mobile anatomy, workflow and playground remain within the page', async ({ page }) => {
 await page.goto('/');
 for (const id of ['anatomy','care-story','craft']) {
  const section=page.locator(`#${id}`);await section.scrollIntoViewIfNeeded();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  expect(await section.evaluate(e=>e.scrollWidth<=e.clientWidth+1)).toBe(true);
 }
 await page.getByRole('tab',{name:/Workflow/}).tap();await expect(page.locator('#anatomy-detail')).toContainText('What happens next.');
 await page.getByRole('button',{name:'Step 4: Review'}).tap();await expect(page.locator('.care-visual')).toHaveAttribute('data-step','3');
});

test('the mobile studio tour keeps navigation and close reachable', async ({ page }) => {
 await page.goto('/');await page.getByRole('button',{name:'Take the studio tour'}).tap();
 await page.getByRole('button',{name:'Pause tour'}).tap();
 const tour=page.getByRole('dialog',{name:'The work, in focus.'});
 await tour.getByRole('button',{name:/SKIIE/}).tap();await expect(tour.locator('.tour-browser')).toBeVisible();
 const close=page.getByRole('button',{name:'Close studio tour'});const box=(await close.boundingBox())!;
 expect(box.x).toBeGreaterThanOrEqual(0);expect(box.x+box.width).toBeLessThanOrEqual(390);expect(box.height).toBeGreaterThanOrEqual(44);
 await close.tap();await expect(tour).not.toBeVisible();await expect(page.locator('body')).not.toHaveClass(/has-overlay/);
});

test('the mobile interface study makes a real, local-only selection', async ({ page }) => {
 await page.goto('/');await page.locator('#craft').scrollIntoViewIfNeeded();
 await page.getByRole('button',{name:/Expert consultation A little clarity/}).tap();await page.getByRole('button',{name:'Evening',exact:true}).tap();
 await page.getByRole('button',{name:'Preview selection',exact:true}).tap();await expect(page.locator('.study-summary')).toContainText('No appointment was created.');
 expect(await page.locator('.study-screen').evaluate(e=>e.scrollWidth<=e.clientWidth+1)).toBe(true);
 await page.getByRole('button',{name:'Reset the study'}).tap();await expect(page.locator('.study-summary')).toContainText('Morning');
});

test('the mobile screen atlas has ordinary scroll controls and real project links', async ({ page }) => {
 await page.goto('/projects');const window=page.locator('.atlas-window');await window.scrollIntoViewIfNeeded();
 expect(await window.evaluate(e=>e.scrollWidth>e.clientWidth)).toBe(true);
 await page.getByRole('button',{name:'Next archive screens'}).tap();await expect.poll(()=>window.evaluate(e=>e.scrollLeft)).toBeGreaterThan(100);
 await page.getByRole('link',{name:'Inspect Baghban: Farmer home',exact:true}).tap();await expect(page.locator('#project-viewer')).toBeVisible();
 await page.getByRole('button',{name:'Close project viewer'}).tap();await expect(page.locator('#project-viewer')).not.toBeVisible();
});

test('the delivery method can be explored directly on a phone', async ({ page }) => {
 await page.goto('/about');const controls=page.getByRole('group',{name:'Preview a delivery stage'});
 await controls.getByRole('button',{name:/Handover/}).tap();await expect(page.locator('.method-stage')).toHaveAttribute('data-active','3');
 await expect(page.locator('.method-handover')).toContainText('Source & deployment notes');
 await controls.getByRole('button',{name:/Design/}).tap();await expect(page.locator('.method-devices')).toBeVisible();
 await expect(page.locator('.method-stories article')).toHaveCount(4);
});
