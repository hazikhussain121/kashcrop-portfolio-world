import { useEffect, useState } from "react";
import { site } from "~/data/content";

const SEEN_KEY = "kc-preloaded";

/**
 * Intro curtain: word + counter, then a clip-reveal that lifts to expose the hero.
 *
 * Performance notes:
 * - The intro plays at most once per session; on repeat visits/navigations it
 *   is skipped so the hero becomes the LCP element immediately.
 * - GSAP is imported lazily inside the effect so the preloader doesn't pull the
 *   animation library into the initial bundle.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  // Hide the curtain immediately if we've already shown it this session or the
  // user prefers reduced motion. Computed lazily so SSR renders the curtain
  // (avoiding a flash) and the client hides it on mount when appropriate.
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      /* sessionStorage unavailable — fall through and play once */
    }

    if (reduce || alreadySeen) {
      setHidden(true);
      onDone();
      return;
    }

    document.documentElement.classList.add("lenis-stopped");
    document.body.style.overflow = "hidden";

    let cancelled = false;
    let kill: (() => void) | null = null;
    const finish = () => {
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* ignore */
      }
      document.documentElement.classList.remove("lenis-stopped");
      document.body.style.overflow = "";
      setHidden(true);
      onDone();
    };

    import("gsap").then(({ gsap }) => {
      if (cancelled) return;
      const obj = { v: 0 };
      const tl = gsap.timeline();

      tl.to(obj, {
        v: 100,
        duration: 1.1,
        ease: "power2.inOut",
        onUpdate: () => setCount(Math.round(obj.v)),
      })
        .to(".pl-word span", {
          yPercent: -120,
          duration: 0.8,
          ease: "expo.in",
          stagger: 0.04,
        })
        .to(
          ".pl-curtain",
          {
            yPercent: -100,
            duration: 1.1,
            ease: "expo.inOut",
            onComplete: finish,
          },
          "-=0.2"
        );

      kill = () => tl.kill();
    });

    return () => {
      cancelled = true;
      kill?.();
      document.documentElement.classList.remove("lenis-stopped");
      document.body.style.overflow = "";
    };
  }, [onDone]);

  if (hidden) return null;

  return (
    <div className="pl-curtain fixed inset-0 z-[10000] flex flex-col justify-between bg-ink px-5 py-[max(2rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))] md:px-12 md:py-10">
      <div className="flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.18em] text-bone-dim md:text-[11px] md:tracking-[0.3em]">
        <span className="min-w-0 truncate">{site.legalName}</span>
        <span className="shrink-0">{site.location}</span>
      </div>

      <div className="pl-word overflow-hidden">
        <h2 className="flex flex-wrap gap-x-4 text-[12vw] leading-none text-bone md:text-[8vw]">
          {"Building.".split("").map((c, i) => (
            <span key={i} className="inline-block">
              {c}
            </span>
          ))}
        </h2>
      </div>

      <div className="flex items-end justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ash">
          Loading studio
        </span>
        <span className="font-display text-6xl text-red md:text-8xl">
          {count}
        </span>
      </div>
    </div>
  );
}
