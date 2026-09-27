import { useEffect, useRef, useState, type CSSProperties } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { getProject, media } from '~/data/portfolio/catalog';
import { GalleryLink } from '../UI';
import { Icon } from '../Icon';
import { useMotion } from '../MotionProvider';
import { RevealHeading } from './RevealHeading';

const choices = [
 { title: 'Orchard planning', description: 'Bring the next season into focus.', icon: 'layers' as const },
 { title: 'Expert consultation', description: 'A little clarity, when it matters.', icon: 'phone' as const },
];
const slots = ['Morning', 'Afternoon', 'Evening'];
/** An interactive design specimen. It cannot reserve a service or submit a client request. */
export function CraftPlayground() {
 const root = useRef<HTMLElement>(null), screen = useRef<HTMLDivElement>(null), summary = useRef<HTMLDivElement>(null);
 const { reduced } = useMotion();
 const [width, setWidth] = useState(390), [actualWidth, setActualWidth] = useState(390);
 const [density, setDensity] = useState<'roomy' | 'compact'>('roomy');
 const [choice, setChoice] = useState(0), [slot, setSlot] = useState(0), [previewed, setPreviewed] = useState(false);
 useEffect(() => {
  const node = screen.current; if (!node) return;
  const observer = new ResizeObserver(entries => setActualWidth(Math.round(entries[0]?.contentRect.width ?? width)));
  observer.observe(node); return () => observer.disconnect();
 }, []);
 useGSAP(() => { if (!reduced && summary.current) gsap.fromTo(summary.current, { y: 9, opacity: .6 }, { y: 0, opacity: 1, duration: .42, ease: 'power3.out', clearProps: 'transform,opacity' }); }, { scope: root, dependencies: [choice, slot, previewed, reduced], revertOnUpdate: true });
 function reset() { setWidth(390); setDensity('roomy'); setChoice(0); setSlot(0); setPreviewed(false); }
 return <section className="craft-playground section-wrap" ref={root} id="craft" aria-labelledby="craft-title">
  <div className="playground-heading"><div><p className="signature-eyebrow">The interaction studio</p><RevealHeading id="craft-title" text={'Don’t just look.\nTry the details.'}/></div><p>Change the canvas. Make a choice.<br/>Feel the interface respond.</p></div>
  <div className="playground-workbench">
   <aside className="playground-tools"><div className="tool-heading"><span className="signal-dot"/> Live interface study</div><h3>The small things<br/>are the experience.</h3><p>A responsive layout, clear feedback and a useful next step. This is real interface code, not a recording.</p>
    <fieldset className="study-controls"><legend>Canvas</legend><div className="study-segments"><button aria-pressed={width < 500} onClick={() => setWidth(390)}><Icon name="mobile"/>Phone</button><button aria-pressed={width >= 500} onClick={() => setWidth(650)}><Icon name="desktop"/>Wide</button></div><label htmlFor="study-width">Preview width <output>{actualWidth} px</output></label><input id="study-width" type="range" min="300" max="650" step="1" value={width} onChange={e => setWidth(Number(e.target.value))}/></fieldset>
    <fieldset className="study-controls"><legend>Spacing</legend><div className="study-segments"><button aria-pressed={density === 'roomy'} onClick={() => setDensity('roomy')}>Roomy</button><button aria-pressed={density === 'compact'} onClick={() => setDensity('compact')}>Compact</button></div></fieldset>
    <button className="study-reset" onClick={reset}>Reset the study <span aria-hidden="true">↺</span></button><div className="study-explainer"><span>Try this</span><p>Choose a service and a sample time, then preview the selection. Resize the canvas to see the layout adapt.</p></div>
    <GalleryLink project={getProject('baghban')!} className="underlined">See the actual Baghban screens <Icon/></GalleryLink>
   </aside>
   <div className="playground-stage" style={{ '--study-width': `${width}px` } as CSSProperties}><div className="study-ruler" aria-hidden="true"><span>300</span><i/><span>650</span></div><div className="study-screen" ref={screen} data-density={density}>
    <div className="study-shell"><header className="study-app-header"><span className="study-app-mark"><img src={media('kashcrop-logo.png')} alt="" width="22" height="22"/>Orchard studio</span><span className="study-badge">Interface study</span></header>
     <div className="study-welcome"><div><span>A little help for your orchard.</span><h4>What’s next<br/>looks good.</h4></div><img src={media('leaf.webp')} alt="" width="560" height="560"/></div>
     <div className="study-app-body"><div className="study-choices"><span className="study-section-label">Choose a service</span><div className="service-options" role="group" aria-label="Study service selection">{choices.map((item, i) => <button key={item.title} className="study-service-option" aria-pressed={choice === i} onClick={() => { setChoice(i); setPreviewed(false); }}><span className="study-option-icon"><Icon name={item.icon}/></span><span><strong>{item.title}</strong><small>{item.description}</small></span><span className="study-selected-icon" aria-hidden="true">{choice === i ? <Icon name="check"/> : <Icon name="right"/>}</span></button>)}</div>
      <span className="study-section-label">A sample time</span><div className="study-slot-options" role="group" aria-label="Sample time selection">{slots.map((item, i) => <button key={item} aria-pressed={slot === i} onClick={() => { setSlot(i); setPreviewed(false); }}>{item}</button>)}</div>
     </div><div className="study-summary" ref={summary} aria-live="polite"><span className="study-section-label">Your selection</span><div className="study-summary-content"><span className={`study-summary-symbol ${previewed ? 'is-done' : ''}`} aria-hidden="true"><Icon name={previewed ? 'check' : 'layers'}/></span><h5>{previewed ? 'That feels clear.' : choices[choice].title}</h5><p>{previewed ? 'Selection previewed. No appointment was created.' : `${slots[slot]} · A sample, not a live appointment`}</p><button className="study-confirm" onClick={() => setPreviewed(v => !v)}>{previewed ? 'Try another selection' : 'Preview selection'}<Icon name={previewed ? 'left' : 'right'}/></button></div></div></div>
     <footer className="study-app-footer"><span>Clear choices.</span><span>Considered feedback.</span></footer>
    </div></div><div className="study-stage-caption"><span>React + container queries</span><span>Keyboard and touch ready</span></div>
   </div>
  </div><p className="playground-disclosure">An illustrative interface study made for this portfolio. These controls do not request, reserve or purchase any service.</p>
 </section>;
}
