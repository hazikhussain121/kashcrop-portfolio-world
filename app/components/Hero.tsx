import { hero, site } from "~/data/content";
import { IconArrow } from "./icons";
import { Magnetic } from "./Magnetic";

const headlinePlain = hero.headline.join(" ").replace(/[.\u2026]+$/, "");

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden md:min-h-[100svh]">
      {/* Ambient red glow — layered for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(58% 48% at 78% 12%, rgba(225,15,28,0.26), transparent 62%), radial-gradient(42% 42% at 8% 82%, rgba(255,91,58,0.12), transparent 60%)",
        }}
      />
      {/* Slow-drifting ember bloom for a living, cinematic surface */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/4 h-[42rem] w-[42rem] rounded-full opacity-50 blur-[120px] animate-[bloom_14s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(circle, rgba(225,15,28,0.30), rgba(138,10,19,0.10) 45%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        data-parallax="0.12"
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "linear-gradient(var(--hero-grid) 1px, transparent 1px), linear-gradient(90deg, var(--hero-grid) 1px, transparent 1px)",
          backgroundSize: "clamp(48px,7vw,96px) clamp(48px,7vw,96px)",
          maskImage:
            "radial-gradient(78% 78% at 50% 38%, black, transparent 76%)",
          WebkitMaskImage:
            "radial-gradient(78% 78% at 50% 38%, black, transparent 76%)",
        }}
      />
      {/* Floor gradient grounds the hero into the next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--color-ink))",
        }}
      />

      <div className="relative mx-auto flex max-w-[1600px] flex-col gap-8 px-5 pb-12 pt-[max(6.75rem,calc(env(safe-area-inset-top)+5.25rem))] md:min-h-[100svh] md:justify-between md:gap-0 md:px-12 md:pb-10 md:pt-40">
        {/* Kicker */}
        <div className="flex items-start gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-bone-dim md:items-center md:tracking-[0.3em]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red" />
          </span>
          {hero.kicker}
        </div>

        {/* Headline wraps as one phrase on small screens so the type can
            actually lead; authored line breaks stay on desktop. */}
        <div className="relative md:py-10">
          <h1
            aria-label={`${headlinePlain}.`}
            className="display-fluid font-display text-pretty text-bone md:max-w-[14ch]"
          >
            <span aria-hidden className="md:hidden">
              {headlinePlain}
              <span className="text-red">.</span>
            </span>
            <span aria-hidden data-reveal-lines className="hidden md:block">
              {hero.headline.map((line, i) => (
                <span key={i} className="reveal-line">
                  <span>
                    {i === hero.headline.length - 1
                      ? line.replace(/[.\u2026]+$/, "")
                      : line}
                    {i === hero.headline.length - 1 ? (
                      <span className="text-red">.</span>
                    ) : null}
                  </span>
                </span>
              ))}
            </span>
          </h1>
        </div>

        {/* Footer row */}
        <div className="grid gap-6 border-t border-line pt-8 md:grid-cols-12 md:items-end md:gap-8">
          <p
            data-reveal
            data-reveal-delay="0.08"
            className="max-w-xl text-pretty text-base leading-relaxed text-bone-dim md:col-span-7 md:text-lg"
          >
            {hero.intro}
          </p>
          <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center md:col-span-5 md:justify-end">
            <Magnetic strength={0.4} className="max-sm:block">
              <a
                href="#work"
                data-cursor="cta"
                className="press group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-red px-7 py-4 text-sm font-medium text-[#f4ece9] hover:bg-red-bright hover:shadow-[0_18px_60px_-18px_rgba(225,15,28,0.7)] sm:w-auto"
              >
                See the work
                <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Magnetic>
            <a
              href="#studio"
              className="link-underline inline-flex min-h-11 items-center justify-center font-mono text-[11px] uppercase tracking-[0.2em] text-bone-dim hover:text-bone sm:min-h-0 sm:justify-start"
            >
              The studio
            </a>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          aria-hidden
          className="absolute bottom-6 right-6 hidden flex-col items-center gap-3 md:right-12 md:flex"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ash [writing-mode:vertical-rl]">
            Scroll
          </span>
          <span className="h-12 w-px overflow-hidden bg-line">
            <span className="block h-1/2 w-full animate-[drop_1.8s_ease-in-out_infinite] bg-red" />
          </span>
        </div>
      </div>

      <span className="sr-only">{site.tagline}</span>
      <style>{`
        @keyframes drop { 0%{transform:translateY(-100%)} 100%{transform:translateY(200%)} }
        @keyframes bloom {
          0%,100% { transform: translate(0,0) scale(1); opacity:0.5; }
          50% { transform: translate(-3rem,2rem) scale(1.08); opacity:0.65; }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\[bloom_14s_ease-in-out_infinite\] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
