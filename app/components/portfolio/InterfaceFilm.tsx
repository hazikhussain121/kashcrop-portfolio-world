import { useEffect, useId, useMemo, useRef, useState, type CSSProperties } from 'react';
import type { InterfaceFilmAsset } from '~/data/portfolio/films';
import { canPlayFilm, filmCoordinator } from '~/lib/portfolio/film-playback';
import { useMotion } from './MotionProvider';

type Connection = EventTarget & { saveData?: boolean };
type FilmProps = { film: InterfaceFilmAsset; enabled?: boolean; priority?: boolean; className?: string; caption?: boolean; compact?: boolean };

/** The image is real SSR content. The MP4 has no source until this player wins the visible-film slot. */
export function InterfaceFilm({ film, enabled = true, priority = false, className = '', caption = false, compact = false }: FilmProps) {
 const [phone, setPhone] = useState(false);
 const phoneAsset = !compact ? film.mobile : undefined;
 const source = compact && film.compact ? { ...film, ...film.compact } : phone && phoneAsset ? { ...film, ...phoneAsset } : film;
 const posterSource = compact && film.compact ? { ...film, ...film.compact } : film;
 useEffect(() => { const query = matchMedia('(max-width: 600px)'); const sync = () => setPhone(query.matches); sync(); query.addEventListener('change', sync); return () => query.removeEventListener('change', sync); }, []);
 const id = useId(), root = useRef<HTMLDivElement>(null), video = useRef<HTMLVideoElement>(null), decoder = useRef<HTMLVideoElement | null>(null), generation = useRef(0);
 const { reduced } = useMotion();
 const [ratio, setRatio] = useState(0), [pageVisible, setPageVisible] = useState(false), [saveData, setSaveData] = useState(false);
 const [paused, setPaused] = useState(false), [selected, setSelected] = useState(false), [playing, setPlaying] = useState(false), [failed, setFailed] = useState(false), [ready, setReady] = useState(false);
 useEffect(() => {
  setReady(true);
  const connection = (navigator as Navigator & { connection?: Connection }).connection;
  const visibility = () => setPageVisible(!document.hidden);
  const data = () => setSaveData(Boolean(connection?.saveData));
  visibility(); data();
  document.addEventListener('visibilitychange', visibility);
  connection?.addEventListener?.('change', data);
  return () => { document.removeEventListener('visibilitychange', visibility); connection?.removeEventListener?.('change', data); };
 }, []);
 useEffect(() => {
  const node = root.current;
  if (!node || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(([entry]) => setRatio(entry.isIntersecting ? entry.intersectionRatio : 0), { threshold: [0, .1, .25, .5, .75, 1] });
  observer.observe(node);
  return () => observer.disconnect();
 }, []);
 const controller = useMemo(() => ({
  start() {
   const node = video.current;
   if (!node) return;
   const token = ++generation.current;
   decoder.current = node;
   setSelected(true);
   node.muted = true;
   node.src = source.src;
   node.load();
   node.play().catch(() => { if (token === generation.current) { setPlaying(false); setPaused(true); } });
  },
  stop() {
   ++generation.current;
   const node = decoder.current;
   decoder.current = null;
   if (node?.hasAttribute('src')) { node.pause(); node.removeAttribute('src'); node.load(); }
   setSelected(false);
   setPlaying(false);
  },
 }), [source.src]);
 useEffect(() => setFailed(false), [source.src]);
 const eligible = canPlayFilm({ visible: ratio >= .1, enabled, pageVisible, reducedMotion: reduced, saveData, paused, failed });
 useEffect(() => {
  filmCoordinator.update(id, { ...controller, score: eligible ? ratio : 0 });
 }, [id, controller, eligible, ratio]);
 useEffect(() => () => filmCoordinator.remove(id), [id, controller]);
 const staticReason = !ready ? 'Still frame' : saveData ? 'Data saving · still frame' : reduced ? 'Reduced motion · still frame' : failed ? 'Film unavailable · still frame' : paused ? 'Paused · still frame' : playing ? 'Silent interface film' : 'Interface film · ready';
 return <figure className={`interface-film ${className}`} data-film={film.id} data-playing={playing} data-static={reduced || saveData || failed || paused}>
  <div className="film-frame" ref={root} style={{ '--film-ratio': `${posterSource.width} / ${posterSource.height}`, '--film-mobile-ratio': phoneAsset ? `${phoneAsset.width} / ${phoneAsset.height}` : undefined } as CSSProperties}>
   <picture className="film-poster-picture">{phoneAsset && <source media="(max-width: 600px)" srcSet={phoneAsset.poster} width={phoneAsset.width} height={phoneAsset.height}/>}<img className="film-poster" src={posterSource.poster} alt={`${film.title}: interface recording poster`} width={posterSource.width} height={posterSource.height} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async"/></picture>
   <video ref={video} className="film-video" aria-hidden="true" tabIndex={-1} muted loop playsInline preload="none" poster={source.poster} width={source.width} height={source.height} onPlaying={() => { if (video.current?.hasAttribute('src') && eligible) setPlaying(true); }} onPause={() => setPlaying(false)} onError={() => { if (video.current?.hasAttribute('src')) setFailed(true); }}/>
  </div>
  <figcaption className="film-caption">
   <div className="film-caption-copy">{caption && <p>{film.caption}</p>}<span>{staticReason}</span></div>
   {ready && !reduced && !saveData && !failed && <button className="film-toggle" type="button" aria-label={`${selected && !paused ? 'Pause' : 'Play'} ${film.title} film`} aria-pressed={selected && !paused} onClick={() => { if (selected && !paused) setPaused(true); else { setPaused(false); filmCoordinator.prefer(id); } }}><span aria-hidden="true">{selected && !paused ? 'Ⅱ' : '▷'}</span>{selected && !paused ? 'Pause film' : 'Play film'}</button>}
  </figcaption>
 </figure>;
}
