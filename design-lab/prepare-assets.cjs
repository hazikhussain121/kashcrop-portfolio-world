// Isolated portfolio concept lab. Never writes to production app/public files.
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('../node_modules/sharp');
const { chromium } = require('C:/PROJECTS/Tree Passport Platform/node_modules/playwright');
const root = __dirname;
const assets = path.join(root, 'assets');
const evidence = path.join(root, 'evidence');
const refs = path.join(root, 'research');
for (const dir of [assets, evidence, refs, path.join(root,'vendor')]) fs.mkdirSync(dir, { recursive: true });
const garden = 'C:/PROJECTS/Garden Guardians Platform (Needs a Name)';
const phc = 'C:/PROJECTS/Plant Health Clinic';
const sources = [
 ['garden-home',`${garden}/artifacts/grower-experience-2026-09-20/browser/01-home-390.png`,780],
 ['garden-calendar',`${garden}/artifacts/grower-experience-2026-09-20/browser/07-calendar-390.png`,780],
 ['garden-service',`${garden}/artifacts/grower-experience-2026-09-20/browser/02-orchard-service-390.png`,780],
 ['garden-varieties',`${garden}/artifacts/grower-experience-2026-09-20/browser/11-variety-result-390.png`,780],
 ['garden-desktop',`${garden}/artifacts/grower-experience-2026-09-20/browser/responsive-home-1440.png`,1440],
 ['phc-home',`${phc}/artifacts/farmer-ios-20260920/chromium/home.png`,780],
 ['phc-submit',`${phc}/artifacts/farmer-ios-20260920/chromium/submit-case.png`,780],
 ['phc-guide',`${phc}/artifacts/farmer-ios-20260920/chromium/photo-guide-sheet.png`,780],
 ['leaf',`${phc}/public/assets/farmer/leaf-lens-cutout.webp`,700],
 ['tree-tag','C:/PROJECTS/Tree Passport Platform/public/legacy/tag-concept.webp',1400],
 ['cedar','C:/PROJECTS/Tree Passport Platform/public/legacy/cedar.webp',1400],
 ['orchard',`${garden}/public/assets/notion/header-orchard-signature.png`,1600],
 ['orchard-care',`${garden}/public/assets/home-native/pruning-orchard-planning.webp`,1000],
];
(async()=>{
 const manifest=[];
 for(const [name,src,width] of sources){
  if(!fs.existsSync(src)){ console.log('MISSING',src); continue; }
  const dest=path.join(assets,`${name}.webp`);
  await sharp(src).resize({width,withoutEnlargement:true}).webp({quality:88}).toFile(dest);
  const m=await sharp(dest).metadata();
  manifest.push({name,file:`assets/${name}.webp`,source:src,width:m.width,height:m.height,kind:name.startsWith('garden-')||name.startsWith('phc-')?'Existing local QA capture; local build, not a claim of current public release':'Existing project artwork; illustrative, not documentary evidence',bytes:fs.statSync(dest).size});
 }
 fs.copyFileSync(path.join(root,'../public/kashcrop-logo.png'),path.join(assets,'kashcrop-logo.png'));
 fs.copyFileSync(path.join(root,'../public/favicon.svg'),path.join(assets,'favicon.svg'));
 fs.copyFileSync(path.join(root,'../node_modules/gsap/dist/gsap.min.js'),path.join(root,'vendor/gsap.min.js'));
 fs.copyFileSync(path.join(root,'../node_modules/gsap/dist/Flip.min.js'),path.join(root,'vendor/Flip.min.js'));
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 try {
  const page=await browser.newPage({viewport:{width:1440,height:960},deviceScaleFactor:1});
  for(const [name,url] of [['live-before','https://kashcrop.in'],['skiie','https://skiie.co.in']]){
   try{
    await page.goto(url,{waitUntil:'domcontentloaded',timeout:25000});
    await page.waitForTimeout(2800);
    await page.screenshot({path:path.join(evidence,`${name}.png`)});
    if(name==='skiie')await sharp(path.join(evidence,`${name}.png`)).webp({quality:88}).toFile(path.join(assets,'skiie.webp'));
    fs.writeFileSync(path.join(evidence,`${name}-audit.json`),JSON.stringify(await page.evaluate(()=>({title:document.title,h1:[...document.querySelectorAll('h1')].map(x=>x.textContent),imageCount:document.images.length,videoCount:document.querySelectorAll('video').length,images:[...document.images].map(x=>({alt:x.alt,src:x.currentSrc})),bodyWords:document.body.innerText.split(/\s+/).length})),null,2));
    manifest.push({name,file:name==='skiie'?'assets/skiie.webp':`evidence/${name}.png`,source:url,kind:'Public website capture',capturedAt:new Date().toISOString()});
   }catch(e){console.log('CAPTURE FAILED',name,e.message)}
  }
 }finally{await browser.close()}
 // Download guidance as reference documents only; never auto-execute third-party scripts.
 const downloads=[
 ['frontend-design.md','https://raw.githubusercontent.com/anthropics/skills/main/skills/frontend-design/SKILL.md'],
 ['gsap-timeline.md','https://raw.githubusercontent.com/greensock/gsap-skills/main/skills/gsap-timeline/SKILL.md'],
 ['gsap-performance.md','https://raw.githubusercontent.com/greensock/gsap-skills/main/skills/gsap-performance/SKILL.md'],
 ['gsap-LICENSE.txt','https://raw.githubusercontent.com/greensock/GSAP/master/LICENSE'],
 ];
 for(const [file,url] of downloads){try{const r=await fetch(url,{signal:AbortSignal.timeout(12000)});if(!r.ok)throw new Error(r.status);fs.writeFileSync(path.join(refs,file),await r.text());console.log('DOWNLOADED',file)}catch(e){console.log('DOWNLOAD FAILED',file,e.message)}}
 fs.writeFileSync(path.join(assets,'manifest.json'),JSON.stringify(manifest,null,2));
 console.log(JSON.stringify(manifest.map(x=>({name:x.name,width:x.width,height:x.height,bytes:x.bytes})),null,2));
})().catch(e=>{console.error(e);process.exitCode=1});
