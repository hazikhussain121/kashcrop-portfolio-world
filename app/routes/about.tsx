import { Link, type MetaFunction } from 'react-router';
import { company, media } from '~/data/portfolio/catalog';
import { Icon } from '~/components/portfolio/Icon';
import { pageMeta } from '~/lib/portfolio/seo';

export const meta: MetaFunction = () => pageMeta(
  'The studio',
  'Meet KashCrop Innovations: a Kashmir-based product design, engineering and applied AI studio, founded by Hazik Hussain and incubated at SKIIE.',
  '/about',
);

const principles = [
  ['Start with the workflow.', 'Understand what people need to do, where they do it, and what gets in the way.'],
  ['Make the thinking visible.', 'Show working interfaces early, so decisions can be made against something tangible.'],
  ['Care for the whole product.', 'Give the content, interface, backend and handover the same attention.'],
];

export default function About() {
  return <main id="main" className="ap-page fw-about">
    <header className="page-intro ap-page-intro ap-wrap">
      <h1>Rooted in Kashmir.<br /><span>Open to what’s next.</span></h1>
      <p>We bring product design, engineering and applied AI together.<br className="ap-desktop-break" /> To make useful software feel beautifully simple.</p>
    </header>

    <section className="ap-studio-composition ap-wrap" aria-label="KashCrop Innovations and a selection of its work">
      <div className="ap-studio-stage">
        <div className="ap-studio-identity">
          <img src={media('kashcrop-logo.png')} alt="KashCrop Innovations" width="1000" height="1000" decoding="async" />
          <p>KashCrop Innovations<span>Product design. Engineering. Applied AI.</span></p>
        </div>
        <div className="ap-studio-products">
          <div className="ap-preview-phone ap-studio-phone-back"><img src={media('phc-home.webp')} alt="Plant Health Clinic farmer interface" width="390" height="844" loading="lazy" decoding="async" /></div>
          <div className="ap-preview-phone ap-studio-phone-front"><img src={media('garden-home.webp')} alt="Baghban orchard services interface" width="390" height="844" loading="lazy" decoding="async" /></div>
        </div>
        <span className="ap-visual-note">Actual product interfaces · September 2026</span>
      </div>
    </section>

    <section className="ap-about-story ap-wrap">
      <h2>The whole product.<br /><span>Considered together.</span></h2>
      <div>
        <p>An interface is one part of a much bigger picture. The content, data, workflows and infrastructure behind it deserve the same care.</p>
        <p>Our work spans orchard tools, plant and fish health, institutional websites and research interfaces. Each starts with a real problem and the people doing the work.</p>
        <Link className="ap-text-link" to="/projects">Explore the work <Icon name="right" /></Link>
      </div>
    </section>

    <section className="ap-founder-section ap-wrap" aria-labelledby="ap-founder-name">
      <div className="ap-founder-heading">
        <h2 id="ap-founder-name">{company.founder}</h2>
        <p>Founder · Product &amp; Engineering</p>
        <a className="ap-text-link" href={company.linkedin} target="_blank" rel="noopener noreferrer">Connect on LinkedIn <Icon /></a>
      </div>
      <div className="ap-founder-story">
        <h3>Close to the problem.<br />Close to the details.</h3>
        <p>Hazik leads KashCrop’s product and technical work, connecting the interface with the engineering behind it. The practice combines full-stack development and applied AI with a focus on practical, regional problems.</p>
        <div className="ap-incubation">
          <img src={media('skiie-logo.png')} alt="SKIIE" width="500" height="500" loading="lazy" decoding="async" />
          <div><strong>Incubated at SKIIE</strong><p>SKUAST-Kashmir Innovation, Incubation and Entrepreneurship Centre.</p><a className="ap-text-link" href="https://skiie.co.in/" target="_blank" rel="noopener noreferrer">Explore the centre <Icon /></a></div>
        </div>
      </div>
    </section>

    <section className="ap-principles ap-wrap" aria-labelledby="ap-principles-title">
      <h2 id="ap-principles-title">Good work starts here.</h2>
      <div>{principles.map(([title, description]) => <article key={title}><h3>{title}</h3><p>{description}</p></article>)}</div>
    </section>

    <section className="ap-contact-band ap-wrap">
      <div><h2>What are you building?</h2><p>Let’s give your next idea the attention it deserves.</p></div>
      <Link className="ap-button" to="/contact">Start a conversation <Icon name="right" /></Link>
    </section>
  </main>;
}
