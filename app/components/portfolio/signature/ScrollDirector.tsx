import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useMotion } from '../MotionProvider';

/** Native scroll remains in charge; individual product scenes own their motion. */
export function ScrollDirector() {
  const {pathname} = useLocation();
  const {reduced} = useMotion();
  useEffect(() => {
    let cancelled = false;
    const frame = requestAnimationFrame(() => {
      import('gsap/ScrollTrigger').then(({ScrollTrigger}) => {if (!cancelled) ScrollTrigger.refresh();}).catch(() => {});
    });
    return () => {cancelled = true; cancelAnimationFrame(frame);};
  }, [pathname, reduced]);
  return null;
}
