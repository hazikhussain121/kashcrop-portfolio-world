import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router';
import { company, getScreen, media, type Project } from '~/data/portfolio/catalog';
import { Icon } from './Icon';
import { useMotion } from './MotionProvider';

export default function ScreenViewer({project}:{project:Project}) {
 const dialog=useRef<HTMLDialogElement>(null),figure=useRef<HTMLElement>(null),image=useRef<HTMLImageElement>(null),shareInput=useRef<HTMLInputElement>(null);
 const [params,setParams]=useSearchParams(),navigate=useNavigate(),location=useLocation();
 const screen=getScreen(project,params.get('screen'))!,index=project.screens.indexOf(screen);
 const [zoom,setZoom]=useState(false),[error,setError]=useState(false),[share,setShare]=useState(false),[copied,setCopied]=useState(false),[retry,setRetry]=useState(0);
 const {reduced}=useMotion();const drag=useRef<{id:number;x:number;y:number;left:number;top:number;mode:'pan'|'swipe';moved:boolean}|null>(null);
 const origin=useRef({path:location.pathname,trigger:null as HTMLElement|null});
 useEffect(()=>{
  const node=dialog.current;if(!node)return;
  origin.current.trigger=document.activeElement instanceof HTMLElement?document.activeElement:null;
  node.showModal();document.body.classList.add('has-overlay');
  node.querySelector<HTMLButtonElement>('.viewer-close')?.focus({preventScroll:true});
  return ()=>{node.close();if(!document.querySelector('dialog[open]'))document.body.classList.remove('has-overlay');if(window.location.pathname===origin.current.path){const target=origin.current.trigger; if(target?.isConnected&&target!==document.body)target.focus({preventScroll:true});}};
 },[]);
 useEffect(()=>{setZoom(false);setError(false);setRetry(0);setShare(false);if(figure.current){figure.current.scrollTop=0;figure.current.scrollLeft=0;}const active=dialog.current?.querySelector<HTMLElement>(`[data-screen-id="${screen.id}"]`);active?.scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'});},[project.slug,screen.id]);
 useEffect(()=>{if(share){shareInput.current?.focus();shareInput.current?.select();}},[share]);
 useEffect(()=>{if(!copied)return;const t=setTimeout(()=>setCopied(false),2200);return ()=>clearTimeout(t);},[copied]);
 const close=()=>{
  if(location.state?.viewerOpened){navigate(-1);return;}
  const next=new URLSearchParams(params);next.delete('project');next.delete('screen');setParams(next,{replace:true,preventScrollReset:true});
 };
 const select=(nextIndex:number)=>{if(nextIndex<0||nextIndex>=project.screens.length)return;const next=new URLSearchParams(params);next.set('project',project.slug);next.set('screen',project.screens[nextIndex].id);setParams(next,{replace:true,preventScrollReset:true,state:location.state});};
 const toggleZoom=()=>{setZoom(v=>!v);if(figure.current){figure.current.scrollTop=0;figure.current.scrollLeft=0;}};
 function keydown(event:KeyboardEvent<HTMLDialogElement>) {
  if(event.key==='Tab'){
   const nodes=[...event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled),a[href],input:not(:disabled),summary,[tabindex="0"]')].filter(n=>n.getClientRects().length&&!n.closest('[hidden],[inert]'));
   if(!nodes.length)return;event.preventDefault();const i=nodes.indexOf(document.activeElement as HTMLElement);nodes[(i+(event.shiftKey?-1:1)+nodes.length)%nodes.length].focus();return;
  }
  if((event.target as HTMLElement).closest('input,textarea,select')||share||zoom)return;
  if(event.key==='ArrowRight'){event.preventDefault();select(index+1);}if(event.key==='ArrowLeft'){event.preventDefault();select(index-1);}
 }
 async function copy(){try{await navigator.clipboard.writeText(window.location.href);setCopied(true);}catch{setShare(true);}}
 function pointerDown(event:PointerEvent<HTMLElement>){
  if(event.button!==0||!figure.current)return;
  if(zoom&&event.pointerType==='mouse'){event.preventDefault();event.currentTarget.setPointerCapture(event.pointerId);drag.current={id:event.pointerId,x:event.clientX,y:event.clientY,left:figure.current.scrollLeft,top:figure.current.scrollTop,mode:'pan',moved:false};}
  else if(!zoom&&event.pointerType==='touch'){event.currentTarget.setPointerCapture(event.pointerId);drag.current={id:event.pointerId,x:event.clientX,y:event.clientY,left:0,top:0,mode:'swipe',moved:false};}
 }
 function pointerMove(event:PointerEvent<HTMLElement>){const d=drag.current;if(!d||d.id!==event.pointerId||d.mode!=='pan'||!figure.current)return;const dx=event.clientX-d.x,dy=event.clientY-d.y;d.moved=Math.hypot(dx,dy)>5;figure.current.scrollLeft=d.left-dx;figure.current.scrollTop=d.top-dy;}
 function pointerUp(event:PointerEvent<HTMLElement>){const d=drag.current;if(!d||d.id!==event.pointerId)return;drag.current=null;if(event.currentTarget.hasPointerCapture(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId);if(d.mode==='swipe'){const dx=event.clientX-d.x,dy=event.clientY-d.y;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.8)select(index+(dx<0?1:-1));}}
 const fullURL=typeof window==='undefined'?`${company.url}${location.pathname}${location.search}`:window.location.href;
 return <dialog className="project-viewer" id="project-viewer" ref={dialog} data-project={project.theme} data-motion={reduced?'off':'on'} aria-labelledby="viewer-title" aria-describedby="viewer-summary" onKeyDown={keydown} onCancel={e=>{e.preventDefault();if(share)setShare(false);else if(zoom)toggleZoom();else close();}} onClick={e=>{if(e.target!==e.currentTarget)return;const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close();}}>
 <div className="viewer-heading"><div className="viewer-heading-text"><p>{project.kind}</p><h2 id="viewer-title">{project.name}</h2></div><div className="viewer-heading-actions"><button className="icon-button viewer-share" onClick={copy} aria-label={copied?'Link copied':'Copy link to this screen'}><Icon name={copied?'check':'link'}/></button><button className="icon-button viewer-close" onClick={close} aria-label="Close project viewer"><Icon name="close"/></button></div></div>
 <div className="viewer-body"><aside className="viewer-sidebar"><p id="viewer-summary">{project.summary}</p><div className="viewer-project-meta">{project.scope.map(s=><span key={s}>{s}</span>)}</div><div className="viewer-screen-label"><span>Explore the screens</span><span>{index+1} / {project.screens.length}</span></div><div className="viewer-screen-list" role="group" aria-label="Select a project screen">{project.screens.map((s,i)=><button key={s.id} className="screen-choice" data-screen-id={s.id} aria-pressed={i===index} onClick={()=>select(i)}><img src={media(s.file)} alt="" width="24" height="36" loading="lazy"/><span>{s.name}<small>{s.kind} capture</small></span><Icon name="right"/></button>)}</div><Link className="underlined viewer-case-link" to={`/projects/${project.slug}`}>View the full project <Icon/></Link><details className="viewer-source" key={project.slug}><summary>About these images</summary><p>{project.source}</p><a href={media(screen.file)} target="_blank" rel="noopener noreferrer">Open original image ↗</a></details></aside>
 <div className="viewer-main"><div className="viewer-toolbar"><div className="viewer-screen-heading"><h3>{screen.name}</h3><p>{screen.kind} · {screen.width} × {screen.height} px</p></div><button className="zoom-button" aria-pressed={zoom} onClick={toggleZoom}><Icon name="expand"/><span>{zoom?'Fit to view':'Inspect at full size'}</span></button></div>
 <figure className={`viewer-figure ${zoom?'is-zoomed':''}`} ref={figure} data-layout={screen.height/screen.width>3?'read':'fit'} style={{'--capture-width':`${screen.width}px`,touchAction:zoom?'pan-x pan-y':'pan-y'} as React.CSSProperties} tabIndex={0} aria-label="Project image. Scroll to inspect the complete capture." onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={()=>{drag.current=null;}} onDoubleClick={toggleZoom}>
 <div className="viewer-image-wrap">{!error?<img key={`${screen.file}-${retry}`} ref={image} src={`${media(screen.file)}${retry?`?retry=${retry}`:''}`} alt={`${project.name}: ${screen.name}`} width={screen.width} height={screen.height} draggable={false} decoding="async" onError={()=>setError(true)}/>:<div className="image-error" role="alert"><p>This capture could not load. Your place in the project is saved.</p><button className="button button-outline" onClick={()=>{setError(false);setRetry(v=>v+1);}}>Try again</button><a href={media(screen.file)} target="_blank" rel="noopener noreferrer">Open original image ↗</a></div>}</div>
 </figure><div className="viewer-bottom"><p aria-live="polite">{screen.caption}</p><div className="viewer-pagination"><button className="icon-button" disabled={index===0} onClick={()=>select(index-1)} aria-label="Previous project screen"><Icon name="left"/></button><span>{index+1} / {project.screens.length}</span><button className="icon-button" disabled={index===project.screens.length-1} onClick={()=>select(index+1)} aria-label="Next project screen"><Icon name="right"/></button></div></div></div></div>
 <div className="viewer-disclosure">Actual interface captures · Not an embedded application.<span>← → Browse · Esc {zoom?'fit to view':'close'}</span></div>
 {share&&<div className="share-fallback"><label htmlFor="share-url">Copy this screen link</label><input id="share-url" ref={shareInput} readOnly value={fullURL}/><button onClick={()=>setShare(false)}>Done</button></div>}<span className="sr-only" role="status">{copied?'Screen link copied.':''}</span>
 </dialog>;
}
