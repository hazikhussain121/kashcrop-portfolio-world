import { getProject } from '~/data/portfolio/catalog';
import type { Service } from '~/data/portfolio/services';
import { ProjectArtwork } from './UI';
import { Icon } from './Icon';
export function ServiceVisual({service}:{service:Service}) {
 const project=getProject(service.projects[0]);
 if(project)return <div className="service-proof-visual"><ProjectArtwork project={project} interactive={false}/><span className="service-proof-label">Selected work / {project.name}</span></div>;
 return <div className="traceability-visual" aria-label="Traceability workflow: records, evidence and verification"><div className="traceability-orbit" aria-hidden="true"/><div className="traceability-core"><Icon name="layers"/><strong>Traceable by design.</strong><span>From an event to verifiable evidence.</span></div><ol><li><span>Record</span><small>What happened</small></li><li><span>Evidence</span><small>What supports it</small></li><li><span>Verify</span><small>What can be checked</small></li></ol><p>Workflow illustration</p></div>;
}
