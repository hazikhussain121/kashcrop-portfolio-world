# Project screenshots

Put each project's screenshots in their own folder here, named after the
project's `slug`:

```
public/shots/<slug>/your-image.png
```

For example, the KashCrop project (`slug: "kashcrop"`) uses:

```
public/shots/kashcrop/home.png
public/shots/kashcrop/assistant.png
public/shots/kashcrop/khata.png
```

Reference them in `app/data/content.ts` with a path starting at the site root:

```ts
shots: [
  { src: "/shots/kashcrop/home.png", alt: "Home dashboard", wide: true },
]
```

See `docs/ADDING-A-PROJECT.md` for the full guide.
