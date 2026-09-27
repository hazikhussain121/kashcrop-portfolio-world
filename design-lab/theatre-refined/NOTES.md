# Product theatre / refinement 02

This is the continuing refinement of direction A selected by Hazik. The existing red stage, Fraunces / Geist identity and product-led composition are preserved. This directory is a private review build, not the live kashcrop.in deployment.

## Open
Double-click START-REFINED.cmd or index.html. No build or server is needed for the preview. Google Fonts requires a connection; system fallbacks remain usable offline.

## This pass
- Coordinated scene changes: outgoing and incoming product compositions overlap briefly while the stage palette changes. Repeated selection is interruptible and the final selection always wins. No autoplay, preloader or scroll hijacking.
- An in-page Baghban screen browser: farmer home, orchard setup, seasonal calendar and variety explorer. The inspection link always opens the currently selected capture.
- Long screenshots open at readable width rather than being shrunk to a thin full-page thumbnail.
- Original-resolution inspection supports mouse drag, ordinary scrolling and keyboard controls. Touch uses native vertical scrolling and pinch zoom; horizontal swipes can change screens when not zoomed.
- Larger mobile viewer controls, a horizontally scrolling screen list, better focus return, image retry and direct screen links.
- Preserved navigation and reduced-motion preferences, with graceful operation when animation libraries are unavailable.

All interactions operate on existing captures. They do not make bookings, submit cases, make payments or generate diagnoses.

## How to inspect
Change the project in the hero. Try Front view, then select projects quickly. Under the featured Baghban composition, choose Orchard setup or Variety explorer, then Explore Baghban. The viewer opens the selected long page. Scroll, switch to Full size, drag on desktop, and use Escape to return. Arrow keys change screens; in the zoomed image region, arrows scroll instead. Z toggles inspection while the image region has focus.

On a phone-sized viewport, open the navigation and jump to work; then use the larger viewer controls. The page does not require hover or dragging to reach any project.

## Evidence and media
Actual local review-build screenshots: Baghban / Garden Guardians and Plant Health Clinic, captured 20 September 2026. Public-site capture: SKIIE at skiie.co.in, 20 September 2026. The exact current public releases may differ.

The orchard photograph is stock context, by Marek Studzinski on Unsplash. It is not claimed to be Kashmir or a client orchard. The leaf artwork, logos and rendered interface captures were reused from the user's existing projects.

Full source provenance: ../assets/manifest.json. Earlier design research and image credit details: ../RESEARCH.md.

## Guidance used
- Repository AGENTS.md, PRODUCT.md and DESIGN.md: retain the selected brand identity and show genuine product evidence.
- Local Impeccable brand guidance and the previously downloaded frontend-design / GSAP reference documents.
- GSAP media-query cleanup and reduced-motion documentation: https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/
- W3C modal dialog interaction pattern: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- MDN reduced-motion behavior: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion

The references guide implementation. They are not evidence of an award, formal accessibility certification or measured conversion improvement.

## Files and boundaries
The current implementation uses index.html, foundation.css, stage.css, portfolio.css, viewer.css, refinement.css, projects.js, experience.js, walkthrough.js and viewer.js. The new CSS is a named, isolated refinement layer. Script files ending in .cjs are preparation, review or one-time patch tools; do not run patch scripts again against an edited build.

A checkpoint of the previous refinement is under checkpoints/before-pass-two. A fingerprint manifest of the existing application and configuration files is under evidence/pass-two/production-baseline.json. No deploy, commit or push is part of this task.

## Verification
The final verification reports and screenshots for this pass are written to evidence/pass-two. Their recorded results, rather than an earlier run from a different version, are the source of truth. Browser-engine emulation is not a physical iPhone/Safari test. Manual assistive-technology review and approved release media remain separate production-release checks.

## Recorded completion of this pass
The final regression runs passed **120 checks, with no failures**: responsive layout 59, interactions/history 27, touch/landscape 11, reduced-motion and failure fallbacks 10, local links/production preservation 3, and direct-file/edge cases 10. The responsive set covers 320, 375, 390, 430, 768, 1024, 1440 and 1920 pixels.

Six axe-core 4.13.0 scans reported no detected violations. The test-only engine was reused from the existing Tree Passport dependencies; it is not shipped with the portfolio. Several image/gradient contrast checks were marked incomplete by axe and are not counted as automatic passes. The five stage labels were separately sampled against their rendered backgrounds in all three scenes at mobile and desktop sizes: 30 samples, lowest sampled ratio 4.63:1 after refinement of the lighting behind the labels. This is a targeted check, not whole-site accessibility certification.

The existing application's 58 fingerprinted source/configuration files are unchanged. Original A and the other comparison directions remain available. Nothing was committed, pushed or deployed.

The installed older WebKit runtime did not complete startup for the review. WebKit and physical iPhone/Safari behavior are therefore unverified; no passing result is claimed for them.

Final implementation hashes, counts and limitations are consolidated in **evidence/pass-two/REVIEW-SUMMARY.json**. Individual reports and screenshots are retained in that folder. Open **START-REFINED.cmd** here or in the parent design-lab folder to review the result.

Automated accessibility engine reference and license: https://github.com/dequelabs/axe-core (MPL-2.0). Automated checking complements, rather than replaces, manual accessibility and assistive-technology review.
