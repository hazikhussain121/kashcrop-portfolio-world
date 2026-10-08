---
name: KashCrop Innovations
description: Apple-inspired product presentation with KashCrop identity, real interfaces, and confident motion.
colors:
  paper: "#fff"
  surface: "#f5f5f7"
  ink: "#1d1d1f"
  muted: "#6e6e73"
  display-muted: "#77777d"
  line: "rgba(29,29,31,.14)"
  line-solid: "#d2d2d7"
  control-hover: "#373739"
  control-track: "#e8e8ed"
  focus: "#0067d6"
  selection: "#d8e7fa"
  garden-stage: "#edf3ed"
  clinic-stage: "#edf3f7"
typography:
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, Geist, Helvetica Neue, Segoe UI, sans-serif"
    fontSize: "clamp(56px, 6.5vw, 88px)"
    fontWeight: 600
    lineHeight: 1.025
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "-apple-system, BlinkMacSystemFont, Geist, Helvetica Neue, Segoe UI, sans-serif"
    fontSize: "clamp(40px, 4.5vw, 64px)"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-0.04em"
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, Geist, Helvetica Neue, Segoe UI, sans-serif"
    fontSize: "32px"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, Geist, Helvetica Neue, Segoe UI, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, Geist, Helvetica Neue, Segoe UI, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  browser: "12px"
  desktop-display: "16px"
  panel-mobile: "24px"
  panel: "28px"
  phone: "30px"
  pill: "999px"
spacing:
  page-x: "clamp(22px, 5vw, 72px)"
  page-x-mobile: "22px"
  content-measure: "1280px"
  outer-measure: "1400px"
  navigation-measure: "1180px"
  product-family-measure: "1060px"
  section: "100px"
  grid-gap: "24px"
  archive-gap: "26px"
  hero-top: "44px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "12px 23px"
    height: "46px"
  button-primary-hover:
    backgroundColor: "{colors.control-hover}"
    textColor: "{colors.paper}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "12px 0"
    height: "44px"
  chip-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "11px 17px"
    height: "44px"
  search:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 6px 0 15px"
    height: "46px"
  product-panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "38px"
  navigation:
    backgroundColor: "rgba(255,255,255,.84)"
    textColor: "{colors.ink}"
    height: "64px"
---

# Design System: KashCrop Innovations

## Overview

**Creative North Star: “The product, beautifully presented.”**

The approved direction is an Apple-inspired presentation adapted to KashCrop’s own work. White and silver surfaces, confident sans-serif headlines, clear product photography and interface captures create a familiar visual rhythm. Motion gives the products scale and depth while navigation and controls stay direct.

This system replaces the earlier Fraunces and red-room identity. Keep KashCrop’s existing red-and-green logo and original copy. The products supply their own colors inside real screenshots; the surrounding website remains neutral.

The implementation sources are app/styles/portfolio/apple-base.css, apple.css, and apple-pages.css. The frontmatter above records reusable primitives. The .impeccable/design.json sidecar records motion, elevation, breakpoints, and component previews.

**Key characteristics:**

- Large native sans-serif type, with a locally hosted Geist fallback.
- Real software presented at a readable scale.
- One white/silver visual system across home, archive, detail pages, forms, viewer, and footer.
- Purposeful product choreography and optional, manually controlled recordings.

## Colors

### Primary

**Ink** carries headlines, primary actions, active archive filters, and navigation. Its hover step adds feedback without introducing another brand color.

### Neutral

**Paper** is the main canvas. **Surface** groups products and supporting content. **Muted** is for supporting copy; **display-muted** is reserved for larger secondary headline phrases. **Line** and **line-solid** divide facts, lists, and navigation without enclosing every element.

**The Neutral Frame Rule.** Product colors belong to actual imagery and selected presentation stages. They do not establish separate site identities.

Garden and clinic tints are local product-stage backgrounds. Blue is a functional focus/selection signal. The existing logo retains its own asset colors. Legacy CSS variables named --red and --red-deep are compatibility aliases for the neutral action system; their names do not authorize red page treatments.

## Typography

**Display and body:** native Apple/system sans, then locally hosted Geist, then platform fallbacks. Geist weights 400, 500, 600, and 700 are supplied from /fonts/; no remote font request is required.

- **Display:** use the frontmatter hero scale. The homepage tops out at 88px. Supporting page intros use comparable scales with their own responsive line breaks.
- **Headline:** major sections use approximately 40–64px, with smaller layouts stepping down to the mid-30px range.
- **Title:** product and service names generally use 24–36px. Supporting-page tracking is usually −0.035em.
- **Body:** most narrative copy is 16–18px; short hero descriptions are 19–21px. Paragraphs normally stay within 45–65 characters per line.
- **Labels:** compact navigation, facts, captions, and provenance use 11–14px. Small text is not a substitute for visible explanation.

**The Single Voice Rule.** Headings and prose use the same sans family. Do not reintroduce the previous serif pairing, uppercase technical labels, or gradient-filled type. Keep tracking at or above −0.04em.

## Layout

The active content measure is 1280px. The shared outer wrapper allows 1400px including side padding; navigation and footer use an approximately 1180px inner measure. Major sections normally have 80–110px of separation, with 20–28px gaps between related items.

The homepage opens with centered copy and a real product family. At the default desktop size, the family is 440px tall; the center device occupies 64% of its width, starts 18% from the left, and sits 40px from the top. Its display uses a 16:9 viewport. The SKIIE chapter uses a wider 2.45:1 crop to keep the real campus banner visible. These are homepage composition values, not requirements for every new page.

| Surface | Responsive behavior |
|---|---|
| Home and shared navigation | Adapt at 1099px and 750px; narrow-phone refinements at 374px; a larger-desktop adjustment begins at 1600px. |
| Supporting pages | Adapt at 1100px, 800px, and 480px. Two-column archives become one column; service rows stack; facts and galleries retain readable spacing. |
| Sticky product showcase | Enabled only at a minimum width of 1100px and height of 850px with a fine pointer and hover support. Elsewhere the same products remain accessible through ordinary tabs. |
| Screen viewer | Long mobile captures retain a readable 390px presentation and scroll vertically; desktop captures use the available viewport. |

Preserve URL-based project filters, direct screen IDs, legacy project redirects, and ordinary links when changing the layout.

## Elevation & Depth

Depth comes from layered real screens, a small amount of hardware geometry, and selective shadows. Panels themselves are mostly flat tonal surfaces. The navigation blur expresses a floating navigation layer; it is not repeated behind ordinary content.

Representative source treatments:

- **Homepage phone:** offset shadow (0 24px 38px -16px rgba(26,33,37,.32)) with a subtle hardware edge.
- **Supporting phone:** soft shadow (0 17px 42px #1d1d1f2b) around a dark device frame.
- **Browser window:** soft shadow (0 20px 45px #1d1d1f24).
- **Selected product tab:** compact shadow (0 2px 8px rgba(0,0,0,.08)).
- **Screen viewer:** elevated dialog (0 40px 110px rgba(0,0,0,.24)).

**The Product Depth Rule.** Spend depth on the presented software and active overlays. Keep text sections, facts, and routine cards calm.

## Shapes

Large product panels use gently curved corners; mobile panels tighten slightly. Buttons and compact filters are full pills. Browser windows and desktop screens use smaller radii. Phone frames preserve the source screen’s aspect ratio and have a nested, clipped screen surface.

The homepage uses subtle metallic hardware geometry. Supporting pages use simpler dark frames. Both contain actual captured software. Device frames do not invent controls, performance figures, or product states.

## Components

### Actions and navigation

Primary actions are ink pills with white text. Standard actions are 46px tall; supporting-page actions use 48px. Text links have a visible arrow or a clear action label and underline on hover. Press feedback scales to approximately 0.97–0.975.

The header is a 64px translucent white bar, reduced to 58px on mobile. It contains Work, Services, About, and a compact project action. Mobile navigation uses a native dialog with focus management. Reduced-transparency preference removes navigation blur.

Global focus is a three-pixel blue outline. Supporting pages use an equally explicit ink outline. Search fields indicate focus on the enclosing control. Do not remove keyboard focus to make a screenshot look cleaner.

### Product tabs, filters, and search

Homepage tabs use a silver track and a raised white active segment. Archive filters use an ink selected pill. Preserve the existing keyboard semantics and live result count.

Search remains a labeled GET form. Its query and category remain in the URL; an empty result provides a clear route back to all work.

### Product panels and galleries

Use real images as the main content. Archive tiles retain a project title, short description, route link, and available screen-viewer action. Preserve source captions and sample-data context. Place source captions below the artwork with a clear gap, so they remain separate from the product image and cannot overlap device frames.

The screen viewer remains a native dialog. Long captures must be scrollable at a readable width. Never convert a tall capture into a tiny full-height thumbnail as its only inspection view.

### Motion and recordings

The homepage’s authored moment is a layered product entrance followed by subtle scroll separation. Product chapters use staggered copy and screen transitions. CSS uses the shared exponential ease; GSAP entrance motion uses power3.out. Main chapter copy and visuals enter over 0.65s and 0.9s, respectively.

Content is visible before animation setup. Honor prefers-reduced-motion, the site’s motion toggle, and the layout eligibility gate. Motion-off users keep all navigation and content.

Project recordings sit behind **Watch interface film**. Native video controls, no autoplay, preload="none", and pause-on-close preserve user control. Keep recording provenance and mobile recording access.

### Forms, facts, and disclosures

Forms share the neutral palette and rounded controls. Keep existing error, waiting, validation, and confirmation states. Facts use ordinary definition lists; sequential processes use ordered lists. Technical scope belongs on project detail pages, not as decoration in the homepage hero.

## Do's and Don'ts

### Do:

- **Do** keep KashCrop’s logo and factual project records intact.
- **Do** build new pages in the same neutral material and sans-serif hierarchy.
- **Do** use actual interfaces, original copy, clear destinations, and honest recording provenance.
- **Do** make product motion ambitious while keeping the complete static experience available.
- **Do** inspect mobile spacing, focus, long-screen scrolling, and real content together.

### Don't:

- **Don't** restore the superseded Fraunces/red-room presentation or layer another design identity over this one.
- **Don't** substitute fabricated application screenshots, adoption figures, or validation claims.
- **Don't** turn every section into an animation demo or conceal content until scrolling triggers it.
- **Don't** autoplay optional recordings or leave a hidden recording playing after its disclosure closes.
- **Don't** discard useful project details, source notes, URL behavior, or gallery access while simplifying the layout.
