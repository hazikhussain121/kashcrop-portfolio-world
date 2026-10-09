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
