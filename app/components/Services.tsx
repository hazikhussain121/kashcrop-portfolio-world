import { useEffect, useRef } from "react";
import { servicesSection, services } from "~/data/content";
import { shouldUseHeavyPointerEffects } from "~/utils/perfFlags";
import { serviceIcons } from "./icons";
import { SectionOpener } from "./Studio";

/**
 * The services section uses the earlier three-column card treatment: each
 * discipline gets a quiet room, a precise index, and a small proof ledger.
 */
export function Services() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (
      !shouldUseHeavyPointerEffects({
        finePointer,
        reducedMotion: reduce,
        viewportWidth: window.innerWidth,
      })
    ) {
      return;
    }

    const cards = Array.from(
      stage.querySelectorAll<HTMLElement>("[data-service-card]")
    );
    const state = new Map<HTMLElement, { rect: DOMRect; frame: number | null }>();

    const refreshBounds = () => {
      cards.forEach((card) => {
        const current = state.get(card);
        if (current) current.rect = card.getBoundingClientRect();
      });
    };

    const cleanups = cards.map((card) => {
      state.set(card, { rect: card.getBoundingClientRect(), frame: null });
      const move = (event: PointerEvent) => {
        const current = state.get(card);
        if (!current) return;

        const x = event.clientX - current.rect.left;
        const y = event.clientY - current.rect.top;
        const tiltX = ((x / current.rect.width) * 2 - 1) * 1.25;
        const tiltY = ((y / current.rect.height) * 2 - 1) * -1.25;
        if (current.frame !== null) return;

        current.frame = window.requestAnimationFrame(() => {
          card.style.setProperty("--service-spot-x", `${x}px`);
          card.style.setProperty("--service-spot-y", `${y}px`);
          card.style.setProperty("--service-tilt-x", `${tiltX.toFixed(2)}deg`);
          card.style.setProperty("--service-tilt-y", `${tiltY.toFixed(2)}deg`);
          current.frame = null;
        });
      };
      const leave = () => {
        const current = state.get(card);
        if (current?.frame !== null && current?.frame !== undefined) {
          window.cancelAnimationFrame(current.frame);
          current.frame = null;
        }
        card.style.setProperty("--service-tilt-x", "0deg");
        card.style.setProperty("--service-tilt-y", "0deg");
      };

      card.addEventListener("pointermove", move);
      card.addEventListener("pointerleave", leave);
      return () => {
        card.removeEventListener("pointermove", move);
        card.removeEventListener("pointerleave", leave);
        const current = state.get(card);
        if (current?.frame !== null && current?.frame !== undefined) {
          window.cancelAnimationFrame(current.frame);
        }
      };
    });

    window.addEventListener("resize", refreshBounds, { passive: true });
    window.addEventListener("scroll", refreshBounds, { passive: true });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      window.removeEventListener("resize", refreshBounds);
      window.removeEventListener("scroll", refreshBounds);
      state.clear();
    };
  }, []);

  return (
    <section
      id="services"
      className="seam-glow relative mx-auto max-w-[1600px] scroll-mt-24 px-5 py-20 md:px-12 md:scroll-mt-28 md:py-40"
    >
      <SectionOpener>{servicesSection.opener}</SectionOpener>

      <div ref={stageRef} data-service-stage className="services-stage relative mt-16">
        <span aria-hidden className="services-stage__grid pointer-events-none absolute inset-[-8%]" />
        <span aria-hidden className="services-stage__glow services-stage__glow--left pointer-events-none absolute" />
        <span aria-hidden className="services-stage__glow services-stage__glow--right pointer-events-none absolute" />
        <span aria-hidden data-service-beam className="services-stage__beam pointer-events-none absolute inset-x-8 top-0" />

        <div data-service-grid className="relative grid gap-px overflow-hidden rounded-2xl border border-line md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => {
            const Icon = serviceIcons[service.icon];
            return (
              <article
                key={service.no}
                data-service-card
                className="services-card group relative flex flex-col overflow-hidden bg-ink-2 p-6 transition-[background-color,transform,box-shadow] duration-700 ease-[var(--ease-out-expo)] md:p-10"
              >
                <span aria-hidden className="services-card__spotlight pointer-events-none absolute inset-0" />
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                  style={{ background: "rgba(225,15,28,0.28)" }}
                />
                <span className="pointer-events-none absolute -bottom-6 right-3 select-none font-display text-[7rem] leading-none text-bone/[0.03] transition-colors duration-500 group-hover:text-red/[0.06]">
                  {service.no}
                </span>
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-red transition-transform duration-500 group-hover:scale-x-100" />

                <div className="relative flex items-center justify-between">
                  <span className="services-card__icon flex h-12 w-12 items-center justify-center rounded-xl border border-line text-red transition-[background-color,border-color,color,transform] duration-500 group-hover:border-red group-hover:bg-red group-hover:text-bone">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.2em] text-ash">
                    {service.no}
                  </span>
                </div>

                <h3 className="relative mt-8 font-display text-3xl text-bone md:text-4xl">
                  {service.title}
                </h3>
                <p className="relative mt-4 flex-1 text-pretty text-sm leading-relaxed text-bone-dim md:text-base">
                  {service.description}
                </p>

                <div className="relative mt-8 border-t border-line pt-5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ash">
                    Proof
                  </span>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {service.proof.map((proof) => (
                      <li
                        key={proof}
                        className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-bone-dim transition-[border-color,background-color,color,transform] duration-300 group-hover:border-line-strong group-hover:bg-ink-3/60"
                      >
                        {proof}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>

    </section>
  );
}
