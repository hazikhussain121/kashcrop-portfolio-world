import { Link } from 'react-router';
import { GalleryLink } from './UI';
import { Icon } from './Icon';
import { media, type Project } from '~/data/portfolio/catalog';
import { projectFilms } from '~/data/portfolio/films';

/** An editorial case file made from documented project work, not invented KPI cards. */
export default function FieldworkBaghBani({ project }: { project: Project }) {
  const screens = project.screens;
  const film = projectFilms[project.slug];
  const home = screens.find(screen => screen.id === 'home')!;
  const setup = screens.find(screen => screen.id === 'orchard-setup')!;
  const calendar = screens.find(screen => screen.id === 'calendar')!;
  const desktop = screens.find(screen => screen.id === 'desktop')!;

  return <main id="main" className="fw-case fw-baghban" aria-label="BaghBani case study">
    <section className="fw-case-hero" aria-labelledby="fw-case-title">
      <div className="fw-case-topline fw-rail"><Link to="/projects" className="fw-case-back">← All work</Link><span>CASE FILE / 001</span><span>ORCHARD SERVICES · 2026</span></div>
      <div className="fw-case-title-wrap">
        <p>Independent software, rooted in real problems.</p>
        <h1 id="fw-case-title">Bagh<span>Bani</span></h1>
        <span className="fw-case-superscript" aria-hidden="true">®</span>
      </div>
      <div className="fw-case-hero-grid">
        <div className="fw-case-intro-blurb">
          <span>AN ORCHARD, BROUGHT TOGETHER / 001</span>
          <p>One working home for the many moving parts of growing.</p>
          <GalleryLink project={project} screen={home} className="fw-case-explore">Inspect the real interface <Icon name="expand" /></GalleryLink>
        </div>
        <div className="fw-case-object">
          <span className="fw-case-target fw-case-target-a" aria-hidden="true" />
          <span className="fw-case-target fw-case-target-b" aria-hidden="true" />
          <div className="fw-case-object-back fw-phone"><img src={media(calendar.file)} alt="" width={calendar.width} height={calendar.height} decoding="async" loading="eager" /></div>
          <div className="fw-case-object-front fw-phone"><img src={media(home.file)} alt="BaghBani's actual farmer home screen, showing specialist consultations and orchard services" width={home.width} height={home.height} decoding="async" fetchPriority="high" /></div>
          <span className="fw-case-object-label">CAPTURE / REVIEW BUILD / SEPTEMBER 2026</span>
        </div>
        <div className="fw-case-hero-side"><span>FIELD NOTES / 01—03</span><p>From finding specialist help to planning orchard work, the design stays close to what a grower actually needs.</p></div>
      </div>
      <div className="fw-case-hero-bottom fw-rail"><span>PRODUCT DESIGN</span><span>FULL-STACK ENGINEERING</span><span>GROWER EXPERIENCE</span><a href="#the-story">SCROLL TO EXPLORE ↓</a></div>
    </section>

    <section className="fw-case-chapter fw-case-context" id="the-story" aria-labelledby="fw-case-context-title">
      <div className="fw-case-chapter-index"><span>01 / THE CONTEXT</span><span>THE BRIEF, WITHOUT THE BUZZWORDS</span></div>
      <div className="fw-case-context-layout">
        <h2 id="fw-case-context-title">Farming is<br />complicated.<br /><em>The software<br />shouldn’t be.</em></h2>
        <div><span className="fw-case-star" aria-hidden="true">✳</span>{project.overview.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
      </div>
    </section>

    <section className="fw-case-experience" aria-labelledby="fw-case-experience-title">
      <div className="fw-case-chapter-index"><span>02 / THE EXPERIENCE</span><span>DESIGNED AROUND THE GROWER</span></div>
      <div className="fw-case-experience-intro"><h2 id="fw-case-experience-title">Every detail<br /><em>has a job.</em></h2><p>Not a moodboard. The actual interfaces, built to make each next step easier to find.</p></div>
      <div className="fw-case-scenes">
        <article className="fw-case-scene fw-case-scene-one">
          <div className="fw-case-scene-text"><span>01 / UNDERSTAND</span><h3>See the service.<br /><em>Then decide.</em></h3><p>An orchard service should explain the scope before asking a grower to share details.</p><GalleryLink project={project} screen={setup} className="fw-case-screen-link">Explore the actual service flow <span aria-hidden="true">↗</span></GalleryLink></div>
          <GalleryLink project={project} screen={setup} className="fw-case-scene-visual fw-case-scene-visual-tall" aria-label="Inspect BaghBani orchard service screen"><img src={media(setup.file)} alt="BaghBani orchard service explainer and request flow" width={setup.width} height={setup.height} loading="lazy" decoding="async" /><span className="fw-case-photo-index">UI CAPTURE / 01</span></GalleryLink>
        </article>
        <article className="fw-case-scene fw-case-scene-two">
          <GalleryLink project={project} screen={calendar} className="fw-case-scene-visual fw-case-scene-visual-tall" aria-label="Inspect BaghBani seasonal calendar screen"><img src={media(calendar.file)} alt="BaghBani seasonal orchard calendar interface" width={calendar.width} height={calendar.height} loading="lazy" decoding="async" /><span className="fw-case-photo-index">UI CAPTURE / 02</span></GalleryLink>
          <div className="fw-case-scene-text"><span>02 / PLAN</span><h3>Every season<br /><em>in its place.</em></h3><p>Calendar and seasonal guidance sit alongside the tools a grower already needs.</p><GalleryLink project={project} screen={calendar} className="fw-case-screen-link">Explore the calendar <span aria-hidden="true">↗</span></GalleryLink></div>
        </article>
        <article className="fw-case-scene fw-case-scene-three">
          <div className="fw-case-scene-text"><span>03 / CONNECT</span><h3>Built to live<br /><em>beyond the phone.</em></h3><p>The same connected orchard experience adapts to a wider screen, without losing the thread.</p><GalleryLink project={project} screen={desktop} className="fw-case-screen-link">Explore the desktop interface <span aria-hidden="true">↗</span></GalleryLink></div>
          <GalleryLink project={project} screen={desktop} className="fw-case-scene-visual fw-case-desktop-visual" aria-label="Inspect BaghBani desktop screen"><img src={media(desktop.file)} alt="Actual BaghBani desktop interface" width={desktop.width} height={desktop.height} loading="lazy" decoding="async" /><span className="fw-case-photo-index">UI CAPTURE / 03</span></GalleryLink>
        </article>
      </div>
    </section>

    <section className="fw-case-delivery" aria-labelledby="fw-case-delivery-title">
      <div className="fw-case-chapter-index"><span>03 / UNDER THE SURFACE</span><span>DESIGN IS ONLY THE BEGINNING</span></div>
      <div className="fw-case-delivery-heading"><h2 id="fw-case-delivery-title">More than<br /><em>a nice screen.</em></h2><p>From services and consultations to the underlying infrastructure, the product is an interconnected system.</p></div>
      <ol>{project.features.map((feature, index) => <li key={feature}><span>{String(index + 1).padStart(2, '0')}</span><p>{feature}</p><span aria-hidden="true">↗</span></li>)}</ol>
      <div className="fw-case-delivery-footer"><p>PROJECT ROLE / {project.scope.join(' · ')}</p><p>TECHNOLOGY / {project.stack.join(' · ')}</p></div>
    </section>

    <section className="fw-case-evidence" aria-labelledby="fw-case-evidence-title">
      <div className="fw-case-chapter-index"><span>04 / SOURCE MATERIAL</span><span>SHOWING THE REAL WORK</span></div>
      <h2 id="fw-case-evidence-title">The evidence<br /><em>is in the details.</em></h2>
      <p>All five original interface captures are available to inspect, including the complete long-page views.</p>
      <div className="fw-case-evidence-gallery">
        {screens.map(screen => <GalleryLink key={screen.id} project={project} screen={screen} className="fw-case-evidence-item">
          <span>{screen.name} <Icon name="expand" /></span><span className="fw-case-evidence-caption">{screen.caption}</span>
        </GalleryLink>)}
      </div>
      <details className="fw-case-provenance"><summary>About these product captures <Icon name="down" /></summary><p>{project.source}</p></details>
      {film && <details className="fw-case-film ap-film-disclosure" onToggle={event => { if (!event.currentTarget.open) event.currentTarget.querySelector('video')?.pause(); }}>
        <summary>Watch interface film <Icon name="right" /></summary>
        <div className="ap-film-content">
          <video controls muted playsInline preload="none" poster={film.poster} width={film.width} height={film.height} aria-label={film.title + ' interface film'}><source src={film.src} type="video/mp4" /><a href={film.src}>Open the interface recording</a></video>
          <p>{film.caption}</p>
          <p className="ap-film-provenance">{film.provenance}. Recorded from the implemented interface, using demonstration data. This is a review-build recording, not a claim of current public release.</p>
          {film.mobile && <div><a className="fw-case-screen-link" href={film.mobile.src}>Watch the mobile recording <span aria-hidden="true">↗</span></a><p>{film.mobile.caption}</p></div>}
        </div>
      </details>}
    </section>

    <section className="fw-case-next">
      <span>NEXT CASE / 002</span><Link to="/projects/plant-health-clinic"><span>Plant Health<br /><em>Clinic.</em></span><span aria-hidden="true">↗</span></Link>
      <p>From orchard care to crop diagnosis. Keep exploring the work.</p>
    </section>
  </main>;
}
