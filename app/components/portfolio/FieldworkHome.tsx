import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { GalleryLink } from './UI';
import { Icon } from './Icon';
import { media, projects, getProject } from '~/data/portfolio/catalog';
import { useMotion } from './MotionProvider';

const baghban = getProject('baghban')!;
const clinic = getProject('plant-health-clinic')!;

/** A restrained animation grammar: one kinetic sentence and staged real product evidence. */
function useFieldworkMotion() {
  const root = useRef<HTMLElement>(null);
  const { reduced } = useMotion();
  useEffect(() => {
    if (reduced || !root.current) return;
    let cancelled = false;
    let teardown = () => {};
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        gsap.fromTo('.fw-hero-headline > span', { yPercent: 110, rotate: 2 }, { yPercent: 0, rotate: 0, duration: 1.3, stagger: .14, ease: 'power4.out', clearProps: 'transform' });
        gsap.fromTo('.fw-hero-lede, .fw-hero-aside', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 1.1, delay: .55, stagger: .18, ease: 'power3.out', clearProps: 'all' });
        gsap.utils.toArray<HTMLElement>('.fw-entrance').forEach((element) => {
          gsap.fromTo(element, { y: 65, opacity: .4 }, { y: 0, opacity: 1, ease: 'power2.out', duration: 1, scrollTrigger: { trigger: element, start: 'top 90%', once: true }, clearProps: 'all' });
        });
        const mm = gsap.matchMedia();
        mm.add('(min-width: 850px) and (hover: hover) and (pointer: fine)', () => {
          gsap.to('.fw-hero-graphic', { yPercent: -9, rotate: -4, ease: 'none', scrollTrigger: { trigger: '.fw-hero', start: 'top top', end: 'bottom top', scrub: 1 } });
          gsap.to('.fw-feature-bagh .fw-screen-primary', { y: -72, rotate: 6, ease: 'none', scrollTrigger: { trigger: '.fw-feature-bagh', start: 'top bottom', end: 'bottom top', scrub: .8 } });
          gsap.to('.fw-feature-clinic .fw-screen-primary', { y: -48, rotate: -3, ease: 'none', scrollTrigger: { trigger: '.fw-feature-clinic', start: 'top bottom', end: 'bottom top', scrub: .8 } });
        });
        return () => mm.revert();
      }, root.current);
      teardown = () => context.revert();
    }).catch(() => {});
    return () => { cancelled = true; teardown(); };
  }, [reduced]);
  return root;
}

function IndexLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return <div className="fw-index-label"><span>{index}</span><span>{children}</span></div>;
}

export default function FieldworkHome() {
  const root = useFieldworkMotion();
  return <main id="main" className="fw-home" ref={root}>
    <section className="fw-hero" aria-labelledby="fw-hero-title">
      <div className="fw-hero-eyebrow fw-rail"><span><i className="fw-asterisk" aria-hidden="true">✳</i> Independent software studio</span><span>Made in Kashmir <span aria-hidden="true">↗</span> Working everywhere</span></div>
      <div className="fw-hero-headline-wrap">
        <h1 id="fw-hero-title" className="fw-hero-headline">
          <span>THE WORK</span>
          <span>HAS TO <em>WORK.</em></span>
        </h1>
        <div className="fw-hero-graphic" aria-hidden="true">
          <div className="fw-graphic-ring fw-graphic-ring-a" /><div className="fw-graphic-ring fw-graphic-ring-b" />
          <div className="fw-graphic-core"><span>KC</span><small>01 / 26</small></div>
        </div>
      </div>
      <div className="fw-hero-bottom fw-rail">
        <div className="fw-hero-lede"><span className="fw-caps">What we believe / 001</span><p>Beautiful is not enough.<br />We make ambitious software <em>useful.</em></p></div>
        <div className="fw-hero-aside"><p>Product design, engineering and applied AI for the places where technology actually matters.</p><a className="fw-underlink" href="#selected-work">Enter the work <span aria-hidden="true">↘</span></a></div>
      </div>
      <div className="fw-hero-footnote" aria-hidden="true"><span>SCROLL TO EXPLORE</span><span>↓</span><span>EST. KASHMIR / 2026</span></div>
    </section>

    <section className="fw-statement fw-entrance" aria-label="Studio philosophy">
      <div className="fw-rail fw-statement-rail"><IndexLabel index="00">A SMALL INTRODUCTION</IndexLabel><span>DESIGN WITH CONSEQUENCE</span></div>
      <p>Not another dashboard.<br /><span>Not another promise.</span><br />Something <em>people can use.</em></p>
      <span className="fw-statement-star" aria-hidden="true">✳</span>
    </section>

    <section className="fw-collection" id="selected-work" aria-labelledby="fw-selected-title">
      <div className="fw-collection-heading fw-rail fw-entrance">
        <div><IndexLabel index="01">SELECTED WORK / CASE FILES</IndexLabel><h2 id="fw-selected-title">Proof, not<br /><em>pitch decks.</em></h2></div>
        <p>Different fields. Different constraints. The same obsession with getting the details right.</p>
      </div>

      <article className="fw-feature fw-feature-bagh fw-entrance" aria-labelledby="fw-bagh-title">
        <div className="fw-feature-top fw-rail"><span>CASE FILE / 001</span><span>SOFTWARE FOR ORCHARD GROWERS</span><span>2026 — KASHMIR</span></div>
        <div className="fw-feature-bagh-layout">
          <div className="fw-feature-bagh-copy">
            <span className="fw-feature-pretitle">From the field / into focus</span>
            <h3 id="fw-bagh-title">Bagh<br /><em>Bani.</em></h3>
            <p>One connected place for orchard services, specialist advice and the seasons in between.</p>
            <Link className="fw-circle-link" to="/projects/baghban"><span>Explore the case study</span><span aria-hidden="true">↗</span></Link>
          </div>
          <div className="fw-feature-bagh-art">
            <span className="fw-huge-number" aria-hidden="true">01</span>
            <span className="fw-orchard-target fw-orchard-target-one" aria-hidden="true" />
            <span className="fw-orchard-target fw-orchard-target-two" aria-hidden="true" />
            <div className="fw-screen-primary fw-phone fw-phone-garden"><img src={media('garden-home.webp')} alt="Actual BaghBani farmer home screen showing orchard consultations and orchard services" width={390} height={844} loading="lazy" decoding="async" /></div>
            <div className="fw-screen-secondary fw-phone fw-phone-garden"><img src={media('garden-calendar.webp')} alt="" width={390} height={1607} loading="lazy" decoding="async" /></div>
            <span className="fw-specimen-label">ACTUAL PRODUCT / 2026 <span aria-hidden="true">↗</span></span>
          </div>
        </div>
        <div className="fw-feature-bottom fw-rail"><span>01 / SERVICES</span><span>02 / SPECIALISTS</span><span>03 / SEASONAL GUIDANCE</span><GalleryLink project={baghban} screen={baghban.screens[0]} className="fw-feature-gallery">Inspect actual interface <Icon name="expand" /></GalleryLink></div>
      </article>

      <article className="fw-feature fw-feature-clinic fw-entrance" aria-labelledby="fw-clinic-title">
        <div className="fw-feature-top fw-rail"><span>CASE FILE / 002</span><span>APPLIED AI IN AGRICULTURE</span><span>SKUAST–KASHMIR</span></div>
        <div className="fw-clinic-layout">
          <div className="fw-clinic-art">
            <div className="fw-clinic-grid" aria-hidden="true" />
            <span className="fw-clinic-crosshair" aria-hidden="true">+</span>
            <div className="fw-clinic-lens" aria-hidden="true"><img src={media('leaf.webp')} alt="" width="560" height="560" loading="lazy" /></div>
            <div className="fw-screen-primary fw-phone fw-phone-clinic"><img src={media('phc-home.webp')} alt="Plant Health Clinic farmer home interface" width="390" height="844" loading="lazy" decoding="async" /></div>
            <span className="fw-clinic-diagnostic" aria-hidden="true">FIELD NOTE / 002<br />IMAGE → CASE → REVIEW</span>
          </div>
          <div className="fw-clinic-copy">
            <span className="fw-feature-pretitle">When expertise meets the field</span>
            <h3 id="fw-clinic-title">A better<br /><em>first answer.</em></h3>
            <p>Plant-health cases documented in the field, with AI-assisted drafts and specialist review where it counts.</p>
            <Link className="fw-circle-link" to="/projects/plant-health-clinic"><span>Explore the case study</span><span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <div className="fw-feature-bottom fw-rail"><span>01 / REPORT</span><span>02 / REVIEW</span><span>03 / ADVISE</span><GalleryLink project={clinic} screen={clinic.screens[0]} className="fw-feature-gallery">Inspect actual interface <Icon name="expand" /></GalleryLink></div>
      </article>

      <div className="fw-work-archive fw-entrance">
        <div className="fw-work-archive-heading"><IndexLabel index="02">MORE WORK, LESS TALK</IndexLabel><Link to="/projects" className="fw-underlink">View the complete archive <span aria-hidden="true">↗</span></Link></div>
        <div className="fw-work-list">
          {projects.filter(project => !['baghban', 'plant-health-clinic'].includes(project.slug)).map((project, index) =>
            <Link to={'/projects/' + project.slug} key={project.slug} className="fw-work-row">
              <span className="fw-work-row-number">0{index + 3}</span>
              <span className="fw-work-row-title">{project.name}</span>
              <span className="fw-work-row-type">{project.kind}</span>
              <span className="fw-work-row-arrow" aria-hidden="true">↗</span>
            </Link>)}
        </div>
      </div>
    </section>

    <section className="fw-capabilities" aria-labelledby="fw-capabilities-title">
      <div className="fw-rail"><IndexLabel index="03">WHAT HAPPENS AFTER THE DESIGN?</IndexLabel><span>AN ENTIRE PRODUCT. NOT JUST A PRETTY SCREEN.</span></div>
      <div className="fw-capabilities-header fw-entrance"><h2 id="fw-capabilities-title">We stay for<br /><em>the hard part.</em></h2><p>One partner from first sketch to real-world release, with support that does not vanish at launch.</p></div>
      <div className="fw-capability-list">
        <div className="fw-capability"><span>01 / BUILD</span><h3>One clear<br /><em>project price.</em></h3><p>Agreed development scope, connected interfaces, APIs and infrastructure.</p></div>
        <div className="fw-capability"><span>02 / LAUNCH</span><h3>Hosting.<br /><em>Publishing.</em></h3><p>Go-live preparation, server hosting and Android Play Console support as agreed in your quote.</p></div>
        <div className="fw-capability"><span>03 / STAY</span><h3>Care for<br /><em>what’s next.</em></h3><p>Maintenance options up to four years. Coverage and third-party charges defined in writing.</p></div>
      </div>
      <Link className="fw-underlink fw-capability-cta" to="/services">Explore how we work <span aria-hidden="true">↗</span></Link>
    </section>

    <section className="fw-final" aria-labelledby="fw-final-title">
      <div className="fw-rail"><IndexLabel index="04">NEXT UP / YOUR IDEA</IndexLabel><span>THE DOOR IS OPEN</span></div>
      <h2 id="fw-final-title">MAKE IT<br /><em>MATTER.</em></h2>
      <div className="fw-final-bottom"><p>A good idea is a start.<br />Let’s build what comes after.</p><Link to="/contact" className="fw-final-cta">Tell us what you’re building <span aria-hidden="true">↗</span></Link></div>
      <p className="fw-final-signoff">KASHCROP INNOVATIONS — INDEPENDENT BY DESIGN.</p>
    </section>
  </main>;
}
