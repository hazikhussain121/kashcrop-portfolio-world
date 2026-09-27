import { useEffect, useRef, useState } from "react";
import type { ProjectShot, ProjectVideo, ProjectClip } from "~/data/content";
import { ResponsiveImage } from "./ResponsiveImage";

/**
 * Renders a project's self-hosted UI clips, screenshots, and embedded videos.
 * Every section is optional — pass whatever the project has. Used by the
 * dedicated project page (routes/project.tsx).
 */
export function ProjectGallery({
  shots,
  videos,
  clips,
  accent,
}: {
  shots?: ProjectShot[];
  videos?: ProjectVideo[];
  clips?: ProjectClip[];
  accent: string;
}) {
  const hasShots = !!shots?.length;
  const hasVideos = !!videos?.length;
  const hasClips = !!clips?.length;
  if (!hasShots && !hasVideos && !hasClips) return null;

  return (
    <div className="space-y-20">
      {hasClips && <Clips clips={clips!} accent={accent} />}
      {hasShots && <Screenshots shots={shots!} accent={accent} />}
      {hasVideos && <Videos videos={videos!} accent={accent} />}
    </div>
  );
}

function Clips({ clips, accent }: { clips: ProjectClip[]; accent: string }) {
  return (
    <section>
      <GalleryLabel label="UI captures" accent={accent} />
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {clips.map((clip, i) => (
          <figure key={`${clip.src}-${i}`} data-reveal className="space-y-3">
            <div className="relative aspect-video overflow-hidden rounded-xl border border-line bg-ink-2 shadow-float">
              <SelfHostedClip clip={clip} />
            </div>
            {clip.label && (
              <figcaption className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim">
                {clip.label}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}

function SelfHostedClip({ clip }: { clip: ProjectClip }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
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
      aria-label={clip.label ? `${clip.label} (no audio)` : "UI demo (no audio)"}
    >
      {clip.srcWebm && <source src={clip.srcWebm} type="video/webm" />}
      <source src={clip.src} type="video/mp4" />
    </video>
  );
}

function Screenshots({
  shots,
  accent,
}: {
  shots: ProjectShot[];
  accent: string;
}) {
  return (
    <section>
      <GalleryLabel label="Screenshots" accent={accent} />
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {shots.map((shot, i) => (
          <figure
            key={`${shot.src}-${i}`}
            data-reveal
            className={`group relative overflow-hidden rounded-2xl border border-line bg-ink-2 ${
              shot.wide ? "sm:col-span-2" : ""
            }`}
          >
            <ResponsiveImage
              src={shot.src}
              alt={shot.alt}
              srcAvif={shot.srcAvif}
              srcWebp={shot.srcWebp}
              srcSet={shot.srcSet}
              sizes={shot.sizes ?? (shot.wide ? "100vw" : "(min-width: 640px) 50vw, 100vw")}
              width={shot.width}
              height={shot.height}
              className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            {shot.caption && (
              <figcaption className="border-t border-line px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim">
                {shot.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}

function Videos({ videos, accent }: { videos: ProjectVideo[]; accent: string }) {
  return (
    <section>
      <GalleryLabel label="Videos" accent={accent} />
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {videos.map((video, i) => (
          <figure key={`${video.title}-${i}`} data-reveal className="space-y-3">
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-line bg-ink-2 shadow-float">
              <VideoEmbed video={video} />
            </div>
            <figcaption className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim">
              {video.title}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function VideoEmbed({ video }: { video: ProjectVideo }) {
  if (video.provider === "youtube" && video.id) {
    return (
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${video.id}`}
        title={video.title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    );
  }

  if (video.provider === "facebook" && video.url) {
    const src = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
      video.url
    )}&show_text=false`;
    return (
      <iframe
        className="absolute inset-0 h-full w-full"
        src={src}
        title={video.title}
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  // Misconfigured entry — link out gracefully rather than render a blank box.
  const href = video.url ?? (video.id ? `https://youtu.be/${video.id}` : "#");
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="absolute inset-0 grid place-items-center font-mono text-[11px] uppercase tracking-[0.2em] text-bone-dim hover:text-bone"
    >
      Watch video ↗
    </a>
  );
}

function GalleryLabel({ label, accent }: { label: string; accent: string }) {
  return (
    <div data-reveal className="flex items-center gap-4">
      <span
        className="h-2 w-2 rounded-full"
        style={{ background: accent }}
      />
      <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone-dim">
        {label}
      </span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
