import { workSection, projects } from "~/data/content";
import { SectionOpener } from "./Studio";
import { ProjectAccordion } from "./ProjectAccordion";

export function Work() {
  return (
    <section id="work" className="relative scroll-mt-24 py-20 md:scroll-mt-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionOpener>{workSection.opener}</SectionOpener>
          <p
            data-reveal
            className="font-mono text-[11px] uppercase tracking-[0.25em] text-ash"
          >
            <span className="text-red">{projects.length}</span> selected projects
          </p>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-[1600px] px-5 md:mt-20 md:px-12">
        <ProjectAccordion projects={projects} />
      </div>
    </section>
  );
}
