// Checkpoint and reference acquisition only. Never deploys or touches environment secrets.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=process.cwd(),out=path.join(root,'artifacts/signature-experience');fs.mkdirSync(out,{recursive:true});
const checkpoint=path.join(out,'checkpoint-'+new Date().toISOString().replaceAll(':','-'));fs.mkdirSync(checkpoint,{recursive:true});
const manifest=[];
function copy(file){if(!fs.existsSync(file))return;const rel=path.relative(root,file),dest=path.join(checkpoint,rel);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(file,dest);manifest.push({path:rel,sha256:crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')});}
function walk(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,item.name);if(item.isDirectory())walk(p);else copy(p);}}
walk(path.join(root,'app'));for(const f of ['package.json','package-lock.json','vite.config.ts','vitest.config.ts','playwright.config.ts','react-router.config.ts','tsconfig.json','PRODUCT.md','DESIGN.md'])copy(path.join(root,f));
fs.writeFileSync(path.join(checkpoint,'manifest.json'),JSON.stringify(manifest,null,2));fs.writeFileSync(path.join(out,'checkpoint.txt'),checkpoint);
const target=path.join(root,'docs/design/references/mengto');fs.mkdirSync(target,{recursive:true});
(async()=>{for(const name of ['build-awwwards-quality-sites','cinematic-scroll-storytelling','threejs','gsap-scrolltrigger-storytelling']){const url=`https://raw.githubusercontent.com/MengTo/Skills/main/agent-skills/web-design/${name}/SKILL.md`;try{const r=await fetch(url,{signal:AbortSignal.timeout(12000)});if(!r.ok)throw new Error(String(r.status));fs.writeFileSync(path.join(target,name+'.md'),await r.text());console.log('Reference saved:',name);}catch(e){console.log('Reference unavailable:',name,e.message);}}
try{const r=await fetch('https://raw.githubusercontent.com/MengTo/Skills/main/LICENSE',{signal:AbortSignal.timeout(12000)});if(r.ok)fs.writeFileSync(path.join(target,'LICENSE.txt'),await r.text());}catch{}
console.log('Checkpoint:',manifest.length,'files. Reference documents only; no third-party executable code run.');})().catch(e=>{console.error(e);process.exitCode=1});
