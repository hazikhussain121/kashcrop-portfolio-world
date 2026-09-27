export type CaseStudyDiagram = {
  title: string;
  code: string;
};

/**
 * The workflow diagrams from the original Vizier case studies. They stay in
 * content data so the modal can render the same evidence-led diagrams for
 * every project without putting Mermaid syntax in the component.
 */
export const caseStudyDiagrams: Record<string, CaseStudyDiagram[]> = {
  "plant-health-clinic": [
    {
      title: "The diagnostic loop",
      code: String.raw`flowchart TD
  F["Farmer\nphotos + audio + symptoms"] --> C["Case created"]
  C --> V["Vizier\ndrafts diagnosis"]
  V --> E["Expert\ntriage + confirm"]
  E --> A["Official advisory\n+ treatment plan"]
  A --> F
  E -. correction .-> KB[("SKUAST reference library")]
  KB -. sources .-> V`,
    },
    {
      title: "Evidence used for a draft",
      code: String.raw`flowchart TD
  IN["Case: image + symptoms"] --> RET["Retrieve similar cases\n+ SKUAST advisories"]
  RET --> KB[("Vectorize KB\nSKUAST pathology")]
  KB --> REASON["Reason over evidence\n(Vertex AI, multimodal)"]
  REASON --> OUT["Draft diagnosis\nregion-approved chemicals only"]`,
    },
  ],
  "trace-amp": [
    {
      title: "The prediction pipeline",
      code: String.raw`flowchart TD
  SEQ["Sequence\nprotein / DNA / RNA"] --> BIO["Local biophysics\n(in-browser)"]
  SEQ --> PA["Phase A\nlocal + homology retrieval"]
  PA --> PB["Phase B\nstructure + literature"]
  BIO --> SYN["Phase C\nsynthesis"]
  PB --> SYN
  SYN --> REP["Report\nresult + evidence"]`,
    },
    {
      title: "Evidence sources, retrieved in parallel",
      code: String.raw`flowchart TD
  Q["Query sequence"] --> VZ["Vizier"]
  VZ --> L[("Local peptide index\nVectorize")]
  VZ --> U[("UniProt\nhomologs")]
  VZ --> AF[("AlphaFold / ESMFold\nstructure")]
  VZ --> P[("PubMed\nliterature")]
  L --> R["Report"]
  U --> R
  AF --> R
  P --> R`,
    },
  ],
  "treat-my-fish": [
    {
      title: "From pond-side to advisory",
      code: String.raw`flowchart TD
  G["Grower\nphotos + water telemetry"] --> C["Case"]
  C --> V["Vizier\ndraft diagnosis"]
  V --> E["Ichthyopathologist\nconfirm"]
  E --> A["Advisory + treatment"]
  E --> S[("Surveillance\nspecies / district / syndrome")]`,
    },
    {
      title: "Building the fisheries brain",
      code: String.raw`flowchart TD
  LIT["Fish-pathology\nliterature"] --> ING["Ingest + chunk"]
  ING --> KB[("Vectorize KB\ndomain: fish_health")]
  KB --> VZ["Vizier uses\nfish-health references"]
  CASE["New case"] --> VZ
  VZ --> DX["Draft diagnosis"]`,
    },
  ],
  skiie: [
    {
      title: "Submission to public profile",
      code: String.raw`flowchart TD
  APP["Startup\nraw application"] --> VZ["Vizier\nstructures it"]
  VZ --> REV["Admin review\n(CMS)"]
  REV --> PUB["Public profile\non skiie.co.in"]`,
    },
    {
      title: "Platform architecture",
      code: String.raw`flowchart TD
  PUBLIC["Public site\ndiscovery"] --> API["Cloudflare Workers"]
  ADMIN["Admin CMS\nevents + banners"] --> API
  API --> D1[("D1\nstructured content")]
  API --> R2[("R2\nmedia")]`,
    },
  ],
};
