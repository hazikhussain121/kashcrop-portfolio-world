export type FilmPolicy = {
 visible: boolean; enabled: boolean; pageVisible: boolean;
 reducedMotion: boolean; saveData: boolean; paused: boolean; failed: boolean;
};
export function canPlayFilm(policy: FilmPolicy) {
 return policy.visible && policy.enabled && policy.pageVisible &&
  !policy.reducedMotion && !policy.saveData && !policy.paused && !policy.failed;
}
type Candidate = { score: number; start: () => void; stop: () => void };
/** Stops/unloads the old element synchronously before granting another decoder. */
export function createFilmCoordinator() {
 const candidates = new Map<string, Candidate>();
 let active: { id: string; candidate: Candidate } | undefined;
 let preferred: string | undefined;
 function reconcile() {
  let winner: { id: string; candidate: Candidate } | undefined;
  if (active) { const candidate = candidates.get(active.id); if (candidate && candidate.score > 0) winner = { id: active.id, candidate }; }
  for (const [id, candidate] of candidates) if (candidate.score > 0 && (!winner || candidate.score > winner.candidate.score)) winner = { id, candidate };
  const requested = preferred ? candidates.get(preferred) : undefined;
  if (preferred && requested && requested.score > 0) winner = { id: preferred, candidate: requested };
  if (winner?.id === active?.id) return;
  const previous = active;
  active = undefined;
  previous?.candidate.stop();
  active = winner;
  winner?.candidate.start();
 }
 return {
  update(id: string, candidate: Candidate) { candidates.set(id, candidate); reconcile(); },
  remove(id: string) { candidates.delete(id); if (preferred === id) preferred = undefined; reconcile(); },
  prefer(id: string) { preferred = id; reconcile(); },
 };
}
export const filmCoordinator = createFilmCoordinator();
