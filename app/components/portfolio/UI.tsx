import { Link, useLocation, useNavigate, type LinkProps } from 'react-router';
import type { CSSProperties, ReactNode } from 'react';
import { media, type Screen, type Project } from '~/data/portfolio/catalog';
import { Icon } from './Icon';
import { projectFilms } from '~/data/portfolio/films';
import { InterfaceFilm } from './InterfaceFilm';

export function DeviceFrame({screen,className='',priority=false}:{screen:Screen;className?:string;priority?:boolean}) {
 return <div className={`device-frame ${className}`}><div className="device-screen"><img src={media(screen.file)} alt={screen.name} width={screen.width} height={screen.height} loading={priority?'eager':'lazy'} fetchPriority={priority?'high':undefined} decoding="async"/></div></div>;
}
export function BrowserFrame({screen,className='',address=''}:{screen:Screen;className?:string;address?:string}) {
 return <div className={`site-window ${className}`}><div className="window-bar" aria-hidden="true"><span className="window-dots"><i/><i/><i/></span><span className="window-address">{address}</span><span className="window-badge">↗</span></div><div className="window-screen"><img src={media(screen.file)} alt={screen.name} width={screen.width} height={screen.height} loading="lazy" decoding="async"/></div></div>;
}
/** Ordinary project URLs remain useful without JS; primary clicks enhance them into an in-place viewer. */
export function GalleryLink({project,screen,className='',children, ...props}:Omit<LinkProps,'to'>&{project:Project;screen?:Screen;children:ReactNode}) {
 const location=useLocation(),navigate=useNavigate(),selected=screen??project.screens[0];
 return <Link {...props} className={className} to={`/projects/${project.slug}${selected?`#screen-${selected.id}`:''}`} onClick={event=>{
  props.onClick?.(event);
  if(event.defaultPrevented||!selected||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  event.preventDefault();const params=new URLSearchParams(location.search);params.set('project',project.slug);params.set('screen',selected.id);
  navigate({pathname:location.pathname,search:params.toString(),hash:location.hash},{preventScrollReset:true,state:{viewerOpened:true,returnTo:location.pathname+location.search+location.hash}});
 }}>{children}</Link>;
}
export function SectionHeading({title,children}:{title:ReactNode;children?:ReactNode}) {return <div className="section-heading"><h2>{title}</h2>{children&&<p>{children}</p>}</div>;}
export function Breadcrumbs({items}:{items:{label:string;to?:string}[]}) {return <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link>{items.map((item,i)=><span key={i}><span aria-hidden="true">/</span>{item.to?<Link to={item.to}>{item.label}</Link>:<span aria-current="page">{item.label}</span>}</span>)}</nav>;}
export function PageIntro({eyebrow,title,description,children}:{eyebrow?:string;title:ReactNode;description?:string;children?:ReactNode}) {return <header className="page-intro section-wrap">{eyebrow&&<p className="section-note">{eyebrow}</p>}<div className="page-intro-row"><h1>{title}</h1><div>{description&&<p>{description}</p>}{children}</div></div></header>;}
export function SystemMap({project,compact=false}:{project:Project;compact?:boolean}) {
 const steps=project.workflow?.steps.slice(0,4)??project.features.slice(0,4);
 return <div className={`system-map ${compact?'is-compact':''}`} data-theme={project.theme} aria-label={`${project.name} workflow`}>
 <div className="system-map-grid" aria-hidden="true"/><div className="system-map-heading"><span className="signal-dot"/>{project.name}<small>System overview</small></div>
 <ol>{steps.map((step,i)=><li key={step} style={{'--step':i} as CSSProperties}><span className="system-step-number">{String(i+1).padStart(2,'0')}</span><span>{step}</span>{i<steps.length-1&&<Icon name="down"/>}</li>)}</ol>
 </div>;
}
export function ProjectArtwork({project,className='',interactive=true,useFilm=true}:{project:Project;className?:string;interactive?:boolean;useFilm?:boolean}) {
 const first=project.screens[0],second=project.screens[1],film=useFilm?projectFilms[project.slug]:undefined;
 if(film)return <div className={`project-artwork project-artwork-film ${className}`} data-theme={project.theme}><InterfaceFilm film={film}/>{interactive&&first&&<GalleryLink project={project} className="film-screen-link" aria-label={`Inspect ${project.name} screens`}>Inspect screens <Icon name="expand"/></GalleryLink>}</div>;
 const content=first ? project.theme==='skiie'||first.kind==='Desktop'?<BrowserFrame screen={first} address={project.theme==='skiie'?'skiie.co.in':project.name}/>:<><div className="artwork-orbit" aria-hidden="true"/>{project.theme==='phc'&&<img className="artwork-leaf" src={media('leaf.webp')} alt="" loading="lazy"/>}<div className="artwork-phone one"><DeviceFrame screen={first}/></div>{second&&<div className="artwork-phone two"><DeviceFrame screen={second}/></div>}</>:<SystemMap project={project} compact/>;
 return <div className={`project-artwork ${className}`} data-theme={project.theme}>{content}{interactive&&first&&<GalleryLink project={project} className="round-open icon-button" aria-label={`Inspect ${project.name} screens`}><Icon/></GalleryLink>}</div>;
}
