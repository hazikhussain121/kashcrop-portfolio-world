# Press and recognition review — 12 October 2026

## Scope and disposition

The user asked for short lines from news outlets about Hazik, KashCrop and SKUAST-Kashmir's Plant Health Clinic, together with recognition achieved by the founder or startup. This extends the accepted Overdrive portfolio on `design/impeccable-overdrive-20261012`; its direction remains seed `35e932bf`.

The [surface brief](../PRESS_RECOGNITION_2026-10-12.md) records the six-block direction contract. The extension is code-led, with no newly approved raster comp, new image asset or new global token system. The accepted opening reel remains the first viewport.

Independent finish disposition: **ship**, with no material fixes. The fresh reviewer opened all 16 supplied images and accepted persistence, fidelity, ceiling and the detector advisory assessment. The actual report is preserved in [finish-review.md](finish-review.md). The root completed the public-preview verification separately; its result is recorded below.

## Implemented content

[press.ts](../../../app/data/portfolio/press.ts) is the shared content authority. [Press.tsx](../../../app/components/portfolio/overdrive/Press.tsx) renders the records; [overdrive-press.css](../../../app/styles/portfolio/overdrive-press.css) contains their component-specific presentation.

| Surface | Content and destination |
|---|---|
| Home, `#in-the-news` | ETV Bharat as the dominant quotation, KNO and Rising Kashmir as supporting reports; two institution-sourced recognition entries; link to the full archive. |
| About, `#press` | All six dated reports, original links, contexts and applicable headline or adaptation attribution. |
| About, `#recognition` | SKIIE incubation, SKUAST-K commendation at the app inauguration, Republic Day recognition and KVK Pulwama felicitation. |
| KashCrop case, `#project-press` | ETV Bharat, KNO and Greater Kashmir, connected to the historical orchard-app case. |
| Plant Health Clinic case, `#project-press` | Rising Kashmir's report on the May app inauguration. |
| Other cases | No empty press section or unused chapter link. |

The six outlets are ETV Bharat, Kashmir News Observer, Rising Kashmir, Greater Kashmir, Kashmir Ahead and FreshPlaza. The [press source packet](../press-research/press-coverage.md), [structured press research](../press-research/press-coverage.json) and [recognition research](../press-research/recognition.json) preserve original URLs, dates, provenance and exclusions.

### Source distinctions

- FreshPlaza explicitly adapts ETV Bharat's report; that credit is visible in the archive.
- Greater Kashmir's excerpt is explicitly identified as the publisher headline and links to the video report.
- The older KashCrop coverage describes that app at the time. It does not establish current BaghBani features, release status or measured results.
- SKIIE incubation is supported by the institutional startup directory. The May 18 recognition is a Vice Chancellor's commendation at the app inauguration, not an invented named award.
- Republic Day and KVK entries link to verified original founder posts and visibly say **Founder's post**. January 15 is the KVK post's publication date, so the displayed milestone remains **January 2026**.
- May's app inauguration is distinct from the clinic facilities launch in April. Unrelated legal entities, speculative awards and private family-health circumstances were excluded.

The root independently opened the selected publisher and university sources. ETV and the original founder posts were also retrieved through Exa where ordinary retrieval was blocked. Original source URLs and final rendered link targets were verified; no claim is made that every publisher permits automated direct HTTP retrieval.

## Rendered verification

Nine route/viewport renders completed with **61 checks passed**, zero page or asset errors, no missing images, no horizontal overflow, and no axe WCAG 2 A/AA or WCAG 2.1 AA violations.

| Evidence | Scope | Result |
|---|---|---|
| [Core verification](core-verification.json) | Home at 1440, 390 and 375px; About at 1440 and 390px | 36 checks passed across five renders. |
| [Case verification](cases-verification.json) | KashCrop and Plant Health Clinic at 1440 and 390px | 25 checks passed across four renders. |
| [Public preview](public-preview.json) | Five fresh browser contexts on the public URL, covering Home, About press, About recognition and both case chapters | All returned 200, loaded the expected records and fonts, and reached the intended anchors without page errors or overflow. |
| [Typecheck](typecheck.log) | Existing project typecheck | Passed. |
| [Production build](build.log) | Existing React Router production build | Passed. |
| [Tests](tests.log) | Existing test suite | 11 files, 71 tests passed. |

The browser checks compare exact quote text, publication dates, `cite` URLs, original-link destinations, visible provenance, expected record order and counts against canonical data. They also cover 44px actions, external link attributes, visible keyboard focus, recognition source types, the KVK month-only date, case chapters, Home-to-About navigation, recognition navigation and reduced-motion content. Unrelated case output was checked for absence of an empty press section or chapter. No contact enquiry was submitted.

The scripts are preserved as [press-capture.mjs](press-capture.mjs) and [press-public.mjs](press-public.mjs). They run from the repository root and write their working output under `.impeccable/review/press/`.

## Visual evidence

The root opened and inspected all 16 final images. Section images are crops of an unaltered full-page render made from the top of the document, avoiding fixed-header capture artifacts. A section crop can omit its parent page gutter; the full-page and first-viewport captures retain that context.

| Area | Desktop | Phone |
|---|---|---|
| First viewport | [1440px](desktop.png) | [390px](mobile.png), [375px](user-375.png) |
| Home context | [Full page](home-desktop-full.jpg) | First viewport and section captures |
| Home press | [1440px](home-desktop-press.jpg) | [390px](home-mobile-press.jpg), [375px](home-375-press.jpg) |
| About context | [Full page](about-desktop-full.jpg) | Section captures |
| About press | [1440px](about-desktop-press.jpg) | [390px](about-mobile-press.jpg) |
| About recognition | [1440px](about-desktop-recognition.jpg) | [390px](about-mobile-recognition.jpg) |
| KashCrop press | [1440px](kashcrop-desktop-press.jpg) | [390px](kashcrop-mobile-press.jpg) |
| Plant Health Clinic press | [1440px](phc-desktop-press.jpg) | [390px](phc-mobile-press.jpg) |

[evidence-manifest.json](evidence-manifest.json) records the copied images, verification reports and logs with their byte sizes and SHA-256 hashes. These are rendered QA evidence, not new website raster assets. Existing project and font provenance remains in force.

## Detector and system comparison

Impeccable ran once for this extension across the six changed source files. [detector.json](detector.json) records **zero primary findings** and **20 advisories**: 19 local font-size observations and one compact panel-radius observation against the original design ramp.

The advisories were assessed against the rendered composition, which retains the accepted two-family hierarchy and palette. Local quote, metadata and phone sizing belongs to the component; no blanket token normalization or detector suppression was applied. The final design documentation comparison preserves the canonical `DESIGN.md` frontmatter and `.impeccable/design.json`, while recording the new press behavior in the narrative.

## Preview

Verified on 12 October 2026:

- [Home press highlights](https://prove-jane-little-ranking.trycloudflare.com/#in-the-news)
- [Complete press archive](https://prove-jane-little-ranking.trycloudflare.com/about#press)
- [Recognition](https://prove-jane-little-ranking.trycloudflare.com/about#recognition)
- [KashCrop coverage](https://prove-jane-little-ranking.trycloudflare.com/projects/kashcrop#project-press)
- [Plant Health Clinic coverage](https://prove-jane-little-ranking.trycloudflare.com/projects/plant-health-clinic#project-press)

This is the existing temporary preview. The production company domain was not deployed as part of this content extension.
