const fs=require('node:fs');const path=require('node:path');const root=__dirname;
function update(file,before,after){const p=path.join(root,file),s=fs.readFileSync(p,'utf8');if(!s.includes(before))throw Error('Expected source not found in '+file);fs.writeFileSync(p,s.replace(before,after));}
update('lab.js',"const dialog=$('#proof-dialog');let currentProject='garden',lastTrigger=null;","const dialog=$('#proof-dialog');let currentProject='garden',lastTrigger=null;\nfunction closeViewer(){if(!dialog||!dialog.open)return;dialog.close();document.body.classList.remove('modal-open');if(lastTrigger&&lastTrigger.isConnected)lastTrigger.focus({preventScroll:true});}");
update('lab.js',"$('.dialog-close').addEventListener('click',()=>dialog.close());","$('.dialog-close').addEventListener('click',closeViewer);dialog.addEventListener('cancel',e=>{e.preventDefault();closeViewer()});");
update('lab.js',"e.clientY>r.bottom)dialog.close()","e.clientY>r.bottom)closeViewer()");
update('lab.js',"if(window.gsap&&!reduced()){gsap.killTweensOf(art);gsap.to(art,{y:-10,opacity:.65,duration:.15,onComplete:apply});}else apply();","if(window.gsap)gsap.killTweensOf(art);apply();");
update('lab.js',"clearProps:'transform'})}};","clearProps:'transform,opacity'})}};");
update('review.cjs',"await page.locator('#field-hero').inputValue().catch(()=>page.locator('#field-reveal').inputValue())==='0'","await page.locator('#field-reveal').inputValue()==='0'");
fs.appendFileSync(path.join(root,'refinements.css'),'\n@media(min-width:1101px){.stage-art .phone{width:clamp(220px,17vw,245px)}.stage-front{top:0;left:22%}}\n');
console.log('Refined synchronous dialog focus, rapid project switching, motion cleanup and stage proportions.');
