import {test, expect, type Page} from '@playwright/test';
import {mkdir} from 'node:fs/promises';
import path from 'node:path';

const captures = process.env.FILM_QA_OUTPUT || 'artifacts/interface-films/browser';
const projectSlugs = ['baghban', 'plant-health-clinic', 'treat-my-fish', 'skiie', 'trace-amp', 'kashcrop'];

test.beforeEach(async ({context, baseURL}) => {
  const origin = new URL(baseURL!).origin;
  await context.route('**/*', route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
  await mkdir(captures, {recursive: true});
});

async function openFilm(page: Page) {
  await page.getByText('Watch interface film', {exact: true}).click();
  const video = page.locator('.ap-film-content video');
  await expect(video).toBeVisible();
  await expect(video).toHaveAttribute('controls', '');
  await expect(video).toHaveAttribute('preload', 'none');
  return video;
}

async function playFilm(page: Page) {
  const video = page.locator('.ap-film-content video');
  // Exercise the native media pipeline explicitly; this is not an autoplay assertion.
  await video.evaluate((element: HTMLVideoElement) => element.play());
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.readyState >= 3 && !element.paused && element.currentTime > .15)).toBe(true);
  const state = await video.evaluate((element: HTMLVideoElement) => ({width: element.videoWidth, height: element.videoHeight, muted: element.muted, inline: element.playsInline, controls: element.controls, autoplay: element.autoplay, error: element.error?.message ?? null}));
  expect(state.controls).toBe(true);
  expect(state.muted).toBe(true);
  expect(state.inline).toBe(true);
  expect(state.autoplay).toBe(false);
  expect(state.error).toBeNull();
  return state;
}

test('home, catalogue and closed project films make no automatic MP4 requests', async ({page}) => {
  const requests: string[] = [];
  page.on('request', request => {if (request.url().includes('.mp4')) requests.push(request.url());});
  for (const route of ['/', '/projects', '/projects/baghban']) {
    await page.goto(route);
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(250);
  }
  expect(requests).toEqual([]);
  await expect(page.locator('.ap-film-disclosure')).not.toHaveAttribute('open');
});

test('all six optional project films play with provenance and static product content', async ({page}) => {
  for (const slug of projectSlugs) {
    await page.goto('/projects/' + slug);
    await expect(page.locator('main h1')).toBeVisible();
    const video = await openFilm(page);
    const state = await playFilm(page);
    expect(state.width).toBe(1920);
    expect(state.height).toBe(1080);
    const poster = await video.getAttribute('poster');
    expect(poster).toMatch(/poster\.webp$/);
    expect((await page.request.get(poster!)).status()).toBe(200);
    await expect(page.locator('.ap-film-provenance')).toContainText('demonstration data');
    await expect(page.locator('.ap-case-story')).toBeVisible();
  }
});

test('native film pause and resume retain the same media footprint', async ({page}) => {
  await page.goto('/projects/baghban');
  const video = await openFilm(page);
  const before = (await video.boundingBox())!;
  await playFilm(page);
  await video.evaluate((element: HTMLVideoElement) => element.pause());
  const time = await video.evaluate((element: HTMLVideoElement) => element.currentTime);
  await page.waitForTimeout(200);
  expect(await video.evaluate((element: HTMLVideoElement) => element.paused)).toBe(true);
  expect(await video.evaluate((element: HTMLVideoElement) => element.currentTime)).toBe(time);
  await playFilm(page);
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.currentTime)).toBeGreaterThan(time);
  const after = (await video.boundingBox())!;
  expect(Math.abs(before.width - after.width)).toBeLessThan(1);
  expect(Math.abs(before.height - after.height)).toBeLessThan(1);
});

test('reduced motion and data saving preserve still content until an explicit play', async ({page}) => {
  const requests: string[] = [];
  page.on('request', request => {if (request.url().includes('.mp4')) requests.push(request.url());});
  await page.emulateMedia({reducedMotion: 'reduce'});
  await page.goto('/projects/baghban');
  const video = await openFilm(page);
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
  expect(await video.evaluate((element: HTMLVideoElement) => element.paused)).toBe(true);
  expect(requests).toEqual([]);
  await page.goto('about:blank');
  await page.emulateMedia({reducedMotion: 'no-preference'});
  await page.addInitScript(() => Object.defineProperty(navigator, 'connection', {configurable: true, value: Object.assign(new EventTarget(), {saveData: true})}));
  await page.goto('/projects/skiie');
  await openFilm(page);
  expect(requests).toEqual([]);
  await expect(page.locator('.ap-case-stage img').first()).toBeVisible();
});

test('a failed movie retains its poster, product content and optional recording link', async ({page}) => {
  let failedRequest = false;
  await page.route('**/media/projects/baghban/*.mp4', async route => {failedRequest = true; await route.fulfill({status: 503, body: ''});});
  await page.goto('/projects/baghban');
  const video = await openFilm(page);
  await video.evaluate((element: HTMLVideoElement) => {void element.play().catch(() => {});});
  await expect.poll(() => failedRequest).toBe(true);
  expect(await video.evaluate((element: HTMLVideoElement) => element.readyState)).toBe(0);
  await video.evaluate((element: HTMLVideoElement) => element.pause());
  await expect(video).toHaveAttribute('poster', /poster\.webp$/);
  await expect(page.locator('.ap-case-story')).toBeVisible();
  await expect(page.getByRole('link', {name: 'Watch the mobile recording'})).toHaveAttribute('href', /film-mobile\.mp4$/);
});

for (const width of [320, 390, 820, 1440]) test('native film controls fit the viewport at ' + width + 'px', async ({page}) => {
  await page.setViewportSize({width, height: width < 800 ? 844 : 1000});
  await page.goto('/projects/skiie');
  const video = await openFilm(page);
  await playFilm(page);
  const box = (await video.boundingBox())!;
  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.x + box.width).toBeLessThanOrEqual(width);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await video.screenshot({path: path.join(captures, 'optional-film-' + width + '.png')});
  const link = page.getByRole('link', {name: 'Watch the mobile recording'});
  await expect(link).toHaveAttribute('href', /film-mobile\.mp4$/);
  const response = await page.request.get((await link.getAttribute('href'))!, {headers: {Range: 'bytes=0-1023'}});
  expect([200, 206]).toContain(response.status());
  expect(response.headers()['content-type']).toContain('video/mp4');
});

test('without JavaScript the product and native optional film remain available', async ({browser, baseURL}) => {
  const context = await browser.newContext({javaScriptEnabled: false, baseURL, reducedMotion: 'reduce'});
  try {
    await context.route('**/*', route => new URL(route.request().url()).origin === new URL(baseURL!).origin ? route.continue() : route.abort());
    const page = await context.newPage();
    await page.goto('/projects/baghban');
    await expect(page.locator('.ap-case-stage img').last()).toBeVisible();
    const video = await openFilm(page);
    await expect(video).not.toHaveAttribute('autoplay');
    await expect(video.locator('source')).toHaveAttribute('src', /\.mp4$/);
    await expect(page.locator('main h1')).toHaveText('BaghBani');
  } finally {await context.close();}
});

test('project and service previews never nest media controls inside links', async ({page}) => {
  for (const route of ['/projects', '/services', '/services/full-stack-apps']) {
    await page.goto(route);
    expect(await page.locator('a button, a input, a video[controls]').count(), route).toBe(0);
  }
});

test('optional film pages have no serious accessibility, runtime or missing media failures', async ({page}) => {
  const errors: string[] = [], responses: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => {if (response.status() >= 400 && response.url().includes('/media/')) responses.push(response.status() + ' ' + response.url());});
  for (const slug of projectSlugs) {
    await page.goto('/projects/' + slug);
    await openFilm(page);
    await page.addScriptTag({path: 'node_modules/axe-core/axe.min.js'});
    const serious = await page.evaluate(async () => {
      const result = await (window as any).axe.run(document, {runOnly: {type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa']}});
      return result.violations.filter((item: any) => ['serious', 'critical'].includes(item.impact)).map((item: any) => ({id: item.id, nodes: item.nodes.map((node: any) => node.target)}));
    });
    expect(serious, slug).toEqual([]);
  }
  expect(errors).toEqual([]);
  expect(responses).toEqual([]);
});
