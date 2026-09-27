import type { Project } from "./content";
import { caseStudyDiagrams } from "./caseStudyDiagrams";

/**
 * Canonical project copy from the company-first Vizier site. The restored
 * editorial shell consumes this data without changing its visual language.
 */
const sourceProjects: Project[] = [
  {
    no: "01",
    slug: "plant-health-clinic",
    name: "SKUAST Plant Health Clinic",
    kind: "Crop diagnosis system",
    year: "2026",
    tagline: "Farmers send crop cases to SKUAST-K experts.",
    summary:
      "Farmers send photos, symptoms, and voice notes from the field. Vizier drafts a diagnosis. A SKUAST-K expert reviews it and sends the advice.",
    features: [
      "Farmers can send images, audio, and symptom details",
      "Search SKUAST advisories and past cases",
      "Treatment suggestions use approved or locally available chemicals",
      "Each case includes a draft diagnosis for review",
      "Expert corrections are saved for testing",
      "The Android app works offline and sends push notifications",
    ],
    stack: [
      "React 18",
      "TypeScript",
      "Capacitor",
      "Cloudflare Workers (Hono)",
      "D1",
      "R2",
      "Vectorize",
      "Vertex AI",
      "Firebase Auth + FCM",
    ],
    accent: "#ff5b3a",
    links: [
      { label: "Rising Kashmir", href: "https://risingkashmir.com/skuast-k-launches-ai-driven-plant-health-clinic/" },
      { label: "Kashmir Reader", href: "https://kashmirreader.com/2026/04/09/skuast-k-launches-nextgen-e-plant-clinic-at-shalimar-campus/" },
    ],
    mock: "dashboard",
    detail: {
      overview: [
        "Farmers use the Android app to send a plant photo, voice note, and short symptom form. Plant pathologists at SKUAST-Kashmir review each case in a web dashboard, confirm the diagnosis, and send a treatment plan.",
        "The Vice-Chancellor launched the system at the Directorate of Extension. It runs on Cloudflare, so the institution can handle cases without maintaining a server.",
      ],
      vizier: {
        headline: "Vizier uses SKUAST-K pathology material to prepare a draft.",
        steps: [
          "SKUAST-K plant-pathology material is stored in one searchable library.",
          "The system retrieves passages that match each case.",
          "Vizier uses those passages to prepare the draft diagnosis.",
          "Treatment suggestions are limited to approved or locally available chemicals.",
        ],
      },
      facts: [
        { label: "Role", value: "Product + full-stack + AI" },
        { label: "Interfaces", value: "Farmer app and expert dashboard" },
        { label: "Institution", value: "SKUAST-Kashmir" },
        { label: "Status", value: "Launched by the VC" },
      ],
    },
  },
  {
    no: "02",
    slug: "trace-amp",
    name: "TRACE-AMP",
    kind: "Antimicrobial-peptide workbench",
    year: "2026",
    tagline: "A workbench for antimicrobial-peptide research.",
    summary:
      "Researchers enter a protein, DNA, or RNA sequence. The workbench calculates its properties, shows predicted structures, and checks databases and papers.",
    features: [
      "Protein, DNA, or RNA input with reading-frame translation",
      "Real-time charge, pI, hydrophobicity, Boman, GRAVY, and hydrophobic moment",
      "Search across Vectorize, UniProt, AlphaFold, ESMFold, and PubMed",
      "2D wheel, surface map, and 3D structure views",
      "Mutation Playground and Design Studio",
      "Batch mode for 50 sequences, comparison for 8 peptides, and PDF or JSON reports",
    ],
    stack: [
      "React 19",
      "TypeScript",
      "Vite",
      "Cloudflare Workers (Hono)",
      "Workers AI",
      "Vectorize",
      "D1",
      "UniProt",
      "AlphaFold",
      "ESMFold",
      "PubMed",
      "Gemini",
    ],
    accent: "#c86b3c",
    links: [],
    mock: "dashboard",
    detail: {
      overview: [
        "A researcher enters a protein, DNA, or RNA sequence. TRACE-AMP calculates charge, isoelectric point, hydrophobicity, Boman index, GRAVY, and hydrophobic moment in the browser. It then checks external evidence and produces a report that can be saved or shared.",
        "The platform includes a 2D helical wheel, a surface map, and a 3D structure viewer. Researchers can test mutations, design peptides under set constraints, screen batches of up to 50 sequences, and compare up to eight peptides. The application runs on Cloudflare.",
      ],
      vizier: {
        headline: "Vizier checks peptide, structure, and literature sources for each sequence.",
        steps: [
          "The search covers UniProt, AlphaFold, ESMFold, PubMed, and a local peptide index.",
          "Vizier queries these sources in parallel.",
          "The model receives matching sequences, structures, and papers.",
          "The report lists the sources used for the result.",
        ],
      },
      facts: [
        { label: "Role", value: "Product + full-stack" },
        { label: "Audience", value: "Researchers and students" },
        { label: "Method", value: "RAG across sources and biophysics" },
        { label: "Output", value: "Report with sources" },
      ],
    },
  },
  {
    no: "03",
    slug: "kashcrop",
    name: "KashCrop",
    kind: "Orchard companion",
    year: "2026",
    tagline: "An orchard app for Kashmir's apple farmers.",
    summary:
      "KashCrop is a practical orchard companion for Kashmir's apple farmers, keeping seasonal tasks, mandi rates, weather, references, and field calculators in one place.",
    features: [
      "Live mandi market rates",
      "Seasonal task roadmap",
      "Spray, profit, and unit calculators",
      "Orchard library and practical references",
      "Weather and orchard context",
      "Kashmiri, Urdu, and English interface",
    ],
    stack: [
      "React 19",
      "Vite 7",
      "Tailwind",
      "Capacitor 7",
      "Cloudflare Workers (Hono)",
      "D1",
      "Firebase",
    ],
    accent: "#e10f1c",
    links: [
      { label: "Open web app", href: "https://kashcrop.web.app", kind: "website" },
      { label: "Play Store", href: "https://play.google.com/store/apps/details?id=com.kashcrop.app", kind: "playstore" },
      { label: "Kashmir Ahead", href: "https://kashmirahead.com/kashcrop-app-by-19-year-old-hazik-hussain-to-transform-kashmir-horticulture/" },
    ],
    mock: "phone",
    detail: {
      overview: [
        "KashCrop brings the most useful public orchard tools together: live mandi rates, a seasonal roadmap, weather, references, and calculators for spray quantities, units, and estimated profit.",
        "The public surface is free to open on the web and available on Android. Account-based and experimental features remain separate from the core utility experience while they are maintained.",
      ],
      facts: [
        { label: "Role", value: "Product + full-stack" },
        { label: "Platform", value: "Web + Android" },
        { label: "Public surface", value: "Mandi, roadmap, tools, library" },
        { label: "Languages", value: "Kashmiri, Urdu, and English" },
      ],
    },
  },
  {
    no: "04",
    slug: "treat-my-fish",
    name: "Treat My Fish",
    kind: "Fish health system",
    year: "2026",
    tagline: "Growers send fish-health cases to fisheries experts.",
    summary:
      "Growers send photos, location, and water readings from a mobile app. Vizier drafts a diagnosis. Fisheries experts review the case in a web dashboard.",
    features: [
      "Mobile app for growers and web dashboard for experts",
      "Cases include images, water readings, location, and feed data",
      "Searchable library of fish-pathology references",
      "Draft diagnosis based on case data and fish-health references",
      "Cases grouped by species, district and syndrome",
      "Expert-reviewed cases can be exported",
    ],
    stack: [
      "React 18",
      "TypeScript",
      "Vite",
      "Capacitor",
      "Cloudflare Workers (Hono)",
      "D1",
      "R2",
      "Vectorize",
      "Azure AI",
      "Firebase Auth",
    ],
    accent: "#4f8b86",
    links: [],
    mock: "dashboard",
    detail: {
      overview: [
        "Fish growers use a mobile app to send photos, location, water readings, and feed data. Fish-health experts at SKUAST-Kashmir's College of Fisheries review each case in a web dashboard, send advice, and record follow-up.",
        "The dashboard groups cases by species, district, and syndrome. Experts can see possible disease clusters. Reviewed cases can be exported for research and model testing.",
      ],
      vizier: {
        headline: "Vizier uses fish-pathology references for each draft diagnosis.",
        steps: [
          "Selected fish-pathology references are stored in a searchable library.",
          "The system retrieves passages that match each case.",
          "Vizier uses the grower's photos, water readings, and those passages to prepare a draft.",
          "An expert reviews the draft before sending the advisory.",
        ],
      },
      facts: [
        { label: "Role", value: "Product + full-stack + AI" },
        { label: "Interfaces", value: "Grower app and expert dashboard" },
        { label: "Institution", value: "SKUAST-K College of Fisheries" },
        { label: "Domain", value: "Coldwater fisheries: trout, carp" },
      ],
    },
  },
  {
    no: "05",
    slug: "skiie",
    name: "SKIIE",
    kind: "Incubation & startup portal",
    year: "2026",
    tagline: "The SKIIE website and content system.",
    summary:
      "The site lists SKIIE startups, programmes, events and facilities. Staff manage the content through an admin panel.",
    features: [
      "Public startup & programme discovery",
      "Full admin CMS: events, notifications, banners",
      "Content stored by page and section",
      "R2-backed media uploads",
      "Startup applications converted into draft profiles",
      "Institutional UX on the SKUAST identity",
    ],
    stack: ["React Router 7", "React 19", "Drizzle ORM", "Cloudflare", "D1", "R2"],
    accent: "#ff2d2d",
    links: [{ label: "Visit skiie.co.in", href: "https://skiie.co.in/", kind: "website" }],
    mock: "browser",
    detail: {
      overview: [
        "SKIIE is the website for SKUAST-Kashmir's Innovation, Incubation and Entrepreneurship Centre. Visitors can find startups, programmes, facilities, events, and application forms. Staff can update pages, notices, banners, and startup profiles without editing code.",
        "The site stores structured content in D1 and media in R2. Its colours and typography follow the existing SKUAST-K and SKIIE identity.",
      ],
      vizier: {
        headline: "Vizier helps staff prepare startup profiles and search centre records.",
        steps: [
          "It turns application fields into a draft startup profile.",
          "Staff review the draft before publishing it.",
          "Search uses the centre's startup and programme records.",
          "The website and admin tools work without Vizier.",
        ],
      },
      facts: [
        { label: "Role", value: "Product + full-stack" },
        { label: "Institution", value: "SKUAST-Kashmir and SKIIE" },
        { label: "Surface", value: "Public site + admin CMS" },
        { label: "Status", value: "Live at skiie.co.in" },
      ],
    },
  },
];

export const caseStudyProjects: Project[] = sourceProjects.map((project) => ({
  ...project,
  detail: project.detail
    ? { ...project.detail, diagrams: caseStudyDiagrams[project.slug] }
    : project.detail,
}));
