# Brand assets

## Logo — action required

The site currently renders the Ventura Exports wordmark **typographically** from
`src/components/ui/Logo.jsx` (a geometric "VE" monogram in the brand navy + gold,
with "VENTURA / EXPORTS" set in the site fonts). It is clean and consistent, but
it is **not** the official artwork.

To drop in the real logo:

1. Add the supplied files to `public/brand/`:
   - `logo.svg` — full lockup for light backgrounds (navy artwork)
   - `logo-light.svg` — full lockup for dark backgrounds (ivory artwork), used in
     the footer
   - `mark.svg` — monogram only (optional)
2. Replace the body of `src/components/ui/Logo.jsx` with `<img>` tags pointing at
   those files. The component already receives `variant` (`row` | `stack` |
   `mark`) and `tone` (`ink` | `light`); map them to the right file and keep the
   existing height classes (`h-8`/`h-9` in the header, `h-14` stacked).
3. Replace `public/brand/favicon.svg` with a favicon derived from the real mark.
   Keep it a square SVG so the existing `<link rel="icon">` in `index.html` keeps
   working. Optionally add `favicon.ico`, `apple-touch-icon.png` (180×180) and
   `icon-192.png` / `icon-512.png` (referenced by `site.webmanifest`).

Nothing else in the codebase references logo artwork directly — `Logo.jsx` and
`favicon.svg` are the only two touch points.

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
