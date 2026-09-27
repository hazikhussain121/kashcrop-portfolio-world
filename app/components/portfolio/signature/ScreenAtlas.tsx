import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { featuredProjects, media } from '~/data/portfolio/catalog';
import { GalleryLink } from '../UI';
import { Icon } from '../Icon';
import { useMotion } from '../MotionProvider';

gsap.registerPlugin(useGSAP, ScrollTrigger);
const atlasScreens = [
 { project: featuredProjects[0], screen: featuredProjects[0].screens[2], label: 'Seasonal guidance' },
 { project: featuredProjects[1], screen: featuredProjects[1].screens[0], label: 'Farmer care' },
 { project: featuredProjects[0], screen: featuredProjects[0].screens[0], label: 'Orchard services' },
 { project: featuredProjects[0], screen: featuredProjects[0].screens[1], label: 'A considered next step' },
 { project: featuredProjects[1], screen: featuredProjects[1].screens[2], label: 'Useful, in the moment' },
];
export function ScreenAtlas() {
 const root = useRef<HTMLElement>(null), rail = useRef<HTMLDivElement>(null); const { reduced } = useMotion();
 useGSAP(() => {
  if (reduced || !root.current) return;
  const mm = gsap.matchMedia();
  mm.add('(min-width: 851px)', () => {
   gsap.fromTo(root.current!.querySelectorAll('.atlas-item'), { y: (i: number) => i % 2 ? 30 : -35 }, { y: (i: number) => i % 2 ? -30 : 35, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: .65 } });
  });
  return () => mm.revert();
 }, { scope: root, dependencies: [reduced], revertOnUpdate: true });
 return <section className="screen-atlas" ref={root} aria-labelledby="atlas-title"><div className="atlas-copy"><span className="signature-eyebrow">The visual archive</span><h2 id="atlas-title">Look closer.<br/>There’s more<br/><em>to the picture.</em></h2><p>A collection of actual interfaces.<br/>Open a screen and explore the details.</p><span className="atlas-capture-note">Product captures · 2026</span></div>
  <div className="atlas-window" ref={rail} data-lenis-prevent><div className="atlas-composition">{atlasScreens.map((item, i) => <GalleryLink key={`${item.project.slug}-${item.screen.id}`} project={item.project} screen={item.screen} className={`atlas-item atlas-item-${i}`} aria-label={`Inspect ${item.project.name}: ${item.screen.name}`}><img src={media(item.screen.file)} alt={`${item.project.name}: ${item.screen.name}`} width={item.screen.width} height={item.screen.height} loading="lazy"/><span>{item.label}<Icon name="expand"/></span></GalleryLink>)}</div></div>
  <div className="atlas-mobile-controls"><span>Explore the screen collection</span><div><button className="icon-button" aria-label="Previous archive screens" onClick={() => rail.current?.scrollBy({ left: -230, behavior: reduced ? 'auto' : 'smooth' })}><Icon name="left"/></button><button className="icon-button" aria-label="Next archive screens" onClick={() => rail.current?.scrollBy({ left: 230, behavior: reduced ? 'auto' : 'smooth' })}><Icon name="right"/></button></div></div>
 </section>;
}
