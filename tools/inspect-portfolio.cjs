const fs=require('node:fs'),path=require('node:path');const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),out=path.join(root,'artifacts/production-migration/evidence');fs.mkdirSync(out,{recursive:true});
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});const results=[];try{
 for(const width of [1440,390]){
  const context=await browser.newContext({viewport:{width,height:width===1440?1000:844},deviceScaleFactor:1});
  for(const route of ['/','/projects','/projects/baghban','/services','/services/ai-training','/about','/contact']){
   const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
   const response=await page.goto('http://127.0.0.1:5198'+route,{waitUntil:'networkidle',timeout:20000});await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(400);
   const slug=route==='/'?'home':route.slice(1).replaceAll('/','-');
   await page.screenshot({path:path.join(out,`${slug}-${width}.png`)});
   const audit=await page.evaluate(()=>({title:document.title,h1:document.querySelector('h1')?.textContent,width:innerWidth,scrollWidth:document.documentElement.scrollWidth,loadedImages:[...document.images].filter(i=>i.complete&&i.naturalWidth>0).length,brokenImages:[...document.images].filter(i=>i.complete&&i.getAttribute('src')&&!i.naturalWidth).map(i=>i.getAttribute('src')),links:document.querySelectorAll('a').length,overflow:[...document.querySelectorAll('main *')].filter(e=>{if(e.closest('.project-artwork,.product-stage,.media-stage,.about-scene,.contact-project-strip,.system-map,.responsive-stage'))return false;const r=e.getBoundingClientRect();return r.width>0&&(r.right>innerWidth+1||r.left<-1)}).slice(0,8).map(e=>({tag:e.tagName,cls:e.className}))}));
   results.push({route,width,status:response.status(),errors,...audit});await page.close();
  }await context.close();
 }
 }finally{await browser.close();fs.writeFileSync(path.join(out,'initial-browser-review.json'),JSON.stringify(results,null,2));console.log(JSON.stringify(results.map(r=>({route:r.route,width:r.width,status:r.status,overflow:r.overflow,errors:r.errors,broken:r.brokenImages})),null,2));}
})().catch(e=>{console.error(e);process.exitCode=1});
