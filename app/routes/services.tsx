import { Link, type MetaFunction } from 'react-router';
import { getProject, media } from '~/data/portfolio/catalog';
import { serviceCatalog, type Service } from '~/data/portfolio/services';
import { projectFilms } from '~/data/portfolio/films';
import { Icon } from '~/components/portfolio/Icon';
import { PackageComparison } from '~/components/portfolio/overdrive/PackageComparison';
import { pageMeta } from '~/lib/portfolio/seo';
import '~/styles/portfolio/overdrive-services.css';

export const meta: MetaFunction = () => pageMeta(
  'What we do',
  'Product platforms, websites, applied AI and traceability systems. KashCrop brings design and engineering into one connected practice.',
  '/services',
);

/** The same sourced product material carries the index and its detail routes. */
export function ServiceMedia({ service, priority = false }: { service: Service; priority?: boolean }) {
  const loading = priority ? 'eager' : 'lazy';

  if (service.visual === 'platform') {
    return <figure className="ods-media ods-media-platform">
      <div className="ods-media-surface">
        <Link to="/projects/plant-health-clinic" className="ods-phone ods-phone-back" aria-label="Explore the Plant Health Clinic case study">
          <img src={media('phc-home.webp')} alt="Plant Health Clinic farmer home, showing the implemented app interface" width="390" height="844" loading={loading} decoding="async" />
        </Link>
        <Link to="/projects/baghban" className="ods-phone ods-phone-front" aria-label="Explore the BaghBani case study">
          <img src={media('garden-home.webp')} alt="BaghBani farmer home, showing orchard services and grower tools" width="390" height="844" loading={loading} decoding="async" />
        </Link>
      </div>
      <figcaption>BaghBani &amp; Plant Health Clinic. Actual review-build captures, September 2026.</figcaption>
    </figure>;
  }

  if (service.visual === 'website') {
    return <figure className="ods-media ods-media-website">
      <div className="ods-media-surface">
        <Link to="/projects/skiie" className="ods-browser-capture" aria-label="Explore the SKIIE website case study">
          <img src={media('skiie.webp')} alt="SKIIE public website with startup, programme and institutional content" width="1440" height="960" loading={loading} decoding="async" />
        </Link>
      </div>
      <figcaption>SKIIE public website. Captured on 20 September 2026.</figcaption>
    </figure>;
  }

  if (service.visual === 'ai') {
    const film = projectFilms['trace-amp'];
    return <figure className="ods-media ods-media-ai">
      <div className="ods-media-surface">
        <Link to="/projects/trace-amp" className="ods-research-capture" aria-label="Explore the TRACE-AMP research case study">
          <img src={film.poster} alt="TRACE-AMP research interface with biophysical properties and a helical-wheel view for a sample sequence" width={film.width} height={film.height} loading={loading} decoding="async" />
        </Link>
        <Link to="/projects/plant-health-clinic" className="ods-ai-phone" aria-label="Explore the Plant Health Clinic case study">
          <img src={media('phc-submit.webp')} alt="Plant Health Clinic interface for reporting a plant-health concern" width="390" height="844" loading={loading} decoding="async" />
        </Link>
      </div>
      <figcaption>TRACE-AMP: interface demo with sample data, 2 October 2026. Plant Health Clinic: September review build.</figcaption>
    </figure>;
  }

  return <figure className="ods-media ods-media-traceability">
    <div className="ods-media-surface">
      <div className="ods-trace-words">
        <span>LOT RECORDS<Icon name="down" /></span>
        <span>CUSTODY<Icon name="down" /></span>
        <span>PUBLIC PROOF<Icon name="arrow" /></span>
      </div>
    </div>
    <figcaption>The traceability workflow. Records, evidence and verification are shaped around the actual process.</figcaption>
  </figure>;
}

function ServiceChapter({ service }: { service: Service }) {
  const projects = service.projects.map(getProject).filter((project): project is NonNullable<typeof project> => !!project);

  return <article className={'ods-chapter ods-chapter-' + service.visual} id={'service-' + service.slug} aria-labelledby={'title-' + service.slug}>
    <div className="ods-chapter-copy">
      <h2 id={'title-' + service.slug}>{service.name}<span aria-hidden="true">.</span></h2>
      <p>{service.description}</p>
      <ul className="ods-included-preview" role="list">{service.includes.slice(0, 3).map(item => <li key={item}>{item}</li>)}</ul>
      <Link className="ods-text-link" to={'/services/' + service.slug}>Explore {service.name.toLowerCase()}<Icon name="arrow" /></Link>
    </div>
    <div className="ods-chapter-exhibit">
      <ServiceMedia service={service} />
      {projects.length > 0 ? <nav className="ods-project-links" aria-label={service.name + ' case studies'}>
        {projects.map(project => <Link key={project.slug} to={'/projects/' + project.slug}>{project.name}<Icon name="arrow" /></Link>)}
      </nav> : <p className="ods-project-references">{service.proof.join(' · ')}</p>}
    </div>
  </article>;
}

export default function ServicesPage() {
  return <main id="main" className="ods-page">
    <header className="ods-hero od-wrap">
      <div className="ods-hero-heading">
        <h1>FROM IDEA<br /><span>TO IN USE.</span></h1>
        <div className="ods-hero-copy">
          <p>Product design, engineering and applied AI. We build the software and plan for the life it has after launch.</p>
          <Link className="ods-button" to="/contact">Tell us what you’re making<Icon name="arrow" /></Link>
        </div>
      </div>
      <nav className="ods-service-nav" aria-label="Explore our services">
        {serviceCatalog.map(service => <a key={service.slug} href={'#service-' + service.slug}>{service.name}<Icon name="down" /></a>)}
      </nav>
    </header>

    <section className="ods-chapters od-wrap" aria-label="Our services">
      {serviceCatalog.map(service => <ServiceChapter key={service.slug} service={service} />)}
    </section>

    <PackageComparison id="compare" />

    <section className="ods-close od-wrap" aria-labelledby="ods-close-title">
      <h2 id="ods-close-title">WHAT ARE<br /><span>YOU MAKING?</span></h2>
      <Link to="/contact" className="ods-close-link">Let’s talk<Icon name="arrow" /></Link>
    </section>
  </main>;
}
