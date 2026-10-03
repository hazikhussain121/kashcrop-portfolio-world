import { Link, useLoaderData, type LoaderFunctionArgs, type MetaFunction } from 'react-router';
import { getService, serviceCatalog, serviceFormValues } from '~/data/portfolio/services';
import { getProject } from '~/data/portfolio/catalog';
import { Breadcrumbs, ProjectArtwork } from '~/components/portfolio/UI';
import { ServiceVisual } from '~/components/portfolio/ServiceVisual';
import { Icon } from '~/components/portfolio/Icon';
import { pageMeta } from '~/lib/portfolio/seo';
export function loader({params}:Pick<LoaderFunctionArgs,'params'|'request'>){const service=getService(params.slug);if(!service)throw new Response('Service not found',{status:404});return {service};}
export const meta:MetaFunction<typeof loader>=({data})=>data?.service?pageMeta(data.service.name,data.service.description,`/services/${data.service.slug}`):pageMeta('Service not found','Explore KashCrop services.','/services');
export default function ServicePage(){const {service:s}=useLoaderData<typeof loader>();const evidence=s.projects.map(getProject).filter((p):p is NonNullable<typeof p>=>!!p);return <main id="main"><div className="section-wrap"><Breadcrumbs items={[{label:'What we do',to:'/services'},{label:s.name}]}/></div>
 <header className="service-detail-hero section-wrap"><div><p className="section-note">{s.name}</p><h1>{s.headline}</h1><p>{s.philosophy}</p><Link className="button button-dark" to={`/contact?service=${serviceFormValues[s.slug]}`}>Let’s discuss your project <Icon/></Link></div><ServiceVisual service={s}/></header>
 <section className="service-scope section-wrap"><div><h2>Built around<br/>what you need.</h2><p>The scope is agreed around your workflow, audience and operating requirements.</p></div><ul>{s.includes.map(item=><li key={item}><Icon name="check"/><span>{item}</span></li>)}</ul></section>
 <section className="delivery-section"><div className="section-wrap"><div className="section-heading"><h2>From understanding<br/>to handover.</h2><p>A connected process, with the product<br/>visible as it takes shape.</p></div><ol className="delivery-steps">{s.process.map((step,i)=><li key={step}><span>{String(i+1).padStart(2,'0')}</span><h3>{step}</h3></li>)}</ol></div></section>
 {evidence.length>0&&<section className="service-evidence section-wrap"><div className="section-heading"><h2>See it in the work.</h2><Link className="underlined" to="/projects">All projects <Icon/></Link></div><div className="related-work-grid">{evidence.slice(0,3).map(p=><article key={p.slug}><Link to={`/projects/${p.slug}`}><ProjectArtwork project={p} interactive={false} useFilm={false}/><h3>{p.name}<Icon/></h3><p>{p.tagline}</p></Link></article>)}</div></section>}
 <section className="other-services section-wrap"><h2>Connected disciplines.</h2><nav aria-label="Other services">{serviceCatalog.filter(item=>item.slug!==s.slug).map(item=><Link key={item.slug} to={`/services/${item.slug}`}>{item.name}<Icon/></Link>)}</nav></section>
 </main>;}
