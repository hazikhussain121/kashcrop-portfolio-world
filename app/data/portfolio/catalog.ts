import { caseStudyProjects } from '../caseStudies';
import { caseDepth, caseSystemDiagrams, type CaseDepth, type CaseSystemDiagram } from './caseDepth';

export const company = {
 name: 'KashCrop Innovations', legalName: 'KashCrop Innovations Pvt Ltd', url: 'https://kashcrop.in',
 email: 'Hazik@Kashcrop.in', phone: '+91 8493905940', phoneLink: '+918493905940',
 founder: 'Hazik Hussain', location: 'Kashmir, India',
 linkedin: 'https://www.linkedin.com/in/hazik-hussain-49b5663a3/',
} as const;
export const media = (file: string) => `/media/portfolio/${file}`;
export type ProjectCategory = 'Platforms' | 'Applied AI' | 'Websites' | 'Research';
export type Screen = { id: string; name: string; file: string; width: number; height: number; kind: 'Mobile' | 'Desktop'; caption: string };
export type Project = {
 slug: string; name: string; category: ProjectCategory; kind: string; year: string;
 tagline: string; summary: string; overview: string[]; features: string[]; stack: string[];
 facts: { label: string; value: string }[]; scope: string[];
 theme: 'garden' | 'phc' | 'skiie' | 'kashcrop' | 'fish' | 'research';
 screens: Screen[]; source: string;
 links: { label: string; href: string; kind?: string }[];
 workflow: { title: string; steps: string[] } | null;
 diagrams: CaseSystemDiagram[];
 depth: CaseDepth | null;
};
const shot = (id: string, name: string, file: string, height: number, caption: string, width = 390): Screen => ({id,name,file:`${file}.webp`,width,height,kind:width > 600 ? 'Desktop' : 'Mobile',caption});
const gardenScreens = [
 shot('home','Farmer home','garden-home',844,'Orchard services and practical next steps, brought into one place.'),
 shot('orchard-setup','Orchard setup','garden-service',1991,'The service is explained before a grower is asked to make a request. Scroll to explore the complete page.'),
 shot('calendar','Seasonal calendar','garden-calendar',1607,'Seasonal guidance alongside the work of looking after an orchard.'),
 shot('varieties','Variety explorer','garden-varieties',2556,'A closer look at the variety-explorer interface. Scroll to inspect the complete result.'),
 shot('desktop','Desktop view','garden-desktop',1537,'The same grower platform, designed for a wider viewport.',1440),
];
const phcScreens = [
 shot('home','Farmer home','phc-home',844,'A clear starting point for a farmer with a plant-health concern.'),
 shot('report','Report a problem','phc-submit',844,'A focused interface for documenting the plant problem.'),
 shot('photo-guide','Photo guidance','phc-guide',844,'Photography guidance at the moment it is useful.'),
];
const garden: Project = {
 slug:'baghban',name:'BaghBani',category:'Platforms',kind:'Orchard services & grower tools',year:'2026',theme:'garden',
 tagline:'An orchard, brought together.',summary:'Services, seasonal guidance and practical tools. All designed around the grower.',
 overview:[
  'A grower should be able to understand an orchard service before being asked to choose a location, fill in a form or make a commitment. Baghban brings the service, the explanation and the next step into one experience.',
  'The platform connects orchard services, specialist access, seasonal guidance and grower tools. The interface prioritises clear language, useful context and a mobile experience suited to field use.',
 ],features:['Farmer-first service discovery','Orchard establishment and care requests','Specialist consultations and group sessions','Seasonal calendar and grower tools','Responsive mobile and desktop experience'],
 stack:['React','TypeScript','Cloudflare','D1','R2'],scope:['Product design','Farmer experience','Full-stack'],
 facts:[{label:'Audience',value:'Orchard growers'},{label:'Surfaces',value:'Farmer, specialist and admin'},{label:'Role',value:'Product design + engineering'}],
 screens:gardenScreens,source:'Actual interface captures from the Garden Guardians review build, 20 September 2026. These show implemented interface work; the pictured version is not a claim of current public release. Screens are a visual record, not an embedded application.',
 links:[{label:'Google Play · open testing',href:'https://play.google.com/store/apps/details?id=com.kashcrop.app',kind:'playstore'}],
 workflow:{title:'From understanding a service to taking the next step.',steps:['Explore the service','Understand the scope','Share orchard details','Request support']},
 diagrams:[],depth:caseDepth.baghban,
};
const visual: Record<string, Partial<Project>> = {
 'plant-health-clinic':{name:'Plant Health Clinic',category:'Applied AI',theme:'phc',tagline:'Care, a little closer.',screens:phcScreens,scope:['Product design','Farmer app','Expert workflow'],source:'Actual farmer-app captures from the Plant Health Clinic review build, 20 September 2026. Medical and agricultural advice is not provided through this portfolio viewer.'},
 'skiie':{category:'Websites',theme:'skiie',tagline:'Where ideas find their people.',scope:['Website','Content system','Institutional UX'],screens:[shot('home','Public homepage','skiie',960,'The public SKIIE homepage, captured 20 September 2026.',1440)],source:'Captured from the public skiie.co.in homepage on 20 September 2026. The live website may have changed since this capture.'},
 'kashcrop':{category:'Platforms',theme:'kashcrop',scope:['Grower tools','Web + Android','Full-stack'],screens:[],overview:['KashCrop brings the most useful orchard tools together: mandi rates, a seasonal roadmap, weather, references, and calculators for spray quantities, units, and estimated profit.','The project was developed for web and Android, with Kashmiri, Urdu and English interfaces. Its core utility experience brings the practical tools together, with account-based and experimental features kept separate.'],source:'Project description and implementation details from the existing KashCrop portfolio records. This case documents the orchard companion under its earlier KashCrop identity.'},
 'trace-amp':{category:'Research',theme:'research',scope:['Research interface','Scientific workflow','Full-stack'],screens:[],source:'System overview drawn from the existing project record. The illustrated workflow is not an application screenshot.'},
 'treat-my-fish':{category:'Applied AI',theme:'fish',scope:['Grower app','Expert workflow','Applied AI'],screens:[],source:'System overview drawn from the existing project record. The illustrated workflow is not an application screenshot.'},
};
const datedReferenceLabels: Record<string, string> = {
 'https://risingkashmir.com/skuast-k-launches-ai-driven-plant-health-clinic/':'App launch · Rising Kashmir · 19 May 2026',
 'https://kashmirreader.com/2026/04/09/skuast-k-launches-nextgen-e-plant-clinic-at-shalimar-campus/':'Clinic facilities · Kashmir Reader · 9 April 2026',
};
const legacy: Project[] = caseStudyProjects.map(p => ({
 slug:p.slug,name:p.name,category:'Platforms',theme:'research',kind:p.kind,year:p.year,tagline:p.tagline,
 summary:p.summary,overview:p.detail?.overview ?? [p.summary],features:p.features,stack:p.stack,
 facts:(p.detail?.facts ?? []).map(f=>f.label==='Status' ? {label:p.slug==='plant-health-clinic'?'Public milestone':'Website',value:p.slug==='skiie'?'skiie.co.in':p.slug==='plant-health-clinic'?'App inaugurated · 18 May 2026':f.value} : f),scope:['Product design','Engineering'],screens:[],
 source:'Project information from the existing company portfolio.',links:p.links.filter(link=>p.slug!=='kashcrop'||link.kind!=='playstore').map(link=>({...link,label:datedReferenceLabels[link.href] ?? link.label})),
 workflow:p.detail?.vizier ? {title:p.detail.vizier.headline,steps:p.detail.vizier.steps} : null,
 diagrams:caseSystemDiagrams[p.slug] ?? [],depth:caseDepth[p.slug] ?? null,
 ...visual[p.slug],
}));
export const projects: Project[] = [garden,...['plant-health-clinic','skiie','kashcrop','treat-my-fish','trace-amp'].map(slug=>legacy.find(p=>p.slug===slug)!).filter(Boolean)];
export const featuredProjects = projects.slice(0,3);
export const categories: ProjectCategory[] = ['Platforms','Applied AI','Websites','Research'];
export const projectAliases: Record<string,string> = {'garden-guardians':'baghban','baghbani':'baghban','skuast-plant-health-clinic':'plant-health-clinic','fish-health-clinic':'treat-my-fish'};
export function getProject(slug: string | undefined) { return projects.find(p=>p.slug === slug); }
export function findProjects(query = '', category = '') {
 const needle=query.trim().toLocaleLowerCase();
 return projects.filter(p=>(!category || p.category===category)&&(!needle || [p.name,p.kind,p.summary,...p.scope,...p.stack].join(' ').toLocaleLowerCase().includes(needle)));
}
export function getScreen(project: Project, screenId?: string | null) { return project.screens.find(s=>s.id===screenId) ?? project.screens[0]; }
