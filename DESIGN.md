---
name: "KashCrop Innovations — Overdrive"
description: "A cobalt motion-title studio portfolio, with monumental lettering and real software in a spatial reel."
colors:
  od-blue: "#2448e8"
  od-white: "#f7f8ff"
  od-yellow: "#f5eb6a"
  od-pale: "#e9eeff"
  od-ink: "#162043"
  od-muted: "#d4ddff"
  od-line: "rgba(247,248,255,.28)"
  button-yellow-hover: "#fff79a"
  button-blue-hover: "#1938c0"
  field-surface: "#fff"
  field-line: "#b1bddc"
  field-muted: "#526080"
typography:
  display:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(132px, 24vw, 370px)"
    fontWeight: 800
    lineHeight: 0.83
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Sora, sans-serif"
    fontSize: "clamp(52px, 6.1vw, 96px)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  case-display:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(80px, 11.5vw, 172px)"
    fontWeight: 700
    lineHeight: 0.86
    letterSpacing: "-0.025em"
  service-display:
    fontFamily: "Barlow Condensed, Sora, sans-serif"
    fontSize: "clamp(88px, 10.6vw, 168px)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.025em"
  section-heading:
    fontFamily: "Sora, sans-serif"
    fontSize: "clamp(36px, 4vw, 60px)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Sora, sans-serif"
    fontSize: "clamp(26px, 2.4vw, 36px)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Sora, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  story:
    fontFamily: "Sora, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Sora, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  selection: "6px"
  input: "7px"
  action: "8px"
  browser: "9px"
  media: "14px"
  panel: "16px"
  reel-phone: "20px"
  project-pill: "100px"
  pill: "999px"
  circle: "50%"
spacing:
  page-x: "clamp(20px, 4.5vw, 72px)"
  outer-measure: "1600px"
  gap-small: "12px"
  gap: "24px"
  gap-large: "38px"
  case-section: "clamp(72px, 8vw, 116px)"
components:
  button-primary:
    backgroundColor: "{colors.od-yellow}"
    textColor: "{colors.od-ink}"
    rounded: "{rounded.action}"
    padding: "14px 23px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.button-yellow-hover}"
  button-blue:
    backgroundColor: "{colors.od-blue}"
    textColor: "{colors.od-white}"
    rounded: "{rounded.action}"
    padding: "14px 23px"
    height: "48px"
  button-blue-hover:
    backgroundColor: "{colors.button-blue-hover}"
  button-service:
    backgroundColor: "{colors.od-yellow}"
    textColor: "{colors.od-blue}"
    rounded: "{rounded.pill}"
    padding: "16px 22px"
    height: "56px"
  button-service-hover:
    backgroundColor: "{colors.od-white}"
    textColor: "{colors.od-blue}"
  button-service-blue:
    backgroundColor: "{colors.od-blue}"
    textColor: "{colors.od-white}"
    rounded: "{rounded.pill}"
    padding: "16px 22px"
    height: "56px"
  button-service-blue-hover:
    backgroundColor: "{colors.od-ink}"
    textColor: "{colors.od-white}"
  filter-selected:
    backgroundColor: "{colors.od-yellow}"
    textColor: "{colors.od-blue}"
    rounded: "{rounded.project-pill}"
    padding: "10px 14px"
    height: "44px"
  reel-selection:
    backgroundColor: "{colors.od-yellow}"
    textColor: "#1736b6"
    rounded: "{rounded.selection}"
    padding: "10px 13px"
    height: "44px"
  search:
    backgroundColor: "transparent"
    textColor: "{colors.od-white}"
    rounded: "{rounded.project-pill}"
    padding: "1px 1px 1px 15px"
    width: "275px"
  input:
    backgroundColor: "{colors.field-surface}"
    textColor: "{colors.od-ink}"
    rounded: "{rounded.input}"
    padding: "12px"
    height: "48px"
  navigation:
    backgroundColor: "{colors.od-blue}"
    textColor: "{colors.od-white}"
    height: "88px"
  commitment-sheet:
    backgroundColor: "{colors.od-yellow}"
    textColor: "{colors.od-ink}"
    rounded: "{rounded.panel}"
    padding: "60px 62px 35px"
---

# Design System: KashCrop Innovations — Overdrive

## Overview

**Creative North Star: "The work is a moving opening title."**

Overdrive presents KashCrop as a motion-title design studio: confident cobalt space, bright citron interruptions, monumental lettering and software that has physical presence. The products supply the image detail. Navigation, language and service information remain direct enough for founders, institutional buyers and agricultural experts to find the next step.

The world is continuous across Home, Work, all six project cases, Services, every service detail, About, Contact, the viewer and shared navigation. Pale and citron sections change the pace within that world. The spatial reel is its signature interaction; open project layouts and precise media frames extend the same material without repeating the homepage composition.

**Key Characteristics:**

- A continuous cobalt shell, with offwhite language and citron emphasis.
- Sora for readable language and controls; Barlow Condensed for monumental lettering and selected page titles.
- Actual interface captures, with separately identified synthetic demonstrations and accessible source context.
- Soft depth on the work and overlays; flat rules and open space around supporting information.
- Direct selection, ordinary links and a complete static experience alongside decorative motion.

This is the implemented system recorded on 12 October 2026 after the independent finish review. The current [direction contract](docs/design/OVERDRIVE_2026-10-12.md) supersedes the Fieldwork and Apple presentation iterations. The visual sources are [overdrive.css](app/styles/portfolio/overdrive.css), [overdrive-reel.css](app/styles/portfolio/overdrive-reel.css), [overdrive-projects.css](app/styles/portfolio/overdrive-projects.css) and [overdrive-services.css](app/styles/portfolio/overdrive-services.css). The [sidecar](.impeccable/design.json) records extensions and component previews; the frontmatter above owns reusable primitives.

## Colors

Saturated cobalt carries the environment. Offwhite provides the main reading contrast, citron adds warmth and emphasis, and pale blue creates a quieter surface for inspecting or discussing the work.

### Primary

**Cobalt** is the page, header and footer canvas. It also becomes an action or reading color on pale and citron surfaces. Its deeper hover step belongs to the shared blue button.

### Secondary

**Citron** marks selected controls, key headline phrases and project actions. It also fills entire commitment, package and workflow sections. Its use is substantial and deliberate; the implementation does not treat it as a rare notification color.

### Neutral

**Offwhite** carries primary text on cobalt. **Pale** is a media-stage, process, contact-panel and viewer material. **Ink** supports comfortable reading on light surfaces. **Muted** is the lighter supporting language on cobalt, while **field-muted** is the darker supporting language inside the contact panel.

The shared translucent line divides content on cobalt. Light panels use their own visible field borders. Focus is citron on cobalt and cobalt on the light contact, package and viewer surfaces. Inputs use the field surface; error treatments remain semantic form states.

**The Continuous Stage Rule.** Keep the shared cobalt shell coherent across routes. Citron and pale sheets belong to the same palette; a project image can carry its own colors without creating another site identity.

The green and lavender artwork fields on Home, and the clinic reel tint, are local composition colors. The actual application screens retain their source colors. Those local tints do not expand the global palette. Tonal ramps in the sidecar are generated preview metadata, not additional implementation tokens.

## Typography

**Display font:** Barlow Condensed, with sans-serif fallback; the service styles also name Sora as a fallback. **Language and control font:** Sora, with sans-serif fallback.

Both families are served from the site's font assets with swap loading. The Sora variable file supports weights 400–800. Barlow Condensed has separate 700 and 800 files. The deployed paths are /fonts/sora-latin-variable.woff2, /fonts/barlow-condensed-latin-700.woff2 and /fonts/barlow-condensed-latin-800.woff2; OFL licensing and provenance are recorded in public/fonts/overdrive-fonts.json.

The contrast is one of width and scale: compact, close-set Sora explains the work, while tall condensed lettering gives names and titles a physical presence.

### Hierarchy

- **Display:** the Barlow 800 masthead role is specific to monumental brand lettering. Its close line box is a composition device, not a body-text rhythm.
- **Headline:** the Sora 600 role is the two-line homepage statement. General section headings use the separate Sora section-heading role.
- **Case and service display:** Barlow 700 gives project and service titles their own observed fluid scales. Work uses a larger archive title scale, while the case section titles use smaller condensed scales.
- **Title:** Sora 600 names archive projects; captions and supporting headings use nearby Sora sizes and weights.
- **Body and story:** base language is 16px with a 1.6 line height. Case narratives use 18px at 1.75 and a maximum measure of 70ch; their narrow-layout text steps to 17px. Service narrative measures normally sit around 37–67ch.
- **Label:** the shared action role uses 14px, weight 500 and a 1.4 line height. Navigation and source captions have local size adjustments; they are not a separate display voice.

**The Two Voices Rule.** Use Barlow Condensed for the monumental masthead and the implemented display-title roles. Keep Sora for the small wordmark, navigation, explanatory headings, prose and controls.

Keep the implemented title wrapping and readable paragraph measure. Small metadata adjustments belong to their components, rather than a new site-wide microtype scale.

## Layout

The outer measure is 1600px, including fluid side padding. Layouts use open two-column compositions, generous chapter separation, and occasional full-width sheets. Gaps follow the content: the homepage's feature grid uses a 7:5 split and a staggered second project; Work uses a 12-column grid with alternating 7- and 5-column spans; case stories and service chapters give artwork and copy different widths.

Those are surface-specific arrangements. The reusable grammar is broad space, deliberate unequal columns, clear reading measures and large real media. Supporting rows use thin rules rather than enclosing every item.

| Scope | Implemented responsive behavior |
|---|---|
| Shared shell and Home | Refine at 1150px; the hero stacks and desktop navigation yields to its dialog trigger at 800px; compact phone compositions refine at 520px. A wide-screen adjustment begins at 1700px. |
| Header | Sticky and opaque: 88px on desktop, 76px at 800px and below, and 72px at 520px and below. |
| Work and cases | Refine at 1050px and stack at 680px. Work moves through unequal columns, equal columns, then one column. Case facts become two columns; galleries move from three to two to one. |
| Services and service detail | Refine at 1050px; stack at 750px; media frames refine again at 450px. The process moves from four columns to two. |
| Spatial reel | Uses container queries at 560px and 355px. The smaller reel expands panels from 62% to 74% width and reduces perspective from 1250px to 850px. Its toolbar remains separate from the moving artwork. |
| Viewer | Preserves the existing adaptations at 1000px, 750px, 560px and 360px, with an additional short-landscape rule at a height of 620px. Long captures remain vertically readable. |
| Decorative scroll | Homepage phone parallax is eligible at 900px and above, and only while motion is enabled. |

Contact moves from two columns to one at the shared tablet breakpoint. Its paired fields stack or pair according to their available layout, and select controls use a 16px font on compact phones. Keep the native vertical page scroll when swiping the reel.

## Elevation & Depth

Depth is a hybrid of real media layering, perspective and soft shadows. The reel panels and captured screens carry the strongest depth. Flat citron or pale sheets and fine rules organize surrounding prose. The header is opaque cobalt; its current treatment does not use the earlier frosted-glass navigation.

### Shadow Vocabulary

- **Reel panel:** a directional but soft shadow (16px 28px 44px rgb(7 21 98 / 27%)); the small-container version reduces to 10px 19px 30px rgb(7 21 98 / 25%).
- **Reel phone:** a closer shadow (9px 14px 25px rgb(18 34 75 / 25%)).
- **Work phone:** a centered, broad shadow (0 24px 38px rgb(17 39 102 / 20%)).
- **Service capture:** a soft screen shadow (8px 18px 34px rgb(16 37 120 / 16%)).
- **Navigation dialog:** an ambient overlay shadow (0 30px 100px rgba(4,14,70,.3)).

**The Work Has Weight Rule.** Concentrate spatial depth on real interface surfaces, reel panels and active overlays. Service lists, facts and the package sheet use color, rules and spacing to establish hierarchy.

The shared easing is cubic-bezier(.16,1,.3,1). Most control color transitions last 160–200ms; spatial media settles over 500–800ms. The reel uses an explicit damped spring rather than a repeated autoplay cycle. Its motion and cancellation behavior are recorded with the component below.

## Shapes

Shape distinguishes the job of the component. Shared header and homepage actions use an 8px radius; service actions use full pills, and project actions use a 100px pill radius. Archive filters and search are pills, while the reel picker and contact choices use compact 6px corners. Contact fields use 7px corners.

The homepage artwork and reel panels have 14px corners. Commitment and contact sheets use 16px corners, tightening to 12px on compact layouts. Work and case stage backgrounds are deliberately square; service media uses 8px corners. Browser and phone frames clip their actual captures with nested, source-specific radii. Circular controls are reserved for arrows, inspection and compact actions.

Do not normalize these roles into one universal rounded card. Maintain the image's source aspect ratio and keep decorative device framing separate from the controls of the presented application.

## Components

### Actions

Shared actions are compact, confident rounded rectangles. They are at least 48px tall, with an icon separated from the label by 24px. Citron actions use Ink; their blue counterparts use Offwhite. On hover, the arrow shifts 2px up and right; a press scales the shared action to 0.97. Service actions are roomier pills, at least 56px tall on desktop and 52px on small layouts, with color feedback instead of the shared arrow movement.

Text links retain ordinary destinations and an underline or clear action label. Global keyboard focus is a 3px outline with 5px offset; the reel and form fields have their own deliberate treatments.

### Navigation and footer

The Sora wordmark reads kashcrop. with a citron stop. Desktop navigation offers Work, What we do and The studio, beside the persistent contact action. Active and hovered desktop links reveal a fine underline. At the tablet breakpoint a native dialog provides the same destinations, Escape dismissal and focus return through its controls.

The footer continues the cobalt shell, with direct email and phone links, an email-copy fallback, LinkedIn, privacy, back-to-top and the motion preference. The preference is visibly disabled when system reduced motion is already in force.

### Spatial project reel

The reel is DOM-based and displays the real featured project material. Its perspective panels move independently of the caption, project action and control strip. Project buttons expose their pressed state; previous/next controls, Left/Right, Home/End and horizontal drag provide direct selection. The selected project is announced politely; inactive panels are hidden from assistive technology.

The spring uses a stiffness of 126 and damping of 20. Drag follow uses an exponential factor of 28; pointer tilt follows at 9, with approximately ±1.5° vertical and ±2° horizontal mouse tilt. Depth scales with reel width and clamps between 65px and 144px. Movement stops when settled; hidden, out-of-view and blurred states cancel active drag and settle the scene.

Reduced motion and the site preference retain the complete composition and every direct control, with selection settling immediately and pointer decoration disabled. Vertical touch travel remains page scrolling. There is no autoplay.

### Work filters and search

Archive categories remain ordinary links with URL state. A selected category is a citron pill; hover on an unselected category uses the pale surface. Search is a labeled GET form with a clear submit control, 16px input text and a visible keyboard outline. Preserve the result count, query/category state and empty-result recovery.

### Artwork, cases and viewer

Large project artwork remains the main evidence. Links open the case or the original accessible screen viewer; decorative crops never replace the ability to inspect the full capture. Source captions remain outside the media frame. Case pages retain the story, scope, workflow, capabilities, technologies, references and material disclosure.

The viewer uses pale blue with Ink and darker supporting text. It remains a native dialog with direct screen identifiers and readable scrolling for long mobile captures. Its current supporting text uses the source's darker viewer color, rather than the main site's light muted color.

Interface recordings sit in a native disclosure, with controls and no autoplay. They use no preload beyond their poster, pause when closed, and retain access to the mobile recording and the synthetic-data provenance.

### Commitment and package sheets

The homepage commitment is a rounded citron sheet. Services presents the full package on a broad citron field, using a two-column, eight-row semantic table: comparison topic and the KashCrop offer. The actual quote scope and client-controlled publisher account remain in the adjacent terms disclosure.

The sheet presents existing confirmed offers; it is not a competitor scorecard. Keep pricing, hosting term, maintenance coverage, publishing conditions and third-party-charge qualifiers readable at every size. Package rows and scoped copy are sourced from [offer.ts](app/data/portfolio/offer.ts).

### Service disclosures and process

The homepage service list uses native details and summary, with a ruled row and an arrow that reverses on opening. The fuller service pages pair a discipline with relevant evidence, then show included scope and a numbered process. These are reading and navigation components: retain their real service destinations and native semantics.

### Contact fields and states

The enquiry panel is pale with white fields, Ink text and visible field borders. Controls are at least 48px tall. Labels stay associated with inputs; radio choices expose checked and keyboard-focus states. The actual field focus outline is 2px, with cobalt color and a 2px offset. Choice focus uses a 3px cobalt outline.

Keep validation messages, the error summary, disabled/waiting behavior, success content and the direct contact alternative. Error colors describe form status, not another site accent. The existing textarea supports vertical resizing.

## Do's and Don'ts

### Do:

- **Do** keep the cobalt shell, current typographic wordmark and two-family hierarchy consistent on new routes.
- **Do** choose a source-backed capture and preserve its project, screen identity, aspect ratio and provenance.
- **Do** keep case captions, source disclosures, full-size inspection and ordinary destination links close to the work.
- **Do** preserve the current project package terms, semantic table headers and visible scope qualifiers when changing presentation.
- **Do** provide visible keyboard focus and direct controls alongside drag, hover and scroll effects.
- **Do** verify the complete static composition, narrow layouts and long-screen reading before shipping changes.

### Don't:

- **Don't** restore Fieldwork or Apple-era visual instructions as the authority for this build.
- **Don't** recolor application captures to fit the site palette or present synthetic demonstrations as shipped product evidence.
- **Don't** make drag, decorative motion or an optional recording the only route to a project or its information.
- **Don't** turn a local stage tint, a composition-specific measurement or small caption treatment into a universal design token.
- **Don't** remove useful routes, URL state, screen IDs, factual content or contact states while simplifying the interface.
