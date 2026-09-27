import { useEffect, useRef, type ReactNode } from "react";
import { useLocation } from "react-router";
import type LenisType from "lenis";
import { shouldUseSmoothScroll } from "~/utils/perfFlags";

/**
 * Lenis smooth-scroll bridged into GSAP’s ticker so ScrollTrigger stays in sync.
 * Enabled only on desktop-class, fine-pointer devices that don't prefer reduced
 * motion — coarse/touch devices keep their snappy native scrolling. Anchor
 * smooth-scroll still works through a lightweight native fallback when Lenis is
 * disabled.
 *
 * Lenis and GSAP are imported dynamically so that devices which don't use smooth
 * scroll never download those libraries in the initial bundle.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisType | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const enabled = shouldUseSmoothScroll({
      finePointer,
      reducedMotion: reduce,
      viewportWidth: window.innerWidth,
    });

    // Anchor links → smooth scroll. Uses Lenis when available, otherwise a
    // native smooth scrollIntoView so in-page links still glide.
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!target) return;
      const id = target.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      // Clear the fixed header so the target heading isn't hidden under it.
      const HEADER_OFFSET = 96;
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el as HTMLElement, {
          offset: -HEADER_OFFSET,
          duration: 1.4,
        });
      } else {
        const top =
          (el as HTMLElement).getBoundingClientRect().top +
          window.scrollY -
          HEADER_OFFSET;
        window.scrollTo({
          top,
          behavior: reduce ? "auto" : "smooth",
        });
      }
    };

    document.addEventListener("click", onClick);

    if (!enabled) {
      return () => document.removeEventListener("click", onClick);
    }

    // Loaded lazily; tracked so we can clean up even if the effect unmounts
    // before the dynamic import resolves.
    let cancelled = false;
    let cleanupLenis: (() => void) | null = null;

    Promise.all([
      import("lenis"),
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([{ default: Lenis }, { gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5,
      });
      lenisRef.current = lenis;

      lenis.on("scroll", ScrollTrigger.update);

      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      cleanupLenis = () => {
        gsap.ticker.remove(raf);
        lenis.destroy();
        lenisRef.current = null;
      };
    });

    return () => {
      cancelled = true;
      document.removeEventListener("click", onClick);
      cleanupLenis?.();
    };
  }, []);

  return <>{children}</>;
}
