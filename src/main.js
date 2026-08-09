// Vizier — WebGL site.
//  1) hero "conduit": a scroll-choreographed 3D scene where the core MORPHS
//     through the engine's four states (Unify / Reason / Act / Improve).
//  2) the conduit FADES OUT past the hero so the Work index reads cleanly.
//  3) a quiet Work index; rows open a full-screen case study with Mermaid diagrams.
//     Mermaid is loaded lazily (only when a case opens) so the hero stays fast.
//  4) magnetic buttons + ambient cursor glow (native cursor kept).
import * as THREE from 'three';
import Lenis from 'lenis';
import gsap from 'gsap';
import './style.css';
import { projects } from './content.js';

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(pointer: fine)').matches;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const sm = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
const lerp = (a, b, t) => a + (b - a) * t;
const isMobile = () => innerWidth <= 820;

/* ============================================================
   COMPANY HERO — a real systems flow, animated as one instrument
   ============================================================ */
(function heroSystemsFlow() {
  const motion = document.querySelector('.company-hero-motion');
  if (!motion) return;
  const nodesIn = motion.querySelectorAll('.motion-node-input');
  const nodesOut = motion.querySelectorAll('.motion-node-output');
  const core = motion.querySelector('.motion-core');
  const paths = [...motion.querySelectorAll('.motion-path')];
  const pulses = [...motion.querySelectorAll('.motion-pulse')];
  const scan = motion.querySelector('.core-scan');

  paths.forEach((path) => {
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: reduce ? 0 : length });
  });

  if (reduce) {
    gsap.set([nodesIn, nodesOut, core], { opacity: 1 });
    return;
  }

  const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
  intro
    .from(nodesIn, { opacity: 0, x: -16, duration: .7, stagger: .12 })
    .from(core, { opacity: 0, scale: .92, transformOrigin: '50% 50%', duration: .9 }, '-=.45')
    .to(paths.slice(0, 3), { strokeDashoffset: 0, duration: .8, stagger: .08 }, '-=.55')
    .to(paths.slice(3), { strokeDashoffset: 0, duration: .8, stagger: .08 }, '-=.35')
    .from(nodesOut, { opacity: 0, x: 16, duration: .7, stagger: .12 }, '-=.55');

  gsap.to(scan, { y: 100, duration: 2.2, ease: 'sine.inOut', repeat: -1, yoyo: true });

  pulses.forEach((pulse, index) => {
    const path = motion.querySelector(`#${pulse.dataset.path}`);
    const length = path.getTotalLength();
    const travel = { progress: 0 };
    const loop = gsap.timeline({ repeat: -1, delay: .9 + index * .42, repeatDelay: 1.15 });
    loop
      .set(pulse, { opacity: 0 })
      .set(travel, { progress: 0 }, 0)
      .to(pulse, { opacity: 1, duration: .18 })
      .to(travel, {
        progress: 1,
        duration: 1.7,
        ease: 'none',
        onUpdate: () => {
          const point = path.getPointAtLength(travel.progress * length);
          gsap.set(pulse, { attr: { cx: point.x, cy: point.y } });
        },
      }, 0)
      .to(pulse, { opacity: 0, duration: .2 }, 1.5);
  });
})();

// Smooth, damped scroll so the scroll-driven hero never skips a beat on a
// fast mouse wheel. Native scroll events still fire, so vizierP + reveals work.
let lenis = null;
if (!reduce) {
  const touch = matchMedia('(pointer: coarse)').matches;
  lenis = new Lenis({ duration: touch ? 2.2 : 1.8, easing: (t) => 1 - Math.pow(1 - t, 3), wheelMultiplier: 0.85, touchMultiplier: touch ? 0.7 : 1.1, syncTouch: true, syncTouchLerp: 0.08 });
  function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);
}

const vizierEl = document.getElementById('vizier');
let vizierP = 0;
function computeVizierP() {
  const total = vizierEl.offsetHeight - innerHeight;
  vizierP = total > 0 ? clamp(-vizierEl.getBoundingClientRect().top / total, 0, 1) : 0;
}
addEventListener('scroll', computeVizierP, { passive: true });
addEventListener('resize', computeVizierP); computeVizierP();

// Fade the WebGL scene out as the hero leaves, so the portfolio + rest of the
// page read without the animation competing behind the text.
const sceneCanvas = document.getElementById('scene');
function dimScene() {
  const rect = vizierEl.getBoundingClientRect();
  const inVizier = clamp(1 - Math.abs(rect.top + innerHeight * 0.18) / (innerHeight * 1.35), 0, 1);
  const before = rect.top > innerHeight * 0.18;
  const after = rect.bottom < innerHeight * 0.22;
  const opacity = after ? 0.12 : before ? 0.78 : 0.78 + 0.18 * inVizier;
  sceneCanvas.style.opacity = opacity.toFixed(3);
}
addEventListener('scroll', dimScene, { passive: true });
addEventListener('resize', dimScene); dimScene();

/* ============================================================
   1. HERO CONDUIT — a morphing four-state instrument
   ============================================================ */
(function conduit() {
  const canvas = document.getElementById('scene');
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (e) { canvas.style.display = 'none'; return; }

  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2('#16171c', 0.05);
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 13);

  const group = new THREE.Group();
  scene.add(group);

  const R = 2.15;

  const coreGeo = new THREE.IcosahedronGeometry(R, 4);
  const basePos = Float32Array.from(coreGeo.attributes.position.array);
  const vCount = basePos.length / 3;
  const dir = new Float32Array(basePos.length);
  const gem = new Float32Array(basePos.length);

  const PHI = (1 + Math.sqrt(5)) / 2;
  const faceN = [
    [0, 1, PHI], [0, 1, -PHI], [0, -1, PHI], [0, -1, -PHI],
    [1, PHI, 0], [1, -PHI, 0], [-1, PHI, 0], [-1, -PHI, 0],
    [PHI, 0, 1], [PHI, 0, -1], [-PHI, 0, 1], [-PHI, 0, -1],
  ].map(([x, y, z]) => { const l = Math.hypot(x, y, z); return [x / l, y / l, z / l]; });

  for (let i = 0; i < vCount; i++) {
    const x = basePos[i * 3], y = basePos[i * 3 + 1], z = basePos[i * 3 + 2];
    const len = Math.hypot(x, y, z) || 1;
    const nx = x / len, ny = y / len, nz = z / len;
    dir[i * 3] = nx; dir[i * 3 + 1] = ny; dir[i * 3 + 2] = nz;
    let maxDot = 1e-4;
    for (let k = 0; k < faceN.length; k++) {
      const d = nx * faceN[k][0] + ny * faceN[k][1] + nz * faceN[k][2];
      if (d > maxDot) maxDot = d;
    }
    const gr = R / maxDot;
    gem[i * 3] = nx * gr; gem[i * 3 + 1] = ny * gr; gem[i * 3 + 2] = nz * gr;
  }

  const cBlob = new THREE.Color('#2d3038');
  const cGem = new THREE.Color('#454b57');
  const coreMat = new THREE.MeshStandardMaterial({ color: cBlob.clone(), metalness: 0.5, roughness: 0.4, flatShading: true, transparent: true, opacity: 1 });
  const core = new THREE.Mesh(coreGeo, coreMat);
  group.add(core);

  const wire = new THREE.LineSegments(
    new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(R + 0.14, 2)),
    new THREE.LineBasicMaterial({ color: '#9aa0ad', transparent: true, opacity: 0.14 })
  );
  group.add(wire);

  const nucleus = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.7, 1),
    new THREE.MeshStandardMaterial({ color: '#e8eaef', metalness: 0.2, roughness: 0.55, flatShading: true, transparent: true, opacity: 0.0 })
  );
  group.add(nucleus);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(3.05, 0.018, 8, 140),
    new THREE.MeshBasicMaterial({ color: '#cfd3dc', transparent: true, opacity: 0 })
  );
  ring.rotation.x = Math.PI / 2.15;
  group.add(ring);

  const accretion = Array.from({ length: 3 }, () => {
    const m = new THREE.Mesh(
      new THREE.TorusGeometry(2.6, 0.012, 6, 120),
      new THREE.MeshBasicMaterial({ color: '#cfd3dc', transparent: true, opacity: 0 })
    );
    m.rotation.x = Math.PI / 2.15;
    group.add(m);
    return m;
  });

  const NODES = 92;
  const nodeHome = new Float32Array(NODES * 3);
  const nodeCur = new Float32Array(NODES * 3);
  for (let i = 0; i < NODES; i++) {
    let x, y, z, d2;
    do { x = Math.random() * 2 - 1; y = Math.random() * 2 - 1; z = Math.random() * 2 - 1; d2 = x * x + y * y + z * z; } while (d2 > 1 || d2 < 1e-4);
    const l = Math.sqrt(d2);
    const r = 1.78 * Math.cbrt(Math.random());
    nodeHome[i * 3] = x / l * r; nodeHome[i * 3 + 1] = y / l * r; nodeHome[i * 3 + 2] = z / l * r;
    nodeCur[i * 3] = nodeHome[i * 3]; nodeCur[i * 3 + 1] = nodeHome[i * 3 + 1]; nodeCur[i * 3 + 2] = nodeHome[i * 3 + 2];
  }
  const nodeGeo = new THREE.BufferGeometry();
  nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodeCur, 3));
  const nodePts = new THREE.Points(nodeGeo, new THREE.PointsMaterial({ color: '#dfe3ea', size: 0.085, sizeAttenuation: true, transparent: true, opacity: 0, depthWrite: false, depthTest: false }));
  group.add(nodePts);

  const edges = [];
  {
    const seen = new Set();
    for (let i = 0; i < NODES; i++) {
      const dists = [];
      for (let j = 0; j < NODES; j++) if (j !== i) {
        const dx = nodeHome[i * 3] - nodeHome[j * 3], dy = nodeHome[i * 3 + 1] - nodeHome[j * 3 + 1], dz = nodeHome[i * 3 + 2] - nodeHome[j * 3 + 2];
        dists.push([dx * dx + dy * dy + dz * dz, j]);
      }
      dists.sort((a, b) => a[0] - b[0]);
      const k = 2 + (i % 2);
      for (let n = 0; n < k; n++) {
        const j = dists[n][1];
        const key = i < j ? i + '_' + j : j + '_' + i;
        if (!seen.has(key)) { seen.add(key); edges.push([i, j]); }
      }
    }
  }
  const EDGES = edges.length;
  const edgeGeo = new THREE.BufferGeometry();
  const edgePos = new Float32Array(EDGES * 2 * 3);
  edgeGeo.setAttribute('position', new THREE.BufferAttribute(edgePos, 3));
  const edgeLines = new THREE.LineSegments(edgeGeo, new THREE.LineBasicMaterial({ color: '#aeb4c2', transparent: true, opacity: 0, depthWrite: false, depthTest: false }));
  group.add(edgeLines);

  const SIGNALS = 34;
  const sig = Array.from({ length: SIGNALS }, () => ({ e: Math.floor(Math.random() * EDGES), t: Math.random(), spd: 0.7 + Math.random() * 1.1 }));
  const sigGeo = new THREE.BufferGeometry();
  const sigPos = new Float32Array(SIGNALS * 3);
  sigGeo.setAttribute('position', new THREE.BufferAttribute(sigPos, 3));
  const sigPts = new THREE.Points(sigGeo, new THREE.PointsMaterial({ color: '#ffffff', size: 0.12, sizeAttenuation: true, transparent: true, opacity: 0, depthWrite: false, depthTest: false }));
  group.add(sigPts);

  const COUNT = 2800;
  const pGeo = new THREE.BufferGeometry();
  const cur = new Float32Array(COUNT * 3);
  const scat = new Float32Array(COUNT * 3);
  const shell = new Float32Array(COUNT * 3);
  const laneX = new Float32Array(COUNT);
  const laneZ = new Float32Array(COUNT);
  const phase = new Float32Array(COUNT);
  const cols = 9;
  for (let i = 0; i < COUNT; i++) {
    scat[i * 3] = (Math.random() - 0.5) * 20;
    scat[i * 3 + 1] = (Math.random() - 0.5) * 16;
    scat[i * 3 + 2] = (Math.random() - 0.5) * 20;
    let vx = Math.random() * 2 - 1, vy = Math.random() * 2 - 1, vz = Math.random() * 2 - 1;
    const l = Math.hypot(vx, vy, vz) || 1; vx /= l; vy /= l; vz /= l;
    const sr = R + 0.5 + Math.random() * 1.3;
    shell[i * 3] = vx * sr; shell[i * 3 + 1] = vy * sr; shell[i * 3 + 2] = vz * sr;
    laneX[i] = ((i % cols) / (cols - 1) - 0.5) * 6.4;
    laneZ[i] = (((i * 7) % 5) / 4 - 0.5) * 1.6;
    phase[i] = Math.random();
    cur[i * 3] = scat[i * 3]; cur[i * 3 + 1] = scat[i * 3 + 1]; cur[i * 3 + 2] = scat[i * 3 + 2];
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(cur, 3));
  const points = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: '#cfd3dc', size: 0.05, sizeAttenuation: true, transparent: true, opacity: 0.8, depthWrite: false }));
  scene.add(points);

  scene.add(new THREE.AmbientLight('#3a3d47', 1.15));
  const key = new THREE.DirectionalLight('#ffffff', 2.2); key.position.set(4, 6, 6); scene.add(key);
  const rim = new THREE.DirectionalLight('#aeb4c2', 1.4); rim.position.set(-6, -2, -4); scene.add(rim);
  const fill = new THREE.PointLight('#ffffff', 12, 32); fill.position.set(0, 0, 5); scene.add(fill);

  const n3 = (x, y, z) => Math.sin(x * 1.7 + y * 2.3) * 0.5 + Math.sin(y * 1.9 + z * 2.1) * 0.32 + Math.sin(z * 1.3 + x * 1.1) * 0.18;

  let px = 0, py = 0, tx = 0, ty = 0;
  addEventListener('pointermove', (e) => { tx = e.clientX / innerWidth - 0.5; ty = e.clientY / innerHeight - 0.5; }, { passive: true });

  let offX = 0;
  function resize() {
    renderer.setSize(innerWidth, innerHeight, false);
    camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
    offX = innerWidth > 900 ? 2.6 : 0;
    group.position.x = offX; points.position.x = offX;
  }
  addEventListener('resize', resize); resize();

  const corePosAttr = coreGeo.attributes.position;
  const clock = new THREE.Clock();
  // Scroll selects a stage, but it never scrubs the geometry between stages.
  // Once a threshold is crossed, the current morph completes on its own clock.
  // Hysteresis prevents a trackpad hovering at a seam from immediately reversing.
  const stageCenters = [0.12, 0.40, 0.64, 0.90];
  const stageTriggers = [0.26, 0.52, 0.77];
  const stageHysteresis = 0.02;
  const initialStage = vizierP < stageTriggers[0] ? 0 : vizierP < stageTriggers[1] ? 1 : vizierP < stageTriggers[2] ? 2 : 3;
  const morphDriver = { stage: initialStage };
  let latchedStage = initialStage;
  let morphing = false;

  function desiredStage(progress, current) {
    let desired = current;
    while (desired < 3 && progress >= stageTriggers[desired] + stageHysteresis) desired++;
    while (desired > 0 && progress <= stageTriggers[desired - 1] - stageHysteresis) desired--;
    return desired;
  }

  function triggerNextMorph() {
    if (morphing) return;
    const desired = desiredStage(vizierP, latchedStage);
    if (desired === latchedStage) return;
    const next = latchedStage + Math.sign(desired - latchedStage);
    morphing = true;
    dispatchEvent(new CustomEvent('vizier-stage-change', { detail: { stage: next } }));
    gsap.to(morphDriver, {
      stage: next,
      duration: reduce ? 0 : 1.8,
      ease: 'power2.inOut',
      overwrite: false,
      onComplete: () => {
        latchedStage = next;
        morphing = false;
        triggerNextMorph();
      },
    });
  }

  function frame() {
    if (parseFloat(sceneCanvas.style.opacity || '1') < 0.02) { requestAnimationFrame(frame); return; }
    const t = clock.getElapsedTime();
    px += (tx - px) * 0.022; py += (ty - py) * 0.022;
    triggerNextMorph();
    const stageLow = Math.floor(morphDriver.stage);
    const stageHigh = Math.min(3, stageLow + 1);
    const stageMix = morphDriver.stage - stageLow;
    const P = lerp(stageCenters[stageLow], stageCenters[stageHigh], stageMix);

    // Four states as a smooth PARTITION OF UNITY across the scroll. Only ever
    // two adjacent states are active at once and their weights sum to 1, so the
    // conduit always crossfades cleanly from one shape to the next: no gaps,
    // no double-counting, no frantic jumps between overlapping ranges.
    const kUnify = 0.12, kReason = 0.40, kAct = 0.64, kImprove = 0.90;
    let wUnify, wReason, wAct, wImprove;
    if (P <= kUnify) { wUnify = 1; wReason = 0; wAct = 0; wImprove = 0; }
    else if (P < kReason) { const f = sm(kUnify, kReason, P); wUnify = 1 - f; wReason = f; wAct = 0; wImprove = 0; }
    else if (P < kAct) { const f = sm(kReason, kAct, P); wUnify = 0; wReason = 1 - f; wAct = f; wImprove = 0; }
    else if (P < kImprove) { const f = sm(kAct, kImprove, P); wUnify = 0; wReason = 0; wAct = 1 - f; wImprove = f; }
    else { wUnify = 0; wReason = 0; wAct = 0; wImprove = 1; }

    const loose = wUnify;
    const gather = sm(0.04, 0.24, P);
    const reason = wReason;
    const crystalline = wAct + wImprove;
    const actStream = wAct;
    const improve = wImprove;
    const shine = crystalline;

    const arr = corePosAttr.array;
    const spin = t * (0.6 + 1.4 * reason);
    for (let i = 0; i < vCount; i++) {
      const nx = dir[i * 3], ny = dir[i * 3 + 1], nz = dir[i * 3 + 2];
      const bx = basePos[i * 3], by = basePos[i * 3 + 1], bz = basePos[i * 3 + 2];
      const looseD = n3(bx * 0.6 + t * 0.25, by * 0.6, bz * 0.6) * 0.55 * loose;
      const s = Math.pow(Math.max(0, Math.sin(nx * 5 + ny * 4 - nz * 3 + spin)), 3);
      const spikeD = s * 0.30 * reason;
      const d = looseD + spikeD;
      let x = bx + nx * d, y = by + ny * d, z = bz + nz * d;
      const refine = improve * 0.05 * Math.sin(t * 0.9 + (nx + ny + nz) * 3);
      const gx = gem[i * 3] * (1 + refine), gy = gem[i * 3 + 1] * (1 + refine), gz = gem[i * 3 + 2] * (1 + refine);
      x = lerp(x, gx, crystalline);
      y = lerp(y, gy, crystalline);
      z = lerp(z, gz, crystalline);
      arr[i * 3] = x; arr[i * 3 + 1] = y; arr[i * 3 + 2] = z;
    }
    corePosAttr.needsUpdate = true;
    coreGeo.computeVertexNormals();

    coreMat.color.copy(cBlob).lerp(cGem, shine);
    coreMat.metalness = 0.5 + 0.28 * shine;
    coreMat.roughness = 0.4 - 0.14 * shine;
    coreMat.opacity = 1 - 0.74 * reason;
    core.scale.setScalar(1 + Math.sin(t * 1.1) * (0.015 + 0.03 * reason) + 0.02 * improve * Math.sin(t * 1.6));

    wire.rotation.y = t * 0.1; wire.rotation.x = -0.1;
    const wPulse = 0.5 + 0.5 * Math.sin(t * 2.2);
    wire.material.opacity = 0.14 * (1 - crystalline * 0.5) + 0.06 * reason + (0.28 + 0.22 * wPulse) * improve;
    wire.material.color.setStyle(improve > 0.4 ? '#d6dae2' : '#9aa0ad');

    nucleus.material.opacity = 0.18 * (1 - reason) + 0.5 * shine;
    nucleus.scale.setScalar(0.9 + 0.2 * shine + 0.08 * improve);
    nucleus.rotation.y = -t * 0.4; nucleus.rotation.x = t * 0.25;

    ring.material.opacity = 0.3 * reason;
    ring.rotation.z = t * (0.4 + 1.8 * reason);

    accretion.forEach((m, i) => {
      if (improve <= 0.001) { m.material.opacity = 0; return; }
      const local = (t * 0.35 + i / accretion.length) % 1;
      const s = 1 + local * 1.3;
      m.scale.set(s, s, s);
      m.material.opacity = improve * (1 - local) * 0.5;
      m.rotation.z = t * 0.2 + i;
    });

    if (reason > 0.001) {
      for (let i = 0; i < NODES; i++) {
        nodeCur[i * 3] = nodeHome[i * 3] + Math.sin(t * 0.8 + i * 1.3) * 0.06;
        nodeCur[i * 3 + 1] = nodeHome[i * 3 + 1] + Math.sin(t * 0.9 + i * 2.1) * 0.06;
        nodeCur[i * 3 + 2] = nodeHome[i * 3 + 2] + Math.cos(t * 0.7 + i * 0.7) * 0.06;
      }
      nodeGeo.attributes.position.needsUpdate = true;
      for (let k = 0; k < EDGES; k++) {
        const a = edges[k][0], b = edges[k][1];
        edgePos[k * 6] = nodeCur[a * 3]; edgePos[k * 6 + 1] = nodeCur[a * 3 + 1]; edgePos[k * 6 + 2] = nodeCur[a * 3 + 2];
        edgePos[k * 6 + 3] = nodeCur[b * 3]; edgePos[k * 6 + 4] = nodeCur[b * 3 + 1]; edgePos[k * 6 + 5] = nodeCur[b * 3 + 2];
      }
      edgeGeo.attributes.position.needsUpdate = true;
      for (let sI = 0; sI < SIGNALS; sI++) {
        const sg = sig[sI];
        sg.t += sg.spd * 0.016;
        if (sg.t >= 1) { sg.t = 0; sg.e = Math.floor(Math.random() * EDGES); sg.spd = 0.7 + Math.random() * 1.1; }
        const a = edges[sg.e][0], b = edges[sg.e][1];
        sigPos[sI * 3] = lerp(nodeCur[a * 3], nodeCur[b * 3], sg.t);
        sigPos[sI * 3 + 1] = lerp(nodeCur[a * 3 + 1], nodeCur[b * 3 + 1], sg.t);
        sigPos[sI * 3 + 2] = lerp(nodeCur[a * 3 + 2], nodeCur[b * 3 + 2], sg.t);
      }
      sigGeo.attributes.position.needsUpdate = true;
    }
    const netFade = Math.pow(reason, 0.7);
    nodePts.material.opacity = 0.85 * netFade;
    edgeLines.material.opacity = 0.34 * netFade;
    sigPts.material.opacity = netFade;

    const cp = pGeo.attributes.position.array;
    const topY = 7.5, span = 15, speed = 3.2;
    for (let i = 0; i < COUNT; i++) {
      let gx = lerp(scat[i * 3], shell[i * 3], gather);
      let gy = lerp(scat[i * 3 + 1], shell[i * 3 + 1], gather);
      let gz = lerp(scat[i * 3 + 2], shell[i * 3 + 2], gather);
      if (reason > 0) {
        const a = t * 0.25 + phase[i] * 6.28;
        gx += Math.cos(a) * 0.15 * reason;
        gz += Math.sin(a) * 0.15 * reason;
      }
      if (actStream > 0) {
        const y = topY - ((t * speed + phase[i] * span) % span);
        gx = lerp(gx, laneX[i], actStream);
        gy = lerp(gy, y, actStream);
        gz = lerp(gz, laneZ[i], actStream);
      }
      if (improve > 0) {
        const local = (t * 0.22 + phase[i]) % 1;
        const rad = lerp(5.5, R + 0.15, local);
        const ang = phase[i] * 6.2832 + local * 7 + t * 0.25;
        gx = lerp(gx, Math.cos(ang) * rad, improve);
        gy = lerp(gy, (phase[i] - 0.5) * lerp(7, 0.5, local), improve);
        gz = lerp(gz, Math.sin(ang) * rad, improve);
      }
      const e = 0.06 + 0.06 * gather;
      cp[i * 3] += (gx - cp[i * 3]) * e;
      cp[i * 3 + 1] += (gy - cp[i * 3 + 1]) * e;
      cp[i * 3 + 2] += (gz - cp[i * 3 + 2]) * e;
    }
    pGeo.attributes.position.needsUpdate = true;
    points.material.opacity = (0.55 + 0.35 * Math.max(gather * (1 - actStream * 0.3), actStream, improve * 0.8)) * (1 - 0.45 * reason);
    points.material.size = 0.05 + 0.02 * actStream + 0.015 * improve;

    // The faceted core belongs to the portfolio/Vizier story, not the company
    // opening. Keep the ambient particle field in the hero, then reveal the
    // core only as Selected Work enters the viewport.
    const workTop = document.getElementById('work').getBoundingClientRect().top;
    const coreReveal = reduce
      ? (workTop < innerHeight ? 1 : 0)
      : sm(0, 1, (innerHeight - workTop) / (innerHeight * 0.6));
    coreMat.opacity *= coreReveal;
    wire.material.opacity *= coreReveal;
    nucleus.material.opacity *= coreReveal;
    ring.material.opacity *= coreReveal;
    accretion.forEach((m) => { m.material.opacity *= coreReveal; });
    nodePts.material.opacity *= coreReveal;
    edgeLines.material.opacity *= coreReveal;
    sigPts.material.opacity *= coreReveal;

    if (!reduce) {
      group.rotation.y = t * (0.12 + 0.35 * reason + 0.1 * improve) + px * 0.5;
      group.rotation.x = -0.1 + py * 0.35;
    }
    const baseZ = isMobile() ? 18.5 : 13;
    const dolly = isMobile() ? 2.2 : 3.4;
    camera.position.z = baseZ - P * dolly;
    camera.position.y = P * (isMobile() ? 0.7 : 1.1);
    group.position.y = -P * 1.0; points.position.y = group.position.y;
    camera.lookAt(offX * 0.5, group.position.y, 0);

    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }

  if (reduce) { vizierP = 0.2; frame(); } else { frame(); }
})();

/* ============================================================
   2. HERO PHASE CAPTIONS (synced to scroll)
   ============================================================ */
(function vizierPhases() {
  const copy = document.querySelector('.hero-copy');
  const phases = [...document.querySelectorAll('.hero .phase')];
  const railFill = document.getElementById('hero-rail-fill');
  let shown = -1;
  const stageAt = (p) => p < 0.26 ? 0 : p < 0.52 ? 1 : p < 0.77 ? 2 : 3;

  function show(idx) {
    if (idx === shown) return;
    shown = idx;
    copy.classList.toggle('on', idx === 0);
    phases.forEach((ph) => ph.classList.toggle('on', Number(ph.dataset.phase) === idx));
  }

  show(vizierP < 0.06 ? 0 : stageAt(vizierP) + 1);
  addEventListener('vizier-stage-change', (event) => show(event.detail.stage + 1));

  function tick() {
    if (railFill) railFill.style.transform = `scaleY(${vizierP.toFixed(4)})`;
    if (shown === 0 && vizierP >= 0.07) show(1);
    else if (shown === 1 && vizierP <= 0.04) show(0);
    requestAnimationFrame(tick);
  }
  tick();
})();

/* ============================================================
   3. MERMAID (lazy: loaded only when a case study opens)
   Graphite theme so diagrams match the brand.
   ============================================================ */
let mermaidPromise = null;
function loadMermaid() {
  if (!mermaidPromise) {
    mermaidPromise = import('mermaid').then(({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'strict',
        theme: 'base',
        fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
        themeVariables: {
          background: 'transparent',
          primaryColor: '#22252d',
          primaryBorderColor: '#3c414c',
          primaryTextColor: '#e7e9ee',
          secondaryColor: '#282c35',
          tertiaryColor: '#1c1f26',
          lineColor: '#8b91a0',
          textColor: '#c7cbd4',
          fontSize: '14px',
          clusterBkg: '#1b1d24',
          clusterBorder: '#3c414c',
          edgeLabelBackground: '#1b1d24',
          nodeBorder: '#3c414c',
        },
      });
      return mermaid;
    });
  }
  return mermaidPromise;
}
let mmdSeq = 0;
async function renderDiagrams(root) {
  const holders = root.querySelectorAll('.mmd-holder');
  if (!holders.length) return;
  let mermaid;
  try { mermaid = await loadMermaid(); }
  catch (e) { holders.forEach((h) => { h.innerHTML = '<p class="mmd-fail">diagram unavailable</p>'; }); return; }
  for (const h of holders) {
    const code = h.dataset.code;
    if (!code) continue;
    try {
      const { svg } = await mermaid.render('mmd-' + (mmdSeq++), code);
      h.innerHTML = svg;
    } catch (err) {
      h.innerHTML = '<p class="mmd-fail">diagram unavailable</p>';
    }
  }
}

/* ============================================================
   4. WORK INDEX + FULL-SCREEN CASE STUDY
   ============================================================ */
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const indexEl = document.getElementById('work-index');
if (indexEl) {
  indexEl.innerHTML = projects.map((p) => `
    <li class="wrow reveal" data-slug="${p.slug}" tabindex="0" role="button" aria-label="Open case study: ${esc(p.name)}">
      <span class="wrow-no">${p.no}</span>
      <span class="wrow-main">
        <span class="wrow-name">${esc(p.name)}</span>
        <span class="wrow-blurb">${esc(p.blurb)}</span>
      </span>
      <span class="wrow-kind">${esc(p.kind)}</span>
      <span class="wrow-open"><span>Case study</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </span>
    </li>`).join('');
}

const scrim = document.getElementById('case-scrim');
const caseEl = document.getElementById('case');
let lastFocus = null, open = false;

function markSVG() {
  return `<span class="mark" aria-hidden="true"><svg viewBox="0 0 40 40"><path class="mk-i" d="M11 6 L20 12 L29 6"/><path class="mk-r" d="M15 12 Q13 20 15 30"/><path class="mk-r" d="M25 12 Q27 20 25 30"/><rect class="mk-c" x="15.5" y="15.5" width="9" height="9" rx="1.6" transform="rotate(45 20 20)"/><circle class="mk-n" cx="20" cy="9" r="2"/><path class="mk-o" d="M13 33 L20 30 L27 33"/></svg></span>`;
}

function render(p) {
  const facts = p.facts.map((f) => `<div class="case-fact"><dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div>`).join('');
  const feats = p.features.map((f) => `<li>${esc(f)}</li>`).join('');
  const stack = p.stack.map((s) => `<span>${esc(s)}</span>`).join('');

  const vizierPanel = p.vizier ? `<section class="case-vizier"><div class="case-vizier-head">${markSVG()}<span>Verified Vizier involvement</span></div><h3>${esc(p.vizier.headline)}</h3><ol class="case-steps">${p.vizier.steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol></section>` : "";
  const links = p.links.length
    ? `<div class="case-links">${p.links.map((l) => `<a href="${l.href}" target="_blank" rel="noopener">${esc(l.label)}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg></a>`).join('')}</div>` : '';
  const overview = p.overview.map((o) => `<p>${esc(o)}</p>`).join('');
  const diagrams = (p.diagrams && p.diagrams.length)
    ? `<section class="case-diagrams">
        <h4>How it fits together</h4>
        <div class="mmd-grid">${p.diagrams.map((d) => `
          <figure class="mmd">
            <div class="mmd-holder" data-code="${esc(d.code)}"></div>
            <figcaption>${esc(d.title)}</figcaption>
          </figure>`).join('')}</div>
      </section>` : '';

  caseEl.innerHTML = `
    <button class="case-close" aria-label="Close case study">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
    </button>
    <article class="case-inner">
      <header class="case-head">
        <div class="case-eyebrow"><span class="case-no">${p.no}</span><span>${esc(p.kind)}</span><span class="case-yr tnum">${p.year}</span></div>
        <h2 id="case-title">${esc(p.name)}</h2>
        <p class="case-tagline">${esc(p.tagline)}</p>
      </header>

      <div class="case-overview">${overview}</div>

      ${vizierPanel}

      ${diagrams}

      <div class="case-grid">
        <div class="case-block">
          <h4>What it does</h4>
          <ul class="case-feats">${feats}</ul>
        </div>
        <div class="case-block">
          <h4>Built with</h4>
          <div class="case-stack">${stack}</div>
          <dl class="case-facts">${facts}</dl>
        </div>
      </div>

      ${links}
    </article>`;

  caseEl.querySelector('.case-close').addEventListener('click', close);
  renderDiagrams(caseEl);
}

function openCase(slug) {
  const p = projects.find((x) => x.slug === slug);
  if (!p) return;
  lastFocus = document.activeElement;
  render(p);
  scrim.hidden = false; caseEl.hidden = false;
  document.body.style.overflow = 'hidden';
  if (lenis) lenis.stop();
  caseEl.scrollTop = 0;
  requestAnimationFrame(() => { scrim.classList.add('on'); caseEl.classList.add('on'); });
  open = true;
  caseEl.querySelector('.case-close').focus();
}
function close() {
  if (!open) return;
  scrim.classList.remove('on'); caseEl.classList.remove('on');
  document.body.style.overflow = '';
  if (lenis) lenis.start();
  open = false;
  const done = () => { scrim.hidden = true; caseEl.hidden = true; caseEl.removeEventListener('transitionend', done); };
  if (reduce) done(); else caseEl.addEventListener('transitionend', done);
  if (lastFocus) lastFocus.focus();
}

if (indexEl) {
  indexEl.addEventListener('click', (e) => { const row = e.target.closest('.wrow'); if (row) openCase(row.dataset.slug); });
  indexEl.addEventListener('keydown', (e) => { const row = e.target.closest('.wrow'); if (row && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openCase(row.dataset.slug); } });
}
scrim.addEventListener('click', close);
addEventListener('keydown', (e) => {
  if (!open) return;
  if (e.key === 'Escape') close();
  if (e.key === 'Tab') {
    const f = caseEl.querySelectorAll('button, a[href]');
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

/* ============================================================
   5. MAGNETIC BUTTONS (fine pointer only)
   ============================================================ */
function magnetic(el, strength = 0.32) {
  let bx = 0, by = 0, tx = 0, ty = 0, raf = null;
  function loop() {
    bx += (tx - bx) * 0.15; by += (ty - by) * 0.15;
    el.style.transform = `translate(${bx.toFixed(2)}px,${by.toFixed(2)}px)`;
    if (Math.abs(tx - bx) > 0.1 || Math.abs(ty - by) > 0.1) raf = requestAnimationFrame(loop); else raf = null;
  }
  el.addEventListener('pointermove', (e) => {
    const r = el.getBoundingClientRect();
    tx = (e.clientX - (r.left + r.width / 2)) * strength;
    ty = (e.clientY - (r.top + r.height / 2)) * strength;
    if (!raf) loop();
  });
  el.addEventListener('pointerleave', () => { tx = 0; ty = 0; if (!raf) loop(); });
}
if (finePointer && !reduce) {
  document.querySelectorAll('.btn, .nav-cta').forEach((b) => { b.classList.add('mag'); magnetic(b); });
}

/* ============================================================
   6. AMBIENT CURSOR GLOW (native cursor stays visible)
   ============================================================ */
if (finePointer && !reduce) {
  const orb = document.createElement('div');
  orb.className = 'cursor-orb'; document.body.appendChild(orb);
  let x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y;
  addEventListener('pointermove', (e) => { tx = e.clientX; ty = e.clientY; orb.style.opacity = '1'; }, { passive: true });
  addEventListener('pointerdown', () => orb.classList.add('down'));
  addEventListener('pointerup', () => orb.classList.remove('down'));
  const hot = 'a, button, .btn, .nav-cta, .wrow, [data-cursor]';
  addEventListener('pointerover', (e) => { if (e.target.closest(hot)) orb.classList.add('hot'); });
  addEventListener('pointerout', (e) => { if (e.target.closest(hot)) orb.classList.remove('hot'); });
  (function loop() { x += (tx - x) * 0.16; y += (ty - y) * 0.16; orb.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`; requestAnimationFrame(loop); })();
}

/* ============================================================
   7. NAV + SCROLL REVEAL
   ============================================================ */
const nav = document.getElementById('nav');

// Mobile menu: proper toggle + dropdown panel (replaces the old broken inline
// display:flex that dumped the desktop links on top of the wordmark).
(function mobileMenu() {
  const burger = document.getElementById('burger');
  const menu = document.getElementById('mobile-menu');
  if (!burger || !menu) return;
  let mopen = false;
  function setOpen(v) {
    mopen = v;
    burger.classList.toggle('open', v);
    burger.setAttribute('aria-expanded', v ? 'true' : 'false');
    burger.setAttribute('aria-label', v ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('menu-open', v);
    if (v) { menu.hidden = false; requestAnimationFrame(() => menu.classList.add('open')); if (lenis) lenis.stop(); }
    else { menu.classList.remove('open'); if (lenis) lenis.start();
      const done = () => { if (!mopen) menu.hidden = true; menu.removeEventListener('transitionend', done); };
      menu.addEventListener('transitionend', done); }
  }
  burger.addEventListener('click', () => setOpen(!mopen));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && mopen) setOpen(false); });
  // if we grow past the mobile breakpoint, force-close so state never desyncs
  matchMedia('(min-width: 861px)').addEventListener('change', (e) => { if (e.matches && mopen) setOpen(false); });
})();
addEventListener('scroll', () => nav.classList.toggle('on', scrollY > 24), { passive: true });
const io = new IntersectionObserver((es) => {
  es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach((el, i) => { el.style.transitionDelay = (Math.min(i % 3, 2) * 80) + 'ms'; io.observe(el); });
