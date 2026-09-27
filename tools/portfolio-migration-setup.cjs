const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),stamp=new Date().toISOString().replace(/[:.]/g,'-');
const out=path.join(root,'artifacts','production-migration',stamp);fs.mkdirSync(out,{recursive:true});
const entries=[];
function preserve(dir){for(const e of fs.readdirSync(path.join(root,dir),{withFileTypes:true})){const rel=path.join(dir,e.name);if(e.isDirectory())preserve(rel);else {const bytes=fs.readFileSync(path.join(root,rel));const dest=path.join(out,rel+'.snapshot');fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,bytes);entries.push({path:rel,sha256:crypto.createHash('sha256').update(bytes).digest('hex')});}}}
for(const dir of ['app','public','functions'])if(fs.existsSync(path.join(root,dir)))preserve(dir);
for(const rel of ['package.json','package-lock.json','vite.config.ts','react-router.config.ts','tsconfig.json','wrangler.toml','DESIGN.md','PRODUCT.md','AGENTS.md']){if(!fs.existsSync(path.join(root,rel)))continue;const bytes=fs.readFileSync(path.join(root,rel));fs.writeFileSync(path.join(out,rel+'.snapshot'),bytes);entries.push({path:rel,sha256:crypto.createHash('sha256').update(bytes).digest('hex')});}
fs.writeFileSync(path.join(out,'manifest.json'),JSON.stringify(entries,null,2));
const log=path.join(root,'artifacts','production-migration');fs.writeFileSync(path.join(log,'checkpoint.txt'),out);
for(const p of ['app/components/portfolio','app/styles/portfolio','app/data/portfolio','app/lib/portfolio','app/hooks/portfolio','public/media/portfolio','docs/portfolio','artifacts/production-migration/evidence'])fs.mkdirSync(path.join(root,p),{recursive:true});
// Promote approved styling and media into the real application. The lab remains unchanged.
const lab=path.join(root,'design-lab','theatre-refined');
for(const file of ['foundation.css','stage.css','portfolio.css','viewer.css','refinement.css'])fs.copyFileSync(path.join(lab,file),path.join(root,'app/styles/portfolio',file));
for(const file of fs.readdirSync(path.join(root,'design-lab/assets'))){if(/\.(webp|png|svg)$/.test(file))fs.copyFileSync(path.join(root,'design-lab/assets',file),path.join(root,'public/media/portfolio',file));}
fs.copyFileSync(path.join(lab,'skiie-logo.png'),path.join(root,'public/media/portfolio/skiie-logo.png'));
// Keep the existing public form integration without printing its access key.
const contact=fs.readFileSync(path.join(root,'app/routes/contact.tsx'),'utf8');const key=contact.match(/WEB3FORMS_ACCESS_KEY\s*=\s*"([^"]+)"/);
if(!key)throw Error('Existing contact integration key was not found; no production changes made to the route.');
fs.writeFileSync(path.join(root,'app/lib/portfolio/contact-config.server.ts'),`// Existing Web3Forms integration, moved out of the client bundle. Override with CONTACT_FORM_ACCESS_KEY.\nexport const existingFormAccessKey = ${JSON.stringify(key[1])};\n`);
console.log(`Preserved ${entries.length} original files in ${out}`);console.log('Approved assets and styles copied into app/ and public/. No production deployment.');
