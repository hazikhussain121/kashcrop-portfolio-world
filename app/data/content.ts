/**
 * All editable site copy lives here so content can change without touching UI.
 */

import { caseStudyProjects } from "./caseStudies";

export const site = {
  name: "KashCrop Innovations",
  legalName: "KashCrop Innovations Pvt Ltd",
  location: "Kashmir",
  tagline: "We build useful digital systems.",
} as const;

export const hero = {
  kicker: "Incubated at SKIIE · SKUAST-Kashmir",
  // Rendered as separate lines for the masked reveal animation.
  headline: ["Useful software,", "built for", "the real world."],
  intro:
    "Incubated at SKIIE, SKUAST-Kashmir, we design and build websites, full-stack applications, and applied AI systems in Kashmir.",
  marquee: [
    "Full-stack apps",
    "Applied AI",
    "Web platforms",
    "Edge infrastructure",
    "Region-specific products",
  ],
} as const;

export const studio = {
  index: "01",
  label: "Studio",
  // Hand-authored line breaks so the masked reveal wraps on meaning, not on
  // a mechanical word-count split.
  statement: [
    "We bring design,",
    "engineering, and applied AI",
    "together.",
  ],
  paragraphs: [
    "KashCrop Innovations is incubated at SKIIE, the SKUAST-Kashmir Innovation, Incubation and Entrepreneurship Centre. We build systems for agriculture, institutions, and applied AI, and we design them for reliable use after launch.",
    "We define the experience and manage technical delivery across interfaces, backends, data systems, and AI features. We begin with the operating workflow, design the system around it, and deliver the finished software.",
  ],
} as const;

export type ServiceDetail = {
  headline: string;
  philosophy: string;
  expandedIncludes: string[];
  proofDetails: { name: string; description: string; projectSlug?: string }[];
};

export type Service = {
  no: string;
  slug: string;
  title: string;
  description: string;
  // What the discipline usually includes in practice.
  includes: string[];
  proof: string[];
  icon: "stack" | "globe" | "spark" | "chain";
  detail?: ServiceDetail;
};

export const servicesSection = {
  index: "02",
  label: "What we do",
  opener: "Four disciplines,\none practice.",
  heading: "Four disciplines, one practice.",
} as const;

/**
 * Page-level copy for /services. Kept here so the route stays markup-only.
 */
export const servicesPage = {
  intro:
    "KashCrop Innovations builds full-stack software, web platforms, applied AI workflows, and traceability systems. We charge for development and agree ongoing support around the product that ships.",
  fitNote:
    "Our projects cover orchard tools, plant-health workflows, institutional platforms, and consumer products. We work where local context and the day-to-day workflow matter.",
  ctaLine:
    "If you already know the problem clearly, we can help shape the software around it.",
} as const;

export const services: Service[] = [
  {
    no: "S1",
    slug: "full-stack-apps",
    title: "Full-stack apps",
    description:
      "Full-stack software products. We handle frontend interfaces, backend systems, databases, APIs, mobile delivery, and cloud deployment.",
    includes: [
      "Product shaping and feature framing",
      "Frontend UI implementation",
      "Backend and API development",
      "Database design and workflow logic",
      "Deployment-ready product systems",
    ],
    proof: ["KashCrop", "Plant Health Clinic", "SKIIE"],
    icon: "stack",
    detail: {
      headline: "Full-stack products, built end to end.",
      philosophy: "We build and ship the whole product, from the interface to the backend, database, APIs, mobile app, and cloud deployment. We plan for weak connectivity when needed and build around the workflow people already use.",
      expandedIncludes: [
        "Product shaping for regional needs.",
        "Frontend UI implementation with React and Capacitor.",
        "Backend and API development with Cloudflare Workers and Hono.",
        "Reliable database design and workflow logic with D1 and Firebase.",
        "A product that is ready to deploy."
      ],
      proofDetails: [
        { name: "KashCrop", description: "A mobile-first orchard companion for Kashmir’s apple growers, with mandi rates, seasonal planning, calculators, and orchard references.", projectSlug: "kashcrop" },
        { name: "SKUAST Plant Health Clinic", description: "An expert review workflow for plant-health cases.", projectSlug: "skuast-plant-health-clinic" },
        { name: "AquAMP", description: "A peptide prediction product with biophysics analysis." }
      ]
    }
  },
  {
    no: "S2",
    slug: "website-development",
    title: "Websites",
    description:
      "Websites and web platforms for companies, institutions, startups, and teams that need an admin panel.",
    includes: [
      "Company and product websites",
      "Institutional / public-facing portals",
      "Admin-backed content systems",
      "Structured content architecture",
      "Polished public UX tied to maintainable backends",
    ],
    proof: ["SKIIE", "KashCrop landing site"],
    icon: "globe",
    detail: {
      headline: "Web platforms that are easy to use and maintain.",
      philosophy: "We build public websites with the admin tools behind them. That can be an institutional portal, a startup site, or a content-heavy company website. The result is fast, accessible, and easy for the team to update.",
      expandedIncludes: [
        "Company and product websites with clear content and strong type.",
        "Institutional and public-facing portals.",
        "Admin-managed CMS backends with R2 media uploads and Drizzle ORM.",
        "Structured content and route architecture.",
        "A public site connected to maintainable backend flows."
      ],
      proofDetails: [
        { name: "SKIIE", description: "An incubation website with public discovery and admin-managed content.", projectSlug: "skiie" },
        { name: "KashCrop landing site", description: "Focused, high-converting product showcase." }
      ]
    }
  },
  {
    no: "S3",
    slug: "ai-training",
    title: "Applied AI",
    description:
      "Applied AI workflows for domain-specific products. We design prompts, capture expert feedback, prepare datasets, and connect model features to the product.",
    includes: [
      "Domain-specific AI workflow design",
      "Feedback capture from experts",
      "Dataset shaping and export pipelines",
      "Structured preparation for model improvement",
      "AI features wired into real product flows",
    ],
    proof: ["PHC feedback pipeline", "Domain-specific product workflows"],
    icon: "spark",
    detail: {
      headline: "AI features connected to the work people do.",
      philosophy: "We build AI features around a real workflow. That means domain-specific prompts, expert feedback, training data, and knowledge bases when they are needed. The AI stays inside the product instead of sitting in a demo by itself.",
      expandedIncludes: [
        "Domain-specific AI workflow design, including multilingual agricultural models.",
        "Feedback capture from domain experts.",
        "Dataset shaping and export pipelines.",
        "Training data prepared for model improvement.",
        "AI features connected to real product workflows."
      ],
      proofDetails: [
        { name: "SKUAST Plant Health Clinic", description: "Expert-feedback and training-data pipeline.", projectSlug: "skuast-plant-health-clinic" },
        { name: "KashCrop", description: "A regional product workflow where practical orchard tools can grow into applied AI over time.", projectSlug: "kashcrop" }
      ]
    }
  },
  {
    no: "S4",
    slug: "blockchain-systems",
    title: "Blockchain",
    description:
      "Traceability systems that keep operational records clear and make important handoffs verifiable. We design the ledger, evidence flow, and public proof layer around the real process.",
    includes: [
      "Lot and chain-of-custody workflows",
      "Append-only event records",
      "Evidence and verification flows",
      "Public proof pages and QR access",
      "Blockchain anchoring adapters",
    ],
    proof: ["AmbriChain", "Apple traceability pilot"],
    icon: "chain",
    detail: {
      headline: "Traceability with proof where it matters.",
      philosophy: "Readable records and private evidence stay in the application. A cryptographic summary can then be anchored to a public chain so important claims can be checked without making the blockchain the product.",
      expandedIncludes: [
        "Lot genealogy and chain-of-custody workflows.",
        "Append-only event ledgers with correction history.",
        "Evidence capture, review, and verification states.",
        "Public traceability pages with QR access.",
        "Network adapters for periodic blockchain anchoring.",
      ],
      proofDetails: [
        { name: "AmbriChain", description: "A traceability system for documenting crop lots, custody events, and evidence-backed claims." },
        { name: "Apple traceability pilot", description: "A practical proof layer that keeps operational data readable and uses blockchain for public tamper evidence." },
      ],
    },
  },
];

/**
 * A screenshot for a project's dedicated page.
 * `src` is any image URL (place files under /public and reference as "/shots/...").
 * `caption` is optional copy shown beneath the image in the gallery.
 * `wide` makes the shot span the full gallery width (great for desktop captures).
 */
export type ProjectShot = {
  src: string;
  alt: string;
  caption?: string;
  wide?: boolean;
  // Optional performance hints — all optional, so a plain { src, alt } shot
  // keeps working unchanged:
  //   width/height  → intrinsic pixel size; set both to reserve space and
  //                   prevent layout shift (CLS) while the image loads.
  //   srcAvif/srcWebp → modern-format sources (URL or full srcset string),
  //                     served ahead of `src` when the browser supports them.
  //   srcSet/sizes  → responsive candidates for the fallback <img>.
  width?: number;
  height?: number;
  srcAvif?: string;
  srcWebp?: string;
  srcSet?: string;
  sizes?: string;
};

/**
 * A video embedded on a project's dedicated page.
 * - For YouTube: set `provider: "youtube"` and `id` to the video id
 *   (the part after `v=`, or after `youtu.be/`).
 * - For Facebook: set `provider: "facebook"` and `url` to the full post/video URL.
 */
export type ProjectVideo = {
  provider: "youtube" | "facebook";
  title: string;
  id?: string;
  url?: string;
};

/**
 * A self-hosted, high-quality screen recording of the real app UI. This is the
 * hero visual for each project — it replaces faux mock skeletons with actual
 * product footage, which is what makes "Proof, not promises" true.
 *
 * Drop the file(s) under /public/clips/<slug>/ and reference as
 * "/clips/<slug>/demo.mp4". A `poster` still (first frame) is strongly
 * recommended so the stage looks intentional before the clip loads / on
 * reduced-motion. Until a clip exists, leave `clip` undefined on the project
 * and the stage shows a designed "in production" placeholder — no layout shift
 * when you add it later.
 *
 * `aspect` controls the stage frame:
 *   "phone"     — 9:19.5 tall device (mobile app captures)
 *   "desktop"   — 16:10 browser/dashboard captures (default)
 *   "square"    — 1:1
 */
export type ProjectClip = {
  src: string;          // "/clips/kashcrop/demo.mp4"
  srcWebm?: string;     // optional "/clips/kashcrop/demo.webm" (served first)
  poster?: string;      // "/clips/kashcrop/poster.jpg" — first frame still
  label?: string;       // short caption, e.g. "AI assistant, live"
  aspect?: "phone" | "desktop" | "wide16x9" | "square";
};

/**
 * A generic external link with an optional `kind` so the UI can pick the right
 * icon/label treatment. `kind` defaults to "website".
 */
export type ProjectLink = {
  label: string;
  href: string;
  kind?:
    | "website"
    | "appstore"
    | "playstore"
    | "github"
    | "youtube"
    | "facebook"
    | "social";
};

/**
 * Optional rich content for a project's dedicated page. When a project has a
 * `detail`, the home Work card and the projects index link to /projects/<slug>.
 * Everything here is optional, so a project can opt into as much (or as little)
 * as it wants.
 */
export type ProjectDetail = {
  // Longer narrative shown at the top of the dedicated page. Each entry is a
  // paragraph. Falls back to `summary` when omitted.
  overview?: string[];
  vizier?: {
    headline: string;
    steps: string[];
  };
  diagrams?: { title: string; code: string }[];
  // Headline metrics / facts shown as an editorial ledger (e.g. role, timeline).
  facts?: { label: string; value: string }[];
  // Screenshots gallery.
  shots?: ProjectShot[];
  // Embedded videos (YouTube / Facebook demos, walkthroughs).
  videos?: ProjectVideo[];
  // Extra self-hosted UI recordings beyond the project's hero `clip`.
  clips?: ProjectClip[];
};

export type Project = {
  no: string;
  // URL-safe identifier used for the dedicated page at /projects/<slug>.
  slug: string;
  name: string;
  kind: string;
  year: string;
  tagline: string;
  summary: string;
  features: string[];
  stack: string[];
  accent: string;
  links: ProjectLink[];
  mock: "phone" | "dashboard" | "browser";
  // Self-recorded UI clip shown as the project's hero visual. Optional: when
  // omitted, ProjectStage renders a designed placeholder framed by `mock`.
  clip?: ProjectClip;
  detail?: ProjectDetail;
};

export const workSection = {
  index: "03",
  label: "Portfolio",
  opener: "Quality software,\nbuilt efficiently.",
  heading: "Quality software, built efficiently.",
} as const;

export const projects: Project[] = caseStudyProjects;

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  PROJECT TEMPLATE — copy/paste this object into the `projects` array above
 *  to add a new project. Delete the fields you don't need; everything inside
 *  `detail` is optional. Full instructions: docs/ADDING-A-PROJECT.md
 * ─────────────────────────────────────────────────────────────────────────
 */
export const PROJECT_TEMPLATE: Project = {
  no: "04", // running number shown beside the title — keep it sequential
  slug: "my-new-project", // URL-safe; page lives at /projects/my-new-project
  name: "My New Project",
  kind: "What it is (e.g. Web platform)",
  year: "2026",
  tagline: "One punchy sentence about the project.",
  summary:
    "A short paragraph (2–4 sentences) describing what the project does and who it is for. This is shown on the home page card and the projects index.",
  features: [
    "Key capability one",
    "Key capability two",
    "Key capability three",
  ],
  stack: ["React", "TypeScript", "Add your tech"],
  accent: "#e10f1c", // brand-ish hex used for glows/highlights on this project
  mock: "browser", // frame hint when there's no clip yet: "phone" | "dashboard" | "browser"
  // Self-recorded UI clip (the project's hero visual). Omit until you have
  // footage — a designed placeholder shows in the meantime, no layout shift.
  // clip: { src: "/clips/my-new-project/demo.mp4", poster: "/clips/my-new-project/poster.jpg", aspect: "desktop", label: "My app, live" },
  links: [
    { label: "Open live site", href: "https://example.com", kind: "website" },
    // { label: "View on GitHub", href: "https://github.com/...", kind: "github" },
    // { label: "App Store", href: "https://apps.apple.com/...", kind: "appstore" },
    // { label: "Play Store", href: "https://play.google.com/...", kind: "playstore" },
  ],
  // OPTIONAL. Add `detail` to give the project a rich dedicated page.
  // Omit it entirely and the project still gets a basic page from the fields above.
  detail: {
    overview: [
      "First paragraph of the longer story behind the project.",
      "Second paragraph — process, decisions, outcomes.",
    ],
    facts: [
      { label: "Role", value: "e.g. Full-stack" },
      { label: "Timeline", value: "e.g. 2026" },
    ],
    // Put image files in /public/shots/<slug>/ and reference them as below.
    shots: [
      { src: "/shots/my-new-project/cover.png", alt: "Cover screenshot", wide: true },
      { src: "/shots/my-new-project/feature.png", alt: "A feature", caption: "Optional caption." },
    ],
    videos: [
      // YouTube — pass only the video id (after v= or youtu.be/).
      { provider: "youtube", id: "VIDEO_ID", title: "Demo video" },
      // Facebook — paste the full post/video URL.
      { provider: "facebook", url: "https://www.facebook.com/watch/?v=VIDEO_ID", title: "Facebook demo" },
    ],
  },
};

/** Find a project by its slug — used by the dedicated page route loader. */
export function getProjectBySlug(slug: string): Project | undefined {
  // Keep the pre-restoration SKUAST URL working for service proof links while
  // retaining the canonical case-study slug from the source content.
  const canonicalSlug = slug === "skuast-plant-health-clinic" ? "plant-health-clinic" : slug;
  return projects.find((p) => p.slug === canonicalSlug);
}

export const founder = {
  index: "04",
  label: "Founder",
  name: "Hazik Hussain",
  opener: "The person\nbehind the work.",
  role: "Founder · Product & Engineering",
  bio: "Hazik Hussain founded KashCrop Innovations in Srinagar. The company is incubated at SKIIE, SKUAST-Kashmir. He has built KashCrop, an orchard-management platform; the SKUAST Plant Health Clinic workflow; and the SKIIE startup and incubation website. He also created Sahlent and Kinfinity.",
  pull: "Products for real users, built across product, engineering, and AI.",
  // Mini proof ledger shown beside the bio so the founder block reads as a
  // builder identity, not a single landing page.
  proof: [
    "Agriculture product systems",
    "AI-assisted expert workflows",
    "Institutional and startup web platforms",
    "Consumer-facing experiments and utilities",
  ],
} as const;

/**
 * Page-level copy for /about. The Studio and Founder components carry the
 * core narrative; these blocks deepen it with philosophy, regional context,
 * scientific range, and supporting products — all grounded in known facts.
 */
export const aboutPage = {
  philosophy: {
    label: "Why this work exists",
    paragraphs: [
      "We build around the way people work. That means dealing with weak connectivity, local language, institutional review, and the tools teams already use.",
      "The process is simple: understand the workflow, design the product, and ship the engineering.",
    ],
  },
  regionalContext: {
    label: "Built from Kashmir",
    body: "The studio is based in Kashmir and shaped by regional needs. Good work starts with local context, sound engineering, and a clear product decision.",
  },
  scientificRange: {
    label: "Scientific & technical range",
    body: "AquAMP uses React and Cloudflare Workers to analyze peptide properties, score predictions, show activity profiles, and keep prediction history.",
  },
  supporting: {
    label: "Beyond the flagship work",
    intro:
      "Hazik has also built smaller products and experiments.",
    products: [
      {
        name: "AquAMP",
        summary:
          "AMP prediction product with a React frontend and Cloudflare Workers backend. It covers biophysics analytics, prediction scoring, activity profiles, and prediction history.",
      },
      {
        name: "Sahlent",
        summary:
          "A lightweight Android utility app that automatically silences the phone during prayer times and bundles useful Islamic daily-use tools.",
      },
      {
        name: "Kinfinity",
        summary:
          "An interactive web experiment that helps users learn Kashmiri vocabulary through play.",
      },
    ],
  },
  closing:
    "KashCrop Innovations builds software for real workflows. If you need that kind of product, start the conversation.",
} as const;

export const incubator = {
  name: "SKIIE",
  fullName:
    "SKUAST-Kashmir Innovation, Incubation & Entrepreneurship Centre",
  blurb:
    "KashCrop Innovations is incubated at SKIIE, the SKUAST-Kashmir Innovation, Incubation and Entrepreneurship Centre.",
  address: "SKIIE Centre, SKUAST-Kashmir, Shalimar Campus, Srinagar",
  email: "naveedbhat@skuastkashmir.ac.in",
  phone: "+91 70068 31280",
  phoneHref: "tel:+917006831280",
  href: "https://skiie.co.in/",
  logo: "/skiie-logo.png",
} as const;

export const contact = {
  index: "05",
  label: "Contact",
  heading: ["Have a project", "to build?"],
  opener: "Let's build\nsomething useful.",
  blurb:
    "Tell us what you need. We take on a few products at a time and build them carefully.",
  // Where the primary CTA now points. The dedicated request page is the funnel
  // entry; email/phone stay as secondary, lower-friction fallbacks.
  formHref: "/contact",
  email: "Hazik@Kashcrop.in",
  phone: "+91 8493905940",
  phoneHref: "tel:+918493905940",
  socials: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/hazik-hussain-49b5663a3/",
    },
    { label: "Instagram", href: "https://www.instagram.com/_haz_ik/" },
  ],
} as const;

export const nav = [
  { label: "Studio", href: "#studio" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
] as const;

/**
 * Copy + options for the dedicated request page at /contact. This is the lead
 * funnel for paid (e.g. Meta) ad traffic, so the questions double as light
 * qualification. Editing this block reshapes the form without touching the UI.
 *
 * Delivery is handled by `app/routes/contact.tsx` through Web3Forms while the
 * site is on the free Cloudflare plan.
 */
export const requestForm = {
  eyebrow: "Start a project",
  heading: ["Tell us what", "you need built."],
  blurb:
    "A few quick questions help us understand the project before the first call. No login is needed. Your message goes straight to the team.",
  // Service interests. `value` is what gets submitted; `label` is shown. Keep
  // these aligned with what the studio actually offers, plus an open Other.
  services: [
    { value: "website", label: "Website / web platform" },
    { value: "fullstack-app", label: "Full-stack app (web + mobile)" },
    { value: "ai", label: "AI solution / assistant" },
    { value: "automation", label: "Form & document automation" },
    { value: "other", label: "Something else" },
  ],
  // Budget bands in INR. Ranges convert better than an open number field and
  // let the team triage seriousness at a glance. 20k floor -> 10 lakh+ ceiling.
  budgets: [
    { value: "20k-50k", label: "₹20k – ₹50k" },
    { value: "50k-1L", label: "₹50k – ₹1 lakh" },
    { value: "1L-3L", label: "₹1 – 3 lakh" },
    { value: "3L-10L", label: "₹3 – 10 lakh" },
    { value: "10L+", label: "₹10 lakh+" },
    { value: "unsure", label: "Not sure yet" },
  ],
  // Urgency helps prioritise hot leads from a campaign.
  timelines: [
    { value: "asap", label: "As soon as possible" },
    { value: "1-3m", label: "In 1–3 months" },
    { value: "3m+", label: "Just exploring" },
  ],
  success: {
    heading: "Request received.",
    body: "Thanks. Your project request is with the team. We read every message and usually reply within a day or two.",
  },
} as const;
