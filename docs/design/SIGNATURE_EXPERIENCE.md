# KashCrop / The work, made tangible

## Direction locked
Continue the approved Product Theatre in the real React Router application. Preserve Fraunces / Geist, the light neutral page, the red product stage and the actual product captures. Do not create another design-lab HTML entry point or replace the brand with a reference site's identity.

Visual thesis: the portfolio should let a visitor experience three kinds of craft—what the product looks like, how the system fits together, and how an interaction feels. Screens are the leading evidence; diagrams and experiments must be identified as illustrations or interface studies, not presented as production data.

## Signature sequence
1. The approved opening, with authored entrance and an optional full-screen, user-initiated three-project tour. No loading gate or audio.
2. Existing visual project stories, refined rather than discarded.
3. The anatomy of useful: a real Three.js exploded product model, textured with an actual Baghban capture. Four selectable architectural layers; separation control; a static fallback. Internal layers are an explanatory illustration, not a literal backend rendering.
4. Human-in-the-loop: four connected stages showing the Plant Health Clinic workflow, actual farmer captures and explicitly diagrammatic reference/draft/review states. No generated diagnosis.
5. A hands-on interaction study: an actual React interface with responsive container queries, density controls, selection and reset. Clearly separate from a live booking application.
6. Services and a more substantial studio method. Preserve working project and enquiry routes.
7. A visual screen atlas on the work index; deeper delivery storytelling on the studio page.

## Motion architecture
GSAP remains the only choreography library. Use the existing Lenis package as the only smooth-scroll engine, only on fine-pointer desktop and only when reduced motion is off. Native scrolling remains on touch and reduced-motion paths. No mandatory horizontal scroll or scroll-position traps. ScrollTrigger is scoped and cleaned up on routes.

Three.js is lazy-loaded only for the product-anatomy section. Cap DPR, render only on demand while visible, stop when hidden, release all textures/materials/geometries/listeners/RAF handles, and fall back on context loss. It has one visual responsibility: explain the layers behind a product. Semantic controls do not depend on WebGL.

## Media and proof
Use the existing local Baghban / Plant Health Clinic captures and the public SKIIE capture. Reuse existing licensed orchard photography and project cutouts with their provenance. No invented customer logos, testimonials, performance numbers or generated people. Remove initials-as-avatar treatments rather than inventing a founder portrait. Do not claim Awwwards recognition.

## Guidance consulted
- Meng To: https://github.com/MengTo/Skills/blob/main/agent-skills/web-design/build-awwwards-quality-sites/SKILL.md
- Meng To: cinematic-scroll-storytelling, threejs and gsap-scrolltrigger-storytelling. Local snapshots and MIT license in docs/design/references/mengto/.
- Existing Impeccable brand guidance; repository PRODUCT.md and DESIGN.md.
- GSAP ScrollTrigger: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- Three.js renderer and lifecycle documentation: https://threejs.org/docs/

## Acceptance
Build and strict typecheck pass. Test project/route transitions, real controls, keyboard focus, reduced motion, no-JavaScript content, WebGL fallback, narrow phones and wide desktops. Run existing regressions as well as new signature checks. Keep report and screenshots under artifacts/signature-experience/. Do not deploy without an explicit deployment request.

## Implemented and verified
The locked direction is now integrated into the actual application with the full-screen studio tour, demand-rendered Three.js product anatomy, Plant Health Clinic workflow chapter, working React/container-query interaction study, visual screen atlas and delivery-method story. See `SIGNATURE_BUILD_NOTES.md` for the component map, provenance, local launch instructions and the production corrections found during verification.

Final recorded results: strict TypeScript check passed; production build prerendered 16 HTML routes; 58 unit tests passed; 60 production-build browser tests passed with zero failures, skips or flaky results; 20 automated accessibility scans reported no detected violations; six WebGL render/cleanup/fallback checks passed; npm audit reported zero vulnerabilities. Image/gradient contrast still needs contextual manual review, and these checks do not establish physical iPhone/Safari or live email-delivery verification.

The exact reports, screenshots and source hashes are in `artifacts/signature-experience/verification-summary.json` and adjacent evidence files. Development runs at port 5208; the verified production-build preview runs at port 5218. Neither is a public deployment. Existing design explorations are preserved, and no commit, push or production deployment was performed.
