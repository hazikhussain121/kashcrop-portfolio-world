import type { Config } from '@react-router/dev/config';
import { projects } from './app/data/portfolio/catalog';
import { serviceCatalog } from './app/data/portfolio/services';
export default {
 ssr: true,
 async prerender(){return ['/', '/projects', '/services', '/about', '/contact', '/privacy', ...projects.map(p=>`/projects/${p.slug}`), ...serviceCatalog.map(s=>`/services/${s.slug}`)];},
} satisfies Config;
