import { Link, type MetaFunction } from 'react-router';
import { company, media } from '~/data/portfolio/catalog';
import { aboutPage } from '~/data/content';
import { Icon } from '~/components/portfolio/Icon';
import { pageMeta } from '~/lib/portfolio/seo';
import '~/styles/portfolio/overdrive-content.css';

export const meta: MetaFunction = () => pageMeta('The studio', 'KashCrop is an independent product design, engineering and applied AI studio led by Hazik Hussain in Kashmir.', '/about');
const principles = [
  ['Get close to the problem.', 'Start with the people doing the work. Understand their day, their constraints, and what would actually help.'],
  ['Make it tangible.', 'Turn the thinking into working interfaces early. Good conversations happen around something you can use.'],
  ['Own the whole experience.', 'The interface, content, data, engineering and handover deserve the same care. We bring them together.'],
];

export default function About() {
  return <main id="main" className="od-about od-wrap">
    <header className="od-about-hero"><h1>Small studio.<br /><span>Open horizons.</span></h1><p>We’re a product design and engineering studio in Kashmir. Curious about difficult problems. Particular about the details.</p></header>
    <div className="od-about-art" aria-label="KashCrop's actual BaghBani and Plant Health Clinic interfaces">
      <div className="od-about-art-word" aria-hidden="true">INDEPENDENT<span>BY NATURE.</span></div>
      <div className="od-product-phone od-about-phone-back"><img src={media('phc-home.webp')} alt="Plant Health Clinic farmer home screen" width={390} height={844} loading="eager" decoding="async" /></div>
      <div className="od-product-phone od-about-phone-front"><img src={media('garden-home.webp')} alt="BaghBani orchard platform home screen" width={390} height={844} loading="eager" decoding="async" /></div>
      <p className="od-about-art-foot">Real interfaces.<br />Ideas put to work.</p>
    </div>
    <section className="od-founder" aria-labelledby="founder-name"><div className="od-founder-title"><h2 id="founder-name">Hazik<br />Hussain.</h2><p>Founder, product & engineering</p><a href={company.linkedin} className="od-text-link" target="_blank" rel="noopener noreferrer">Connect on LinkedIn <Icon /></a></div>
      <div className="od-founder-story"><p>Hazik Hussain founded KashCrop Innovations in Srinagar. He leads the studio’s product and technical work, connecting full-stack development and applied AI with practical problems.</p><p>That work includes <Link to="/projects/kashcrop">orchard planning tools</Link>, the <Link to="/projects/plant-health-clinic">Plant Health Clinic</Link> expert workflow, and <Link to="/projects/skiie">SKIIE’s startup and incubation platform</Link>. The range extends to fish health, peptide research and smaller consumer products.</p><p>The practice covers the complete product: how someone finds their next step, how information moves between people, and the interfaces, APIs and data systems that make it work.</p><div className="od-about-incubator"><img src={media('skiie-logo.png')} alt="SKIIE logo" width={70} height={70} loading="lazy" /><div><strong>Incubated at SKIIE</strong><p>SKUAST-Kashmir Innovation, Incubation<br />and Entrepreneurship Centre.</p></div></div></div>
    </section>
    <section className="od-studio-grounding" aria-labelledby="grounding-title">
      <div className="od-studio-grounding-intro"><h2 id="grounding-title">Built from Kashmir.<br />Built around people.</h2><p>{aboutPage.philosophy.paragraphs[0]}</p></div>
      <ul>
        <li><h3>The conditions shape the product.</h3><p>A field visit, a shared office and a research desk ask different things of software. Connectivity, device use and the information available at that moment belong in the design decisions.</p></li>
        <li><h3>Review is part of the workflow.</h3><p>Plant and fish health cases move through expert review. Institutional content moves through staff publishing. The person making the decision needs the right context and a clear next step.</p></li>
        <li><h3>Useful knowledge needs a useful interface.</h3><p>A pathology reference, an orchard calculation or a peptide analysis becomes more usable when the inputs, supporting evidence and result are easy to inspect together.</p></li>
      </ul>
    </section>
    <section className="od-about-principles" aria-labelledby="principles-title"><h2 id="principles-title">How we see the work.</h2>{principles.map(([title, description]) => <article className="od-principle" key={title}><h3>{title}</h3><p>{description}</p></article>)}</section>
    <section className="od-experiments" aria-labelledby="experiments-title">
      <div className="od-content-heading"><h2 id="experiments-title">Curiosity has<br />a few side projects.</h2><p>Alongside the main portfolio, Hazik has built smaller products and experiments in scientific analysis, everyday utilities and language learning.</p></div>
      <div className="od-experiment-grid">{aboutPage.supporting.products.map(product => <article className="od-experiment" key={product.name}><h3>{product.name}</h3><p>{product.summary}</p></article>)}</div>
    </section>
    <div className="od-about-next"><p>Explore the complete case studies for the product decisions, workflows and interfaces behind the work.</p><Link to="/projects" className="od-text-link">See the ideas in action <Icon /></Link></div>
  </main>;
}
