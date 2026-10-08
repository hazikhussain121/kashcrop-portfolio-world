import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Link } from 'react-router';
import { featuredProjects, media, type Screen } from '~/data/portfolio/catalog';
import { Icon } from './Icon';
import { useMotion } from './MotionProvider';

function Phone({screen, className = '', priority = false}: {screen: Screen; className?: string; priority?: boolean}) {
  return <div className={`apple-phone ${className}`}><div className="apple-phone-screen"><img src={media(screen.file)} alt={screen.name} width={screen.width} height={screen.height} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async" /></div></div>;
}

function Desktop({src, alt, className = '', priority = false}: {src: string; alt: string; className?: string; priority?: boolean}) {
  return <div className={`apple-desktop ${className}`}><div className="apple-desktop-display"><img src={src} alt={alt} width="1920" height="1080" loading={priority ? 'eager' : 'lazy'} decoding="async" /></div><div className="apple-desktop-base" aria-hidden="true" /></div>;
}

export function AppleHero() {
  const root = useRef<HTMLElement>(null);
  const {reduced} = useMotion();
  useEffect(() => {
    if (reduced || !root.current) return;
    let dispose = () => {}, cancelled = false;
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{gsap}, {ScrollTrigger}]) => {
      if (cancelled || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        const intro = gsap.timeline({defaults: {ease: 'power3.out'}});
        intro.from('.apple-hero-copy > *', {y: 22, opacity: .2, duration: .95, stagger: .09})
          .from('.hero-device', {y: 95, opacity: .25, rotateX: 14, duration: 1.5, stagger: .1}, .12);
        const mm = gsap.matchMedia();
        mm.add('(min-width: 900px) and (hover: hover) and (pointer: fine)', () => {
          const tl = gsap.timeline({scrollTrigger: {trigger: root.current, start: 'top top', end: 'bottom top', scrub: .8}});
          tl.to('.hero-device-left', {x: -86, y: -45, rotate: -12, ease: 'none'}, 0)
            .to('.hero-device-right', {x: 86, y: -25, rotate: 12, ease: 'none'}, 0)
            .to('.hero-device-centre', {y: -50, scale: 1.07, rotateX: 0, ease: 'none'}, 0);
        });
        return () => mm.revert();
      }, root);
      dispose = () => ctx.revert();
    }).catch(() => {});
    return () => {cancelled = true; dispose();};
  }, [reduced]);
  return <section className="apple-hero" ref={root} aria-labelledby="apple-hero-title">
    <div className="apple-hero-copy">
      <h1 id="apple-hero-title">Good ideas.<br /><span>Beautifully built.</span></h1>
      <p>Digital products for agriculture, institutions<br className="desktop-break" /> and the people moving them forward.</p>
      <div className="apple-hero-actions"><a className="button button-dark" href="#work">Explore the work</a><Link to="/contact" className="apple-text-link">Start a project <Icon name="right" /></Link></div>
    </div>
    <div className="apple-product-family" aria-label="Actual KashCrop product interfaces">
      <div className="hero-device hero-device-centre"><Desktop src="/media/projects/trace-amp/poster.webp" alt="TraceAMP peptide research interface, from the review build" priority /></div>
      <div className="hero-device hero-device-left"><Phone screen={featuredProjects[0].screens[0]} priority /></div>
      <div className="hero-device hero-device-right"><Phone screen={featuredProjects[1].screens[0]} priority /></div>
    </div>
  </section>;
}

const chapters = [
  {name: 'BaghBani', headline: <>Your orchard.<br />In good hands.</>, description: 'Orchard services, specialist access and seasonal guidance. Together in one grower experience.', details: ['Orchard services', 'Expert consultations', 'Seasonal guidance'], tone: 'garden'},
  {name: 'Plant Health Clinic', headline: <>From a concern.<br />To a clearer next step.</>, description: 'A place for farmers to report plant problems, share the right context and connect with expert care.', details: ['Photo-led reporting', 'Expert review', 'Farmer follow-up'], tone: 'clinic'},
  {name: 'SKIIE', headline: <>A home for<br />what comes next.</>, description: 'Startups, programmes and opportunities. An institutional website built around discovery.', details: ['Programme discovery', 'Startup ecosystem', 'Institutional publishing'], tone: 'institution'},
] as const;

export function AppleSpotlight() {
  const root = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = useRef(0);
  const selectRef = useRef<(index: number) => void>(() => {});
  const {reduced} = useMotion();
  const [active, setActive] = useState(0);
  const [scrollMode, setScrollMode] = useState(false);
  const choose = (index: number) => {current.current = index; setActive(index);};
  useEffect(() => {
    selectRef.current = choose;
  });
  useEffect(() => {
    if (reduced || !root.current) {setScrollMode(false); return;}
    let cancelled = false, dispose = () => {};
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{gsap}, {ScrollTrigger}]) => {
      if (cancelled || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1100px) and (min-height: 850px) and (hover: hover) and (pointer: fine)', () => {
        const section = root.current;
        if (!section) return;
        section.dataset.scrollShowcase = 'on';
        setScrollMode(true);
        const trigger = ScrollTrigger.create({trigger: section, start: 'top top+=64', end: 'bottom bottom-=24', onUpdate: self => {
          const index = Math.min(2, Math.floor(self.progress * 3));
          if (index !== current.current) selectRef.current(index);
        }});
        return () => {trigger.kill(); delete section.dataset.scrollShowcase; setScrollMode(false);};
      });
      dispose = () => mm.revert();
    }).catch(() => {});
    return () => {cancelled = true; dispose();};
  }, [reduced]);
  function select(index: number) {
    choose(index);
    if (scrollMode && root.current) {
      const box = root.current.getBoundingClientRect();
      const distance = Math.max(0, box.height - window.innerHeight + 88);
      const top = window.scrollY + box.top - 64 + distance * ((index + .45) / 3);
      window.scrollTo({top, behavior: 'instant'});
    }
  }
  function keydown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % chapters.length;
    else if (event.key === 'ArrowLeft') next = (index + chapters.length - 1) % chapters.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = chapters.length - 1;
    else return;
    event.preventDefault(); select(next); tabs.current[next]?.focus({preventScroll: true});
  }
  return <section className="apple-spotlight" id="work" ref={root} aria-labelledby="spotlight-heading">
    <div className="apple-spotlight-sticky">
      <div className="apple-section-heading"><h2 id="spotlight-heading">Meet the work.</h2><p>Different worlds. The same attention to detail.</p></div>
      <div className="apple-tabs" role="tablist" aria-label="Featured projects">
        {chapters.map((chapter, index) => <button key={chapter.name} id={`project-tab-${index}`} ref={element => {tabs.current[index] = element;}} type="button" role="tab" aria-selected={active === index} aria-controls={`project-panel-${index}`} tabIndex={active === index ? 0 : -1} onClick={() => select(index)} onKeyDown={event => keydown(event, index)}>{chapter.name}</button>)}
      </div>
      <div className="apple-chapter-stage">
        {chapters.map((chapter, index) => <div key={chapter.name} id={`project-panel-${index}`} role="tabpanel" aria-labelledby={`project-tab-${index}`} tabIndex={0} hidden={active !== index} className={`apple-chapter apple-chapter-${chapter.tone}`}>
          <div className="apple-chapter-copy"><h3>{chapter.name}</h3><p className="apple-chapter-headline">{chapter.headline}</p><p className="apple-chapter-description">{chapter.description}</p><Link to={`/projects/${featuredProjects[index].slug}`} className="apple-text-link">Explore {chapter.name} <Icon name="right" /></Link></div>
          <div className="apple-chapter-visual">
            {index < 2 ? <><Phone screen={featuredProjects[index].screens[index === 0 ? 2 : 1]} className="chapter-phone chapter-phone-back" /><Phone screen={featuredProjects[index].screens[0]} className="chapter-phone chapter-phone-front" /></> : <Desktop src={media('skiie.webp')} alt="SKIIE website interface from the review build" className="chapter-desktop" />}
          </div>
          <ul className="apple-chapter-details">{chapter.details.map(detail => <li key={detail}>{detail}</li>)}</ul>
        </div>)}
      </div>
      <div className="apple-spotlight-bottom"><p>Actual interfaces from our project review builds.</p><Link to="/projects" className="apple-text-link">See all projects <Icon name="right" /></Link></div>
    </div>
  </section>;
}

export function AppleCapabilities() {
  return <section className="apple-capabilities apple-wrap" aria-labelledby="capabilities-heading">
    <div className="apple-section-heading"><h2 id="capabilities-heading">The whole product.<br /><span>Considered together.</span></h2><p>One team for the experience people see<br className="desktop-break" /> and the systems that make it work.</p></div>
    <div className="apple-capability-grid">
      <article className="apple-capability apple-capability-primary"><div><h3>From the first idea<br />to the final detail.</h3><p>Product thinking, interface design and full-stack engineering, built around your workflow.</p><Link to="/services" className="apple-text-link">What we do <Icon name="right" /></Link></div><div className="apple-capability-screens" aria-hidden="true"><img src={media('phc-home.webp')} alt="" width="390" height="844" loading="lazy" /><img src={media('phc-guide.webp')} alt="" width="390" height="844" loading="lazy" /></div></article>
      <article className="apple-capability apple-capability-secondary"><img className="apple-capability-mark" src={media('kashcrop-logo.png')} alt="" width="80" height="80" loading="lazy" /><h3>Useful by design.<br />Connected by engineering.</h3><p>Apps. Websites. Applied AI.<br />Built as parts of the same experience.</p><div className="apple-service-links"><Link to="/services/full-stack-apps">Full-stack apps <Icon name="right" /></Link><Link to="/services/website-development">Websites <Icon name="right" /></Link><Link to="/services/ai-training">Applied AI <Icon name="right" /></Link><Link to="/services/blockchain-systems">Blockchain <Icon name="right" /></Link></div></article>
    </div>
  </section>;
}

export function AppleOrigin() {
  const root = useRef<HTMLElement>(null);
  const {reduced} = useMotion();
  useEffect(() => {
    if (reduced || !root.current) return;
    let cancelled = false, dispose = () => {};
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{gsap}, {ScrollTrigger}]) => {
      if (cancelled || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        gsap.fromTo('.apple-origin-image', {scale: 1.12}, {scale: 1, ease: 'none', scrollTrigger: {trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: .8}});
      }, root);
      dispose = () => context.revert();
    }).catch(() => {});
    return () => {cancelled = true; dispose();};
  }, [reduced]);
  return <section className="apple-origin apple-wrap" ref={root} aria-labelledby="origin-heading"><div className="apple-origin-photo"><img className="apple-origin-image" src={media('apple-orchard.webp')} alt="Apple trees in an orchard" width="1280" height="1920" loading="lazy" /><div className="apple-origin-copy"><h2 id="origin-heading">Rooted in Kashmir.<br />Open to what’s next.</h2><p>Practical problems. A wider perspective.<br />That’s where our work begins.</p><Link to="/about" className="button apple-button-light">Meet KashCrop <Icon name="right" /></Link></div></div><div className="apple-incubator"><img src={media('skiie-logo.png')} alt="SKIIE" width="40" height="40" loading="lazy" /><p><strong>Incubated at SKIIE.</strong> SKUAST-Kashmir Innovation, Incubation and Entrepreneurship Centre.</p></div></section>;
}
