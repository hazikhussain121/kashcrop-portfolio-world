import { services as existingServices } from '../content';
export type Service = {
 slug: string; name: string; headline: string; description: string; philosophy: string;
 includes: string[]; proof: string[]; projects: string[]; process: string[];
 visual: 'platform' | 'website' | 'ai' | 'traceability';
};
const mapping: Record<string, Pick<Service,'projects'|'process'|'visual'>> = {
 'full-stack-apps':{projects:['baghban','kashcrop','plant-health-clinic'],process:['Map the actual workflow','Design and test the interface','Build the connected system','Prepare the handover'],visual:'platform'},
 'website-development':{projects:['skiie'],process:['Find the content that matters','Shape a clear visitor journey','Build the site and content tools','Test, publish and hand over'],visual:'website'},
 'ai-training':{projects:['plant-health-clinic','treat-my-fish','trace-amp'],process:['Define the task and boundaries','Connect the relevant knowledge','Keep human review in the workflow','Test the outputs and failure cases'],visual:'ai'},
 'blockchain-systems':{projects:[],process:['Map the chain of custody','Structure the records and evidence','Build the verification layer','Test the complete handoff'],visual:'traceability'},
};
export const serviceCatalog: Service[] = existingServices.map(s=>({
 slug:s.slug,name:s.title,headline:s.detail?.headline ?? s.title,description:s.description,
 philosophy:s.detail?.philosophy ?? s.description,includes:s.detail?.expandedIncludes ?? s.includes,proof:s.proof,
 ...mapping[s.slug],
}));
export function getService(slug?: string) { return serviceCatalog.find(s=>s.slug===slug); }
export const projectTypes = [
 {value:'website',label:'Website'}, {value:'platform',label:'App or platform'},
 {value:'ai',label:'Applied AI'}, {value:'traceability',label:'Traceability'}, {value:'not-sure',label:'Let’s work it out'},
] as const;
export const serviceFormValues: Record<string,string> = {'full-stack-apps':'platform','website-development':'website','ai-training':'ai','blockchain-systems':'traceability'};
