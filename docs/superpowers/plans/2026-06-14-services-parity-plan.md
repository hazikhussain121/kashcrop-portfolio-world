# Services Page Parity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring the services page up to the same interaction and proof quality as the homepage by reusing existing homepage components and patterns instead of rebuilding weaker one-off versions.

**Architecture:** Keep the current React Router route structure, but stop treating `app/routes/services.tsx` as a bespoke page. Reuse the homepage's strongest primitives directly: `Contact` for the closing CTA, `SectionOpener` for authored headings, and `ProjectStage` plus project data for the proof surfaces so the services page inherits the same motion, visual weight, and proof language.

**Tech Stack:** React 19, React Router 7, TypeScript, Tailwind CSS v4, GSAP, Vitest

---

## File Structure

**Create:**
- `app/components/ServiceProofRail.tsx`
  Renders rich proof rows for service details, resolving project-backed items into linked proof blocks that can reuse `ProjectStage`.

**Modify:**
- `app/routes/services.tsx`
  Replaces one-off CTA and proof markup with homepage-grade reuse (`SectionOpener`, `Contact`, `ServiceProofRail`).
- `app/routes/services.test.ts`
  Locks the route to the homepage reuse contract so drift is caught in future edits.

---

### Task 1: Lock The Reuse Contract With A Failing Test

**Files:**
- Modify: `app/routes/services.test.ts`
- Test: `app/routes/services.test.ts`

- [ ] **Step 1: Add a failing test for homepage-grade reuse**

Extend the existing source-contract test so it asserts the services route now reuses the homepage closing section and proof surface instead of bespoke placeholders:

```ts
expect(source).toContain('import { Contact } from "~/components/Contact"');
expect(source).toContain('import { SectionOpener } from "~/components/Studio"');
expect(source).toContain('import { ServiceProofRail } from "~/components/ServiceProofRail"');
expect(source).toContain("<Contact />");
expect(source).toContain("<SectionOpener");
expect(source).toContain("<ServiceProofRail");
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- app/routes/services.test.ts`

Expected: FAIL because the services route still contains bespoke CTA/proof markup and does not import the shared components yet.

- [ ] **Step 3: Commit the red test only after the rest of the task is complete**

Do not commit yet; continue into implementation.

---

### Task 2: Replace The Services Footer CTA With The Homepage Contact Section

**Files:**
- Modify: `app/routes/services.tsx`
- Test: `app/routes/services.test.ts`

- [ ] **Step 1: Import the shared homepage contact section**

Add the import below the existing footer/nav imports:

```tsx
import { Contact } from "~/components/Contact";
```

- [ ] **Step 2: Remove the bespoke services CTA block and render the shared closing section**

Replace the current route-local CTA section:

```tsx
        {/* CTA */}
        <section className="mx-auto max-w-[1600px] px-6 pb-32 md:px-12 md:pb-44">
          ...
        </section>
```

with:

```tsx
        <Contact />
```

This reuses the homepage’s stronger conversion zone, alternate contact paths, and motion/interaction polish instead of maintaining a weaker duplicate.

- [ ] **Step 3: Keep only cue handlers still needed by the route**

After removing the bespoke CTA block, delete any no-longer-used route-local confirmation handler.

Expected final top-of-file cleanup:

```tsx
const cue = useCueHandlers();
```

and no unused `confirm` variable.

---

### Task 3: Replace Proof Chips With Homepage-Grade Proof Rows

**Files:**
- Create: `app/components/ServiceProofRail.tsx`
- Modify: `app/routes/services.tsx`
- Test: `app/routes/services.test.ts`

- [ ] **Step 1: Create the failing interface by using a new proof component from the route**

Update the route so the proof block uses a shared component:

```tsx
<ServiceProofRail items={detail?.proofDetails} />
```

This should fail until the component exists.

- [ ] **Step 2: Create `app/components/ServiceProofRail.tsx` with minimal typed implementation**

Start with this structure:

```tsx
import { Link } from "react-router";
import { getProjectBySlug } from "~/data/content";
import { ProjectStage } from "./ProjectStage";
import { IconArrowUpRight } from "./icons";

type ProofItem = {
  name: string;
  description: string;
  projectSlug?: string;
};

export function ServiceProofRail({ items = [] }: { items?: ProofItem[] }) {
  return (
    <div className="mt-6 border-t border-line">
      {items.map((item) => {
        const project = item.projectSlug ? getProjectBySlug(item.projectSlug) : undefined;

        return (
          <article
            key={`${item.projectSlug ?? item.name}`}
            className="grid gap-6 border-b border-line py-8 md:grid-cols-[minmax(0,1fr)_20rem] md:items-center"
          >
            <div>
              <div className="flex items-center gap-3">
                {project ? (
                  <Link
                    to={`/projects/${project.slug}`}
                    className="group inline-flex items-center gap-2 font-display text-2xl text-bone transition-colors hover:text-red md:text-3xl"
                  >
                    {item.name}
                    <IconArrowUpRight className="h-4 w-4 text-red transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                ) : (
                  <h5 className="font-display text-2xl text-bone md:text-3xl">{item.name}</h5>
                )}
              </div>
              <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-bone-dim md:text-base">
                {item.description}
              </p>
            </div>

            {project ? (
              <div className="mx-auto w-full max-w-[20rem]" data-reveal>
                <ProjectStage project={project} />
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 3: Replace the old proof chips in `app/routes/services.tsx`**

Remove the current chip list:

```tsx
<div className="mt-6 flex flex-wrap gap-2">
  ...
</div>
```

and replace it with:

```tsx
<ServiceProofRail items={detail?.proofDetails} />
```

- [ ] **Step 4: Keep the heading and spacing aligned with the homepage proof language**

Keep the editorial heading but let the new component carry the proof weight:

```tsx
<div className="mt-12 border-t border-line-strong pt-12">
  <h4 className="font-mono text-[11px] uppercase tracking-[0.25em] text-ash">
    Proof & Projects
  </h4>
  <ServiceProofRail items={detail?.proofDetails} />
</div>
```

---

### Task 4: Replace The Generic Services Page Header With The Shared Section Opener

**Files:**
- Modify: `app/routes/services.tsx`
- Test: `app/routes/services.test.ts`

- [ ] **Step 1: Import the shared opener**

Add:

```tsx
import { SectionOpener } from "~/components/Studio";
```

- [ ] **Step 2: Replace the route-local H1 block with the shared opener**

Replace:

```tsx
<h1 data-reveal-lines className="font-display text-6xl text-bone md:text-8xl">...</h1>
```

with:

```tsx
<SectionOpener className="max-w-[12ch] text-6xl md:text-8xl lg:text-8xl">
  {"Services."}
</SectionOpener>
```

This keeps authored reveal behavior consistent with the homepage’s section language.

- [ ] **Step 3: Leave the supporting intro paragraph in place**

Do not add more copy. The route already has the right intro content in `servicesPage.intro`.

---

### Task 5: Verify The Parity Pass

**Files:**
- Test: `app/routes/services.test.ts`
- Test: `npm test`

- [ ] **Step 1: Run the focused services parity test**

Run: `npm test -- app/routes/services.test.ts`

Expected: PASS, confirming the route imports and uses the shared homepage-grade pieces.

- [ ] **Step 2: Run the full test suite**

Run: `npm test`

Expected: PASS with all Vitest files green and no regressions in magnetic or route tests.

- [ ] **Step 3: Commit**

```bash
git add app/components/ServiceProofRail.tsx app/routes/services.tsx app/routes/services.test.ts docs/superpowers/plans/2026-06-14-services-parity-plan.md
git commit -m "feat: reuse homepage patterns on services page"
```
