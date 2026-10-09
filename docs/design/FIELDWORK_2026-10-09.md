# FIELDWORK / Editorial studio direction

**Date:** 9 October 2026
**Status:** Implemented first iteration on `design/fieldwork-portfolio-20261009`; VM preview only. This is a prototype for design review, **not a production release**.

## Creative hypothesis

KashCrop is an independent software studio. Its portfolio should look like an editorial exhibition of the systems it has built, not an Apple-inspired product index and not a generic agricultural SaaS sales site.

**The work has to work.** is the cover-line. It reflects a real project culture of building usable systems rather than just beautiful mockups.

### Design grammar

- **Kinetic typography:** A compressed bold sans in huge sizes, intentionally interrupted by editorial italic serif. Oversized lettering should always convey information, not become decorative noise.
- **Evidence over rendering:** Actual project captures take the spotlight. Older review builds are labeled as such. Never render false apps, invent client logos or adoption figures, or disguise a demonstration as a live feature.
- **Physical editorial structure:** Warm recycled-paper background, strong ink, typographic case indexes, thin rules and page chapters, generous whitespace. A vermilion accent and a distinct per-project treatment, not a rainbow of gradients.
- **Project-specific universes:** BaghBani gets green editorial storytelling and grower-service proof; PHC gets a clinical chartreuse/diagnostic framing. The parent KashCrop navigation system keeps all case files related.
- **Meaningful motion:** A word entrance, scroll parallax on large pointers, delayed disclosure and active gallery affordances. On small or reduced-motion devices, all information remains visible without a staged reveal.
- **Commercial trust:** No invented competitor comparisons. Development pricing, hosting, Play Console and maintenance obligations are described only as quote-specific. The homepage uses three editorial chapters instead of a comparison table.

**Colors:** paper `#eeece5`, ink `#151715`, vermilion `#bd3827`, leaf `#dce683`, orchard green `#123b2e`, dark studio `#202521`.

## Implemented scope

1. Homepage: huge typographic manifesto, studio statement, BaghBani and PHC exhibition-scale real-screen spreads, a readable six-case project archive, three promises about build/launch/care, and direct contact invitation.
2. BaghBani case file: project-specific hero, established context and workflow narrative, real-service/calendar/desktop screenshot chapters, feature/system index, searchable full-gallery access, original film disclosure, provenance, and next-project route.
3. Existing routes, loaders, aliases, SEO, lazy film behavior, image gallery, source notes, contact handling and reduced-motion preference retained.
4. No fake testimonials, product adoption metrics, illustrative people or invented outcomes.
5. Existing Services, other project detail pages and older source-styling are retained pending conversion. The new design overrides the shared header only on the two converted routes. This is deliberate, to protect functionality while the design system is reviewed.

## Source of truth

- Visual components: `app/components/portfolio/FieldworkHome.tsx`, `FieldworkBaghBani.tsx`.
- CSS and motion: `app/styles/portfolio/fieldwork.css`; GSAP is lazy-loaded after hydration and skipped in reduced motion.
- Canonical cases and actual screenshots: `app/data/portfolio/catalog.ts`, `public/media/portfolio/`.
- Case film: `app/data/portfolio/films.ts`; all recordings manually initiated and labeled as reviews/demonstrations.
- Commercial terms: `app/data/portfolio/offer.ts`, `PRODUCT.md`.

## Next work

- Validate the new art direction with a real site review before extending it to every secondary page.
- Then art-direct the remaining cases, with specific visual vocabularies for institutional software, research interfaces, fish health and supply-chain traceability. For traceability, first verify which accurate captures can be published.
- Unify Work index, Services, About, and Contact with the editorial system, then retire the Apple-specific CSS where no longer referenced.
- Run broader cross-browser testing including mobile Safari, performance measurements, image/video optimization, and field-device QA before changing `kashcrop.in`.

## Iteration 2 / Studio-wide expansion / 9 October 2026

Branch: `design/fieldwork-studio-expansion-20261009` (separate from the first Fieldwork and Apple branches).

What was materially implemented:
- **Work archive:** The previous double-column Apple cards were replaced with a full-bleed dark editorial cover and a real searchable, URL-driven case-file index. Six distinct stories use authentic captures where available, and visibly labeled demonstration media where actual captures do not yet exist. Search/category navigation, source details and gallery links remain functional.
- **Services:** A full typography-led practice page with four disciplines, accurate in-progress product captures, direct service and project navigation, and a scoped development/hosting/Android publishing/maintenance explanation in four readable chapters. The old table was removed from this route. The `/services#compare` fragment remains valid for historical links and navigation.
- **Clinic:** A bespoke Plant Health Clinic case page, with a diagnostic navy/chartreuse system, three actual review-build captures, faithful descriptions of the farmer and expert workflow, and clear limits around AI accuracy; provenance and the optional film remain available.
- **Other project cases:** SKIIE, KashCrop, Treat My Fish and TRACE-AMP now use an editorial chapter structure with differentiated material palettes and typography. Original case-study copy, workflow, technologies, references and film provenance remain. Film-derived illustrations are explicitly labeled synthetic demonstrations; they are not represented as validated deployments.
- **Studio, Contact and shared shell:** Studio/About storytelling, editorials, green-backed lead form, full-site header, footer and project-specific palettes now align visually. Web3Forms handler, validation, responsive layouts, focus and keyboard navigation remain unchanged.

Known unfinished work / design QA:
- Each non-BaghBani/non-PHC case currently shares the core Fieldwork journal structure and distinct colours, rather than a fully custom award-level chapter sequence. Future work should use more real app captures, authentic field stories and custom asset staging to distinguish each case beyond palette.
- The four service detail routes keep the original functional templates, now visually integrated with the global warm-paper navigation and type; this is an intentional progressive conversion.
- The source records date from September/October review builds. Any footage or claimed feature status must be independently checked prior to public launch.
- Progressive enhancement, mobile Safari hardware, animation smoothness, crawl and lighthouse performance remain production-release checks. Do not call a VM/browser preview a live release.

Evidence: responsive browser review in `.agent-temp/fieldwork-v2-final-review` and `.agent-temp/fieldwork-v2-review` outside Git. Full test log in `.agent-toolkit/jobs`. No edits to the existing production website.


### Verification / second iteration

- `npm run check` succeeded: TypeScript, 71 unit tests and React Router production build.
- Playwright end-to-end suite succeeded: **69/69** tests covering SSR, routes, mobile navigation, filters/search, screen viewer, contact workflow, no-JS fallbacks, film provenance, and reduced motion. Job `20261009T155739-8f03de95bd`.
- Separate WCAG 2.0/2.1 A+AA serious/critical audit on 8 routes × two widths (1440/390) found **zero reported serious/critical issues** following caption contrast corrections. Audit does not replace manual device or screen-reader checks.
- Reviewed rendered screenshots at desktop and phone widths for home, Work, Services, About, Contact, BaghBani, Plant Health Clinic, and remaining four case files. Corrected archive image loading and contact/about layouts.
- No production domain or account changes.
