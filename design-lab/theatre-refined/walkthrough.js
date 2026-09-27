/* An in-page window into existing screenshots, not a simulated transaction flow. */
(() => {
 'use strict';
 const { $, $$, isReduced }=window.KC,project=window.KC_PROJECTS.garden;
 const controls=$$('[data-walkthrough]'),media=$('.garden-story-media');if(!media||!controls.length)return;
 const primary=$('.story-device-one .device-screen img'),secondary=$('.story-device-two .device-screen img');
 const frame=$('.story-device-one .device-frame');let current='home',transition=null;
 const captions={
  home:['Farmer home','The services and tools a grower can reach from home.'],
  'orchard-setup':['Orchard setup','An introduction to the service, before asking for a request.'],
  calendar:['Seasonal calendar','A closer look at the seasonal guidance screen.'],
  varieties:['Variety explorer','The variety-explorer result in the local product build.']
 };
 function settle(){transition?.kill();transition=null;if(window.gsap)gsap.set(frame,{clearProps:'opacity,transform'});}
 function select(id){
  const screen=project.screens.find(s=>s.id===id);if(!screen||id===current)return;
  settle();current=id;
  controls.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.walkthrough===id)));
  primary.src='../assets/'+screen.file+'.webp';primary.alt='Baghban: '+screen.name+' — actual local-build capture';primary.width=screen.width;primary.height=screen.height;
  const support=project.screens[id==='home'?1:0];secondary.src='../assets/'+support.file+'.webp';secondary.alt='Baghban: '+support.name;secondary.width=support.width;secondary.height=support.height;
  $('#walkthrough-title').textContent=captions[id][0];$('#walkthrough-caption').textContent=captions[id][1];
  $$('[data-open="garden"]',$('.work-garden')).forEach(b=>b.dataset.screen=id);
  if(window.gsap&&!isReduced())transition=gsap.fromTo(frame,{opacity:.5,y:10},{opacity:1,y:0,duration:.5,ease:'power3.out',clearProps:'opacity,transform'});
 }
 controls.forEach((button,index)=>{
  button.addEventListener('click',()=>select(button.dataset.walkthrough));
  button.addEventListener('keydown',event=>{
   if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
   event.preventDefault();const next=event.key==='Home'?0:event.key==='End'?controls.length-1:(index+(event.key==='ArrowRight'?1:-1)+controls.length)%controls.length;
   controls[next].focus({preventScroll:true});select(controls[next].dataset.walkthrough);
  });
 });
 addEventListener('kc:motionchange',()=>{if(isReduced())settle()});
})();
