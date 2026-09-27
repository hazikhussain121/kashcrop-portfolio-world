const fs=require('node:fs'),path=require('node:path');const root=__dirname;
let html=fs.readFileSync(path.join(root,'index.html'),'utf8'),experience=fs.readFileSync(path.join(root,'experience.js'),'utf8');
function replace(text,before,after,label){if(!text.includes(before))throw Error('Expected source not found: '+label);return text.replace(before,()=>after);}
if(html.includes('refinement.css'))throw Error('Pass two markup is already installed.');
html=replace(html,'<link rel="stylesheet" href="viewer.css">','<link rel="stylesheet" href="viewer.css">\n <link rel="stylesheet" href="refinement.css">','styles');
html=replace(html,'<script src="viewer.js" defer></script>','<script src="walkthrough.js" defer></script>\n <script src="viewer.js" defer></script>','script');
html=replace(html,'<div class="stage-bottom">','<div class="stage-progress" aria-hidden="true"></div>\n  <div class="stage-bottom">','stage progress');
html=replace(html,'<div class="garden-story-word" aria-hidden="true">Closer to<br>your orchard.</div>',`<div class="garden-story-word" aria-hidden="true">Closer to<br>your orchard.</div>
   <div class="walkthrough-preview-label" aria-live="polite" aria-atomic="true"><strong id="walkthrough-title">Farmer home</strong><span id="walkthrough-caption">The services and tools a grower can reach from home.</span></div>`,'preview caption');
const walkthrough=`<div class="walkthrough"><p class="walkthrough-label">A closer look at Baghban<span>Browse the actual screens</span></p><div class="walkthrough-controls" role="group" aria-label="Baghban screen previews"><button type="button" data-walkthrough="home" aria-pressed="true">Farmer home</button><button type="button" data-walkthrough="orchard-setup" aria-pressed="false">Orchard setup</button><button type="button" data-walkthrough="calendar" aria-pressed="false">Seasonal calendar</button><button type="button" data-walkthrough="varieties" aria-pressed="false">Variety explorer</button></div></div>\n  `;
html=replace(html,'<div class="project-caption">',walkthrough+'<div class="project-caption">','walkthrough');
html=replace(html,'<figure class="viewer-figure"','<p class="viewer-help" id="viewer-help">Choose a screen for a closer look.</p><figure class="viewer-figure"','viewer help');
html=replace(html,'<p class="image-error" id="image-error" hidden>This capture could not load. Choose another screen, or open the original image.</p>','<div class="image-error" id="image-error" role="status" hidden><p>This capture could not load. Choose another screen, or try again.</p><button type="button" class="retry-image" id="viewer-retry">Try loading again</button></div>','error state');
html=replace(html,'Private design refinement · Not deployed','Product theatre · Refinement 02 · Not deployed','preview label');
const begin=experience.indexOf(' // Keyboard-native project tabs.');const end=experience.indexOf(' window.KC.selectProject=selectProject;',begin);
if(begin<0||end<begin)throw Error('Project controller anchors missing');
experience=experience.slice(0,begin)+fs.readFileSync(path.join(root,'scene-motion.fragment.js'),'utf8')+experience.slice(end);
experience=replace(experience,' function settleMotion() {',' function settleMotion() {\n  normalizeStage();','motion normalization');
experience=replace(experience,' const closeMenu=()=>{if(menu.open)menu.close();menuTrigger.setAttribute(\'aria-expanded\',\'false\');syncScrollLock();menuTrigger.focus({preventScroll:true});};'," const closeMenu=({restoreFocus=true}={})=>{if(menu.open)menu.close();menuTrigger.setAttribute('aria-expanded','false');syncScrollLock();if(restoreFocus)menuTrigger.focus({preventScroll:true});};",'menu focus');
experience=replace(experience," $$('nav a',menu).forEach(a=>a.addEventListener('click',closeMenu));"," $$('nav a',menu).forEach(a=>a.addEventListener('click',()=>{closeMenu({restoreFocus:false});const target=$(a.hash);if(target){target.tabIndex=-1;target.focus({preventScroll:true});}}));",'menu navigation');
for(const [name,content]of [['index.html',html],['experience.js',experience]])fs.writeFileSync(path.join(root,name),content);
console.log('Installed the interruptible stage controller, in-page screen exploration and refined visual system.');
