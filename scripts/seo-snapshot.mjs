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

const SITE = 'https://www.venturaexports.in'
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
    slug: 'jute-bags',
    name: 'Jute Bags',
    summary:
      'Jute shopping, promotional, grocery and industrial sacks — plain, laminated or printed — developed in the construction, size, handle and finish the application requires.',
    image: '/images/jute-bags-stacked.jpg',
  },
  {
    slug: 'packaging-tapes',
    name: 'Packaging Tapes',
    summary:
      'BOPP, carton-sealing and printed packaging tapes for e-commerce, warehouse and industrial use — width, length and printing coordinated to the application.',
    image: '/images/packaging-tape-carton-sealing.jpg',
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
    name: 'Industrial & Specialized Packaging',
    summary:
      'Where a requirement sits outside the core categories, Ventura evaluates supply from its Indian manufacturing network — from protective and transit packaging to specialised industrial formats.',
    image: '/images/woven-fabric-loom.jpg',
  },
]

const PAGES = [
  {
    path: '/about',
    title: 'About Us',
    description:
      'Ventura Exports is an India-based export and sourcing company, headquartered in Gujarat, supplying yarns and fabrics to international buyers through reliable Indian manufacturing partners.',
  },
  {
    path: '/yarns',
    title: 'Yarns',
    description:
      'Cotton, polyester and blended yarns sourced from Indian manufacturing partners — combed, carded, ring spun, open end and compact cotton; spun, filament and textured polyester; and blends. Specify count, composition and cone packaging.',
    image: '/images/textile/spinning-line-india.jpg',
  },
  {
    path: '/fabrics',
    title: 'Fabrics',
    description:
      "Cotton, polyester and cotton-polyester blended fabrics, knitted and woven, sourced through Ventura Exports' Indian manufacturing network. Specify GSM, width, construction, colour and finish.",
    image: '/images/textile/fabric-rolls-factory.jpg',
  },
  {
    path: '/other-products',
    title: 'Other Products',
    description:
      'Additional sourcing capabilities from Ventura Exports: FIBC jumbo bags, PP woven bags and industrial packaging, plus Indian spices, dehydrated onion, dehydrated garlic and other agricultural commodities.',
  },
  {
    path: '/quality-packaging',
    title: 'Quality & Packaging',
    description:
      'How Ventura Exports works: understanding buyer specifications, matching Indian manufacturing partners, and coordinating cone configuration, export packaging, documentation and shipment for yarns and fabrics.',
    image: '/images/textile/white-cones-winder.jpg',
  },
  {
    path: '/contact',
    title: 'Contact',
    description:
      'Contact Ventura Exports — Gujarat, India. Email info@venturaexports.in, call or WhatsApp, or send a product enquiry for yarns, fabrics and other products.',
  },
  {
    path: '/request-a-quote',
    title: 'Request a Quote',
    description:
      'Send Ventura Exports a B2B enquiry for yarns, fabrics, FIBC bags, spices and other products. The form reaches us with your specification, packaging preference and destination structured.',
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
    : 'Ventura Exports | Yarns & Fabrics from India'
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
