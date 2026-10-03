import type { MetaFunction } from 'react-router';
import { HeroTheatre } from '~/components/portfolio/HeroTheatre';
import { PortfolioReel } from '~/components/portfolio/PortfolioReel';
import { FeaturedWork, ServicesPreview, StudioSummary } from '~/components/portfolio/HomeSections';
import { ProductAnatomy } from '~/components/portfolio/signature/ProductAnatomy';
import { CareJourney } from '~/components/portfolio/signature/CareJourney';
import { CraftPlayground } from '~/components/portfolio/signature/CraftPlayground';
import { pageMeta } from '~/lib/portfolio/seo';
export const meta:MetaFunction=()=>pageMeta('Good work. In plain sight.','KashCrop Innovations designs and builds useful digital systems. Explore real products, an interactive system study and the craft behind the work.');
export default function Home(){return <main id="main"><HeroTheatre/><FeaturedWork/><PortfolioReel/><ProductAnatomy/><CareJourney/><CraftPlayground/><ServicesPreview/><StudioSummary/></main>;}
