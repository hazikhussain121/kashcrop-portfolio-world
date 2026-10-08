import { Form, Link, useSearchParams, type MetaFunction } from 'react-router';
import { categories, findProjects, media, projects, type Project } from '~/data/portfolio/catalog';
import { projectFilms } from '~/data/portfolio/films';
import { GalleryLink } from '~/components/portfolio/UI';
import { Icon } from '~/components/portfolio/Icon';
import { pageMeta } from '~/lib/portfolio/seo';

export const meta: MetaFunction = () => pageMeta(
  'Selected work',
  'Explore KashCrop’s product platforms, websites, applied AI and research interfaces. Real project details, screens and engineering decisions.',
  '/projects',
);

function ProjectPreview({ project, priority = false }: { project: Project; priority?: boolean }) {
  const film = projectFilms[project.slug];
  const phone = project.screens.find(screen => screen.kind === 'Mobile');
  const secondPhone = project.screens.filter(screen => screen.kind === 'Mobile')[1];
  const phoneSrc = phone ? media(phone.file) : film.mobile?.poster;
  const phoneWidth = phone?.width ?? film.mobile?.width ?? 430;
  const phoneHeight = phone?.height ?? film.mobile?.height ?? 932;

  if (project.slug === 'skiie') {
    return <div className="ap-preview ap-preview-site">
      <div className="ap-preview-browser ap-preview-campus">
        <div className="ap-browser-bar" aria-hidden="true"><span className="ap-browser-dots"><i /><i /><i /></span><span>skiie.co.in</span><Icon name="link" /></div>
        <div className="ap-browser-content"><img src={media('skiie.webp')} alt="SKIIE website showing the SKUAST-Kashmir campus" width="1440" height="960" loading="lazy" decoding="async" /></div>
      </div>
    </div>;
  }

  if (project.slug === 'trace-amp') {
    return <div className="ap-preview ap-preview-research">
      <div className="ap-preview-browser">
        <div className="ap-browser-bar" aria-hidden="true"><span className="ap-browser-dots"><i /><i /><i /></span><span>TraceAMP</span><Icon name="link" /></div>
        <img src={film.poster} alt="TraceAMP sequence properties and helical-wheel interface with demonstration data" width={film.width} height={film.height} loading="lazy" decoding="async" />
      </div>
    </div>;
  }

  return <div className={'ap-preview ap-preview-phones ap-preview-' + project.theme}>
    {secondPhone && <div className="ap-preview-phone ap-phone-back" aria-hidden="true">
      <img src={media(secondPhone.file)} alt="" width={secondPhone.width} height={secondPhone.height} loading="lazy" decoding="async" />
    </div>}
    {!secondPhone && <div className="ap-preview-browser ap-browser-back" aria-hidden="true">
      <img src={film.poster} alt="" width={film.width} height={film.height} loading="lazy" decoding="async" />
    </div>}
    <div className="ap-preview-phone ap-phone-front">
      <img src={phoneSrc} alt={phone ? project.name + ': ' + phone.name : project.name + ' interface with demonstration data'} width={phoneWidth} height={phoneHeight} loading={priority ? 'eager' : 'lazy'} decoding="async" />
    </div>
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

  return <main id="main" className="ap-page">
    <header className="page-intro ap-page-intro ap-wrap">
      <h1>Meet the work.<br /><span>See what’s possible.</span></h1>
      <p>Orchards. Expert care. Institutions. Research.<br className="ap-desktop-break" /> Different worlds, brought to life with the same attention to detail.</p>
    </header>

    <section className="ap-work-index ap-wrap" aria-label="Browse projects">
      <div className="ap-project-filters">
        <nav className="ap-filter-tabs" aria-label="Filter projects by discipline">
          <Link to={filterURL('')} aria-current={!selectedCategory ? 'page' : undefined}>All work <span>{projects.length}</span></Link>
          {categories.map(item => <Link key={item} to={filterURL(item)} aria-current={selectedCategory === item ? 'page' : undefined}>{item}</Link>)}
        </nav>
        <Form method="get" role="search" className="ap-project-search">
          <label className="sr-only" htmlFor="project-search">Search projects</label>
          <Icon name="search" />
          <input id="project-search" name="q" type="search" placeholder="Find a project" defaultValue={query} key={query} />
          {selectedCategory && <input type="hidden" name="category" value={selectedCategory} />}
          <button type="submit" aria-label="Search projects"><Icon name="right" /></button>
        </Form>
      </div>

      <p className="ap-results-description" role="status">
        {result.length} {result.length === 1 ? 'project' : 'projects'}
        {selectedCategory ? ' in ' + selectedCategory : ''}
        {query ? ' matching “' + query + '”' : ''}
      </p>

      {result.length ? <>
        <div className="ap-work-grid">
          {result.map((project, index) => <article className="ap-project-card" key={project.slug}>
            <div className="ap-project-card-copy">
              <h2><Link to={'/projects/' + project.slug}>{project.name}</Link></h2>
              <p>{project.tagline}</p>
              <div className="ap-project-actions">
                <Link className="ap-text-link" to={'/projects/' + project.slug}>Explore the project <Icon name="right" /></Link>
                {project.screens.length > 0 && <GalleryLink project={project} className="ap-gallery-link">View screens <Icon name="expand" /></GalleryLink>}
              </div>
            </div>
            <Link className="ap-project-cover" to={'/projects/' + project.slug} aria-label={'Explore ' + project.name}>
              <ProjectPreview project={project} priority={index < 2} />
            </Link>
            <div className="ap-project-meta"><span>{project.category}</span><span>{project.year}</span></div>
          </article>)}
        </div>
        <p className="ap-capture-note">Interface captures from September–October 2026. Product demonstrations use sample data.</p>
      </> : <div className="ap-empty-results">
        <Icon name="search" />
        <h2>No projects in this view.</h2>
        <p>Try another phrase, or explore the full collection.</p>
        <Link className="ap-button" to="/projects">Show all work <Icon name="right" /></Link>
      </div>}
    </section>

    <section className="ap-contact-band ap-wrap">
      <div><h2>Your idea could be next.</h2><p>Tell us what you want to make possible.</p></div>
      <Link className="ap-button" to="/contact">Start a conversation <Icon name="right" /></Link>
    </section>
  </main>;
}
