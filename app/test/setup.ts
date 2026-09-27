import '@testing-library/jest-dom/vitest';

// jsdom does not provide matchMedia. This faithful event surface lets modules
// register responsive animation contexts without pretending to run a browser.
if (!window.matchMedia) {
 Object.defineProperty(window, 'matchMedia', { configurable: true, writable: true, value: (media: string) => {
  const target = new EventTarget();
  return { media, matches: media.includes('prefers-reduced-motion: reduce'), onchange: null,
   addListener: (listener: EventListener) => target.addEventListener('change', listener),
   removeListener: (listener: EventListener) => target.removeEventListener('change', listener),
   addEventListener: target.addEventListener.bind(target), removeEventListener: target.removeEventListener.bind(target), dispatchEvent: target.dispatchEvent.bind(target),
  };
 }});
}
