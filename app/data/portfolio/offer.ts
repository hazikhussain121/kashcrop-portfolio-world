// Offers confirmed by Hazik on 8 October 2026. Scope and term remain quote-specific.
// Additional capability rows reflect the existing service catalogue.
// Development-only describes an illustrative scope, not other providers' offers.
export const buildOnlyScope = 'Here, development only means the software build and technical handover. The comparison is between project scopes, not individual providers.';

export const packageComparison = [
  {
    id: 'price', feature: 'Development price', question: 'Is the full development price agreed?',
    buildOnly: 'An agreed development fee.',
    answer: 'One-time development payment.', detail: 'A fixed price for the agreed development scope.',
  },
  {
    id: 'hosting', feature: 'Server hosting', question: 'Who gets it online and handles hosting?',
    buildOnly: 'Arranged separately.',
    answer: 'Included for the agreed term.', detail: 'Server setup and hosting, as set out in your quote.',
  },
  {
    id: 'maintenance', feature: 'Maintenance', question: 'What support follows the launch?',
    buildOnly: 'Arranged separately.',
    answer: 'Options up to 4 years.', detail: 'Coverage and duration agreed for your project.',
  },
  {
    id: 'play', feature: 'Google Play publishing', question: 'Who handles the account and releases?',
    buildOnly: 'Arranged separately.',
    answer: 'Publishing and release management.', detail: 'Account setup included for Android projects.',
  },
  {
    id: 'access', feature: 'Publisher access', question: 'Who controls the publishing account?',
    buildOnly: 'You arrange the publisher account and its ongoing management.',
    answer: 'Your Play Console account.', detail: 'The account stays in your name, with delegated access for management.',
  },
  {
    id: 'workflow', feature: 'Your workflow', question: 'Will the product fit how your team works?',
    buildOnly: 'Interfaces and workflows specified in the development brief.',
    answer: 'Custom interfaces and workflows.', detail: 'Built around how your team works and the task at hand.',
  },
  {
    id: 'connected', feature: 'The complete system', question: 'Who connects the app, data and backend?',
    buildOnly: 'Components and integrations as specified in the build scope.',
    answer: 'One connected product.', detail: 'Design, interfaces, databases and APIs considered together.',
  },
  {
    id: 'handover', feature: 'Project handover', question: 'What happens when the build is ready?',
    buildOnly: 'Technical handover at completion of the agreed build.',
    answer: 'A planned project handover.', detail: 'Launch preparation and a structured project handover.',
  },
] as const;

// Only ongoing/launch responsibilities belong in the comparison. The price and
// shared development fundamentals remain visible without a false competitive claim.
export const packageHighlights = packageComparison.filter(row =>
  row.id === 'hosting' || row.id === 'maintenance' || row.id === 'play');
export const packageFundamentals = packageComparison.filter(row =>
  row.id === 'access' || row.id === 'workflow' || row.id === 'connected' || row.id === 'handover');
export const packagePrice = packageComparison[0];

export const offerScope = 'Your quote defines development scope, hosting term, maintenance coverage and third-party charges. Maintenance options extend up to four years. Google account verification and app review apply.';
