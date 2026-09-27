# KashCrop Portfolio Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Push the existing portfolio from already-premium to unmistakably top-tier by adding more atmosphere, better section choreography, richer project surfaces, and sharper interaction design without redesigning the site.

**Architecture:** Keep the current single-page React Router structure, the red-on-ink editorial palette, and the existing component boundaries. Concentrate changes in the current sections, global CSS tokens, and shared motion wiring so the site feels more authored and modern without introducing unnecessary abstractions.

**Tech Stack:** React 19, React Router 7, TypeScript, Tailwind CSS v4, GSAP, Lenis

---

## File Structure

**Modify:**
- `app/app.css`
  Adds stronger atmospheric utilities, surface treatments, section-transition helpers, motion tokens, and accessibility-safe fallbacks.
- `app/routes/home.tsx`
  Adds page-level ambient wrappers and optional transition separators while keeping the same page order.
- `app/data/content.ts`
  Adds only the extra content needed for polish, such as project notes, founder highlights, or section microcopy.
- `app/hooks/useScrollAnimations.ts`
  Extends the shared motion system for section progress, reveal variants, and richer but still controlled scroll choreography.
- `app/components/Nav.tsx`
  Improves active-state awareness, mobile-sheet feel, and nav feedback without changing the nav IA.
- `app/components/Hero.tsx`
  Deepens the hero through layered atmosphere, better CTA composition, and more premium motion targets.
- `app/components/Studio.tsx`
  Refines the section rhythm and makes the stats block feel more deliberate and less generic.
- `app/components/Services.tsx`
  Makes the services grid feel more authored through hierarchy, hover behavior, and supporting microcopy.
- `app/components/Work.tsx`
  Improves narrative pacing, desktop pinning feel, and project-detail presentation.
- `app/components/ProjectMock.tsx`
  Upgrades each mock from good placeholder to believable product surface.
- `app/components/Founder.tsx`
  Makes the founder block feel less like a placeholder and more like an intentional closing profile moment.
- `app/components/Contact.tsx`
  Gives the CTA zone more emotional weight and stronger conversion polish.
- `app/components/Footer.tsx`
  Tightens closing rhythm so the end of the page lands with purpose.
- `app/components/Preloader.tsx`
  Refines intro pacing so it feels expensive, not merely animated.
- `app/components/Cursor.tsx`
  Improves cursor behavior so it reacts more intentionally to the upgraded UI.

**No new subsystem is needed.** Keep this as an in-place enhancement pass inside the current component model.

---

### Task 1: Strengthen The Global Visual Foundation

**Files:**
- Modify: `app/app.css`
- Modify: `app/routes/home.tsx`
- Test: `npm run typecheck`
- Test: `npm run build`

- [ ] **Step 1: Add richer global tokens and utilities in `app/app.css`**

Add a second layer of polish tokens below the current theme block so sections can share the same atmosphere language:

```css
@theme {
  --color-ink-soft: #140d10;
  --color-bone-soft: #d8c8c3;
  --color-red-glow: rgba(225, 15, 28, 0.32);
  --color-ember-glow: rgba(255, 91, 58, 0.16);

  --shadow-panel: 0 20px 80px -28px rgba(0, 0, 0, 0.65);
  --shadow-accent: 0 24px 120px -32px rgba(225, 15, 28, 0.42);

  --section-pad-y: clamp(7rem, 10vw, 10rem);
  --section-gap: clamp(3rem, 6vw, 6rem);
}

@layer utilities {
  .section-shell {
    position: relative;
    isolation: isolate;
  }

  .section-veil {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(65% 55% at 75% 0%, var(--color-red-glow), transparent 60%),
      radial-gradient(40% 40% at 10% 100%, var(--color-ember-glow), transparent 60%);
    opacity: 0.55;
  }

  .surface-panel {
    background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0));
    box-shadow: var(--shadow-panel);
  }

  .section-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--color-line-strong), transparent);
  }
}
```

- [ ] **Step 2: Add a page-level atmospheric wrapper in `app/routes/home.tsx`**

Wrap the existing sections in a single page shell so section transitions inherit one visual system instead of each section fending for itself:

```tsx
export default function Home() {
  const [ready, setReady] = useState(false);
  useScrollAnimations();

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Nav />
      <main className={ready ? "relative" : "relative"}>
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(55%_45%_at_50%_0%,rgba(225,15,28,0.12),transparent_70%)]" />
        <Hero />
        <Marquee items={hero.marquee} />
        <Studio />
        <Services />
        <Work />
        <Founder />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Apply the new utilities selectively instead of globally**

Use the new classes only where they help, starting with section roots and high-value panels. The intent is depth, not visual clutter.

Example target edits:

```tsx
<section id="services" className="section-shell relative mx-auto max-w-[1600px] px-6 py-[var(--section-pad-y)] md:px-12">
  <div aria-hidden className="section-veil" />
```

```tsx
<div className="surface-panel mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line sm:grid-cols-3">
```

- [ ] **Step 4: Run type validation**

Run: `npm run typecheck`

Expected: Type generation completes and `tsc` exits successfully with no new errors.

- [ ] **Step 5: Run the production build**

Run: `npm run build`

Expected: React Router build completes successfully and outputs the server/client bundles with no CSS or TypeScript regressions.

- [ ] **Step 6: Commit**

```bash
git add app/app.css app/routes/home.tsx app/components/Studio.tsx app/components/Services.tsx
git commit -m "feat: deepen global portfolio atmosphere"
```

---

### Task 2: Upgrade Hero, Nav, And Top-Of-Page Choreography

**Files:**
- Modify: `app/components/Nav.tsx`
- Modify: `app/components/Hero.tsx`
- Modify: `app/components/Preloader.tsx`
- Modify: `app/components/Cursor.tsx`
- Modify: `app/hooks/useScrollAnimations.ts`
- Test: `npm run typecheck`
- Test: `npm run build`

- [ ] **Step 1: Give the nav an active-section signal instead of only hover states**

Keep the current nav content, but add section awareness with a lightweight `IntersectionObserver` inside `Nav.tsx`.

Add state and effect like this:

```tsx
const [activeHref, setActiveHref] = useState("#top");

useEffect(() => {
  const ids = ["top", "studio", "services", "work", "founder", "contact"];
  const sections = ids
    .map((id) => document.getElementById(id))
    .filter(Boolean) as HTMLElement[];

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible?.target.id) {
        setActiveHref(`#${visible.target.id}`);
      }
    },
    { rootMargin: "-30% 0px -45% 0px", threshold: [0.2, 0.4, 0.6] }
  );

  sections.forEach((section) => observer.observe(section));
  return () => observer.disconnect();
}, []);
```

Then apply the state to nav links:

```tsx
className={`group relative font-mono text-[11px] uppercase tracking-[0.22em] transition-colors ${
  activeHref === item.href ? "text-bone" : "text-bone-dim hover:text-bone"
}`}
```

- [ ] **Step 2: Make the hero bottom row feel more curated and less standard CTA/footer**

Reshape the footer row into two intentional columns: a compact editorial intro block and a stronger call-to-action cluster. Do not change the copy structure yet.

Target direction:

```tsx
<div className="grid gap-8 border-t border-line pt-8 md:grid-cols-12 md:items-end">
  <div className="md:col-span-7">
    <p data-reveal className="max-w-xl text-pretty text-base leading-relaxed text-bone-dim md:text-lg">
      {hero.intro}
    </p>
  </div>
  <div className="md:col-span-5 md:justify-self-end">
    <div className="surface-panel flex flex-col gap-4 rounded-[1.75rem] border border-line bg-ink-2/70 p-4 md:min-w-[22rem]">
      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ash">Currently taking on a small number of serious builds</span>
      <div className="flex flex-wrap items-center gap-3">
        {/* existing See the work CTA */}
        {/* existing The studio link */}
      </div>
    </div>
  </div>
</div>
```

- [ ] **Step 3: Refine the preloader and cursor so the top of the site feels more expensive**

Make two focused changes:

1. Slow the preloader counter slightly and let the curtain exit breathe.
2. Make the cursor react differently to primary CTAs than plain links.

Use snippets like:

```tsx
tl.to(obj, {
  v: 100,
  duration: 2.3,
  ease: "power2.inOut",
  onUpdate: () => setCount(Math.round(obj.v)),
})
```

```tsx
const interactive = t.closest("a, button, [data-cursor]");
const emphasized = t.closest("[data-cursor='strong']");

gsap.to(r, {
  scale: emphasized ? 3 : interactive ? 2.2 : 1,
  borderColor: emphasized ? "rgba(255,45,45,0.95)" : interactive ? "rgba(225,15,28,0.9)" : "rgba(244,236,233,0.4)",
  duration: 0.4,
  ease: "expo.out",
});
```

Mark the hero primary CTA with `data-cursor="strong"`.

- [ ] **Step 4: Extend shared animation wiring with one additional reveal variant**

Add support for a softer fade-only or scale-and-fade variant in `useScrollAnimations.ts` so later sections can avoid feeling mechanically identical.

Example:

```tsx
gsap.utils.toArray<HTMLElement>("[data-reveal-soft]").forEach((el) => {
  gsap.from(el, {
    autoAlpha: 0,
    scale: 0.985,
    duration: 1.1,
    ease: "expo.out",
    scrollTrigger: { trigger: el, start: "top 90%" },
  });
});
```

- [ ] **Step 5: Run type validation**

Run: `npm run typecheck`

Expected: PASS.

- [ ] **Step 6: Run the production build**

Run: `npm run build`

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add app/components/Nav.tsx app/components/Hero.tsx app/components/Preloader.tsx app/components/Cursor.tsx app/hooks/useScrollAnimations.ts
git commit -m "feat: refine portfolio top-of-page choreography"
```

---

### Task 3: Make The Mid-Page Sections Feel More Authored

**Files:**
- Modify: `app/data/content.ts`
- Modify: `app/components/Studio.tsx`
- Modify: `app/components/Services.tsx`
- Modify: `app/components/Founder.tsx`
- Modify: `app/components/Contact.tsx`
- Modify: `app/components/Footer.tsx`
- Test: `npm run typecheck`
- Test: `npm run build`

- [ ] **Step 1: Add only the content needed for stronger section support**

Extend `app/data/content.ts` minimally so components can render richer supporting detail without hardcoding UI strings.

Add fields like:

```ts
export const studio = {
  ...,
  microNote: "Strategy, systems, and field reality kept in the same conversation.",
};

export const founder = {
  ...,
  highlights: ["KashCrop", "Plant Health Clinic", "SKIIE", "Applied AI systems"],
};

export const contact = {
  ...,
  availability: "Selective availability for product, platform, and applied-AI work.",
};
```

- [ ] **Step 2: Improve Studio and Services hierarchy without redesigning their structure**

Use the new content to make the sections feel more intentional.

For `Studio.tsx`, add a small supporting note and give the stats row more contrast:

```tsx
<p data-reveal-soft className="mt-5 max-w-md font-mono text-[10px] uppercase tracking-[0.25em] text-ash">
  {studio.microNote}
</p>
```

```tsx
className="group relative bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))] p-8 transition-[background,transform] duration-500 hover:-translate-y-1 hover:bg-ink-3 md:p-10"
```

For `Services.tsx`, tighten hierarchy between title, description, and proof chips, and use `data-reveal-soft` on the grid so it enters differently from the hero copy.

- [ ] **Step 3: Make Founder and Contact feel like a deliberate closing sequence**

Use the founder highlights and contact availability copy to give the last two sections stronger emotional finish.

Example snippets:

```tsx
<ul className="mt-8 flex flex-wrap gap-2" data-stagger>
  {founder.highlights.map((item) => (
    <li key={item} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-bone-dim">
      {item}
    </li>
  ))}
</ul>
```

```tsx
<p className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-ash">
  {contact.availability}
</p>
```

Also replace the founder monogram plate from a pure placeholder look to a more designed surface using layered gradients, grid lines, and a better bottom caption bar.

- [ ] **Step 4: Tighten the footer so the page ends with less dead air**

Keep the content model, but add a final closing sentence and improve the top area contrast.

Target snippet:

```tsx
<p className="mt-5 max-w-sm text-sm leading-relaxed text-bone-dim">
  A {site.location}-based product studio building useful software across product, engineering, and applied AI.
</p>
<p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ash">
  Built for real users, shipped with care.
</p>
```

- [ ] **Step 5: Run type validation**

Run: `npm run typecheck`

Expected: PASS.

- [ ] **Step 6: Run the production build**

Run: `npm run build`

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add app/data/content.ts app/components/Studio.tsx app/components/Services.tsx app/components/Founder.tsx app/components/Contact.tsx app/components/Footer.tsx
git commit -m "feat: polish portfolio section rhythm"
```

---

### Task 4: Push The Work Showcase From Strong To Memorable

**Files:**
- Modify: `app/data/content.ts`
- Modify: `app/components/Work.tsx`
- Modify: `app/components/ProjectMock.tsx`
- Modify: `app/hooks/useScrollAnimations.ts`
- Test: `npm run typecheck`
- Test: `npm run build`

- [ ] **Step 1: Add richer project metadata for the work rows**

Extend each project with one short secondary descriptor and one result-oriented note.

Add fields like:

```ts
export type Project = {
  ...
  note: string;
  status: string;
};
```

Populate them directly in `projects`:

```ts
note: "Mobile-first orchard operations with multilingual utility built in.",
status: "Live product"
```

- [ ] **Step 2: Recompose the project copy block for better narrative pacing**

Use the new metadata to create a cleaner top block in `Work.tsx`.

Example:

```tsx
<div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ash">
  <span className="rounded-full border border-line px-3 py-1 text-bone-dim">{project.status}</span>
  <span>{project.kind}</span>
  <span className="text-red">{project.year}</span>
</div>

<p className="mt-4 max-w-xl text-sm leading-relaxed text-bone-soft">
  {project.note}
</p>
```

Also give the entire row a subtle reveal variant or section-progress class so the work area feels more cinematic than the rest of the page.

- [ ] **Step 3: Upgrade `ProjectMock.tsx` so each surface feels closer to a real product**

Keep the CSS/SVG approach, but add believable UI density and project-specific detail.

Examples:

For the phone mock:

```tsx
<div className="grid grid-cols-2 gap-2 px-4 pb-4">
  <div className="rounded-xl border border-line bg-ink-2 p-3">
    <Bar w="55%" c={accent} />
    <div className="mt-2"><Bar w="70%" /></div>
  </div>
  <div className="rounded-xl border border-line bg-ink-2 p-3">
    <Bar w="48%" />
    <div className="mt-2"><Bar w="62%" /></div>
  </div>
</div>
```

For the dashboard mock, add a table strip under the chart.

For the browser mock, add a nav band and one large featured panel so it stops reading as only a gallery skeleton.

- [ ] **Step 4: Add one work-specific motion refinement**

In `useScrollAnimations.ts`, add a desktop-only parallax nuance or opacity transition for project visuals so the work section gets a distinct signature.

Example:

```tsx
gsap.utils.toArray<HTMLElement>("[data-project-visual]").forEach((el) => {
  gsap.fromTo(
    el,
    { autoAlpha: 0.55, y: 36 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 1.1,
      ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 78%" },
    }
  );
});
```

Apply `data-project-visual` to the visual wrapper in `Work.tsx`.

- [ ] **Step 5: Run type validation**

Run: `npm run typecheck`

Expected: PASS.

- [ ] **Step 6: Run the production build**

Run: `npm run build`

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add app/data/content.ts app/components/Work.tsx app/components/ProjectMock.tsx app/hooks/useScrollAnimations.ts
git commit -m "feat: elevate project showcase presentation"
```

---

### Task 5: Final Hardening, Responsive QA, And Finish Pass

**Files:**
- Modify: any of the files above only if QA finds issues
- Test: `npm run typecheck`
- Test: `npm run build`
- Test: local manual QA in browser

- [ ] **Step 1: Start the local dev server for visual QA**

Run: `npm run dev`

Expected: Local development server starts and prints a localhost URL.

- [ ] **Step 2: Manually verify the upgraded experience at the key viewport bands**

Check these viewport widths in the browser:

1. `390x844`
2. `768x1024`
3. `1440x900`

Confirm all of the following:

```text
- Nav remains legible and mobile sheet opens/closes cleanly
- Hero headline, CTA panel, and scroll cue do not collide
- Studio stats and Services cards preserve rhythm without cramped padding
- Work visuals remain premium and not oversized on mobile
- Founder and Contact sections feel intentional, not like leftovers
- Footer closes tightly with no awkward empty band
```

- [ ] **Step 3: Fix only the issues found during QA**

Keep fixes scoped. Typical acceptable polish fixes:

```text
- Adjust a clamp() value
- Reduce a blur or glow opacity
- Tune a grid breakpoint or sticky offset
- Shorten a motion duration on mobile
- Tighten section spacing where the page feels loose
```

- [ ] **Step 4: Run final validation**

Run: `npm run typecheck`

Expected: PASS.

Run: `npm run build`

Expected: PASS.

- [ ] **Step 5: Commit the finish pass**

```bash
git add app/app.css app/routes/home.tsx app/data/content.ts app/hooks/useScrollAnimations.ts app/components/*.tsx
git commit -m "feat: finalize premium portfolio polish"
```

---

## Self-Review

**Spec coverage:** This plan covers the exact requested direction: no redesign, no new subsystem, and a stronger build on top of the current design through atmosphere, section transitions, work showcase quality, and interaction polish.

**Placeholder scan:** No `TODO`, `TBD`, or deferred implementation markers were left in the plan. Every task contains exact file targets, commands, and concrete code direction.

**Type consistency:** New proposed names are consistent across tasks: `activeHref`, `data-reveal-soft`, `data-project-visual`, `microNote`, `highlights`, `availability`, `note`, and `status`.
