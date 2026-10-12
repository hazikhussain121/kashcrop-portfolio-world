import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react';
import { Link } from 'react-router';
import { featuredProjects, media, type Project, type Screen } from '~/data/portfolio/catalog';
import { projectFilms } from '~/data/portfolio/films';
import { Icon } from '../Icon';
import { useMotion } from '../MotionProvider';
import '~/styles/portfolio/overdrive-reel.css';

const reelProjects = featuredProjects.filter(project => project.screens.length || projectFilms[project.slug]);
const count = reelProjects.length;
const mod = (value: number, length: number) => ((value % length) + length) % length;
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const distanceTo = (index: number, position: number) => mod(index - position + count / 2, count) - count / 2;

type PanelStyle = CSSProperties & Record<`--${string}`, string | number>;

function panelStyle(distance: number, depth = 144): PanelStyle {
  const away = Math.abs(distance);
  const visibility = clamp((1.5 - away) / 0.3, 0, 1);

  return {
    '--reel-x': `${distance * 65}%`,
    '--reel-y': `${away * 5}%`,
    '--reel-z': `${16 - away * depth}px`,
    '--reel-turn': `${-11 - distance * 32}deg`,
    '--reel-roll': `${-6 + distance * 11}deg`,
    '--reel-scale': `${1 - away * 0.045}`,
    opacity: visibility,
    zIndex: 100 - Math.round(away * 30),
  };
}

function PhoneScreen({ screen, secondary, priority }: { screen: Screen; secondary?: boolean; priority: boolean }) {
  return <div className={`od-reel-phone ${secondary ? 'od-reel-phone-secondary' : 'od-reel-phone-primary'}`}>
    <img
      src={media(screen.file)}
      alt={screen.name}
      width={screen.width}
      height={screen.height}
      loading="eager"
      decoding="async"
      fetchPriority={priority ? 'high' : 'low'}
      draggable={false}
    />
  </div>;
}

function ProjectPanel({ project, priority }: { project: Project; priority: boolean }) {
  const phone = project.screens.find(screen => screen.kind === 'Mobile');
  const secondPhone = project.screens.find(screen => screen.kind === 'Mobile' && screen.id !== phone?.id && screen.id !== 'orchard-setup')
    ?? project.screens.find(screen => screen.kind === 'Mobile' && screen.id !== phone?.id);
  const desktop = project.screens.find(screen => screen.kind === 'Desktop');
  const film = projectFilms[project.slug];
  const demo = !project.screens.length;

  return <>
    <h3 className="od-reel-panel-name">
      {project.slug === 'plant-health-clinic' ? <><span>Plant Health</span><span>Clinic</span></> : project.name}
    </h3>
    <div className={`od-reel-screens ${phone ? 'od-reel-screens-mobile' : 'od-reel-screens-desktop'}`}>
      {phone ? <>
        {secondPhone && <PhoneScreen screen={secondPhone} secondary priority={false} />}
        <PhoneScreen screen={phone} priority={priority} />
      </> : <div className="od-reel-browser">
        <img
          src={desktop ? media(desktop.file) : film.poster}
          alt={`${project.name}: ${desktop ? desktop.name : 'interface demonstration using sample data'}`}
          width={desktop?.width ?? film.width}
          height={desktop?.height ?? film.height}
          loading="eager"
          decoding="async"
          fetchPriority="low"
          draggable={false}
        />
      </div>}
    </div>
    {demo && <span className="od-reel-demo">Interface demo</span>}
  </>;
}

type Drag = {
  pointerId: number;
  startX: number;
  startY: number;
  lastX: number;
  lastAt: number;
  velocity: number;
  origin: number;
  horizontal: boolean;
};

/** A DOM-first, spring-driven reel. React only updates when the selected project changes. */
export default function ProjectReel() {
  const { reduced } = useMotion();
  const [active, setActive] = useState(0);
  const captionId = useId();
  const helpId = useId();
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const panels = useRef<Array<HTMLElement | null>>([]);
  const drag = useRef<Drag | null>(null);
  const wake = useRef<() => void>(() => {});
  const engine = useRef({
    position: 0,
    target: 0,
    velocity: 0,
    tiltX: 0,
    tiltY: 0,
    tiltTargetX: 0,
    tiltTargetY: 0,
    frame: 0,
    lastAt: 0,
    width: 850,
    depth: 144,
    inView: true,
  });

  useEffect(() => {
    const viewport = stage.current;
    const scene = track.current;
    const element = root.current;
    if (!viewport || !scene || !element || !count) return;

    const motion = engine.current;
    let disposed = false;

    const paint = () => {
      panels.current.forEach((panel, index) => {
        if (!panel) return;
        const style = panelStyle(distanceTo(index, motion.position), motion.depth);
        Object.entries(style).forEach(([property, value]) => {
          if (property.startsWith('--')) panel.style.setProperty(property, String(value));
          else if (property === 'opacity') panel.style.opacity = String(value);
          else if (property === 'zIndex') panel.style.zIndex = String(value);
        });
      });
      scene.style.setProperty('--reel-tilt-x', `${motion.tiltX}deg`);
      scene.style.setProperty('--reel-tilt-y', `${motion.tiltY}deg`);
    };

    const stop = () => {
      if (motion.frame) window.cancelAnimationFrame(motion.frame);
      motion.frame = 0;
      motion.lastAt = 0;
    };

    const settle = () => {
      motion.position = motion.target;
      motion.velocity = 0;
      motion.tiltX = motion.tiltTargetX = 0;
      motion.tiltY = motion.tiltTargetY = 0;
      paint();
    };

    const cancelCapture = () => {
      const pointer = drag.current;
      if (!pointer) return;
      drag.current = null;
      motion.target = pointer.origin;
      motion.position = pointer.origin;
      motion.velocity = 0;
      element.removeAttribute('data-dragging');
      if (viewport.hasPointerCapture(pointer.pointerId)) viewport.releasePointerCapture(pointer.pointerId);
    };

    const tick = (now: number) => {
      motion.frame = 0;
      if (disposed) return;
      if (reduced || !motion.inView || document.hidden) {
        motion.lastAt = 0;
        settle();
        return;
      }

      const delta = Math.min((now - (motion.lastAt || now - 16.67)) / 1000, 0.032);
      motion.lastAt = now;
      const displacement = motion.target - motion.position;

      if (drag.current?.horizontal) {
        // A short follow while held; the release returns to the full spring.
        motion.position += displacement * (1 - Math.exp(-28 * delta));
        motion.velocity = 0;
      } else {
        const force = displacement * 126 - motion.velocity * 20;
        motion.velocity += force * delta;
        motion.position += motion.velocity * delta;
      }

      const follow = 1 - Math.exp(-9 * delta);
      motion.tiltX += (motion.tiltTargetX - motion.tiltX) * follow;
      motion.tiltY += (motion.tiltTargetY - motion.tiltY) * follow;
      paint();

      const moving = Math.abs(motion.target - motion.position) > 0.0003
        || Math.abs(motion.velocity) > 0.002
        || Math.abs(motion.tiltTargetX - motion.tiltX) > 0.008
        || Math.abs(motion.tiltTargetY - motion.tiltY) > 0.008;

      if (moving) motion.frame = window.requestAnimationFrame(tick);
      else {
        motion.position = motion.target;
        motion.velocity = 0;
        motion.lastAt = 0;
        paint();
      }
    };

    const start = () => {
      if (disposed) return;
      if (reduced || !motion.inView || document.hidden) {
        stop();
        settle();
      } else if (!motion.frame) {
        motion.lastAt = 0;
        motion.frame = window.requestAnimationFrame(tick);
      }
    };

    wake.current = start;

    const measure = () => {
      motion.width = viewport.clientWidth;
      motion.depth = clamp(motion.width * 0.17, 65, 144);
      paint();
    };
    measure();
    if (reduced) settle();

    const resize = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    resize?.observe(viewport);

    const intersection = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(([entry]) => {
      motion.inView = entry.isIntersecting;
      if (!motion.inView) cancelCapture();
      start();
    }, { rootMargin: '100px' });
    intersection?.observe(viewport);

    const visibility = () => {
      if (document.hidden) {
        cancelCapture();
        stop();
        settle();
      } else start();
    };
    const blur = () => {
      cancelCapture();
      stop();
      settle();
    };
    document.addEventListener('visibilitychange', visibility);
    window.addEventListener('blur', blur);

    return () => {
      disposed = true;
      stop();
      resize?.disconnect();
      intersection?.disconnect();
      document.removeEventListener('visibilitychange', visibility);
      window.removeEventListener('blur', blur);
      wake.current = () => {};
      cancelCapture();
      element.removeAttribute('data-dragging');
    };
  }, [reduced]);

  const releasePointer = () => {
    const pointer = drag.current;
    drag.current = null;
    root.current?.removeAttribute('data-dragging');
    if (pointer && stage.current?.hasPointerCapture(pointer.pointerId)) stage.current.releasePointerCapture(pointer.pointerId);
  };

  const goTo = (position: number) => {
    releasePointer();
    engine.current.target = position;
    engine.current.tiltTargetX = 0;
    engine.current.tiltTargetY = 0;
    setActive(mod(position, count));
    wake.current();
  };

  const choose = (index: number) => {
    const origin = Math.round(engine.current.target);
    goTo(origin + distanceTo(index, origin));
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(Math.round(engine.current.target) + (event.key === 'ArrowRight' ? 1 : -1));
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      choose(event.key === 'Home' ? 0 : count - 1);
    }
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0 || drag.current) return;
    const origin = Math.round(engine.current.target);
    drag.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      lastAt: event.timeStamp,
      velocity: 0,
      origin,
      horizontal: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    if (event.pointerType === 'mouse') event.preventDefault();
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const pointer = drag.current;
    const motion = engine.current;

    if (!pointer) {
      if (!reduced && event.pointerType === 'mouse') {
        const rect = event.currentTarget.getBoundingClientRect();
        motion.tiltTargetX = -((event.clientY - rect.top) / rect.height - 0.5) * 3;
        motion.tiltTargetY = ((event.clientX - rect.left) / rect.width - 0.5) * 4;
        wake.current();
      }
      return;
    }
    if (event.pointerId !== pointer.pointerId) return;

    const dx = event.clientX - pointer.startX;
    const dy = event.clientY - pointer.startY;
    if (!pointer.horizontal) {
      if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx) * 1.15) {
        goTo(pointer.origin);
        return;
      }
      if (Math.abs(dx) < 7 || Math.abs(dx) < Math.abs(dy)) return;
      pointer.horizontal = true;
      root.current?.setAttribute('data-dragging', 'true');
    }

    const elapsed = event.timeStamp - pointer.lastAt;
    if (elapsed > 0) pointer.velocity = (event.clientX - pointer.lastX) / elapsed;
    pointer.lastX = event.clientX;
    pointer.lastAt = event.timeStamp;
    if (reduced) return;
    event.preventDefault();
    const travel = Math.max(motion.width * 0.41, 140);
    motion.target = pointer.origin + clamp(-dx / travel, -1.1, 1.1);
    motion.tiltTargetX = 0;
    motion.tiltTargetY = clamp(dx / motion.width, -1, 1) * 3;
    wake.current();
  };

  const finishDrag = (event: PointerEvent<HTMLDivElement>, cancelled = false) => {
    const pointer = drag.current;
    if (!pointer || event.pointerId !== pointer.pointerId) return;
    if (!pointer.horizontal || cancelled) {
      goTo(pointer.origin);
      return;
    }

    const dx = event.clientX - pointer.startX;
    const freshVelocity = event.timeStamp - pointer.lastAt < 90 ? pointer.velocity : 0;
    const travel = Math.max(engine.current.width * 0.41, 140);
    const projected = -(dx + freshVelocity * 100) / travel;
    const step = Math.abs(projected) > 0.22 ? Math.sign(projected) : 0;
    goTo(pointer.origin + step);
  };

  const selected = reelProjects[active];
  if (!selected) return null;

  return <div className="od-reel" ref={root} data-motion={reduced ? 'off' : 'on'}>
    <div
      ref={stage}
      className="od-reel-stage"
      role="region"
      aria-roledescription="carousel"
      aria-label="Selected projects"
      aria-describedby={`${helpId} ${captionId}`}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={event => finishDrag(event)}
      onPointerCancel={event => finishDrag(event, true)}
      onLostPointerCapture={event => finishDrag(event, true)}
      onPointerLeave={() => {
        if (drag.current) return;
        engine.current.tiltTargetX = 0;
        engine.current.tiltTargetY = 0;
        wake.current();
      }}
    >
      <div className="od-reel-track" ref={track}>
        {reelProjects.map((project, index) => <article
          className={`od-reel-panel od-reel-panel-${project.theme}`}
          key={project.slug}
          ref={element => { panels.current[index] = element; }}
          style={panelStyle(distanceTo(index, 0))}
          aria-hidden={active !== index}
          aria-roledescription="slide"
          aria-label={`${project.name}, ${index + 1} of ${count}`}
          aria-description={project.source}
        >
          <ProjectPanel project={project} priority={index === 0} />
        </article>)}
      </div>
    </div>
    <p className="od-reel-assist" id={helpId}>Swipe or drag to explore. You can also use the arrow keys and project buttons.</p>
    <div className="od-reel-caption">
      <div className="od-reel-current" id={captionId} aria-live="polite" aria-atomic="true">
        <strong>{selected.name}</strong>
        <span>{selected.kind}</span>
      </div>
      <Link className="od-reel-case" to={`/projects/${selected.slug}`} aria-label={`View the ${selected.name} project`}>
        <span>View project</span><Icon />
      </Link>
    </div>
    <div className="od-reel-toolbar">
      <div className="od-reel-picker" role="group" aria-label="Choose a project">
        {reelProjects.map((project, index) => <button
          key={project.slug}
          type="button"
          aria-pressed={active === index}
          aria-label={`Show ${project.name}`}
          onClick={() => choose(index)}
        >{project.slug === 'plant-health-clinic' ? 'Plant Health' : project.name}</button>)}
      </div>
      <div className="od-reel-arrows" role="group" aria-label="Move through projects">
        <button type="button" aria-label="Previous project" onClick={() => goTo(Math.round(engine.current.target) - 1)}><Icon name="left" /></button>
        <button type="button" aria-label="Next project" onClick={() => goTo(Math.round(engine.current.target) + 1)}><Icon name="right" /></button>
      </div>
    </div>
  </div>;
}
