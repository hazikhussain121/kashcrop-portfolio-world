import { describe,expect,it } from 'vitest';
import { projects,featuredProjects,findProjects,getProject,getScreen,projectAliases } from './catalog';
import { pageMeta } from '~/lib/portfolio/seo';
import { loader } from '~/routes/project';
describe('portfolio content',()=>{
 it('preserves legacy projects and adds the approved Baghban work',()=>{expect(projects.map(p=>p.slug)).toEqual(['baghban','plant-health-clinic','skiie','kashcrop','treat-my-fish','trace-amp']);expect(new Set(projects.map(p=>p.slug)).size).toBe(projects.length);});
 it('uses actual captures for all three hero projects',()=>{expect(featuredProjects).toHaveLength(3);for(const p of featuredProjects){expect(p.screens.length).toBeGreaterThan(0);expect(p.source).toBeTruthy();}});
 it('filters by query and discipline together',()=>{expect(findProjects('orchard','Platforms').map(p=>p.slug)).toContain('baghban');expect(findProjects('orchard','Websites')).toHaveLength(0);expect(findProjects('','Research').map(p=>p.slug)).toEqual(['trace-amp']);});
 it('search is case insensitive and empty results are explicit',()=>{expect(findProjects('  SKIIE  ').length).toBeGreaterThan(0);expect(findProjects('no-such-project-xyz')).toEqual([]);});
 it('falls back to the first valid screen',()=>{const p=getProject('baghban')!;expect(getScreen(p,'missing')).toBe(p.screens[0]);expect(getScreen(p,'desktop')?.kind).toBe('Desktop');});
 it('keeps screenshot paths local and dimensions positive',()=>{for(const p of projects)for(const s of p.screens){expect(s.file).toMatch(/^[a-z0-9-]+\.webp$/);expect(s.width).toBeGreaterThan(0);expect(s.height).toBeGreaterThan(0);}});
 it('renders canonical URLs without filter or viewer parameters',()=>{expect(pageMeta('Work','Description','/projects')).toContainEqual({tagName:'link',rel:'canonical',href:'https://kashcrop.in/projects'});});
 for(const p of projects)it(`loads the dedicated ${p.slug} page`,()=>{expect(loader({params:{slug:p.slug},request:new Request('https://kashcrop.in/projects/'+p.slug)})).toEqual({project:p});});
 it('redirects old project slugs to the canonical page',()=>{for(const [alias,slug] of Object.entries(projectAliases)){try{loader({params:{slug:alias},request:new Request('https://kashcrop.in/projects/'+alias+'?from=old')});}catch(e){expect(e).toBeInstanceOf(Response);expect((e as Response).status).toBe(301);expect((e as Response).headers.get('Location')).toBe('/projects/'+slug+'?from=old');}}});
 it('returns a genuine 404 for an unknown project',()=>{try{loader({params:{slug:'missing'},request:new Request('https://kashcrop.in/projects/missing')});throw Error('Expected response');}catch(e){expect((e as Response).status).toBe(404);}});
});
