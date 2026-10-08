import { Link, type MetaFunction } from 'react-router';
import { getProject, media } from '~/data/portfolio/catalog';
import { serviceCatalog, type Service } from '~/data/portfolio/services';
import { Icon } from '~/components/portfolio/Icon';
import { OfferComparison } from '~/components/portfolio/KashCropOffer';
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
      <div className="ap-preview-phone ap-service-phone-back"><img src={media('phc-home.webp')} alt="Plant Health Clinic farmer app" width="390" height="844" loading="lazy" decoding="async" /></div>
      <div className="ap-preview-phone ap-service-phone-front"><img src={media('garden-home.webp')} alt="Baghban orchard services app" width="390" height="844" loading="lazy" decoding="async" /></div>
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
  return <main id="main" className="ap-page">
    <header className="page-intro ap-page-intro ap-wrap">
      <h1>Everything it takes.<br /><span>To make it work.</span></h1>
      <p>Product design, engineering and applied AI.<br className="ap-desktop-break" /> One connected practice, from the first idea to the final detail.</p>
      <nav className="ap-service-jump" aria-label="Explore our services">
        {serviceCatalog.map(service => <a href={'#service-' + service.slug} key={service.slug}>{service.name}<Icon name="down" /></a>)}
      </nav>
      <div className="ap-service-offer-note">
        <p>One-time project pricing, hosting and care for up to 4 years, scoped to your project.</p>
        <a className="ap-text-link" href="#compare">See what’s included <Icon name="right" /></a>
      </div>
    </header>

    <section className="ap-services-index ap-wrap" aria-label="Our disciplines">
      {serviceCatalog.map(service => {
        const [headline, secondLine] = serviceHeadlines[service.slug];
        return <article className="ap-service-row" id={'service-' + service.slug} key={service.slug}>
          <div className="ap-service-copy">
            <h2>{headline}<br /><span>{secondLine}</span></h2>
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <ul className="ap-service-includes">{service.includes.slice(0, 3).map(item => <li key={item}><Icon name="check" /><span>{item}</span></li>)}</ul>
            <Link className="ap-text-link" to={'/services/' + service.slug}>Explore {service.name.toLowerCase()} <Icon name="right" /></Link>
          </div>
          <div className="ap-service-evidence">
            <ServicePreview service={service} />
            {service.projects.length > 0 && <div className="ap-service-projects"><span>See it in practice</span><div>{service.projects.map(slug => {
              const project = getProject(slug);
              return project ? <Link to={'/projects/' + slug} key={slug}>{project.name}<Icon name="right" /></Link> : null;
            })}</div></div>}
          </div>
        </article>;
      })}
    </section>

    <OfferComparison showClose={false} />

    <section className="ap-working-together ap-wrap">
      <h2>A clear scope.<br /><span>A shared way forward.</span></h2>
      <div><p>We agree the development scope and plan ongoing support around the product that ships. It starts with understanding what needs to work.</p><Link className="ap-button" to="/contact">Tell us about your project <Icon name="right" /></Link></div>
    </section>
  </main>;
}
