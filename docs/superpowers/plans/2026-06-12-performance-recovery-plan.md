# Portfolio Performance Recovery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve runtime performance across interaction, scroll, and paint-heavy layers without materially downgrading the portfolio's visual identity.

**Architecture:** Keep the current single-page React Router structure and visual language, but move hot-path calculations into small pure helpers, gate heavier effects by device capability, and replace per-event tween creation with cached setters and requestAnimationFrame batching. Preserve the premium editorial feel by trimming expensive work first, not by removing the whole design system.

**Tech Stack:** React 19, React Router 7, TypeScript, Vite 6, Tailwind CSS v4, GSAP, Lenis, Vitest, Testing Library

---

## File Structure

**Create:**
- `app/test/setup.ts`
  Vitest setup for DOM assertions.
- `app/utils/perfFlags.ts`
  Central capability gates for smooth scroll, parallax, and heavy pointer effects.
- `app/utils/perfFlags.test.ts`
  Regression tests for capability gating.
- `app/utils/magnetic.ts`
  Pure math for magnetic offsets and intent-trigger thresholds.
- `app/utils/magnetic.test.ts`
  Regression tests for magnetic motion math.
- `app/utils/cursor.ts`
  Pure cursor target classification and scale rules.
- `app/utils/cursor.test.ts`
  Regression tests for cursor target handling.
- `app/utils/navScroll.ts`
  Pure nav scroll-state derivation.
- `app/utils/navScroll.test.ts`
  Regression tests for nav scroll-state transitions.

**Modify:**
- `package.json`
  Add test dependencies and scripts.
- `vite.config.ts`
  Add Vitest configuration.
- `app/components/Magnetic.tsx`
  Replace per-mousemove tween creation with cached geometry and quick setters.
- `app/components/Cursor.tsx`
  Batch pointer updates with requestAnimationFrame and gate the feature more aggressively.
- `app/components/Hero.tsx`
  Add `data-cursor="cta"` to the primary CTA.
- `app/components/Nav.tsx`
  Add `data-cursor="cta"` to the main project CTA and rAF-throttle the scroll state updates.
- `app/components/Contact.tsx`
  Add `data-cursor="cta"` to the main contact CTA.
- `app/components/SmoothScroll.tsx`
  Disable Lenis on coarse and smaller devices while keeping it for desktop-class pointers.
- `app/hooks/useScrollAnimations.ts`
  Reduce live scroll pressure by limiting parallax and using one-shot triggers where appropriate.
- `app/app.css`
  Lower fixed-overlay paint cost while keeping the atmospheric look.

**Verification:**
- `npm run test -- app/utils/perfFlags.test.ts`
- `npm run test -- app/utils/magnetic.test.ts`
- `npm run test -- app/utils/cursor.test.ts`
- `npm run test -- app/utils/navScroll.test.ts`
- `npm run test`
- `npm run typecheck`
- `npm run build`

---

### Task 1: Add a Lightweight Perf Test Harness and Shared Capability Gates

**Files:**
- Modify: `package.json`
- Modify: `vite.config.ts`
- Create: `app/test/setup.ts`
- Create: `app/utils/perfFlags.ts`
- Test: `app/utils/perfFlags.test.ts`

- [ ] **Step 1: Add the test runner and scripts**

Update `package.json` so the repo can run fast unit tests for pure performance helpers:

```json
{
  "scripts": {
    "build": "react-router build",
    "dev": "react-router dev",
    "start": "react-router-serve ./build/server/index.js",
    "test": "vitest run",
    "test:watch": "vitest",
    "typecheck": "react-router typegen && tsc"
  },
  "devDependencies": {
    "@react-router/dev": "^7.1.1",
    "@tailwindcss/vite": "^4.0.0",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.1.0",
    "@types/node": "^22.10.2",
    "@types/react": "^19.0.1",
    "@types/react-dom": "^19.0.1",
    "jsdom": "^25.0.1",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.7.2",
    "vite": "^6.0.0",
    "vite-tsconfig-paths": "^5.1.4",
    "vitest": "^2.1.8"
  }
}
```

Then install them:

```bash
npm install
```

- [ ] **Step 2: Add the Vitest config and DOM setup**

Update `vite.config.ts`:

```ts
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./app/test/setup.ts"],
  },
});
```

Create `app/test/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 3: Write the failing test for shared capability gates**

Create `app/utils/perfFlags.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import {
  shouldUseHeavyPointerEffects,
  shouldUseParallax,
  shouldUseSmoothScroll,
} from "./perfFlags";

describe("perfFlags", () => {
  it("enables heavy pointer effects only on desktop-class fine pointers", () => {
    expect(
      shouldUseHeavyPointerEffects({
        finePointer: true,
        reducedMotion: false,
        viewportWidth: 1440,
      })
    ).toBe(true);

    expect(
      shouldUseHeavyPointerEffects({
        finePointer: false,
        reducedMotion: false,
        viewportWidth: 1440,
      })
    ).toBe(false);
  });

  it("disables smooth scroll when reduced motion is preferred", () => {
    expect(
      shouldUseSmoothScroll({
        finePointer: true,
        reducedMotion: true,
        viewportWidth: 1440,
      })
    ).toBe(false);
  });

  it("requires a larger viewport before parallax is allowed", () => {
    expect(
      shouldUseParallax({
        finePointer: true,
        reducedMotion: false,
        viewportWidth: 1366,
      })
    ).toBe(true);

    expect(
      shouldUseParallax({
        finePointer: true,
        reducedMotion: false,
        viewportWidth: 900,
      })
    ).toBe(false);
  });
});
```

- [ ] **Step 4: Run the test to verify it fails**

Run: `npm run test -- app/utils/perfFlags.test.ts`

Expected: FAIL because `app/utils/perfFlags.ts` does not exist yet.

- [ ] **Step 5: Write the minimal implementation**

Create `app/utils/perfFlags.ts`:

```ts
type PerfInput = {
  finePointer: boolean;
  reducedMotion: boolean;
  viewportWidth: number;
};

export function shouldUseHeavyPointerEffects({
  finePointer,
  reducedMotion,
  viewportWidth,
}: PerfInput): boolean {
  return finePointer && !reducedMotion && viewportWidth >= 1024;
}

export function shouldUseSmoothScroll({
  finePointer,
  reducedMotion,
  viewportWidth,
}: PerfInput): boolean {
  return finePointer && !reducedMotion && viewportWidth >= 900;
}

export function shouldUseParallax({
  finePointer,
  reducedMotion,
  viewportWidth,
}: PerfInput): boolean {
  return finePointer && !reducedMotion && viewportWidth >= 1200;
}
```

- [ ] **Step 6: Run the test to verify it passes**

Run: `npm run test -- app/utils/perfFlags.test.ts`

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vite.config.ts app/test/setup.ts app/utils/perfFlags.ts app/utils/perfFlags.test.ts
git commit -m "test: add perf capability gates"
```

---

### Task 2: Remove the Magnetic Per-Mousemove Tween Flood

**Files:**
- Create: `app/utils/magnetic.ts`
- Test: `app/utils/magnetic.test.ts`
- Modify: `app/components/Magnetic.tsx`

- [ ] **Step 1: Write the failing test for magnetic math**

Create `app/utils/magnetic.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import {
  computeMagneticTransform,
  shouldFireIntentPulse,
} from "./magnetic";

describe("magnetic helpers", () => {
  it("computes the translated offset from a cached rect", () => {
    const result = computeMagneticTransform(
      { left: 100, top: 200, width: 200, height: 100 },
      250,
      240,
      0.4
    );

    expect(result.x).toBe(20);
    expect(result.y).toBe(-4);
  });

  it("fires intent only on the first entry inside the threshold", () => {
    expect(shouldFireIntentPulse(false, 18, 40)).toBe(true);
    expect(shouldFireIntentPulse(true, 18, 40)).toBe(false);
    expect(shouldFireIntentPulse(false, 60, 40)).toBe(false);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- app/utils/magnetic.test.ts`

Expected: FAIL because `app/utils/magnetic.ts` does not exist yet.

- [ ] **Step 3: Write the minimal implementation**

Create `app/utils/magnetic.ts`:

```ts
type RectLike = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export function computeMagneticTransform(
  rect: RectLike,
  clientX: number,
  clientY: number,
  strength: number
) {
  const dx = clientX - (rect.left + rect.width / 2);
  const dy = clientY - (rect.top + rect.height / 2);

  return {
    x: dx * strength,
    y: dy * strength,
    distance: Math.hypot(dx, dy),
    threshold: Math.max(rect.width, rect.height) * 0.3,
  };
}

export function shouldFireIntentPulse(
  engaged: boolean,
  distance: number,
  threshold: number
): boolean {
  return !engaged && distance < threshold;
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm run test -- app/utils/magnetic.test.ts`

Expected: PASS.

- [ ] **Step 5: Replace per-event tweens with cached setters in `app/components/Magnetic.tsx`**

Update the component so it caches the element rect on pointer enter and uses `gsap.quickTo` setters instead of calling `gsap.to` on every `mousemove`:

```tsx
import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { audioManager } from "~/audio/AudioManager";
import {
  computeMagneticTransform,
  shouldFireIntentPulse,
} from "~/utils/magnetic";

export function Magnetic({ children, strength = 0.4, className }: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const engaged = useRef(false);
  const rectRef = useRef<DOMRect | null>(null);
  const xTo = useRef<((value: number) => void) | null>(null);
  const yTo = useRef<((value: number) => void) | null>(null);

  const ensureSetters = () => {
    const el = ref.current;
    if (!el || (xTo.current && yTo.current)) return;
    xTo.current = gsap.quickTo(el, "x", { duration: 0.24, ease: "power3.out" });
    yTo.current = gsap.quickTo(el, "y", { duration: 0.24, ease: "power3.out" });
  };

  const onPointerEnter = () => {
    if (!ref.current) return;
    ensureSetters();
    rectRef.current = ref.current.getBoundingClientRect();
  };

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = rectRef.current;
    if (!rect) return;

    const next = computeMagneticTransform(rect, e.clientX, e.clientY, strength);
    xTo.current?.(next.x);
    yTo.current?.(next.y);

    if (shouldFireIntentPulse(engaged.current, next.distance, next.threshold)) {
      engaged.current = true;
      audioManager.play("intent");
    }
  };

  const onMouseLeave = () => {
    engaged.current = false;
    rectRef.current = null;
    xTo.current?.(0);
    yTo.current?.(0);
  };

  return (
    <div
      ref={ref}
      onPointerEnter={onPointerEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      style={{ display: "inline-block" }}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 6: Run focused and full verification**

Run:

```bash
npm run test -- app/utils/magnetic.test.ts
npm run typecheck
```

Expected: both commands pass.

- [ ] **Step 7: Commit**

```bash
git add app/utils/magnetic.ts app/utils/magnetic.test.ts app/components/Magnetic.tsx
git commit -m "perf: optimize magnetic pointer handling"
```

---

### Task 3: Keep the Custom Cursor, but Make It Cheaper and Smarter

**Files:**
- Create: `app/utils/cursor.ts`
- Test: `app/utils/cursor.test.ts`
- Modify: `app/components/Cursor.tsx`
- Modify: `app/components/Hero.tsx`
- Modify: `app/components/Nav.tsx`
- Modify: `app/components/Contact.tsx`

- [ ] **Step 1: Write the failing test for cursor target classification**

Create `app/utils/cursor.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { getCursorScale, getCursorTargetKind } from "./cursor";

describe("cursor helpers", () => {
  it("prioritizes CTA targets over generic interactive elements", () => {
    const target = {
      closest: (selector: string) =>
        selector === '[data-cursor="cta"]' ? ({}) : null,
    } as Pick<HTMLElement, "closest">;

    expect(getCursorTargetKind(target)).toBe("cta");
  });

  it("uses a larger cursor scale for CTA targets", () => {
    expect(getCursorScale("cta")).toBe(2.7);
    expect(getCursorScale("interactive")).toBe(2.2);
    expect(getCursorScale("none")).toBe(1);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- app/utils/cursor.test.ts`

Expected: FAIL because `app/utils/cursor.ts` does not exist yet.

- [ ] **Step 3: Write the minimal implementation**

Create `app/utils/cursor.ts`:

```ts
export type CursorTargetKind = "none" | "interactive" | "cta";

export function getCursorTargetKind(
  target: Pick<HTMLElement, "closest"> | null
): CursorTargetKind {
  if (!target) return "none";
  if (target.closest('[data-cursor="cta"]')) return "cta";
  if (target.closest("a, button, [data-cursor]")) return "interactive";
  return "none";
}

export function getCursorScale(kind: CursorTargetKind): number {
  if (kind === "cta") return 2.7;
  if (kind === "interactive") return 2.2;
  return 1;
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm run test -- app/utils/cursor.test.ts`

Expected: PASS.

- [ ] **Step 5: Batch pointer updates with requestAnimationFrame and gate the cursor by capability**

Update `app/components/Cursor.tsx` so mouse events only update refs immediately and the actual motion work happens once per animation frame:

```tsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { getCursorScale, getCursorTargetKind } from "~/utils/cursor";
import { shouldUseHeavyPointerEffects } from "~/utils/perfFlags";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const enabled = shouldUseHeavyPointerEffects({
      finePointer,
      reducedMotion,
      viewportWidth: window.innerWidth,
    });

    if (!enabled) return;

    const d = dot.current!;
    const r = ring.current!;
    const xTo = gsap.quickTo(r, "x", { duration: 0.42, ease: "expo.out" });
    const yTo = gsap.quickTo(r, "y", { duration: 0.42, ease: "expo.out" });
    const dxTo = gsap.quickTo(d, "x", { duration: 0.12, ease: "power3.out" });
    const dyTo = gsap.quickTo(d, "y", { duration: 0.12, ease: "power3.out" });

    let activeKind = "none" as const;
    let rafId = 0;
    let latestX = -100;
    let latestY = -100;

    const flush = () => {
      rafId = 0;
      xTo(latestX);
      yTo(latestY);
      dxTo(latestX);
      dyTo(latestY);
    };

    const move = (e: MouseEvent) => {
      latestX = e.clientX;
      latestY = e.clientY;
      if (!rafId) rafId = window.requestAnimationFrame(flush);
    };

    const over = (e: MouseEvent) => {
      const nextKind = getCursorTargetKind(e.target as HTMLElement | null);
      if (nextKind === activeKind) return;
      activeKind = nextKind;

      gsap.to(r, {
        scale: getCursorScale(nextKind),
        borderColor:
          nextKind === "none" ? "var(--bone)" : "rgba(225,15,28,0.9)",
        duration: 0.28,
        ease: "expo.out",
      });
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over);
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      if (rafId) window.cancelAnimationFrame(rafId);
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9998] hidden xl:block">
      <div
        ref={ring}
        className="absolute -ml-4 -mt-4 h-8 w-8 rounded-full border"
        style={{ transform: "translate(-100px,-100px)", borderColor: "var(--bone)", opacity: 0.4 }}
      />
      <div
        ref={dot}
        className="absolute -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-red"
        style={{ transform: "translate(-100px,-100px)" }}
      />
    </div>
  );
}
```

- [ ] **Step 6: Mark only the important CTAs as cursor-prominent**

Add `data-cursor="cta"` to the main project CTA in each component:

```tsx
<a
  href="#work"
  data-cursor="cta"
  className="press group inline-flex items-center gap-3 rounded-full bg-red px-7 py-4 text-sm font-medium text-[#f4ece9] hover:bg-red-bright"
>
```

```tsx
<a
  href="#contact"
  data-cursor="cta"
  onPointerEnter={cue.onPointerEnter}
  onClick={cue.onClick}
  className="press inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-bone hover:border-red hover:bg-red"
>
```

```tsx
<a
  href={`mailto:${contact.email}`}
  data-cursor="cta"
  onPointerEnter={confirm.onPointerEnter}
  onClick={confirm.onClick}
  className="press group inline-flex items-center gap-3 rounded-full bg-red px-8 py-5 text-base font-medium text-[#f4ece9] hover:bg-red-bright"
>
```

- [ ] **Step 7: Run focused and full verification**

Run:

```bash
npm run test -- app/utils/cursor.test.ts
npm run typecheck
```

Expected: both commands pass.

- [ ] **Step 8: Commit**

```bash
git add app/utils/cursor.ts app/utils/cursor.test.ts app/components/Cursor.tsx app/components/Hero.tsx app/components/Nav.tsx app/components/Contact.tsx
git commit -m "perf: trim cursor overhead while keeping CTA emphasis"
```

---

### Task 4: Cut Scroll-Linked Work Without Flattening the Experience

**Files:**
- Create: `app/utils/navScroll.ts`
- Test: `app/utils/navScroll.test.ts`
- Modify: `app/components/Nav.tsx`
- Modify: `app/components/SmoothScroll.tsx`
- Modify: `app/hooks/useScrollAnimations.ts`

- [ ] **Step 1: Write the failing test for nav scroll-state derivation**

Create `app/utils/navScroll.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { deriveNavScrollState } from "./navScroll";

describe("deriveNavScrollState", () => {
  it("marks the nav as scrolled after the top threshold", () => {
    expect(deriveNavScrollState(80, 20)).toEqual({
      scrolled: true,
      hidden: false,
      lastY: 80,
    });
  });

  it("hides the nav only when the user is deep enough and moving downward", () => {
    expect(deriveNavScrollState(220, 160)).toEqual({
      scrolled: true,
      hidden: true,
      lastY: 220,
    });
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- app/utils/navScroll.test.ts`

Expected: FAIL because `app/utils/navScroll.ts` does not exist yet.

- [ ] **Step 3: Write the minimal implementation**

Create `app/utils/navScroll.ts`:

```ts
export function deriveNavScrollState(y: number, lastY: number) {
  return {
    scrolled: y > 40,
    hidden: y > 160 && y > lastY,
    lastY: y,
  };
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm run test -- app/utils/navScroll.test.ts`

Expected: PASS.

- [ ] **Step 5: rAF-throttle the nav scroll updates**

Update `app/components/Nav.tsx` so scrolling does not call `setState` on every raw scroll event:

```tsx
import { useEffect, useRef, useState } from "react";
import { deriveNavScrollState } from "~/utils/navScroll";

const [scrolled, setScrolled] = useState(false);
const [hidden, setHidden] = useState(false);
const scrolledRef = useRef(scrolled);
const hiddenRef = useRef(hidden);

useEffect(() => {
  scrolledRef.current = scrolled;
}, [scrolled]);

useEffect(() => {
  hiddenRef.current = hidden;
}, [hidden]);

useEffect(() => {
  let lastY = window.scrollY;
  let frame = 0;

  const onScroll = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(() => {
      frame = 0;
      const next = deriveNavScrollState(window.scrollY, lastY);
      lastY = next.lastY;
      if (next.scrolled !== scrolledRef.current) setScrolled(next.scrolled);
      if (next.hidden !== hiddenRef.current) setHidden(next.hidden);
    });
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => {
    window.removeEventListener("scroll", onScroll);
    if (frame) window.cancelAnimationFrame(frame);
  };
}, []);
```

- [ ] **Step 6: Limit Lenis and live parallax to desktop-class devices**

Update `app/components/SmoothScroll.tsx`:

```tsx
import { shouldUseSmoothScroll } from "~/utils/perfFlags";

useEffect(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const enabled = shouldUseSmoothScroll({
    finePointer,
    reducedMotion: reduce,
    viewportWidth: window.innerWidth,
  });

  if (!enabled) return;

  const lenis = new Lenis({
    duration: 0.9,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1,
  });
```

Update `app/hooks/useScrollAnimations.ts` so only the most valuable motion stays live during scroll:

```tsx
import { shouldUseParallax } from "~/utils/perfFlags";

const finePointer = window.matchMedia("(pointer: fine)").matches;
const allowParallax = shouldUseParallax({
  finePointer,
  reducedMotion: reduce,
  viewportWidth: window.innerWidth,
});

gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
  const delay = parseFloat(el.dataset.revealDelay || "0");
  gsap.from(el, {
    y: 42,
    autoAlpha: 0,
    duration: 1.05,
    delay,
    ease: "expo.out",
    scrollTrigger: { trigger: el, start: "top 88%", once: true },
  });
});

if (allowParallax) {
  gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
    const factor = Math.min(parseFloat(el.dataset.parallax || "0.15"), 0.08);
    gsap.to(el, {
      yPercent: -factor * 100,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });
}
```

- [ ] **Step 7: Run focused and full verification**

Run:

```bash
npm run test -- app/utils/navScroll.test.ts
npm run typecheck
npm run build
```

Expected: all commands pass.

- [ ] **Step 8: Commit**

```bash
git add app/utils/navScroll.ts app/utils/navScroll.test.ts app/components/Nav.tsx app/components/SmoothScroll.tsx app/hooks/useScrollAnimations.ts
git commit -m "perf: reduce live scroll pressure"
```

---

### Task 5: Lower Full-Screen Paint Cost While Preserving the Atmosphere

**Files:**
- Modify: `app/app.css`
- Test: `npm run test`
- Test: `npm run typecheck`
- Test: `npm run build`

- [ ] **Step 1: Make the grain overlay cheaper on smaller devices**

Change `app/app.css` so the film-grain overlay is lighter by default and only uses the current full-strength treatment on large, fine-pointer viewports:

```css
:root,
[data-theme="light"] {
  --grain-opacity: 0.025;
  --grain-blend: normal;
}

[data-theme="dark"] {
  --grain-opacity: 0.03;
  --grain-blend: soft-light;
}

body::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  opacity: var(--grain-opacity);
  mix-blend-mode: var(--grain-blend);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

@media (min-width: 1024px) and (pointer: fine) {
  :root,
  [data-theme="light"] {
    --grain-opacity: 0.04;
    --grain-blend: multiply;
  }

  [data-theme="dark"] {
    --grain-opacity: 0.04;
    --grain-blend: overlay;
  }
}
```

- [ ] **Step 2: Ease the heaviest fixed/backdrop treatments slightly**

Keep the same visual hierarchy, but tone down the most expensive blur layers in class strings and shadows:

```tsx
className={`fixed inset-x-0 top-0 z-[9000] transition-[transform,background-color,border-color] duration-500 ${
  hidden && !open ? "-translate-y-full" : "translate-y-0"
} ${
  scrolled
    ? "border-b border-line bg-ink/75 backdrop-blur-md"
    : "border-b border-transparent"
}`}
```

And reduce the float shadow spread slightly in `app/app.css`:

```css
[data-theme="dark"] {
  --float: 0 1px 0 rgba(244,236,233,0.05) inset,
    0 28px 90px -38px rgba(0,0,0,0.78),
    0 0 56px -42px rgba(225,15,28,0.38);
}
```

- [ ] **Step 3: Run regression and production verification**

Run:

```bash
npm run test
npm run typecheck
npm run build
```

Expected: all commands pass.

- [ ] **Step 4: Commit**

```bash
git add app/app.css app/components/Nav.tsx
git commit -m "perf: reduce atmospheric paint cost"
```

---

## Final Verification Pass

- [ ] Run `npm run test`
- [ ] Run `npm run typecheck`
- [ ] Run `npm run build`
- [ ] Manual QA on desktop: confirm magnetic interactions still feel premium but smoother.
- [ ] Manual QA on mobile: confirm native scrolling feels snappier and no visuals break.
- [ ] Manual QA in Chrome Performance panel: verify fewer long frames during hover-heavy and scroll-heavy interaction.

## Spec Coverage Check

- Interaction polish preserved: covered by Tasks 2 and 3.
- Scroll spectacle preserved but trimmed: covered by Task 4.
- Atmospheric finish preserved with cheaper overlays: covered by Task 5.
- No unnecessary subsystem rewrite: respected. Existing components stay in place.

## Self-Review

- No placeholders remain.
- Every new helper has an explicit test file and command.
- Function names are consistent across tasks: `shouldUseHeavyPointerEffects`, `shouldUseSmoothScroll`, `shouldUseParallax`, `computeMagneticTransform`, `shouldFireIntentPulse`, `getCursorTargetKind`, `getCursorScale`, `deriveNavScrollState`.
- The plan addresses all identified bottlenecks: magnetic motion, cursor motion, smooth scroll, scroll triggers, nav scroll churn, and full-screen paint cost.
