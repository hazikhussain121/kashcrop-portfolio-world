import { Link } from "react-router";
import { getProjectBySlug } from "~/data/content";
import { IconArrowUpRight } from "./icons";

type ProofItem = {
  name: string;
  description: string;
  projectSlug?: string;
};

export function ServiceProofRail({ items = [] }: { items?: ProofItem[] }) {
  return (
    <div className="mt-6 border-t border-line">
      {items.map((item) => {
        const project = item.projectSlug ? getProjectBySlug(item.projectSlug) : undefined;

        return (
          <article
            key={`${item.projectSlug ?? item.name}`}
            className="border-b border-line py-8"
          >
            <div>
              {project ? (
                <Link
                  to={`/projects/${project.slug}`}
                  className="group inline-flex items-center gap-2 font-display text-2xl text-bone transition-colors hover:text-red md:text-3xl"
                >
                  {item.name}
                  <IconArrowUpRight className="h-4 w-4 text-red transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              ) : (
                <h5 className="font-display text-2xl text-bone md:text-3xl">
                  {item.name}
                </h5>
              )}

              <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-bone-dim md:text-base">
                {item.description}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
