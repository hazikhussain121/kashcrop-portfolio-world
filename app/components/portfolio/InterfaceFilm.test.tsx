import { cleanup, fireEvent, render, screen, act } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { InterfaceFilm } from './InterfaceFilm';
import { MotionProvider } from './MotionProvider';
import type { InterfaceFilmAsset } from '~/data/portfolio/films';

const film: InterfaceFilmAsset = { id:'demo', title:'Demo workflow', src:'/media/projects/demo/film.mp4', poster:'/media/projects/demo/poster.webp', width:1920, height:1080, caption:'A real workflow.', provenance:'Current local review build · Synthetic demonstration · 2 Oct 2026' };
let observers: { callback: IntersectionObserverCallback; target?: Element }[] = [];
function visible(index=0, ratio=1) { const observer=observers[index]; act(()=>observer.callback([{target:observer.target, isIntersecting:ratio>0, intersectionRatio:ratio} as IntersectionObserverEntry], {} as IntersectionObserver)); }
beforeEach(()=>{
 observers=[];
 vi.stubGlobal('IntersectionObserver', class {
  item: typeof observers[number];
  constructor(callback: IntersectionObserverCallback) { this.item={callback}; observers.push(this.item); }
  observe(target: Element) { this.item.target=target; }
  disconnect() {}
 });
 vi.stubGlobal('matchMedia', vi.fn((media: string)=>({matches:false,media,addEventListener(){},removeEventListener(){}})));
 vi.spyOn(HTMLMediaElement.prototype,'play').mockImplementation(function(this: HTMLMediaElement) { this.dispatchEvent(new Event('playing')); return Promise.resolve(); });
 vi.spyOn(HTMLMediaElement.prototype,'pause').mockImplementation(()=>{});
 vi.spyOn(HTMLMediaElement.prototype,'load').mockImplementation(()=>{});
 Object.defineProperty(navigator,'connection',{configurable:true,value:{saveData:false,addEventListener(){},removeEventListener(){}}});
});
afterEach(()=>{cleanup();vi.unstubAllGlobals();});

describe('interface-film delivery',()=>{
 it('server-renders a real poster and no video source',()=>{
  const html=renderToString(<InterfaceFilm film={film}/>);
  expect(html).toContain('src="/media/projects/demo/poster.webp"');
  expect(html).not.toContain('src="/media/projects/demo/film.mp4"');
  expect(html).toContain('width="1920"');
  expect(html).toContain('playsInline');
 });
 it('defers source until visible and unloads on pause or exit',async()=>{
  const {container}=render(<MotionProvider><InterfaceFilm film={film}/></MotionProvider>);
  const video=container.querySelector('video')!;
  expect(video).not.toHaveAttribute('src');
  visible();
  expect(video).toHaveAttribute('src',film.src);
  fireEvent.click(screen.getByRole('button',{name:'Pause Demo workflow film'}));
  expect(video).not.toHaveAttribute('src');
  fireEvent.click(screen.getByRole('button',{name:'Play Demo workflow film'}));
  expect(video).toHaveAttribute('src',film.src);
  visible(0,0);
  expect(video).not.toHaveAttribute('src');
 });
 it('keeps all films static under reduced motion or data saving',()=>{
  Object.defineProperty(navigator,'connection',{configurable:true,value:{saveData:true,addEventListener(){},removeEventListener(){}}});
  const {container}=render(<MotionProvider><InterfaceFilm film={film}/></MotionProvider>);
  visible();
  expect(container.querySelector('video')).not.toHaveAttribute('src');
  expect(screen.queryByRole('button',{name:/Pause/})).not.toBeInTheDocument();
  expect(screen.getByText(/Data saving/)).toBeVisible();
 });
 it('gives only one visible player a video source',()=>{
  const {container}=render(<MotionProvider><InterfaceFilm film={film}/><InterfaceFilm film={{...film,id:'second',title:'Second workflow'}}/></MotionProvider>);
  visible(0,.5);visible(1,1);
  expect(container.querySelectorAll('video[src]')).toHaveLength(1);
  expect(container.querySelectorAll('video')[1]).toHaveAttribute('src',film.src);
 });
 it('lets an explicit Play action take over the single decoder',()=>{
  const {container}=render(<MotionProvider><InterfaceFilm film={film}/><InterfaceFilm film={{...film,id:'second',title:'Second workflow'}}/></MotionProvider>);
  visible(0,1); visible(1,.5);
  fireEvent.click(screen.getByRole('button',{name:'Play Second workflow film'}));
  expect(container.querySelectorAll('video[src]')).toHaveLength(1);
  expect(container.querySelectorAll('video')[1]).toHaveAttribute('src',film.src);
  fireEvent.click(screen.getByRole('button',{name:'Play Demo workflow film'}));
  expect(container.querySelectorAll('video')[0]).toHaveAttribute('src',film.src);
 });
 it('uses a separately authored compact film without stretching',()=>{
  const compact={src:'/media/projects/demo/film-square.mp4',poster:'/media/projects/demo/poster-square.webp',width:1080,height:1080};
  const html=renderToString(<InterfaceFilm film={{...film,compact}} compact/>);
  expect(html).toContain('src="/media/projects/demo/poster-square.webp"');
  expect(html).toContain('height="1080"');
  expect(html).toContain('width="1080"');
 });
 it('server-renders the phone poster and fixed ratio, then loads only the phone source',()=>{
  const mobile={src:'/media/projects/demo/film-mobile.mp4',poster:'/media/projects/demo/poster-mobile.webp',width:430,height:932,caption:'A phone workflow.'};
  const html=renderToString(<InterfaceFilm film={{...film,mobile}}/>);
  expect(html).toContain('srcSet="/media/projects/demo/poster-mobile.webp"');
  expect(html).toContain('--film-mobile-ratio:430 / 932');
  vi.stubGlobal('matchMedia',vi.fn((media:string)=>({matches:media.includes('max-width'),media,addEventListener(){},removeEventListener(){}})));
  const {container}=render(<MotionProvider><InterfaceFilm film={{...film,mobile}}/></MotionProvider>);
  visible();
  expect(container.querySelectorAll('video')).toHaveLength(1);
  expect(container.querySelector('video')).toHaveAttribute('src',mobile.src);
 });
 it('unloads the original element after React detaches its DOM ref',()=>{
  const {container,unmount}=render(<MotionProvider><InterfaceFilm film={film}/></MotionProvider>);
  visible();
  const original=container.querySelector('video')!;
  expect(original).toHaveAttribute('src',film.src);
  unmount();
  expect(original).not.toHaveAttribute('src');
 });
 it('recovers when a failed source is replaced by another project',()=>{
  const {container,rerender}=render(<MotionProvider><InterfaceFilm film={film}/></MotionProvider>);
  visible();
  fireEvent.error(container.querySelector('video')!);
  expect(container.querySelector('video')).not.toHaveAttribute('src');
  rerender(<MotionProvider><InterfaceFilm film={{...film,id:'replacement',src:'/media/projects/replacement/film.mp4'}}/></MotionProvider>);
  expect(container.querySelector('video')).toHaveAttribute('src','/media/projects/replacement/film.mp4');
 });
 it('releases the decoder while the document is hidden',()=>{
  const {container}=render(<MotionProvider><InterfaceFilm film={film}/></MotionProvider>);
  visible();
  Object.defineProperty(document,'hidden',{configurable:true,value:true});
  act(()=>document.dispatchEvent(new Event('visibilitychange')));
  expect(container.querySelector('video')).not.toHaveAttribute('src');
  Object.defineProperty(document,'hidden',{configurable:true,value:false});
 });
});
