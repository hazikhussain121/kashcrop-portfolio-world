import {test, expect} from '@playwright/test';

test('project tabs keep selected labels and visible panels coherent', async ({page}) => {
  await page.goto('/');
  const tabs = page.getByRole('tablist', {name: 'Featured projects'});
  await tabs.getByRole('tab', {name: 'Plant Health Clinic', exact: true}).click();
  await expect(page.getByRole('tabpanel')).toContainText('Plant Health Clinic');
  await expect(page.getByRole('tabpanel')).toHaveCount(1);
  await tabs.getByRole('tab', {name: 'SKIIE', exact: true}).click();
  await expect(page.getByRole('tabpanel')).toContainText('SKIIE');
  await tabs.getByRole('tab', {name: 'BaghBani', exact: true}).click();
  await expect(page.getByRole('tabpanel')).toContainText('Your orchard.');
  await page.keyboard.press('End');
  await expect(tabs.getByRole('tab', {name: 'SKIIE', exact: true})).toHaveAttribute('aria-selected', 'true');
});

test('a project screen link opens the selected actual capture', async ({page}) => {
  await page.goto('/projects/baghban');
  await page.getByRole('link', {name: 'Inspect BaghBani: Seasonal calendar', exact: true}).click();
  await expect(page.locator('#project-viewer')).toBeVisible();
  await expect(page.locator('.viewer-screen-heading h3')).toHaveText('Seasonal calendar');
  await expect(page.locator('#project-viewer img[alt="BaghBani: Seasonal calendar"]')).toHaveAttribute('src', /garden-calendar.webp/);
});

test('viewer supports keyboard, browser history, source details and focus return', async ({page}) => {
  await page.goto('/projects');
  const trigger = page.getByRole('link', {name: 'View screens', exact: true}).first();
  await trigger.click();
  await expect(page.locator('#project-viewer')).toBeVisible();
  await expect(page).toHaveURL(/project=baghban/);
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('.viewer-screen-heading h3')).toHaveText('Orchard setup');
  await page.keyboard.press('Tab');
  expect(await page.evaluate(() => !!document.activeElement?.closest('#project-viewer'))).toBe(true);
  await page.goBack();
  await expect(page.locator('#project-viewer')).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await page.goForward();
  await expect(page.locator('#project-viewer')).toBeVisible();
  await expect(page.locator('.viewer-screen-heading h3')).toHaveText('Orchard setup');
  await page.getByText('About these images', {exact: true}).click();
  await expect(page.locator('.viewer-source')).toContainText('review build');
  await page.getByRole('link', {name: 'View the full project'}).click();
  await expect(page).toHaveURL(/\/projects\/baghban\/?$/);
  await expect(page.locator('#project-viewer')).not.toBeVisible();
  await expect(page.locator('body')).not.toHaveClass(/has-overlay/);
});

test('direct screen URLs reload and close without losing filters', async ({page}) => {
  await page.goto('/projects?category=Platforms&project=baghban&screen=varieties');
  await expect(page.locator('#project-viewer')).toBeVisible();
  await expect(page.locator('.viewer-screen-heading h3')).toHaveText('Variety explorer');
  await page.reload();
  await expect(page.locator('#project-viewer')).toBeVisible();
  await page.getByRole('button', {name: 'Close project viewer'}).click();
  await expect(page).toHaveURL(/\/projects\/?\?category=Platforms$/);
  await expect(page.locator('#project-viewer')).not.toBeVisible();
});

test('long captures scroll at readable width and full-size inspection can pan', async ({page}) => {
  await page.goto('/?project=baghban&screen=orchard-setup');
  const figure = page.locator('.viewer-figure');
  await expect(figure).toBeVisible();
  expect(await figure.evaluate(element => element.scrollHeight > element.clientHeight)).toBe(true);
  await page.getByRole('button', {name: 'Inspect at full size'}).click();
  await expect(figure).toHaveClass(/is-zoomed/);
  const rect = (await figure.boundingBox())!;
  await page.mouse.move(rect.x + rect.width / 2, rect.y + rect.height * .7);
  await page.mouse.down();
  await page.mouse.move(rect.x + rect.width / 2, rect.y + rect.height * .3, {steps: 8});
  await page.mouse.up();
  expect(await figure.evaluate(element => element.scrollTop)).toBeGreaterThan(20);
  await page.keyboard.press('Escape');
  await expect(figure).not.toHaveClass(/is-zoomed/);
  await expect(page.locator('#project-viewer')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('#project-viewer')).not.toBeVisible();
});

test('catalogue filters, search and empty recovery work together', async ({page}) => {
  await page.goto('/projects');
  await page.getByRole('navigation', {name: 'Filter projects by discipline'}).getByRole('link', {name: 'Websites', exact: true}).click();
  await expect(page.locator('.ap-project-card')).toHaveCount(1);
  await expect(page.locator('.ap-project-card h2')).toHaveText('SKIIE');
  await page.getByRole('searchbox').fill('no matching project');
  await page.getByRole('button', {name: 'Search projects', exact: true}).click();
  await expect(page.locator('.ap-empty-results')).toBeVisible();
  await page.getByRole('link', {name: 'Show all work'}).click();
  await expect(page.locator('.ap-project-card')).toHaveCount(6);
});

test('motion preference survives navigation and reload', async ({page}) => {
  await page.goto('/projects/baghban');
  await page.getByRole('button', {name: 'Reduce decorative motion'}).click();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
  await page.getByRole('button', {name: 'Enable decorative motion'}).click();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'on');
});

test('system reduced-motion preference is respected', async ({browser, baseURL}) => {
  const context = await browser.newContext({baseURL, reducedMotion: 'reduce'});
  try {
    const page = await context.newPage();
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
    await expect(page.getByRole('button', {name: 'Reduced motion follows your system'})).toBeDisabled();
  } finally { await context.close(); }
});
