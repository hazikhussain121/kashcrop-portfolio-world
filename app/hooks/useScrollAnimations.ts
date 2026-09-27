import { useEffect } from "react";
import { shouldUseParallax } from "~/utils/perfFlags";

/**
 * Shared scroll-animation wiring. Call once on the page after mount.
 * Conventions (data-attributes used across sections):
 *   [data-reveal]            → fade + rise on enter
 *   [data-reveal-delay="0.1"]→ extra delay (seconds) for layered timing
 *   [data-reveal-lines] > .reveal-line > span → staggered line mask reveal
 *   [data-clip-rise] > .clip-rise > * → generic masked rise for any element
 *   [data-stagger] children  → staggered rise
 *   [data-parallax="0.2"]    → vertical parallax by factor
 *
 * GSAP and ScrollTrigger are imported dynamically so they stay out of the
 * initial bundle, and the whole hook short-circuits for reduced-motion users.
 */
export function useScrollAnimations() {
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    let cancelled = false;
    let revert: (() => void) | null = null;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
          // Line-mask reveals — the editorial signature move
          gsap.utils
            .toArray<HTMLElement>("[data-reveal-lines]")
            .forEach((block) => {
              const spans = block.querySelectorAll(".reveal-line > span");
              gsap.set(spans, { yPercent: 118 });
              gsap.to(spans, {
                yPercent: 0,
                duration: 1.25,
                ease: "expo.out",
                stagger: 0.09,
                scrollTrigger: { trigger: block, start: "top 84%" },
              });
            });

          // Generic masked rise for non-heading elements (mocks, chips, rows)
          gsap.utils.toArray<HTMLElement>("[data-clip-rise]").forEach((block) => {
            const items = block.querySelectorAll<HTMLElement>(".clip-rise > *");
            gsap.set(items, { yPercent: 110 });
            gsap.to(items, {
              yPercent: 0,
              duration: 1.15,
              ease: "expo.out",
              stagger: 0.06,
              scrollTrigger: { trigger: block, start: "top 86%" },
            });
          });

          // The services grid gets one composed entrance instead of three
          // unrelated fades: the red seam draws first, then the disciplines
          // settle into place as a single editorial sequence.
          gsap.utils.toArray<HTMLElement>("[data-service-stage]").forEach((stage) => {
            const cards = stage.querySelectorAll<HTMLElement>("[data-service-card]");
            const beam = stage.querySelector<HTMLElement>("[data-service-beam]");
            const timeline = gsap.timeline({
              scrollTrigger: {
                trigger: stage,
                start: "top 78%",
                once: true,
              },
            });

            if (beam) {
              timeline.from(beam, {
                scaleX: 0,
                duration: 0.8,
                ease: "expo.out",
              });
            }

            timeline.fromTo(
              cards,
              {
                y: 54,
                rotateX: -7,
                autoAlpha: 0,
                transformOrigin: "50% 100%",
              },
              {
                y: 0,
                rotateX: 0,
                autoAlpha: 1,
                clearProps: "transform",
                duration: 1.05,
                ease: "expo.out",
                stagger: 0.12,
              },
              beam ? "-=0.42" : 0
            );
          });

          // Capability gate: live, scrubbed parallax is the most expensive
          // scroll-linked work, so it only runs on large desktop-class viewports.
          const finePointer = window.matchMedia("(pointer: fine)").matches;
          const allowParallax = shouldUseParallax({
            finePointer,
            reducedMotion: reduce,
            viewportWidth: window.innerWidth,
          });

          // Fade + rise, with optional layered delay (no blur — keeps scroll smooth).
          // One-shot: once revealed, the trigger is dropped so it no longer costs
          // anything during subsequent scrolling.
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

          // Staggered groups — layered entrance
          gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
            gsap.from(group.children, {
              y: 50,
              autoAlpha: 0,
              duration: 0.9,
              ease: "expo.out",
              stagger: 0.09,
              scrollTrigger: { trigger: group, start: "top 86%" },
            });
          });

          // Parallax with optional depth (subtle scale/opacity ride). Gated to
          // desktop-class viewports because scrubbed triggers run on every frame.
          if (allowParallax) {
            gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
              const factor = parseFloat(el.dataset.parallax || "0.15");
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

          ScrollTrigger.refresh();
        });

        revert = () => ctx.revert();
      }
    );

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);
}
