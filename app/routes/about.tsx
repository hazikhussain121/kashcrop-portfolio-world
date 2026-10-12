import { Link, type MetaFunction } from 'react-router';
import { company, media } from '~/data/portfolio/catalog';
import { Icon } from '~/components/portfolio/Icon';
import { pageMeta } from '~/lib/portfolio/seo';

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
      <div className="od-founder-story"><p>KashCrop brings product thinking and technical delivery into the same conversation.</p><p>Hazik leads KashCrop’s product and technical work. The practice connects full-stack development and applied AI with practical problems in agriculture, institutions and research.</p><p>From a grower’s first tap to the systems behind the screen, KashCrop considers the whole product.</p><div className="od-about-incubator"><img src={media('skiie-logo.png')} alt="SKIIE logo" width={70} height={70} loading="lazy" /><div><strong>Incubated at SKIIE</strong><p>SKUAST-Kashmir Innovation, Incubation<br />and Entrepreneurship Centre.</p></div></div></div>
    </section>
    <section className="od-about-principles" aria-labelledby="principles-title"><h2 id="principles-title">How we see the work.</h2>{principles.map(([title, description]) => <article className="od-principle" key={title}><h3>{title}</h3><p>{description}</p></article>)}</section>
    <div style={{ marginTop: 45 }}><Link to="/projects" className="od-text-link">See the ideas in action <Icon /></Link></div>
  </main>;
}
