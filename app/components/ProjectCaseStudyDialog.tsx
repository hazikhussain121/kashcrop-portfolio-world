import { useEffect, useId, useRef, useState } from "react";
import type { Project } from "~/data/content";
import { IconArrow, IconArrowUpRight } from "~/components/icons";
import { MermaidDiagram } from "~/components/MermaidDiagram";

type ProjectCaseStudyDialogProps = {
  project: Project;
  triggerLabel?: string;
  className?: string;
};

/**
 * Text-first case study detail. The dialog deliberately has no media slots:
 * the work is explained through the problem, workflow, and shipped surface.
 */
export function ProjectCaseStudyDialog({
  project,
  triggerLabel = "Read case study",
  className = "",
}: ProjectCaseStudyDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogId = useId();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => setIsOpen(false);
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const openDialog = () => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    setIsOpen(true);
  };

  const closeDialog = () => {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
    setIsOpen(false);
  };

  const overview = project.detail?.overview?.length
    ? project.detail.overview
    : [project.summary];
  const facts = project.detail?.facts ?? [];
  const vizier = project.detail?.vizier;
  const diagrams = project.detail?.diagrams ?? [];

  return (
    <>
      <button
        type="button"
        className={`press group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full border border-red bg-red px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[#f4ece9] transition-[background-color,border-color,transform] hover:border-red-bright hover:bg-red-bright motion-reduce:transition-none md:w-auto ${className}`}
        aria-haspopup="dialog"
        aria-controls={dialogId}
        aria-label={`${triggerLabel}: ${project.name}`}
        onClick={openDialog}
      >
        {triggerLabel}
        <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
      </button>

      <dialog
        ref={dialogRef}
        id={dialogId}
        aria-labelledby={`${dialogId}-title`}
        data-case-study-dialog
        data-lenis-prevent
        className="fixed inset-0 m-0 h-[100dvh] max-h-none w-full max-w-none overscroll-contain overflow-y-auto border-0 bg-ink p-0 text-bone shadow-float backdrop:bg-black/60 motion-safe:transition-[opacity,transform] motion-safe:duration-300 motion-safe:ease-out-expo motion-reduce:transition-none md:m-auto md:h-[min(92svh,72rem)] md:max-h-[calc(100svh-2rem)] md:w-[min(96vw,100rem)] md:border md:border-line-strong"
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(58% 48% at 78% 12%, rgba(225,15,28,0.20), transparent 62%), radial-gradient(42% 42% at 8% 82%, rgba(255,91,58,0.10), transparent 60%)",
            }}
          />
          <div
            className="absolute -right-40 top-1/4 h-[36rem] w-[36rem] rounded-full opacity-50 blur-[110px]"
            style={{
              background:
                "radial-gradient(circle, rgba(225,15,28,0.24), rgba(138,10,19,0.08) 45%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.09]"
            style={{
              backgroundImage:
                "linear-gradient(var(--hero-grid) 1px, transparent 1px), linear-gradient(90deg, var(--hero-grid) 1px, transparent 1px)",
              backgroundSize: "clamp(48px, 7vw, 96px) clamp(48px, 7vw, 96px)",
              maskImage:
                "radial-gradient(78% 78% at 50% 38%, black, transparent 76%)",
              WebkitMaskImage:
                "radial-gradient(78% 78% at 50% 38%, black, transparent 76%)",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-40"
            style={{
              background:
                "linear-gradient(to bottom, transparent, var(--color-ink))",
            }}
          />
        </div>

        <article className="relative z-10 p-5 pb-[max(2rem,env(safe-area-inset-bottom))] md:p-12 lg:p-16 xl:p-20">
          <header className="border-b border-line pb-8 md:pb-10">
            <div className="flex items-start justify-between gap-8">
              <div className="flex items-baseline gap-4">
                <span
                  className="font-display text-5xl leading-none md:text-7xl"
                  style={{ color: project.accent }}
                >
                  {project.no}
                </span>
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone-dim">
                  <div>{project.kind}</div>
                  <div className="text-ash">{project.year}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={closeDialog}
                className="press min-h-11 shrink-0 border border-line-strong px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim transition-colors hover:border-red hover:text-red motion-reduce:transition-none"
                aria-label={`Close ${project.name} case study`}
              >
                Close
              </button>
            </div>
            <h2
              id={`${dialogId}-title`}
              className="mt-8 max-w-4xl font-display text-4xl leading-tight text-bone md:text-6xl"
            >
              {project.name}
            </h2>
            <p className="mt-4 max-w-3xl font-display text-xl italic leading-snug text-bone-dim md:text-2xl">
              {project.tagline}
            </p>
          </header>

          <div className="grid gap-12 pt-10 md:grid-cols-12 md:gap-10 md:pt-12">
            <div className="space-y-6 md:col-span-8">
              {overview.map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-3xl text-pretty text-base leading-relaxed text-bone-dim md:text-lg"
                >
                  {paragraph}
                </p>
              ))}

              {vizier && (
                <section className="border-t border-line pt-8" aria-labelledby={`${dialogId}-vizier`}>
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-red">
                    Vizier in the workflow
                  </p>
                  <h3
                    id={`${dialogId}-vizier`}
                    className="mt-4 max-w-2xl font-display text-2xl leading-tight text-bone md:text-4xl"
                  >
                    {vizier.headline}
                  </h3>
                  <ol className="mt-7 grid gap-4 sm:grid-cols-2">
                    {vizier.steps.map((step, index) => (
                      <li
                        key={step}
                        className="flex gap-3 border-t border-line pt-3 text-sm leading-relaxed text-bone-dim"
                      >
                        <span className="font-mono text-[11px] text-red" aria-hidden="true">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              <section className="border-t border-line pt-8" aria-labelledby={`${dialogId}-features`}>
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ash">
                  What shipped
                </p>
                <h3 id={`${dialogId}-features`} className="sr-only">
                  What shipped
                </h3>
                <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed text-bone">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: project.accent }}
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <aside className="md:col-span-4">
              {facts.length > 0 && (
                <dl className="border-t border-line">
                  {facts.map((fact) => (
                    <div
                      key={fact.label}
                      className="flex items-baseline justify-between gap-5 border-b border-line py-3"
                    >
                      <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
                        {fact.label}
                      </dt>
                      <dd className="text-right text-sm text-bone">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <div className="mt-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ash">
                  Built with
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-bone-dim"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>

              {project.links.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="press inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-bone transition-colors hover:text-red motion-reduce:transition-none"
                    >
                      {link.label}
                      <IconArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              )}
            </aside>

            {isOpen && diagrams.length > 0 && (
              <section className="border-t border-line pt-8 md:col-span-12" aria-labelledby={`${dialogId}-diagrams`}>
                <h3
                  id={`${dialogId}-diagrams`}
                  className="max-w-2xl font-display text-2xl leading-tight text-bone md:text-4xl"
                >
                  How it fits together.
                </h3>
                <div className="mt-8 grid gap-6 lg:grid-cols-2">
                  {diagrams.map((diagram) => (
                    <MermaidDiagram key={diagram.title} {...diagram} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </article>
      </dialog>
    </>
  );
}
