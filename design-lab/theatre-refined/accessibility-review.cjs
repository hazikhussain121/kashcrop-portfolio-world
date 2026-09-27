// Automated checks are complementary to manual review, not a certification.
const fs=require('node:fs'),path=require('node:path');const {pathToFileURL}=require('node:url');
const {chromium}=require('C:/PROJECTS/Tree Passport Platform/node_modules/playwright');
const axePath=require.resolve('axe-core',{paths:['C:/PROJECTS/Tree Passport Platform']});
const root=__dirname,out=path.join(root,'evidence','pass-two');
(async()=>{const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});const results=[];
try{for(const width of [1440,390]){const page=await browser.newPage({viewport:{width,height:960}});await page.goto(pathToFileURL(path.join(root,'index.html')).href);await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(1000);await page.addScriptTag({path:axePath});
for(const state of ['page','phc-stage','viewer']){
 if(state==='phc-stage'){await page.locator('#tab-phc').click();await page.waitForTimeout(1000);}
 if(state==='viewer'){await page.locator('#stage-open').click();await page.waitForTimeout(500);}
 const result=await page.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']}});return {version:r.testEngine.version,violations:r.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,help:v.help,nodes:v.nodes.map(n=>({target:n.target,html:n.html,summary:n.failureSummary}))})),incomplete:r.incomplete.map(v=>({id:v.id,nodes:v.nodes.length})),passes:r.passes.length};});
 results.push({width,state,...result});fs.writeFileSync(path.join(out,'accessibility-review.json'),JSON.stringify(results,null,2));
}
await page.close();}
}finally{await browser.close();console.log(JSON.stringify(results.map(r=>({width:r.width,state:r.state,version:r.version,violations:r.violations,incomplete:r.incomplete})),null,2));process.exitCode=results.some(r=>r.violations.length)?1:0;}
})().catch(e=>{console.error(e);process.exitCode=1;});
