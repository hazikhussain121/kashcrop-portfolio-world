import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

const out = process.argv[2] || 'artifacts/interface-films/font-cache';
await mkdir(out, { recursive: true });
const root = await readFile('app/root.tsx', 'utf8');
const url = root.match(/const FONT_URL='([^']+)'/)?.[1];
if (!url || new URL(url).hostname !== 'fonts.googleapis.com') throw new Error('Expected the existing public Google Fonts stylesheet');
const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 Chrome/120.0.0.0 Safari/537.36' } });
if (!response.ok) throw new Error('Font stylesheet: ' + response.status);
const css = await response.text();
const manifest = { stylesheet: url, assets: {} };
for (const match of css.matchAll(/url\(([^)]+)\)/g)) {
 const asset = match[1];
 if (new URL(asset).hostname !== 'fonts.gstatic.com') throw new Error('Unexpected font origin');
 const file = createHash('sha256').update(asset).digest('hex').slice(0, 16) + path.extname(new URL(asset).pathname);
 const download = await fetch(asset);
 if (!download.ok) throw new Error('Font asset: ' + download.status);
 await writeFile(path.join(out, file), Buffer.from(await download.arrayBuffer()));
 manifest.assets[asset] = file;
}
await writeFile(path.join(out, 'fonts.css'), css);
await writeFile(path.join(out, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log('Cached the existing portfolio typefaces for isolated visual QA: ' + Object.keys(manifest.assets).length + ' font files');
