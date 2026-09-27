import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { getProject, media } from '~/data/portfolio/catalog';
import { DeviceFrame, GalleryLink } from '../UI';
import { Icon } from '../Icon';
import { useMotion } from '../MotionProvider';
import { RevealHeading } from './RevealHeading';

export const careSteps = [
 { name: 'Capture', title: 'Start with the grower.', text: 'Photographs, symptoms and voice notes bring the field into the case. Useful guidance helps people send useful information.', note: 'Farmer → Case', screen: 1 },
 { name: 'Context', title: 'Bring the knowledge closer.', text: 'The case is connected to relevant references. Context supports the draft instead of leaving the system to work from a picture alone.', note: 'Case → Relevant references', screen: 2 },
 { name: 'Draft', title: 'Assist. Don’t replace.', text: 'AI helps prepare the draft. Its place in the workflow is clear: it supports a specialist, not an unreviewed answer sent to a farmer.', note: 'Context → Working draft', screen: 0 },
 { name: 'Review', title: 'The expert makes the call.', text: 'A specialist reviews, corrects and sends the advisory. The human decision remains part of the product—not a footnote beneath it.', note: 'Expert → Advisory', screen: 0 },
] as const;
export function CareJourney({ compact = false }: { compact?: boolean }) {
 const root = useRef<HTMLElement>(null), visual = useRef<HTMLDivElement>(null);
 const [step, setStep] = useState(0), [playing, setPlaying] = useState(false), [visible, setVisible] = useState(false);
 const { reduced } = useMotion(); const project = getProject('plant-health-clinic')!;
 useEffect(() => {
  const observer = new IntersectionObserver(entries => setVisible(entries.some(e => e.isIntersecting)), { threshold: .1 });
  if (root.current) observer.observe(root.current); return () => observer.disconnect();
 }, []);
 useEffect(() => { if (reduced || !visible) setPlaying(false); }, [reduced, visible]);
 useEffect(() => {
  const pause = () => { if (document.hidden) setPlaying(false); }; document.addEventListener('visibilitychange', pause);
  return () => document.removeEventListener('visibilitychange', pause);
 }, []);
 useEffect(() => {
  if (!playing || reduced) return;
  const timeout = setTimeout(() => { if (step < 3) setStep(v => v + 1); else setPlaying(false); }, 2800);
  return () => clearTimeout(timeout);
 }, [playing, step, reduced]);
 useGSAP(() => {
  if (!visual.current || reduced) return;
  const target = visual.current.querySelector(step === 0 ? '.care-phone' : step === 1 ? '.context-cluster' : step === 2 ? '.draft-sheet' : '.expert-seal');
  gsap.fromTo(target, { y: 20, opacity: .55 }, { y: 0, opacity: 1, duration: .65, ease: 'power3.out', clearProps: 'transform,opacity' });
 }, { scope: visual, dependencies: [step, reduced], revertOnUpdate: true });
 return <section className={`care-journey section-wrap ${compact ? 'care-compact' : ''}`} ref={root} id={compact ? 'project-workflow' : 'care-story'} aria-labelledby={compact ? 'project-care-title' : 'care-title'}>
  <div className="care-heading"><div><p className="signature-eyebrow">Plant Health Clinic / The human loop</p><RevealHeading id={compact ? 'project-care-title' : 'care-title'} text={'Intelligence in the loop.\nPeople at the centre.'}/></div><p>Not AI as a separate feature.<br/>AI shaped around a real workflow.</p></div>
  <div className="care-body"><div className="care-visual" ref={visual} data-step={step}>
   <div className="care-grid" aria-hidden="true"/><span className="care-background-word" aria-hidden="true">care.</span><div className="care-visual-top"><span>Field / Knowledge / Expertise</span><span className="care-dot"/>Connected by design</div>
   <svg className="care-connector" viewBox="0 0 800 520" preserveAspectRatio="none" aria-hidden="true"><path d="M235 300 C340 300 310 140 440 140 S500 360 650 300"/><path className="care-signal-path" d="M235 300 C340 300 310 140 440 140 S500 360 650 300" pathLength="1"/></svg>
   <div className="care-phone"><DeviceFrame screen={project.screens[careSteps[step].screen]}/></div>
   <div className="context-cluster" aria-hidden="true"><div className="context-ticket context-photo"><span>01 / Case evidence</span><strong>Photos & symptoms</strong><div className="evidence-thumbs"><img src={media('leaf.webp')} alt=""/><i/><i/></div></div><div className="context-ticket context-reference"><span>02 / Knowledge</span><strong>Relevant references</strong><p>Selected knowledge<br/>Case context<br/>Supporting passages</p><i className="ticket-rule"/></div></div>
   <div className="draft-sheet" aria-hidden="true"><span className="draft-status">Working draft</span><strong>Ready for<br/>a closer look.</strong><div className="draft-lines"><i/><i/><i/></div><p>Findings to review<br/>Questions to verify<br/>Supporting references</p><div className="draft-bottom">AI assists <span>Expert reviews ↗</span></div></div>
   <div className="expert-seal" aria-hidden="true"><div className="seal-rings"><Icon name="check"/></div><strong>Human judgement.<br/>Built in.</strong><span>The specialist decides.</span></div>
   <div className="care-visual-bottom"><span>Workflow illustration · No live diagnosis</span><GalleryLink project={project} screen={project.screens[careSteps[step].screen]}>Inspect the farmer interface <Icon/></GalleryLink></div>
  </div><div className="care-narrative"><span className="care-progress-number" aria-hidden="true">0{step + 1}<small>/ 04</small></span><div aria-live={playing ? 'off' : 'polite'}><span className="care-path-note">{careSteps[step].note}</span><h3>{careSteps[step].title}</h3><p>{careSteps[step].text}</p></div><button className="care-play" disabled={reduced} onClick={() => { if (step === 3) setStep(0); setPlaying(v => !v); }} aria-label={playing ? 'Pause workflow sequence' : 'Play workflow sequence'}>{reduced ? 'Choose a step below' : playing ? 'Pause the sequence' : 'Follow the sequence'}<span aria-hidden="true">{playing ? 'Ⅱ' : '▷'}</span></button><Link to="/projects/plant-health-clinic" className="underlined">Explore the full project <Icon/></Link></div></div>
  <ol className="care-step-list">{careSteps.map((item, i) => <li key={item.name}><button onClick={() => { setPlaying(false); setStep(i); }} aria-current={step === i ? 'step' : undefined} aria-label={`Step ${i + 1}: ${item.name}`}><span className="care-step-number">0{i + 1}</span><strong>{item.name}</strong><span className="care-step-mark" aria-hidden="true">↗</span></button></li>)}</ol>
 </section>;
}
