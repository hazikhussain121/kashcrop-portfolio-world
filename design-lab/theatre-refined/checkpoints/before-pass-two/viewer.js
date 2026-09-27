/* Native, deep-linkable project screen viewer. Captures are never presented as live apps. */
(() => {
 'use strict';
 const { $, $$, isReduced, toast, copyText, trapFocus, syncScrollLock } = window.KC;
 const projects = window.KC_PROJECTS, dialog = $('#project-viewer');
 let projectId='garden',screenIndex=0,lastTrigger=null,returnHash='',ownsHistory=false,imageRevision=0;
 let openingAnimation=null;
 const image=$('#viewer-image'), figure=$('#viewer-figure');
 const bySlug = slug => Object.keys(projects).find(key=>projects[key].slug===slug||key===slug);
 const imagePath = screen => '../assets/'+screen.file+'.webp';
 function readRoute() {
  if(!location.hash.startsWith('#project='))return null;
  const params = new URLSearchParams(location.hash.slice(1));
  const id = bySlug(params.get('project'));
  if(!id)return null;
  const requested=projects[id].screens.findIndex(screen=>screen.id===params.get('screen'));
  return {id,index:Math.max(0,requested)};
 }
 function routeFor(id,index) {
  return '#'+new URLSearchParams({project:projects[id].slug,screen:projects[id].screens[index].id}).toString();
 }
 function updateRoute() {
  history.replaceState(history.state,'',location.pathname+location.search+routeFor(projectId,screenIndex));
 }
 function setZoom(on) {
  figure.classList.toggle('is-zoomed',on);
  $('#viewer-zoom').setAttribute('aria-pressed',String(on));
  $('span',$('#viewer-zoom')).textContent=on?'Fit to view':'Inspect at full size';
  figure.scrollTop=0;figure.scrollLeft=0;
 }
 function renderScreen(index,{writeRoute=true}={}) {
  const project=projects[projectId];
  screenIndex=Math.max(0,Math.min(index,project.screens.length-1));
  const screen=project.screens[screenIndex];
  const revision=++imageRevision;
  setZoom(false);
  image.hidden=false;$('#image-error').hidden=true;
  image.src=imagePath(screen);image.alt=project.name+': '+screen.name;
  image.width=screen.width;image.height=screen.height;
  figure.style.setProperty('--capture-width',screen.width+'px');
  $('#viewer-screen-title').textContent=screen.name;
  $('#viewer-dimension').textContent=screen.kind+' · '+screen.width+' × '+screen.height+' px capture';
  $('#viewer-caption').textContent=screen.caption;
  const counter=(screenIndex+1)+' / '+project.screens.length;
  $('#viewer-count').textContent=counter;$('#viewer-pagination-count').textContent=counter;
  $('#viewer-previous').disabled=screenIndex===0;
  $('#viewer-next').disabled=screenIndex===project.screens.length-1;
  $('#viewer-original').href=imagePath(screen);
  $$('.screen-choice').forEach((button,i)=>button.setAttribute('aria-pressed',String(i===screenIndex)));
  if(writeRoute&&dialog.open)updateRoute();
  image.decode?.().then(()=>{
   if(revision!==imageRevision||!dialog.open)return;
   if(window.gsap&&!isReduced())gsap.fromTo(image,{opacity:.7},{opacity:1,duration:.27,ease:'power2.out',clearProps:'opacity'});
  }).catch(()=>{});
 }
 function renderProject(id) {
  projectId=id;const project=projects[id];
  dialog.dataset.project=id;
  $('#viewer-title').textContent=project.name;
  $('#viewer-category').textContent=project.category;
  $('#viewer-summary').textContent=project.summary;
  $('#viewer-source').textContent=project.source;
  $('.viewer-source').open=false;
  const meta=$('#viewer-project-meta');meta.replaceChildren();
  project.scope.forEach(label=>{const span=document.createElement('span');span.textContent=label;meta.append(span);});
  const list=$('#viewer-screen-list');list.replaceChildren();
  project.screens.forEach((screen,index)=>{
   const button=document.createElement('button');button.type='button';button.className='screen-choice';button.dataset.screenIndex=String(index);button.setAttribute('aria-pressed','false');
   const thumb=document.createElement('img');thumb.src=imagePath(screen);thumb.alt='';thumb.width=24;thumb.height=36;thumb.loading='lazy';
   const text=document.createElement('span');text.textContent=screen.name;
   const sub=document.createElement('small');sub.textContent=screen.kind+' capture';text.append(sub);
   const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('class','icon');svg.setAttribute('aria-hidden','true');
   const use=document.createElementNS('http://www.w3.org/2000/svg','use');use.setAttribute('href','#i-right');svg.append(use);
   button.append(thumb,text,svg);button.addEventListener('click',()=>renderScreen(index));list.append(button);
  });
  const live=$('#viewer-live');live.hidden=!project.publicURL;
  if(project.publicURL)live.href=project.publicURL;else live.removeAttribute('href');
 }
 function openProject(id,screenId='home',trigger=null,{fromHistory=false,indexOverride=null}={}) {
  const project=projects[id];if(!project)return;
  const wasOpen=dialog.open;
  if(!wasOpen){
   lastTrigger=trigger;
   if(!fromHistory)returnHash=readRoute()?'':location.hash;
  }
  const index=indexOverride!==null?indexOverride:Math.max(0,project.screens.findIndex(screen=>screen.id===screenId));
  renderProject(id);renderScreen(index,{writeRoute:false});
  $('#share-fallback').hidden=true;
  if(!wasOpen){dialog.showModal();syncScrollLock();$('.viewer-close').focus({preventScroll:true});}
  if(!fromHistory){
   if(!wasOpen){history.pushState({kcViewer:true,kcReturnHash:returnHash},'',location.pathname+location.search+routeFor(id,screenIndex));ownsHistory=true;}
   else updateRoute();
  }
  if(!wasOpen&&window.gsap&&!isReduced()){
   openingAnimation?.kill();
   openingAnimation=gsap.fromTo(dialog,{opacity:.65,y:22,scale:.99},{opacity:1,y:0,scale:1,duration:.42,ease:'power3.out',clearProps:'opacity,transform'});
  }
 }
 function closeVisual() {
  openingAnimation?.kill();
  if(window.gsap)gsap.set(dialog,{clearProps:'opacity,transform'});
  if(dialog.open)dialog.close();
  $('#share-fallback').hidden=true;setZoom(false);syncScrollLock();
  const liveToast=$('#toast');if(liveToast.parentElement===dialog)document.body.append(liveToast);
  if(lastTrigger&&lastTrigger.isConnected&&lastTrigger.getClientRects().length)lastTrigger.focus({preventScroll:true});
  else {window.KC.selectProject(projectId);$('#tab-'+projectId)?.focus({preventScroll:true});}
 }
 function closeProject({fromHistory=false}={}) {
  if(!dialog.open)return;
  closeVisual();
  if(fromHistory)return;
  if(ownsHistory&&history.state?.kcViewer){ownsHistory=false;history.back();}
  else history.replaceState(null,'',location.pathname+location.search+(returnHash||'#work'));
 }
 function syncRoute() {
  const route=readRoute();
  if(route){
   ownsHistory=!!history.state?.kcViewer;
   returnHash=history.state?.kcReturnHash||'';
   if(!dialog.open||projectId!==route.id||screenIndex!==route.index)openProject(route.id,'home',lastTrigger,{fromHistory:true,indexOverride:route.index});
  }else if(dialog.open)closeProject({fromHistory:true});
 }
 document.addEventListener('click',event=>{
  const button=event.target.closest('[data-open]');if(!button)return;
  const id=button.dataset.open;if(!projects[id])return;
  event.preventDefault();openProject(id,button.dataset.screen||'home',button);
 });
 $('.viewer-close').addEventListener('click',()=>closeProject());
 dialog.addEventListener('cancel',event=>{
  event.preventDefault();
  if(!$('#share-fallback').hidden){$('#share-fallback').hidden=true;$('#viewer-share').focus();}
  else closeProject();
 });
 dialog.addEventListener('close',syncScrollLock);
 dialog.addEventListener('click',event=>{
  if(event.target!==dialog)return;
  const r=dialog.getBoundingClientRect();
  if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeProject();
 });
 dialog.addEventListener('keydown',event=>{
  if(event.key==='Tab'){trapFocus(dialog,event);return;}
  if(event.target.closest('input,textarea,select')||!$('#share-fallback').hidden)return;
  if(event.target.closest('.viewer-figure')&&figure.classList.contains('is-zoomed'))return;
  if(event.key==='ArrowRight'){event.preventDefault();renderScreen(screenIndex+1);}
  if(event.key==='ArrowLeft'){event.preventDefault();renderScreen(screenIndex-1);}
 });
 $('#viewer-next').addEventListener('click',()=>renderScreen(screenIndex+1));
 $('#viewer-previous').addEventListener('click',()=>renderScreen(screenIndex-1));
 $('#viewer-zoom').addEventListener('click',()=>setZoom(!figure.classList.contains('is-zoomed')));
 image.addEventListener('error',()=>{image.hidden=true;$('#image-error').hidden=false;});
 image.addEventListener('load',()=>{image.hidden=false;$('#image-error').hidden=true;});
 $('#viewer-share').addEventListener('click',async()=>{
  const link=location.href;
  if(await copyText(link)){toast(location.protocol==='file:'?'Local preview link copied.':'Project screen link copied.');return;}
  const fallback=$('#share-fallback');fallback.hidden=false;
  const field=$('#share-url');field.value=link;field.focus();field.select();
 });
 $('#close-share').addEventListener('click',()=>{$('#share-fallback').hidden=true;$('#viewer-share').focus();});
 let swipe=null;
 figure.addEventListener('pointerdown',event=>{
  if(event.pointerType!=='touch'||figure.classList.contains('is-zoomed'))return;
  swipe={x:event.clientX,y:event.clientY,id:event.pointerId};
 });
 figure.addEventListener('pointerup',event=>{
  if(!swipe||event.pointerId!==swipe.id)return;
  const dx=event.clientX-swipe.x,dy=event.clientY-swipe.y;swipe=null;
  if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.8)renderScreen(screenIndex+(dx<0?1:-1));
 });
 figure.addEventListener('pointercancel',()=>{swipe=null;});
 addEventListener('popstate',syncRoute);addEventListener('hashchange',syncRoute);
 addEventListener('kc:motionchange',()=>{
  if(!isReduced())return;openingAnimation?.kill();
  if(window.gsap){gsap.killTweensOf([dialog,image]);gsap.set([dialog,image],{clearProps:'opacity,transform'});}
 });
 syncRoute();
})();
