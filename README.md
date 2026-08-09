# KashCrop Innovations website

Company-first single-page site for **KashCrop Innovations**, a software studio building institutional platforms, ERP and workflow systems, dashboards, full-stack web/mobile products and applied AI from Jammu and Kashmir.

## Direction

- **Identity:** the established Vizier graphite instrument, with Bricolage Grotesque, Inter, OKLCH tokens and a monochrome palette.
- **Narrative:** company and capabilities first, representative proof, the cinematic Vizier chapter, wider portfolio, founder credibility, contact.
- **Centerpiece:** a real Three.js conduit that morphs through Unify, Reason, Act and Improve inside the 460vh Vizier section.
- **Content:** `src/content.js` holds the five case studies. Vizier data is optional per project and is rendered only when verified.

## Stack

- Vite + vanilla Three.js (r160)
- Lenis for smooth scrolling
- Mermaid loaded lazily when a case study opens
- No framework or unnecessary dependencies

## Run

```bash
npm install
npm run dev
npm run build
```

## Structure

```text
index.html        metadata, company-first DOM order, navigation and sections
src/main.js       Three.js conduit, Vizier-local progress, interactions and case studies
src/style.css     graphite design system and responsive layout
src/content.js    project copy and optional Vizier case data
```

This is a local safety repository. Do not deploy, push, or connect production configuration without explicit authorization.
