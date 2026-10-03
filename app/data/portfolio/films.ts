export type InterfaceFilmAsset = {
 id: string; title: string; src: string; poster: string;
 width: number; height: number; caption: string; provenance: string;
 compact?: { src: string; poster: string; width: number; height: number };
 mobile?: { src: string; poster: string; width: number; height: number; caption: string };
};
export const filmProvenance = 'Current local review build · Synthetic demonstration · 2 Oct 2026';
const projectFilm = (id: string, title: string, caption: string): InterfaceFilmAsset => ({
 id, title, caption, src: `/media/projects/${id}/film.mp4`,
 poster: `/media/projects/${id}/poster.webp`, width: 1920, height: 1080, provenance: filmProvenance,
});
export const projectFilms: Record<string, InterfaceFilmAsset> = {
 'baghban': { ...projectFilm('baghban', 'Baghban', 'From an orchard plan to tree spacing and a first setup budget.'), compact: { src: '/media/projects/baghban/film-square.mp4', poster: '/media/projects/baghban/poster-square.webp', width: 1080, height: 1080 } },
 'plant-health-clinic': projectFilm('plant-health-clinic', 'Plant Health Clinic', 'Review a synthetic plant-health case and draft expert advice. AI draft responses are simulated for this demonstration.'),
 'treat-my-fish': projectFilm('treat-my-fish', 'FishDoc / TreatMyFish', 'Water telemetry, a synthetic AI draft, and an expert handoff. A demonstration of the interface, not live model validation.'),
 'skiie': projectFilm('skiie', 'SKIIE', 'Explore research areas and compare E-YUVA fellowship routes. Recorded 2 October 2026.'),
 'trace-amp': projectFilm('trace-amp', 'TraceAMP', 'A synthetic sequence, on-device properties and a helical-wheel view. Computational exploration, not laboratory validation.'),
 'kashcrop': projectFilm('kashcrop', 'KashCrop', 'Plan an orchard season, compare scenarios, and save a demonstration estimate.'),
};
const phoneFilms: Record<string, { width: number; height: number; caption: string }> = {
 'kashcrop': { width: 432, height: 900, caption: 'Estimate an orchard season and compare synthetic profit scenarios on a phone.' },
 'baghban': { width: 430, height: 932, caption: 'Plan orchard spacing and a partial setup budget with demonstration inputs.' },
 'plant-health-clinic': { width: 430, height: 932, caption: 'Inspect a synthetic plant-health advisory on a phone.' },
 'treat-my-fish': { width: 430, height: 932, caption: 'Estimate daily feed from demonstration stock and fish-weight inputs.' },
 'skiie': { width: 390, height: 844, caption: 'Explore E-YUVA fellowship pathways on a phone. Recorded 2 October 2026.' },
 'trace-amp': { width: 390, height: 844, caption: 'Inspect live peptide properties from a synthetic sequence on a phone. Computational exploration, not laboratory validation.' },
};
for (const [slug, phone] of Object.entries(phoneFilms)) projectFilms[slug].mobile = { ...phone, src: `/media/projects/${slug}/film-mobile.mp4`, poster: `/media/projects/${slug}/poster-mobile.webp` };

export const portfolioReel: InterfaceFilmAsset = {
 id: 'portfolio-reel', title: 'KashCrop portfolio reel',
 src: '/media/portfolio-reel/film.mp4', poster: '/media/portfolio-reel/poster.webp',
 width: 1920, height: 1080, caption: 'Six products. Real interfaces. A short study of the work in use.', provenance: filmProvenance,
};
