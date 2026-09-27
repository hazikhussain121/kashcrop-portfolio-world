import { Component, Suspense, lazy, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { Link } from 'react-router';
import { media } from '~/data/portfolio/catalog';
import { useMotion } from '../MotionProvider';
import { Icon } from '../Icon';
import { RevealHeading } from './RevealHeading';

const AnatomyCanvas = lazy(() => import('./AnatomyCanvas'));
export const productLayers = [
 { name: 'Interface', short: 'What people touch.', description: 'A service makes sense before a form asks for commitment. Clear choices, a useful hierarchy and a considered mobile experience.', detail: 'Actual Baghban farmer interface', code: 'Experience / React', color: '#dff2e8' },
 { name: 'Workflow', short: 'What happens next.', description: 'Requests, reviews and follow-ups connect. The next step belongs to the right person, with the context they need to act.', detail: 'Illustrated request and review flow', code: 'Logic / TypeScript', color: '#ff858b' },
 { name: 'Data', short: 'What the system remembers.', description: 'Structured records and media stay connected to the work. The interface is only useful when its information remains understandable.', detail: 'Illustrated records and media layer', code: 'Records / D1 + R2', color: '#dbbce0' },
 { name: 'Infrastructure', short: 'What holds it together.', description: 'Delivery, access and operational boundaries are part of the product—not something added after the screens are finished.', detail: 'Illustrated application foundation', code: 'Delivery / Cloudflare', color: '#bfcde4' },
] as const;
class CanvasBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
 state = { failed: false };
 static getDerivedStateFromError() { return { failed: true }; }
 render() { return this.state.failed ? null : this.props.children; }
}
function LayerPoster({ selected, spread }: { selected: number; spread: number }) {
 return <div className="anatomy-poster" style={{ '--separation': spread } as CSSProperties} aria-hidden="true">
  {[3, 2, 1].map(i => <div key={i} className={`poster-layer layer-${i} ${selected === i ? 'is-selected' : ''}`}><span>{productLayers[i].name}</span><div className="poster-circuit"/></div>)}
  <div className={`poster-layer layer-0 ${selected === 0 ? 'is-selected' : ''}`}><img src={media('garden-home.webp')} alt="" width="390" height="844"/></div>
 </div>;
}
export function ProductAnatomy() {
 const section = useRef<HTMLElement>(null), tabs = useRef<Array<HTMLButtonElement | null>>([]);
 const [near, setNear] = useState(false), [selected, setSelected] = useState(0), [spread, setSpread] = useState(.64);
 const [ready, setReady] = useState(false), [failed, setFailed] = useState(false);
 const { reduced } = useMotion();
 useEffect(() => {
  const node = section.current;
  if (!node || !('IntersectionObserver' in window)) { setNear(true); return; }
  const observer = new IntersectionObserver(entries => { if (entries.some(e => e.isIntersecting)) { setNear(true); observer.disconnect(); } }, { rootMargin: '350px' });
  observer.observe(node); return () => observer.disconnect();
 }, []);
 const showCanvas = near && !reduced && !failed;
 return <section ref={section} className="anatomy-section" id="anatomy" aria-labelledby="anatomy-title">
  <div className="anatomy-top"><span className="anatomy-kicker"><span aria-hidden="true">✳</span> Beyond the pixels</span><span className="anatomy-edition">A KashCrop system study</span></div>
  <div className="anatomy-layout">
   <div className="anatomy-copy"><RevealHeading id="anatomy-title" text={'Beauty is the surface.\nThe thinking goes deeper.'}/><p className="anatomy-intro">A useful product is more than a beautiful screen. Take it apart.</p>
    <div className="layer-detail" role="tabpanel" id="anatomy-detail" aria-labelledby={`layer-tab-${selected}`} tabIndex={0} style={{ '--layer-color': productLayers[selected].color } as CSSProperties}>
     <span className="layer-detail-number">{String(selected + 1).padStart(2, '0')} <i/> {productLayers[selected].name}</span><h3>{productLayers[selected].short}</h3><p>{productLayers[selected].description}</p><span className="layer-code">{productLayers[selected].code}</span>
    </div>
    <Link to="/projects/baghban" className="anatomy-link">See the product behind the study <Icon/></Link>
   </div>
   <div className="anatomy-display"><div className="anatomy-crosshair top" aria-hidden="true"/><div className="anatomy-crosshair bottom" aria-hidden="true"/>
    <div className="anatomy-visual" role="img" data-renderer={showCanvas && ready ? 'webgl' : 'poster'} aria-label="An exploded, layered model of a digital product"><LayerPoster selected={selected} spread={spread}/>
     {showCanvas && <CanvasBoundary><Suspense fallback={null}><AnatomyCanvas selected={selected} spread={spread} onReady={() => setReady(true)} onFailure={() => setFailed(true)}/></Suspense></CanvasBoundary>}
    </div>
    <div className="anatomy-visual-note"><span>{showCanvas && ready ? 'Rendered in real time' : 'Layered product view'}</span><span>Actual interface · Illustrated internals</span></div>
    <div className="separation-control"><label htmlFor="layer-separation">Separate the layers <span>{Math.round(spread * 100)}%</span></label><input id="layer-separation" type="range" min="0" max="100" step="1" value={Math.round(spread * 100)} onChange={e => setSpread(Number(e.target.value) / 100)} aria-valuetext={`${Math.round(spread * 100)} percent separation`}/><div aria-hidden="true"><span>Assembled</span><span>Exploded</span></div></div>
   </div>
  </div>
  <div className="layer-tabs" role="tablist" aria-label="Explore the product layers">{productLayers.map((layer, i) => <button key={layer.name} id={`layer-tab-${i}`} ref={node => { tabs.current[i] = node; }} role="tab" aria-controls="anatomy-detail" aria-selected={i === selected} tabIndex={i === selected ? 0 : -1} onClick={() => setSelected(i)} onKeyDown={e => {
   let next = i; if (e.key === 'ArrowRight') next = (i + 1) % 4; else if (e.key === 'ArrowLeft') next = (i + 3) % 4; else if (e.key === 'Home') next = 0; else if (e.key === 'End') next = 3; else return;
   e.preventDefault(); setSelected(next); tabs.current[next]?.focus();
  }} style={{ '--layer-color': layer.color } as CSSProperties}><span className="layer-tab-icon" aria-hidden="true"><i/><i/><i/></span><span>{layer.name}<small>{layer.short}</small></span><span className="layer-tab-index">0{i + 1}</span></button>)}</div>
 </section>;
}
