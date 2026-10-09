import {test, expect} from '@playwright/test';

test('the homepage explains the scoped package without an invented competitor table',async({page})=>{
 await page.goto('/');
 const section=page.locator('.fw-capabilities');
 await expect(section.getByRole('heading',{name:/We stay for/})).toBeVisible();
 await expect(section.locator('.fw-capability')).toHaveCount(3);
 await expect(section).toContainText('Maintenance options up to four years');
 await expect(section).toContainText('Play Console');
 await expect(page.locator('main table')).toHaveCount(0);
 await page.getByRole('link',{name:'Explore how we work'}).click();
 await expect(page).toHaveURL(/\/services$/);
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
