import fs from 'node:fs/promises';
import { chromium } from '@playwright/test';
const base='https://prove-jane-little-ranking.trycloudflare.com';
const report={base,startedAt:new Date().toISOString(),pages:[],errors:[]};
const specs=[
 {route:'/#in-the-news',selector:'#in-the-news',press:3,recognition:2,width:390,height:844},
 {route:'/about#press',selector:'#press',press:6,recognition:4,width:1440,height:1000},
 {route:'/about#recognition',selector:'#recognition',press:6,recognition:4,width:390,height:844},
 {route:'/projects/kashcrop#project-press',selector:'#project-press',press:3,recognition:0,width:1440,height:1000},
 {route:'/projects/plant-health-clinic#project-press',selector:'#project-press',press:1,recognition:0,width:390,height:844}
];
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
await Promise.all(specs.map(async s=>{
 const context=await browser.newContext({viewport:{width:s.width,height:s.height}});
 const page=await context.newPage();
 page.on('pageerror',e=>report.errors.push({route:s.route,error:e.message}));
 page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)report.errors.push({route:s.route,status:r.status(),url:r.url()});});
 try{
  const response=await page.goto(base+s.route,{waitUntil:'networkidle',timeout:25000});
  await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].filter(i=>i.complete).map(i=>i.decode().catch(()=>{})));});
  await page.waitForFunction(sel=>{const b=document.querySelector(sel)?.getBoundingClientRect();return b&&b.top>=60&&b.top<innerHeight*.7;},s.selector,{timeout:5000});
  const facts=await page.evaluate(sel=>({url:location.href,title:document.title,width:innerWidth,scrollWidth:document.documentElement.scrollWidth,press:document.querySelectorAll('[data-press-id]').length,recognition:document.querySelectorAll('[data-recognition-id]').length,anchorTop:document.querySelector(sel).getBoundingClientRect().top,loadedFonts:document.fonts.status,missingLoadedImages:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.currentSrc)}),s.selector);
  report.pages.push({...s,status:response.status(),...facts,pass:response.status()===200&&facts.press===s.press&&facts.recognition===s.recognition&&facts.scrollWidth<=s.width&&facts.missingLoadedImages.length===0&&facts.loadedFonts==='loaded'});
 }catch(e){report.pages.push({...s,pass:false,error:e.message});}
 await context.close();
}));
await browser.close();
report.finishedAt=new Date().toISOString();
report.pass=report.pages.every(p=>p.pass)&&report.errors.length===0;
await fs.writeFile('.impeccable/review/press/public-preview.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report));
if(!report.pass)process.exitCode=1;
