# Ventura Exports

Marketing and enquiry website for **Ventura Exports** — a B2B sourcing and
export‑coordination business connecting international buyers with selected Indian
manufacturing partners for FIBC, PP woven bags, HDPE woven bags and customized
woven packaging.

**Stack:** React 18 · Vite 5 · Tailwind CSS 3 · React Router 6 · a Vercel
serverless function for the enquiry email (Resend). No CSS/animation frameworks —
motion is hand‑rolled CSS with an `IntersectionObserver` and reduced‑motion
support.

---

## Local development

```bash
npm install
cp .env.example .env      # fill in values, or keep RESEND_API_KEY=TEST_MODE
npm run dev               # http://localhost:5173  (includes the /api route)
```

`npm run dev` mounts the `/api/*` functions through a small Vite middleware, so
the enquiry form works end‑to‑end locally. With `RESEND_API_KEY=TEST_MODE` the
handler renders the email and logs it to the terminal instead of sending.

```bash
npm run build            # production build to /dist
npm run preview          # serve the build (static only — no /api)
npm run lint
```

---

## Project structure

```
api/
  enquiry.js              serverless handler — validates + emails the enquiry
public/
  brand/                  favicon + logo assets  (see BRAND_ASSETS.md)
  images/                 photography  (see IMAGE_CREDITS.md)
  robots.txt · sitemap.xml · site.webmanifest · og-image.jpg
src/
  components/
    layout/               Header, Footer, Layout
    ui/                    Button, Container, Reveal, SectionHeading, Figure,
                           PageHeader, CtaBand, Logo, Seo
    home/                  Hero, ProductIndex, PositioningBlock, Interlude,
                           ProcessStrip, MarketsPreview
    products/             SpecTable, OptionGroup, FibcTypeCard
    quote/                QuoteForm, Field
  data/                    products · site · process · markets · quality
  hooks/                   usePrefersReducedMotion · useScrollTop
  lib/                     cn · validation  (shared by form + API)
  pages/                   Home, About, Products, ProductDetail, Sourcing,
                           Markets, Quality, Quote, Contact, NotFound
```

Product content in `src/data/products.js` is the single source of truth. FIBC
construction types, safe working loads, safety factors and technical options come
from the manufacturing partner's reference catalogue; woven‑sack specifications
are intentionally left as "confirmed per specification" and agreed per enquiry.

---

## The enquiry form

`POST /api/enquiry` — JSON body from `src/components/quote/QuoteForm.jsx`.

The handler (`api/enquiry.js`):

1. rejects non‑POST, checks an optional shared‑secret header,
2. drops honeypot submissions silently (`200`),
3. validates with the same rules the client uses (`src/lib/validation.js`),
4. builds a structured HTML + plain‑text email,
5. sends it via **Resend** with `Reply‑To` set to the buyer's address,
6. returns `200 { ok: true }` on success; the form only shows the success
   state on a real `200`.

### Required environment variables

| Variable          | Required | Notes |
|-------------------|----------|-------|
| `RESEND_API_KEY`  | yes      | from <https://resend.com/api-keys>. `TEST_MODE` renders without sending. |
| `ENQUIRY_FROM`    | yes      | e.g. `Ventura Exports <enquiries@venturaexports.in>` — the domain must be verified in Resend. |
| `ENQUIRY_TO`      | yes      | `rudra@venturaexports.in` |
| `ENQUIRY_CC`      | no       | comma‑separated extra recipients |
| `ENQUIRY_TOKEN`   | no       | if set, the client must send it as the `x-ventura-token` header |

Without `RESEND_API_KEY` the endpoint returns `503` with a clear message and the
form shows a failure state — it never reports a false success.

---

## Deploy (Vercel + GoDaddy)

1. Push this repository to GitHub.
2. In Vercel: **New Project → import the repo.** Framework preset **Vite** is
   detected; `vercel.json` sets the build command, output directory and the SPA
   rewrite (everything except `/api/*` falls back to `index.html`).
3. Add the environment variables above under **Project → Settings → Environment
   Variables** (Production + Preview).
4. Add the domain `www.venturaexports.in` (and `venturaexports.in` redirecting to
   it) under **Project → Settings → Domains**, then point GoDaddy DNS at Vercel:
   - `A` record `@` → `76.76.21.21`
   - `CNAME` record `www` → `cname.vercel-dns.com`
5. In **Resend**, add and verify the `venturaexports.in` domain (SPF + DKIM DNS
   records) so mail from `ENQUIRY_FROM` delivers.

`npm run build` must pass with no errors before deploying — it currently does.
