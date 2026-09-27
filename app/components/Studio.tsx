import { studio } from "~/data/content";

export function Studio() {
  return (
    <section id="studio" className="relative mx-auto max-w-[1600px] scroll-mt-24 px-5 py-20 md:scroll-mt-28 md:px-12 md:py-40">
      <div className="grid gap-14 md:grid-cols-12">
        <div className="md:col-span-7">
          <h2
            data-reveal-lines
            className="font-display text-4xl text-bone md:text-6xl lg:text-7xl"
          >
            {studio.statement.map((line, i) => (
              <span key={i} className="reveal-line">
                <span>{line}</span>
              </span>
            ))}
          </h2>
        </div>

        <div className="space-y-6 md:col-span-5 md:pt-3" data-stagger>
          {studio.paragraphs.map((p, i) => (
            <p key={i} className="text-pretty text-base leading-relaxed text-bone-dim md:text-lg">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Editorial section opener. Replaces the old numbered uppercase eyebrow
 * (`[02] WHAT WE DO`) — a named AI-grammar tell — with a single large
 * Fraunces statement that carries the section. Author line breaks with `\n`.
 */
export function SectionOpener({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  const lines = children.split("\n");
  return (
    <h2
      data-reveal-lines
      className={`font-display text-balance text-4xl text-bone md:text-6xl lg:text-7xl ${className}`}
    >
      {lines.map((line, i) => (
        <span key={i} className="reveal-line">
          <span>{line}</span>
        </span>
      ))}
    </h2>
  );
}
