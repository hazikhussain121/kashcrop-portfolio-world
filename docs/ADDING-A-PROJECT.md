# Adding a project

Every project on this site is just one entry in a single list. You do **not**
edit any page layout or component to add a project. You add one object to the
`projects` array and (optionally) drop screenshots into a folder.

- All content lives in **`app/data/content.ts`**.
- Each project automatically gets:
  - a card on the home page **Work** section,
  - a card on the **/projects** index page,
  - its own dedicated page at **/projects/&lt;slug&gt;**.

---

## 1. Copy the template

Open `app/data/content.ts`. Near the bottom there is a ready-made
`PROJECT_TEMPLATE`. Copy that whole object and paste it as a **new entry inside
the `projects` array** (the array near the top of the file). Then edit the
values.

```ts
export const projects: Project[] = [
  // ...existing projects...
  {
    no: "04",
    slug: "my-new-project",
    name: "My New Project",
    // ...the rest, copied from PROJECT_TEMPLATE...
  },
];
```

> Keep `PROJECT_TEMPLATE` where it is — it is only a reference. The site renders
> from the `projects` array, not from the template.

---

## 2. Fill in the basic fields

These are required and power the cards and the top of the project page.

| Field      | What it is                                                        |
| ---------- | ----------------------------------------------------------------- |
| `no`       | Running number shown beside the title, e.g. `"04"`. Keep it unique. |
| `slug`     | URL-safe id. The page becomes `/projects/<slug>`. Use dashes.     |
| `name`     | Project name.                                                     |
| `kind`     | Short type, e.g. `"Web platform"`.                                |
| `year`     | Year, e.g. `"2026"`.                                              |
| `tagline`  | One punchy sentence.                                              |
| `summary`  | 2–4 sentences shown on the cards.                                 |
| `features` | List of bullet points (capabilities).                            |
| `stack`    | List of technologies (shown as chips).                           |
| `accent`   | A hex colour used for glows/highlights, e.g. `"#e10f1c"`.         |
| `mock`     | Frame hint used when there's no clip yet: `"phone"`, `"dashboard"`, or `"browser"`. |
| `clip`     | Self-recorded UI clip — the hero visual. Optional (see step 5b).  |
| `links`    | External links (see below).                                       |

---

## 3. Add links (website, app stores, social)

`links` is a list. Each link has a `label`, an `href`, and an optional `kind`
that tells the UI which label/icon treatment to use.

```ts
links: [
  { label: "Open live site", href: "https://example.com", kind: "website" },
  { label: "View on GitHub", href: "https://github.com/you/repo", kind: "github" },
  { label: "App Store", href: "https://apps.apple.com/...", kind: "appstore" },
  { label: "Play Store", href: "https://play.google.com/...", kind: "playstore" },
  { label: "Facebook page", href: "https://facebook.com/yourpage", kind: "facebook" },
],
```

`kind` can be: `website`, `appstore`, `playstore`, `github`, `youtube`,
`facebook`, or `social`. If you leave `kind` out it defaults to `website`.
Leave `links: []` if there are none.

---

## 4. Add the rich page content (`detail`) — optional

If you only fill in the basic fields, the project still gets a working page. To
make it richer, add a `detail` object.

```ts
detail: {
  // Long story — each string is its own paragraph. Falls back to `summary`.
  overview: [
    "First paragraph.",
    "Second paragraph.",
  ],
  // Small key/value facts shown in the sidebar.
  facts: [
    { label: "Role", value: "Full-stack" },
    { label: "Timeline", value: "2026" },
  ],
  shots: [ /* screenshots — see step 5 */ ],
  videos: [ /* videos — see step 6 */ ],
},
```

---

## 5. Attach screenshots

1. Put your image files in **`public/shots/<slug>/`**.
   Example: `public/shots/my-new-project/home.png`.
2. Reference them in `detail.shots` using a path that starts with `/shots/...`
   (the `public` folder is served from the site root).

```ts
shots: [
  { src: "/shots/my-new-project/home.png", alt: "Home screen", wide: true },
  { src: "/shots/my-new-project/feature.png", alt: "A feature", caption: "Optional caption shown under the image." },
],
```

- `alt` (required): describe the image for accessibility.
- `caption` (optional): small text shown beneath the image.
- `wide` (optional): set `true` to make the shot span the full gallery width
  (great for wide desktop captures).

---

## 5b. Attach a real UI clip (recommended hero visual)

The strongest visual for each project is a short, high-quality screen recording
of the actual app. It replaces the placeholder that shows by default.

1. Record a short loop (8–20s is ideal), no audio needed.
2. Export to **MP4 (H.264)**; optionally also **WebM (VP9/AV1)** for smaller
   files — the WebM is served first when present.
3. Grab a first-frame still as the **poster** (JPG/PNG).
4. Put the files in **`public/clips/<slug>/`**:
   - `public/clips/my-new-project/demo.mp4`
   - `public/clips/my-new-project/demo.webm` (optional)
   - `public/clips/my-new-project/poster.jpg`
5. Set the `clip` field on the project:

```ts
clip: {
  src: "/clips/my-new-project/demo.mp4",
  srcWebm: "/clips/my-new-project/demo.webm", // optional
  poster: "/clips/my-new-project/poster.jpg",
  aspect: "phone", // "phone" | "desktop" | "square"
  label: "App home, live",
},
```

The clip autoplays muted and looping **only while it is on screen**, and falls
back to the poster still under reduced-motion. Pick `aspect` to match what you
recorded: `phone` for tall mobile captures, `desktop` for browser/dashboard.

You can add **extra** clips (beyond the hero) to the gallery via
`detail.clips: [{ src, poster, label, aspect }]`.

Until you add a `clip`, the stage shows an intentional “Live UI capture in
production” plate — the page looks finished, and adding footage later is a
pure data change with no layout shift.

---

## 6. Attach videos (YouTube, Facebook, other links)

Videos go in `detail.videos`. Each entry needs a `provider` and a `title`.

**YouTube** — use the video id only (the part after `v=` or after `youtu.be/`).
For `https://www.youtube.com/watch?v=dQw4w9WgXcQ` the id is `dQw4w9WgXcQ`.

```ts
videos: [
  { provider: "youtube", id: "dQw4w9WgXcQ", title: "Product walkthrough" },
],
```

**Facebook** — paste the full post/video URL.

```ts
videos: [
  { provider: "facebook", url: "https://www.facebook.com/watch/?v=000000000000000", title: "Field demo" },
],
```

**Any other link** — for links that are not embeddable videos (TikTok,
Instagram, a blog post, etc.), add them as `links` (step 3) instead. They show
as buttons on the project page.

---

## 7. Check it

Run the site locally:

```bash
npm install
npm run dev
```

Then open:

- `http://localhost:5173/projects` — your project should appear as a card.
- `http://localhost:5173/projects/<slug>` — your dedicated page.

If the page says “Project not found”, the `slug` in the URL does not match the
`slug` in your project object.

---

## Quick reference: full example

```ts
{
  no: "04",
  slug: "my-new-project",
  name: "My New Project",
  kind: "Web platform",
  year: "2026",
  tagline: "One punchy sentence about the project.",
  summary: "A short paragraph describing what it does and who it is for.",
  features: ["Capability one", "Capability two", "Capability three"],
  stack: ["React", "TypeScript", "Cloudflare"],
  accent: "#e10f1c",
  mock: "browser",
  links: [
    { label: "Open live site", href: "https://example.com", kind: "website" },
  ],
  detail: {
    overview: ["Paragraph one.", "Paragraph two."],
    facts: [
      { label: "Role", value: "Full-stack" },
      { label: "Timeline", value: "2026" },
    ],
    shots: [
      { src: "/shots/my-new-project/cover.png", alt: "Cover", wide: true },
    ],
    videos: [
      { provider: "youtube", id: "VIDEO_ID", title: "Demo" },
    ],
  },
}
```
