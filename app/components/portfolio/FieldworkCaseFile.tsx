import { Link } from 'react-router';
import { media, projects, type Project } from '~/data/portfolio/catalog';
import { projectFilms } from '~/data/portfolio/films';
import { GalleryLink } from './UI';
import { Icon } from './Icon';

/**
 * A unified editorial case journal, with project-specific palette and archival
 * evidence. Different from the two bespoke, deeply art-directed case studies.
 */
export default function FieldworkCaseFile({project}: {project: Project}) {
  const film=projectFilms[project.slug];
  const first=project.screens[0];
  const image=first ? media(first.file) : film.poster;
  const imageWidth=first?.width ?? film.width;
  const imageHeight=first?.height ?? film.height;
  const next=projects[(projects.findIndex(p=>p.slug===project.slug)+1)%projects.length];
  const steps=project.workflow?.steps ?? project.features.slice(0,4);

  return <main id="main" className={`fw-other-case fw-other-${project.theme} fw-editorial-page`} data-project={project.theme}>
    <header className="fw-other-hero fw-edge">
      <div className="fw-editorial-rail"><Link to="/projects">← ALL CASE FILES</Link><span>{project.category.toUpperCase()} / {project.year}</span><span>ARCHIVE / KASHCROP</span></div>
      <div className="fw-other-title"><p>{project.kind}</p><h1>{project.name}</h1><span>{project.tagline}</span></div>
      <div className="fw-other-hero-bottom"><p>{project.summary}</p><a href="#the-system" className="fw-underlink">Explore the story <span aria-hidden="true">↘</span></a></div>
      <figure className="fw-other-stage ap-case-stage">
        <div className="fw-other-stage-rule" aria-hidden="true" />
        <div className="fw-other-stage-screen"><img src={image} alt={first?project.name+': '+first.name:'Interface demonstration for '+project.name+' using sample data'} width={imageWidth} height={imageHeight} fetchPriority="high" decoding="async" /></div>
        <figcaption>{first ? 'ACTUAL INTERFACE CAPTURE / SEPTEMBER 2026' : 'INTERFACE DEMONSTRATION / SYNTHETIC DATA / OCTOBER 2026'}</figcaption>
      </figure>
    </header>
    <section className="fw-other-story fw-edge" id="the-system">
      <div className="fw-editorial-rail"><span>THE BRIEF</span><span>01 / WHY THIS EXISTS</span></div>
      <div className="fw-other-story-body"><h2>THE IDEA<br/><em>IN PRACTICE.</em></h2><div>{project.overview.map(p=><p key={p}>{p}</p>)}</div></div>
    </section>
    <section className="fw-other-process fw-edge">
      <div className="fw-editorial-rail"><span>THE WORKFLOW</span><span>02 / HOW IT CONNECTS</span></div>
      <h2>ONE THING<br/><em>LEADS TO ANOTHER.</em></h2>
      {project.workflow && <p>{project.workflow.title}</p>}
      <ol>{steps.map((step,i)=><li key={step}><span>{String(i+1).padStart(2,'0')}</span><p>{step}</p></li>)}</ol>
    </section>
    <section className="fw-other-depth fw-edge">
      <div className="fw-editorial-rail"><span>UNDER THE SURFACE</span><span>03 / SYSTEM AND SCOPE</span></div>
      <div className="fw-other-depth-grid"><div><h2>BUILT FOR<br/><em>THE WHOLE JOB.</em></h2><p>{project.kind} — {project.scope.join(', ')}.</p></div>
        <div className="fw-other-depth-features"><ul>{project.features.map((feature,index)=><li key={feature}><span>{String(index+1).padStart(2,'0')}</span>{feature}</li>)}</ul></div>
      </div>
      <div className="fw-other-tech"><span>ROLE / {project.scope.join(' · ')}</span><span>TECHNOLOGY / {project.stack.join(' · ')}</span></div>
      {!!project.links.length && <div className="fw-other-links">{project.links.map(link=><a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<Icon name="right"/></a>)}</div>}
    </section>
    <section className="fw-other-sources fw-edge">
      <div className="fw-editorial-rail"><span>THE ORIGINAL MATERIAL</span><span>04 / SOURCE REGISTER</span></div>
      <h2>THE PROOF<br/><em>IS IN THE WORK.</em></h2>
      <p>Project records and interface demonstrations have been kept distinct. We don't treat a mock demonstration as evidence of a current deployment, adoption or validated scientific results.</p>
      {!!project.screens.length && <div className="fw-other-captures">{project.screens.map(screen=><GalleryLink key={screen.id} project={project} screen={screen}>Explore {screen.name}<Icon name="expand"/></GalleryLink>)}</div>}
      <details className="fw-other-evidence"><summary>About these product captures <Icon name="down"/></summary><p>{project.source}</p></details>
      {film && <details className="fw-other-evidence ap-film-disclosure" onToggle={event=>{if(!event.currentTarget.open)event.currentTarget.querySelector('video')?.pause()}}>
        <summary>Watch interface film <Icon name="right"/></summary>
        <div className="ap-film-content"><video controls muted playsInline preload="none" poster={film.poster} width={film.width} height={film.height} aria-label={film.title+' interface film'}><source src={film.src} type="video/mp4"/><a href={film.src}>Open interface recording</a></video><p>{film.caption}</p><p className="ap-film-provenance">{film.provenance}. Recorded from the interface using synthetic demonstration data. Not evidence of current release or real-world performance.</p>{film.mobile && <div className="fw-other-film-mobile"><a href={film.mobile.src}>Watch the mobile recording <Icon name="right"/></a><p>{film.mobile.caption}</p></div>}</div>
      </details>}
    </section>
    <section className="fw-other-next fw-edge"><p>NEXT / CASE FILE</p><Link to={'/projects/'+next.slug}><span>{next.name}</span><span aria-hidden="true">↗</span></Link></section>
  </main>;
}
