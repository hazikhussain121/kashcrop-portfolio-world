import { lazy, Suspense, useEffect, useRef, useState } from 'react';
const StudioTour = lazy(() => import('./signature/StudioTour'));
import { Link } from 'react-router';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { featuredProjects, media, type Project } from '~/data/portfolio/catalog';
import { BrowserFrame, DeviceFrame, GalleryLink } from './UI';
import { Icon } from './Icon';
import { useMotion } from './MotionProvider';
gsap.registerPlugin(useGSAP);

function Scene({project}:{project:Project}) {
 const [first,second]=project.screens;
 return <div className={`composition composition-${project.theme}`}>
 {project.theme==='skiie'?<><BrowserFrame screen={first} className="stage-browser" address="skiie.co.in"/><div className="browser-reflection" aria-hidden="true"/></>:<>
 {project.theme==='phc'&&<img className="scene-leaf" src={media('leaf.webp')} alt="" width="560" height="560"/>}
 <div className="device-position device-secondary"><DeviceFrame screen={second}/></div>
 <div className="device-position device-primary"><DeviceFrame screen={first} priority={project.theme==='garden'}/></div>
 </>}
 </div>;
}
export function HeroTheatre() {
 const [tourOpen, setTourOpen] = useState(false);
 const [selected,setSelected]=useState(0),[outgoing,setOutgoing]=useState<number|null>(null),[flat,setFlat]=useState(false),[horizontal,setHorizontal]=useState(false);
 const root=useRef<HTMLElement>(null),stage=useRef<HTMLDivElement>(null),tabs=useRef<(HTMLButtonElement|null)[]>([]);
 const {reduced}=useMotion();const active=featuredProjects[selected];
 useEffect(()=>{const q=matchMedia('(max-width:750px)');const sync=()=>setHorizontal(q.matches);sync();q.addEventListener('change',sync);return ()=>q.removeEventListener('change',sync);},[]);
 useGSAP(()=>{
  if(reduced){setOutgoing(null);return;}
  const current=root.current?.querySelector(`[data-scene="${active.theme}"]`);
  const old=outgoing!==null?root.current?.querySelector(`[data-scene="${featuredProjects[outgoing].theme}"]`):null;
  const tl=gsap.timeline({onComplete:()=>setOutgoing(null)});
  if(old)tl.to(old,{y:-12,opacity:0,scale:.975,duration:.3,ease:'power2.in'},0);
  if(current){tl.fromTo(current,{y:22,opacity:.2},{y:0,opacity:1,duration:.72,ease:'power3.out',clearProps:'transform,opacity'},.07);tl.fromTo(current.querySelectorAll('.device-frame,.site-window'),{y:15},{y:0,duration:.82,stagger:.055,ease:'power3.out',clearProps:'transform'},.07);}
  tl.fromTo('.stage-caption',{y:7,opacity:.4},{y:0,opacity:1,duration:.48,clearProps:'transform,opacity'},.12);
 },{scope:root,dependencies:[selected,reduced],revertOnUpdate:true});
 useGSAP(()=>{
  if(reduced||!stage.current||!matchMedia('(hover:hover) and (pointer:fine)').matches)return;
  const node=stage.current,scenes=node.querySelector('.stage-scenes'),light=node.querySelector('.stage-light');
  const rx=gsap.quickTo(scenes,'rotationX',{duration:.7,ease:'power3.out'}),ry=gsap.quickTo(scenes,'rotationY',{duration:.7,ease:'power3.out'}),lx=gsap.quickTo(light,'x',{duration:.85,ease:'power3.out'});
  const move=(e:PointerEvent)=>{if(flat||document.hidden||document.querySelector('dialog[open]'))return;const r=node.getBoundingClientRect();rx(-((e.clientY-r.top)/r.height-.5)*3.2);ry(((e.clientX-r.left)/r.width-.5)*4.8);lx(((e.clientX-r.left)/r.width-.5)*9);};
  const reset=()=>{rx(0);ry(0);lx(0);};node.addEventListener('pointermove',move);node.addEventListener('pointerleave',reset);
  return ()=>{node.removeEventListener('pointermove',move);node.removeEventListener('pointerleave',reset);};
 },{scope:root,dependencies:[reduced,flat],revertOnUpdate:true});
 function select(index:number){if(index===selected)return;setOutgoing(selected);setSelected(index);}
 return <><section className="hero" ref={root} aria-labelledby="hero-title">
 <div className="hero-copy"><p className="location-line"><span className="signal-dot" aria-hidden="true"/>Independent studio · Kashmir, India</p><h1 id="hero-title"><span>Good work.</span><span>In <em>plain sight.</em></span></h1><p className="hero-lede">We turn real-world problems into digital products. Here’s what that looks like.</p><div className="hero-cta-group"><Link className="underlined hero-action" to="/projects">Explore the work <Icon/></Link><button className="tour-trigger" onClick={() => setTourOpen(true)} aria-haspopup="dialog"><span aria-hidden="true">▷</span>Take the studio tour</button></div></div>
 <div className="product-stage" ref={stage} id="product-stage" data-project={active.theme} data-pose={flat?'flat':'sculpted'}>
 <div className="stage-light" aria-hidden="true"/><div className="stage-arch" aria-hidden="true"/><div className="stage-floor" aria-hidden="true"/>
 <div className="stage-top"><span>Selected work <span className="stage-index">{String(selected+1).padStart(2,'0')} / 03</span></span><button className="pose-button" onClick={()=>setFlat(v=>!v)} aria-pressed={flat}><Icon name="layers"/><span>{flat?'Sculpted view':'Front view'}</span></button></div>
 <div className="stage-scenes">{featuredProjects.map((p,i)=><div key={p.slug} className="stage-scene" id={`scene-${p.theme}`} role="tabpanel" aria-labelledby={`tab-${p.theme}`} data-scene={p.theme} hidden={i!==selected&&i!==outgoing} inert={i!==selected} aria-hidden={i!==selected}><Scene project={p}/></div>)}</div>
 <div className="stage-bottom"><div className="stage-caption" aria-live="polite" aria-atomic="true"><p>{active.name}</p><span>{active.kind}</span></div><GalleryLink project={active} className="button button-white stage-open">Explore project <Icon/></GalleryLink></div>
 <div className="stage-progress" aria-hidden="true" style={{'--progress':`${(selected+1)/3*100}%`} as React.CSSProperties}/>
 </div>
 <div className="project-rail" role="tablist" aria-label="Featured projects" aria-orientation={horizontal?'horizontal':'vertical'}>{featuredProjects.map((p,i)=><button key={p.slug} id={`tab-${p.theme}`} ref={node=>{tabs.current[i]=node;}} className="project-tab" role="tab" aria-selected={i===selected} aria-controls={`scene-${p.theme}`} tabIndex={i===selected?0:-1} onClick={()=>select(i)} onKeyDown={e=>{let next=i;if(['ArrowLeft','ArrowUp'].includes(e.key))next=(i+2)%3;else if(['ArrowRight','ArrowDown'].includes(e.key))next=(i+1)%3;else if(e.key==='Home')next=0;else if(e.key==='End')next=2;else return;e.preventDefault();select(next);tabs.current[next]?.focus();}}><span className={`project-thumb ${p.theme==='skiie'?'thumb-wide':''}`}><img src={media(p.screens[0].file)} alt="" width="32" height="43"/></span><span className="project-name">{p.name}<small>{p.kind}</small></span><Icon className="project-arrow"/></button>)}</div>
 </section><div className="hero-foot"><p>Actual interfaces. A closer look is one click away.</p><a href="#work">Keep looking <span aria-hidden="true">↓</span></a></div>{tourOpen && <Suspense fallback={null}><StudioTour onClose={() => setTourOpen(false)}/></Suspense>}</>;
}
