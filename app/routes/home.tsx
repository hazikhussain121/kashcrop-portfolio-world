import type { MetaFunction } from 'react-router';
import OverdriveHome from '~/components/portfolio/overdrive/OverdriveHome';
import { pageMeta } from '~/lib/portfolio/seo';

export const meta: MetaFunction = () => pageMeta('Bright ideas. Real things.', 'KashCrop Innovations is an independent studio in Kashmir. Explore product design, engineering and applied AI through our real work.');

export default function Home() {
  return <OverdriveHome />;
}
