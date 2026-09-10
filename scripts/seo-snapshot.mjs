/**
 * Post-build SEO snapshot.
 *
 * The app is a client-rendered SPA, so `Seo.jsx` only sets per-route
 * <title>/description/canonical/OG *after* JavaScript runs. Link-preview bots
 * (Slack, WhatsApp, LinkedIn, X) and non-rendering crawlers never see that.
 *
 * This writes a static `dist/<route>/index.html` for every known route with the
 * correct head tags baked in. The SPA still boots and renders the route body on
 * top — this only fixes the crawlable/shareable metadata.
 *
 * It must never fail the build: any error is logged and the process exits 0.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const SITE = 'https://venturaexports.in'
const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist')

const PRODUCTS = [
  {
    slug: 'fibc-jumbo-bags',
    name: 'FIBC / Jumbo Bags',
    summary:
      'Standard, circular, tunnel-lift, baffle, U-panel, full-loop, conductive and dissipative construction — configured with the loop, filling, discharge, liner, coating and printing your operation needs.',
    image: '/images/ventura_fibc_types.jpg',
  },
  {
    slug: 'pp-hdpe-woven-bags',
    name: 'PP & HDPE Woven Bags',
    summary:
      'Woven PP and HDPE sacks for granular and powdered products in retail and industrial pack sizes, configured with fabric weight, lamination, liner, print and closure to suit the packing line and the destination.',
    image: '/images/ventura_woven_rice_handle.jpg',
  },
  {
    slug: 'bopp-laminated-bags',
    name: 'BOPP Laminated Bags',
    summary:
      'Woven PP sacks with a BOPP film laminate carrying high-resolution print — for products where shelf presentation, branding and surface protection matter alongside strength.',
    image: '/images/ventura_bopp_bluefert.jpg',
  },
  {
    slug: 'customized-woven-packaging',
    name: 'Customized Woven Packaging',
    summary:
      'Where a standard bag does not fit, Ventura works from a written brief — dimensions, material, construction, print, lamination, liner, filling and discharge, packing and destination requirements — coordinated as a single specification.',
    image: '/images/ventura_woven_grass_seed.jpg',
  },
  {
    slug: 'corrugated-boxes-cartons',
    name: 'Corrugated Boxes & Cartons',
    summary:
      'Regular slotted cartons, die-cut boxes, heavy-duty and multi-wall corrugated, and custom-size cases — configured by board grade, flute, dimensions, print and closure.',
    image: '/images/product-corrugated.jpg',
  },
  {
    slug: 'industrial-filter-bags',
    name: 'Industrial Filter Bags',
    summary:
      'Filter bags for dust collectors and baghouses — pulse-jet, reverse-air and shaker systems — configured by filtration media, operating temperature, chemical environment, dust characteristics and equipment layout.',
    image: '/images/filter-bags-dust-collector.jpg',
  },
  {
    slug: 'industrial-commercial-packaging',
    name: 'Industrial & Commercial Packaging',
    summary:
      'Where a requirement sits outside the core categories, Ventura evaluates supply from its Indian manufacturing network — from protective and transit packaging to specialised industrial formats.',
    image: '/images/woven-fabric-loom.jpg',
  },
]

const PAGES = [
  {
    path: '/about',
    title: 'About',
    description:
      'Ventura is an India-based packaging and industrial supply company connecting international buyers with capable Indian manufacturing partners across industrial packaging and filtration.',
  },
  {
    path: '/products',
    title: 'Products',
    description:
      "Ventura's packaging portfolio: FIBC and jumbo bags, PP & HDPE woven bags, BOPP laminated bags, customized woven packaging, corrugated boxes and cartons, and industrial filter bags — sourced from Indian manufacturing partners to specification.",
  },
  {
    path: '/how-we-work',
    title: 'How We Work',
    description:
      'How Ventura works: understand, source, validate, supply — the coordination process between international buyers and capable Indian manufacturing partners.',
  },
  {
    path: '/quality',
    title: 'Quality',
    description:
      'Every Ventura order is built around an agreed specification — from the buyer’s requirements and manufacturing through to the batch documentation that accompanies each shipment.',
  },
  {
    path: '/markets',
    title: 'Markets',
    description:
      'Ventura supports international buyers sourcing industrial packaging and filtration from India. Europe, the Middle East, North America, Africa and Asia & Oceania are among the key market regions.',
  },
  {
    path: '/contact',
    title: 'Contact',
    description:
      'Contact Ventura — Ahmedabad, Gujarat, India. Send a packaging or filtration enquiry through the quote form, or reach us by email, phone or WhatsApp.',
  },
  {
    path: '/request-a-quote',
    title: 'Request a Quote',
    description:
      'Send Ventura a B2B enquiry for FIBC, PP & HDPE woven, BOPP laminated, corrugated or industrial filter bags. The form reaches us with the specification structured.',
  },
  ...PRODUCTS.map((p) => ({
    path: `/products/${p.slug}`,
    title: p.name,
    description: p.summary,
    image: p.image,
  })),
]

const attr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;')
const text = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')

function rewrite(html, page) {
  const fullTitle = page.title
    ? `${page.title} — Ventura`
    : 'Ventura | Industrial Packaging & Filtration Supplier — India'
  const url = `${SITE}${page.path}`
  const img = page.image ? `${SITE}${page.image}` : `${SITE}/og-image.jpg`
  const desc = page.description

  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${text(fullTitle)}</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=")[\s\S]*?(")/,
      `$1${attr(desc)}$2`,
    )
    .replace(/(<link\s+rel="canonical"\s+href=")[\s\S]*?(")/, `$1${attr(url)}$2`)
    .replace(/(<meta\s+property="og:title"\s+content=")[\s\S]*?(")/, `$1${attr(fullTitle)}$2`)
    .replace(/(<meta\s+property="og:description"\s+content=")[\s\S]*?(")/, `$1${attr(desc)}$2`)
    .replace(/(<meta\s+property="og:url"\s+content=")[\s\S]*?(")/, `$1${attr(url)}$2`)
    .replace(/(<meta\s+property="og:image"\s+content=")[\s\S]*?(")/, `$1${attr(img)}$2`)
    .replace(/(<meta\s+name="twitter:title"\s+content=")[\s\S]*?(")/, `$1${attr(fullTitle)}$2`)
    .replace(/(<meta\s+name="twitter:description"\s+content=")[\s\S]*?(")/, `$1${attr(desc)}$2`)
    .replace(/(<meta\s+name="twitter:image"\s+content=")[\s\S]*?(")/, `$1${attr(img)}$2`)
}

async function main() {
  const indexPath = join(DIST, 'index.html')
  if (!existsSync(indexPath)) {
    console.warn('[seo-snapshot] dist/index.html not found — skipped')
    return
  }
  const base = await readFile(indexPath, 'utf8')
  let n = 0
  for (const page of PAGES) {
    const out = join(DIST, page.path.replace(/^\//, ''), 'index.html')
    await mkdir(dirname(out), { recursive: true })
    await writeFile(out, rewrite(base, page), 'utf8')
    n += 1
  }
  console.log(`[seo-snapshot] wrote ${n} route snapshots`)
}

main().catch((err) => {
  console.warn('[seo-snapshot] non-fatal:', err?.message || err)
  process.exitCode = 0
})
