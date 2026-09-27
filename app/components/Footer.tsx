import { site, nav, contact, incubator } from "~/data/content";
import { useLocation } from "react-router";

export function Footer() {
  const year = new Date().getFullYear();
  const { pathname } = useLocation();
  const resolveHref = (href: string) =>
    href.startsWith("#") && pathname !== "/" ? `/${href}` : href;
  return (
    <footer className="seam-glow relative overflow-hidden border-t border-line bg-ink-2">
      <div className="relative mx-auto max-w-[1600px] px-5 py-16 pb-[max(4rem,env(safe-area-inset-bottom))] md:px-12">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <a href={resolveHref("#top")} className="group flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-sm border border-line-strong font-display text-red transition-colors duration-500 group-hover:border-red">
                K
              </span>
              <span className="font-display text-2xl text-bone">{site.name}</span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-bone-dim">
              A {site.location}-based product studio, incubated at SKIIE,
              SKUAST-K. We build useful software across product, engineering,
              and applied AI.
            </p>
            <a
              href={incubator.href}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-3"
            >
              <img
                src={incubator.logo}
                alt={`${incubator.name} — ${incubator.fullName}`}
                width={160}
                height={88}
                className="skiie-mark h-10 w-auto"
              />
            </a>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-ash">
              Navigate
            </h4>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={resolveHref(item.href)}
                    className="link-underline inline-flex min-h-11 items-center text-sm text-bone-dim transition-colors hover:text-bone"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-ash">
              Reach us
            </h4>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="link-underline inline-flex min-h-11 items-center text-sm text-bone-dim transition-colors hover:text-bone"
                >
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={contact.phoneHref}
                  className="link-underline inline-flex min-h-11 items-center text-sm text-bone-dim transition-colors hover:text-bone"
                >
                  {contact.phone}
                </a>
              </li>
              {contact.socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline inline-flex min-h-11 items-center text-sm text-bone-dim transition-colors hover:text-bone"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-ash md:flex-row md:items-center">
          <span>
            © {year} {site.legalName}
          </span>
          <span>
            Built in {site.location} · Incubated at{" "}
            <a
              href={incubator.href}
              target="_blank"
              rel="noreferrer"
              className="text-bone-dim transition-colors hover:text-bone"
            >
              SKIIE, SKUAST-K
            </a>
          </span>
        </div>
      </div>

      {/* Oversized brand wordmark fading into the bottom edge — a composed close */}
      <div
        aria-hidden
        className="pointer-events-none select-none px-6 md:px-12"
      >
        <span
          className="block translate-y-[18%] font-display text-[18vw] leading-[0.8] text-bone/[0.035]"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, black 40%, transparent 92%)",
            maskImage:
              "linear-gradient(to bottom, black 40%, transparent 92%)",
          }}
        >
          KashCrop
        </span>
      </div>
    </footer>
  );
}
