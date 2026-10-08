import { Link, redirect, useLoaderData, type LoaderFunctionArgs, type MetaFunction } from 'react-router';
import { getProject, media, projectAliases, projects, type Project } from '~/data/portfolio/catalog';
import { serviceCatalog } from '~/data/portfolio/services';
import { projectFilms } from '~/data/portfolio/films';
import { Breadcrumbs, GalleryLink } from '~/components/portfolio/UI';
import { Icon } from '~/components/portfolio/Icon';
import { breadcrumbSchema, pageMeta } from '~/lib/portfolio/seo';

export function loader({ params, request }: Pick<LoaderFunctionArgs, 'params' | 'request'>) {
  const slug = params.slug ?? '';
  if (projectAliases[slug]) throw redirect('/projects/' + projectAliases[slug] + new URL(request.url).search, 301);
  const project = getProject(slug);
  if (!project) throw new Response('Project not found', { status: 404 });
  return { project };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => data?.project ? [
  ...pageMeta(data.project.name, data.project.summary, '/projects/' + data.project.slug),
  { 'script:ld+json': breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Selected work', path: '/projects' }, { name: data.project.name, path: '/projects/' + data.project.slug }]) },
] : pageMeta('Project not found', 'Return to the KashCrop portfolio.', '/projects');

function ProjectStage({ project }: { project: Project }) {
  const film = projectFilms[project.slug];
  const phones = project.screens.filter(screen => screen.kind === 'Mobile');
  const showPhone = phones.length > 0 || (!['trace-amp', 'skiie'].includes(project.slug) && !!film?.mobile);
  const first = phones[0];
  const phoneSrc = first ? media(first.file) : film?.mobile?.poster;

  if (showPhone) {
    return <div className="ap-case-stage ap-case-stage-phones">
      {phones[1] ? <div className="ap-preview-phone ap-case-phone-back" aria-hidden="true"><img src={media(phones[1].file)} alt="" width={phones[1].width} height={phones[1].height} loading="lazy" decoding="async" /></div>
        : film && <div className="ap-preview-browser ap-case-browser-back" aria-hidden="true"><img src={film.poster} alt="" width={film.width} height={film.height} loading="lazy" decoding="async" /></div>}
      <div className="ap-preview-phone ap-case-phone-front"><img src={phoneSrc} alt={first ? project.name + ': ' + first.name : project.name + ' interface demonstration'} width={first?.width ?? film?.mobile?.width} height={first?.height ?? film?.mobile?.height} decoding="async" /></div>
      <p className="ap-visual-note">{first ? 'Actual product interface · September 2026' : 'Interface demonstration · Sample data · October 2026'}</p>
    </div>;
  }

  const screen = project.screens[0];
  return <div className={'ap-case-stage ap-case-stage-desktop' + (project.slug === 'skiie' ? ' ap-case-stage-campus' : '')}>
    <div className="ap-preview-browser ap-case-browser">
      <div className="ap-browser-bar" aria-hidden="true"><span className="ap-browser-dots"><i /><i /><i /></span><span>{project.slug === 'skiie' ? 'skiie.co.in' : project.name}</span><Icon name="link" /></div>
      <div className="ap-browser-content"><img src={screen ? media(screen.file) : film?.poster} alt={project.name + (screen ? ': ' + screen.name : ' interface demonstration using sample data')} width={screen?.width ?? film?.width} height={screen?.height ?? film?.height} decoding="async" /></div>
    </div>
    <p className="ap-visual-note">{screen ? 'Actual product interface · September 2026' : 'Interface demonstration · Sample data · October 2026'}</p>
  </div>;
}

export default function ProjectPage() {
  const { project: p } = useLoaderData<typeof loader>();
  const next = projects[(projects.findIndex(project => project.slug === p.slug) + 1) % projects.length];
  const services = serviceCatalog.filter(service => service.projects.includes(p.slug));
  const film = projectFilms[p.slug];
  const facts = p.facts.length ? p.facts : [{ label: 'Discipline', value: p.category }, { label: 'Work', value: p.kind }, { label: 'Role', value: p.scope.join(' + ') }];

  return <main id="main" className="ap-page ap-detail-page" data-project={p.theme}>
    <div className="ap-wrap ap-detail-breadcrumbs"><Breadcrumbs items={[{ label: 'Selected work', to: '/projects' }, { label: p.name }]} /></div>
    <header className="ap-case-intro ap-wrap">
      <h1>{p.name}</h1>
      <p className="ap-case-tagline">{p.tagline}</p>
      <p className="ap-case-summary">{p.summary}</p>
      <div className="ap-case-actions">
        {p.screens.length > 0 && <GalleryLink project={p} className="ap-button">Explore the screens <Icon name="expand" /></GalleryLink>}
        {p.links.filter(link => link.kind === 'website').slice(0, 1).map(link => <a key={link.href} className="ap-text-link" href={link.href} target="_blank" rel="noopener noreferrer">Open website <Icon /></a>)}
      </div>
    </header>

    <section className="ap-wrap" aria-label={p.name + ' product presentation'}>
      <ProjectStage project={p} />
      <div className="ap-case-capture-details">
        <details className="ap-disclosure"><summary>About these product captures<Icon name="down" /></summary><p>{p.source}</p></details>
        {film && <details className="ap-disclosure ap-film-disclosure" onToggle={event => { if (!event.currentTarget.open) event.currentTarget.querySelector('video')?.pause(); }}>
          <summary>Watch interface film<Icon name="right" /></summary>
          <div className="ap-film-content">
            <video controls muted playsInline preload="none" poster={film.poster} width={film.width} height={film.height} aria-label={film.title + ' interface film'}><source src={film.src} type="video/mp4" /><a href={film.src}>Open the interface recording</a></video>
            <p>{film.caption}</p>
            <p className="ap-film-provenance">{film.provenance}. Recorded from the implemented interface, using demonstration data. This is a review-build recording, not a claim of current public release.</p>
            {film.mobile && <div className="ap-mobile-film-link"><a className="ap-text-link" href={film.mobile.src}>Watch the mobile recording <Icon name="right" /></a><p>{film.mobile.caption}</p></div>}
          </div>
        </details>}
      </div>
    </section>

    <section className="ap-case-facts ap-wrap" aria-label="Project facts">
      <dl>{facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>
      <p>{p.category} · {p.year}</p>
    </section>

    <section className="ap-case-story ap-wrap">
      <h2>Built around<br /><span>the actual work.</span></h2>
      <div>{p.overview.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
    </section>

    {p.screens.length > 0 && <section className="ap-case-gallery ap-wrap" aria-labelledby="screen-gallery-title">
      <div className="ap-detail-section-heading"><h2 id="screen-gallery-title">The interface.<br /><span>Up close.</span></h2><p>Open a screen to see the details.<br />Longer pages scroll inside the viewer.</p></div>
      <div className="ap-case-screen-grid">{p.screens.map(screen => <figure id={'screen-' + screen.id} className={'ap-case-screen' + (screen.kind === 'Desktop' ? ' ap-case-screen-wide' : '')} key={screen.id}>
        <GalleryLink project={p} screen={screen} className="ap-case-screen-image" aria-label={'Inspect ' + p.name + ': ' + screen.name}>
          <img src={media(screen.file)} alt={p.name + ': ' + screen.name} width={screen.width} height={screen.height} loading="lazy" decoding="async" />
          <span><Icon name="expand" />Inspect screen</span>
        </GalleryLink>
        <figcaption><h3>{screen.name}</h3><p>{screen.caption}</p></figcaption>
      </figure>)}</div>
    </section>}

    <section className="ap-case-engineering ap-wrap">
      <div>
        <h2>The details.<br /><span>All connected.</span></h2>
        <h3>Project scope</h3>
        <ul className="ap-detail-tags" aria-label="Project scope">{p.scope.map(item => <li key={item}>{item}</li>)}</ul>
        <h3>Technologies</h3>
        <ul className="ap-detail-tags" aria-label="Project technologies">{p.stack.map(item => <li key={item}>{item}</li>)}</ul>
      </div>
      <div><h3>What the system brings together</h3><ul className="ap-detail-capabilities">{p.features.map(feature => <li key={feature}><Icon name="check" /><span>{feature}</span></li>)}</ul></div>
    </section>

    {p.workflow && <section className="ap-case-workflow ap-wrap">
      <div className="ap-detail-section-heading"><h2>How it<br /><span>comes together.</span></h2><p>{p.workflow.title}</p></div>
      <ol className="ap-detail-process">{p.workflow.steps.map((step, index) => <li key={step}><span aria-hidden="true">{index + 1}</span><p>{step}</p></li>)}</ol>
    </section>}

    {(p.links.length > 0 || services.length > 0) && <section className="ap-detail-connections ap-wrap">
      <div><h2>Explore further.</h2><p>Project references and the disciplines behind the work.</p></div>
      <div>{p.links.map(link => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<Icon /></a>)}{services.map(service => <Link key={service.slug} to={'/services/' + service.slug}>{service.name} at KashCrop<Icon /></Link>)}</div>
    </section>}

    <section className="ap-next-project ap-wrap">
      <Link to={'/projects/' + next.slug}><div><p>Next in the collection</p><h2>{next.name}</h2><span>{next.tagline}</span></div><Icon name="right" /></Link>
    </section>
  </main>;
}
