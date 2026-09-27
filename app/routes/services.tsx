import { Link, type MetaFunction } from 'react-router';
import { serviceCatalog } from '~/data/portfolio/services';
import { PageIntro } from '~/components/portfolio/UI';
import { ServiceVisual } from '~/components/portfolio/ServiceVisual';
import { Icon } from '~/components/portfolio/Icon';
import { pageMeta } from '~/lib/portfolio/seo';
export const meta:MetaFunction=()=>pageMeta('What we do','Product platforms, websites, applied AI and traceability systems. KashCrop brings design and engineering into one connected practice.','/services');
export default function ServicesPage(){return <main id="main"><PageIntro eyebrow="What we do" title={<>Four disciplines.<br/><em>One practice.</em></>} description="From the first useful idea to the interface, infrastructure and handover. We build the whole experience around the actual work."/>
 <section className="services-index section-wrap" aria-label="Our disciplines">{serviceCatalog.map(s=><article key={s.slug} className="service-index-row"><div className="service-index-copy"><p className="section-note">{s.name}</p><h2>{s.headline}</h2><p>{s.description}</p><Link className="underlined" to={`/services/${s.slug}`}>Explore {s.name.toLowerCase()} <Icon/></Link></div><Link className="service-visual-link" to={`/services/${s.slug}`} aria-label={`Learn about ${s.name}`}><ServiceVisual service={s}/></Link></article>)}</section>
 <section className="working-together section-wrap"><div><h2>A clear scope.<br/>A connected delivery.</h2><p>We charge for development and agree ongoing support around the product that ships. The starting point is a conversation about what needs to work—not a predetermined package.</p></div><Link className="button button-dark" to="/contact">Tell us about your project <Icon/></Link></section></main>;}
