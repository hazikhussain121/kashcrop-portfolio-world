'use strict';
// Curated evidence, not invented metrics or project-status claims.
window.KC_PROJECTS = Object.freeze({
 garden: {
  slug:'baghban',name:'Baghban',category:'Orchard services & grower tools',index:'01 / 03',
  summary:'An orchard companion bringing services, seasonal guidance and practical tools into one farmer-facing experience.',
  scope:['Product design','Farmer experience','Full-stack'],
  source:'Actual interface captures from the Garden Guardians local review build, 20 September 2026. These show rendered product work, not a claim that this exact build is publicly deployed. No cases, bookings or payments can be submitted through this viewer.',
  screens:[
   {id:'home',name:'Farmer home',file:'garden-home',width:390,height:844,kind:'Mobile',caption:'The orchard’s services, tools and next steps, brought into one place.'},
   {id:'orchard-setup',name:'Orchard setup',file:'garden-service',width:390,height:1991,kind:'Mobile',caption:'A service explained before a grower is asked to make a request. Scroll to read the complete page.'},
   {id:'calendar',name:'Seasonal calendar',file:'garden-calendar',width:390,height:1607,kind:'Mobile',caption:'Seasonal guidance in context. Scroll to inspect the complete calendar capture.'},
   {id:'varieties',name:'Variety explorer',file:'garden-varieties',width:390,height:2556,kind:'Mobile',caption:'A closer look at the local-build variety explorer. Scroll to inspect its complete result.'},
   {id:'desktop',name:'Desktop view',file:'garden-desktop',width:1440,height:1537,kind:'Desktop',caption:'The same grower platform at a wider viewport. This is a capture, not an embedded application.'}
  ]
 },
 phc:{
  slug:'plant-health-clinic',name:'Plant Health Clinic',category:'Farmer-to-expert care',index:'02 / 03',
  summary:'A focused farmer interface for reporting a plant problem, preparing useful photographs and finding a path to expert care.',
  scope:['Product design','Farmer app','Expert workflow'],
  source:'Actual captures from the Plant Health Clinic farmer-app local review build, 20 September 2026. These screens are not a live diagnosis or advisory service. Source artwork and screenshots were reused from the existing project.',
  screens:[
   {id:'home',name:'Farmer home',file:'phc-home',width:390,height:844,kind:'Mobile',caption:'A clear starting point for a farmer with a plant-health concern.'},
   {id:'report',name:'Report a problem',file:'phc-submit',width:390,height:844,kind:'Mobile',caption:'The plant-problem report screen, captured in the local farmer build.'},
   {id:'photo-guide',name:'Photo guidance',file:'phc-guide',width:390,height:844,kind:'Mobile',caption:'A little guidance at the moment it is needed: photographing the plant problem.'}
  ]
 },
 skiie:{
  slug:'skiie',name:'SKIIE',category:'Institutional web platform',index:'03 / 03',
  summary:'A public home for an incubation centre: its startups, programmes, opportunities and the people behind them.',
  scope:['Website','Product design','Content system'],
  source:'A public homepage capture taken from skiie.co.in on 20 September 2026. The live website may have changed since this capture. No private or authenticated account was accessed for this study.',
  publicURL:'https://skiie.co.in/',
  screens:[{id:'home',name:'Public homepage',file:'skiie',width:1440,height:960,kind:'Desktop',caption:'The SKIIE homepage as captured from the public website. Open the live site to explore its current version.'}]
 }
});
window.KC_CONTACT = Object.freeze({email:'Hazik@Kashcrop.in',url:'https://kashcrop.in/contact/',phone:'+918493905940'});
