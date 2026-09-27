/* Actual project captures: readable long pages, native inspection, accessible routing. */
(() => {
 'use strict';
 const { $, $$, isReduced, toast, copyText, trapFocus, syncScrollLock }=window.KC;
 const projects=window.KC_PROJECTS,dialog=$('#project-viewer'),image=$('#viewer-image'),figure=$('#viewer-figure');
 let projectId='garden',screenIndex=0,lastTrigger=null,returnHash='',ownsHistory=false,imageRevision=0;
 let openingAnimation=null,imageAnimation=null,awaitingBack=false,queuedOpen=null,swipe=null,pan=null;
 const imagePath=s=>'../assets/'+s.file+'.webp';
 const bySlug=slug=>Object.keys(projects).find(key=>projects[key].slug===slug||key===slug);
 function readRoute(){
  if(!location.hash.startsWith('#project='))return null;
  const params=new URLSearchParams(location.hash.slice(1)),id=bySlug(params.get('project'));if(!id)return null;
  const index=projects[id].screens.findIndex(s=>s.id===params.get('screen'));return{id,index:Math.max(0,index)};
 }
 function routeFor(id,index){return '#'+new URLSearchParams({project:projects[id].slug,screen:projects[id].screens[index].id}).toString()}
 function updateRoute(){history.replaceState(history.state,'',location.pathname+location.search+routeFor(projectId,screenIndex))}
 function endPan(){pan=null;figure.classList.remove('is-panning')}
 function updateHelp(){
  const screen=projects[projectId].screens[screenIndex],zoomed=figure.classList.contains('is-zoomed');
  $('#viewer-help').textContent=zoomed?'Original resolution. Drag or scroll to inspect.':screen.height/screen.width>3?'Full page, readable width. Scroll to see the complete screen.':'Actual product capture. Use the arrows to explore.';
 }
 function setZoom(on,{preservePosition=false}={}){
  endPan();swipe=null;
  const oldHeight=figure.scrollHeight-figure.clientHeight,oldWidth=figure.scrollWidth-figure.clientWidth;
  const anchorY=oldHeight>0?figure.scrollTop/oldHeight:0,anchorX=oldWidth>0?figure.scrollLeft/oldWidth:.5;
  figure.classList.toggle('is-zoomed',on);$('#viewer-zoom').setAttribute('aria-pressed',String(on));
  $('span',$('#viewer-zoom')).textContent=on?'Fit to view':'Full size';
  $('#viewer-zoom').setAttribute('aria-label',on?'Fit the image to the viewer':'Inspect the image at original resolution');
  figure.scrollTop=preservePosition?anchorY*Math.max(0,figure.scrollHeight-figure.clientHeight):0;
  figure.scrollLeft=preservePosition?anchorX*Math.max(0,figure.scrollWidth-figure.clientWidth):0;
  updateHelp();
 }
 function showSelectedThumbnail(){
  const list=$('#viewer-screen-list'),selected=$('.screen-choice[aria-pressed=true]');if(!selected)return;
  if(getComputedStyle(list).flexDirection==='row'){
   const parent=list.getBoundingClientRect(),child=selected.getBoundingClientRect();
   if(child.right>parent.right)list.scrollLeft+=child.right-parent.right+8;
   else if(child.left<parent.left)list.scrollLeft-=parent.left-child.left+8;
  }
 }
 function renderScreen(index,{writeRoute=true}={}){
  const project=projects[projectId];screenIndex=Math.max(0,Math.min(index,project.screens.length-1));
  const screen=project.screens[screenIndex],revision=++imageRevision;
  imageAnimation?.kill();if(window.gsap)gsap.set(image,{clearProps:'opacity,transform'});
  figure.dataset.layout=screen.height/screen.width>3?'read':'fit';
  figure.style.setProperty('--capture-width',screen.width+'px');
  setZoom(false);image.hidden=false;$('#image-error').hidden=true;figure.setAttribute('aria-busy','true');
  image.src=imagePath(screen);image.alt=project.name+': '+screen.name;image.width=screen.width;image.height=screen.height;
  $('#viewer-screen-title').textContent=screen.name;
  $('#viewer-dimension').textContent=screen.kind+' · '+screen.width+' × '+screen.height+' px';
  $('#viewer-caption').textContent=screen.caption;
  const count=(screenIndex+1)+' / '+project.screens.length;
  $('#viewer-count').textContent=count;$('#viewer-pagination-count').textContent=count;
  $('#viewer-previous').disabled=screenIndex===0;$('#viewer-next').disabled=screenIndex===project.screens.length-1;
  $('#viewer-original').href=imagePath(screen);
  $$('.screen-choice').forEach((button,i)=>button.setAttribute('aria-pressed',String(i===screenIndex)));
  showSelectedThumbnail();if(writeRoute&&dialog.open)updateRoute();
  image.decode?.().then(()=>{
   if(revision!==imageRevision)return;figure.removeAttribute('aria-busy');
   if(dialog.open&&window.gsap&&!isReduced())imageAnimation=gsap.fromTo(image,{opacity:.7},{opacity:1,duration:.24,ease:'power2.out',clearProps:'opacity'});
  }).catch(()=>{if(revision===imageRevision)figure.removeAttribute('aria-busy')});
 }
 function renderProject(id){
  projectId=id;const project=projects[id];dialog.dataset.project=id;
  $('#viewer-title').textContent=project.name;$('#viewer-category').textContent=project.category;
  $('#viewer-summary').textContent=project.summary;$('#viewer-source').textContent=project.source;$('.viewer-source').open=false;
  const meta=$('#viewer-project-meta');meta.replaceChildren();for(const label of project.scope){const span=document.createElement('span');span.textContent=label;meta.append(span)}
  const list=$('#viewer-screen-list');list.replaceChildren();
  project.screens.forEach((screen,index)=>{
   const b=document.createElement('button');b.type='button';b.className='screen-choice';b.dataset.screenIndex=String(index);b.setAttribute('aria-pressed','false');
   const thumb=document.createElement('img');thumb.src=imagePath(screen);thumb.alt='';thumb.width=24;thumb.height=36;thumb.loading='lazy';
   const text=document.createElement('span');text.textContent=screen.name;const sub=document.createElement('small');sub.textContent=screen.kind+' capture';text.append(sub);
   const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('class','icon');svg.setAttribute('aria-hidden','true');
   const use=document.createElementNS('http://www.w3.org/2000/svg','use');use.setAttribute('href','#i-right');svg.append(use);
   b.append(thumb,text,svg);b.addEventListener('click',()=>renderScreen(index));list.append(b);
  });
  const live=$('#viewer-live');live.hidden=!project.publicURL;if(project.publicURL)live.href=project.publicURL;else live.removeAttribute('href');
 }
 function openProject(id,screenId='home',trigger=null,options={}){
  const {fromHistory=false,indexOverride=null}=options,project=projects[id];if(!project)return;
  if(awaitingBack&&!fromHistory){queuedOpen={id,screenId,trigger,options};return}
  const wasOpen=dialog.open;
  if(!wasOpen){lastTrigger=trigger;if(!fromHistory)returnHash=readRoute()?'':location.hash}
  const index=indexOverride!==null?indexOverride:Math.max(0,project.screens.findIndex(s=>s.id===screenId));
  renderProject(id);renderScreen(index,{writeRoute:false});$('#share-fallback').hidden=true;
  if(!wasOpen){dialog.showModal();syncScrollLock();$('.viewer-close').focus({preventScroll:true})}
  if(!fromHistory){
   if(!wasOpen){history.pushState({kcViewer:true,kcReturnHash:returnHash},'',location.pathname+location.search+routeFor(id,screenIndex));ownsHistory=true}
   else updateRoute();
  }
  if(!wasOpen&&window.gsap&&!isReduced()){
   openingAnimation?.kill();openingAnimation=gsap.fromTo(dialog,{opacity:.65,y:18,scale:.992},{opacity:1,y:0,scale:1,duration:.38,ease:'power3.out',clearProps:'opacity,transform'});
  }
 }
 function closeVisual(){
  openingAnimation?.kill();imageAnimation?.kill();endPan();swipe=null;++imageRevision;
  if(window.gsap)gsap.set([dialog,image],{clearProps:'opacity,transform'});
  if(dialog.open)dialog.close();$('#share-fallback').hidden=true;setZoom(false);syncScrollLock();
  const notification=$('#toast');if(notification.parentElement===dialog)document.body.append(notification);
  if(lastTrigger&&lastTrigger.isConnected&&lastTrigger.getClientRects().length)lastTrigger.focus({preventScroll:true});
  else{window.KC.selectProject(projectId);$('#tab-'+projectId)?.focus({preventScroll:true})}
 }
 function closeProject({fromHistory=false}={}){
  if(!dialog.open)return;closeVisual();if(fromHistory)return;
  if(ownsHistory&&history.state?.kcViewer){ownsHistory=false;awaitingBack=true;history.back()}
  else history.replaceState(null,'',location.pathname+location.search+(returnHash||'#work'));
 }
 function syncRoute(){
  if(awaitingBack){awaitingBack=false;ownsHistory=false;if(queuedOpen){const next=queuedOpen;queuedOpen=null;openProject(next.id,next.screenId,next.trigger,next.options);return}}
  const route=readRoute();
  if(route){ownsHistory=!!history.state?.kcViewer;returnHash=history.state?.kcReturnHash||'';
   if(!dialog.open||projectId!==route.id||screenIndex!==route.index)openProject(route.id,'home',lastTrigger,{fromHistory:true,indexOverride:route.index});
  }else if(dialog.open)closeProject({fromHistory:true});
 }
 document.addEventListener('click',event=>{const b=event.target.closest('[data-open]');if(!b||!projects[b.dataset.open])return;event.preventDefault();openProject(b.dataset.open,b.dataset.screen||'home',b)});
 $('.viewer-close').addEventListener('click',()=>closeProject());
 dialog.addEventListener('cancel',event=>{event.preventDefault();if(!$('#share-fallback').hidden){$('#share-fallback').hidden=true;$('#viewer-share').focus()}else closeProject()});
 dialog.addEventListener('close',syncScrollLock);
 dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeProject()});
 dialog.addEventListener('keydown',event=>{
  if(event.key==='Tab'){trapFocus(dialog,event);return}
  if(event.target.closest('input,textarea,select')||!$('#share-fallback').hidden)return;
  if(event.target===figure&&['z','Z','+','-'].includes(event.key)){event.preventDefault();setZoom(event.key==='-'?false:event.key==='+'?true:!figure.classList.contains('is-zoomed'),{preservePosition:true});return}
  if(event.target.closest('.viewer-figure')&&figure.classList.contains('is-zoomed'))return;
  if(event.key==='ArrowRight'){event.preventDefault();renderScreen(screenIndex+1)}
  if(event.key==='ArrowLeft'){event.preventDefault();renderScreen(screenIndex-1)}
 });
 $('#viewer-next').addEventListener('click',()=>renderScreen(screenIndex+1));$('#viewer-previous').addEventListener('click',()=>renderScreen(screenIndex-1));
 $('#viewer-zoom').addEventListener('click',()=>{setZoom(!figure.classList.contains('is-zoomed'),{preservePosition:true});figure.focus({preventScroll:true})});
 image.addEventListener('dblclick',event=>{event.preventDefault();setZoom(!figure.classList.contains('is-zoomed'),{preservePosition:true})});
 image.addEventListener('error',()=>{figure.removeAttribute('aria-busy');image.hidden=true;$('#image-error').hidden=false});
 image.addEventListener('load',()=>{figure.removeAttribute('aria-busy');image.hidden=false;$('#image-error').hidden=true});
 $('#viewer-retry').addEventListener('click',()=>{image.hidden=false;$('#image-error').hidden=true;figure.setAttribute('aria-busy','true');image.src=imagePath(projects[projectId].screens[screenIndex])+'?retry='+Date.now()});
 $('#viewer-share').addEventListener('click',async()=>{
  const link=location.href;if(await copyText(link)){toast(location.protocol==='file:'?'Local preview link copied.':'Project screen link copied.');return}
  $('#share-fallback').hidden=false;const field=$('#share-url');field.value=link;field.focus();field.select();
 });
 $('#close-share').addEventListener('click',()=>{$('#share-fallback').hidden=true;$('#viewer-share').focus()});
 // Native-size pointer inspection; touch swipes do not prevent vertical scrolling.
 figure.addEventListener('pointerdown',event=>{
  if(event.target.closest('button,a')||event.button!==0)return;
  if(figure.classList.contains('is-zoomed')&&event.pointerType==='mouse'){
   pan={id:event.pointerId,x:event.clientX,y:event.clientY,left:figure.scrollLeft,top:figure.scrollTop};
   figure.setPointerCapture(event.pointerId);figure.classList.add('is-panning');event.preventDefault();
  }else if(event.pointerType==='touch'&&!figure.classList.contains('is-zoomed'))swipe={id:event.pointerId,x:event.clientX,y:event.clientY,cancelled:false};
 });
 figure.addEventListener('pointermove',event=>{
  if(pan&&event.pointerId===pan.id){figure.scrollLeft=pan.left-(event.clientX-pan.x);figure.scrollTop=pan.top-(event.clientY-pan.y);return;}
  if(swipe&&event.pointerId===swipe.id){
   const dx=event.clientX-swipe.x,dy=event.clientY-swipe.y;
   if(Math.abs(dy)>20&&Math.abs(dy)>Math.abs(dx))swipe.cancelled=true;
   if(!swipe.cancelled&&Math.abs(dx)>16&&Math.abs(dx)>Math.abs(dy)*1.8&&!figure.hasPointerCapture(event.pointerId))figure.setPointerCapture(event.pointerId);
  }
 });
 const release=event=>{if(figure.hasPointerCapture(event.pointerId))figure.releasePointerCapture(event.pointerId);endPan();};
 figure.addEventListener('pointerup',event=>{
  if(swipe&&event.pointerId===swipe.id){const dx=event.clientX-swipe.x,dy=event.clientY-swipe.y;
   if(!swipe.cancelled&&Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.8)renderScreen(screenIndex+(dx<0?1:-1));swipe=null;
  }
  release(event);
 });
 figure.addEventListener('pointercancel',event=>{swipe=null;release(event);});
 figure.addEventListener('lostpointercapture',event=>{if(event.target===figure){endPan();swipe=null;}});
 figure.addEventListener('dragstart',event=>event.preventDefault());
 addEventListener('popstate',syncRoute);addEventListener('hashchange',syncRoute);
 addEventListener('kc:motionchange',()=>{if(!isReduced())return;openingAnimation?.kill();imageAnimation?.kill();if(window.gsap){gsap.killTweensOf([dialog,image]);gsap.set([dialog,image],{clearProps:'opacity,transform'});}});
 syncRoute();
})();
