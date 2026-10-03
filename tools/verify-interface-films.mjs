import { spawnSync } from 'node:child_process';
import { mkdir, readFile, writeFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

const baseURL = process.env.PORTFOLIO_BASE_URL || 'http://127.0.0.1:5199';
const origin = new URL(baseURL);
if (!['127.0.0.1','localhost','[::1]'].includes(origin.hostname)) throw new Error('Verification requires a loopback preview');
const out = process.env.FILM_QA_OUTPUT || 'artifacts/interface-films/browser';
await mkdir(out,{recursive:true});
const files=[];
for (const folder of ['projects/baghban','projects/plant-health-clinic','projects/treat-my-fish','projects/skiie','projects/trace-amp','projects/kashcrop','portfolio-reel']) {
 for (const file of ['film.mp4','poster.webp',...(folder.startsWith('projects/') ? ['film-mobile.mp4','poster-mobile.webp'] : []),...(folder==='projects/baghban' ? ['film-square.mp4','poster-square.webp'] : [])]) {
  const filename=path.join('public/media',folder,file),info=await stat(filename);
  if(info.size===0)throw new Error('Empty media: '+filename);
  files.push({path:filename,bytes:info.size,sha256:createHash('sha256').update(await readFile(filename)).digest('hex')});
 }
}
await writeFile(path.join(out,'asset-manifest.json'),JSON.stringify({verifiedAt:new Date().toISOString(),files},null,2));
function run(command,args,env={}){const result=spawnSync(command,args,{stdio:'inherit',env:{...process.env,...env}});if(result.status!==0)process.exit(result.status||1);}
run('npm',['run','check']);
run('npx',['--no-install','playwright','test','tests/portfolio/films.spec.ts','tests/portfolio/interactions.spec.ts','tests/portfolio/responsive.spec.ts','tests/portfolio/routes.spec.ts'],{PORTFOLIO_BASE_URL:baseURL,FILM_QA_OUTPUT:out});
console.log('Interface-film checks passed. Chromium phone emulation does not certify physical iOS/Safari behavior.');
