import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium, webkit } from '@playwright/test';
import axe from 'axe-core';
import sharp from 'sharp';

const base = process.env.PREVIEW_URL || 'http://127.0.0.1:5216';
const root = path.resolve('.impeccable/review/comparison-clarity');
await fs.mkdir(root, { recursive: true });
const report = { base, checkedAt: new Date().toISOString(), checks: [], pages: [], errors: [], unavailable: [] };
function check(name, pass, detail) { report.checks.push({ name, pass: Boolean(pass), ...(detail === undefined ? {} : { detail }) }); }
// Crop an unaltered full-page capture from document top so sticky navigation
// cannot be painted across an offscreen element screenshot.
async function captureSection(page, name) {
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(80);
  const box = await page.locator('#compare').evaluate(e => {
    const r = e.getBoundingClientRect();
    return { left: Math.floor(r.left + scrollX), top: Math.floor(r.top + scrollY), width: Math.ceil(r.width), height: Math.ceil(r.height) };
  });
  const buffer = await page.screenshot({ fullPage: true });
  const meta = await sharp(buffer).metadata();
  box.width = Math.min(box.width, meta.width - box.left);
  box.height = Math.min(box.height, meta.height - box.top);
  await sharp(buffer).extract(box).jpeg({ quality: 88 }).toFile(path.join(root, name));
}
const specs = [
  { route: '/services#compare', width: 1440, height: 1000, name: 'desktop' },
  { route: '/services#compare', width: 390, height: 844, name: 'mobile' },
  { route: '/#compare', width: 390, height: 844, name: 'home-mobile' },
  { route: '/services#compare', width: 375, height: 812, name: 'narrow-phone' },
  { route: '/services#compare', width: 320, height: 812, name: 'small-phone' },
  { route: '/services#compare', width: 768, height: 1024, name: 'tablet' },
  { route: '/services#compare', width: 844, height: 390, name: 'landscape' },
  { route: '/services#compare', width: 720, height: 500, name: 'reflow-720' },
];
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
for (const spec of specs) {
  const context = await browser.newContext({ viewport: { width: spec.width, height: spec.height }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  page.on('pageerror', e => report.errors.push({ name: spec.name, message: e.message }));
  page.on('response', r => { if (r.url().startsWith(base) && r.status() >= 400) report.errors.push({ name: spec.name, status: r.status(), url: r.url() }); });
  try {
    const response = await page.goto(base + spec.route, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const section = page.locator('#compare');
    const facts = await section.evaluate(e => ({
      height: e.getBoundingClientRect().height,
      width: innerWidth, pageWidth: document.documentElement.scrollWidth,
      rowCount: e.querySelectorAll('tbody tr').length,
      text: e.innerText,
      overflowing: [...e.querySelectorAll('td,th,p,strong,summary,dd')].filter(n => n.getClientRects().length && n.scrollWidth > n.clientWidth + 2).map(n => n.className || n.tagName),
      rows: [...e.querySelectorAll('tbody tr')].map(row => {
        const [feature, own, other] = row.children;
        const b = n => { const r = n.getBoundingClientRect(); return { x:r.x,y:r.y,width:r.width }; };
        return {feature:b(feature),own:b(own),other:b(other)};
      }),
      ids: [...e.querySelectorAll('[data-package-id]')].map(n => n.getAttribute('data-package-id')),
      cellAssociations: [...e.querySelectorAll('td[headers]')].every(n => n.getAttribute('headers').split(' ').every(id => Boolean(document.getElementById(id)))),
    }));
    report.pages.push({ ...spec, status: response.status(), ...facts });
    check(spec.name + ': loaded new comparison', response.status() === 200 && facts.text.includes('BEYOND') && facts.rowCount === 3);
    check(spec.name + ': no horizontal overflow', facts.pageWidth <= facts.width && facts.overflowing.length === 0, facts.overflowing);
    check(spec.name + ': all eight facts preserved', facts.ids.length === 8 && new Set(facts.ids).size === 8);
    check(spec.name + ': table header associations', facts.cellAssociations);
    check(spec.name + ': price not treated as a comparative advantage', await section.locator('tbody [data-package-id="price"]').count() === 0);
    if (spec.width <= 700) check(spec.name + ': stacked full-width scopes', facts.rows.every(r => r.own.y > r.feature.y && r.other.y > r.own.y && Math.abs(r.own.x-r.other.x) < 1));
    else check(spec.name + ': desktop column order', facts.rows.every(r => r.feature.x < r.own.x && r.own.x < r.other.x));
    if (['desktop','mobile','home-mobile','small-phone','tablet'].includes(spec.name)) {
      await captureSection(page, spec.name + '.jpg');
    }
    const details = section.locator('details');
    const summary = details.locator('summary');
    check(spec.name + ': details initially collapsed', !(await details.getAttribute('open')) && await details.evaluate(e => !e.open));
    await summary.focus();
    await page.keyboard.press('Enter');
    check(spec.name + ': keyboard opens all supporting facts', await details.evaluate(e => e.open) && await details.locator('dt').count() === 4);
    check(spec.name + ': ownership remains explicit', (await details.innerText()).includes('account stays in your name'));
    const focus = await summary.evaluate(e => ({ width:parseFloat(getComputedStyle(e).outlineWidth), visible:e.matches(':focus-visible') }));
    check(spec.name + ': visible focus', focus.visible && focus.width >= 3, focus);
    if (['mobile','desktop'].includes(spec.name)) await captureSection(page, spec.name + '-expanded.jpg');
    await page.evaluate(axe.source);
    const violations = await page.evaluate(async () => (await axe.run('#compare', { runOnly:{ type:'tag',values:['wcag2a','wcag2aa','wcag21aa'] } })).violations.map(v => ({ id:v.id,nodes:v.nodes.map(n => n.failureSummary) })));
    check(spec.name + ': automated accessibility checks', violations.length === 0, violations);
    await summary.focus();
    await page.keyboard.press('Space');
    check(spec.name + ': keyboard closes details', await details.evaluate(e => !e.open));
    if (spec.name === 'mobile') {
      await section.getByRole('link', {name:'Let’s talk'}).click();
      await page.waitForURL(/\/contact\/?$/);
      check('mobile: contact action uses existing route', /\/contact\/?$/.test(new URL(page.url()).pathname));
      await page.goBack({waitUntil:'networkidle'});
      check('mobile: browser back keeps comparison anchor', new URL(page.url()).hash === '#compare');
    }
  } catch (e) {
    check(spec.name + ': browser execution', false, e.message);
  } finally { await context.close(); }
}
await browser.close();

// WebKit is tested when its installed runtime is available; absence is reported.
let safari;
try { safari = await webkit.launch({ headless:true }); }
catch (e) { report.unavailable.push({ browser:'WebKit',reason:e.message.split('\n')[0] }); }
if (safari) {
  const page = await safari.newPage({ viewport:{ width:390,height:844 },reducedMotion:'reduce' });
  try {
    await page.goto(base+'/services#compare',{waitUntil:'networkidle'});
    await page.evaluate(()=>document.fonts.ready);
    const section=page.locator('#compare');
    await section.locator('summary').click();
    const facts=await section.evaluate(e=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,open:e.querySelector('details').open,rows:e.querySelectorAll('tbody tr').length}));
    check('WebKit mobile: no overflow, working disclosure',facts.width===facts.scrollWidth&&facts.open&&facts.rows===3,facts);
    await captureSection(page, 'webkit-mobile.jpg');
  } catch(e) { check('WebKit mobile: browser execution',false,e.message); }
  await safari.close();
}
report.pass=report.checks.every(c=>c.pass)&&report.errors.length===0;
await fs.writeFile(path.join(root,'verification.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({pass:report.pass,renders:report.pages.length,checks:report.checks.length,failures:report.checks.filter(c=>!c.pass),errors:report.errors,unavailable:report.unavailable,heights:report.pages.map(p=>({name:p.name,height:p.height}))},null,2));
if(!report.pass) process.exitCode=1;
