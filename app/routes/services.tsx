import { Link, type MetaFunction } from 'react-router';
import { getProject, media } from '~/data/portfolio/catalog';
import { serviceCatalog, type Service } from '~/data/portfolio/services';
import { Icon } from '~/components/portfolio/Icon';
import { pageMeta } from '~/lib/portfolio/seo';

export const meta: MetaFunction = () => pageMeta(
  'What we do',
  'Product platforms, websites, applied AI and traceability systems. KashCrop brings design and engineering into one connected practice.',
  '/services',
);

const serviceHeadlines: Record<string, [string, string]> = {
  'full-stack-apps': ['The whole product.', 'Built together.'],
  'website-development': ['A great first impression.', 'And everything after.'],
  'ai-training': ['Your expertise.', 'Part of the workflow.'],
  'blockchain-systems': ['Every handoff.', 'A clearer record.'],
};

function ServicePreview({ service }: { service: Service }) {
  if (service.visual === 'platform') {
    return <div className="ap-service-preview ap-service-platform">
      <div className="ap-preview-phone ap-service-phone-back"><img src={media('phc-home.webp')} alt="Plant Health Clinic farmer app" width="390" height="844" loading="eager" decoding="async" /></div>
      <div className="ap-preview-phone ap-service-phone-front"><img src={media('garden-home.webp')} alt="Baghban orchard services app" width="390" height="844" loading="eager" decoding="async" /></div>
      <span className="ap-visual-note">Baghban &amp; Plant Health Clinic</span>
    </div>;
  }

  if (service.visual === 'website') {
    return <div className="ap-service-preview ap-service-website">
      <div className="ap-preview-browser ap-service-campus">
        <div className="ap-browser-bar" aria-hidden="true"><span className="ap-browser-dots"><i /><i /><i /></span><span>skiie.co.in</span><Icon name="link" /></div>
        <div className="ap-browser-content"><img src={media('skiie.webp')} alt="SKIIE public website, captured in September 2026" width="1440" height="960" loading="lazy" decoding="async" /></div>
      </div>
      <span className="ap-visual-note">SKIIE · Public website</span>
    </div>;
  }

  if (service.visual === 'ai') {
    return <div className="ap-service-preview ap-service-ai">
      <div className="ap-preview-browser ap-service-research">
        <div className="ap-browser-bar" aria-hidden="true"><span className="ap-browser-dots"><i /><i /><i /></span><span>TraceAMP</span><Icon name="link" /></div>
        <img src="/media/projects/trace-amp/poster.webp" alt="TraceAMP research interface showing properties and a helical-wheel view for a sample sequence" width="1920" height="1080" loading="lazy" decoding="async" />
      </div>
      <span className="ap-visual-note">TraceAMP · Interface demonstration</span>
    </div>;
  }

  return <figure className="ap-service-preview ap-service-traceability">
    <div className="ap-custody-drawing" aria-hidden="true">
      <svg viewBox="0 0 600 220" fill="none">
        <path className="ap-custody-line" d="M132 110H262M338 110H468" />
        <rect className="ap-custody-block" x="40" y="64" width="92" height="92" rx="23" />
        <path className="ap-custody-symbol" d="m64 98 22-12 22 12-22 12-22-12Zm0 12 22 12 22-12m-44 12 22 12 22-12" />
        <rect className="ap-custody-block" x="254" y="64" width="92" height="92" rx="23" />
        <path className="ap-custody-symbol" d="M287 90h22l8 8v32h-34V90h4Zm20 0v10h10m-25 10h16m-16 10h12" />
        <rect className="ap-custody-block" x="468" y="64" width="92" height="92" rx="23" />
        <path className="ap-custody-symbol" d="m493 110 14 14 28-28" />
        <circle className="ap-custody-pulse" cx="178" cy="110" r="4" />
        <circle className="ap-custody-pulse" cx="393" cy="110" r="4" />
      </svg>
      <div className="ap-custody-labels"><span>Records</span><span>Evidence</span><span>Verification</span></div>
    </div>
    <p className="ap-custody-statement">Follow the journey.<br /><span>Keep the proof.</span></p>
    <figcaption className="ap-visual-note">Conceptual traceability workflow</figcaption>
  </figure>;
}

export default function ServicesPage() {
  return <main id="main" className="fw-services fw-editorial-page">
    <header className="fw-services-hero fw-edge">
      <div className="fw-editorial-rail"><span>CAPABILITIES / END TO END</span><span>THE WORK BEHIND THE WORK</span></div>
      <div className="fw-services-hero-heading"><h1>NO PRETTY<br/><em>DEAD ENDS.</em></h1><p>We design, engineer and deliver useful software. The interface is only the beginning of the story.</p></div>
      <nav className="fw-services-toc" aria-label="Explore our services">{serviceCatalog.map((service,index)=><a href={'#service-'+service.slug} key={service.slug}><span>{String(index+1).padStart(2,'0')}</span>{service.name}<Icon name="down"/></a>)}</nav>
    </header>
    <section className="fw-service-sections fw-edge" aria-label="Studio capabilities">
      {serviceCatalog.map((service,index)=>{
        const [first,second]=serviceHeadlines[service.slug];
        return <article className="fw-service-chapter" id={'service-'+service.slug} key={service.slug}>
          <div className="fw-service-chapter-marker"><span>{String(index+1).padStart(2,'0')} / 04</span><span>{service.name}</span><span>↘</span></div>
          <div className="fw-service-chapter-main">
            <div className="fw-service-chapter-copy">
              <h2>{first}<br/><em>{second}</em></h2><p>{service.description}</p>
              <ul>{service.includes.slice(0,4).map(item=><li key={item}>{item}</li>)}</ul>
              <Link className="fw-underlink" to={'/services/'+service.slug}>What goes into {service.name.toLowerCase()} <span aria-hidden="true">↗</span></Link>
            </div>
            <div className="fw-service-chapter-visual"><ServicePreview service={service}/></div>
          </div>
          {service.projects.length>0 && <div className="fw-service-proof"><span>PROOF IN THE WORK</span><div>{service.projects.map(slug=>{const project=getProject(slug);return project?<Link key={slug} to={'/projects/'+slug}>{project.name}<Icon name="right"/></Link>:null})}</div></div>}
        </article>;
      })}
    </section>
    <section className="fw-terms fw-edge" id="compare" aria-labelledby="fw-terms-title">
      <div className="fw-editorial-rail"><span>WHAT A COMPLETE PROJECT INCLUDES</span><span>NO SURPRISE PROMISES</span></div>
      <div className="fw-terms-lead"><h2 id="fw-terms-title">BEYOND<br/><em>LAUNCH DAY.</em></h2><p>A product is more than the moment it goes live. We plan the delivery, hosting and care as part of the real scope.</p></div>
      <div className="fw-terms-columns">
        <div><span>01 / DEVELOPMENT</span><h3>One agreed project price.</h3><p>A fixed price for the development scope defined together.</p></div>
        <div><span>02 / HOSTING</span><h3>The infrastructure matters.</h3><p>Setup and hosting included where agreed, for the term named in the quote.</p></div>
        <div><span>03 / RELEASES</span><h3>Your account, your control.</h3><p>Play Console account setup and Android release management, subject to Google's verification and review.</p></div>
        <div><span>04 / CARE</span><h3>Up to four years of support.</h3><p>Maintenance options are scoped by coverage and duration. Third-party charges are stated in writing.</p></div>
      </div>
      <div className="fw-terms-bottom"><p>Compare written scopes. Different providers offer different packages; there is no universal checklist.</p><Link to="/contact" className="fw-underlink">Plan your project <span aria-hidden="true">↗</span></Link></div>
    </section>
    <section className="fw-service-end fw-edge"><p>GOT SOMETHING COMPLEX?</p><h2>GOOD.<br/><em>WE LIKE HARD PROBLEMS.</em></h2><Link to="/contact">Let's talk about it <span aria-hidden="true">↗</span></Link></section>
  </main>;
}
