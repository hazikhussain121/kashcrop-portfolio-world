import { Form, Link, useSearchParams, type MetaFunction } from 'react-router';
import { categories, findProjects, media, projects, type Project } from '~/data/portfolio/catalog';
import { projectFilms } from '~/data/portfolio/films';
import { GalleryLink } from '~/components/portfolio/UI';
import { Icon } from '~/components/portfolio/Icon';
import { pageMeta } from '~/lib/portfolio/seo';

export const meta: MetaFunction = () => pageMeta('Selected work', 'Real projects, real interfaces and practical software systems. Explore the work of KashCrop Innovations.', '/projects');

const numbers = Object.fromEntries(projects.map((project, index) => [project.slug, String(index + 1).padStart(2, '0')]));

function WorkArtifact({project, priority}: {project: Project; priority: boolean}) {
  const actual = project.screens.find(screen => screen.id === 'home') ?? project.screens[0];
  const second = project.screens.filter(screen => screen.kind === 'Mobile').find(screen => screen.id !== actual?.id);
  const film = projectFilms[project.slug];
  const desktop = actual?.kind === 'Desktop' || (!actual && ['skiie','trace-amp'].includes(project.slug));
  return <div className={`fw-index-artifact fw-index-artifact-${project.theme}`}>
    {actual?.kind === 'Mobile' && <div className="fw-index-phone fw-index-primary"><img src={media(actual.file)} alt={project.name + ' actual interface capture'} width={actual.width} height={actual.height} loading={priority ? 'eager' : 'lazy'} decoding={priority ? 'sync' : 'async'} /></div>}
    {second && <div className="fw-index-phone fw-index-secondary" aria-hidden="true"><img src={media(second.file)} alt="" width={second.width} height={second.height} loading={priority ? 'eager' : 'lazy'} decoding={priority ? 'sync' : 'async'} /></div>}
    {desktop && <div className="fw-index-desktop"><img src={actual ? media(actual.file) : film.poster} alt={project.name + (actual ? ' actual interface capture' : ' interface demonstration using sample data')} width={actual?.width ?? film.width} height={actual?.height ?? film.height} loading="lazy" decoding="async" /></div>}
    {!actual && !desktop && <div className="fw-index-demo"><img src={film.poster} alt={project.name + ' product interface demonstration using sample data'} width={film.width} height={film.height} loading="lazy" decoding="async" /></div>}
    <span className="fw-index-artifact-note">{actual ? 'REAL INTERFACE CAPTURE' : 'INTERFACE DEMONSTRATION / SAMPLE DATA'} <span aria-hidden="true">↗</span></span>
  </div>;
}

export default function Projects() {
  const [params] = useSearchParams();
  const query = params.get('q') ?? '';
  const category = params.get('category') ?? '';
  const selectedCategory = categories.includes(category as typeof categories[number]) ? category : '';
  const result = findProjects(query, selectedCategory);
  function filterURL(value: string) {
    const next = new URLSearchParams();
    if (query) next.set('q', query);
    if (value) next.set('category', value);
    return '/projects' + (next.size ? '?' + next.toString() : '');
  }
  return <main id="main" className="fw-index fw-editorial-page">
    <header className="fw-index-hero fw-edge">
      <div className="fw-editorial-rail"><span>THE PROJECT ARCHIVE</span><span>INDEPENDENT BY DESIGN / 2026</span></div>
      <div className="fw-index-hero-content"><h1>NOT JUST<br/><em>LOOKING GOOD.</em><br/>DOING GOOD WORK.</h1><div><p>Six project stories. Different realities, different constraints. The work is always the point.</p><a href="#the-work" className="fw-underlink">Explore the projects <span aria-hidden="true">↘</span></a></div></div>
      <div className="fw-index-hero-bottom"><span>CASE NOTES / SOFTWARE / SYSTEMS</span><span>↓  KEEP SCROLLING</span></div>
    </header>
    <section className="fw-index-library fw-edge" id="the-work" aria-label="Browse projects">
      <div className="fw-index-filterbar">
        <nav className="fw-index-filterlist" aria-label="Filter projects by discipline">
          <Link to={filterURL('')} aria-current={!selectedCategory ? 'page' : undefined}>All work <span>{projects.length}</span></Link>
          {categories.map(item => <Link key={item} to={filterURL(item)} aria-current={selectedCategory === item ? 'page' : undefined}>{item}</Link>)}
        </nav>
        <Form method="get" role="search" className="fw-index-search">
          <label className="sr-only" htmlFor="project-search">Find a project</label>
          <Icon name="search" /><input id="project-search" type="search" name="q" placeholder="Find a project" defaultValue={query} key={query} />
          {selectedCategory && <input type="hidden" name="category" value={selectedCategory} />}
          <button type="submit" aria-label="Search projects"><Icon name="right" /></button>
        </Form>
      </div>
      <p className="fw-index-count" role="status">{result.length} {result.length === 1 ? 'case file' : 'case files'}{selectedCategory ? ' / ' + selectedCategory : ''}{query ? ' matching “' + query + '”' : ''}</p>
      {result.length ? <div className="fw-index-entries">
        {result.map((project,index) => <article key={project.slug} className={`fw-index-entry fw-index-${project.theme}`} aria-labelledby={`fw-project-${project.slug}`}>
          <div className="fw-index-entry-info">
            <div className="fw-index-entry-meta"><span>KC / {numbers[project.slug]}</span><span>{project.year}</span></div>
            <div className="fw-index-entry-main">
              <p>{project.kind}</p><h2 id={`fw-project-${project.slug}`}><Link to={'/projects/'+project.slug}>{project.name}</Link></h2>
              <p>{project.tagline}</p>
            </div>
            <div className="fw-index-entry-actions"><Link to={'/projects/'+project.slug}>Read the case <span aria-hidden="true">↗</span></Link>{project.screens.length>0 && <GalleryLink project={project} screen={project.screens[0]} className="fw-index-gallery">Inspect screens <Icon name="expand"/></GalleryLink>}</div>
          </div>
          <Link className="fw-index-entry-image" to={'/projects/'+project.slug} aria-label={'Explore ' + project.name}>
            <WorkArtifact project={project} priority={index===0}/>
          </Link>
        </article>)}
        <p className="fw-index-evidence-note">Case material includes actual review-build captures and explicitly labeled demonstrations. They document interfaces, not independently verified adoption or current release status.</p>
      </div> : <div className="ap-empty-results fw-index-empty"><h2>No work in this view.</h2><p>Try another search, or return to all projects.</p><Link to="/projects" className="fw-underlink">Show all work <span aria-hidden="true">↗</span></Link></div>}
    </section>
    <section className="fw-index-outro fw-edge"><span className="fw-index-outro-label">A PROJECT STILL IN YOUR HEAD?</span><h2>LET'S MAKE<br/><em>IT REAL.</em></h2><Link to="/contact">Tell us what you're building <span aria-hidden="true">↗</span></Link></section>
  </main>;
}
