import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { media, getProject } from '~/data/portfolio/catalog';
import { projectFilms } from '~/data/portfolio/films';
import { serviceCatalog } from '~/data/portfolio/services';
import { deliverySteps, homeCaseExcerpts, projectQuestions } from '~/data/portfolio/studioContent';
import { Icon } from '../Icon';
import { useMotion } from '../MotionProvider';
import ProjectReel from './ProjectReel';
import { PackageComparison } from './PackageComparison';
import '~/styles/portfolio/overdrive-content.css';

function CaseCaption({ slug, discipline }: { slug: string; discipline: string }) {
  const project = getProject(slug)!;
  return <div className="od-feature-caption">
    <div className="od-feature-meta"><p className="od-feature-type">{discipline}</p><h3><Link to={'/projects/' + slug}>{project.name}</Link></h3></div>
    <div className="od-feature-story"><p className="od-feature-summary">{homeCaseExcerpts[slug]}</p><Link to={'/projects/' + slug} className="od-text-link od-case-link" aria-label={'Read ' + project.name + ' case study'}>Read case study <Icon /></Link></div>
  </div>;
}

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
        </Link><CaseCaption slug="baghban" discipline="Product platform" /></article>
        <article className="od-feature od-feature-clinic"><Link to="/projects/plant-health-clinic" className="od-feature-image od-image-clinic" aria-label="Explore Plant Health Clinic">
          <span className="od-media-word" aria-hidden="true">care,<br />closer.</span><div className="od-product-phone od-clinic-phone"><img src={media('phc-home.webp')} alt="Plant Health Clinic's implemented farmer app" width={390} height={844} loading="lazy" decoding="async" /></div><span className="od-media-open"><Icon /></span>
        </Link><CaseCaption slug="plant-health-clinic" discipline="Applied AI & expert workflow" /></article>
        <article className="od-feature od-feature-skiie"><Link to="/projects/skiie" className="od-feature-image od-image-skiie" aria-label="Explore the SKIIE website and content platform">
          <div className="od-skiie-art-title"><span>Ideas need<br />a place<br />to start.</span><img src={media('skiie-logo.png')} alt="" width={90} height={90} loading="lazy" /></div><div className="od-skiie-browser"><img src={media('skiie.webp')} alt="SKIIE public homepage captured in September 2026" width={1440} height={960} loading="lazy" decoding="async" /></div><span className="od-media-open"><Icon /></span>
        </Link><CaseCaption slug="skiie" discipline="Website & content system" /></article>
      </div>
      <section className="od-more-work" aria-labelledby="od-more-work-title">
        <h3 id="od-more-work-title">More to explore.</h3>
        <div className="od-more-work-grid">{['kashcrop', 'treat-my-fish', 'trace-amp'].map(slug => {
          const project = getProject(slug)!, film = projectFilms[slug];
          return <article className="od-more-case" key={slug}>
            <Link className="od-more-case-image" to={'/projects/' + slug} aria-label={'Explore ' + project.name}>
              <img src={film.poster} alt={`${project.name}: interface demonstration with synthetic data`} width={film.width} height={film.height} loading="lazy" decoding="async" />
              <span className="od-more-case-arrow"><Icon /></span>
            </Link>
            <p className="od-more-case-source">Interface demonstration · Synthetic data</p>
            <h4><Link to={'/projects/' + slug}>{project.name}</Link></h4>
            <p className="od-more-case-summary">{homeCaseExcerpts[slug]}</p>
            <Link to={'/projects/' + slug} className="od-text-link od-case-link" aria-label={'Read ' + project.name + ' case study'}>Read case study <Icon /></Link>
          </article>;
        })}</div>
      </section>
    </section>
    <section className="od-capabilities od-wrap" aria-labelledby="od-capabilities-title">
      <div className="od-capabilities-intro"><h2 id="od-capabilities-title">From the first<br /><span>“what if?”</span></h2><p>One studio for the thinking, the making,<br className="od-desktop-break" /> and everything that keeps it working.</p></div>
      <div className="od-capability-accordion">{serviceCatalog.map((service, index) => <details key={service.slug} name="home-services" open={index === 0}><summary>{service.name}<Icon name="down" /></summary><div><p>{service.description}</p><Link to={'/services/' + service.slug} className="od-text-link">Explore this service <Icon /></Link></div></details>)}</div>
    </section>
    <div className="od-home-comparison"><PackageComparison id="compare" /></div>
    <section className="od-delivery od-wrap" aria-labelledby="od-delivery-title">
      <div className="od-content-heading"><h2 id="od-delivery-title">From idea<br />to everyday use.</h2><p>A project takes more than a set of screens. Here’s how the thinking, the build and the next chapter fit together.</p></div>
      <ol className="od-delivery-steps">{deliverySteps.map((step, index) => <li key={step.title}>
        <span className="od-delivery-number" aria-hidden="true">0{index + 1}</span>
        <h3>{step.title}</h3><p>{step.description}</p><span className="od-delivery-output">{step.deliverable}</span>
      </li>)}</ol>
    </section>
    <section className="od-home-studio od-wrap" aria-labelledby="od-studio-title"><div className="od-studio-name"><h2 id="od-studio-title">Rooted here.<br />Reaching further.</h2></div><div className="od-studio-intro"><p>Hazik Hussain founded KashCrop in Srinagar, bringing product design, engineering and applied AI into the same practice.</p><p className="od-studio-context-copy">The work spans orchard tools, plant and fish health, institutional platforms and scientific research. It starts close to the people using it—with their language, field conditions and review processes in mind.</p><Link to="/about" className="od-text-link">Meet the studio <Icon /></Link><p className="od-incubation-line">Incubated at SKIIE, SKUAST-Kashmir.</p></div></section>
    <section className="od-faq od-wrap" aria-labelledby="od-faq-title">
      <div className="od-faq-intro"><h2 id="od-faq-title">Before we<br />get started.</h2><p>A few practical questions about working together.</p><Link to="/contact" className="od-text-link">Tell us about your project <Icon /></Link></div>
      <div className="od-faq-list">{projectQuestions.map(item => <details key={item.question}><summary>{item.question}<Icon name="down" /></summary><p>{item.answer}</p></details>)}</div>
    </section>
  </main>;
}
