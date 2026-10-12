// Offers confirmed by Hazik on 8 October 2026. Scope and term remain quote-specific.
// Additional capability rows reflect the existing service catalogue; no competitor exclusions are asserted.
// The build-only column defines an illustrative engagement, not a claim about other providers.
export const buildOnlyScope = 'For this illustrative comparison, build-only covers agreed software development and a technical handover. Hosting, ongoing maintenance and Android publishing are arranged separately. Providers and packages vary; compare the written quote.';

export const packageComparison = [
  {
    id: 'price', feature: 'Project pricing', question: 'Is the full development price agreed?',
    buildOnly: 'An agreed fee for the development work.',
    answer: 'One-time development payment.', detail: 'A fixed price for the agreed development scope.',
  },
  {
    id: 'hosting', feature: 'Server hosting', question: 'Who gets it online and handles hosting?',
    buildOnly: 'Hosting setup and service arranged separately.',
    answer: 'Hosting in your package.', detail: 'Setup and hosting for the term agreed in your quote.',
  },
  {
    id: 'maintenance', feature: 'Long-term care', question: 'What support follows the launch?',
    buildOnly: 'Ongoing maintenance arranged separately after handover.',
    answer: 'Maintenance options up to 4 years.', detail: 'Choose the coverage and duration your project needs.',
  },
  {
    id: 'play', feature: 'Google Play', question: 'Who handles the account and releases?',
    buildOnly: 'Android account setup, publishing and releases arranged separately.',
    answer: 'Setup. Publishing. Management.', detail: 'Play Console account setup, publishing and release management for Android projects.',
  },
  {
    id: 'access', feature: 'Publisher access', question: 'Who controls the publishing account?',
    buildOnly: 'You arrange the publisher account and its ongoing management.',
    answer: 'Your account. Your control.', detail: 'The Play Console account stays in your name, with delegated access for management.',
  },
  {
    id: 'workflow', feature: 'Your workflow', question: 'Will the product fit how your team works?',
    buildOnly: 'Interfaces and workflows specified in the development brief.',
    answer: 'Built around your people.', detail: 'Custom interfaces and workflows, shaped around the actual task.',
  },
  {
    id: 'connected', feature: 'The complete system', question: 'Who connects the app, data and backend?',
    buildOnly: 'Components and integrations as specified in the build scope.',
    answer: 'One connected product.', detail: 'Design, interfaces, databases and APIs considered together.',
  },
  {
    id: 'handover', feature: 'Project handover', question: 'What happens when the build is ready?',
    buildOnly: 'Technical handover at completion of the agreed build.',
    answer: 'Launch and handover, planned.', detail: 'Launch preparation and a structured project handover.',
  },
] as const;

export const offerScope = 'Your quote defines development scope, hosting term, maintenance coverage and third-party charges. Maintenance options extend up to four years. Google account verification and app review apply.';
