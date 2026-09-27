import { founder } from "~/data/content";
import { SectionOpener } from "./Studio";

export function Founder() {
  return (
    <section
      id="founder"
      className="relative mx-auto max-w-[1600px] scroll-mt-24 px-5 py-20 md:scroll-mt-28 md:px-12 md:py-40"
    >
      <SectionOpener>{founder.opener}</SectionOpener>

      <div className="mt-16 grid gap-12 md:grid-cols-12 md:gap-8">
        {/* Portrait plate — monogram, intentional not broken */}
        <div className="md:col-span-4" data-reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-ink-3 shadow-raise ring-1 ring-line">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(120% 80% at 30% 8%, rgba(225,15,28,0.4), transparent 55%)",
              }}
            />
            {/* faint structural grid for surface texture */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(var(--hero-grid) 1px, transparent 1px), linear-gradient(90deg, var(--hero-grid) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <div className="absolute inset-0 grid place-items-center">
              <span
                data-parallax="0.06"
                className="font-display text-[6.5rem] leading-none text-bone/90 md:text-[9rem]"
              >
                HH
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-line bg-ink/60 px-5 py-4 backdrop-blur">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone">
                {founder.name}
              </span>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red" />
              </span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="md:col-span-8 md:pl-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-red">
            {founder.role}
          </p>
          <blockquote
            data-reveal-lines
            className="mt-6 font-display text-3xl leading-tight text-bone md:text-5xl"
          >
            <span className="reveal-line">
              <span>{founder.pull}</span>
            </span>
          </blockquote>
          <p
            data-reveal
            data-reveal-delay="0.08"
            className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-bone-dim md:text-lg"
          >
            {founder.bio}
          </p>

          {/* Mini proof ledger — what he has built, as a list not cards */}
          <p
            data-reveal
            data-reveal-delay="0.12"
            className="mt-12 font-mono text-[11px] uppercase tracking-[0.25em] text-red"
          >
            What he has built
          </p>
          <ul
            className="mt-6 max-w-2xl border-t border-line"
            data-stagger
          >
            {founder.proof.map((item, i) => (
              <li
                key={item}
                className="flex items-baseline gap-5 border-b border-line py-4"
              >
                <span className="font-mono text-[11px] text-ash">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-xl text-bone md:text-2xl">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
