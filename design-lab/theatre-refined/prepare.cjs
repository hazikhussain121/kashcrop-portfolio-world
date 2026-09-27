// Create an isolated refinement; do not edit the production application.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = __dirname, lab = path.dirname(root), project = path.dirname(lab);
fs.mkdirSync(path.join(root, 'evidence'), {recursive:true});
const files = ['package.json','package-lock.json','app/root.tsx','app/routes.ts','app/routes/home.tsx','app/app.css','app/data/content.ts','AGENTS.md','PRODUCT.md','DESIGN.md','design-lab/theatre.html','design-lab/theatre.css','design-lab/lab.js','design-lab/base.css','design-lab/refinements.css'];
const baseline = files.map(file => ({file, sha256: crypto.createHash('sha256').update(fs.readFileSync(path.join(project, file))).digest('hex')}));
const record = path.join(root, 'evidence', 'source-baseline.json');
if (!fs.existsSync(record)) fs.writeFileSync(record,JSON.stringify({at:new Date().toISOString(),files:baseline},null,2));
for (const name of ['garden-home','garden-service','garden-calendar','garden-varieties','garden-desktop','phc-home','phc-submit','phc-guide','skiie','leaf','apple-orchard']) {
 if (!fs.existsSync(path.join(lab,'assets',name+'.webp'))) throw new Error('Required source image missing: '+name);
}
fs.copyFileSync(path.join(project,'public','skiie-logo.png'), path.join(root,'skiie-logo.png'));
console.log('Prepared isolated refinement. Original A and production files are preserved.');
