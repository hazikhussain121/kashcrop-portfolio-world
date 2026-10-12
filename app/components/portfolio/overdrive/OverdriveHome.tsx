import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { media, getProject } from '~/data/portfolio/catalog';
import { serviceCatalog } from '~/data/portfolio/services';
import { Icon } from '../Icon';
import { useMotion } from '../MotionProvider';
import ProjectReel from './ProjectReel';

export default function OverdriveHome() {
  const root = useRef<HTMLElement>(null);
  const { reduced } = useMotion();
  useEffect(() => {
    if (reduced || !root.current) return;
    let cancelled = false; let cleanup = () => {};
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        gsap.fromTo('.od-hero-title > span', { y: 32 }, { y: 0, duration: 1.2, stagger: .1, ease: 'power4.out', clearProps: 'transform' });
        const mm = gsap.matchMedia();
        mm.add('(min-width: 900px)', () => {
          gsap.utils.toArray<HTMLElement>('.od-feature-image .od-product-phone').forEach(element => { gsap.fromTo(element, { y: 22 }, { y: -28, ease: 'none', scrollTrigger: { trigger: element.closest('.od-feature'), start: 'top bottom', end: 'bottom top', scrub: .7 } }); });
        });
        return () => mm.revert();
      }, root.current);
      cleanup = () => context.revert();
    }).catch(() => {});
    return () => { cancelled = true; cleanup(); };
  }, [reduced]);
  const garden = getProject('baghban')!, clinic = getProject('plant-health-clinic')!;
  return <main id="main" className="od-home" ref={root}>
    <section className="od-hero od-wrap" aria-labelledby="od-hero-title">
      <div className="od-hero-layout"><div className="od-hero-copy">
        <h1 className="od-hero-title" id="od-hero-title"><span>Bright ideas.</span><span>Real things.</span></h1>
        <p>Product design, engineering and applied AI.<br className="od-desktop-break" /> We give ambitious ideas a life beyond the drawing board.</p>
        <a href="#selected-work" className="od-text-link">Explore the work <Icon name="down" /></a>
      </div><div className="od-hero-gallery"><ProjectReel /></div></div>
      <div className="od-masthead" aria-hidden="true">KASHCROP</div>
    </section>
    <section className="od-selected od-wrap" id="selected-work" aria-labelledby="od-selected-title">
      <div className="od-section-heading"><h2 id="od-selected-title">Made for real life.</h2><Link to="/projects" className="od-text-link">All projects <Icon /></Link></div>
      <div className="od-feature-grid">
        <article className="od-feature od-feature-garden"><Link to="/projects/baghban" className="od-feature-image od-image-garden" aria-label="Explore BaghBani orchard platform">
          <span className="od-media-word" aria-hidden="true">grow<br />together.</span>
          <div className="od-product-phone od-garden-phone"><img src={media('garden-home.webp')} alt="BaghBani's implemented farmer home screen" width={390} height={844} loading="lazy" decoding="async" /></div>
          <div className="od-product-phone od-garden-phone-back" aria-hidden="true"><img src={media('garden-calendar.webp')} alt="" width={390} height={1607} loading="lazy" decoding="async" /></div><span className="od-media-open"><Icon /></span>
        </Link><div className="od-feature-caption"><div><h3><Link to="/projects/baghban">{garden.name}</Link></h3><p>A connected home for orchard growers.</p></div><span>Product platform</span></div></article>
        <article className="od-feature od-feature-clinic"><Link to="/projects/plant-health-clinic" className="od-feature-image od-image-clinic" aria-label="Explore Plant Health Clinic">
          <span className="od-media-word" aria-hidden="true">care,<br />closer.</span><div className="od-product-phone od-clinic-phone"><img src={media('phc-home.webp')} alt="Plant Health Clinic's implemented farmer app" width={390} height={844} loading="lazy" decoding="async" /></div><span className="od-media-open"><Icon /></span>
        </Link><div className="od-feature-caption"><div><h3><Link to="/projects/plant-health-clinic">{clinic.name}</Link></h3><p>Connecting the field with expert care.</p></div><span>Applied AI</span></div></article>
        <article className="od-feature od-feature-skiie"><Link to="/projects/skiie" className="od-feature-image od-image-skiie" aria-label="Explore the SKIIE website and content platform">
          <div className="od-skiie-art-title"><span>Ideas need<br />a place<br />to start.</span><img src={media('skiie-logo.png')} alt="" width={90} height={90} loading="lazy" /></div><div className="od-skiie-browser"><img src={media('skiie.webp')} alt="SKIIE public homepage captured in September 2026" width={1440} height={960} loading="lazy" decoding="async" /></div><span className="od-media-open"><Icon /></span>
        </Link><div className="od-feature-caption"><div><h3><Link to="/projects/skiie">SKIIE</Link></h3><p>A home for the next generation of ideas.</p></div><span>Website & content system</span></div></article>
      </div>
    </section>
    <section className="od-capabilities od-wrap" aria-labelledby="od-capabilities-title">
      <div className="od-capabilities-intro"><h2 id="od-capabilities-title">From the first<br /><span>“what if?”</span></h2><p>One studio for the thinking, the making,<br className="od-desktop-break" /> and everything that keeps it working.</p></div>
      <div className="od-capability-accordion">{serviceCatalog.map((service, index) => <details key={service.slug} name="home-services" open={index === 0}><summary>{service.name}<Icon name="down" /></summary><div><p>{service.description}</p><Link to={'/services/' + service.slug} className="od-text-link">Explore this service <Icon /></Link></div></details>)}</div>
    </section>
    <section className="od-commitment od-wrap" aria-labelledby="od-commitment-title"><div className="od-commitment-sheet">
      <h2 id="od-commitment-title">Good after hello.<br /><span>Great after launch.</span></h2><div className="od-commitment-bottom"><p>A clear project price. Hosting and publishing support. Maintenance options up to four years.</p><Link to="/services#compare" className="od-button od-button-blue">See the whole package <Icon /></Link></div><p className="od-commitment-note">Scope, support, hosting term and third-party charges are agreed in your quote.</p>
    </div></section>
    <section className="od-home-studio od-wrap" aria-labelledby="od-studio-title"><div className="od-studio-name"><h2 id="od-studio-title">Rooted here.<br />Reaching further.</h2></div><div className="od-studio-intro"><p>Led by Hazik Hussain, KashCrop brings design and engineering together in Kashmir. Close to the people. Close to the problem.</p><Link to="/about" className="od-text-link">Meet the studio <Icon /></Link><p className="od-incubation-line">Incubated at SKIIE, SKUAST-Kashmir.</p></div></section>
  </main>;
}
