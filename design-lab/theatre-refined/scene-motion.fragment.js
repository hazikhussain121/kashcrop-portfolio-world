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
