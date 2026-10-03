# Interface-film integration handoff

Verified 2 October 2026. Portfolio source only; no deployment was performed.

## Result

- Selected hero scenes use actual films while retaining project tabs, keyboard selection, front-view control, and screen-viewer links.
- All six project index/detail artworks use real films. Phone layouts select the separately recorded portrait variant; desktop uses the primary landscape film. Baghban's compact hero uses the square variant.
- The combined reel is an oxblood narrative room after selected work on the home page.
- Existing screenshot galleries, project records, SEO, routes, and service-page static artwork remain intact.
- Film provenance and distinct desktop/phone workflow captions are in app/data/portfolio/films.ts. All recordings are current local review builds using synthetic demonstration data, recorded 2 October 2026. Computational research and simulated AI output are not presented as validated biological or live-model results.

## Delivery contracts

InterfaceFilm renders an actual image/picture during SSR, with CSS-reserved desktop/phone aspect ratios. Its video has no initial src. Intersection visibility, foreground state, reduced-motion and save-data determine eligibility.

A shared coordinator gives one player the decoder slot. It releases the old element before another loads, including detached elements on route unmount. User Play actions take priority. Offscreen/hidden players pause, remove src, and load() to release resources. Playback errors retain the poster; failure state resets for a different asset. Controls remain outside navigation links.

## Fresh verification

Final job: 20261002T171420-515f3c317f, succeeded, exit 0, 17:15:26 UTC.

- npm run typecheck: passed
- npm test: 71 tests across 11 files passed
- npm run build: passed, including static route prerenders
- Playwright: 54 tests passed across films, interactions, responsive routes, and route/SEO regression
- All six primary and portrait films decoded and advanced in the browser; muted, looping, inline behavior verified
- Hero fit checked at 320, 390, 820 and 1440 px; wider route checks include 768, 1024 and 1920 px
- Reduced-motion/save-data paths made zero MP4 requests
- Single-source ownership, manual takeover, offscreen/document-hidden release, failed-film poster fallback, no-JS posters, and equal static/playing layout footprints passed
- Film routes: zero serious/critical automated accessibility findings, page exceptions, failed media responses, or tested overflow
- All 28 public media assets matched the built copies by SHA-256 (11,839,695 bytes total)

The initial toolkit Playwright CLI attempt failed because it loaded a second Playwright instance. Verification uses the project's own CLI with the existing toolkit browser cache. Early regression runs caught and led to fixes for oversized square hero layout, caption-height shift, retained video sources after unmount, source-error persistence, and controls inside service links. Two early harness defects (ambiguous footer selector and changing motion preference before leaving the page) were corrected. These failed attempts are not represented as passing results.

## Reproduction

From the portfolio directory:

1. npm run check
2. HOST=127.0.0.1 PORT=5200 npm run preview
3. Cache the current public portfolio fonts for isolated visual QA:
   node tools/cache-portfolio-fonts.mjs '/home/hazik/workspace/Hazik Ops/interface-films/2026-10-02/portfolio-font-cache'
4. Run:
   PORTFOLIO_BASE_URL=http://127.0.0.1:5200 PORTFOLIO_FONT_CACHE='/home/hazik/workspace/Hazik Ops/interface-films/2026-10-02/portfolio-font-cache' PLAYWRIGHT_BROWSERS_PATH=/home/hazik/workspace/.agent-toolkit/cache/browsers node tools/verify-interface-films.mjs

The script verifies the asset inventory, runs the aggregate check, and executes the 54 browser tests. Use a fresh report/output directory if preserving an earlier run. No package versions were changed.

## Evidence

- Browser report: artifacts/production-migration/playwright-report/index.html
- Machine report: artifacts/production-migration/playwright-results.json
- Asset hashes: artifacts/interface-films/browser/asset-manifest.json
- Screenshots: artifacts/interface-films/browser/
  - hero-320.png, hero-390.png, hero-820.png, hero-1440.png
  - detail-390.png, detail-1440.png
  - reel-desktop.png
  - baghban-phone.png, plant-health-clinic-phone.png, treat-my-fish-phone.png, skiie-phone.png, trace-amp-phone.png, kashcrop-phone.png
- Source checkpoint: 20261002T162907-6487e08e74
- External change-summary copy: /home/hazik/workspace/Hazik Ops/interface-films/2026-10-02/portfolio-change-summary.txt

## Source changes

Modified:
- app/app.css
- app/components/portfolio/HeroTheatre.tsx
- app/components/portfolio/UI.tsx
- app/components/portfolio/ServiceVisual.tsx
- app/routes/home.tsx
- app/routes/project.tsx
- app/routes/projects.tsx
- app/routes/service.tsx

Added:
- app/components/portfolio/InterfaceFilm.tsx and InterfaceFilm.test.tsx
- app/components/portfolio/PortfolioReel.tsx
- app/data/portfolio/films.ts
- app/lib/portfolio/film-playback.ts and film-playback.test.ts
- app/styles/portfolio/films.css
- tests/portfolio/films.spec.ts
- tools/cache-portfolio-fonts.mjs
- tools/verify-interface-films.mjs
- This handoff

Public delivery media was supplied separately by the capture task. Source captures and masters remain outside public.

## Boundaries

No production forms were submitted and no production data, credentials, domains, account access or deployment settings were changed. Publication remains blocked on verified portfolio deployment authentication.

Chromium phone emulation is not physical iOS/Safari testing. Automated accessibility checks are partial, not a full accessibility certification. The resource/loading tests do not constitute a Lighthouse or field Core Web Vitals benchmark. Existing React Router future-flag and build chunk-size notices remain warnings.
