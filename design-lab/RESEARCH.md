# KashCrop / Show the work
Private design exploration · 20 September 2026

## What the current site is missing
The deployed page explains the company and services before giving visitors tangible product evidence. In the captured document, the three image elements were the KashCrop mark and two SKIIE logo instances; there were no video elements. That is a DOM observation, not proof that CSS, canvas or other non-image visuals do not exist. The local public/shots directory contained a README, but no product screenshots.

The response is not merely bigger typography or more animation. It is to move recognizable, inspectable work into the opening composition, then give visitors a low-effort way to explore it.

## Guidance actually consulted
- Existing repository PRODUCT.md, DESIGN.md and AGENTS.md: preserve the Fraunces / Geist pairing, red identity, honest product evidence and brand register. Existing uncommitted work must remain untouched.
- Local Impeccable SKILL.md and brand reference. Context output is saved under research/existing-design-context.txt. Public upstream: https://github.com/pbakaus/impeccable
- Anthropic frontend-design skill: downloaded to research/frontend-design.md. https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md
- Official GSAP timeline and performance skills: downloaded to research/gsap-timeline.md and research/gsap-performance.md. https://github.com/greensock/gsap-skills
- GSAP matchMedia documentation, including reduced-motion handling: https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/

The downloaded skill documents are reference text. They were not installed globally, run as executable code, or allowed to override project instructions. The installed GSAP runtime was reused rather than introducing a new production dependency.

## Award-winning and agency references
### Igloo Inc / abeto — an object-led portfolio
https://www.awwwards.com/sites/igloo-inc
https://www.awwwards.com/igloo-inc-case-study.html
https://www.awwwards.com/websites/sites_of_the_year/

The Awwwards case study describes project-specific objects, testing early browser prototypes, restrained device requirements, and keeping different portfolio pieces from feeling like the same repeated model. The useful lesson is to make projects tangible and distinctive—not to copy its ice world or assets. Direction B borrows the idea of browsing a collection, while A uses project-specific staging.

### Resn — connect the brand, content and interaction
https://tympanus.net/codrops/2026/09/14/inside-resns-digital-experiences/

The author interview discusses bespoke experiences where content and creative technology reinforce each other, including tactile, nature-linked work. Direction C translates this into context-to-interface storytelling. It does not reproduce a Resn composition or claim equivalent production depth.

## Three hypotheses to compare
### A / Product theatre
Actual app captures are the hero objects. A controlled red stage, metallic screen edges, purposeful perspective and direct project switching show the design before explaining it. Real screens open in an accessible viewer. This is the recommended foundation for a company portfolio because the work remains immediately legible.

### B / Spatial collection
A CSS-transformed spatial board lets visitors browse the work as objects. It supports pointer panning, keyboard panning, reset, project inspection and an ordinary index. Mobile and system-reduced-motion visitors start with the index. This is intentionally not a heavy WebGL world. Its tradeoff is unfamiliar navigation, so it is better as an optional creative-lab experience than the only route to important work.

### C / Field to interface
A licensed orchard photograph and actual Baghban captures share a frame. A native range input reveals the interface over the physical context. Project sections use artwork and actual captures with distinct compositions. This is the most grounded direction; before public release, stock context photography should be replaced with owned, consented field imagery. It should not imply KashCrop only builds agricultural software unless that positioning is chosen deliberately.

These are creative judgments, not measured conversion or user-study results. Recommendation: A as the foundation, C inside selected project stories, B as an optional lab.

## Assets and attribution
Full, machine-readable provenance: assets/manifest.json.

- Baghban: actual local QA screenshots from Garden Guardians Platform (Needs a Name), grower-experience-2026-09-20. Home, orchard service, calendar, variety explorer and desktop view.
- Plant Health Clinic: actual local QA screenshots from farmer-ios-20260920/chromium. Home, report entry and photography guide.
- SKIIE: screenshot captured from https://skiie.co.in on 20 September 2026. This is public-site evidence; no private account was opened.
- Tree Passport: existing cedar and tree-tag concept artwork. Clearly labeled illustrative; not a real app screen, field photograph or production-release claim.
- Leaf-lens cutout and KashCrop logo: existing user project assets. Logo proportions are preserved.
- Orchard stock photograph: Marek Studzinski, “red apple fruits during daytime,” Unsplash. https://unsplash.com/photos/red-apple-fruits-during-daytime-wvUYBXCgVzQ
- Photograph license: https://unsplash.com/license (free commercial/noncommercial use under the Unsplash License). No location claim is made; it is not presented as Kashmir or a client orchard.
- Fonts: Fraunces and Geist, loaded through Google Fonts CSS with system fallbacks. No font files are distributed as attachments.
- Animation: existing installed GSAP runtime, copied into vendor for self-contained local prototypes. Retain its copyright/license header. GSAP software licensing is distinct from the official skill documents' license. https://gsap.com/community/standard-license/

A requested raw GSAP license URL returned 404 during preparation. No license text was fabricated. The existing runtime header and official license reference are retained.

## Production guardrails
No deployments, repository resets, commits or changes outside design-lab were requested or performed for the design implementation. There is no analytics, contact-form submission, account creation, generated business metric, testimonial or invented client result. Contact links invoke the user's email client; viewers are screenshot galleries, not simulated functioning backends.

No scroll hijacking, forced audio, hidden-on-load body content, mandatory loading gate, custom cursor or required drag interaction. Animations respect the operating-system preference and a manual motion control. Native dialogs provide the screen viewer and Escape dismissal. The page remains readable without JavaScript, with direct image fallbacks.

## Before adopting a direction
Choose the visual route first. Then curate approved captures, remove any test identities, record short genuine product flows, confirm project names/statuses and permissions, and replace stock context with owned field photography. Only after that should the approved components be integrated into the React Router app, its real routes, SEO and deployment pipeline. The prototype viewer must never be mislabeled as an interactive live application.
