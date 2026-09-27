---
name: KashCrop Innovations
description: Proof-led studio portfolio. Quiet rooms, then red as a place.
colors:
  red: "#e10f1c"
  red-bright: "#ff2d2d"
  red-deep: "#8a0a13"
  ember: "#ff5b3a"
  oxblood: "oklch(0.30 0.12 25)"
  oxblood-2: "oklch(0.34 0.13 25)"
  crimson-rich: "oklch(0.46 0.20 26)"
  crimson-deep: "oklch(0.22 0.10 24)"
  ink: "oklch(0.975 0.002 60)"
  ink-2: "oklch(0.955 0.003 50)"
  ink-3: "oklch(0.935 0.004 45)"
  ink-4: "oklch(0.910 0.005 40)"
  bone: "oklch(0.18 0.02 25)"
  bone-dim: "oklch(0.40 0.02 25)"
  ash: "oklch(0.55 0.015 30)"
  cta-ivory: "#f4ece9"
  ink-dark: "#0a0708"
  ink-2-dark: "#110b0d"
  ink-3-dark: "#1b1214"
  ink-4-dark: "#241619"
  bone-dark: "#f4ece9"
  bone-dim-dark: "#b9a9a4"
  ash-dark: "#6b5b58"
typography:
  display:
    fontFamily: "Fraunces, Times New Roman, serif"
    fontSize: "clamp(2.75rem, 11vw, 12rem)"
    fontWeight: 300
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Fraunces, Times New Roman, serif"
    fontSize: "clamp(2.25rem, 4vw, 4.5rem)"
    fontWeight: 300
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Fraunces, Times New Roman, serif"
    fontSize: "clamp(1.875rem, 2.5vw, 2.25rem)"
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Geist, Inter, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Geist Mono, SFMono-Regular, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    letterSpacing: "0.22em"
rounded:
  sm: "2px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  page-x: "24px"
  page-x-lg: "48px"
  section-y: "112px"
  section-y-lg: "160px"
  gutter: "16px"
  measure: "1600px"
components:
  button-primary:
    backgroundColor: "{colors.red}"
    textColor: "{colors.cta-ivory}"
    rounded: "{rounded.full}"
    padding: "16px 32px"
  button-primary-hover:
    backgroundColor: "{colors.red-bright}"
    textColor: "{colors.cta-ivory}"
    rounded: "{rounded.full}"
    padding: "16px 32px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    rounded: "{rounded.full}"
    padding: "16px 32px"
  button-ghost-hover:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    rounded: "{rounded.full}"
    padding: "16px 32px"
  button-nav:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    rounded: "{rounded.full}"
    padding: "8px 20px"
    typography: "{typography.label}"
  input:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    rounded: "{rounded.md}"
    padding: "14px 16px"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.bone-dim}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
    typography: "{typography.label}"
  card-service:
    backgroundColor: "{colors.ink-2}"
    textColor: "{colors.bone}"
    rounded: "{rounded.xl}"
    padding: "40px"
---

# Design System: KashCrop Innovations

## 1. Overview

**Creative North Star: "Red Is a Place"**

KashCrop’s site is a sequence of rooms, not a deck of cards. The default room is a near-neutral ivory page (chroma ≈ 0.002) so the surface stays off the cream/sand/biscuit band. Warmth lives in the type, the grain, and the rooms that actually drench. When a section inverts, the opposite theme’s ink and bone swap in as a whole chamber. When a section drenches, oxblood is the floor: red is occupied space, not a stripe, not a gradient wash, not a coat of paint on every card.

The voice is grounded and expert. Display type is light Fraunces at tight tracking (−0.02em). Body is Geist. Labels are Geist Mono, uppercase, tracked. Section openers are large Fraunces statements — never a numbered kicker. Stats and work read as ledgers and runways: hairline rows, not hero-metric tiles. Motion is choreographed (Lenis, GSAP clip-reveals, press scale 0.97) and must collapse under `prefers-reduced-motion`.

This system rejects generic SaaS boilerplate, vaporware marketing, playful/sketchy illustrations, and 32px+ “insanely rounded” card UI. It also rejects the 01 / 02 / 03 section scaffold unless the content is a real sequence.

**Key Characteristics:**
- Quiet ivory rooms vs inverted ink rooms vs oxblood drench rooms
- Red (`#e10f1c`) as the constant brand mark across themes
- Light Fraunces display + Geist body + Geist Mono labels
- Hairline ledgers and runways over nested cards
- Full-pill CTAs; rooms stay 16px or tighter
- Grain, vignette, and ember bloom as atmosphere — not structure
- Reduced-motion alternatives are mandatory

## 2. Colors: Quiet Rooms, Red Places

The palette has two jobs: keep the default room quiet, and let red occupy a room when the narrative needs it. Brand red does not flip with theme.

### Primary
- **Signal Red** (`#e10f1c`): The KashCrop mark. Live dots, selection, hairline progress, primary CTAs, hover fills. Used as a mark or as a filled pill — not as a page wash.
- **Hot Signal** (`#ff2d2d`): Hover/bright state on filled red controls.
- **Deep Crimson** (`#8a0a13`): Darker brand step; reserve for pressed or deep marks.
- **Ember** (`#ff5b3a`): Bloom and seam highlights only. Never body text.

### Secondary
- **Oxblood** (`oklch(0.30 0.12 25)`): Drenched body surface. A room you enter, not a tint on a card.
- **Oxblood Raised** (`oklch(0.34 0.13 25)`): Raised plane inside a drench room.
- **Crimson Rich** (`oklch(0.46 0.20 26)`): Hot accent on drench, when Signal Red would blow out.
- **Crimson Deep** (`oklch(0.22 0.10 24)`): Deepest drench / footer-grade floor.

### Neutral
Light is the default theme (`:root` / `[data-theme="light"]`). Dark is the original editorial ink mood (`[data-theme="dark"]`). `.surface-invert` swaps the whole room to the opposite theme’s ink/bone set; red stays the accent.

- **Quiet Ivory** (`oklch(0.975 0.002 60)`): Light page background (`--ink`). Near-neutral; chroma is a hair, not warmth-by-default.
- **Ivory Raised / Cards / Hover** (`oklch(0.955 0.003 50)` / `0.935 0.004 45` / `0.910 0.005 40`): Tonal steps `--ink-2` through `--ink-4`.
- **Ink Bone** (`oklch(0.18 0.02 25)`): Light-theme primary text. Near-black with a red lean.
- **Ink Bone Dim** (`oklch(0.40 0.02 25)`): Secondary body. Contrast-safe; do not mute further.
- **Ash** (`oklch(0.55 0.015 30)`): Captions and mono labels.
- **Warm Ivory (CTA / dark text)** (`#f4ece9`): Text on Signal Red pills in every theme, and primary text in dark rooms. Do not put theme `bone` on a red button.
- **Dark Ink ramp** (`#0a0708` / `#110b0d` / `#1b1214` / `#241619`): Dark-theme and inverted-room surfaces.
- **Dark Bone / Dim / Ash** (`#f4ece9` / `#b9a9a4` / `#6b5b58`): Dark-theme text ramp.
- **Line / Line Strong**: `rgba(26,16,18,0.12)` / `0.20` on light; `rgba(244,236,233,0.10)` / `0.18` on dark.

### Named Rules
**The Quiet Room Rule.** Default body background stays near-neutral ivory (chroma ≈ 0.002). Cream, sand, biscuit, parchment, and warm-tinted near-whites are forbidden as page surfaces. Warmth is type + drench + imagery.

**The Red-Is-a-Place Rule.** Oxblood and invert are whole rooms. Do not paint every card red. Do not use red as a left stripe, a gradient fill on type, or a uniform all-red page.

**The Constant Mark Rule.** `#e10f1c` does not change between light and dark. Theme tokens recolor ink and bone; they do not recolor the brand.

## 3. Typography

**Display Font:** Fraunces (Times New Roman fallback), opsz 9–144, weights 300–900, SOFT + WONK axes loaded
**Body Font:** Geist (Inter, system-ui fallback)
**Label/Mono Font:** Geist Mono (SFMono-Regular fallback)

**Character:** Light, slightly wonky display serif against a clean neo-grotesk body. The pairing is already committed identity — do not swap Fraunces or Geist for a “safer” catalog default. Mono is for labels, facts, and nav — not body copy.

### Hierarchy
- **Display** (300, `clamp(2.75rem, 11vw, 12rem)`, line-height 0.95, tracking −0.02em): Hero and contact openers only. `text-wrap: balance`. Periods may flush Signal Red.
- **Headline** (300, `text-4xl` / `md:text-6xl` / `lg:text-7xl`, line-height 0.95, tracking −0.02em): `SectionOpener` and major statements. Author line breaks in the copy.
- **Title** (300, `text-3xl` / `md:text-4xl`, line-height ~1.1): Service names, accordion project titles, dialog headings.
- **Body** (400, `text-base` / `md:text-lg`, leading-relaxed, max ~65–75ch): Geist on `bone-dim`. `text-wrap: pretty`.
- **Label** (400, 11px / 10px, uppercase, tracking 0.18–0.30em): Nav, proof chips, form legends, footer group titles. Geist Mono. One named kicker is allowed; an eyebrow on every section is not.

Headings `h1–h4` inherit Fraunces 300, tracking −0.02em, line-height 0.95. Do not tighten display tracking below −0.04em.

### Named Rules
**The Opener Rule.** Sections open with a large Fraunces statement (`SectionOpener`). The old `[02] WHAT WE DO` numbered uppercase eyebrow is a named AI-grammar tell and is prohibited.

**The Ledger Type Rule.** Stats, facts, and project indexes use display numerals or mono labels in a hairline list. They are not SaaS hero-metric tiles (big number + muted caption + gradient).

## 4. Elevation

Depth is tonal first. Rooms step through `--ink` → `--ink-2` → `--ink-3` → `--ink-4`. Atmosphere (fixed vignette, film grain overlay, ember bloom, `seam-glow`) sits behind the content. Shadows exist, but they are responses — hover, float, scrolled header — not a resting card style.

### Shadow Vocabulary
- **Raise** (light: `0 1px 0 rgba(255,255,255,0.6) inset, 0 24px 60px -34px rgba(60,30,30,0.45)` / dark: ivory hairline inset + deep black falloff): Service-card hover, raised emphasis.
- **Float** (light: inset highlight + `0 40px 110px -46px rgba(60,30,30,0.5)` + red bloom / dark equivalent): Rare, large lifts only.
- **CTA bloom** (`0 18px 60px -18px` / `0 22px 70px -20px rgba(225,15,28,0.7)`): Hover on filled Signal Red pills.
- **Glow Red** (`0 0 0 1px rgba(225,15,28,0.35), 0 20px 80px -20px rgba(225,15,28,0.55)`): Intentional red halo, not a default card shadow.
- **Scrolled nav** (`0 10px 40px -24px rgba(0,0,0,0.6)` + `backdrop-blur-xl` + `bg-ink/70`): Header only, after 40px scroll.

Hairlines (`border-line`, `border-line-strong`, `.hairline`, `.seam-glow`) do more structural work than drop shadows.

### Named Rules
**The Tonal-First Rule.** Surfaces are flat at rest. Raise and float appear on hover, invert, or a single emphasized plane. Never pair a 1px border with a ≥16px-blur decorative drop shadow on the same resting card.

**The Grain Rule.** Grain and vignette are page atmosphere (`body::after` / `body::before`). Do not add a second sketchy `feTurbulence` illustration layer on components.

## 5. Components

Full-pill for actions and tags. Rooms and fields stay 8–16px. Press feedback is `scale(0.97)` via `.press`. Magnetic hover is reserved for primary CTAs on fine pointers.

### Buttons
- **Shape:** Full pill (`border-radius: 9999px`). Never 24–40px “soft card” radii on buttons.
- **Primary:** Signal Red fill, CTA ivory text (`#f4ece9`), `px-7/8 py-4/5`, medium Geist or small tracked mono. Hover: Hot Signal + red bloom. Active: `.press` scale 0.97.
- **Ghost:** Transparent, `border-line-strong`, bone text. Hover: border goes Signal Red (nav CTA may fill red).
- **Focus:** Visible red outline (`outline-2 outline-offset-2 outline-red`) on form controls and choice chips. Do not remove focus.
- **Disabled / wait:** `opacity-70`, `cursor-wait` on submit.

### Chips
- **Style:** Hairline pill, transparent fill, Geist Mono ~11px, `bone-dim`.
- **State:** Hover/group-hover strengthens the line and may tint `ink-3`. Selected choice chips fill Signal Red with CTA ivory text.

### Cards / Containers
- **Corner Style:** Service stage is one 16px (`rounded-2xl`) frame with 1px gutters between cells. Inner cards have no extra rounding. Icon wells are 12px. Do not stack cards inside cards.
- **Background:** `--ink-2` quiet rooms; inverted sections use `.surface-invert`.
- **Shadow Strategy:** None at rest. Raise on fine-pointer hover only.
- **Border:** Shared `border-line` on the stage, `gap-px` as the divider. No side-stripe accents.
- **Internal Padding:** 32–40px (`p-8` / `md:p-10`).
- **Work runway:** Hairline rows, not a card grid. Active row tints with the project accent at ~3%.

### Inputs / Fields
- **Style:** Transparent field, 8px radius, `border-line-strong`, bone text, ash placeholder. Placeholder must keep contrast — do not fade it to decorative gray.
- **Focus:** Border becomes Signal Red. No glow ring beyond the outline on radios/choices.
- **Error / Disabled:** Wait state on the submit pill. Do not invent toast chrome that is not in the form.

### Navigation
- **Style:** Fixed top bar, `z-index` above content. Transparent until scroll > 40px, then `bg-ink/70`, hairline, blur, compressed padding.
- **Typography:** Geist Mono 11px, uppercase, tracking ~0.22em, `bone-dim` → `bone` on hover/active. Active item draws a Signal Red underline from the left.
- **CTA:** Small ghost pill; hover fills Signal Red.
- **Mobile:** Two-line bone mark that rotates into an X. Wordmark can collapse on scroll.
- **Progress:** 1px Signal Red scaleX bar on the header’s bottom edge.

### Section Opener
Large Fraunces multi-line statement. Replaces numbered eyebrows. Copy owns the line breaks.

### Case Study Dialog
Native `<dialog>`. Text-first: problem, workflow, facts, optional Mermaid. No media slots. Trigger is a small Signal Red pill in tracked mono.

### Inverted Room
`.surface-invert` on a section (Contact) flips the entire token set to the opposite theme. Children keep `bg-ink` / `text-bone` / `border-line` utilities. Red stays the mark.

## 6. Do's and Don'ts

### Do:
- **Do** treat red as a place: one inverted or oxblood room, then return to the quiet ivory room.
- **Do** open sections with a Fraunces `SectionOpener`, not a tracked eyebrow.
- **Do** show proof (product footage, case-study workflow, proof chips) instead of mockup theater.
- **Do** keep body text at `bone` / `bone-dim` contrast (≥4.5:1). If a caption is close, darken toward bone.
- **Do** use full-pill actions and 8–16px rooms. Press at 0.97. Expo / soft easings only.
- **Do** ship a `prefers-reduced-motion` path for every animation (instant or crossfade, no clip-gated blank states).
- **Do** keep display tracking at −0.02em (floor −0.04em). Balance headings; pretty-wrap long prose.

### Don't:
- **Don't** use generic SaaS boilerplate (cream/sand/biscuit backgrounds).
- **Don't** ship vaporware marketing or playful/sketchy illustrations (`feTurbulence` doodles, loose-sketch SVGs).
- **Don't** use “insanely rounded” (32px+) card UI.
- **Don't** use generic 01/02/03 scaffolding unless the section is an actual sequence. Indexes may watermark a service cell; they must not become the site’s section grammar.
- **Don't** use side-stripe borders (`border-left` / `border-right` > 1px) as a colored accent.
- **Don't** use gradient text (`background-clip: text`).
- **Don't** default to glassmorphism. Header blur after scroll is the one purposeful exception.
- **Don't** ship identical icon+heading+text card grids as the page system. Services share a stage; work is a runway.
- **Don't** pair a 1px border with a wide soft drop shadow on the same resting element.
- **Don't** put theme `bone` on a Signal Red button — use CTA ivory `#f4ece9`.
- **Don't** gate content visibility on a reveal class. Reveals enhance an already-visible default.
