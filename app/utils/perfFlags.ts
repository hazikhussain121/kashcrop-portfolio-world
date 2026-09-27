type PerfInput = {
  finePointer: boolean;
  reducedMotion: boolean;
  viewportWidth: number;
};

export function shouldUseHeavyPointerEffects({
  finePointer,
  reducedMotion,
  viewportWidth,
}: PerfInput): boolean {
  return finePointer && !reducedMotion && viewportWidth >= 1024;
}

export function shouldUseSmoothScroll({
  finePointer,
  reducedMotion,
  viewportWidth,
}: PerfInput): boolean {
  return finePointer && !reducedMotion && viewportWidth >= 900;
}

export function shouldUseParallax({
  finePointer,
  reducedMotion,
  viewportWidth,
}: PerfInput): boolean {
  return finePointer && !reducedMotion && viewportWidth >= 1200;
}
