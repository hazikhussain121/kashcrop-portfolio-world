import { contact, incubator } from "~/data/content";
import { IconMail, IconPhone, IconArrowUpRight, IconArrow } from "./icons";
import { Magnetic } from "./Magnetic";

export function Contact() {
  return (
    <section
      id="contact"
      className="surface-invert relative z-[2] scroll-mt-24 overflow-hidden py-20 md:scroll-mt-28 md:py-40"
    >
      <div className="relative z-[2] mx-auto max-w-[1600px] px-5 md:px-12">
        <h2
          data-reveal-lines
          className="font-display text-4xl text-bone md:text-9xl"
        >
          {contact.opener.split("\n").map((line, i, arr) => (
            <span key={i} className="reveal-line">
              <span>
                {i === arr.length - 1 ? line.replace(/[.\u2026]+$/, "") : line}
                {i === arr.length - 1 && (
                  <span className="text-red">.</span>
                )}
              </span>
            </span>
          ))}
        </h2>

        <p
          data-reveal
          data-reveal-delay="0.08"
          className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-bone-dim md:text-lg"
        >
          {contact.blurb}
        </p>

        <div className="relative z-[2] mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Magnetic strength={0.35} className="max-sm:block">
            <a
              href={contact.formHref}
              data-cursor="cta"
              className="press group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-red px-8 py-4 text-base font-medium text-[#f4ece9] hover:bg-red-bright hover:shadow-[0_22px_70px_-20px_rgba(225,15,28,0.7)] sm:w-auto sm:py-5"
            >
              Start your project
              <IconArrow className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </Magnetic>
          <a
            href={`mailto:${contact.email}`}
            className="press inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full border border-line-strong px-6 py-4 text-base text-bone hover:border-red sm:w-auto sm:px-8 sm:py-5"
          >
            <IconMail className="h-5 w-5 shrink-0 text-red" />
            <span className="truncate">{contact.email}</span>
          </a>
          <a
            href={contact.phoneHref}
            className="press inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full border border-line-strong px-6 py-4 text-base text-bone hover:border-red sm:w-auto sm:px-8 sm:py-5"
          >
            <IconPhone className="h-5 w-5 shrink-0 text-red" />
            {contact.phone}
          </a>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-1">
          {contact.socials.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex min-h-11 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-bone-dim transition-colors hover:text-bone"
            >
              {s.label}
              <IconArrowUpRight className="h-3.5 w-3.5 text-red transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ))}
        </div>

        <div className="mt-20 grid gap-10 border-t border-line pt-12 md:grid-cols-12 md:items-start">
          <a
            href={incubator.href}
            target="_blank"
            rel="noreferrer"
            className="md:col-span-4"
          >
            <img
              src={incubator.logo}
              alt={`${incubator.name} — ${incubator.fullName}`}
              width={220}
              height={120}
              className="skiie-mark h-20 w-auto md:h-24"
            />
          </a>
          <div className="md:col-span-8">
            <h3 className="font-display text-3xl text-bone md:text-4xl">
              Incubated at SKIIE, SKUAST-K
            </h3>
            <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-bone-dim">
              {incubator.blurb}
            </p>
            <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-bone-dim">
              {incubator.address}
            </p>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              <a
                href={`mailto:${incubator.email}`}
                className="link-underline inline-flex min-h-11 items-center text-sm text-bone-dim hover:text-bone"
              >
                {incubator.email}
              </a>
              <a
                href={incubator.phoneHref}
                className="link-underline inline-flex min-h-11 items-center text-sm text-bone-dim hover:text-bone"
              >
                {incubator.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
