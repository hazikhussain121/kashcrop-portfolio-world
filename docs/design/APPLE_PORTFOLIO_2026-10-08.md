# KashCrop portfolio redesign · 8 October 2026

## User direction

Hazik requested that the portfolio stop combining disconnected visual ideas and adopt Apple's familiar presentation language, adapted to KashCrop, with ambitious motion. This explicitly replaces the previous Fraunces/red-room visual commitment. Work is implementation and reversible preview; existing production is not changed by this task.

## Direction contract

THESIS: KashCrop presents a coherent family of real digital products, with the products carrying the visual story.

OWN-WORLD: Apple-inspired white and silver surfaces, confident system sans typography, near-black text and controls, the existing KashCrop logo, translucent navigation and softly rounded product stages. Product screenshots retain their own colours.

STORY: Understand the company, explore three flagship projects, discover the full work and services, then start a project. Preserve all existing project and service routes, truthful records, enquiry fields and accessible screen viewing.

FIRST VIEWPORT: Centred two-line headline, one concise explanatory sentence, two distinct actions, then a large staged composition of actual BaghBani, Plant Health Clinic and TraceAMP interfaces. Product screens assemble in depth during entry and settle with scrolling.

FORM: User-pinned Apple product presentation; code-led implementation. The explicit competitor reference and instruction to act settle the direction. The requested identity is settled for this implementation. DESIGN_VARIANCE 6, MOTION_INTENSITY 9, VISUAL_DENSITY 3.

SIGNATURE: A desktop sticky product showcase advances through three real product scenes during normal scrolling and also supports direct keyboard-accessible tab selection. Touch/mobile use an ordinary tabbed showcase without pinning. All animation has a static reduced-motion path, and primary content is visible before JavaScript.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Product and asset truth

Use existing actual interface captures and project films. The screenshots under public/media/portfolio are 20 September review captures; the 2 October films use demonstration inputs. Do not imply current deployed versions, adoption, model accuracy or measured impact. BaghBani's film poster shows an Orchard plan tool that was subsequently removed, so it must not be used as the homepage product image. Original files and their provenance remain available.

## References

- https://www.apple.com/in/
- https://www.apple.com/in/macbook-air/

References establish the presentation grammar. KashCrop keeps its own logo, content, interfaces and implementation.

## Verification plan

Build, TypeScript, relevant existing tests, then batched desktop/mobile/tablet browser checks. Exercise product tabs and their arrow-key behavior, reduced motion, route navigation, screen viewer, search/filter, and contact validation with submission intercepted. Inspect real screenshots, batch fixes, and request independent design review. Do not send real enquiries.

## Implemented system

The portfolio uses native system typography with locally served Geist fallbacks, white and silver surfaces, near-black controls, a translucent header and actual project interfaces. The homepage introduces a product family, a three-project showcase, capabilities and the company's Kashmir origin. Project and service indexes, detail pages, About, contact, privacy and the screen viewer share the same system.

Motion consists of a staged hero entry, desktop scroll depth, a scroll-controlled project showcase, panel transitions and a restrained orchard-image zoom. Scrolling remains native. The sticky showcase requires a fine pointer, a viewport at least 1100px wide and 850px high, and enabled motion. Other viewports use direct tabs. The system preference and the persistent manual motion control provide a static path. Interface films are manual disclosures with native video controls.

## Verification record

Verified on 8 October 2026:

- `npm run check`: TypeScript, 71 unit tests across 11 files, and the production build passed. All 16 canonical routes prerendered.
- Initial browser matrix: 48 route checks across phone, tablet and desktop sizes, with normal and reduced motion. No horizontal overflow, broken images, page errors or automated accessibility violations were reported.
- Confirmation matrix: 19 targeted route and capture checks plus 28 interaction and no-JavaScript checks passed. The 1440 by 850px sticky boundary retained its content and bottom action.
- All 67 end-to-end cases reached a passing result: 63 in the first run, and the remaining four in the targeted confirmation. No cases were skipped. The real regression found in the first run was a tall gallery capture shrinking to fit its height; restoring readable-width vertical scrolling fixed it. The other three failures were test selectors or asynchronous test handling.
- Search and category filters, tab keys, direct selection and scroll advancement, mobile navigation, gallery deep links, zoom/pan, focus/Escape handling, reduced-motion persistence, contact validation and simulated failure/retry, and manual film behavior were exercised.
- The contact endpoint was intercepted; no real enquiries were sent. Browser checks used Chromium emulation. Physical-device Safari was not verified. Automated accessibility checks do not establish full WCAG conformance; incomplete contrast checks require visual judgment.
- Screenshot capture was corrected to load and decode lazy images before full-page evidence. Final phone, tablet and desktop captures include the complete opening product composition, decoded catalog images, the mobile active project stage and the desktop sticky boundary.
- The mechanical design scan found only two overused-font warnings for Geist. The native system stack and its self-hosted fallback implement the user's explicitly pinned Apple direction; no font change was made for those warnings.

Independent visual review: the full review matched the pinned direction in typography, materials, palette, first viewport, narrative, signature interaction, gallery and social preview. It identified one material issue: the AI service hero source caption crossed the phone interface. The caption was moved into a separate semantic figcaption below the unchanged device panel. TypeScript and the production build passed again. Replacement captures at 390, 820 and 1440px showed a clear 14px gap, no overlap, no overflow and fully decoded images. The reviewer scored that single correction resolved and returned **disposition: ship**. The verdict applies to the listed correction within the preceding full review's scope. DESIGN.md and the sidecar were rechecked after the correction.

## Assets and handoff

The social preview was refreshed from the implemented hero at 1200 by 630px. All 27 referenced raster assets have verified origins: the two PNG logos and JPEG social cover use embedded metadata, and the 24 WebP images use the provenance tool's native JSON sidecars. Origin handling preserved every decoded pixel. Product captures, posters, logos and the orchard photograph retain their source records. No new performance, adoption, impact or model-accuracy claims were added.

The implementation is preserved on a dedicated feature branch and served as a temporary preview. The production domain is not changed by this review build.
