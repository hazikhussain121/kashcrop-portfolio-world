/**
 * Performance-minded image primitive.
 *
 * Renders a <picture> that prefers modern formats (AVIF, then WebP) when
 * provided and falls back to the base `src`. Always sets:
 *   - explicit `width`/`height` when known, so the browser reserves space and
 *     avoids cumulative layout shift (CLS),
 *   - `loading="lazy"` + `decoding="async"` by default for below-the-fold media,
 *   - optional `srcSet`/`sizes` for responsive serving.
 *
 * For above-the-fold/LCP imagery, pass `priority` to switch to eager loading
 * and high fetch priority.
 */
export type ResponsiveImageProps = {
  src: string;
  alt: string;
  /** Modern-format source(s). May be a single URL or a full srcset string. */
  srcAvif?: string;
  srcWebp?: string;
  /** Responsive candidates for the fallback <img>. */
  srcSet?: string;
  sizes?: string;
  /** Intrinsic dimensions — strongly recommended to prevent layout shift. */
  width?: number;
  height?: number;
  className?: string;
  /** Above-the-fold/LCP image: load eagerly with high priority. */
  priority?: boolean;
};

export function ResponsiveImage({
  src,
  alt,
  srcAvif,
  srcWebp,
  srcSet,
  sizes,
  width,
  height,
  className,
  priority = false,
}: ResponsiveImageProps) {
  return (
    <picture>
      {srcAvif && <source srcSet={srcAvif} sizes={sizes} type="image/avif" />}
      {srcWebp && <source srcSet={srcWebp} sizes={sizes} type="image/webp" />}
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        // fetchPriority is a valid DOM attribute; React 19 forwards it.
        fetchPriority={priority ? "high" : "auto"}
        className={className}
      />
    </picture>
  );
}
