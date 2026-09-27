const {chromium}=require('playwright');
async function run(){const browser=await chromium.launch({channel:'chrome'});const page=await browser.newPage({viewport:{width:1440,height:1000}});const events=[];
page.on('pageerror',e=>events.push({error:e.message}));page.on('response',r=>{if(r.url().includes('.data'))events.push({status:r.status(),url:r.url()})});
try{await page.goto('http://127.0.0.1:5208/');await page.getByRole('link',{name:'Explore project',exact:true}).click();await page.locator('#project-viewer').waitFor();await page.keyboard.press('ArrowRight');await page.keyboard.press('Tab');await page.goBack();await page.waitForTimeout(500);await page.goForward();await page.locator('#project-viewer').waitFor();await page.getByText('About these images',{exact:true}).click();const link=page.getByRole('link',{name:'View the full project'});events.push({href:await link.getAttribute('href')});await link.click();await page.waitForTimeout(4000);events.push({after:page.url(),h1:await page.locator('main h1').allTextContents()});}
finally{await browser.close();console.log(JSON.stringify(events,null,2));}}
run().catch(console.error);
