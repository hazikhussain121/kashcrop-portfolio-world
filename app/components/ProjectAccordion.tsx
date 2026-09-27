import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import type { Project } from "~/data/content";
import { ProjectCaseStudyDialog } from "~/components/ProjectCaseStudyDialog";

type ProjectAccordionProps = {
  projects: Project[];
  className?: string;
  heading?: string;
};

/**
 * A single-action project list. Each row goes straight to its case study;
 * there is no second disclosure layer competing with the dialog.
 */
export function ProjectAccordion({
  projects,
  className = "",
  heading = "Portfolio",
}: ProjectAccordionProps) {
  const headingId = useId();
  const runwayRef = useRef<HTMLElement>(null);
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug ?? "");

  useEffect(() => {
    const runway = runwayRef.current;
    if (!runway || projects.length < 2) return;

    const rows = Array.from(
      runway.querySelectorAll<HTMLElement>("[data-portfolio-row]")
    );
    let frame = 0;

    const updateActiveFromPosition = () => {
      const targetY = window.innerHeight * 0.38;
      const candidates = rows
        .map((row) => ({ row, rect: row.getBoundingClientRect() }))
        .filter(({ rect }) => rect.bottom > 0 && rect.top < window.innerHeight)
        .sort(
          (a, b) =>
            Math.abs(a.rect.top - targetY) -
            Math.abs(b.rect.top - targetY)
        );
      const slug = candidates[0]?.row.getAttribute("data-project-slug");
      if (slug) {
        setActiveSlug((current) => (current === slug ? current : slug));
      }
    };

    const observer = new IntersectionObserver(
      updateActiveFromPosition,
      { rootMargin: "-20% 0px -34% 0px", threshold: [0.1, 0.4, 0.8] }
    );
    rows.forEach((row) => observer.observe(row));

    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateActiveFromPosition();
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [projects]);

  if (projects.length === 0) return null;

  return (
    <section
      ref={runwayRef}
      className={`portfolio-runway relative ${className}`}
      data-portfolio-runway
      aria-labelledby={headingId}
    >
      <h2 id={headingId} className="sr-only">
        {heading}
      </h2>
      <div
        aria-hidden
        className="portfolio-runway__ambient pointer-events-none absolute inset-[-8%]"
      />

      <ol
        className="portfolio-runway__list border-t border-line"
        data-portfolio-list
      >
        {projects.map((project) => {
          const active = activeSlug === project.slug;
          return (
            <li
              key={project.slug}
              data-portfolio-row
              data-project-slug={project.slug}
              data-active={active}
              className="portfolio-row border-b border-line"
              style={{ "--project-accent": project.accent } as CSSProperties}
              onPointerEnter={() => setActiveSlug(project.slug)}
              onFocusCapture={() => setActiveSlug(project.slug)}
            >
              <div className="portfolio-row__summary relative z-10 flex flex-col gap-5 py-7 md:grid md:grid-cols-[5rem_minmax(0,1fr)_auto] md:items-center md:gap-8 md:py-8">
                <span
                  className="portfolio-row__number w-12 shrink-0 font-display text-5xl leading-none md:w-20 md:text-7xl"
                  style={{ color: project.accent }}
                  aria-hidden="true"
                >
                  {project.no}
                </span>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="font-display text-3xl leading-tight text-bone md:text-5xl">
                      {project.name}
                    </h3>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ash">
                      {project.kind} · {project.year}
                    </span>
                  </div>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-bone-dim md:text-base">
                    {project.tagline}
                  </p>
                </div>

                <div className="md:justify-self-end">
                  <ProjectCaseStudyDialog
                    project={project}
                    triggerLabel="View case study"
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
