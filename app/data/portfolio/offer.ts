// Offers confirmed by Hazik on 8 October 2026. Scope and term remain quote-specific.
// Additional capability rows reflect the existing service catalogue; no competitor exclusions are asserted.
export const packageComparison = [
  {id: 'price', feature: 'Project pricing', question: 'Is the full development price agreed?', answer: 'One-time project payment.', detail: 'A fixed price for the agreed development scope.'},
  {id: 'hosting', feature: 'Server hosting', question: 'Who gets it online and handles hosting?', answer: 'Hosting in your package.', detail: 'Setup and hosting for the term agreed in your quote.'},
  {id: 'maintenance', feature: 'Long-term care', question: 'What support follows the launch?', answer: 'Maintenance up to 4 years.', detail: 'Choose the coverage and duration your project needs.'},
  {id: 'play', feature: 'Google Play', question: 'Who handles the account and releases?', answer: 'Setup. Publishing. Management.', detail: 'Play Console account setup and release management for Android projects.'},
  {id: 'access', feature: 'Publisher access', question: 'Who controls the publishing account?', answer: 'Your account. Your control.', detail: 'We manage your publisher account with your permission.'},
  {id: 'workflow', feature: 'Your workflow', question: 'Will the product fit how your team works?', answer: 'Built around your people.', detail: 'Custom interfaces and workflows, shaped around the actual task.'},
  {id: 'connected', feature: 'The complete system', question: 'Who connects the app, data and backend?', answer: 'One connected product.', detail: 'Design, interfaces, databases and APIs considered together.'},
  {id: 'handover', feature: 'Project handover', question: 'What happens when the build is ready?', answer: 'A clear next chapter.', detail: 'Launch preparation and a structured project handover.'},
] as const;

export const offerScope = 'Your quote defines development scope, hosting term, maintenance coverage and third-party charges. Maintenance options extend up to four years. Google account verification and app review apply.';
