import fs from 'node:fs';
import assert from 'node:assert/strict';

const html = fs.readFileSync('index.html', 'utf8');
const main = fs.readFileSync('src/main.js', 'utf8');
const content = fs.readFileSync('src/content.js', 'utf8');
const ids = ['top', 'work', 'vizier', 'founder', 'contact'];
const positions = ids.map((id) => html.indexOf(`id="${id}"`));
assert(positions.every((p) => p >= 0), 'all required section IDs exist');
assert(positions.every((p, i) => i === 0 || p > positions[i - 1]), 'section IDs are in company-first order');
assert.match(html, /<title>KashCrop Innovations \| Software and AI systems from Kashmir<\/title>/);
assert.match(html, /designs and builds web, mobile and AI software across sectors/);
for (const claim of ['AI-first', 'Five systems in the field, each running Vizier', 'now runs across them', 'everything we build']) {
  assert.equal(html.includes(claim), false, `prohibited claim absent from HTML: ${claim}`);
}
for (const target of ['#top', '#work', '#vizier', '#founder', '#contact']) assert.ok(html.includes(`href="${target}"`), `hash target exists: ${target}`);
assert.equal((content.match(/slug:/g) || []).length, 5, 'all five project entries remain');
assert.match(main, /p\.vizier \?/);
assert.match(main, /getElementById\('vizier'\)/);
console.log('site checks passed: order, metadata, claims, anchors, five projects, optional Vizier rendering');
