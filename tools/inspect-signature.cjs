const fs=require('node:fs'),path=require('node:path');const {chromium}=require('playwright');
const out=path.join(process.cwd(),'artifacts/signature-experience/screens');fs.mkdirSync(out,{recursive:true});
const base=process.env.PORTFOLIO_BASE_URL||'http://127.0.0.1:5208';
async function inspect(){const browser=await chromium.launch({channel:'chrome',headless:true});const report=[];
try{for(const width of [1440,390]){
 const context=await browser.newContext({viewport:{width,height:width>800?1000:844},deviceScaleFactor:1});const p=await context.newPage();p.setDefaultTimeout(7000);const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(base,{waitUntil:'networkidle',timeout:25000});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1200);await p.screenshot({path:path.join(out,`hero-${width}.png`)});
 for(const [name,selector] of [['anatomy','#anatomy'],['care','#care-story'],['playground','#craft']]){
  await p.locator(selector).scrollIntoViewIfNeeded();await p.waitForTimeout(name==='anatomy'?2700:850);await p.locator(selector).screenshot({path:path.join(out,`${name}-${width}.png`)});
  const metrics=await p.locator(selector).evaluate(e=>({width:e.clientWidth,scroll:e.scrollWidth,height:e.clientHeight,renderer:e.querySelector('[data-renderer]')?.getAttribute('data-renderer')}));report.push({name,width,metrics});
 }
 await p.getByRole('button',{name:'Step 4: Review'}).click();await p.waitForTimeout(800);await p.locator('#care-story').screenshot({path:path.join(out,`care-review-${width}.png`)});
 await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(600);await p.getByRole('button',{name:'Take the studio tour'}).click();await p.waitForTimeout(1400);await p.screenshot({path:path.join(out,`tour-${width}.png`)});await p.getByRole('button',{name:'Close studio tour'}).click();
 await p.goto(base+'/projects',{waitUntil:'networkidle'});await p.waitForTimeout(650);await p.locator('.screen-atlas').screenshot({path:path.join(out,`atlas-${width}.png`)});
 await p.goto(base+'/about',{waitUntil:'networkidle'});await p.locator('#method').scrollIntoViewIfNeeded();await p.waitForTimeout(650);await p.locator('.method-stage').screenshot({path:path.join(out,`method-${width}.png`)});
 await p.goto(base+'/contact',{waitUntil:'networkidle'});await p.waitForTimeout(700);report.push({name:'runtime',width,errors});await context.close();
}}
finally{await browser.close();fs.writeFileSync(path.join(out,'inspection.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));}}
inspect().catch(e=>{console.error(e);process.exitCode=1});
