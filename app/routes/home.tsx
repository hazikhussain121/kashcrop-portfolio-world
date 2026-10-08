import type { MetaFunction } from 'react-router';
import { AppleHero, AppleSpotlight, AppleCapabilities, AppleOrigin } from '~/components/portfolio/ApplePortfolio';
import { pageMeta } from '~/lib/portfolio/seo';

export const meta: MetaFunction = () => pageMeta('Good ideas. Beautifully built.', 'KashCrop Innovations designs and builds digital products for agriculture, institutions and the people moving them forward.');

export default function Home() {
  return <main id="main" className="apple-home"><AppleHero /><AppleSpotlight /><AppleCapabilities /><AppleOrigin /></main>;
}
