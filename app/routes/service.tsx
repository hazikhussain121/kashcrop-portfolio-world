import { Link, useLoaderData, type LoaderFunctionArgs, type MetaFunction } from 'react-router';
import { getService, serviceCatalog, serviceFormValues } from '~/data/portfolio/services';
import { getProject, media, type Project } from '~/data/portfolio/catalog';
import { projectFilms } from '~/data/portfolio/films';
import { Breadcrumbs } from '~/components/portfolio/UI';
import { Icon } from '~/components/portfolio/Icon';
import { pageMeta } from '~/lib/portfolio/seo';

export function loader({ params }: Pick<LoaderFunctionArgs, 'params' | 'request'>) {
  const service = getService(params.slug);
  if (!service) throw new Response('Service not found', { status: 404 });
  return { service };
}
export const meta: MetaFunction<typeof loader> = ({ data }) => data?.service
  ? pageMeta(data.service.name, data.service.description, '/services/' + data.service.slug)
  : pageMeta('Service not found', 'Explore KashCrop services.', '/services');

function EvidencePreview({ project, hero = false }: { project: Project; hero?: boolean }) {
  const screen = project.screens[0];
  const film = projectFilms[project.slug];
  const mobile = screen?.kind === 'Mobile' || (!screen && project.slug !== 'trace-amp' && !!film?.mobile);
  const src = screen ? media(screen.file) : mobile ? film?.mobile?.poster : film?.poster;
  const width = screen?.width ?? (mobile ? film?.mobile?.width : film?.width);
  const height = screen?.height ?? (mobile ? film?.mobile?.height : film?.height);

  const preview = <div className={'ap-evidence-preview' + (mobile ? ' ap-evidence-phone' : ' ap-evidence-desktop') + (hero ? ' ap-evidence-hero' : '') + (project.slug === 'skiie' ? ' ap-evidence-campus' : '')}>
    <div className={mobile ? 'ap-preview-phone' : 'ap-preview-browser'}>
      {!mobile && <div className="ap-browser-bar" aria-hidden="true"><span className="ap-browser-dots"><i /><i /><i /></span><span>{project.slug === 'skiie' ? 'skiie.co.in' : project.name}</span><Icon name="link" /></div>}
      <div className="ap-evidence-screen"><img src={src} alt={project.name + (screen ? ': ' + screen.name : ' interface demonstration with sample data')} width={width} height={height} loading="lazy" decoding="async" /></div>
    </div>
  </div>;
  return hero ? <figure className="ap-evidence-figure">{preview}<figcaption className="ap-evidence-caption">{project.name} · Actual product interface</figcaption></figure> : preview;
}

function TraceabilityStage() {
  return <figure className="ap-service-preview ap-detail-traceability">
    <div className="ap-custody-drawing" aria-hidden="true">
      <svg viewBox="0 0 600 220" fill="none">
        <path className="ap-custody-line" d="M132 110H262M338 110H468" />
        <rect className="ap-custody-block" x="40" y="64" width="92" height="92" rx="23" />
        <path className="ap-custody-symbol" d="m64 98 22-12 22 12-22 12-22-12Zm0 12 22 12 22-12m-44 12 22 12 22-12" />
        <rect className="ap-custody-block" x="254" y="64" width="92" height="92" rx="23" />
        <path className="ap-custody-symbol" d="M287 90h22l8 8v32h-34V90h4Zm20 0v10h10m-25 10h16m-16 10h12" />
        <rect className="ap-custody-block" x="468" y="64" width="92" height="92" rx="23" />
        <path className="ap-custody-symbol" d="m493 110 14 14 28-28" />
      </svg>
      <div className="ap-custody-labels"><span>Records</span><span>Evidence</span><span>Verification</span></div>
    </div>
    <p className="ap-custody-statement">Follow the journey.<br /><span>Keep the proof.</span></p>
    <figcaption className="ap-visual-note">Conceptual traceability workflow</figcaption>
  </figure>;
}

export default function ServicePage() {
  const { service: s } = useLoaderData<typeof loader>();
  const evidence = s.projects.map(getProject).filter((project): project is NonNullable<typeof project> => !!project);

  return <main id="main" className="ap-page ap-detail-page">
    <div className="ap-wrap ap-detail-breadcrumbs"><Breadcrumbs items={[{ label: 'What we do', to: '/services' }, { label: s.name }]} /></div>
    <header className="ap-service-detail-intro ap-wrap">
      <div><h1>{s.headline}</h1><p>{s.philosophy}</p><Link className="ap-button" to={'/contact?service=' + serviceFormValues[s.slug]}>Let’s discuss your project <Icon name="right" /></Link></div>
      {evidence[0] ? <EvidencePreview project={evidence[0]} hero /> : <TraceabilityStage />}
    </header>

    <section className="ap-service-detail-scope ap-wrap">
      <div><h2>Built around<br /><span>what you need.</span></h2><p>The scope is agreed around your workflow, audience and operating requirements.</p></div>
      <ul className="ap-detail-capabilities">{s.includes.map(item => <li key={item}><Icon name="check" /><span>{item}</span></li>)}</ul>
    </section>

    <section className="ap-service-detail-process ap-wrap">
      <div className="ap-detail-section-heading"><h2>From understanding<br /><span>to handover.</span></h2><p>A connected process, with the product<br />visible as it takes shape.</p></div>
      <ol className="ap-detail-process">{s.process.map((step, index) => <li key={step}><span aria-hidden="true">{index + 1}</span><h3>{step}</h3></li>)}</ol>
    </section>

    {evidence.length > 0 && <section className="ap-service-detail-evidence ap-wrap">
      <div className="ap-detail-section-heading"><h2>See it in the work.</h2><Link className="ap-text-link" to="/projects">All projects <Icon name="right" /></Link></div>
      <div className="ap-related-projects">{evidence.map(project => <article key={project.slug}>
        <Link className="ap-related-project-link" to={'/projects/' + project.slug}>
          <EvidencePreview project={project} />
          <div><h3>{project.name}<Icon name="right" /></h3><p>{project.tagline}</p></div>
        </Link>
      </article>)}</div>
      <p className="ap-capture-note">Interface captures from September–October 2026. Product demonstrations use sample data.</p>
    </section>}

    <section className="ap-other-services ap-wrap">
      <h2>Connected disciplines.</h2>
      <nav aria-label="Other services">{serviceCatalog.filter(service => service.slug !== s.slug).map(service => <Link key={service.slug} to={'/services/' + service.slug}>{service.name}<Icon name="right" /></Link>)}</nav>
    </section>

    <section className="ap-contact-band ap-wrap">
      <div><h2>Let’s make it work.</h2><p>Start with your idea. We’ll shape the next step together.</p></div>
      <Link className="ap-button" to={'/contact?service=' + serviceFormValues[s.slug]}>Discuss your project <Icon name="right" /></Link>
    </section>
  </main>;
}
