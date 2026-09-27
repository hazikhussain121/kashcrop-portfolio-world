import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { featuredProjects, media } from '~/data/portfolio/catalog';
import { BrowserFrame, DeviceFrame } from '../UI';
import { Icon } from '../Icon';
import { useMotion } from '../MotionProvider';

const scenes = [
 { word: 'Grow.', line: 'An orchard, brought together.', detail: 'Services. Seasonal guidance. A clearer next step.', theme: 'garden' },
 { word: 'Care.', line: 'Expertise, a little closer.', detail: 'From a grower’s question to an expert-reviewed advisory.', theme: 'phc' },
 { word: 'Connect.', line: 'A home for what’s next.', detail: 'Startups, programmes and the people behind them.', theme: 'skiie' },
];
const DURATION = 6000;
/** A guided screen presentation, not fabricated footage or an embedded client application. */
export default function StudioTour({ onClose }: { onClose: () => void }) {
 const dialog = useRef<HTMLDialogElement>(null), art = useRef<HTMLDivElement>(null);
 const progress = useRef<HTMLProgressElement>(null), elapsed = useRef(0);
 const { reduced } = useMotion();
 const [index, setIndex] = useState(0), [playing, setPlaying] = useState(!reduced);
 const project = featuredProjects[index], scene = scenes[index];
 useEffect(() => {
  const node = dialog.current!, origin = document.activeElement as HTMLElement | null;
  node.showModal(); document.body.classList.add('has-overlay');
  const onVisibility = () => { if (document.hidden) setPlaying(false); };
  document.addEventListener('visibilitychange', onVisibility);
  return () => {
   document.removeEventListener('visibilitychange', onVisibility); node.close();
   document.body.classList.toggle('has-overlay', !!document.querySelector('dialog[open]'));
   origin?.isConnected && origin.focus({ preventScroll: true });
  };
 }, []);
 useEffect(() => { if (reduced) setPlaying(false); }, [reduced]);
 useEffect(() => {
  if (!playing || reduced) return;
  let frame = 0, previous = performance.now();
  const tick = (time: number) => {
   elapsed.current += Math.min(time - previous, 80); previous = time;
   if (progress.current) progress.current.value = Math.min(1, elapsed.current / DURATION);
   if (elapsed.current >= DURATION) {
    if (index < 2) { elapsed.current = 0; setIndex(index + 1); }
    else setPlaying(false);
    return;
   }
   frame = requestAnimationFrame(tick);
  };
  frame = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(frame);
 }, [playing, index, reduced]);
 useGSAP(() => {
  if (reduced || !art.current) return;
  const timeline = gsap.timeline();
  timeline.fromTo(art.current.querySelectorAll('.tour-device,.tour-browser'), { y: 45, scale: .9, opacity: .25 }, { y: 0, scale: 1, opacity: 1, duration: 1.15, stagger: .12, ease: 'power3.out', clearProps: 'transform,opacity' })
   .fromTo(art.current.querySelector('.tour-word'), { y: 20, opacity: .5 }, { y: 0, opacity: 1, duration: .8, ease: 'power3.out', clearProps: 'transform,opacity' }, .12);
 }, { scope: art, dependencies: [index, reduced], revertOnUpdate: true });
 function go(next: number) {
  elapsed.current = 0; if (progress.current) progress.current.value = 0;
  setIndex(Math.max(0, Math.min(2, next)));
 }
 function toggle() {
  if (index === 2 && elapsed.current >= DURATION) { go(0); setPlaying(true); }
  else setPlaying(v => !v);
 }
 return <dialog ref={dialog} className="studio-tour" aria-labelledby="tour-heading" onCancel={e => { e.preventDefault(); onClose(); }} onKeyDown={e => {
  if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1); }
  if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1); }
  if (e.key === 'Tab') {
   const items = [...dialog.current!.querySelectorAll<HTMLElement>('button:not(:disabled),a[href]')].filter(n => n.getClientRects().length);
   if (e.shiftKey && document.activeElement === items[0]) { e.preventDefault(); items.at(-1)?.focus(); }
   else if (!e.shiftKey && document.activeElement === items.at(-1)) { e.preventDefault(); items[0]?.focus(); }
  }
 }}>
  <header className="tour-header"><div><span className="tour-brand">kashcrop</span><p id="tour-heading">The work, in focus.</p></div><button className="tour-close icon-button" onClick={onClose} autoFocus aria-label="Close studio tour"><Icon name="close"/></button></header>
  <div className="tour-scene" ref={art} data-scene={scene.theme}>
   <span className="tour-word" aria-hidden="true">{scene.word}</span><div className="tour-ground" aria-hidden="true"/>
   {project.theme === 'skiie' ? <BrowserFrame className="tour-browser" screen={project.screens[0]} address="skiie.co.in"/> : <>
    <div className="tour-device tour-secondary"><DeviceFrame screen={project.screens[1]}/></div>
    <div className="tour-device tour-primary"><DeviceFrame screen={project.screens[0]}/></div>
    {project.theme === 'phc' && <img className="tour-leaf" src={media('leaf.webp')} alt=""/>}
   </>}
   <div className="tour-description" aria-live={playing ? 'off' : 'polite'}><span>{project.name}</span><h2>{scene.line}</h2><p>{scene.detail}</p></div>
   <Link className="tour-project" to={`/projects/${project.slug}`} onClick={onClose}>Explore this project <Icon/></Link>
  </div>
  <div className="tour-controls"><div className="tour-steps" role="group" aria-label="Tour projects">{featuredProjects.map((p, i) => <button key={p.slug} onClick={() => go(i)} aria-pressed={index === i}><span>{String(i + 1).padStart(2, '0')}</span>{p.name}</button>)}</div><button className="tour-play" onClick={toggle} disabled={reduced} aria-label={playing ? 'Pause tour' : 'Play tour'}>{reduced ? 'Motion off' : playing ? 'Pause' : index === 2 && elapsed.current >= DURATION ? 'Replay' : 'Play'}<span aria-hidden="true">{playing ? 'Ⅱ' : '▷'}</span></button></div>
  <progress ref={progress} className="tour-progress" max="1" defaultValue="0" aria-label="Current scene progress"/>
  <p className="tour-source">A guided presentation of actual interface captures. No audio. Not an embedded application.</p>
 </dialog>;
}
