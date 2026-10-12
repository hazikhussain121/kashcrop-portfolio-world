import { Link, useLoaderData, type LoaderFunctionArgs, type MetaFunction } from 'react-router';
import { getService, serviceCatalog, serviceFormValues } from '~/data/portfolio/services';
import { getProject } from '~/data/portfolio/catalog';
import { Icon } from '~/components/portfolio/Icon';
import { pageMeta } from '~/lib/portfolio/seo';
import { ServiceMedia } from './services';
import '~/styles/portfolio/overdrive-services.css';

export function loader({ params }: Pick<LoaderFunctionArgs, 'params' | 'request'>) {
  const service = getService(params.slug);
  if (!service) throw new Response('Service not found', { status: 404 });
  return { service };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => data?.service
  ? pageMeta(data.service.name, data.service.description, '/services/' + data.service.slug)
  : pageMeta('Service not found', 'Explore KashCrop services.', '/services');

export default function ServicePage() {
  const { service } = useLoaderData<typeof loader>();
  const evidence = service.projects.map(getProject).filter((project): project is NonNullable<typeof project> => !!project);
  const contactPath = '/contact?service=' + encodeURIComponent(serviceFormValues[service.slug]);

  return <main id="main" className="ods-page ods-detail-page">
    <header className="ods-detail-hero od-wrap">
      <nav className="ods-breadcrumb" aria-label="Breadcrumb"><Link to="/services"><Icon name="left" />All services</Link><span aria-current="page">{service.name}</span></nav>
      <div className="ods-detail-title"><h1>{service.name}<span aria-hidden="true">.</span></h1><Link className="ods-button" to={contactPath}>Discuss your project<Icon name="arrow" /></Link></div>
      <div className="ods-detail-opening">
        <div className="ods-detail-intro"><h2>{service.headline}</h2><p>{service.philosophy}</p><a className="ods-text-link" href="#scope">See what’s included<Icon name="down" /></a></div>
        <ServiceMedia service={service} priority />
      </div>
    </header>

    <section className="ods-scope od-wrap" id="scope" aria-labelledby="ods-scope-title">
      <div className="ods-detail-section-heading"><h2 id="ods-scope-title">What goes<br />into it.</h2><p>The scope follows your audience, workflow and operating requirements.</p></div>
      <ul className="ods-scope-list" role="list">{service.includes.map(item => <li key={item}><span>{item}</span><Icon name="check" /></li>)}</ul>
    </section>

    <section className="ods-process-section" aria-labelledby="ods-process-title">
      <div className="od-wrap">
        <div className="ods-process-heading"><h2 id="ods-process-title">A clear path<br />through the work.</h2><Link className="ods-text-link" to="/services#compare">Delivery &amp; support<Icon name="arrow" /></Link></div>
        <ol className="ods-process-list" role="list">{service.process.map((step, index) => <li key={step}><span className="ods-process-number" aria-hidden="true">{index + 1}</span><h3>{step}</h3></li>)}</ol>
      </div>
    </section>

    <section className="ods-detail-work od-wrap" aria-labelledby="ods-work-title">
      <div className="ods-detail-section-heading"><h2 id="ods-work-title">{evidence.length ? 'In the work.' : 'Project references.'}</h2><p>{service.proof.join(' · ')}</p></div>
      {evidence.length > 0 ? <div className="ods-evidence-list">{evidence.map(project => <Link className="ods-evidence-link" key={project.slug} to={'/projects/' + project.slug}>
        <div><h3>{project.name}</h3><p>{project.tagline}</p></div><Icon name="arrow" />
      </Link>)}</div> : <div className="ods-trace-reference"><p>Lot history, evidence capture and public proof pages, connected through a clear chain of custody.</p><Link className="ods-text-link" to={contactPath}>Discuss a traceability system<Icon name="arrow" /></Link></div>}
    </section>

    <section className="ods-other-services od-wrap" aria-labelledby="ods-other-title">
      <h2 id="ods-other-title">It all connects.</h2>
      <nav aria-label="Other services">{serviceCatalog.filter(item => item.slug !== service.slug).map(item => <Link key={item.slug} to={'/services/' + item.slug}>{item.name}<Icon name="arrow" /></Link>)}</nav>
    </section>

    <section className="ods-close ods-detail-close od-wrap" aria-labelledby="ods-detail-close-title">
      <h2 id="ods-detail-close-title">YOUR NEXT<br /><span>PROJECT?</span></h2>
      <Link to={contactPath} className="ods-close-link">Let’s talk<Icon name="arrow" /></Link>
    </section>
  </main>;
}
