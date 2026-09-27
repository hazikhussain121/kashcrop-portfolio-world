const fs=require('node:fs'),path=require('node:path');const {pathToFileURL}=require('node:url');const sharp=require('../../node_modules/sharp');
const {chromium}=require('C:/PROJECTS/Tree Passport Platform/node_modules/playwright');const root=__dirname,out=path.join(root,'evidence','pass-two');
const lum=c=>{const v=c.map(n=>n/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return .2126*v[0]+.7152*v[1]+.0722*v[2];};
const ratio=(a,b)=>(Math.max(lum(a),lum(b))+.05)/(Math.min(lum(a),lum(b))+.05);
const selectors=['.stage-top>span','#stage-index','.pose-button>span','#stage-name','#stage-category'];
(async()=>{const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});const results=[];
try{for(const width of [1440,390]){const page=await browser.newPage({viewport:{width,height:1000},deviceScaleFactor:1});await page.goto(pathToFileURL(path.join(root,'index.html')).href);await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(1100);
for(const project of ['garden','phc','skiie']){
 await page.evaluate(id=>window.KC.selectProject(id),project);await page.waitForTimeout(1000);await page.evaluate(()=>scrollTo(0,0));
 const regions=await page.evaluate(selectors=>selectors.map(selector=>{const e=document.querySelector(selector),r=e.getBoundingClientRect(),s=getComputedStyle(e);return {selector,x:r.x,y:r.y,width:r.width,height:r.height,color:s.color,opacity:s.opacity};}),selectors);
 const style=await page.addStyleTag({content:selectors.map(s=>s+','+s+' *').join(',')+'{color:transparent!important}'});
 const raw=await sharp(await page.screenshot()).removeAlpha().raw().toBuffer({resolveWithObject:true});
 const measured=regions.map(r=>{const numbers=r.color.match(/[\d.]+/g).map(Number),alpha=numbers[3]??1;let minimum=21;
 for(let y=Math.max(0,Math.ceil(r.y));y<Math.min(raw.info.height,r.y+r.height);y+=3)for(let x=Math.max(0,Math.ceil(r.x));x<Math.min(raw.info.width,r.x+r.width);x+=3){const i=(y*raw.info.width+x)*raw.info.channels,bg=[...raw.data.subarray(i,i+3)],fg=numbers.slice(0,3).map((v,n)=>v*alpha+bg[n]*(1-alpha));minimum=Math.min(minimum,ratio(fg,bg));}
 return {selector:r.selector,minimumContrast:Number(minimum.toFixed(2))};});
 results.push({width,project,measured});await style.evaluate(e=>e.remove());
}
await page.close();}
}finally{await browser.close();fs.writeFileSync(path.join(out,'contrast-stage.json'),JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));}
})();
