import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import {
  computeMagneticTransform,
  resetMagneticSetters,
} from "~/utils/magnetic";

/**
 * Magnetic wrapper: child drifts toward the cursor, springs back on leave.
 *
 * Structure: a stationary outer element owns the pointer events and is the
 * stable hit area, while only the inner element receives the GSAP transform.
 * This prevents the moving element from shifting out from under the cursor and
 * causing rapid enter/leave jitter near its edges.
 *
 * Performance: motion is applied through cached `gsap.quickTo` setters instead
 * of spawning a fresh tween per event. The stationary wrapper rect is measured
 * per move so it stays accurate mid-animation and after smooth scroll, which is
 * cheap for the small CTAs this wraps.
 */
export function Magnetic({
  children,
  strength = 0.4,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const hitRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const xTo = useRef<((value: number) => void) | null>(null);
  const yTo = useRef<((value: number) => void) | null>(null);

  const ensureSetters = () => {
    const el = innerRef.current;
    if (!el || (xTo.current && yTo.current)) return;
    xTo.current = gsap.quickTo(el, "x", { duration: 0.6, ease: "expo.out" });
    yTo.current = gsap.quickTo(el, "y", { duration: 0.6, ease: "expo.out" });
  };

  const onPointerEnter = () => {
    if (!innerRef.current) return;
    // Cancel any in-flight elastic return so it does not fight the setters.
    gsap.killTweensOf(innerRef.current);
    ({ xTo: xTo.current, yTo: yTo.current } = resetMagneticSetters({
      xTo: xTo.current,
      yTo: yTo.current,
    }));
    ensureSetters();
  };

  const onMove = (e: React.MouseEvent) => {
    const hit = hitRef.current;
    if (!hit) return;

    // Measure the stationary wrapper each move: it never moves, so the rect is
    // always accurate, even mid-animation or after smooth scroll.
    const rect = hit.getBoundingClientRect();
    const next = computeMagneticTransform(rect, e.clientX, e.clientY, strength);
    xTo.current?.(next.x);
    yTo.current?.(next.y);
  };

  const onLeave = () => {
    if (innerRef.current)
      gsap.to(innerRef.current, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1,0.4)",
        overwrite: "auto",
      });
  };

  return (
    <div
      ref={hitRef}
      onPointerEnter={onPointerEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      // `inline-block` by default; pass an explicit display utility in
      // `className` (e.g. `inline-flex`, `block`) to let full-width CTAs keep
      // a comfortable tap target on touch.
      className={className ?? "inline-block"}
    >
      <div ref={innerRef} className="h-full w-full will-change-transform">
        {children}
      </div>
    </div>
  );
}
