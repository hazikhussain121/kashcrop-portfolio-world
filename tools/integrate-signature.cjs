// One-time integration into the React app, with exact-match guards.
const fs=require('node:fs');
function change(file,before,after){const source=fs.readFileSync(file,'utf8');if(!source.includes(before))throw Error('Expected source not found: '+file+' / '+before.slice(0,80));fs.writeFileSync(file,source.replace(before,()=>after));}
const home=`import type { MetaFunction } from 'react-router';
import { HeroTheatre } from '~/components/portfolio/HeroTheatre';
import { FeaturedWork, ServicesPreview, StudioSummary } from '~/components/portfolio/HomeSections';
import { ProductAnatomy } from '~/components/portfolio/signature/ProductAnatomy';
import { CareJourney } from '~/components/portfolio/signature/CareJourney';
import { CraftPlayground } from '~/components/portfolio/signature/CraftPlayground';
import { pageMeta } from '~/lib/portfolio/seo';
export const meta:MetaFunction=()=>pageMeta('Good work. In plain sight.','KashCrop Innovations designs and builds useful digital systems. Explore real products, an interactive system study and the craft behind the work.');
export default function Home(){return <main id="main"><HeroTheatre/><FeaturedWork/><ProductAnatomy/><CareJourney/><CraftPlayground/><ServicesPreview/><StudioSummary/></main>;}
`;
fs.writeFileSync('app/routes/home.tsx',home);
change('app/root.tsx',"import { SiteHeader }", "import { ScrollDirector } from './components/portfolio/signature/ScrollDirector';\nimport { SiteHeader }");
change('app/root.tsx','return <MotionProvider><a className="skip-link"','return <MotionProvider><ScrollDirector/><a className="skip-link"');
change('app/components/portfolio/HeroTheatre.tsx',"import { useEffect, useRef, useState } from 'react';", "import { lazy, Suspense, useEffect, useRef, useState } from 'react';\nconst StudioTour = lazy(() => import('./signature/StudioTour'));");
change('app/components/portfolio/HeroTheatre.tsx','export function HeroTheatre() {','export function HeroTheatre() {\n const [tourOpen, setTourOpen] = useState(false);');
change('app/components/portfolio/HeroTheatre.tsx','<Link className="underlined hero-action" to="/projects">Step inside the work <Icon/></Link>','<div className="hero-cta-group"><Link className="underlined hero-action" to="/projects">Explore the work <Icon/></Link><button className="tour-trigger" onClick={() => setTourOpen(true)} aria-haspopup="dialog"><span aria-hidden="true">▷</span>Take the studio tour</button></div>');
change('app/components/portfolio/HeroTheatre.tsx','Keep looking <span aria-hidden="true">↓</span></a></div></>;','Keep looking <span aria-hidden="true">↓</span></a></div>{tourOpen && <Suspense fallback={null}><StudioTour onClose={() => setTourOpen(false)}/></Suspense>}</>;');
change('app/routes/projects.tsx',"import { Icon }", "import { ScreenAtlas } from '~/components/portfolio/signature/ScreenAtlas';\nimport { Icon }");
change('app/routes/projects.tsx','<section className="work-index section-wrap"','{!query && !selectedCategory && <ScreenAtlas/>}<section className="work-index section-wrap"');
change('app/routes/about.tsx',"import { Icon }", "import { DeliveryMethod } from '~/components/portfolio/signature/DeliveryMethod';\nimport { Icon }");
change('app/routes/about.tsx','<section className="studio-principles section-wrap">','<DeliveryMethod/><section className="studio-principles section-wrap">');
change('app/routes/about.tsx','<span className="founder-signature" aria-hidden="true">hh.</span>','<div className="founder-studio-word" aria-hidden="true">Ideas,<br/>made<br/><em>useful.</em></div>');
change('app/components/portfolio/HomeSections.tsx','<span className="founder-monogram" aria-hidden="true">hh.</span>','<span className="founder-name-mark" aria-hidden="true"><Icon name="arrow"/></span>');
change('app/routes/project.tsx',"import { Icon }", "import { CareJourney } from '~/components/portfolio/signature/CareJourney';\nimport { ResponsiveShowcase } from '~/components/portfolio/HomeSections';\nimport { Icon }");
change('app/routes/project.tsx','<section className="engineering-section">','{p.slug===\'plant-health-clinic\' && <CareJourney compact/>}{p.slug===\'baghban\' && <ResponsiveShowcase/>}<section className="engineering-section">');
// These loaders only consume params and request; narrow their declared dependency surface.
for(const file of ['app/routes/project.tsx','app/routes/service.tsx']){
 const source=fs.readFileSync(file,'utf8');fs.writeFileSync(file,source.replace(/\}:LoaderFunctionArgs\)/g,"}:Pick<LoaderFunctionArgs,'params'|'request'>)"));
}
const imports=['signature','anatomy','care-journey','craft-playground','archive-method'].map(name=>`@import './styles/portfolio/${name}.css';`).join('\n');
const css=fs.readFileSync('app/app.css','utf8');fs.writeFileSync('app/app.css',"@import 'lenis/dist/lenis.css';\n"+css+'\n'+imports+'\n');
console.log('Integrated six signature experiences into the actual React routes. No standalone prototype added.');
