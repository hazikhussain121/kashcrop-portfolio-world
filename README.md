# KashCrop Innovations — Portfolio

Award-caliber portfolio and company site for **KashCrop Innovations Pvt Ltd** — a Srinagar-based
software and applied-AI product studio founded by Hazik Hussain.

Built with **React Router v7**, **React 19**, **Tailwind CSS v4**, **GSAP** (ScrollTrigger) and
**Lenis** smooth scrolling. Designed for Cloudflare (Workers / Pages, D1, R2).

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Build

```bash
npm run build
```

## Editing content

All site copy lives in `app/data/content.ts` so it can be edited without touching components.

## Structure

- `app/root.tsx` — document shell, fonts, smooth-scroll provider
- `app/routes/home.tsx` — the single immersive page
- `app/components/` — sections (Hero, Studio, Services, Work, Founder, Contact) and primitives
- `app/data/content.ts` — all editable content
- `app/hooks/` — animation + smooth-scroll hooks
