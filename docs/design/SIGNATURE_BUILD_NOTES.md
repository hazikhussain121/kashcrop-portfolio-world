# KashCrop signature-experience implementation

## Open the actual application
From the project root, double-click `START-PORTFOLIO.cmd` or run:

```powershell
npm run dev -- --host 127.0.0.1 --port 5208
```

Development: http://127.0.0.1:5208
Production-build preview used for verification: http://127.0.0.1:5218

The `design-lab` pages are preserved historical explorations. This work is integrated into `app/`, the real React Router routes, shared application navigation, project catalogue and enquiry form. It is not another standalone HTML prototype. Nothing was committed, pushed or deployed during this implementation.

## What to experience

### Homepage
- The approved Product Theatre remains the opening. **Take the studio tour** opens an optional full-screen, three-scene portfolio presentation. It uses actual captured interfaces, manual project selection, pause/play/replay and real project links. It has no sound and is not a fabricated video.
- **Beyond the pixels** is a live Three.js product-anatomy scene. Separate the four layers or select Interface, Workflow, Data and Infrastructure. The front texture is an actual Baghban capture; internal layers are explicitly schematic.
- **The human loop** shows the Plant Health Clinic workflow through Capture, Context, Draft and Review. The actual farmer interface is connected to illustrative reference, working-draft and expert-review artifacts. It never produces a diagnosis or implies a real case is being processed.
- **The interaction studio** is working React code. Change the canvas width and spacing, select a service and sample time, preview the selection and reset it. Container queries genuinely rearrange the interface. It is a clearly labeled portfolio study and cannot create a booking or send an enquiry.

### Work and project pages
The unfiltered `/projects` route now includes an asymmetric visual screen atlas. Desktop screens have subtle scroll-reactive depth; touch visitors receive a conventional horizontal collection with previous/next controls. Every item opens the correct actual capture. Search, category filters and dedicated project routes remain available.

The Plant Health Clinic project includes the connected workflow chapter. The Baghban project retains its screenshot-based phone/desktop showcase; the homepage now uses the more hands-on interface study instead.

### Studio
The studio page now contains a four-stage delivery story. On desktop, its sticky artifact changes as the visitor reaches the brief, design, build and handover stages. On phones, direct stage controls make the same artifacts accessible without relying on scroll position. All explanatory text remains ordinary readable HTML.

No founder portrait was invented. The initials-as-avatar treatment was replaced with studio typography while retaining the actual founder name and role.

## Technical implementation
Components live in `app/components/portfolio/signature/`:

- `ScrollDirector.tsx`: the sole smooth-scroll engine, using the existing Lenis package on motion-enabled fine-pointer desktops only. Touch and reduced-motion paths remain native.
- `RevealHeading.tsx`: scoped GSAP/ScrollTrigger enhancement of headings that remain visible by default.
- `StudioTour.tsx`: lazy-loaded, user-initiated native dialog presentation.
- `ProductAnatomy.tsx` / `AnatomyCanvas.tsx`: semantic layer controls, lazy WebGL renderer, static fallback, explicit resource cleanup.
- `CareJourney.tsx`: stateful workflow illustration with optional playback.
- `CraftPlayground.tsx`: actual responsive interface specimen with container queries.
- `ScreenAtlas.tsx`: real-image collection linked to the shared viewer.
- `DeliveryMethod.tsx`: readable process narrative and changing artifacts.

The 3D renderer has one responsibility. It is loaded near its section rather than at initial page load, caps pixel density, renders on demand, stops when hidden or offscreen and disposes textures, geometry, materials, buffers, listeners and animation handles. Losing the WebGL context restores the poster and leaves all layer controls available. The renderer is not required to understand or navigate the page.

GSAP is the choreography library, Lenis is the only smooth-scroll engine, and Three.js is the only added runtime dependency for the 3D scene. No new competing motion or scroll framework was introduced.

## Production corrections discovered and fixed
The prerendered static host adds directory trailing slashes. The footer previously compared `/contact` literally and rendered a different tree at `/contact/`, causing a production-only hydration error. `normalizePathname` now makes those paths equivalent, with focused unit coverage.

The form's uncontrolled service preselection also failed when a prerendered page was opened with a service query. Service checkboxes now use controlled state initialized consistently across server and client, then apply the query selection after hydration. Form validation, error/retry behavior and confirmed delivery semantics are preserved.

## Assets, guidance and honesty
The locked Fraunces/Geist and red Product Theatre identity is preserved. Existing Baghban and Plant Health Clinic local-build captures, the public SKIIE capture, project cutouts and credited orchard photography are reused. Actual captures are not described as interactive embedded client apps. No metrics, customers, testimonials or award recognition were invented.

Meng To guidance was downloaded and read as reference text, not executed:
- `build-awwwards-quality-sites`
- `cinematic-scroll-storytelling`
- `gsap-scrolltrigger-storytelling`
- `threejs`

Snapshots and the MIT license are in `docs/design/references/mengto/`. Source URLs and the original design thesis are in `SIGNATURE_EXPERIENCE.md`.

## Verification and evidence
Final machine-readable results are in `artifacts/signature-experience/verification-summary.json`. The detailed results include:

- `typecheck.log`, `unit-tests.log`, `build.log`.
- `production-browser-tests.log` and the copied `browser-results.json`.
- `accessibility.json` and `accessibility-supporting.json`.
- `render-lifecycle.json`: instrumentation of actual WebGL draw calls and resource deletion.
- `dependency-audit.json`.
- `screens/`: desktop and phone screenshots of the hero, tour, anatomy, workflow, interface study, atlas and delivery artifacts.

The browser checks exercise Chrome and emulated touch viewports, not physical iPhone Safari. Automated accessibility results do not replace manual screen-reader, touch-device or image/gradient contrast review. Contact tests intercept the external provider; they do not send real messages or establish end-to-end inbox delivery.

The Three.js renderer remains a separately lazy-loaded bundle. The production build reports its greater-than-500-kB minified chunk warning; this is documented rather than hidden. It is not in the initial page request path, as the browser test verifies. It is approximately 143 kB gzip in the recorded build.

## Commands
```powershell
npm run typecheck
npm test
npm run build
$env:PORTFOLIO_BASE_URL='http://127.0.0.1:5218'
npx playwright test --workers=2
node tools/verify-render-lifecycle.cjs
node tools/audit-signature.cjs
node tools/audit-supporting-pages.cjs
```

Setup and integration scripts are one-time migration records, not routine commands to rerun against subsequently edited sources. `tools/restart-signature-preview.ps1` restarts only the owned preview server. Checkpoint location is recorded in `artifacts/signature-experience/checkpoint.txt`.
