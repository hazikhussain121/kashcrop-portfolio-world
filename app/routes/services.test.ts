import { describe, expect, it } from 'vitest';
import { serviceCatalog, serviceFormValues } from '~/data/portfolio/services';
import { getProject } from '~/data/portfolio/catalog';
import { loader } from './service';

describe('production service routes',()=>{
 it('preserves all four published service slugs',()=>{expect(serviceCatalog.map(s=>s.slug)).toEqual(['full-stack-apps','website-development','ai-training','blockchain-systems']);});
 for(const service of serviceCatalog){it(`loads ${service.slug} from the shared catalog`,()=>{const result=loader({params:{slug:service.slug},request:new Request(`https://kashcrop.in/services/${service.slug}`)});expect(result.service).toBe(service);expect(service.includes.length).toBeGreaterThan(2);expect(service.process).toHaveLength(4);expect(serviceFormValues[service.slug]).toBeTruthy();});}
 it('only connects services to projects that exist',()=>{for(const service of serviceCatalog)for(const slug of service.projects)expect(getProject(slug)).toBeDefined();});
 it('returns a real 404 for an unknown discipline',()=>{try{loader({params:{slug:'unknown'},request:new Request('https://kashcrop.in/services/unknown')});throw Error('Expected 404');}catch(e){expect(e).toBeInstanceOf(Response);expect((e as Response).status).toBe(404);}});
});
