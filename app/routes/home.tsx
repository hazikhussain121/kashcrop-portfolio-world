import type { MetaFunction } from 'react-router';
import FieldworkHome from '~/components/portfolio/FieldworkHome';
import { pageMeta } from '~/lib/portfolio/seo';

export const meta: MetaFunction = () => pageMeta('The work has to work.', 'KashCrop Innovations is an independent software studio in Kashmir. Product design, engineering and applied AI for the real world.');

export default function Home() {
  return <FieldworkHome />;
}
