# KashCrop Design Lab
Three working visual explorations, separate from the deployed portfolio.

## Open the comparison
Double-click START-LAB.cmd or index.html in this folder.

From PowerShell:

```powershell
Start-Process 'C:\PROJECTS\KASHCROP INNOVATIONS PORTFOLIO WEBSITE\design-lab\index.html'
```

No npm install, build, server, account or deployment is required to view the pages. Artwork, screenshots and the GSAP runtime are local. Google Fonts needs an internet connection; system-font fallbacks keep the pages usable offline.

## The three routes
- **A — theatre.html / Product theatre.** A physical-looking red product stage using real screenshots. Switch among Baghban, Plant Health Clinic and SKIIE, then open the screen viewer. Pointer depth on supported desktop devices; an ordinary touch layout on phones.
- **B — gallery.html / Spatial collection.** Pan the collection and select any project. Arrow keys pan while the gallery region is focused; Home and Reset view recenter it. Index view offers a conventional alternative. Small screens and system-reduced-motion visitors start in the index. This is a lightweight CSS/GSAP spatial treatment, not a complete WebGL world.
- **C — field.html / Field to interface.** Move the native slider to reveal real Baghban screens over credited orchard photography. Keyboard arrows, Home and End work. Open the project viewer to inspect the complete screens.

**Recommendation:** use A as the main direction, with C's context-to-interface storytelling inside project sections. B is a strong optional creative-lab experience. These are design judgments, not conversion claims.

## A useful five-minute review
Open all three at desktop width. On A, change the featured project and inspect the full orchard setup screen. On B, drag, reset, switch to the index and open a project. On C, move the reveal from context to interface. Then repeat at roughly 390 px wide. Compare the first five seconds, clarity of what KashCrop builds, recognizability of the actual work, and how little explanation is necessary.

Choose the route before integrating anything into production. Notes such as “A's opening, C's stories, less rotation” are more useful than choosing a color alone.

## What is real, and what is illustrative
Baghban and Plant Health Clinic imagery is taken from existing local product-review captures. It is real rendered interface work but not a claim that these exact builds are publicly deployed. SKIIE is a public-site screenshot. Tree Passport's tree-tag and cedar views are existing illustrative artwork, not actual app screens. The orchard photograph is credited stock, not claimed as Kashmir or a client orchard.

The viewer navigates screenshots. It does not pretend to submit cases, run AI or join a real consultation. No private authenticated account, live database or paid service is connected by the prototypes.

See RESEARCH.md and assets/manifest.json for guidance, source locations and asset attribution.

## Verification
The responsive browser review covers Chrome at 1440, 768, 390 and 320 px, all three directions, image loading, global horizontal overflow, modal opening/closing and focus return, screen switching, keyboard range control, index mode, keyboard panning, reduced motion and no-JavaScript fallbacks.

- evidence/review-results.json: detailed responsive review (66 checks passed after refinement).
- evidence/final-review-results.json: comparison-page, link, pointer-drag, focus-containment, rapid-switch and manual-motion checks.
- evidence/*-1440.png: desktop captures.
- evidence/*-390.png: full mobile-page captures.
- evidence/viewer-*.png: project viewer captures.
- evidence/comparison-*.png: comparison-page captures.

These are browser checks, not a WCAG certification, real-device Safari test or a performance benchmark. A production integration still needs target-device testing, accessibility review and approved media.

## Development
The pages are standalone HTML/CSS/JS so a direction can be reviewed without touching the existing React Router app.

- base.css: typography, navigation, frames, native screen viewer and footer.
- theatre.css, gallery.css, field.css: distinct concept layouts and responsive rules.
- refinements.css: small visual refinements.
- lab.js: project data and progressive interactions.
- partials/*-main.html and build-pages.cjs: regenerate the three concept pages.
- index.html and index.css: comparison desk.
- research/: downloaded design-skill reference documents.

From the portfolio repository root:

```powershell
node design-lab/build-pages.cjs
node --check design-lab/lab.js
node design-lab/review.cjs
node design-lab/final-review.cjs
```

The review scripts reuse the existing Playwright installation in Tree Passport Platform and the installed Windows Chrome executable. They intentionally do not modify the portfolio's package manifest or install dependencies. The preparation and one-time refine scripts document this build session; do not rerun them indiscriminately against an edited lab.

## Boundary
No production app, routes, package files or deployment configuration were changed by the concept implementation. Nothing was committed, pushed or deployed. All design-lab output is confined to this folder. Existing work in the parent repository was left in place.

## Final review result
After the image-proportion and keyboard-focus refinements, the responsive suite passed **66/66** checks and the extended suite passed **14/14** checks: **80 passing checks, no failures** in the recorded Chrome runs. The full reports remain in evidence/. Desktop and mobile screenshots and the comparison thumbnails were regenerated after the fixes. The contact sheet in evidence/inspection-sheet.png provides a quick visual overview.
