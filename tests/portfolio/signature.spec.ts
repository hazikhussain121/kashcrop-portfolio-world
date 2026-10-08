import {test, expect} from '@playwright/test';

test('homepage presents one product story with real interfaces and direct next steps', async ({page}) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('main h1')).toHaveText('Good ideas.Beautifully built.');
  await expect(page.getByRole('heading', {name: 'Meet the work.'})).toBeVisible();
  await expect(page.locator('.apple-product-family .hero-device')).toHaveCount(3);
  for (const image of await page.locator('.apple-product-family img').all()) {
    await expect(image).toBeVisible();
    await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
  }
  await expect(page.getByRole('link', {name: 'Explore the work', exact: true})).toHaveAttribute('href', '#work');
  await expect(page.locator('.apple-hero-actions').getByRole('link', {name: 'Start a project'})).toHaveAttribute('href', '/contact');
  expect(errors).toEqual([]);
});

test('ordinary wheel input scrolls the document and preserves the compact navigation', async ({page}) => {
  await page.goto('/');
  await page.mouse.move(1300, 800);
  await page.mouse.wheel(0, 620);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(300);
  await expect(page.locator('.site-header')).toHaveClass(/is-scrolled/);
  await expect(page.getByRole('navigation', {name: 'Main navigation', exact: true})).toBeVisible();
  await expect(page.locator('body')).not.toHaveClass(/has-overlay/);
  expect(await page.evaluate(() => getComputedStyle(document.body).overflowY)).not.toBe('hidden');
});

test('desktop scrolling advances project chapters while manual controls stay coherent', async ({page}) => {
  await page.setViewportSize({width: 1440, height: 960});
  await page.goto('/');
  const section = page.locator('#work');
  await expect(section).toHaveAttribute('data-scroll-showcase', 'on');
  const tabs = page.getByRole('tablist', {name: 'Featured projects'}).getByRole('tab');
  for (const [progress, selected] of [[.1, 0], [.49, 1], [.85, 2]] as const) {
    await section.evaluate((element, progress) => {
      const rect = element.getBoundingClientRect();
      const start = scrollY + rect.top - 64;
      window.scrollTo(0, start + (rect.height - innerHeight + 88) * progress);
    }, progress);
    await expect(tabs.nth(selected)).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('#work').getByRole('tabpanel')).toHaveCount(1);
  }
  await tabs.nth(0).click();
  await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#work').getByRole('tabpanel')).toContainText('Your orchard.');
});

test('all featured projects have usable direct links after keyboard selection', async ({page}) => {
  await page.emulateMedia({reducedMotion: 'reduce'});
  await page.goto('/');
  const tabs = page.getByRole('tablist', {name: 'Featured projects'}).getByRole('tab');
  await tabs.nth(0).focus();
  await tabs.nth(0).press('ArrowRight');
  await expect(tabs.nth(1)).toBeFocused();
  await expect(page.locator('#work').getByRole('tabpanel').getByRole('link')).toHaveAttribute('href', '/projects/plant-health-clinic');
  await tabs.nth(1).press('End');
  await expect(page.locator('#work').getByRole('tabpanel').getByRole('link')).toHaveAttribute('href', '/projects/skiie');
  await tabs.nth(2).press('Home');
  await page.locator('#work').getByRole('tabpanel').getByRole('link').click();
  await expect(page).toHaveURL(/\/projects\/baghban$/);
  await expect(page.locator('main h1')).toHaveText('BaghBani');
});

test('reduced motion disables scroll choreography while preserving product selection', async ({page}) => {
  await page.emulateMedia({reducedMotion: 'reduce'});
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
  await expect(page.locator('#work')).not.toHaveAttribute('data-scroll-showcase', 'on');
  await expect(page.locator('html')).not.toHaveClass(/lenis/);
  await page.getByRole('tab', {name: 'SKIIE', exact: true}).click();
  await expect(page.locator('#work').getByRole('tabpanel')).toContainText('A home for');
  await expect(page.getByRole('button', {name: 'Reduced motion follows your system'})).toBeDisabled();
});

test('normal and reduced motion can be changed during the same visit', async ({page}) => {
  await page.goto('/');
  await expect(page.locator('#work')).toHaveAttribute('data-scroll-showcase', 'on');
  await page.getByRole('button', {name: 'Reduce decorative motion'}).click();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
  await expect(page.locator('#work')).not.toHaveAttribute('data-scroll-showcase', 'on');
  await page.getByRole('button', {name: 'Enable decorative motion'}).click();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'on');
  await expect(page.locator('#work')).toHaveAttribute('data-scroll-showcase', 'on');
});

test('project browsing and returning home leave ordinary scrolling available', async ({page}) => {
  await page.goto('/');
  await page.getByRole('navigation', {name: 'Main navigation', exact: true}).getByRole('link', {name: 'Work', exact: true}).click();
  await expect(page).toHaveURL(/\/projects$/);
  await page.locator('#site-header').getByRole('link', {name: 'KashCrop Innovations home'}).click();
  await expect(page.locator('main h1')).toBeVisible();
  await expect(page.locator('body')).not.toHaveClass(/has-overlay/);
  await page.mouse.wheel(0, 700);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(200);
});
