import { useEffect, useRef, useState } from "react";
import type { Project, ProjectClip } from "~/data/content";

/**
 * The hero visual for a project. When the project has a self-hosted `clip`
 * (a real screen recording), it renders a device-framed <video> that:
 *   - autoplays muted + looping ONLY while in view (saves battery/CPU),
 *   - shows the poster still before play and under prefers-reduced-motion,
 *   - is fully accessible (labelled, no audio, not focus-trapping).
 *
 * When there's no clip yet, it renders a designed "in production" placeholder
 * in the same frame and aspect, so the layout is final today and lighting it
 * up later is a pure data change (drop a file in /public, set `clip`).
 */

const ASPECT: Record<NonNullable<ProjectClip["aspect"]>, string> = {
  phone: "aspect-[9/19.5] max-w-[260px]",
  desktop: "aspect-[16/10]",
  wide16x9: "aspect-video",
  square: "aspect-square",
};

function aspectFor(project: Project): string {
  if (project.clip?.aspect) return ASPECT[project.clip.aspect];
  // Fall back to a sensible frame based on the legacy mock hint.
  if (project.mock === "phone") return ASPECT.phone;
  return ASPECT.desktop;
}

export function ProjectStage({ project }: { project: Project }) {
  const frame = aspectFor(project);
  const isPhone = frame === ASPECT.phone;

  return (
    <div className={`relative mx-auto w-full ${isPhone ? "max-w-[260px]" : "max-w-[560px]"}`}>
      <div
        className={`relative overflow-hidden border border-line-strong bg-ink-3 shadow-float ring-1 ring-line ${frame} ${
          isPhone ? "rounded-[2.25rem]" : "rounded-xl"
        }`}
      >
        {project.clip ? (
          <ClipPlayer clip={project.clip} title={project.name} />
        ) : (
          <ClipPlaceholder accent={project.accent} />
        )}
      </div>

      {project.clip?.label && (
        <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim">
          {project.clip.label}
        </p>
      )}
    </div>
  );
}

function ClipPlayer({ clip, title }: { clip: ProjectClip; title: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // leave the poster frame; no autoplay

    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      poster={clip.poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={`${title}: UI demo (no audio)`}
      data-in-view={inView ? "true" : undefined}
    >
      {clip.srcWebm && <source src={clip.srcWebm} type="video/webm" />}
      <source src={clip.src} type="video/mp4" />
    </video>
  );
}

/**
 * Designed placeholder shown until the real recording is dropped in. It is
 * intentionally NOT a fake UI skeleton (that's the slop we're removing) — it
 * reads as a deliberate, on-brand "recording in production" plate.
 */
function ClipPlaceholder({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 90% at 50% 0%, ${accent}26, transparent 60%)`,
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
        <span className="relative flex h-3 w-3">
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
            style={{ background: accent }}
          />
          <span
            className="relative inline-flex h-3 w-3 rounded-full"
            style={{ background: accent }}
          />
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-bone-dim">
          Live UI capture in production
        </span>
      </div>
      <style>{`@media (prefers-reduced-motion: reduce){.animate-ping{animation:none!important}}`}</style>
    </div>
  );
}
