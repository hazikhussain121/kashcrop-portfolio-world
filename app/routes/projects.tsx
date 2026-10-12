import { Form, Link, useSearchParams, type MetaFunction } from 'react-router';
import { categories, findProjects, media, projects, type Project } from '~/data/portfolio/catalog';
import { projectFilms } from '~/data/portfolio/films';
import { GalleryLink } from '~/components/portfolio/UI';
import { Icon } from '~/components/portfolio/Icon';
import { pageMeta } from '~/lib/portfolio/seo';
import { useHydrated } from '~/lib/portfolio/useHydrated';
import '~/styles/portfolio/overdrive-projects.css';

export const meta: MetaFunction = () => pageMeta('Selected work', 'Real projects, real interfaces and practical software systems. Explore the work of KashCrop Innovations.', '/projects');

function WorkArtwork({ project, priority }: { project: Project; priority: boolean }) {
  const first = project.screens.find(screen => screen.id === 'home') ?? project.screens[0];
  const second = project.screens.find(screen => screen.kind === 'Mobile' && screen.id !== first?.id);
  const film = projectFilms[project.slug];
  const load = priority ? 'eager' : 'lazy';

  return <div className={`od-work-art od-work-art-${first?.kind === 'Mobile' ? 'phones' : 'wide'}`}>
    {first?.kind === 'Mobile' ? <>
      {second && <div className="od-work-phone od-work-phone-back" aria-hidden="true">
        <img src={media(second.file)} alt="" width={second.width} height={second.height} loading={load} decoding="async" />
      </div>}
      <div className="od-work-phone od-work-phone-front">
        <img src={media(first.file)} alt={`${project.name}: ${first.name}, an actual interface capture`} width={first.width} height={first.height} loading={load} fetchPriority={priority ? 'high' : undefined} decoding="async" />
      </div>
    </> : <>
      <div className="od-work-wide-screen">
        <img src={first ? media(first.file) : film.poster} alt={first ? `${project.name}: ${first.name}, an actual interface capture` : `${project.name}: interface demonstration with synthetic data`} width={first?.width ?? film.width} height={first?.height ?? film.height} loading={load} fetchPriority={priority ? 'high' : undefined} decoding="async" />
      </div>
      {!first && film.mobile && <div className="od-work-demo-phone" aria-hidden="true">
        <img src={film.mobile.poster} alt="" width={film.mobile.width} height={film.mobile.height} loading="lazy" decoding="async" />
      </div>}
    </>}
    <span className="od-work-open"><Icon name="arrow" /></span>
  </div>;
}

export default function Projects() {
  const [params] = useSearchParams();
  const hydrated = useHydrated();
  const query = hydrated ? params.get('q') ?? '' : '';
  const category = hydrated ? params.get('category') ?? '' : '';
  const selectedCategory = categories.includes(category as typeof categories[number]) ? category : '';
  const result = findProjects(query, selectedCategory);

  function filterURL(value: string) {
    const next = new URLSearchParams();
    if (query) next.set('q', query);
    if (value) next.set('category', value);
    return '/projects' + (next.size ? '?' + next.toString() : '');
  }

  return <main id="main" className="od-work">
    <header className="od-work-intro od-wrap">
      <h1>The work.</h1>
      <p>Orchards, institutions and research. Explore the interfaces and the systems behind them.</p>
    </header>
    <section className="od-work-library od-wrap" aria-label="Browse projects">
      <div className="od-work-controls">
        <nav className="od-work-filters" aria-label="Filter projects by discipline">
          <Link to={filterURL('')} aria-current={!selectedCategory ? 'page' : undefined}>All work</Link>
          {categories.map(item => <Link key={item} to={filterURL(item)} aria-current={selectedCategory === item ? 'page' : undefined}>{item}</Link>)}
        </nav>
        <Form method="get" role="search" className="od-work-search">
          <label className="sr-only" htmlFor="project-search">Find a project</label>
          <Icon name="search" />
          <input id="project-search" type="search" name="q" placeholder="Find a project" defaultValue={query} key={query} autoComplete="off" />
          {selectedCategory && <input type="hidden" name="category" value={selectedCategory} />}
          <button type="submit" aria-label="Search projects"><Icon name="right" /></button>
        </Form>
      </div>
      <p className="od-work-result-count" role="status">
        {result.length} {result.length === 1 ? 'project' : 'projects'}{selectedCategory ? ' in ' + selectedCategory : ''}{query ? ' matching “' + query + '”' : ''}
        {(query || selectedCategory) && <Link to="/projects">Clear filters <Icon name="close" /></Link>}
      </p>
      {result.length ? <div className="od-work-grid">
        {result.map((project, index) => <article key={project.slug} className="od-work-project" aria-labelledby={`od-work-${project.slug}`}>
          <Link className="od-work-case-link" to={'/projects/' + project.slug} aria-labelledby={`od-work-${project.slug} od-work-read-${project.slug}`}>
            <div className="od-work-image-link"><WorkArtwork project={project} priority={index < 2} /></div>
            <div className="od-work-project-title">
              <h2 id={`od-work-${project.slug}`}>{project.name}</h2>
              <span>{project.year}</span>
            </div>
            <p className="od-work-project-kind">{project.kind}</p>
            <p className="od-work-project-summary">{project.summary}</p>
            <span className="od-work-read" id={`od-work-read-${project.slug}`}>Read case study <Icon name="arrow" /></span>
          </Link>
          <div className="od-work-project-foot">
            <p>{project.screens.length ? 'Actual interface captures' : 'Synthetic interface demonstration'}</p>
            {project.screens.length > 0 && <GalleryLink project={project} screen={project.screens[0]} className="od-work-inspect">View screens <Icon name="expand" /></GalleryLink>}
          </div>
        </article>)}
      </div> : <div className="od-work-empty">
        <h2>No projects match.</h2>
        <p>Try a different search or return to all {projects.length} projects.</p>
        <Link to="/projects" className="od-project-action">Show all work <Icon name="arrow" /></Link>
      </div>}
      <p className="od-work-source-note">Captures and labelled demonstrations document the interface work. Source dates and project context are included in each case study.</p>
    </section>
  </main>;
}
