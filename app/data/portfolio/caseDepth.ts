import { caseStudyDiagrams, type CaseStudyDiagram } from '../caseStudyDiagrams';

export type DiagramNode = { title: string; detail?: string };
export type DiagramPart = { kind: 'path'; nodes: DiagramNode[] } | { kind: 'branches'; paths: DiagramNode[][] };
export type CaseSystemDiagram = CaseStudyDiagram & {
  id: string;
  sourceTitle: string;
  description: string;
  parts: DiagramPart[];
  feedback?: { description: string; nodes: DiagramNode[] };
};
export type CaseDepth = {
  title: string;
  decisions: { title: string; body: string }[];
  workflowNote?: string;
  recordNote?: string;
};

const node = (title: string, detail?: string): DiagramNode => ({ title, detail });
const path = (...nodes: DiagramNode[]): DiagramPart => ({ kind: 'path', nodes });
const branches = (...paths: DiagramNode[][]): DiagramPart => ({ kind: 'branches', paths });
const diagram = (slug: string, index: number, description: string, parts: DiagramPart[], feedback?: CaseSystemDiagram['feedback']): CaseSystemDiagram => ({
  ...caseStudyDiagrams[slug][index], sourceTitle: caseStudyDiagrams[slug][index].title, id: `${slug}-diagram-${index + 1}`, description, parts, feedback,
});

/**
 * Accessible layout of the eight original case-study graphs. The source title
 * and Mermaid code remain attached; paths preserve the source edges and joins.
 */
export const caseSystemDiagrams: Record<string, CaseSystemDiagram[]> = {
  'plant-health-clinic': [
    diagram('plant-health-clinic', 0, 'A field report becomes a reviewed advisory. The advice returns to the farmer; expert corrections return to the reference library.', [
      path(node('Farmer', 'Photos, audio and symptoms'), node('Case created'), node('Vizier', 'Draft diagnosis'), node('Expert', 'Triage and confirmation'), node('Official advisory', 'Treatment plan sent to the farmer')),
    ], {
      description: 'The reference loop keeps expert corrections connected to future drafts.',
      nodes: [node('Expert', 'Corrections'), node('SKUAST reference library'), node('Vizier', 'Sources for the draft')],
    }),
    diagram('plant-health-clinic', 1, 'The AI draft is prepared from the case and retrieved pathology material. The expert reviews the diagnosis and treatment plan before advice is sent.', [
      path(node('Case', 'Image and symptoms'), node('Retrieve evidence', 'Similar cases and SKUAST advisories'), node('Reference library', 'SKUAST pathology in Vectorize'), node('Reason over evidence', 'Multimodal Vertex AI'), node('Draft diagnosis', 'Region-approved chemicals only')),
    ]),
  ],
  'trace-amp': [
    diagram('trace-amp', 0, 'Local biophysical calculations and retrieved evidence follow separate paths, then meet in a report. This is a computational research workflow, not laboratory validation.', [
      path(node('Sequence', 'Protein, DNA or RNA')),
      branches(
        [node('Local biophysics', 'Calculated in the browser')],
        [node('Phase A', 'Local and homology retrieval'), node('Phase B', 'Structure and literature')],
      ),
      path(node('Phase C', 'Synthesis'), node('Report', 'Result and evidence')),
    ]),
    diagram('trace-amp', 1, 'Vizier queries the peptide index, homology, structure and literature sources in parallel. Each contributes evidence to the report.', [
      path(node('Query sequence'), node('Vizier')),
      branches(
        [node('Local peptide index', 'Vectorize')],
        [node('UniProt', 'Homologs')],
        [node('AlphaFold / ESMFold', 'Structure')],
        [node('PubMed', 'Literature')],
      ),
      path(node('Report', 'Result with source evidence')),
    ]),
  ],
  'treat-my-fish': [
    diagram('treat-my-fish', 0, 'An ichthyopathologist confirms the draft. The reviewed case supports both the grower advisory and a view of cases by species, district and syndrome.', [
      path(node('Grower', 'Photos and water readings'), node('Case'), node('Vizier', 'Draft diagnosis'), node('Ichthyopathologist', 'Confirmation')),
      branches([node('Advisory', 'Treatment for the grower')], [node('Surveillance', 'Species, district and syndrome')]),
    ]),
    { ...diagram('treat-my-fish', 1, 'Fish-pathology literature is prepared as a searchable reference library. Vizier combines matching references with the new case to prepare a draft.', [
      branches(
        [node('Fish-pathology literature'), node('Ingest and chunk'), node('Vectorize knowledge base', 'fish_health domain')],
        [node('New case')],
      ),
      path(node('Vizier', 'Uses fish-health references'), node('Draft diagnosis', 'Ready for expert review')),
    ]), title: 'How the reference library supports a case' },
  ],
  skiie: [
    diagram('skiie', 0, 'Application information becomes a structured draft. An administrator reviews it in the CMS before the startup profile is published.', [
      path(node('Startup', 'Raw application'), node('Vizier', 'Structures the information'), node('Admin review', 'CMS'), node('Public profile', 'skiie.co.in')),
    ]),
    diagram('skiie', 1, 'The public website and staff CMS share a Workers API. Structured content and uploaded media have separate storage.', [
      branches([node('Public site', 'Discovery')], [node('Admin CMS', 'Events and banners')]),
      path(node('Cloudflare Workers')),
      branches([node('D1', 'Structured content')], [node('R2', 'Media')]),
    ]),
  ],
};

/** Editorial explanations of decisions already represented in the source work. */
export const caseDepth: Record<string, CaseDepth> = {
  baghban: {
    title: 'Designed around the grower.',
    decisions: [
      { title: 'Explain the service before the form.', body: 'Orchard establishment and care are presented with their scope and the next step. A grower can understand the service before choosing a location or submitting a request.' },
      { title: 'Connect the different sides of orchard care.', body: 'Farmer, specialist and admin surfaces support service requests, specialist consultations and group sessions within the same platform.' },
      { title: 'Keep useful tools close to the work.', body: 'The seasonal calendar, variety explorer and grower tools sit beside orchard services. Responsive layouts carry the experience from a phone in the field to a wider desktop view.' },
    ],
  },
  'plant-health-clinic': {
    title: 'Built for the case and the expert.',
    decisions: [
      { title: 'Let the farmer show the problem.', body: 'Photos, voice notes and symptom details form one case. Photography guidance appears in the farmer app, while offline support and notifications are part of the Android workflow.' },
      { title: 'Keep the expert responsible for the advisory.', body: 'Vizier prepares a draft from the case and relevant SKUAST pathology material. A plant pathologist reviews the evidence, confirms the diagnosis and sends the treatment plan.' },
      { title: 'Keep corrections useful.', body: 'Expert corrections are retained for testing and connected to the reference loop. The review record remains part of the system, alongside the original field evidence.' },
    ],
    workflowNote: 'Vizier is the AI component in this workflow. It retrieves relevant reference material and prepares a draft; SKUAST-K experts decide what advice is sent.',
  },
  'trace-amp': {
    title: 'Research, with the evidence in view.',
    decisions: [
      { title: 'Make sequence exploration immediate.', body: 'Charge, isoelectric point, hydrophobicity, Boman index, GRAVY and hydrophobic moment are calculated in the browser. Protein, DNA and RNA inputs are supported, including reading-frame translation.' },
      { title: 'Put the sources beside the result.', body: 'The workflow brings together a local peptide index, UniProt, AlphaFold, ESMFold and PubMed. The report retains the sources used, so researchers can examine the evidence behind the synthesis.' },
      { title: 'Support comparison and revision.', body: 'The Mutation Playground and Design Studio support further exploration. The project record includes batches of up to 50 sequences, comparison of up to eight peptides, and PDF or JSON reports.' },
    ],
    workflowNote: 'Computed properties, predicted structures and retrieved papers support research decisions. They do not establish antimicrobial activity, clinical effectiveness or laboratory validation.',
  },
  'treat-my-fish': {
    title: 'Context travels with the case.',
    decisions: [
      { title: 'Collect more than a photograph.', body: 'Water readings, location and feed data accompany the grower’s images. Fisheries experts receive that context in the web dashboard alongside the AI draft and its references.' },
      { title: 'Connect review with the wider picture.', body: 'Cases are grouped by species, district and syndrome. Experts can inspect possible clusters while keeping the individual case, advisory and follow-up together.' },
      { title: 'Keep reviewed cases available for research.', body: 'Expert-reviewed cases can be exported for research and model testing. The draft-to-review boundary remains explicit throughout the workflow.' },
    ],
    workflowNote: 'Vizier prepares a draft using case data and fish-pathology references. An ichthyopathologist confirms the case before the advisory is sent to the grower.',
  },
  skiie: {
    title: 'A website the team can run.',
    decisions: [
      { title: 'Give visitors a way into the centre.', body: 'Startups, programmes, facilities, events and application forms are organised on the public website, following the existing SKUAST-K and SKIIE identity.' },
      { title: 'Let staff own the content.', body: 'The CMS supports page and section content, notices, banners, events and startup profiles. The team can update the site without editing code.' },
      { title: 'Keep publication under human review.', body: 'Application fields can become a draft startup profile, which staff review before publishing. The website and admin tools also work without Vizier.' },
    ],
    workflowNote: 'Vizier assists with profile preparation and searches centre records. Staff review the draft, and the core website and CMS remain usable without the AI assistant.',
  },
  kashcrop: {
    title: 'Everyday tools, kept together.',
    decisions: [
      { title: 'Bring the practical references into one place.', body: 'Mandi rates, seasonal tasks, weather, orchard references and field calculators form the core utility experience for Kashmir’s apple growers.' },
      { title: 'Use the grower’s language.', body: 'Kashmiri, Urdu and English interfaces are part of the project scope, alongside web and Android delivery.' },
      { title: 'Make estimates useful for planning.', body: 'Spray, unit and profit calculators support everyday planning. Profit scenarios are estimates for comparison, rather than a promise of a particular harvest or return.' },
    ],
    recordNote: 'This case documents the earlier KashCrop orchard companion. The Google Play package is now listed as BaghBani – Garden Guardians in open testing; its current listing is linked from the BaghBani case.',
  },
};
