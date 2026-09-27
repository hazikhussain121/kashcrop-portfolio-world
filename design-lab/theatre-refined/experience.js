/* KashCrop: small, purposeful interactions. No runtime API or backend dependency. */
(() => {
 'use strict';
 const $ = (s, root=document) => root.querySelector(s);
 const $$ = (s, root=document) => [...root.querySelectorAll(s)];
 const gsap = window.gsap;
 const reduceQuery = matchMedia('(prefers-reduced-motion: reduce)');
 const fineQuery = matchMedia('(hover:hover) and (pointer:fine)');
 let manualReduced = false;
 try { manualReduced = localStorage.getItem('kc-theatre-motion') === 'off'; } catch {}
 const isReduced = () => reduceQuery.matches || manualReduced;
 let toastTimer;
 const toast = (message) => {
  const node = $('#toast');
  const host = $('dialog[open]') || document.body;
  if (node.parentElement !== host) host.append(node);
  node.textContent = message;
  node.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => node.classList.remove('is-visible'), 3100);
 };
 const syncScrollLock = () => document.body.classList.toggle('has-overlay', !!$('dialog[open]'));
 const trapFocus = (dialog, event) => {
  if (event.key !== 'Tab' || !dialog.open) return;
  const nodes = $$('button:not(:disabled),a[href],input:not(:disabled),select:not(:disabled),textarea:not(:disabled),summary,[tabindex="0"]', dialog)
   .filter(node => node.getClientRects().length > 0 && !node.closest('[hidden],[inert]'));
  if (!nodes.length) return;
  event.preventDefault();
  const current = nodes.indexOf(document.activeElement);
  const next = current < 0 ? (event.shiftKey ? nodes.length-1 : 0) : (current + (event.shiftKey ? -1 : 1) + nodes.length) % nodes.length;
  nodes[next].focus({preventScroll:false});
 };
 const copyText = async (value) => {
  if (!navigator.clipboard?.writeText) return false;
  try { await navigator.clipboard.writeText(value); return true; } catch { return false; }
 };
 window.KC = { $, $$, isReduced, toast, copyText, trapFocus, syncScrollLock };

 // The page stays visible even if GSAP is unavailable.
 let motionContext = null, pointerCleanup = () => {}, revealObserver = null;
 function settleMotion() {
  normalizeStage();
  pointerCleanup(); pointerCleanup = () => {};
  revealObserver?.disconnect(); revealObserver = null;
  if (!gsap) return;
  motionContext?.revert(); motionContext = null;
  const targets = $$('.stage-scenes,.stage-scene,.stage-light,.device-frame,.clinic-leaf,.skiie-story-window,.responsive-device');
  if (window.Flip) Flip.killFlipsOf($('#responsive-device'));
  gsap.killTweensOf(targets);
  gsap.set(targets,{clearProps:'transform,opacity'});
 }
 function establishMotion(entrance=false) {
  settleMotion();
  document.documentElement.dataset.motion = isReduced() ? 'off' : 'on';
  const control = $('.motion-toggle');
  control.setAttribute('aria-pressed', String(isReduced()));
  control.disabled = reduceQuery.matches;
  $('span:last-child', control).textContent = reduceQuery.matches ? 'System: reduced motion' : isReduced() ? 'Motion off' : 'Motion on';
  control.setAttribute('aria-label', reduceQuery.matches ? 'Reduced motion follows your system preference' : isReduced() ? 'Enable decorative motion' : 'Reduce decorative motion');
  if (!gsap || isReduced()) return;
  motionContext = gsap.context(() => {
   if (entrance) gsap.fromTo($$('.stage-scene:not([hidden]) .device-frame'),{y:26,opacity:.6},{y:0,opacity:1,duration:1.05,stagger:.12,ease:'power3.out',clearProps:'transform,opacity'});
  });
  const stage = $('#product-stage'), scenes = $('#stage-scenes'), light = $('.stage-light');
  if (fineQuery.matches) {
   let bounds = null;
   const rx = gsap.quickTo(scenes,'rotationX',{duration:.75,ease:'power3.out'});
   const ry = gsap.quickTo(scenes,'rotationY',{duration:.75,ease:'power3.out'});
   const lx = gsap.quickTo(light,'x',{duration:.95,ease:'power3.out'});
   const move = e => {
    if (stage.dataset.pose === 'flat' || document.hidden || $('dialog[open]')) return;
    if (!bounds) bounds = stage.getBoundingClientRect();
    rx(-((e.clientY - bounds.top) / bounds.height - .5) * 3.5);
    ry(((e.clientX - bounds.left) / bounds.width - .5) * 5);
    lx(((e.clientX - bounds.left) / bounds.width - .5) * 10);
   };
   const reset = () => { rx(0); ry(0); lx(0); bounds=null; };
   const invalidate = () => { bounds=null; };
   stage.addEventListener('pointermove',move);
   stage.addEventListener('pointerleave',reset);
   addEventListener('resize',invalidate);
   addEventListener('scroll',invalidate,{passive:true});
   $('#pose-button').addEventListener('click',reset);
   pointerCleanup = () => {
    stage.removeEventListener('pointermove',move); stage.removeEventListener('pointerleave',reset);
    removeEventListener('resize',invalidate); removeEventListener('scroll',invalidate);
    $('#pose-button').removeEventListener('click',reset);
   };
  }
  if ('IntersectionObserver' in window) {
   revealObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
     if (!entry.isIntersecting) continue;
     revealObserver.unobserve(entry.target);
     if (isReduced() || entry.target.dataset.revealed) continue;
     entry.target.dataset.revealed='true';
     if (entry.target.matches('.clinic-media')) gsap.fromTo($('.clinic-leaf',entry.target),{x:-15,y:14},{x:0,y:0,duration:1.1,ease:'power3.out',clearProps:'transform'});
     if (entry.target.matches('.skiie-media')) gsap.fromTo($('.skiie-story-window',entry.target),{y:16},{y:0,duration:1,ease:'power3.out',clearProps:'transform'});
    }
   },{threshold:.2});
   $$('.clinic-media,.skiie-media').forEach(el=>revealObserver.observe(el));
  }
 }
 $('.motion-toggle').addEventListener('click',() => {
  manualReduced = !manualReduced;
  try { localStorage.setItem('kc-theatre-motion',manualReduced ? 'off' : 'on'); } catch {}
  establishMotion();
  dispatchEvent(new CustomEvent('kc:motionchange'));
 });
 reduceQuery.addEventListener('change',() => {establishMotion();dispatchEvent(new CustomEvent('kc:motionchange'));});
 fineQuery.addEventListener('change',()=>establishMotion());

 // Project scenes: deterministic state, interruptible motion, no timed autoplay.
 const stage = $('#product-stage');
 let activeProject = 'garden', sceneTransition = null;
 const scenePalette = {
  garden:{'--scene-base':'#c91726','--scene-bright':'#f94046','--scene-deep':'#8b081c'},
  phc:{'--scene-base':'#1d6e7f','--scene-bright':'#55a6b2','--scene-deep':'#153c50'},
  skiie:{'--scene-base':'#b24d27','--scene-bright':'#f0a06c','--scene-deep':'#6a2b2b'}
 };
 function normalizeStage() {
  sceneTransition?.kill();sceneTransition=null;
  for(const scene of $$('.stage-scene')) {
   const active=scene.dataset.scene===activeProject;
   scene.hidden=!active;scene.inert=!active;
   if(active)scene.removeAttribute('aria-hidden');else scene.setAttribute('aria-hidden','true');
   if(gsap){gsap.killTweensOf(scene);gsap.set(scene,{clearProps:'opacity,transform,visibility,zIndex'});}
  }
  if(stage){for(const name of Object.keys(scenePalette.garden))stage.style.removeProperty(name);stage.removeAttribute('aria-busy');}
  if(gsap)gsap.set($('.stage-caption'),{clearProps:'opacity,transform'});
 }
 function selectProject(id) {
  const data=window.KC_PROJECTS[id];if(!data||id===activeProject)return;
  const previous=activeProject;
  const oldColors=Object.fromEntries(Object.keys(scenePalette.garden).map(k=>[k,getComputedStyle(stage).getPropertyValue(k).trim()]));
  normalizeStage();activeProject=id;
  const incoming=$('#scene-'+id),outgoing=$('#scene-'+previous);
  for(const scene of $$('.stage-scene')) {
   const active=scene===incoming;scene.hidden=!active;scene.inert=!active;
   if(active)scene.removeAttribute('aria-hidden');else scene.setAttribute('aria-hidden','true');
  }
  $$('[data-feature]').forEach(tab=>{const active=tab.dataset.feature===id;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;});
  stage.dataset.project=id;
  $('#stage-name').textContent=data.name;$('#stage-category').textContent=data.category;
  $('#stage-index').textContent=data.index;$('#stage-open').dataset.open=id;
  stage.style.setProperty('--project-position',String(Object.keys(window.KC_PROJECTS).indexOf(id)));
  if(!gsap||isReduced()){normalizeStage();return;}
  const direction=Object.keys(window.KC_PROJECTS).indexOf(id)>Object.keys(window.KC_PROJECTS).indexOf(previous)?1:-1;
  outgoing.hidden=false;outgoing.inert=true;outgoing.setAttribute('aria-hidden','true');
  incoming.style.zIndex='2';outgoing.style.zIndex='1';stage.setAttribute('aria-busy','true');
  const complete=()=>{normalizeStage();};
  sceneTransition=gsap.timeline({onComplete:complete});
  sceneTransition.fromTo(stage,oldColors,{...scenePalette[id],duration:.78,ease:'power2.inOut'},0)
   .to(outgoing,{opacity:0,x:-direction*18,y:-9,scale:.975,duration:.32,ease:'power2.in'},0)
   .fromTo(incoming,{opacity:0,x:direction*26,y:24,scale:.985},{opacity:1,x:0,y:0,scale:1,duration:.78,ease:'power3.out'},.08)
   .fromTo($('.stage-caption'),{y:7,opacity:.65},{y:0,opacity:1,duration:.46,ease:'power3.out'},.1);
 }
 window.KC.selectProject=selectProject;
 const tabs = $$('[data-feature]');
 tabs.forEach((tab,index) => {
  tab.addEventListener('click',()=>selectProject(tab.dataset.feature));
  tab.addEventListener('keydown',e=>{
   const map={ArrowLeft:-1,ArrowUp:-1,ArrowRight:1,ArrowDown:1};
   let next;
   if (e.key in map) next=(index+map[e.key]+tabs.length)%tabs.length;
   else if(e.key==='Home')next=0;else if(e.key==='End')next=tabs.length-1;else return;
   e.preventDefault();selectProject(tabs[next].dataset.feature);tabs[next].focus({preventScroll:true});
  });
 });
 const railQuery=matchMedia('(max-width:750px)');
 const orient=()=>$('.project-rail').setAttribute('aria-orientation',railQuery.matches?'horizontal':'vertical');
 railQuery.addEventListener('change',orient);orient();
 $('#pose-button').addEventListener('click',()=>{
  const flat = stage.dataset.pose !== 'flat';
  stage.dataset.pose = flat ? 'flat' : 'sculpted';
  $('#pose-button').setAttribute('aria-pressed',String(flat));
  $('span',$('#pose-button')).textContent = flat ? 'Sculpted view' : 'Front view';
 });

 // A FLIP transition between two genuine product captures, not a pretend embedded app.
 if (gsap && window.Flip) gsap.registerPlugin(Flip);
 const responsiveStage=$('#responsive-stage'), responsiveDevice=$('#responsive-device');
 let perspective='phone', perspectiveAnimation;
 function selectPerspective(value) {
  if (!['phone','desktop'].includes(value)||value===perspective) return;
  perspectiveAnimation?.kill();
  if (window.Flip) Flip.killFlipsOf(responsiveDevice);
  const state = gsap && window.Flip && !isReduced() ? Flip.getState(responsiveDevice) : null;
  perspective=value;
  responsiveStage.dataset.perspective=value;
  const data=KC_PROJECTS.garden.screens[value==='phone'?0:4];
  const image=$('#responsive-image');
  image.src='../assets/'+data.file+'.webp';image.alt='Baghban: '+data.name;image.width=data.width;image.height=data.height;
  $('#perspective-caption').textContent=value==='phone'?'Phone · 390 px capture':'Desktop · 1440 px capture';
  $('#perspective-open').dataset.screen=data.id;
  $$('[data-perspective]:is(button)').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.perspective===value)));
  if(state)perspectiveAnimation=Flip.from(state,{duration:.8,ease:'power3.inOut',scale:true,onComplete:()=>gsap.set(responsiveDevice,{clearProps:'transform,width,height,position,top,left'})});
 }
 $$('button[data-perspective]').forEach(b=>b.addEventListener('click',()=>selectPerspective(b.dataset.perspective)));

 // Lightweight sticky navigation, with no scroll hijacking.
 const header=$('#site-header');let scrollFrame=0;
 const updateHeader=()=>{header.classList.toggle('is-scrolled',scrollY>15);scrollFrame=0;};
 addEventListener('scroll',()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(updateHeader);},{passive:true});updateHeader();
 if ('IntersectionObserver' in window) {
  const navObserver=new IntersectionObserver(entries=>{
   for(const entry of entries)if(entry.isIntersecting){$$('.desktop-nav>a').forEach(a=>{if(a.getAttribute('href')==='#'+entry.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}
  },{rootMargin:'-15% 0px -55% 0px',threshold:0});
  $$('#work,#craft,#studio').forEach(el=>navObserver.observe(el));
 }
 const menu=$('#mobile-menu'),menuTrigger=$('.menu-trigger');
 const closeMenu=({restoreFocus=true}={})=>{if(menu.open)menu.close();menuTrigger.setAttribute('aria-expanded','false');syncScrollLock();if(restoreFocus)menuTrigger.focus({preventScroll:true});};
 menuTrigger.addEventListener('click',()=>{menu.showModal();menuTrigger.setAttribute('aria-expanded','true');syncScrollLock();});
 $('[data-close-menu]').addEventListener('click',closeMenu);
 menu.addEventListener('cancel',e=>{e.preventDefault();closeMenu();});
 menu.addEventListener('close',()=>{menuTrigger.setAttribute('aria-expanded','false');syncScrollLock();});
 menu.addEventListener('keydown',e=>trapFocus(menu,e));
 $$('nav a',menu).forEach(a=>a.addEventListener('click',()=>{closeMenu({restoreFocus:false});const target=$(a.hash);if(target){target.tabIndex=-1;target.focus({preventScroll:true});}}));
 menu.addEventListener('click',e=>{if(e.target!==menu)return;const r=menu.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeMenu();});
 railQuery.addEventListener('change',()=>{if(!railQuery.matches&&menu.open)closeMenu();});
 $('#copy-email').addEventListener('click',async()=>{
  if(await copyText(KC_CONTACT.email)){toast('Email address copied.');return;}
  let input=$('#email-copy-fallback');
  if(!input){input=document.createElement('input');input.id='email-copy-fallback';input.className='email-copy-fallback';input.readOnly=true;input.setAttribute('aria-label','Email address to copy');$('.email-row').append(input);}
  input.value=KC_CONTACT.email;input.focus();input.select();toast('Select and copy the email address.');
 });
 establishMotion(true);
})();
