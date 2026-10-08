import {test, expect} from '@playwright/test';

test('package controls keep their own accessible panel and project selection independent', async ({page}) => {
  await page.goto('/');
  const stage = page.locator('.kc-package-stage');
  const tabs = stage.getByRole('tablist', {name: 'Explore the project package'}).getByRole('tab');
  await tabs.nth(0).focus();
  await tabs.nth(0).press('ArrowLeft');
  await expect(tabs.nth(2)).toBeFocused();
  await expect(tabs.nth(2)).toHaveAttribute('aria-selected', 'true');
  await expect(stage.getByRole('tabpanel')).toContainText('up to four years');
  await expect(stage.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'package-tab-2');
  await tabs.nth(2).press('ArrowRight');
  await expect(tabs.nth(0)).toBeFocused();
  await tabs.nth(0).press('End');
  await expect(tabs.nth(2)).toBeFocused();
  await tabs.nth(2).press('Home');
  await expect(tabs.nth(0)).toBeFocused();
  await expect(stage.getByRole('tabpanel')).toHaveCount(1);
  await expect(stage.locator('.kc-package-device img.is-active')).toHaveCount(1);
  await tabs.nth(0).press('Tab');
  await expect(stage.getByRole('tabpanel')).toBeFocused();
  await page.locator('#work').getByRole('tab', {name: 'Plant Health Clinic', exact: true}).click();
  await expect(stage.getByRole('tabpanel')).toHaveAttribute('id', 'package-panel-0');
});

for (const viewport of [{width: 390, height: 844}, {width: 1440, height: 960}]) {
  test('Why KashCrop reaches its comparison and restores it after contact at ' + viewport.width + 'px', async ({browser, baseURL}) => {
    const context = await browser.newContext({baseURL, viewport, reducedMotion: 'no-preference', isMobile: viewport.width < 751, hasTouch: viewport.width < 751});
    const origin = new URL(baseURL!).origin;
    await context.route('**/*', route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
    const page = await context.newPage();
    try {
      await page.goto('/');
      await expect(page.locator('html')).toHaveAttribute('data-motion', 'on');
      if (viewport.width < 751) {
        await page.getByRole('button', {name: 'Open navigation'}).tap();
        await page.getByRole('navigation', {name: 'Mobile navigation'}).getByRole('link', {name: 'Why KashCrop', exact: true}).tap();
        await expect(page.locator('#mobile-menu')).not.toBeVisible();
      } else {
        await page.getByRole('navigation', {name: 'Main navigation', exact: true}).getByRole('link', {name: 'Why KashCrop', exact: true}).click();
      }
      await expect(page).toHaveURL(/\/services#compare$/);
      const target = page.locator('#compare');
      await expect.poll(() => target.evaluate(element => element.getBoundingClientRect().top)).toBeGreaterThanOrEqual(0);
      await expect.poll(() => target.evaluate(element => element.getBoundingClientRect().top)).toBeLessThan(viewport.height / 2);
      await expect(page.locator('body')).not.toHaveClass(/has-overlay/);
      await page.getByRole('link', {name: 'Plan your project', exact: true}).click();
      await expect(page).toHaveURL(/\/contact$/);
      await page.goBack();
      await expect(page).toHaveURL(/\/services#compare$/);
      await expect.poll(() => target.evaluate(element => element.getBoundingClientRect().top)).toBeLessThan(viewport.height / 2);
    } finally {
      await context.close();
    }
  });
}
