# KashCrop Apple Overdrive

Date: 8 October 2026

Status: implementation and verification complete. The coordinated check passed type checking, 71 unit tests and the production build. Final confirmation passed 18 targeted browser checks and 9 selected Playwright regressions. This note records the implemented package and its approved direction.

## Purpose

The user asked for more visual flair and a clearer comparison of KashCrop’s hosting, one-time payment, maintenance and Play Store support. Continue the approved Apple-inspired presentation with a more expressive product moment and a useful way to compare project quotes.

Keep the existing KashCrop identity, real portfolio, neutral type system and direct project enquiry flow. The new dark package stage is a local presentation surface; the comparison and surrounding pages remain light.

## Confirmed offer and scope

The user confirmed four offers:

- One-time project payment for the agreed development scope.
- Server setup and hosting for the term agreed in the quote.
- Maintenance options extending up to four years, with coverage and duration agreed for the project.
- Play Console account setup, publishing and release management for Android projects.

The quote defines development scope, hosting term, maintenance coverage and third-party charges. Keep “up to” attached to the four-year maintenance message. The publisher account is set up in the client’s name; KashCrop manages it with delegated permission. Google account verification and app review still apply.

Do not broaden these statements into lifetime hosting, unlimited changes, automatic four-year coverage for every project, included third-party charges or guaranteed app approval. The scope disclosure belongs beside the comparison.

The four confirmed offers are distinguished from supporting capability rows drawn from the existing service catalogue. The canonical copy is [offer.ts](../../app/data/portfolio/offer.ts).

## A comparison built around questions

The light table has eight rows and three columns: **What matters**, **When comparing quotes**, and **With KashCrop**. Ask concrete questions about other quotes; do not mark unnamed competitors as missing a feature.

| What matters | Question to ask when comparing quotes | KashCrop statement and boundary |
|---|---|---|
| Project pricing | Is the full development price agreed? | One-time project payment; a fixed price for the agreed development scope. |
| Server hosting | Who gets it online and handles hosting? | Setup and hosting for the term agreed in the quote. |
| Long-term care | What support follows the launch? | Maintenance options up to four years, with coverage and duration selected for the project. |
| Google Play | Who handles the account and releases? | Account setup, publishing and release management for Android projects. |
| Publisher access | Who controls the publishing account? | The client controls the account; management requires permission. |
| Your workflow | Will the product fit how your team works? | Custom interfaces and workflows shaped around the actual task. |
| The complete system | Who connects the app, data and backend? | Design, interfaces, databases and APIs considered together. |
| Project handover | What happens when the build is ready? | Launch preparation and a structured project handover. |

The visible note says, “Compare written scopes. Every provider’s offer is different.” A native **Package scope and terms** disclosure holds the scope wording and the official Google account guidance link. This is a quote comparison aid, with no invented competitor pricing or exclusions.

## Package presentation

The heading is **The complete package.** Its supporting line is **Built for launch. Looked after for the long run.**

The dark stage combines a large **1** for one-time project payment, a large **4** with a visible **Up to** qualifier for maintenance options, and an actual interface in a phone frame. Hosting and Play Store management sit in supporting chips. Orbital geometry and device depth supply the added flair without becoming new application content.

Build, Launch and Care tabs change the interface and its adjacent explanation:

| Chapter | Interface asset | Message |
|---|---|---|
| Build | public/media/portfolio/garden-home.webp | Made for your world: workflow, interface and connected product. |
| Launch | public/media/portfolio/phc-home.webp | Ready for the real world: hosting, publishing and going live. |
| Care | public/media/portfolio/phc-guide.webp | A longer view: maintenance options up to four years. |

These are existing 390 × 844 project review captures, reused without generating or fabricating screenshots. Their role is to show interface work; they do not establish current release status, adoption or validated AI accuracy. A visible source line keeps that context clear: “Actual project interfaces. Your package is scoped to your project.”

The stage returns to a light eight-row comparison with readable questions, offer details, the scope disclosure and a direct contact action.

## Entry points

[KashCropOffer.tsx](../../app/components/portfolio/KashCropOffer.tsx) exports three reusable pieces:

- **OfferRibbon:** four compact benefits and a link to /services#compare.
- **KashCropOffer:** the dark package stage, chapter controls and complete comparison for the homepage.
- **OfferComparison:** the standalone comparison with heading, table, terms and an optional closing action.

[services.tsx](../../app/routes/services.tsx) places the standalone comparison before the final working-together section. It passes showClose=false so the established final contact section remains the single closing action, without a redundant services self-link. Its introduction links to #compare and says that pricing, hosting and care are scoped to the project. All four existing services and their proof and routes remain present.

The **Why KashCrop** navigation link points to /services#compare. The homepage, header and services integrations are present, and [offer.css](../../app/styles/portfolio/offer.css) supplies the scoped package and comparison styling.

## Motion, keyboard and smaller screens

The package component’s scroll choreography is eligible only at a minimum width of 900px with hover support and a fine pointer. The device enters with depth and scale; numerals and support chips move into position; local orbital geometry follows the scroll. Pointer movement adds restrained device tilt and resets on exit or eligibility changes. This package gate is separate from the existing homepage sticky product showcase gate.

The package screen transitions use 0.55s opacity and 0.85s transform timing; text panels arrive over 0.55s. Pointer tilt is approximately ±2.5 degrees on either axis with 0.55s smoothing. Composition and orbit scrubs use 0.8 and 1, respectively.

Both motion effects stop when the shared reduced-motion preference is active. CSS also disables package animations and transitions for reduced motion or the site’s motion-off setting. Touch pointers do not drive tilt. Build, Launch and Care remain directly selectable; the tab implementation supports Left/Right, Home/End, a roving tab stop and associated tab panels.

At 750px and below, the phone sits beside the payment and care numerals, with hosting and publishing chips below. Each comparison row uses a full-width feature heading over two labeled cells. The complete package message, maintenance qualifier, tabs, terms and contact routes remain present. Semantic table roles and headers are retained. Independent visual review confirmed readable wrapping and a complete presentation at 390, 820 and 1440 CSS pixels, including the native-width phone comparison.

The homepage entrance now acts on inner device elements: the center desktop enters over 1.7s starting at 0.12s, and phones enter over 1.6s starting at 0.25s and 0.33s. The outer wrappers handle the scroll fan independently. This separation keeps the entrance and scroll transforms from overwriting one another.

## Verification

The coordinated npm run check passed type checking, 71 unit tests and the production build. Evidence: completed job 20261008T152858-d230f63408; the QA reviewer read the completed check log and confirmed those results.

The first focused browser pass confirmed package keyboard/touch behavior, accessible table and disclosure structure, automated accessibility checks, native scrolling, project chapter behavior, dynamic motion cleanup and four no-JavaScript route cases. It found a normal-motion navigation race and an overly narrow test threshold for the expected hash offset; both were resolved before final confirmation.

Two bounded corrections were made:
- Services passes showClose=false to avoid a duplicate closing enquiry block and a self-link.
- ScrollDirector refreshes only while ScrollTrigger.getAll().length is greater than zero. Browser instrumentation showed the router calling compare.scrollIntoView(), followed about 20ms later by two ScrollTrigger scrollTo(0,0) calls with zero active scenes. The installed ScrollTrigger source confirms that refresh still visits cached viewport scrollers when its trigger list is empty. The guard preserves native hash navigation on routes with no scenes.

The post-correction typecheck and production build passed in job 20261008T154407-6db717956c. The final browser confirmation job 20261008T154820-d8dde91e21 exited successfully: all 18 targeted checks passed across 390, 820 and 1440 pixels in normal and reduced motion, followed by all 9 selected Playwright regressions. Coverage includes cross-route, direct and same-page comparison links; contact-and-back navigation; a single Services closing section; package controls; native wheel scrolling; and the existing project showcase. The three new durable regressions live in tests/portfolio/offer.spec.ts. Existing project-panel assertions are now scoped to the project showcase, keeping them independent of the new package panels.

Independent source and visual review is recorded in [APPLE_OVERDRIVE_REVIEW_2026-10-08.md](APPLE_OVERDRIVE_REVIEW_2026-10-08.md). It found no critical or major commercial, layout or source-accessibility issue. The one minor duplicated Services closer was corrected and confirmed in the rebuilt page. Phone-scale questions, offer details and the maintenance qualifier are readable; no extra typography correction was needed.

Browser evidence is in artifacts/apple-offer-20261008/. The clean component crops are supplemented by ordinary viewport captures retaining the real navigation. The final Services ending was inspected at 390 and 1440 pixels. Public preview checks returned HTTP 200 for both / and /services, with eight comparison rows and no redundant Services closer.

Validation used Chromium. These checks do not establish physical-device Safari behavior or measured frame pacing. The working preview is served by the owned port-5198 job 20261008T154524-16523f4530 through the existing temporary preview tunnel; production deployment is outside this iteration.
