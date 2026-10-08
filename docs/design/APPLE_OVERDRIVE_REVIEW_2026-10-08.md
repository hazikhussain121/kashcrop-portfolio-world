# Apple Overdrive — independent review

Date: 8 October 2026

## Result

The package presentation passes this independent review. No critical or major commercial, visual-layout or source-accessibility defect was found in the reviewed package surface. One minor Services conversion issue was identified and corrected in source; its rebuilt-page confirmation remains part of coordinated application QA.

This is a review of the authorized Apple-inspired iteration, not a production-deployment approval.

## Scope and evidence

Surface: responsive portfolio and project-offer presentation, used with touch, pointer and keyboard. The visitor needs to understand the studio’s work, compare project scopes and start an enquiry.

Read AGENTS.md, PRODUCT.md, DESIGN.md, the relevant .impeccable/design.json material and APPLE_OVERDRIVE_2026-10-08.md. Reviewed KashCropOffer.tsx, offer.ts, offer.css, the home and Services integration, SiteHeader.tsx, the hero-motion change and MotionProvider.tsx.

Inspected supplied stage and comparison screenshots from the refreshed preview at 390, 820 and 1440 CSS pixels, including normal and reduced-motion examples. Evidence is under artifacts/apple-offer-20261008/. The clean 390-normal-comparison-top.jpg and 390-normal-offer-viewport.jpg preserve the real header and establish actual phone-scale readability. Clean component crops temporarily hide the sticky header and skip link only for screenshot capture.

Initial long element screenshots included the sticky header and focused skip link inside their crops. These were capture artifacts; the clean component images and ordinary phone viewport resolved that uncertainty. They were not counted as application defects.

## Finding and bounded correction

| Severity | Finding | Correction and status |
|---|---|---|
| Minor | On Services, the reusable comparison’s “Your idea deserves a complete plan” closer immediately preceded the existing “A clear scope. A shared way forward” contact section. Its “Explore our services” link also pointed back to the same page. | OfferComparison now accepts showClose with a default of true. Services passes showClose={false}, retaining its established final contact section. Confirmed in source; the homepage closer remains intact. |

No further package visual correction is recommended from this pass.

## Assessment

**Fidelity and flair.** The dark product stage creates a distinct, stronger presentation moment within the approved neutral site. The actual interface remains central, while the large 1 and 4, restrained orbital lines and device depth give the package hierarchy. At tablet and phone sizes the four offers remain legible. “Up to” stays attached to the four-year maintenance message. The phone layout deliberately places the device beside the payment and care figures, then places hosting and publishing below; it does not shrink the desktop composition.

**Commercial clarity.** The eight-row table provides concrete questions alongside KashCrop’s scoped answers. It makes no invented competitor price, omission or superiority claim. Fixed development scope, hosting term, maintenance coverage and third-party charges remain quote-specific. Android publishing and delegated client-account management are clear, and the terms retain verification and review boundaries. The supporting workflow, connected-system and handover rows are consistent with the existing service catalogue.

**Mobile readability.** The 390-pixel viewport shows readable questions, offer statements and secondary details. Repeated column labels preserve the comparison’s meaning after each full-width row heading. No text clipping was visible in the reviewed clean crops. There is no visual reason to further compress the table or replace its comparison structure.

**Interaction and accessibility source review.** Build, Launch and Care use associated tab panels, a roving tab stop, Arrow keys and Home/End navigation. The native scope disclosure is keyboard-operable by construction. Explicit table roles and row/column headers preserve meaning under the mobile CSS layout. Pointer tilt excludes touch and clears its scheduled frame and inline properties on exit or eligibility changes. Motion effects honor the shared preference, use scoped cleanup and leave complete static content available.

Declared-color contrast calculations for the new opaque text surfaces were 10.59:1 for stage body copy, 8.51:1 for the stage caption, 6.14:1 for comparison questions, 6.01:1 for comparison details and at least 5.60:1 for the mobile field labels. These are source-color calculations, not a substitute for the coordinated browser accessibility check.

**Reduced motion.** The supplied reduced-motion frames retain the complete composition, offer labels, tabs and table. Source inspection confirms the authored scroll/pointer effects are gated by the shared motion preference. Still screenshots establish the static result; they do not establish frame pacing or perceived animation smoothness.

## Verification boundary

This reviewer did not edit application code, tests or infrastructure, and did not run a separate screenshot matrix. Build, browser interaction, automated accessibility, no-JavaScript and route checks belong to the coordinated QA record. QA separately reported an anchor-navigation race involving /services#compare; the application owner is correcting that behavior and arranging its final verification. This package-layout review does not assert that navigation issue is already resolved.

## Final coordinated application confirmation

Added by the implementation owner after the independent review. The duplicate Services closer and the separately discovered comparison-navigation race were verified in the rebuilt application. Post-correction typecheck/build passed in job 20261008T154407-6db717956c. Final job 20261008T154820-d8dde91e21 passed all 18 targeted viewport/motion checks and all 9 selected Playwright regressions. Cross-route comparison navigation now passes at 390, 820 and 1440 pixels in normal and reduced motion, along with direct/same-page hashes, contact-and-back, package controls, native scrolling and the existing project showcase. Final Services ending screenshots at 390 and 1440 confirm the single closing section. The detailed execution record is in APPLE_OVERDRIVE_2026-10-08.md.
