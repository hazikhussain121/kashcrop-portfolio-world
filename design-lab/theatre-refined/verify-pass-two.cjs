// Browser regression tests. Serves only the design lab on a temporary loopback port.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),crypto=require('node:crypto');
const pw=require('C:/PROJECTS/Tree Passport Platform/node_modules/playwright');
const root=__dirname,lab=path.resolve(root,'..'),out=path.join(root,'evidence','pass-two');fs.mkdirSync(out,{recursive:true});
const mode=process.argv[2]||'responsive',checks=[],runtime=[],report={mode,at:new Date().toISOString(),checks,runtime};
const check=(name,ok,detail=null)=>{checks.push({name,ok:!!ok,detail});fs.writeFileSync(path.join(out,'progress-'+mode+'.json'),JSON.stringify(report,null,2));};
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.md':'text/plain; charset=utf-8','.json':'application/json'};
const server=http.createServer((req,res)=>{
 try{const requested=decodeURIComponent(new URL(req.url,'http://localhost').pathname),file=path.resolve(lab,'.'+requested);
  if(!file.startsWith(lab+path.sep)||!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404);res.end('Not found');return;}
  res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));
 }catch{res.writeHead(400);res.end('Invalid request');}
});
const wait=ms=>new Promise(r=>setTimeout(r,ms));let browser,context,page,url;
function attach(p){p.on('pageerror',e=>runtime.push(e.message));p.setDefaultTimeout(6000);}
async function navigate(p,hash=''){await p.goto(url+hash,{waitUntil:'load',timeout:20000});await p.evaluate(()=>Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,2500))]));await p.waitForTimeout(950);}
async function shot(p,name,fullPage=false){await p.screenshot({path:path.join(out,name+'.png'),fullPage});}
async function responsive(){
 context=await browser.newContext();
 for(const width of [320,375,390,430,768,1024,1440,1920]){
  const p=await context.newPage();attach(p);await p.setViewportSize({width,height:width<768?844:960});await navigate(p);
  const a=await p.evaluate(()=>{
   const visible=e=>e.getClientRects().length&&!e.closest('[hidden],[inert],dialog:not([open])');
   return {width:innerWidth,scroll:document.documentElement.scrollWidth,h1:document.querySelectorAll('h1').length,
    broken:[...document.images].filter(i=>i.getAttribute('src')&&i.complete&&!i.naturalWidth).map(i=>i.getAttribute('src')),
    fonts:['Fraunces','Geist'].map(f=>({family:f,loaded:[...document.fonts].some(x=>x.family===f&&x.status==='loaded')})),
    ids:[...document.querySelectorAll('[id]')].map(e=>e.id),
    missingLabels:[...document.querySelectorAll('button')].filter(visible).filter(e=>!(e.textContent.trim()||e.getAttribute('aria-label'))).length};
  });
  check(width+': no page overflow',a.scroll<=width,a.scroll);check(width+': one main heading',a.h1===1);
  check(width+': images loaded',a.broken.length===0,a.broken);check(width+': chosen fonts in use',a.fonts.every(f=>f.loaded),a.fonts);
  check(width+': unique IDs',new Set(a.ids).size===a.ids.length);check(width+': visible buttons named',a.missingLabels===0);
  const controls=await p.locator('.stage-open').boundingBox(),stage=await p.locator('#product-stage').boundingBox();
  check(width+': stage action is contained',controls.x>=stage.x&&controls.x+controls.width<=stage.x+stage.width+1&&controls.y+controls.height<=stage.y+stage.height);
  if([390,1440].includes(width)){await shot(p,'hero-'+width);await p.locator('#work').scrollIntoViewIfNeeded();await p.waitForTimeout(250);await p.locator('.work-garden').screenshot({path:path.join(out,'work-'+width+'.png')});
   const overlap=await p.evaluate(()=>{const a=document.querySelector('.garden-story-word').getBoundingClientRect(),b=document.querySelector('.walkthrough-preview-label').getBoundingClientRect();return a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top;});
   check(width+': story labels do not overlap',!overlap);
   await p.locator('#contact').scrollIntoViewIfNeeded();await p.waitForTimeout(200);await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(250);await shot(p,'full-page-'+width,true);
  }
  await p.close();
 }
}
async function interactions(){
 context=await browser.newContext({viewport:{width:1440,height:960}});page=await context.newPage();attach(page);await navigate(page);
 await page.locator('#tab-garden').focus();await page.keyboard.press('ArrowRight');await page.waitForTimeout(1000);
 check('Keyboard feature selection',await page.locator('#product-stage').getAttribute('data-project')==='phc');
 check('Selected feature remains focused',await page.evaluate(()=>document.activeElement.id==='tab-phc'));
 await page.evaluate(()=>{for(const id of ['garden','skiie','phc','garden','phc','skiie'])window.KC.selectProject(id)});await page.waitForTimeout(1000);
 check('Rapid switching: last selection wins',await page.locator('#stage-name').innerText()==='SKIIE');
 check('Rapid switching: one visible scene',await page.locator('.stage-scene:visible').count()===1);
 check('Scene transition leaves no pending busy state',await page.locator('#product-stage').getAttribute('aria-busy')===null);
 await page.locator('#pose-button').click();check('Front-view control',await page.locator('#product-stage').getAttribute('data-pose')==='flat');
 await page.locator('#pose-button').click();check('Sculpted-view control',await page.locator('#product-stage').getAttribute('data-pose')==='sculpted');
 await page.locator('[data-walkthrough="calendar"]').click();await page.waitForTimeout(600);
 check('In-page preview switches actual capture',(await page.locator('.story-device-one img').getAttribute('src')).includes('garden-calendar'));
 await page.locator('[data-walkthrough="varieties"]').click();await page.waitForTimeout(600);
 const trigger=page.locator('.work-garden .project-caption [data-open]');await trigger.click();await page.waitForTimeout(500);
 check('Selected in-page screen opens in viewer',await page.locator('#viewer-screen-title').innerText()==='Variety explorer');
 check('Viewer deep link follows selected screen',page.url().includes('screen=varieties'));
 check('Long page defaults to readable width',await page.locator('#viewer-figure').getAttribute('data-layout')==='read');
 const reading=await page.locator('#viewer-image').boundingBox();check('Long page stays legible instead of thumbnail',reading.width>=330,reading.width);
 check('Long page can scroll fully',await page.locator('#viewer-figure').evaluate(e=>e.scrollHeight>e.clientHeight+500));
 await shot(page,'viewer-long-'+mode);
 await page.locator('#viewer-zoom').click();check('Original-resolution inspection',await page.locator('#viewer-zoom').getAttribute('aria-pressed')==='true');
 await page.keyboard.press('z');check('Keyboard zoom reset',await page.locator('#viewer-zoom').getAttribute('aria-pressed')==='false');
 await page.locator('[data-screen-index="4"]').click();await page.waitForTimeout(300);await page.locator('#viewer-zoom').click();
 check('Desktop image uses original width',Math.abs((await page.locator('#viewer-image').boundingBox()).width-1440)<2);
 if(mode!=='webkit'){
  const r=await page.locator('#viewer-figure').boundingBox();const before=await page.locator('#viewer-figure').evaluate(e=>e.scrollLeft);
  await page.mouse.move(r.x+r.width*.65,r.y+r.height*.5);await page.mouse.down();await page.mouse.move(r.x+r.width*.3,r.y+r.height*.45,{steps:8});await page.mouse.up();
  check('Mouse pans a zoomed capture',await page.locator('#viewer-figure').evaluate(e=>e.scrollLeft)>before+30);
 }
 await page.locator('.viewer-close').focus();for(let i=0;i<21;i++)await page.keyboard.press('Tab');
 check('Tab remains in native dialog',await page.evaluate(()=>!!document.activeElement.closest('#project-viewer')));
 await page.keyboard.press('Escape');await page.waitForTimeout(250);
 check('Escape dismisses and restores focus',await page.evaluate(()=>!document.querySelector('#project-viewer').open&&document.activeElement.matches('.work-garden .project-caption [data-open]')));
 check('Closing restores non-project URL',!page.url().includes('#project='));
 await page.evaluate(()=>window.KC.selectProject('phc'));await page.waitForTimeout(1000);await page.locator('#stage-open').click();await page.waitForTimeout(500);
 await page.locator('#viewer-next').click();check('Next-screen control',await page.locator('#viewer-screen-title').innerText()==='Report a problem');
 await page.goBack();await page.waitForTimeout(200);check('Browser Back closes viewer',!await page.locator('#project-viewer').evaluate(e=>e.open));
 await page.goForward();await page.waitForTimeout(300);check('Browser Forward restores selected screen',await page.locator('#project-viewer').evaluate(e=>e.open)&&await page.locator('#viewer-screen-title').innerText()==='Report a problem');
 await page.reload();await page.waitForTimeout(400);check('Reload preserves screen deep link',await page.locator('#viewer-screen-title').innerText()==='Report a problem'&&await page.locator('#project-viewer').evaluate(e=>e.open));
 await page.keyboard.press('Escape');await page.waitForTimeout(200);
 await page.evaluate(()=>{window.KC.selectProject('skiie');document.querySelector('.motion-toggle').click()});
 check('Manual reduction interrupts motion cleanly',await page.locator('html').getAttribute('data-motion')==='off'&&await page.locator('.stage-scene:visible').count()===1);
 await page.reload();await page.waitForTimeout(200);check('Motion preference survives reload',await page.locator('html').getAttribute('data-motion')==='off');
 await page.close();
}
async function touch(){
 context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1});page=await context.newPage();attach(page);await navigate(page);
 await page.locator('.menu-trigger').tap();check('Mobile menu opens',await page.locator('#mobile-menu').evaluate(e=>e.open));
 await page.locator('#mobile-menu nav a').first().tap();await page.waitForTimeout(250);
 check('Mobile navigation closes and focuses destination',await page.evaluate(()=>!document.querySelector('#mobile-menu').open&&document.activeElement.id==='work'));
 await page.locator('[data-walkthrough="orchard-setup"]').tap();await page.locator('.work-garden .project-caption [data-open]').tap();await page.waitForTimeout(450);
 check('Touch opens the selected long page',await page.locator('#viewer-screen-title').innerText()==='Orchard setup');
 const area=await page.locator('#viewer-figure').boundingBox();check('Mobile inspection has useful vertical room',area.height>=280,area.height);
 const taps=await page.locator('.viewer-close,#viewer-next,#viewer-previous,#viewer-zoom').evaluateAll(items=>items.map(e=>({id:e.id||e.className,width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height})));
 check('Primary mobile viewer controls meet 44px',taps.every(t=>t.width>=44&&t.height>=44),taps);
 await shot(page,'viewer-mobile-readable');
 const cdp=await context.newCDPSession(page);
 async function gesture(x1,y1,x2,y2){await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:x1,y:y1}]});for(let i=1;i<=8;i++){await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x1+(x2-x1)*i/8,y:y1+(y2-y1)*i/8}]});await wait(15)}await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await wait(550)}
 const r=await page.locator('#viewer-figure').boundingBox();
 await gesture(r.x+r.width*.55,r.y+r.height*.72,r.x+r.width*.55,r.y+r.height*.32);
 check('Vertical touch scroll does not change screens',await page.locator('#viewer-screen-title').innerText()==='Orchard setup');
 check('Vertical touch actually scrolls long content',await page.locator('#viewer-figure').evaluate(e=>e.scrollTop)>20);
 await gesture(r.x+r.width*.8,r.y+r.height*.5,r.x+r.width*.2,r.y+r.height*.5);
 check('Horizontal touch swipe changes screens',await page.locator('#viewer-screen-title').innerText()==='Seasonal calendar');
 await page.locator('.viewer-close').tap();await page.waitForTimeout(350);check('Touch close dismisses viewer',!await page.locator('#project-viewer').evaluate(e=>e.open),page.url());
 await page.setViewportSize({width:844,height:390});await page.locator('#stage-open').tap();await page.waitForTimeout(400);
 const landscape=await page.locator('#viewer-figure').boundingBox();check('Landscape viewport leaves usable image area',landscape.height>=140,landscape.height);await shot(page,'viewer-landscape');
 await page.close();
}
async function fallback(){
 context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});page=await context.newPage();attach(page);await navigate(page);
 check('Operating-system reduced motion is honored',await page.locator('html').getAttribute('data-motion')==='off');
 await page.locator('#tab-phc').click();check('Reduced-motion scene change is immediate',await page.locator('.stage-scene:visible').count()===1&&await page.locator('#product-stage').getAttribute('aria-busy')===null);
 await page.close();await context.close();
 context=await browser.newContext({viewport:{width:1440,height:960}});await context.route('**/vendor/*.js',route=>route.abort());page=await context.newPage();attach(page);await navigate(page);
 await page.locator('#tab-phc').click();await page.locator('#stage-open').click();
 check('Without GSAP: selection and viewer still work',await page.locator('#viewer-title').innerText()==='Plant Health Clinic'&&await page.locator('#project-viewer').evaluate(e=>e.open));
 await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:undefined}));await page.locator('#viewer-share').click();
 check('Clipboard unavailable: selectable link fallback',await page.locator('#share-fallback').isVisible()&&(await page.locator('#share-url').inputValue()).includes('project=plant-health-clinic'));
 await page.locator('#close-share').click();await page.evaluate(()=>document.querySelector('#viewer-image').src='/missing-capture-test.webp');await page.waitForTimeout(250);
 check('Missing image displays recovery control',await page.locator('#image-error').isVisible());await page.locator('#viewer-retry').click();await page.waitForTimeout(350);
 check('Retry restores the selected image',!await page.locator('#image-error').isVisible()&&await page.locator('#viewer-image').evaluate(e=>e.naturalWidth>0));
 await page.keyboard.press('Escape');await page.waitForTimeout(250);await page.goto(url+'#project=unknown&screen=unknown');
 check('Invalid project fragment does not open broken viewer',!await page.locator('#project-viewer').evaluate(e=>e.open));
 await page.close();await context.close();
 context=await browser.newContext({viewport:{width:390,height:844},javaScriptEnabled:false});page=await context.newPage();attach(page);await navigate(page);
 check('No JavaScript: headline and artwork remain visible',await page.locator('h1').isVisible()&&await page.locator('#scene-garden img').first().isVisible());
 check('No JavaScript: direct capture fallback exists',await page.locator('noscript a').count()>=3);await shot(page,'no-javascript');await page.close();
}
async function links(){
 context=await browser.newContext();page=await context.newPage();attach(page);await navigate(page);
 const refs=await page.evaluate(()=>[...document.querySelectorAll('[href],[src]')].flatMap(e=>[e.getAttribute('href'),e.getAttribute('src')]).filter(Boolean));
 const missing=refs.filter(r=>!/^([a-z]+:|#)/i.test(r)).filter(r=>!fs.existsSync(path.resolve(root,r.split('#')[0].split('?')[0])));
 check('Every local link and asset resolves',missing.length===0,missing);
 const repo=path.resolve(root,'../..'),baseline=JSON.parse(fs.readFileSync(path.join(out,'production-baseline.json'),'utf8'));
 const changed=Object.entries(baseline).filter(([p,hash])=>!fs.existsSync(path.join(repo,p))||crypto.createHash('sha256').update(fs.readFileSync(path.join(repo,p))).digest('hex')!==hash).map(([p])=>p);
 check('Existing app/config files unchanged',changed.length===0,changed);
 await page.close();
}
(async()=>{
 try{
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));url='http://127.0.0.1:'+server.address().port+'/theatre-refined/index.html';
  browser=await (mode==='webkit'?pw.webkit:pw.chromium).launch({executablePath:mode==='webkit'?process.env.LOCALAPPDATA+'/ms-playwright/webkit-2311/Playwright.exe':'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,timeout:12000});
  report.browser=browser.version();
  if(mode==='responsive')await responsive();else if(mode==='interactions'||mode==='webkit')await interactions();else if(mode==='touch')await touch();else if(mode==='fallback')await fallback();else if(mode==='links')await links();else throw Error('Unknown review mode');
 }catch(error){check('Review completed',false,error.stack);if(page&&!page.isClosed())await shot(page,'failure-'+mode).catch(()=>{});}
 finally{
  check('No JavaScript page errors',runtime.length===0,runtime);await context?.close().catch(()=>{});await browser?.close().catch(()=>{});await new Promise(resolve=>server.close(resolve));
  fs.writeFileSync(path.join(out,'verify-'+mode+'.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({mode,browser:report.browser,passed:checks.filter(c=>c.ok).length,failed:checks.filter(c=>!c.ok).length,failures:checks.filter(c=>!c.ok)},null,2));process.exitCode=checks.some(c=>!c.ok)?1:0;
 }
})();
