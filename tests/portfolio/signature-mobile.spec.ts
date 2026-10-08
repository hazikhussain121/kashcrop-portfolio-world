import {test, expect} from '@playwright/test';
test.use({viewport: {width: 390, height: 844}, isMobile: true, hasTouch: true});

test('phone product chapters use direct touch controls without pinning or page overflow', async ({page}) => {
  await page.goto('/');
  await expect(page.locator('#work')).not.toHaveAttribute('data-scroll-showcase', 'on');
  const tabs = page.getByRole('tablist', {name: 'Featured projects'}).getByRole('tab');
  for (let index = 0; index < 3; index++) {
    await tabs.nth(index).tap();
    await expect(tabs.nth(index)).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('#work').getByRole('tabpanel')).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await expect(page.locator('#work').getByRole('tabpanel').getByRole('link')).toHaveAttribute('href', '/projects/skiie');
});

test('phone project selection preserves the reading position', async ({page}) => {
  await page.goto('/');
  const tabs = page.getByRole('tablist', {name: 'Featured projects'});
  await tabs.scrollIntoViewIfNeeded();
  const before = await page.evaluate(() => scrollY);
  await tabs.getByRole('tab', {name: 'Plant Health Clinic', exact: true}).tap();
  expect(Math.abs(await page.evaluate(() => scrollY) - before)).toBeLessThan(10);
  await page.locator('#work').getByRole('tabpanel').getByRole('link').tap();
  await expect(page).toHaveURL(/\/projects\/plant-health-clinic$/);
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
  expect(box.height).toBeGreaterThanOrEqual(44);
  await close.tap();
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();
  await expect(page.locator('body')).not.toHaveClass(/has-overlay/);
});

test('phone collection opens an actual project capture and releases the viewer', async ({page}) => {
  await page.goto('/projects');
  await page.getByRole('link', {name: 'View screens', exact: true}).first().tap();
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
