import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { useMotion } from '../MotionProvider';

/** One scroll clock. Touch, keyboard and reduced-motion visitors retain native scrolling. */
export function ScrollDirector() {
 const { reduced } = useMotion();
 const { pathname } = useLocation();
 const progress = useRef<HTMLDivElement>(null);
 const engine = useRef<Lenis | null>(null);
 useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);
  const pointer = matchMedia('(hover: hover) and (pointer: fine)');
  let destroy = () => {};
  const configure = () => {
   destroy();
   if (reduced || !pointer.matches) return;
   const lenis = new Lenis({ duration: .85, smoothWheel: true, syncTouch: false,
    prevent: node => !!node.closest('dialog,[data-lenis-prevent],input,textarea,select') });
   engine.current = lenis;
   const tick = (time: number) => lenis.raf(time * 1000);
   const update = () => ScrollTrigger.update();
   lenis.on('scroll', update);
   gsap.ticker.add(tick);
   const pause = () => {
    if (document.hidden || document.querySelector('dialog[open]')) lenis.stop();
    else lenis.start();
   };
   const observer = new MutationObserver(pause);
   observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
   document.addEventListener('visibilitychange', pause);
   pause();
   destroy = () => {
    observer.disconnect(); document.removeEventListener('visibilitychange', pause);
    gsap.ticker.remove(tick); lenis.off('scroll', update); lenis.destroy();
    if (engine.current === lenis) engine.current = null;
   };
  };
  configure(); pointer.addEventListener('change', configure);
  return () => { destroy(); pointer.removeEventListener('change', configure); };
 }, [reduced]);
 useEffect(() => {
  let frame = 0, cancelled = false;
  const update = () => {
   if (progress.current) {
    const total = document.documentElement.scrollHeight - innerHeight;
    progress.current.style.transform = `scaleX(${total > 0 ? Math.min(1, Math.max(0, scrollY / total)) : 0})`;
   }
   frame = 0;
  };
  const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
  const refresh = () => { if (!cancelled) { engine.current?.resize(); ScrollTrigger.refresh(); update(); } };
  const timeout = setTimeout(refresh, 180);
  document.fonts?.ready.then(refresh);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', refresh);
  update();
  return () => { cancelled = true; clearTimeout(timeout); cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', refresh); };
 }, [pathname, reduced]);
 return <div className="reading-track" aria-hidden="true"><div ref={progress}/></div>;
}
