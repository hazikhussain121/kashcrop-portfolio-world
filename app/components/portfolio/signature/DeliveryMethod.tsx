import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { featuredProjects } from '~/data/portfolio/catalog';
import { DeviceFrame } from '../UI';
import { Icon } from '../Icon';
import { useMotion } from '../MotionProvider';
import { RevealHeading } from './RevealHeading';

export const deliveryStages = [
 { title: 'Understand the work.', intro: 'Before the first screen.', body: 'Who needs to do what? Where does the current process lose people, context or time? The first useful artifact is a shared understanding of the problem.', outcomes: ['People and operating context', 'Constraints and priorities', 'A scope that can be discussed'] },
 { title: 'Make the thinking visible.', intro: 'Something you can react to.', body: 'A visual direction and an interactive path make decisions tangible. We refine what matters before multiplying the same decisions across a whole product.', outcomes: ['A clear visual direction', 'The important user journeys', 'Feedback against real interfaces'] },
 { title: 'Connect the whole system.', intro: 'The screen is not the finish line.', body: 'Content, access, data and operational states have to work together. Development includes the unglamorous states as well as the opening impression.', outcomes: ['Connected product workflows', 'Validation and recovery states', 'Responsive and keyboard testing'] },
 { title: 'Prepare it for real use.', intro: 'Ownership matters after launch.', body: 'A product needs a clear handover: what is delivered, who controls content and access, and what ongoing support includes. Those boundaries are agreed with the project.', outcomes: ['Deployment and ownership notes', 'Content and access handover', 'Agreed support responsibilities'] },
];
export function DeliveryMethod() {
 const root = useRef<HTMLElement>(null), stage = useRef<HTMLDivElement>(null);
 const [active, setActive] = useState(0); const { reduced } = useMotion();
 useEffect(() => {
  if (!root.current) return;
  const observer = new IntersectionObserver(entries => {
   const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
   if (visible[0]) setActive(Number((visible[0].target as HTMLElement).dataset.method));
  }, { rootMargin: '-20% 0px -35% 0px', threshold: [0, .2, .5] });
  root.current.querySelectorAll('[data-method]').forEach(node => observer.observe(node));
  return () => observer.disconnect();
 }, []);
 useGSAP(() => {
  if (reduced || !stage.current) return;
  gsap.fromTo(stage.current.querySelector('.method-art'), { y: 22, opacity: .6 }, { y: 0, opacity: 1, duration: .7, ease: 'power3.out', clearProps: 'transform,opacity' });
 }, { scope: stage, dependencies: [active, reduced], revertOnUpdate: true });
 return <section className="delivery-method section-wrap" ref={root} id="method" aria-labelledby="method-title"><div className="method-heading"><p className="signature-eyebrow">A typical engagement</p><RevealHeading id="method-title" text={'From the first question.\nThrough to the handover.'}/></div>
  <div className="method-mobile-tabs" role="group" aria-label="Preview a delivery stage">{['Brief','Design','Build','Handover'].map((name,i)=><button key={name} aria-pressed={active===i} onClick={()=>setActive(i)}><span>0{i+1}</span>{name}</button>)}</div><div className="method-layout"><div className="method-stories">{deliveryStages.map((item, i) => <article key={item.title} id={`method-${i}`} data-method={i} className={active === i ? 'is-active' : ''}><span className="method-number">0{i + 1}</span><div><p>{item.intro}</p><h3>{item.title}</h3><p>{item.body}</p><ul>{item.outcomes.map(outcome => <li key={outcome}>{outcome}</li>)}</ul></div></article>)}</div>
   <div className="method-stage" ref={stage} data-active={active}><div className="method-stage-top"><span>The studio method</span><span>0{active + 1} / 04</span></div><div className="method-art">
    {active === 0 && <div className="method-paper"><span>KashCrop / Working brief</span><h4>Start with<br/>the useful<br/><em>question.</em></h4><dl><dt>People</dt><dd>Who is doing the work?</dd><dt>Context</dt><dd>What gets in the way?</dd><dt>Outcome</dt><dd>What should become easier?</dd></dl><span className="method-paper-bottom">Clarity before complexity.</span></div>}
    {active === 1 && <div className="method-devices"><div><DeviceFrame screen={featuredProjects[0].screens[0]}/></div><div><DeviceFrame screen={featuredProjects[1].screens[0]}/></div></div>}
    {active === 2 && <div className="method-system"><span>Connected by design</span><div>Interface <Icon name="down"/></div><div>Workflow <Icon name="down"/></div><div>Records & media <Icon name="down"/></div><div>Delivery & access</div><p>Each layer supports the next.</p></div>}
    {active === 3 && <div className="method-handover"><span>Designed to be owned</span><h4>Ready for<br/>what comes<br/><em>next.</em></h4><div><span>01</span>Source & deployment notes</div><div><span>02</span>Content & access</div><div><span>03</span>Support boundaries</div><p>Scope and handover are agreed per project.</p></div>}
   </div><div className="method-stage-bottom">{active === 1 ? 'Actual interface captures from the portfolio.' : 'An illustration of the delivery process.'}</div></div>
  </div><div className="method-close"><p>A considered process. A concrete next step.</p><Link to="/contact" className="button button-dark">Tell us what you’re building <Icon/></Link></div>
 </section>;
}
