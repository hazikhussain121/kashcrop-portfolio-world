import { type RouteConfig, index, route } from '@react-router/dev/routes';
export default [
 index('routes/home.tsx'),
 route('projects','routes/projects.tsx'),
 route('projects/:slug','routes/project.tsx'),
 route('services','routes/services.tsx'),
 route('services/:slug','routes/service.tsx'),
 route('about','routes/about.tsx'),
 route('contact','routes/contact.tsx'),
 route('privacy','routes/privacy.tsx'),
 route('work','routes/legacy-projects-redirect.tsx'),
 route('studio','routes/legacy-about-redirect.tsx'),
 route('*','routes/not-found.tsx'),
] satisfies RouteConfig;
