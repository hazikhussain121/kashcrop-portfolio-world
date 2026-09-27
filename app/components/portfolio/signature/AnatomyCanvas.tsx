import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { media } from '~/data/portfolio/catalog';

type Props = { selected: number; spread: number; onReady: () => void; onFailure: () => void };
const boardColors = ['#e4efeb', '#e8b4b9', '#c5b8d9', '#b7c7db'];

/** Purposeful, demand-rendered 3D. Nothing here represents live traffic or production records. */
export default function AnatomyCanvas(props: Props) {
 const host = useRef<HTMLDivElement>(null);
 const latest = useRef(props); latest.current = props;
 const requestRender = useRef<() => void>(() => {});
 useEffect(() => { requestRender.current(); }, [props.selected, props.spread]);
 useEffect(() => {
  const container = host.current;
  if (!container) return;
  let renderer: THREE.WebGLRenderer | undefined, environmentTarget: THREE.WebGLRenderTarget | undefined;
  let frame = 0, until = 0, lastTime = 0, disposed = false, visible = false, announced = false, textureReady = false;
  const geometries = new Set<THREE.BufferGeometry>(), materials = new Set<THREE.Material>(), textures = new Set<THREE.Texture>();
  const canvas = document.createElement('canvas'); canvas.setAttribute('aria-hidden', 'true'); canvas.tabIndex = -1;
  const camera = new THREE.PerspectiveCamera(36, 1, .1, 60);
  const scene = new THREE.Scene(), assembly = new THREE.Group(); scene.add(assembly);
  const layers: THREE.Group[] = [], boards: THREE.MeshStandardMaterial[] = [], signals: THREE.ShaderMaterial[] = [];
  const pointer = { x: 0, y: 0 }, orientation = { x: 0, y: 0 }; let separation = .03;
  const addGeometry = <T extends THREE.BufferGeometry>(value: T): T => { geometries.add(value); return value; };
  const addMaterial = <T extends THREE.Material>(value: T): T => { materials.add(value); return value; };
  const addTexture = <T extends THREE.Texture>(value: T): T => { textures.add(value); return value; };
  function roundedPlane(width: number, height: number, radius: number) {
   const x = -width / 2, y = -height / 2, shape = new THREE.Shape();
   shape.moveTo(x + radius, y); shape.lineTo(x + width - radius, y); shape.quadraticCurveTo(x + width, y, x + width, y + radius);
   shape.lineTo(x + width, y + height - radius); shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
   shape.lineTo(x + radius, y + height); shape.quadraticCurveTo(x, y + height, x, y + height - radius);
   shape.lineTo(x, y + radius); shape.quadraticCurveTo(x, y, x + radius, y);
   const geometry = addGeometry(new THREE.ShapeGeometry(shape, 16));
   const position = geometry.attributes.position, uv = geometry.attributes.uv;
   for (let i = 0; i < position.count; i++) uv.setXY(i, (position.getX(i) + width / 2) / width, (position.getY(i) + height / 2) / height);
   uv.needsUpdate = true; return geometry;
  }
  function circuitTexture(index: number) {
   const board = document.createElement('canvas'); board.width = 512; board.height = 1024;
   const c = board.getContext('2d')!;
   c.fillStyle = boardColors[index]; c.fillRect(0, 0, 512, 1024);
   c.strokeStyle = index === 1 ? '#9e49574d' : '#4052744d'; c.lineWidth = 2;
   // Circuit paths are a schematic data graphic, not a copied motherboard or client system.
   for (let row = 0; row < 11; row++) {
    const y = 144 + row * 66, inset = 46 + (row % 3) * 23;
    c.beginPath(); c.moveTo(inset, y); c.lineTo(225, y); c.lineTo(260, y + 26); c.lineTo(467 - inset, y + 26); c.stroke();
    for (const x of [inset, 467 - inset]) { c.beginPath(); c.arc(x, y + (x === inset ? 0 : 26), 4, 0, Math.PI * 2); c.fillStyle = '#6c557f'; c.fill(); }
   }
   c.strokeStyle = '#46527630'; for (let i = 1; i < 9; i++) { c.beginPath(); c.moveTo(i * 56, 85); c.lineTo(i * 56, 920); c.stroke(); }
   c.fillStyle = '#273749'; c.font = '600 27px Arial'; c.fillText(['INTERFACE', 'WORKFLOW', 'RECORDS', 'FOUNDATION'][index], 43, 74);
   c.fillStyle = '#38465b'; c.font = '17px monospace'; c.fillText('KASHCROP / SYSTEM STUDY', 43, 968);
   const texture = addTexture(new THREE.CanvasTexture(board)); texture.colorSpace = THREE.SRGBColorSpace; return texture;
  }
  function invalidate() {
   if (disposed) return;
   until = performance.now() + 1550;
   if (visible && !document.hidden && !frame) frame = requestAnimationFrame(render);
  }
  function render(time: number) {
   frame = 0;
   if (disposed || !renderer || !visible || document.hidden) return;
   const alpha = 1 - Math.exp(-Math.min(64, time - (lastTime || time - 16)) / 110); lastTime = time;
   separation += (latest.current.spread - separation) * alpha;
   orientation.x += (pointer.x - orientation.x) * alpha; orientation.y += (pointer.y - orientation.y) * alpha;
   assembly.rotation.set(-.09 + orientation.y * .08, -.12 + orientation.x * .15, -.1);
   for (let i = 0; i < layers.length; i++) {
    const selected = latest.current.selected === i;
    const target = (1.5 - i) * (.18 + separation * 1.25) + (selected ? .09 : 0);
    layers[i].position.z += (target - layers[i].position.z) * alpha;
    layers[i].position.x += (((1.5 - i) * separation * .12) - layers[i].position.x) * alpha;
    layers[i].position.y += (((1.5 - i) * separation * -.045) - layers[i].position.y) * alpha;
    boards[i].emissiveIntensity += ((selected ? .10 : 0) - boards[i].emissiveIntensity) * alpha;
    if (signals[i - 1]) { signals[i - 1].uniforms.uTime.value = time / 1000; signals[i - 1].uniforms.uActive.value = selected ? 1 : .25; }
   }
   renderer.render(scene, camera);
   if (!announced && textureReady) { announced = true; latest.current.onReady(); }
   if (time < until) frame = requestAnimationFrame(render);
  }
  function resize() {
   if (!renderer || disposed) return;
   const { width, height } = container!.getBoundingClientRect(); if (!width || !height) return;
   renderer.setPixelRatio(Math.min(devicePixelRatio, width < 600 ? 1.35 : 1.65));
   renderer.setSize(width, height, false); camera.aspect = width / height;
   camera.position.set(4.8, 2.1, camera.aspect < .75 ? 13.1 : 11.7); camera.lookAt(0, 0, 0); camera.updateProjectionMatrix(); invalidate();
  }
  function pointerMove(event: PointerEvent) {
   if (event.pointerType !== 'mouse' || document.querySelector('dialog[open]')) return;
   const box = container!.getBoundingClientRect(); pointer.x = (event.clientX - box.left) / box.width - .5; pointer.y = (event.clientY - box.top) / box.height - .5; invalidate();
  }
  const pointerLeave = () => { pointer.x = 0; pointer.y = 0; invalidate(); };
  const visibility = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else invalidate(); };
  const lost = (event: Event) => { event.preventDefault(); cancelAnimationFrame(frame); frame = 0; latest.current.onFailure(); };
  let resizeObserver: ResizeObserver | undefined, observer: IntersectionObserver | undefined;
  function dispose() {
   disposed = true; cancelAnimationFrame(frame); requestRender.current = () => {};
   observer?.disconnect(); resizeObserver?.disconnect();
   document.removeEventListener('visibilitychange', visibility); container!.removeEventListener('pointermove', pointerMove); container!.removeEventListener('pointerleave', pointerLeave); canvas.removeEventListener('webglcontextlost', lost);
   textures.forEach(t => t.dispose()); geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose()); environmentTarget?.dispose();
   renderer?.dispose(); renderer?.forceContextLoss(); canvas.remove();
  }
  try {
   renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
   renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.35;
   renderer.setClearColor(0x000000, 0); container.append(canvas);
   const environment = new RoomEnvironment(), pmrem = new THREE.PMREMGenerator(renderer);
   environmentTarget = pmrem.fromScene(environment, .04); scene.environment = environmentTarget.texture; environment.dispose(); pmrem.dispose();
   const soft = new THREE.HemisphereLight(0xf6f0f8, 0x321520, 2.4); scene.add(soft);
   const key = new THREE.DirectionalLight(0xffffff, 3.8); key.position.set(-4, 5, 8); scene.add(key);
   const red = new THREE.DirectionalLight(0xff5368, 2); red.position.set(4, -1, -3); scene.add(red);
   const slabGeometry = addGeometry(new RoundedBoxGeometry(2.48, 5.26, .1, 5, .085));
   const faceGeometry = roundedPlane(2.30, 5.08, .18);
   const loader = new THREE.TextureLoader();
   const capture = addTexture(loader.load(media('garden-home.webp'), texture => {
    if (disposed) { texture.dispose(); return; }
    texture.colorSpace = THREE.SRGBColorSpace; texture.anisotropy = Math.min(4, renderer!.capabilities.getMaxAnisotropy()); textureReady = true; invalidate();
   }, undefined, () => { if (!disposed) latest.current.onFailure(); }));
   for (let i = 0; i < 4; i++) {
    const layer = new THREE.Group(); assembly.add(layer); layers.push(layer);
    const board = addMaterial(new THREE.MeshStandardMaterial({ color: i === 0 ? 0xc9d3ce : boardColors[i], metalness: i === 0 ? .86 : .56, roughness: i === 0 ? .22 : .33, emissive: i === 0 ? 0xaebbb3 : boardColors[i], emissiveIntensity: 0 })); boards.push(board);
    layer.add(new THREE.Mesh(slabGeometry, board));
    const face = new THREE.Mesh(faceGeometry, addMaterial(new THREE.MeshBasicMaterial({ map: i === 0 ? capture : circuitTexture(i), toneMapped: false })));
    face.position.z = .055; layer.add(face);
    if (i > 0) {
     const signal = addMaterial(new THREE.ShaderMaterial({ transparent: true, depthWrite: false, uniforms: { uTime: { value: 0 }, uActive: { value: 0 } },
      vertexShader: 'varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
      fragmentShader: 'varying vec2 vUv; uniform float uTime; uniform float uActive; void main(){float cell=abs(fract(vUv.y*12.0)-0.5);float line=1.0-smoothstep(0.0,0.026,cell);float band=exp(-90.0*pow(vUv.x-fract(uTime*0.19),2.0));float ends=smoothstep(0.04,0.15,vUv.x)*(1.0-smoothstep(0.85,0.96,vUv.x));gl_FragColor=vec4(0.95,0.15,0.27,line*band*ends*(0.15+uActive*0.55));}',
     })); signals.push(signal); const overlay = new THREE.Mesh(faceGeometry, signal); overlay.position.z = .058; layer.add(overlay);
     // Small physical components establish depth without a high-poly model download.
     const chipGeo = addGeometry(new RoundedBoxGeometry(.26, .16, .085, 2, .02));
     const chipMat = addMaterial(new THREE.MeshStandardMaterial({ color: 0x3a3140, roughness: .3, metalness: .75 }));
     const chips = new THREE.InstancedMesh(chipGeo, chipMat, 8), matrix = new THREE.Matrix4();
     for (let j = 0; j < 8; j++) { matrix.makeTranslation(j % 2 ? .77 : -.77, 1.44 - Math.floor(j / 2) * .77, .102); chips.setMatrixAt(j, matrix); }
     layer.add(chips);
    }
   }
   canvas.addEventListener('webglcontextlost', lost); container.addEventListener('pointermove', pointerMove); container.addEventListener('pointerleave', pointerLeave); document.addEventListener('visibilitychange', visibility);
   resizeObserver = new ResizeObserver(resize); resizeObserver.observe(container);
   observer = new IntersectionObserver(entries => { visible = entries[0]?.isIntersecting ?? false; if (visible) invalidate(); else { cancelAnimationFrame(frame); frame = 0; } }, { rootMargin: '80px' }); observer.observe(container);
   requestRender.current = invalidate; resize();
  } catch { dispose(); latest.current.onFailure(); }
  return dispose;
 }, []);
 return <div className="anatomy-canvas" ref={host} aria-hidden="true"/>;
}
