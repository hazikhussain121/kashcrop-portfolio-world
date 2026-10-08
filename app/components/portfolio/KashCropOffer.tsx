import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Link } from 'react-router';
import { media } from '~/data/portfolio/catalog';
import { packageComparison, offerScope } from '~/data/portfolio/offer';
import { Icon } from './Icon';
import { useMotion } from './MotionProvider';

function CloudIcon() {
  return <svg viewBox="0 0 32 32" aria-hidden="true" fill="none"><path d="M9 24H25a5 5 0 0 0 .4-10 9 9 0 0 0-17.3-2.6A6.4 6.4 0 0 0 9 24Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 18h8m-8 3h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>;
}

const packageChapters = [
  {name: 'Build', headline: 'Made for your world.', copy: 'Your workflow. Your interface. One connected product.', screen: 'garden-home.webp', alt: 'BaghBani home interface from the project review build'},
  {name: 'Launch', headline: 'Ready for the real world.', copy: 'Hosting, publishing and the details around going live.', screen: 'phc-home.webp', alt: 'Plant Health Clinic home interface from the project review build'},
  {name: 'Care', headline: 'A longer view.', copy: 'Maintenance options that can stay with you for up to four years.', screen: 'phc-guide.webp', alt: 'Plant Health Clinic guidance interface from the project review build'},
] as const;

export function OfferRibbon() {
  return <aside className="kc-offer-ribbon" aria-label="KashCrop project package">
    <div><span><Icon name="check" /> One-time project pricing</span><span><CloudIcon /> Server hosting</span><span><Icon name="mobile" /> Play Store management</span><span><Icon name="check" /> Care up to 4 years</span></div>
    <Link to="/services#compare">Explore the package <Icon name="right" /></Link>
  </aside>;
}

export function KashCropOffer() {
  const root = useRef<HTMLElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const {reduced} = useMotion();
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (reduced || !root.current) return;
    let cancelled = false, cleanup = () => {};
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{gsap}, {ScrollTrigger}]) => {
      if (cancelled || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        const mm = gsap.matchMedia();
        mm.add('(min-width: 900px) and (hover: hover) and (pointer: fine)', () => {
          gsap.timeline({scrollTrigger: {trigger: scene.current, start: 'top 90%', end: 'top 8%', scrub: .8}})
            .from('.kc-package-device', {y: 100, rotateX: 22, scale: .82, ease: 'power2.out'}, 0)
            .from('.kc-price', {x: 110, y: 45, opacity: .4, ease: 'power2.out'}, .04)
            .from('.kc-care', {x: -110, y: 45, opacity: .4, ease: 'power2.out'}, .04)
            .from('.kc-hosting', {x: 90, y: 90, rotate: -8, opacity: .3, ease: 'power2.out'}, .18)
            .from('.kc-publishing', {x: -90, y: 90, rotate: 8, opacity: .3, ease: 'power2.out'}, .18);
          gsap.to('.kc-stage-orbit', {rotate: 16, y: -30, ease: 'none', scrollTrigger: {trigger: scene.current, start: 'top bottom', end: 'bottom top', scrub: 1}});
        });
        return () => mm.revert();
      }, root);
      cleanup = () => context.revert();
    }).catch(() => {});
    return () => {cancelled = true; cleanup();};
  }, [reduced]);
  useEffect(() => {
    const element = scene.current;
    if (!element || reduced) return;
    const query = window.matchMedia('(min-width: 900px) and (hover: hover) and (pointer: fine)');
    let frame = 0, x = 0, y = 0;
    const move = (event: PointerEvent) => {
      if (!query.matches || event.pointerType === 'touch') return;
      const bounds = element.getBoundingClientRect();
      x = ((event.clientX - bounds.left) / bounds.width - .5) * 5;
      y = ((event.clientY - bounds.top) / bounds.height - .5) * -5;
      if (!frame) frame = requestAnimationFrame(() => {
        element.style.setProperty('--pointer-x', x.toFixed(2) + 'deg');
        element.style.setProperty('--pointer-y', y.toFixed(2) + 'deg');
        frame = 0;
      });
    };
    const reset = () => {cancelAnimationFrame(frame); frame = 0; element.style.removeProperty('--pointer-x'); element.style.removeProperty('--pointer-y');};
    element.addEventListener('pointermove', move);
    element.addEventListener('pointerleave', reset);
    query.addEventListener('change', reset);
    return () => {reset(); element.removeEventListener('pointermove', move); element.removeEventListener('pointerleave', reset); query.removeEventListener('change', reset);};
  }, [reduced]);

  function keydown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === 'ArrowRight') next = (index + 1) % packageChapters.length;
    else if (event.key === 'ArrowLeft') next = (index + packageChapters.length - 1) % packageChapters.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = packageChapters.length - 1;
    else return;
    event.preventDefault(); setActive(next); tabs.current[next]?.focus({preventScroll: true});
  }

  return <section className="kc-offer" id="difference" ref={root} aria-labelledby="kc-package-title">
    <div className="kc-package-stage" ref={scene} data-chapter={packageChapters[active].name.toLowerCase()}>
      <div className="kc-package-heading"><h2 id="kc-package-title">The complete package.</h2><p>Built for launch. Looked after for the long run.</p></div>
      <div className="kc-stage-orbit" aria-hidden="true"><i /><i /><i /></div>
      <div className="kc-package-composition">
        <div className="kc-price"><span className="kc-package-number" aria-hidden="true">1</span><p>One-time<br /><strong>project payment.</strong></p></div>
        <div className="kc-device-parallax"><div className="kc-package-device">
          <div className="kc-device-rim">
            {packageChapters.map((chapter, index) => <img key={chapter.name} src={media(chapter.screen)} alt={chapter.alt} width="390" height="844" loading="lazy" decoding="async" className={active === index ? 'is-active' : ''} aria-hidden={active !== index} />)}
          </div>
          <span className="kc-device-ground" aria-hidden="true" />
        </div></div>
        <div className="kc-care"><p className="kc-up-to">Up to</p><span className="kc-package-number">4</span><p><strong>years of</strong><br />maintenance options.</p></div>
        <div className="kc-package-chip kc-hosting"><CloudIcon /><div><strong>Hosting. Handled.</strong><span>Part of your agreed package.</span></div></div>
        <div className="kc-package-chip kc-publishing"><Icon name="mobile" /><div><strong>Your Play Store. Managed.</strong><span>Account setup and releases.</span></div></div>
      </div>
      <div className="kc-package-controls">
        <div className="kc-package-tabs" role="tablist" aria-label="Explore the project package">
          {packageChapters.map((chapter, index) => <button key={chapter.name} type="button" role="tab" id={'package-tab-' + index} aria-selected={active === index} aria-controls={'package-panel-' + index} tabIndex={active === index ? 0 : -1} ref={element => {tabs.current[index] = element;}} onClick={() => setActive(index)} onKeyDown={event => keydown(event, index)}>{chapter.name}</button>)}
        </div>
        <div className="kc-package-panels">
          {packageChapters.map((chapter, index) => <div key={chapter.name} id={'package-panel-' + index} role="tabpanel" aria-labelledby={'package-tab-' + index} tabIndex={0} hidden={active !== index}><h3>{chapter.headline}</h3><p>{chapter.copy}</p></div>)}
        </div>
      </div>
      <p className="kc-package-source">Actual project interfaces. Your package is scoped to your project.</p>
    </div>
    <OfferComparison />
  </section>;
}

export function OfferComparison({showClose = true}: {showClose?: boolean}) {
  return <section className="kc-comparison" id="compare" aria-labelledby="kc-compare-title">
    <div className="kc-comparison-heading"><h2 id="kc-compare-title">Compare the<br /><span>complete picture.</span></h2><div><p>Look beyond the build price. See who handles the launch, the hosting and the years that follow.</p><Link to="/contact" className="apple-text-link">Plan your project <Icon name="right" /></Link></div></div>
    <div className="kc-comparison-table-wrap">
      <table className="kc-comparison-table" role="table">
        <caption className="sr-only">Questions to ask when comparing project quotes, alongside the KashCrop offer</caption>
        <thead role="rowgroup"><tr role="row"><th scope="col" role="columnheader">What matters</th><th scope="col" role="columnheader">When comparing quotes</th><th scope="col" role="columnheader"><img src={media('kashcrop-logo.png')} width="25" height="29" alt="" /> With KashCrop</th></tr></thead>
        <tbody role="rowgroup">{packageComparison.map(row => <tr key={row.id} role="row"><th scope="row" role="rowheader">{row.feature}</th><td role="cell"><span className="kc-cell-label" aria-hidden="true">Ask other providers</span>{row.question}</td><td role="cell"><span className="kc-cell-label" aria-hidden="true">With KashCrop</span><div className="kc-commitment"><Icon name="check" /><strong>{row.answer}</strong></div><p>{row.detail}</p></td></tr>)}</tbody>
      </table>
    </div>
    <div className="kc-comparison-footnote"><p>Compare written scopes. Every provider’s offer is different.</p><details><summary>Package scope and terms <Icon name="down" /></summary><p>{offerScope}</p><p>Play Console is set up in the client’s name, with delegated access for management. <a href="https://support.google.com/googleplay/android-developer/answer/9844686?hl=en" target="_blank" rel="noopener noreferrer">Google account guidance <Icon name="arrow" /></a></p></details></div>
    {showClose && <div className="kc-offer-close"><p>Your idea deserves<br /><strong>a complete plan.</strong></p><Link to="/contact" className="button button-dark">Let’s build it <Icon name="right" /></Link><Link to="/services" className="apple-text-link">Explore our services <Icon name="right" /></Link></div>}
  </section>;
}
