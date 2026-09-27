import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { incubator, site } from "~/data/content";
import { Magnetic } from "./Magnetic";
import { ThemeToggle } from "./ThemeToggle";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  // Refs let the scroll handler read the latest state without re-subscribing,
  // and let us write to the progress bar directly (no React re-render per frame).
  const scrolledRef = useRef(scrolled);
  const progressRef = useRef<HTMLSpanElement>(null);
  scrolledRef.current = scrolled;

  const homeHref = onHome ? "#top" : "/#top";

  // Scrolled style + reading-progress strip. The bar is always visible; we
  // never translate the header off-screen. Work is rAF-throttled so scrolling
  // does not trigger a React render on every raw scroll event.
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const next = y > 40;
      if (next !== scrolledRef.current) setScrolled(next);

      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      data-scrolled={scrolled ? "true" : undefined}
      className={`fixed inset-x-0 top-0 z-[9000] pt-[env(safe-area-inset-top)] transition-[background-color,border-color,box-shadow] duration-500 ${
        scrolled
          ? "border-b border-line bg-ink/70 shadow-[0_10px_40px_-24px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-5 transition-[padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:px-12 ${
          scrolled ? "py-2.5" : "py-4 md:py-5"
        }`}
      >
        <a
          href={homeHref}
          data-cursor="cta"
          aria-label={site.name}
          className="press group flex min-w-0 items-center gap-3"
        >
          <span
            className={`relative flex shrink-0 items-center justify-center transition-[width,height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              scrolled ? "h-7 w-7" : "h-9 w-9"
            }`}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full bg-red/30 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100"
            />
            <img
              src="/kashcrop-logo.png"
              alt=""
              aria-hidden="true"
              width={36}
              height={36}
              decoding="async"
              className="relative h-full w-full select-none object-contain transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:-rotate-6 group-active:scale-95"
              draggable={false}
            />
          </span>
          <span
            className={`hidden overflow-hidden whitespace-nowrap font-mono uppercase text-bone transition-[max-width,opacity,font-size] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:inline ${
              scrolled
                ? "max-w-0 text-[0px] tracking-[0.18em] opacity-0 lg:max-w-[20rem] lg:text-[10px] lg:tracking-[0.25em] lg:opacity-100"
                : "max-w-[20rem] text-xs tracking-[0.25em] opacity-100"
            }`}
          >
            {site.name}
          </span>
        </a>

        <nav aria-label="Affiliation">
          <a
            href={incubator.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${incubator.name} SKUAST-K (opens in a new tab)`}
            className="group relative inline-flex min-h-11 items-center font-display text-xl leading-none tracking-[-0.02em] text-bone transition-colors hover:text-red sm:text-2xl md:min-h-0 md:text-[1.75rem]"
          >
            <span className="md:hidden">{incubator.name}</span>
            <span className="hidden md:inline">
              {incubator.name} SKUAST-K
            </span>
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-red transition-all duration-400 group-hover:w-full" />
          </a>
        </nav>

        <div className="flex shrink-0 items-center gap-2 md:gap-4">
          <ThemeToggle />
          <Magnetic strength={0.5}>
            <a
              href="/contact"
              data-cursor="cta"
              className="press inline-flex min-h-11 items-center justify-center rounded-full border border-line-strong px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-bone hover:border-red hover:bg-red sm:px-5 sm:text-[11px] sm:tracking-[0.2em] md:min-h-0"
            >
              Start a project
            </a>
          </Magnetic>
        </div>
      </div>

      {/* Reading progress — thin red hairline along the header's bottom edge.
          Driven imperatively from the scroll handler for a smooth, render-free
          update. */}
      <span
        ref={progressRef}
        aria-hidden
        data-scroll-progress
        className="absolute inset-x-0 bottom-0 block h-px origin-left scale-x-0 bg-red"
      />
    </header>
  );
}
