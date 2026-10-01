# Brand assets

## Logo

`src/components/ui/Logo.jsx` renders the official artwork directly from
`public/brand/ventura-logo.png` (the full lockup: interlocking "VE" monogram in
navy + gold over "VENTURA / EXPORTS" and the tagline). It is used unmodified.

## Favicon & app icons

`public/favicon.ico`, `public/brand/favicon-16.png`, `public/brand/favicon-32.png`,
`public/brand/apple-touch-icon.png` and `public/brand/icon-192.png` /
`icon-512.png` are all generated from the same official artwork — a tight crop of
just the monogram mark (no wordmark/tagline) centered on the brand ivory
(`#f5f2ea`) field, so the "VE" mark stays legible at 16×16. They are referenced
from `index.html` (`<link rel="icon">` / `apple-touch-icon`) and
`site.webmanifest`.

To regenerate them after an artwork update, crop the monogram's alpha bounding
box out of the source PNG and re-run the same resize/center logic for each
size — there is no separate vector source for the mark. Bump the `?v=` query
string on the `<link>` tags in `index.html` and the `icons` entries in
`site.webmanifest` so browsers don't keep serving the previously cached icon.

## Colour palette

Defined in `tailwind.config.js`:

| Token          | Hex       | Use |
|----------------|-----------|-----|
| `ink`          | `#17233a` | primary text, dark sections, buttons |
| `ink.soft`     | `#243450` | button hover |
| `ink.muted`    | `#5b6472` | secondary text |
| `ivory`        | `#f5f2ea` | page background |
| `ivory.deep`   | `#efeadd` | alternating section background |
| `gold`         | `#a8814a` | accent — labels, rules, small emphasis |
| `gold.deep`    | `#8a6a3b` | the italic word in the hero |
| `line`         | `#e4ddca` | hairline borders |

## Typography

Loaded from Google Fonts in `index.html`:

- **Archivo** (400/500/600/700) — everything.
- **Newsreader** (400/500 + 400 italic) — used sparingly for display headings and
  pull quotes only (`font-serif`).

## Photography

See `IMAGE_CREDITS.md`. All images are Pexels‑licensed (free for
commercial use). Swap by replacing files in `public/images/` with the same
filenames.
