import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import ts from 'typescript';
import axe from 'axe-core';
import { chromium } from '@playwright/test';
const mode=process.argv[2]||'core', base='http://127.0.0.1:5216', root=path.resolve('.impeccable/review/press');
await fs.mkdir(root,{recursive:true});
const source=await fs.readFile('app/data/portfolio/press.ts','utf8');
const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const data=await import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'));
const report={mode,startedAt:new Date().toISOString(),pages:[],checks:[],errors:[],accessibility:[],captures:[]};
function check(name,pass,details){report.checks.push({name,pass:Boolean(pass),...(details===undefined?{}:{details})});}
async function attempt(name,fn){try{await fn();check(name,true);}catch(e){check(name,false,e.message);}}
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
async function ready(page,route){
 const response=await page.goto(base+route,{waitUntil:'networkidle'});
 await page.evaluate(async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));});
 await page.waitForTimeout(700);
 return response;
}
async function crop(page,buffer,selector,name){
 const box=await page.locator(selector).evaluate(el=>{const b=el.getBoundingClientRect();return {left:Math.floor(b.left+scrollX),top:Math.floor(b.top+scrollY),width:Math.ceil(b.width),height:Math.ceil(b.height)}});
 const info=await sharp(buffer).metadata();box.width=Math.min(box.width,info.width-box.left);box.height=Math.min(box.height,info.height-box.top);
 await sharp(buffer).extract(box).jpeg({quality:91}).toFile(path.join(root,name));report.captures.push(name);
}
const routes=mode==='core'?[{key:'home',route:'/',selector:'#in-the-news',ids:data.featuredPressIds},{key:'about',route:'/about',selector:'#press',ids:data.pressMentions.map(m=>m.id)}]:[{key:'kashcrop',route:'/projects/kashcrop',selector:'#project-press',ids:data.getProjectPress('kashcrop').slice(0,3).map(m=>m.id)},{key:'phc',route:'/projects/plant-health-clinic',selector:'#project-press',ids:data.getProjectPress('plant-health-clinic').slice(0,3).map(m=>m.id)}];
const viewports=[{width:1440,height:1000,label:'desktop'},{width:390,height:844,label:'mobile'},...(mode==='core'?[{width:375,height:812,label:'375'}]:[])];
for(const viewport of viewports){
 for(const route of routes){
  if(viewport.label==='375'&&route.key!=='home')continue;
  const name=route.key+'-'+viewport.label;
  const page=await browser.newPage({viewport:{width:viewport.width,height:viewport.height}});
  page.on('pageerror',e=>report.errors.push({name,error:e.message}));
  page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)report.errors.push({name,status:r.status(),url:r.url()});});
  const response=await ready(page,route.route);
  const facts=await page.evaluate(()=>({title:document.title,h1:document.querySelectorAll('h1').length,width:innerWidth,scrollWidth:document.documentElement.scrollWidth,missingImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.currentSrc)}));
  report.pages.push({name,route:route.route,status:response.status(),...facts});
  check(name+' loads and fits',response.status()===200&&facts.h1===1&&facts.scrollWidth<=facts.width&&facts.missingImages.length===0,facts);
  const full=await page.screenshot({fullPage:true,type:'jpeg',quality:82});
  await crop(page,full,route.selector,name+'-press.jpg');
  if(route.key==='home'){
   const top=viewport.label==='375'?'user-375.png':viewport.label+'.png';
   await page.screenshot({path:path.join(root,top)});report.captures.push(top);
   if(viewport.label==='desktop'){await fs.writeFile(path.join(root,'home-desktop-full.jpg'),full);report.captures.push('home-desktop-full.jpg');}
  }
  if(route.key==='about'){
   await crop(page,full,'#recognition','about-'+viewport.label+'-recognition.jpg');
   if(viewport.label==='desktop'){await fs.writeFile(path.join(root,'about-desktop-full.jpg'),full);report.captures.push('about-desktop-full.jpg');}
  }
  const rendered=await page.locator(route.selector+' [data-press-id]').evaluateAll(els=>els.map(el=>({id:el.dataset.pressId,quote:el.querySelector('blockquote')?.textContent?.trim(),cite:el.querySelector('blockquote')?.getAttribute('cite'),date:el.querySelector('time')?.getAttribute('datetime'),link:el.querySelector('a[href^="https://"]')?.getAttribute('href'),text:el.textContent})));
  check(name+' contains intended coverage',JSON.stringify(rendered.map(r=>r.id))===JSON.stringify(route.ids));
  check(name+' preserves quotes dates and source URLs',rendered.every(r=>{const p=data.pressMentions.find(m=>m.id===r.id);return p&&r.quote==='“'+p.quote+'”'&&r.cite===p.href&&r.link===p.href&&r.date===p.published&&(!p.attribution||r.text.includes(p.attribution));}));
  const links=await page.locator(route.selector+' a').evaluateAll(els=>els.map(a=>({href:a.getAttribute('href'),target:a.getAttribute('target'),rel:a.getAttribute('rel'),height:a.getBoundingClientRect().height,width:a.getBoundingClientRect().width})));
  check(name+' source links have safe targets and touch sizes',links.every(a=>a.height>=43.9&&a.width>=44&&(!a.href.startsWith('https://')||(a.target==='_blank'&&a.rel.includes('noopener')&&a.rel.includes('noreferrer')))),links);
  const action=page.locator(route.selector+' .od-press-link').first();await action.focus();await page.keyboard.press('Tab');await page.keyboard.press('Shift+Tab');
  const focus=await action.evaluate(el=>({focused:el===document.activeElement,visible:el.matches(':focus-visible'),color:getComputedStyle(el).outlineColor,width:parseFloat(getComputedStyle(el).outlineWidth)}));
  check(name+' light-surface keyboard focus',focus.focused&&focus.visible&&focus.width>=3&&focus.color==='rgb(36, 72, 232)',focus);
  await page.evaluate(()=>document.activeElement?.blur());
  if(route.key==='home'||route.key==='about'){
   const records=await page.locator('[data-recognition-id]').evaluateAll(els=>els.map(el=>({id:el.dataset.recognitionId,type:el.dataset.sourceType,source:el.querySelector('a')?.textContent,date:el.querySelector('time')?.getAttribute('datetime')||null,text:el.textContent})));
   const expected=data.recognitionItems.filter(r=>route.key==='about'||r.sourceType==='institution');
   check(name+' recognition sources remain distinct',records.length===expected.length&&records.every(r=>{const e=expected.find(x=>x.id===r.id);return e&&r.type===e.sourceType&&r.source.includes(e.source)&&r.date===(e.dateTime||null);}),records);
  }
  if(route.key==='about'){
   const kvk=await page.locator('[data-recognition-id="kvk-pulwama-2026"]').innerText();
   check(name+' KVK date remains month only',kvk.includes('January 2026')&&!kvk.includes('15 Jan')&&kvk.includes('Founder’s post'));
  }
  await page.evaluate(axe.source);
  const accessibility=await page.evaluate(async()=>await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}));
  report.accessibility.push({name,violations:accessibility.violations.map(v=>({id:v.id,help:v.help,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
  if(mode==='cases')await attempt(name+' chapter link reaches its section',async()=>{
   await page.locator('.od-case-chapters a[href="#project-press"]').click();
   await page.waitForFunction(()=>{const b=document.querySelector('#project-press').getBoundingClientRect();return location.hash==='#project-press'&&b.top>=60&&b.top<innerHeight*.6;},{},{timeout:4000});
  });
  if(route.key==='about')await attempt(name+' recognition anchor works',async()=>{
   await page.locator('#press a[href="#recognition"]').click();
   await page.waitForFunction(()=>{const b=document.querySelector('#recognition').getBoundingClientRect();return location.hash==='#recognition'&&b.top>=60&&b.top<innerHeight*.6;},{},{timeout:4000});
  });
  if(route.key==='home'&&viewport.label==='mobile')await attempt('Home full-coverage link opens About at press',async()=>{
   await page.locator('.od-press-feature-footer a').click();await page.waitForURL('**/about#press');
   await page.waitForFunction(()=>{const b=document.querySelector('#press')?.getBoundingClientRect();return b&&b.top>=60&&b.top<innerHeight*.6;},{},{timeout:4000});
  });
  await page.close();
 }
}
if(mode==='core'){
 const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
 await ready(page,'/#in-the-news');
 check('Reduced motion retains all press and source links',await page.locator('#in-the-news blockquote').count()===3&&await page.locator('#in-the-news a[href^="https://"]').count()===5);
 await page.close();
}else{
 const response=await fetch(base+'/projects/skiie'),html=await response.text();
 check('Unrelated case has no empty press section or chapter',response.ok&&!html.includes('id="project-press"')&&!html.includes('href="#project-press"'));
}
await browser.close();
report.finishedAt=new Date().toISOString();
await fs.writeFile(path.join(root,mode+'-verification.json'),JSON.stringify(report,null,2));
const failures=report.checks.filter(c=>!c.pass),violations=report.accessibility.filter(a=>a.violations.length);
console.log(JSON.stringify({mode,renders:report.pages.length,checks:report.checks.length,failures,errors:report.errors,violations,captures:report.captures}));
if(failures.length||report.errors.length||violations.length)process.exit(1);
