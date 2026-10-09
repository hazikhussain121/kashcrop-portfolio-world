import { Link } from 'react-router';
import { media, type Project } from '~/data/portfolio/catalog';
import { projectFilms } from '~/data/portfolio/films';
import { GalleryLink } from './UI';
import { Icon } from './Icon';

/** A distinct editorial case file, with the original interface captures and provenance intact. */
export default function FieldworkClinic({ project }: {project: Project}) {
  const film = projectFilms[project.slug];
  const [home, report, guide] = project.screens;
  return <main id="main" className="fw-clinic-case fw-editorial-page">
    <header className="fw-clinic-case-hero fw-edge">
      <div className="fw-editorial-rail"><Link to="/projects">← ALL CASE FILES</Link><span>KC / 02 — APPLIED AI</span><span>IN COLLABORATION WITH SKUAST-KASHMIR</span></div>
      <div className="fw-clinic-case-head"><p>FIELD REPORT / 2026</p><h1>THE PLANT<br/><em>HEALTH CLINIC.</em></h1></div>
      <div className="fw-clinic-case-intro"><p>A way to bring field observations and specialist expertise into the same workflow.</p><GalleryLink project={project} screen={home} className="fw-underlink">Explore the interface <span aria-hidden="true">↗</span></GalleryLink></div>
      <div className="fw-clinic-stage" aria-label="Plant Health Clinic actual application screens">
        <div className="fw-clinic-stage-grid" aria-hidden="true" />
        <span className="fw-clinic-stage-cross" aria-hidden="true">+</span>
        <span className="fw-clinic-stage-meta" aria-hidden="true">KASHMIR / FIELD OBSERVATION / HUMAN REVIEW</span>
        <div className="fw-clinic-stage-phone fw-clinic-stage-first"><img src={media(report.file)} width={report.width} height={report.height} alt="Actual crop case reporting interface" decoding="async" fetchPriority="high"/></div>
        <div className="fw-clinic-stage-phone fw-clinic-stage-second"><img src={media(home.file)} width={home.width} height={home.height} alt="Actual Plant Health Clinic farmer home interface" decoding="async"/></div>
        <span className="fw-clinic-stage-foot">REAL PRODUCT CAPTURE / SEPTEMBER 2026</span>
      </div>
    </header>
    <section className="fw-clinic-context fw-edge">
      <div className="fw-editorial-rail"><span>THE CONTEXT</span><span>01 / FROM FIELD TO EXPERT</span></div>
      <div className="fw-clinic-context-copy"><h2>SEE THE<br/>PROBLEM.<br/><em>FIND THE NEXT STEP.</em></h2><div>{project.overview.map(paragraph=><p key={paragraph}>{paragraph}</p>)}</div></div>
    </section>
    <section className="fw-clinic-process fw-edge" aria-label="Three actual workflows">
      <div className="fw-editorial-rail"><span>WHAT IT TAKES</span><span>02 / REAL INTERFACES</span></div>
      <h2>THE CASE,<br/><em>STEP BY STEP.</em></h2>
      <div className="fw-clinic-process-list">
        {[
          {screen:home,step:'01',title:'A clearer starting point.',description:'A farmer-facing home that makes it easy to begin reporting a crop concern.'},
          {screen:report,step:'02',title:'The right field detail.',description:'The case is documented with evidence and context before expert review.'},
          {screen:guide,step:'03',title:'Better evidence.',description:'Practical guidance helps the farmer capture usable images.'},
        ].map((scene,index)=><article className={`fw-clinic-process-row fw-clinic-process-row-${index+1}`} key={scene.step}>
          <div className="fw-clinic-process-copy"><span>{scene.step} / SCREEN RECORD</span><h3>{scene.title}</h3><p>{scene.description}</p><GalleryLink project={project} screen={scene.screen} className="fw-underlink">Inspect the real screen <span aria-hidden="true">↗</span></GalleryLink></div>
          <GalleryLink project={project} screen={scene.screen} className="fw-clinic-process-picture" aria-label={'Inspect Plant Health Clinic: '+scene.screen.name}><img src={media(scene.screen.file)} alt={scene.screen.name+' interface capture'} width={scene.screen.width} height={scene.screen.height} loading="lazy" decoding="async"/><span>UI EVIDENCE / {scene.step}</span></GalleryLink>
        </article>)}
      </div>
    </section>
    <section className="fw-clinic-proof fw-edge">
      <div className="fw-editorial-rail"><span>THE CONNECTED SYSTEM</span><span>03 / ENGINEERING</span></div>
      <div className="fw-clinic-proof-head"><h2>SOFTWARE<br/><em>WITH A HUMAN IN THE LOOP.</em></h2><p>The application connects practical case intake with reference retrieval, expert review and follow-up. AI prepares a draft. Experts decide what gets sent.</p></div>
      <ol>{project.features.map((feature,index)=><li key={feature}><span>{String(index+1).padStart(2,'0')}</span><p>{feature}</p></li>)}</ol>
      <p className="fw-clinic-tech">PROJECT ROLE / {project.scope.join(' · ')}<br/>TECHNOLOGY / {project.stack.join(' · ')}</p>
      <div className="fw-clinic-links">{project.links.map(link=><a href={link.href} key={link.href} target="_blank" rel="noopener noreferrer">{link.label}<Icon name="arrow"/></a>)}</div>
    </section>
    <section className="fw-clinic-record fw-edge">
      <div className="fw-editorial-rail"><span>THE ORIGINAL MATERIAL</span><span>04 / SOURCE AND RECORDING</span></div>
      <h2>NO STOCK<br/><em>PRODUCT SHOTS.</em></h2><p>These captures show implemented review-build interface work. They do not establish diagnostic accuracy or current release status.</p>
      <div className="fw-clinic-capture-links">{project.screens.map(screen=><GalleryLink project={project} screen={screen} key={screen.id}>{screen.name}<Icon name="expand"/></GalleryLink>)}</div>
      <details className="fw-clinic-evidence"><summary>About these product captures <Icon name="down"/></summary><p>{project.source}</p></details>
      {film && <details className="fw-clinic-evidence ap-film-disclosure" onToggle={event=>{if(!event.currentTarget.open)event.currentTarget.querySelector('video')?.pause()}}>
        <summary>Watch interface film <Icon name="right"/></summary>
        <div className="ap-film-content"><video controls muted playsInline preload="none" poster={film.poster} width={film.width} height={film.height} aria-label={film.title + ' interface film'}><source src={film.src} type="video/mp4" /><a href={film.src}>Open interface recording</a></video><p>{film.caption}</p><p className="ap-film-provenance">{film.provenance}. This synthetic interface demonstration uses demonstration data, not validated AI accuracy or proof of live release.</p>{film.mobile && <a href={film.mobile.src}>Watch the mobile recording</a>}</div>
      </details>}
    </section>
    <section className="fw-clinic-next fw-edge"><span>BACK TO THE WORK</span><Link to="/projects">MORE PROBLEMS.<br/><em>MORE REAL SOLUTIONS.</em><span aria-hidden="true">↗</span></Link></section>
  </main>;
}
