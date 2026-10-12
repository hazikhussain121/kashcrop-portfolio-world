/**
 * Expanded portfolio copy, based on caseStudies.ts, content.ts and the
 * confirmed package terms in offer.ts. These are descriptions of the work
 * and the engagement; they are not invented performance or adoption claims.
 */
export const homeCaseExcerpts: Record<string, string> = {
  baghban: 'Specialist consultations, orchard services, seasonal guidance and practical tools come together around the grower. Connected farmer, specialist and admin experiences carry the work from a first question to the next step.',
  'plant-health-clinic': 'A farmer shares photos, symptoms and field context. The clinic brings the case, relevant references and an AI-assisted draft into an expert review workflow, with case evidence and expert advice kept together.',
  skiie: 'A public home for startups, programmes, facilities and applications, connected to a content system that staff can maintain. The project brings discovery, structured publishing and institutional review into one platform.',
  kashcrop: 'Mandi rates, weather, seasonal tasks and orchard references sit alongside spray, profit and unit calculators. A regional product that brings everyday planning tools into one place.',
  'treat-my-fish': 'Fish-health reports combine photos, location, water and feed context. Experts review the case, prepare advice with supporting references, and retain a record for follow-up and research.',
  'trace-amp': 'A research interface for exploring antimicrobial peptides. Browser-based calculations, sequence and literature evidence, visual analysis and source-linked reports support a reviewable computational workflow.',
};

export const deliverySteps = [
  {
    title: 'Understand the work.',
    description: 'Start with the people, their roles and the tools they already use. Map the decisions, approvals and field conditions the product needs to support.',
    deliverable: 'Workflow & agreed scope',
  },
  {
    title: 'Make the idea tangible.',
    description: 'Shape the key journeys, content and interfaces. Working screens make it easier to discuss what belongs in the product and what needs to change.',
    deliverable: 'Flows & interface design',
  },
  {
    title: 'Connect the product.',
    description: 'Build the interfaces, backend, data and integrations together. Mobile delivery and AI features join that system where the project calls for them.',
    deliverable: 'A connected software product',
  },
  {
    title: 'Prepare for everyday use.',
    description: 'Bring deployment, publishing and handover into the launch plan. Agree the hosting term and maintenance coverage around the product being delivered.',
    deliverable: 'Launch, handover & support plan',
  },
] as const;

export const projectQuestions = [
  {
    question: 'What does the one-time payment cover?',
    answer: 'The agreed development scope. Your quote sets out what is being built and delivered, with hosting, maintenance and third-party charges stated separately so the full commitment is clear.',
  },
  {
    question: 'How are hosting and maintenance handled?',
    answer: 'We offer hosting for the term agreed in your quote and maintenance options up to four years. Coverage and duration are chosen for the project; they are defined before the work starts.',
  },
  {
    question: 'Who owns the Play Console account?',
    answer: 'The account stays in your name. KashCrop can handle account setup, publishing and release management through delegated access. Google account verification and app review still apply.',
  },
  {
    question: 'Does every project need AI?',
    answer: 'No. We use it where it serves a clear task, such as preparing a reference-backed draft for an expert to review. The interface, underlying data and human review steps are part of that product decision.',
  },
  {
    question: 'What should I send to get started?',
    answer: 'Tell us who will use the product, what they need to do, and what is difficult today. Share any existing website or app, your priorities, and a rough budget or timeline if you have one. The project enquiry is a useful starting point.',
  },
] as const;
