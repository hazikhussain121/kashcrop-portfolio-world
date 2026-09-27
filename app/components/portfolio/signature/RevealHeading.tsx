import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMotion } from '../MotionProvider';

gsap.registerPlugin(useGSAP, ScrollTrigger);
export function RevealHeading({ text, id, className = '' }: { text: string; id?: string; className?: string }) {
 const root = useRef<HTMLHeadingElement>(null);
 const { reduced } = useMotion();
 useGSAP(() => {
  if (reduced || !root.current) return;
  gsap.fromTo(root.current.querySelectorAll('.reveal-word'), { yPercent: 35, opacity: .55 }, {
   yPercent: 0, opacity: 1, duration: .8, stagger: .035, ease: 'power3.out', clearProps: 'transform,opacity',
   scrollTrigger: { trigger: root.current, start: 'top 92%', once: true },
  });
 }, { scope: root, dependencies: [reduced], revertOnUpdate: true });
 return <h2 ref={root} id={id} className={`signature-heading ${className}`} aria-label={text.replaceAll('\n', ' ')}>
  {text.split('\n').map((line, i) => <span key={i} className="reveal-line" aria-hidden="true">{line.split(' ').map((word, j) => <span className="reveal-word" key={j}>{word}{j < line.split(' ').length - 1 ? '\u00a0' : ''}</span>)}</span>)}
 </h2>;
}
