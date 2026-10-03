import { Form, Link, useSearchParams, type MetaFunction } from 'react-router';
import { categories, findProjects, projects } from '~/data/portfolio/catalog';
import { GalleryLink, PageIntro, ProjectArtwork } from '~/components/portfolio/UI';
import { ScreenAtlas } from '~/components/portfolio/signature/ScreenAtlas';
import { Icon } from '~/components/portfolio/Icon';
import { pageMeta } from '~/lib/portfolio/seo';
export const meta:MetaFunction=()=>pageMeta('Selected work','Explore KashCrop’s product platforms, websites, applied AI and research interfaces. Real project details, screens and engineering decisions.','/projects');
export default function Projects(){
 const [params]=useSearchParams(),query=params.get('q')??'',category=params.get('category')??'';
 const selectedCategory=categories.includes(category as typeof categories[number])?category:'';
 const result=findProjects(query,selectedCategory);
 function filterURL(value:string){const next=new URLSearchParams();if(query)next.set('q',query);if(value)next.set('category',value);return `/projects${next.size?'?'+next.toString():''}`;}
 return <main id="main"><PageIntro eyebrow="The portfolio" title={<>Different worlds.<br/><em>The same care.</em></>} description="Products, platforms and digital experiences. Explore the interfaces, the thinking and the systems behind them."/>
 {!query && !selectedCategory && <ScreenAtlas/>}<section className="work-index section-wrap" aria-label="Browse projects">
 <div className="project-filters"><nav className="filter-tabs" aria-label="Filter projects by discipline"><Link to={filterURL('')} aria-current={!selectedCategory?'page':undefined}>All work <span>{projects.length}</span></Link>{categories.map(c=><Link key={c} to={filterURL(c)} aria-current={selectedCategory===c?'page':undefined}>{c}</Link>)}</nav><Form method="get" role="search" className="project-search"><label className="sr-only" htmlFor="project-search">Search projects</label><Icon name="search"/><input id="project-search" name="q" type="search" placeholder="Find a project…" defaultValue={query} key={query}/>{selectedCategory&&<input type="hidden" name="category" value={selectedCategory}/>}<button type="submit" aria-label="Search projects"><Icon name="right"/></button></Form></div>
 <p className="results-description" role="status">{result.length} {result.length===1?'project':'projects'}{selectedCategory?` in ${selectedCategory}`:''}{query?` matching “${query}”`:''}</p>
 {result.length?<div className="work-index-grid">{result.map(p=><article className="work-index-item" key={p.slug}><div className="project-cover-link"><ProjectArtwork project={p} interactive={false}/><Link className="cover-link-icon" to={`/projects/${p.slug}`} aria-label={`Explore ${p.name}`}><Icon/></Link></div><div className="index-project-caption"><div><p className="project-type">{p.category} · {p.year}</p><h2><Link to={`/projects/${p.slug}`}>{p.name}</Link></h2><p>{p.tagline}</p></div>{p.screens.length>0&&<GalleryLink project={p} className="screen-count-link">{p.screens.length} {p.screens.length===1?'screen':'screens'} <Icon name="expand"/></GalleryLink>}</div></article>)}</div>:<div className="empty-results"><Icon name="search"/><h2>No projects in this view.</h2><p>Try another phrase, or return to the full collection.</p><Link className="button button-dark" to="/projects">Show all work <Icon name="right"/></Link></div>}
 </section></main>;
}
