# KashCrop Innovations — Agent Notes

## Product and design context

Register is **brand**: the portfolio demonstrates the studio's product work and captures project enquiries.

Read these before UI work:

- [PRODUCT.md](PRODUCT.md): audience, purpose, voice, evidence constraints and confirmed packages.
- [DESIGN.md](DESIGN.md): the implemented visual system, canonical tokens and responsive behavior.
- [.impeccable/design.json](.impeccable/design.json): motion, elevation, breakpoints and self-contained component previews.
- [docs/design/OVERDRIVE_2026-10-12.md](docs/design/OVERDRIVE_2026-10-12.md): the current direction and surface contract.
- [docs/design/CONTENT_EXPANSION_2026-10-12.md](docs/design/CONTENT_EXPANSION_2026-10-12.md): the accepted direction's content extension, source boundaries and verification scope.
- [Content review evidence](docs/design/content-review/README.md) and [finish review](docs/design/content-review/finish-review.md): the completed extension review and its ship disposition.

## Current authority

**Current direction, 12 October 2026: Overdrive.** The user explicitly authorized autonomous replacement of all earlier portfolio attempts. The implemented world is cobalt, offwhite, citron, pale blue and Ink, using Sora language and Barlow Condensed monumental lettering. Real project screens form the spatial homepage reel. All principal pages and service detail routes share this world.

This session decision supersedes the Fieldwork, Apple-inspired and earlier serif/red-room presentation guidance. Historical design notes and unloaded components remain references to prior work; do not restore them over the current site. Do not treat a historical filename as visual authority.

The subsequent request for case studies, a comparison table and more content extends the accepted Overdrive portfolio. Preserve its palette, Sora/Barlow hierarchy, spatial opening reel and shared shell. New content belongs within the existing system; it does not establish a replacement direction or new global tokens.

## Implementation sources

The active entry stylesheet, [app/app.css](app/app.css), imports the shared reset/accessibility layer in apple-base.css, the preserved viewer and form foundations, then overdrive.css. The historical Apple product presentation and Fieldwork style sheets are not loaded by this entry.

The current visual sources are:

- [overdrive.css](app/styles/portfolio/overdrive.css): palette, fonts, shell, Home, About, Contact, footer and viewer overrides.
- [overdrive-reel.css](app/styles/portfolio/overdrive-reel.css) and [ProjectReel.tsx](app/components/portfolio/overdrive/ProjectReel.tsx): the spatial reel, its spring, controls and responsive frame.
- [overdrive-projects.css](app/styles/portfolio/overdrive-projects.css) and [ProjectCase.tsx](app/components/portfolio/overdrive/ProjectCase.tsx): archive and case presentation.
- [overdrive-services.css](app/styles/portfolio/overdrive-services.css), [services.tsx](app/routes/services.tsx) and [service.tsx](app/routes/service.tsx): service chapters and detail routes; [overdrive-service-proof.css](app/styles/portfolio/overdrive-service-proof.css) styles the restored service proof descriptions.
- [PackageComparison.tsx](app/components/portfolio/overdrive/PackageComparison.tsx) and [overdrive-package-comparison.css](app/styles/portfolio/overdrive-package-comparison.css): the shared comparison on Home and Services.
- [studioContent.ts](app/data/portfolio/studioContent.ts) and [overdrive-content.css](app/styles/portfolio/overdrive-content.css): Home case excerpts, delivery stages and practical questions, plus component-specific Home and About content styles.
- [caseDepth.ts](app/data/portfolio/caseDepth.ts): the six cases' decision content and accessible layouts of the eight source diagrams in [caseStudyDiagrams.ts](app/data/caseStudyDiagrams.ts), rendered by ProjectCase.
- [SiteHeader.tsx](app/components/portfolio/SiteHeader.tsx) and [SiteFooter.tsx](app/components/portfolio/SiteFooter.tsx): shared navigation and contact controls.

Component-specific Overdrive styles are imported by their current components or routes. Preserve that boundary when adding pages. When changing a form or viewer style, inspect the computed cascade from the shared foundation as well as the Overdrive override.

Font assets are served at /fonts/sora-latin-variable.woff2 and the Barlow Condensed 700 and 800 paths recorded in DESIGN.md. The deployed font provenance and OFL licensing record is public/fonts/overdrive-fonts.json.

## Product facts and behavior to preserve

Preserve the project/service loaders, aliases, URL filters, screen IDs, GalleryLink viewer behavior, source captions, direct project links and contact workflow. BaghBani's default presentation uses the actual home screen. Real captures and synthetic demonstrations retain their distinct source disclosures and recording provenance.

The package source is [offer.ts](app/data/portfolio/offer.ts). Keep the confirmed one-time scoped development payment, quoted hosting term, maintenance options up to four years, and Android publishing support. The Play Console account belongs to the client; management is delegated. The shared eight-row semantic comparison appears directly on Home and at /services#compare, with columns for Feature, Build-only scope and KashCrop package. At narrow widths each feature header sits above its two scope cells; preserve their explicit table header relationships. Keep the illustrative build-only baseline visible, along with quote scope, third-party-charge and Google verification/review conditions. Providers and packages vary; do not turn the comparison into unsupported competitor claims.

Home previews all six main cases. Each case retains its fuller source narrative and adds decision context; the eight original diagrams belong to Plant Health Clinic, TRACE-AMP, Treat My Fish and SKIIE. Service details restore the nine source proof descriptions from [content.ts](app/data/content.ts), resolving known project aliases and leaving references without a case route as text. About includes AquAMP, Sahlent and Kinfinity as smaller products and experiments. Preserve source disclosures and the distinction between historical work, demonstrations and current release information.

Keep native dialog and disclosure semantics, visible focus, reduced-motion behavior, direct reel selection and keyboard access. Motion-off users retain all content and destinations. Optional videos stay manually controlled and pause on disclosure close. Preserve validation, failure recovery, success and direct contact alternatives; do not send a live test enquiry during visual checks.

## Delivery discipline

This redesign is on design/impeccable-overdrive-20261012. Keep source-backed media provenance and design documentation aligned with any future shipped visual change. Record the actual finished system after review; do not copy provisional measurements or one-off composition details into universal tokens.

Before handing off a visual change, inspect desktop and narrow-phone output, keyboard focus, reduced motion, route/filter/deep-link behavior and relevant form or viewer states. Existing historical components do not need a redesign unless a current route loads them or a requested change depends on them.

The content extension's independent finish review is complete with a ship disposition and no remaining material fixes. The PHC excerpt was narrowed to source-backed case evidence and expert advice; final desktop and phone captures confirm that wording. The [evidence record](docs/design/content-review/README.md) and [finish report](docs/design/content-review/finish-review.md) document the review scope and results. Keep future validation tied to the source and captures actually reviewed.
