// All site copy lives here. Edit content, never markup.
// Each project carries a case study based on the work completed.
// `vizier.steps` = the specific, honest things we did. `diagrams` = Mermaid.

export const site = {
  company: 'KashCrop Innovations',
  brand: 'Vizier',
  cin: 'U01611JK2026PTC018667',
  location: 'Srinagar, J&K',
  email: 'Hazik@kashcrop.in',
  phone: '+91 84939 05940',
  phoneHref: 'tel:+918493905940',
  linkedin: 'https://www.linkedin.com/in/hazik-hussain-49b5663a3/',
  instagram: 'https://www.instagram.com/_haz_ik/',
};

// Incubation details for SKUAST-K / SKIIE.
export const incubator = {
  name: 'SKIIE',
  full: 'SKUAST-K Innovation, Incubation & Entrepreneurship Centre',
  logo: '/skiie-logo.png',
  site: 'https://skiie.co.in/',
  visit: 'SKIIE Centre, SKUAST-Kashmir, Shalimar Campus, Srinagar',
  contactName: 'Naveed Hamid',
  email: 'naveedbhat@skuastkashmir.ac.in',
  phone: '+91 70068 31280',
  phoneHref: 'tel:+917006831280',
};

export const projects = [
  {
    no: '01',
    slug: 'plant-health-clinic',
    name: 'SKUAST Plant Health Clinic',
    kind: 'Crop diagnosis system',
    year: '2026',
    tagline: 'Crop-disease cases sent from farmers to SKUAST-K experts.',
    blurb: 'Farmers send photos, symptoms and voice notes from the field. Vizier prepares a draft diagnosis, and a SKUAST-K expert reviews it before sending advice.',
    overview: [
      'Farmers use the Android app to send photos of an affected plant, a voice note and a short symptom form. Plant pathologists at SKUAST-Kashmir review each case on a web dashboard, confirm the diagnosis and send a treatment plan.',
      'The Vice-Chancellor launched the system at the Directorate of Extension. It runs on Cloudflare so the institution can handle cases without maintaining its own server.',
    ],
    vizier: {
      headline: 'Vizier uses SKUAST-K pathology material when preparing a draft.',
      steps: [
        'We collected SKUAST-K plant-pathology material in one searchable library.',
        'The system retrieves relevant passages for each case.',
        'Vizier uses those passages to prepare the draft diagnosis.',
        'Treatment suggestions are limited to chemicals approved by SKUAST-K or available in the region.',
      ],
    },
    diagrams: [
      {
        title: 'The diagnostic loop',
        code: `flowchart TD
  F["Farmer\\nphotos + audio + symptoms"] --> C["Case created"]
  C --> V["Vizier\\ndrafts diagnosis"]
  V --> E["Expert\\ntriage + confirm"]
  E --> A["Official advisory\\n+ treatment plan"]
  A --> F
  E -. correction .-> KB[("SKUAST reference library")]
  KB -. sources .-> V`,
      },
      {
        title: 'Evidence used for a draft',
        code: `flowchart TD
  IN["Case: image + symptoms"] --> RET["Retrieve similar cases\\n+ SKUAST advisories"]
  RET --> KB[("Vectorize KB\\nSKUAST pathology")]
  KB --> REASON["Reason over evidence\\n(Vertex AI, multimodal)"]
  REASON --> OUT["Draft diagnosis\\nregion-approved chemicals only"]`,
      },
    ],
    features: [
      'Farmers can submit images, audio and symptom details',
      'Search across SKUAST advisories and past cases',
      'Treatment suggestions use SKUAST-approved or locally available chemicals',
      'Each case includes a draft diagnosis for expert review',
      'Expert corrections are saved for testing',
      'The Android app works offline and sends push notifications',
    ],
    stack: ['React 18', 'TypeScript', 'Capacitor', 'Cloudflare Workers (Hono)', 'D1', 'R2', 'Vectorize', 'Vertex AI', 'Firebase Auth + FCM'],
    facts: [
      { label: 'Role', value: 'Product + full-stack + AI' },
      { label: 'Interfaces', value: 'Farmer app · Expert dashboard' },
      { label: 'Institution', value: 'SKUAST-Kashmir' },
      { label: 'Status', value: 'Launched by the VC' },
    ],
    links: [
      { label: 'Watch demo', href: 'https://www.youtube.com/watch?v=DK8iQhdzRfs' },
      { label: 'Rising Kashmir', href: 'https://risingkashmir.com/skuast-k-launches-ai-driven-plant-health-clinic/' },
      { label: 'Kashmir Reader', href: 'https://kashmirreader.com/2026/04/09/skuast-k-launches-nextgen-e-plant-clinic-at-shalimar-campus/' },
    ],
  },
  {
    no: '02',
    slug: 'trace-amp',
    name: 'TRACE-AMP',
    kind: 'Antimicrobial-peptide workbench',
    year: '2026',
    tagline: 'Analysis and design tools for antimicrobial-peptide research.',
    blurb: 'Researchers can enter a protein, DNA or RNA sequence, calculate its biophysical properties, inspect predicted structures and compare the result with databases and papers.',
    overview: [
      'A researcher enters a protein, DNA or RNA sequence. TRACE-AMP calculates charge, isoelectric point, hydrophobicity, Boman index, GRAVY and hydrophobic moment in the browser. It then checks external evidence and produces a report that can be saved or shared.',
      'The platform includes a 2D helical wheel, a surface map and a 3D structure viewer. Researchers can test single mutations, design peptides under set constraints, screen batches of up to 50 sequences and compare up to eight peptides. The application runs on Cloudflare.',
    ],
    vizier: {
      headline: 'Vizier checks several peptide, structure and literature sources for each sequence.',
      steps: [
        'The search covers UniProt, AlphaFold, ESMFold, PubMed and a local peptide index.',
        'Vizier queries these sources in parallel.',
        'The model receives the matching sequences, structures and papers.',
        'The report lists the evidence used for the result.',
      ],
    },
    diagrams: [
      {
        title: 'The prediction pipeline',
        code: `flowchart TD
  SEQ["Sequence\\nprotein / DNA / RNA"] --> BIO["Local biophysics\\n(in-browser)"]
  SEQ --> PA["Phase A\\nlocal + homology retrieval"]
  PA --> PB["Phase B\\nstructure + literature"]
  BIO --> SYN["Phase C\\nsynthesis"]
  PB --> SYN
  SYN --> REP["Report\\nresult + evidence"]`,
      },
      {
        title: 'Evidence sources, retrieved in parallel',
        code: `flowchart TD
  Q["Query sequence"] --> VZ["Vizier"]
  VZ --> L[("Local peptide index\\nVectorize")]
  VZ --> U[("UniProt\\nhomologs")]
  VZ --> AF[("AlphaFold / ESMFold\\nstructure")]
  VZ --> P[("PubMed\\nliterature")]
  L --> R["Report"]
  U --> R
  AF --> R
  P --> R`,
      },
    ],
    features: [
      'Single Predictor: protein, DNA, or RNA input with reading-frame translation',
      'Real-time biophysics: charge, pI, hydrophobicity, Boman, GRAVY, hydrophobic moment',
      'Search across Vectorize, UniProt, AlphaFold, ESMFold and PubMed',
      'Structure visualizer: 2D wheel, surface map, 3D (pLDDT / hydrophobicity / membrane-face)',
      'Mutation Playground + Design Studio (improve-a-seed and de novo)',
      'Batch mode (50 sequences), Compare (8 peptides), PDF / JSON / shareable reports',
    ],
    stack: ['React 19', 'TypeScript', 'Vite', 'Cloudflare Workers (Hono)', 'Workers AI', 'Vectorize', 'D1', 'UniProt', 'AlphaFold', 'ESMFold', 'PubMed', 'Gemini'],
    facts: [
      { label: 'Role', value: 'Product + full-stack + AI' },
      { label: 'Audience', value: 'Researchers · students' },
      { label: 'Method', value: 'Multi-source RAG + biophysics' },
      { label: 'Output', value: 'Report with sources' },
    ],
    links: [],
  },
  {
    no: '03',
    slug: 'kashcrop',
    name: 'KashCrop',
    kind: 'Orchard management app',
    year: '2026',
    tagline: "An orchard management app for Kashmir's apple farmers.",
    blurb: 'KashCrop combines apple-scab alerts, market rates, expense records, seasonal tasks and an assistant in Kashmiri, Urdu and English. It is available on the Play Store.',
    overview: [
      'KashCrop estimates apple-scab risk from weather data using the Mills table and a Gompertz model. Farmers can record expenses, check mandi rates, follow seasonal tasks, calculate spray quantities and read orchard and government-scheme guides. The app supports Kashmiri, Urdu and English and is designed for weak internet connections.',
      'The app is free for farmers and available on the Play Store.',
    ],
    vizier: {
      headline: 'Vizier uses the farmer\'s orchard records when answering questions.',
      steps: [
        'It reads the orchard\'s expense records, tasks, weather and disease risk.',
        'It also searches the orchard guide for relevant information.',
        'Farmers can use Kashmiri audio, Urdu or English.',
        'The answer reflects the selected orchard and its current records.',
      ],
    },
    diagrams: [
      {
        title: 'An answer using orchard records',
        code: `flowchart TD
  ASK["Farmer asks\\nKashmiri / Urdu / English"] --> VZ["Vizier"]
  KH[("This orchard\\nkhata + tasks")] --> VZ
  WX[("Local weather\\n+ scab risk")] --> VZ
  LIB[("Orchard\\nknowledge base")] --> VZ
  VZ --> ANS["Answer in\\ngrower's language"]`,
      },
      {
        title: 'Apple-scab risk prediction',
        code: `flowchart TD
  W["Weather feed\\ntemp + leaf wetness"] --> MILLS["Mills table\\ninfection periods"]
  MILLS --> GOMP["Gompertz model\\nprogression"]
  GOMP --> RISK["Scab risk level"]
  RISK --> ALERT["Spray timing alert\\n+ calculator"]`,
      },
    ],
    features: [
      'Multilingual AI assistant: Kashmiri (audio), Urdu, English',
      'Apple-scab disease prediction (Mills table + Gompertz)',
      'Digital khata: cloud-synced expense tracking',
      'Live mandi market rates',
      'Seasonal task roadmap + spray calculator',
      'Orchard library, govt schemes, and bazaar',
    ],
    stack: ['React 19', 'Vite 7', 'Tailwind', 'Capacitor 7', 'Cloudflare Workers (Hono)', 'D1', 'Firebase OTP', 'Razorpay', 'Gemini'],
    facts: [
      { label: 'Role', value: 'Product + full-stack + AI' },
      { label: 'Platform', value: 'Web + Android (TWA)' },
      { label: 'Reach', value: 'Live on Play Store' },
      { label: 'Languages', value: 'Kashmiri · Urdu · English' },
    ],
    links: [
      { label: 'Play Store', href: 'https://play.google.com/store/apps/details?id=app.web.kashcrop.twa' },
      { label: 'Watch demo', href: 'https://www.youtube.com/watch?v=xsACFoR-ZJA' },
      { label: 'Kashmir Ahead', href: 'https://kashmirahead.com/kashcrop-app-by-19-year-old-hazik-hussain-to-transform-kashmir-horticulture/' },
    ],
  },
  {
    no: '04',
    slug: 'treat-my-fish',
    name: 'Treat My Fish',
    kind: 'Fish health system',
    year: '2026',
    tagline: 'Fish-health cases sent from growers to fisheries experts.',
    blurb: 'Growers send photos, location and water readings from a mobile app. Vizier prepares a draft diagnosis, and fisheries experts review the case on a web dashboard.',
    overview: [
      'Fish growers use a mobile app to send photos, location, water readings and feed data. Fish-health experts at SKUAST-Kashmir\'s College of Fisheries review each case on a web dashboard, send advice and record follow-up.',
      'The dashboard groups cases by species, district and syndrome so experts can see possible disease clusters. Reviewed cases can be exported for later research and model testing.',
    ],
    vizier: {
      headline: 'Vizier uses fish-pathology references to prepare each draft diagnosis.',
      steps: [
        'We added selected fish-pathology references to a searchable library.',
        'The system retrieves relevant passages for each case.',
        'Vizier uses the grower\'s photos, water readings and those passages to prepare a draft.',
        'An expert reviews the draft before the advisory is sent.',
      ],
    },
    diagrams: [
      {
        title: 'From pond-side to advisory',
        code: `flowchart TD
  G["Grower\\nphotos + water telemetry"] --> C["Case"]
  C --> V["Vizier\\ndraft diagnosis"]
  V --> E["Ichthyopathologist\\nconfirm"]
  E --> A["Advisory + treatment"]
  E --> S[("Surveillance\\nspecies / district / syndrome")]`,
      },
      {
        title: 'Building the fisheries brain',
        code: `flowchart TD
  LIT["Fish-pathology\\nliterature"] --> ING["Ingest + chunk"]
  ING --> KB[("Vectorize KB\\ndomain: fish_health")]
  KB --> VZ["Vizier uses\\nfish-health references"]
  CASE["New case"] --> VZ
  VZ --> DX["Draft diagnosis"]`,
      },
    ],
    features: [
      'Mobile app for growers and web dashboard for experts',
      'Cases include images, water readings, location and feed data',
      'Searchable library of selected fish-pathology references',
      'Draft diagnosis based on case data and fish-health references',
      'Cases grouped by species, district and syndrome',
      'Expert-reviewed cases can be exported',
    ],
    stack: ['React 18', 'TypeScript', 'Vite', 'Capacitor', 'Cloudflare Workers (Hono)', 'D1', 'R2', 'Vectorize', 'Azure AI', 'Firebase Auth'],
    facts: [
      { label: 'Role', value: 'Product + full-stack + AI' },
      { label: 'Interfaces', value: 'Grower app · Expert dashboard' },
      { label: 'Institution', value: 'SKUAST-K College of Fisheries' },
      { label: 'Domain', value: 'Coldwater fisheries: trout, carp' },
    ],
    links: [],
  },
  {
    no: '05',
    slug: 'skiie',
    name: 'SKIIE',
    kind: 'Incubation & startup portal',
    year: '2026',
    tagline: 'The public website and content system for SKIIE.',
    blurb: 'The site lists SKIIE startups, programmes, events and facilities. Staff manage the content through an admin panel.',
    overview: [
      'SKIIE is the website for SKUAST-Kashmir\'s Innovation, Incubation and Entrepreneurship Centre. Visitors can find startups, programmes, facilities, events and application forms. Staff can update pages, notices, banners and startup profiles without editing code.',
      'The site stores structured content in D1 and uploaded media in R2. Its colours and typography follow the existing SKUAST-K and SKIIE identity.',
    ],
    vizier: {
      headline: 'Vizier helps staff prepare startup profiles and search centre records.',
      steps: [
        'It turns application fields into a draft startup profile.',
        'Staff review the draft before publishing it.',
        'Search uses the centre\'s own startup and programme records.',
        'The main website and admin tools continue to work without Vizier.',
      ],
    },
    diagrams: [
      {
        title: 'Submission to public profile',
        code: `flowchart TD
  APP["Startup\\nraw application"] --> VZ["Vizier\\nstructures it"]
  VZ --> REV["Admin review\\n(CMS)"]
  REV --> PUB["Public profile\\non skiie.co.in"]`,
      },
      {
        title: 'Platform architecture',
        code: `flowchart TD
  PUBLIC["Public site\\ndiscovery"] --> API["Cloudflare Workers"]
  ADMIN["Admin CMS\\nevents + banners"] --> API
  API --> D1[("D1\\nstructured content")]
  API --> R2[("R2\\nmedia")]`,
      },
    ],
    features: [
      'Public startup & programme discovery',
      'Full admin CMS: events, notifications, banners',
      'Content stored by page and section',
      'R2-backed media uploads',
      'Startup applications converted into draft profiles',
      'Institutional UX on the SKUAST identity',
    ],
    stack: ['React Router 7', 'React 19', 'Drizzle ORM', 'Cloudflare', 'D1', 'R2'],
    facts: [
      { label: 'Role', value: 'Product + full-stack' },
      { label: 'Institution', value: 'SKUAST-Kashmir · SKIIE' },
      { label: 'Surface', value: 'Public site + admin CMS' },
      { label: 'Status', value: 'Live at skiie.co.in' },
    ],
    links: [{ label: 'Visit skiie.co.in', href: 'https://skiie.co.in/' }],
  },
];
