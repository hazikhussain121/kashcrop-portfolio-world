import { Link } from 'react-router';
import { media, projects, type Project, type Screen } from '~/data/portfolio/catalog';
import { projectFilms, type InterfaceFilmAsset } from '~/data/portfolio/films';
import { GalleryLink } from '../UI';
import { Icon } from '../Icon';
import '~/styles/portfolio/overdrive-projects.css';

function Capture({ screen, project, priority = false }: { screen: Screen; project: Project; priority?: boolean }) {
  return <img src={media(screen.file)} alt={`${project.name}: ${screen.name}`} width={screen.width} height={screen.height} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async" />;
}

function HeroArtwork({ project, film }: { project: Project; film: InterfaceFilmAsset }) {
  const first = project.screens.find(screen => screen.id === 'home') ?? project.screens[0];
  const phones = project.screens.filter(screen => screen.kind === 'Mobile').slice(0, 3);
  const actual = first ? <>
    {first.kind === 'Mobile' ? <div className="od-case-phones">
      {phones.map((screen, index) => <div key={screen.id} className={`od-case-stage-phone od-case-stage-phone-${index}`} aria-hidden={index > 0 ? true : undefined}>
        <Capture screen={screen} project={project} priority={index === 0} />
      </div>)}
    </div> : <div className="od-case-stage-wide"><Capture screen={first} project={project} priority /></div>}
    <span className="od-case-stage-action">Explore screens <Icon name="expand" /></span>
  </> : null;

  return <figure className="od-case-hero-figure">
    {first ? <GalleryLink project={project} screen={first} className={`od-case-stage od-case-stage-${first.kind.toLowerCase()}`} aria-label={`Explore ${project.name} interface captures`}>
      {actual}
    </GalleryLink> : <a className="od-case-stage od-case-stage-demo" href={film.poster} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.name} desktop demonstration still`}>
      <div className="od-case-stage-wide"><img src={film.poster} alt={`${project.name}: desktop interface demonstration using synthetic data`} width={film.width} height={film.height} fetchPriority="high" decoding="async" /></div>
      {film.mobile && <div className="od-case-demo-phone"><img src={film.mobile.poster} alt={`${project.name}: mobile interface demonstration using synthetic data`} width={film.mobile.width} height={film.mobile.height} decoding="async" /></div>}
      <span className="od-case-stage-action">Open still <Icon name="expand" /></span>
    </a>}
    <figcaption>
      <span>{first ? 'Actual interface capture · 20 September 2026' : 'Synthetic interface demonstration · 2 October 2026'}</span>
      <a href="#project-material">About this material <Icon name="down" /></a>
    </figcaption>
  </figure>;
}

function ScreenshotGallery({ project, film }: { project: Project; film: InterfaceFilmAsset }) {
  if (!project.screens.length) return <section className="od-case-gallery-section od-wrap" aria-labelledby="interface-gallery-title">
    <div className="od-case-section-heading">
      <h2 id="interface-gallery-title">Across the screens.</h2>
      <p>Still frames from the interface demonstration. The examples use synthetic data.</p>
    </div>
    <div className="od-case-demo-gallery">
      <figure>
        <a className="od-case-demo-still" href={film.poster} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.name} desktop demonstration still`}>
          <img src={film.poster} alt={`${project.name}: desktop interface demonstration with synthetic data`} width={film.width} height={film.height} loading="lazy" decoding="async" />
          <span className="od-case-gallery-open"><Icon name="expand" /></span>
        </a>
        <figcaption><h3>Desktop demonstration</h3><p>{film.caption}</p></figcaption>
      </figure>
      {film.mobile && <figure>
        <a className="od-case-demo-still od-case-demo-still-mobile" href={film.mobile.poster} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.name} mobile demonstration still`}>
          <img src={film.mobile.poster} alt={`${project.name}: mobile interface demonstration with synthetic data`} width={film.mobile.width} height={film.mobile.height} loading="lazy" decoding="async" />
          <span className="od-case-gallery-open"><Icon name="expand" /></span>
        </a>
        <figcaption><h3>Mobile demonstration</h3><p>{film.mobile.caption}</p></figcaption>
      </figure>}
    </div>
  </section>;

  return <section className="od-case-gallery-section od-wrap" aria-labelledby="interface-gallery-title">
    <div className="od-case-section-heading">
      <h2 id="interface-gallery-title">Take a closer look.</h2>
      <p>Open a capture to explore the complete interface.</p>
    </div>
    <div className={`od-case-gallery${project.screens.length === 1 ? ' od-case-gallery-single' : ''}`}>
      {project.screens.map(screen => <figure key={screen.id} className={`od-case-gallery-item od-case-gallery-item-${screen.kind.toLowerCase()}`} id={`screen-${screen.id}`}>
        <GalleryLink project={project} screen={screen} className="od-case-gallery-image" aria-label={`Explore ${screen.name} at full size`}>
          <div className="od-case-gallery-viewport"><Capture screen={screen} project={project} /></div>
          <span className="od-case-gallery-open"><Icon name="expand" /></span>
        </GalleryLink>
        <figcaption>
          <h3><GalleryLink project={project} screen={screen}>{screen.name}<Icon name="arrow" /></GalleryLink></h3>
          <p>{screen.caption}</p>
          <a className="od-case-original" href={media(screen.file)} target="_blank" rel="noopener noreferrer">Open original capture <Icon name="expand" /></a>
        </figcaption>
      </figure>)}
    </div>
  </section>;
}

function InterfaceRecording({ film }: { film: InterfaceFilmAsset }) {
  return <details className="od-case-film" id="interface-film" onToggle={event => {
    if (!event.currentTarget.open) event.currentTarget.querySelectorAll('video').forEach(video => video.pause());
  }}>
    <summary><span>Watch the interface film</span><Icon name="right" /></summary>
    <div className="od-case-film-content">
      <video controls muted playsInline preload="none" poster={film.poster} width={film.width} height={film.height} aria-label={`${film.title} interface demonstration`}>
        <source src={film.src} type="video/mp4" />
        <a href={film.src}>Open interface recording</a>
      </video>
      <p>{film.caption}</p>
      <p>{film.provenance}. This recording uses synthetic demonstration data; it does not establish current release status or real-world performance.</p>
      {film.mobile && <a className="od-project-text-link" href={film.mobile.src} target="_blank" rel="noopener noreferrer">Watch the mobile recording <Icon name="arrow" /></a>}
    </div>
  </details>;
}

export default function ProjectCase({ project }: { project: Project }) {
  const film = projectFilms[project.slug];
  const next = projects[(projects.findIndex(item => item.slug === project.slug) + 1) % projects.length];
  const nextScreen = next.screens.find(screen => screen.id === 'home') ?? next.screens[0];
  const nextFilm = projectFilms[next.slug];

  return <main id="main" className={`od-case od-case-${project.slug}`}>
    <header className="od-case-hero od-wrap">
      <div className="od-case-navigation">
        <Link to="/projects"><Icon name="left" />All work</Link>
        <p>{project.category}<span aria-hidden="true"> / </span>{project.year}</p>
      </div>
      <h1>{project.name}</h1>
      <div className="od-case-introduction">
        <p>{project.summary}</p>
        <ul aria-label="Project scope">{project.scope.map(item => <li key={item}>{item}</li>)}</ul>
      </div>
      <HeroArtwork project={project} film={film} />
    </header>

    <section className="od-case-story od-wrap" aria-labelledby="project-story-title">
      <h2 id="project-story-title">{project.tagline}</h2>
      <div className="od-case-story-copy">{project.overview.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
      <dl className="od-case-facts">{project.facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>
    </section>

    <ScreenshotGallery project={project} film={film} />

    {project.workflow && <section className="od-case-flow" aria-labelledby="project-flow-title">
      <div className="od-wrap">
        <div className="od-case-section-heading"><h2 id="project-flow-title">How it works.</h2><p>{project.workflow.title}</p></div>
        <ol>{project.workflow.steps.map((step, index) => <li key={step}><p>{step}</p>{index < project.workflow!.steps.length - 1 && <Icon name="right" />}</li>)}</ol>
      </div>
    </section>}

    <section className="od-case-capabilities od-wrap" aria-labelledby="project-capabilities-title">
      <div className="od-case-capabilities-heading"><h2 id="project-capabilities-title">Built around<br />the job.</h2><p>{project.kind}.</p></div>
      <ul className="od-case-feature-list">{project.features.map(feature => <li key={feature}><Icon name="check" /><span>{feature}</span></li>)}</ul>
      <div className="od-case-technology"><h3>Technology</h3><p>{project.stack.join(' · ')}</p></div>
    </section>

    <section className="od-case-material od-wrap" id="project-material" aria-labelledby="project-material-title">
      <div className="od-case-material-intro"><h2 id="project-material-title">From the product.</h2><p>{project.source}</p></div>
      {project.links.length > 0 && <div className="od-case-references" aria-label="Project links and references">
        {project.links.map(link => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<Icon name="arrow" /></a>)}
      </div>}
      <InterfaceRecording film={film} />
    </section>

    <section className="od-case-next od-wrap" aria-labelledby="next-project-title">
      <h2 id="next-project-title">Next project</h2>
      <Link to={'/projects/' + next.slug} className="od-case-next-link">
        <div className="od-case-next-image"><img src={nextScreen ? media(nextScreen.file) : nextFilm.poster} alt={nextScreen ? `${next.name}: ${nextScreen.name}` : `${next.name}: synthetic interface demonstration`} width={nextScreen?.width ?? nextFilm.width} height={nextScreen?.height ?? nextFilm.height} loading="lazy" decoding="async" /></div>
        <span>{next.name}</span><Icon name="arrow" />
      </Link>
      <p>{next.summary}</p>
    </section>
  </main>;
}
