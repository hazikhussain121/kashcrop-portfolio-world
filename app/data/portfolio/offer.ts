// Offers confirmed by Hazik on 8 October 2026. Scope and term remain quote-specific.
// Additional capability rows reflect the existing service catalogue.
// Development-only describes an illustrative scope, not other providers' offers.
export const buildOnlyScope = 'A development-only job covers the software and handover. Hosting, maintenance and Google Play publishing are separate. Other providers’ packages may differ.';

export const packageComparison = [
  {
    id: 'price', feature: 'Development price', question: 'Is the full development price agreed?',
    buildOnly: 'An agreed development fee.',
    answer: 'One-time development fee.', detail: 'A fixed price for the work listed in your quote.',
  },
  {
    id: 'hosting', feature: 'Server hosting', question: 'Who gets it online and handles hosting?',
    buildOnly: 'Arranged separately.',
    answer: 'Hosting included.', detail: 'We set up the server. Your quote states how long hosting is covered.',
  },
  {
    id: 'maintenance', feature: 'Maintenance', question: 'What support follows the launch?',
    buildOnly: 'Arranged separately.',
    answer: 'Maintenance plans up to 4 years.', detail: 'Your quote lists what we maintain and for how long.',
  },
  {
    id: 'play', feature: 'Google Play publishing', question: 'Who handles the account and releases?',
    buildOnly: 'Arranged separately.',
    answer: 'Account setup and publishing.', detail: 'We also manage releases for your Android app.',
  },
  {
    id: 'access', feature: 'Publisher access', question: 'Who controls the publishing account?',
    buildOnly: 'You arrange the publisher account and its ongoing management.',
    answer: 'You own the publishing account.', detail: 'The account stays in your name. You give us access to manage it.',
  },
  {
    id: 'workflow', feature: 'Your workflow', question: 'Will the product fit how your team works?',
    buildOnly: 'Interfaces and workflows specified in the development brief.',
    answer: 'Software built for your team.', detail: 'We design the screens around the work your team needs to do.',
  },
  {
    id: 'connected', feature: 'The complete system', question: 'Who connects the app, data and backend?',
    buildOnly: 'Components and integrations as specified in the build scope.',
    answer: 'App and database integration.', detail: 'We connect your app to its database and server.',
  },
  {
    id: 'handover', feature: 'Project handover', question: 'What happens when the build is ready?',
    buildOnly: 'Technical handover at completion of the agreed build.',
    answer: 'Launch and handover.', detail: 'We prepare the software for launch and hand it over to your team.',
  },
] as const;

// Only ongoing/launch responsibilities belong in the comparison. The price and
// shared development fundamentals remain visible without a false competitive claim.
export const packageHighlights = packageComparison.filter(row =>
  row.id === 'hosting' || row.id === 'maintenance' || row.id === 'play');
export const packageFundamentals = packageComparison.filter(row =>
  row.id === 'access' || row.id === 'workflow' || row.id === 'connected' || row.id === 'handover');
export const packagePrice = packageComparison[0];

export const offerScope = 'Your quote lists the work, hosting period, maintenance and third-party fees. Google requires account verification and app review.';
