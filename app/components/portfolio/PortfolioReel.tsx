import { Link } from 'react-router';
import { portfolioReel } from '~/data/portfolio/films';
import { InterfaceFilm } from './InterfaceFilm';
import { Icon } from './Icon';

export function PortfolioReel() {
 return <section className="portfolio-film-room" aria-labelledby="portfolio-film-title">
  <div className="section-wrap portfolio-film-layout">
   <div className="portfolio-film-intro"><p className="section-note">Proof, not promises.</p><h2 id="portfolio-film-title">The work,<br/><em>in motion.</em></h2><p>A short look inside six products. Real interfaces, captured from current review builds with demonstration data.</p><Link className="underlined" to="/projects">Step inside a project <Icon/></Link></div>
   <div className="portfolio-reel-evidence"><InterfaceFilm film={portfolioReel}/><p className="film-provenance">{portfolioReel.provenance}</p></div>
  </div>
 </section>;
}
