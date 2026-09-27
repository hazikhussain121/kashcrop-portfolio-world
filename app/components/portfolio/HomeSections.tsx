import { useRef, useState } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Flip } from 'gsap/Flip';
import { company, featuredProjects, getProject, media } from '~/data/portfolio/catalog';
import { serviceCatalog } from '~/data/portfolio/services';
import { BrowserFrame, DeviceFrame, GalleryLink, SectionHeading } from './UI';
import { Icon } from './Icon';
import { useMotion } from './MotionProvider';
gsap.registerPlugin(useGSAP,Flip);

export function FeaturedWork() {
 const garden=featuredProjects[0],phc=featuredProjects[1],skiie=featuredProjects[2];
 const [screenIndex,setScreenIndex]=useState(0),screen=garden.screens[screenIndex];const image=useRef<HTMLDivElement>(null);const {reduced}=useMotion();
 useGSAP(()=>{if(!reduced&&image.current)gsap.fromTo(image.current,{y:8,opacity:.65},{y:0,opacity:1,duration:.52,ease:'power3.out',clearProps:'transform,opacity'});},{scope:image,dependencies:[screenIndex,reduced],revertOnUpdate:true});
 return <section className="selected-work section-wrap" id="work" aria-labelledby="work-title">
 <div className="section-heading"><h2 id="work-title">Useful by purpose.<br/>Thoughtful by design.</h2><p>A few of the products and platforms<br/>we’ve brought to life.</p></div>
 <article className="work-feature work-garden" aria-labelledby="garden-title">
 <div className="garden-story-media media-stage">
  <div className="orchard-photo"><img src={media('apple-orchard.webp')} alt="Red apples on a tree; stock orchard context photograph" loading="lazy" decoding="async"/><span className="photo-credit">Context photograph · Marek Studzinski / Unsplash</span></div>
  <div className="garden-story-word" aria-hidden="true">Closer to<br/>your orchard.</div>
  <div className="garden-story-device story-device-one" ref={image}><DeviceFrame screen={screen}/></div>
  <div className="garden-story-device story-device-two"><DeviceFrame screen={garden.screens[1]}/></div>
  <div className="walkthrough-preview-label" aria-live="polite"><strong>{screen.name}</strong><span>{screen.caption}</span></div>
  <GalleryLink project={garden} screen={screen} className="round-open icon-button" aria-label={`Inspect Baghban: ${screen.name}`}><Icon/></GalleryLink>
 </div>
 <div className="walkthrough"><p className="walkthrough-label">A closer look at Baghban<span>Browse the actual screens</span></p><div className="walkthrough-controls" role="group" aria-label="Baghban screen previews">{garden.screens.slice(0,4).map((s,i)=><button key={s.id} aria-pressed={screenIndex===i} onClick={()=>setScreenIndex(i)}>{s.name}</button>)}</div></div>
 <div className="project-caption"><div><p className="project-type">Grower platform</p><h3 id="garden-title"><Link to="/projects/baghban">An orchard, brought together.</Link></h3></div><p>Services, seasonal guidance and practical tools.<br/>All designed around the grower.</p><Link className="underlined" to="/projects/baghban">The Baghban project <Icon/></Link></div>
 </article>
 <div className="work-pair">
 <article className="work-feature work-phc"><div className="clinic-media media-stage"><div className="clinic-orbit" aria-hidden="true"/><img className="clinic-leaf" src={media('leaf.webp')} alt="" width="560" height="560" loading="lazy"/><div className="clinic-device"><DeviceFrame screen={phc.screens[0]}/></div><span className="media-note">Made for the first question.</span><GalleryLink project={phc} className="round-open icon-button" aria-label="Inspect Plant Health Clinic screens"><Icon/></GalleryLink></div><div className="pair-caption"><p className="project-type">Farmer app · SKUAST-Kashmir</p><h3><Link to="/projects/plant-health-clinic">Care, a little closer.</Link></h3><p>From a plant-health concern to the next clear step.</p><Link className="underlined" to="/projects/plant-health-clinic">The Plant Health Clinic project <Icon/></Link></div></article>
 <article className="work-feature work-skiie"><div className="skiie-media media-stage"><div className="skiie-arch" aria-hidden="true"/><BrowserFrame screen={skiie.screens[0]} className="skiie-story-window" address="skiie.co.in"/><span className="media-note">A home for what’s next.</span><GalleryLink project={skiie} className="round-open icon-button" aria-label="Inspect the SKIIE website"><Icon/></GalleryLink></div><div className="pair-caption"><p className="project-type">Institutional web platform</p><h3><Link to="/projects/skiie">Where ideas find their people.</Link></h3><p>A public home for startups, programmes and opportunity.</p><Link className="underlined" to="/projects/skiie">The SKIIE project <Icon/></Link></div></article>
 </div>
 <div className="all-work-link"><p>Different domains. The same attention to detail.</p><Link className="button button-outline" to="/projects">Explore all work <Icon/></Link></div>
 </section>;
}
export function ResponsiveShowcase() {
 const [perspective,setPerspective]=useState<'phone'|'desktop'>('phone');const device=useRef<HTMLDivElement>(null),flip=useRef<ReturnType<typeof Flip.getState>|null>(null);const {reduced}=useMotion();const project=getProject('baghban')!;const screen=project.screens[perspective==='phone'?0:4];
 useGSAP(()=>{if(!reduced&&flip.current){Flip.from(flip.current,{duration:.75,ease:'power3.inOut',scale:true,clearProps:true});flip.current=null;}},{scope:device,dependencies:[perspective,reduced],revertOnUpdate:true});
 function change(value:'phone'|'desktop'){if(value===perspective)return;if(device.current&&!reduced){Flip.killFlipsOf(device.current);flip.current=Flip.getState(device.current);}setPerspective(value);}
 return <section className="craft-section section-wrap" id="craft" aria-labelledby="craft-title"><div className="craft-copy"><p className="section-note">Look a little closer.</p><h2 id="craft-title">The same care.<br/>Every screen.</h2><p>A considered experience shouldn’t stop at the edge of a device.</p><div className="view-switch" role="group" aria-label="Choose a product perspective"><button aria-pressed={perspective==='phone'} onClick={()=>change('phone')}><Icon name="mobile"/>On a phone</button><button aria-pressed={perspective==='desktop'} onClick={()=>change('desktop')}><Icon name="desktop"/>On a desktop</button></div><p className="craft-footnote">Two actual Baghban captures.<br/>One product, viewed differently.</p></div><div className="responsive-stage" data-perspective={perspective}><div className="responsive-grid" aria-hidden="true"/><div className="responsive-halo" aria-hidden="true"/><div className="responsive-device" ref={device}><div className="responsive-chrome" aria-hidden="true"><span className="window-dots"><i/><i/><i/></span><span>Baghban / Grower platform</span></div><img src={media(screen.file)} alt={`Baghban: ${screen.name}`} width={screen.width} height={screen.height} loading="lazy"/></div><div className="responsive-caption"><span aria-live="polite">{perspective==='phone'?'Phone · 390 px capture':'Desktop · 1440 px capture'}</span><GalleryLink project={project} screen={screen} className="underlined">Inspect the screen <Icon name="expand"/></GalleryLink></div></div></section>;
}
export function ServicesPreview(){return <section className="services-preview section-wrap"><div><p className="section-note">From the interface to the infrastructure.</p><h2>One studio.<br/>Connected thinking.</h2><p>Design, engineering and applied AI belong in the same conversation.</p><Link className="underlined" to="/services">How we can help <Icon/></Link></div><div className="service-preview-list">{serviceCatalog.map(s=><Link key={s.slug} to={`/services/${s.slug}`}><h3>{s.name}</h3><p>{s.headline}</p><Icon/></Link>)}</div></section>;}
export function StudioSummary(){return <section className="studio-section section-wrap" id="studio" aria-labelledby="studio-title"><div className="studio-identity"><div className="studio-mark" aria-hidden="true"><img src={media('kashcrop-logo.png')} alt="" width="110" height="110" loading="lazy"/></div><p>KashCrop Innovations<small>Product design · Engineering · Applied AI</small></p></div><div className="studio-main"><h2 id="studio-title">From the first idea.<br/>Through to the details.</h2><p>We bring design, engineering and applied AI together to build useful digital systems. Based in Kashmir, we work across agriculture, institutions and the ideas in between.</p><div className="studio-people"><Link className="founder" to="/about"><span className="founder-name-mark" aria-hidden="true"><Icon name="arrow"/></span><span><strong>{company.founder}</strong><small>Founder · Product & Engineering</small></span></Link><a className="incubator" href="https://skiie.co.in/" target="_blank" rel="noopener noreferrer"><img src={media('skiie-logo.png')} alt="SKIIE" width="45" height="45" loading="lazy"/><span>Incubated at SKIIE<small>SKUAST-Kashmir</small></span><Icon/></a></div><Link className="underlined studio-more" to="/about">Meet the studio <Icon/></Link></div></section>;}
