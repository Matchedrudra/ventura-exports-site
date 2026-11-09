/**
 * Post-build SEO snapshot.
 *
 * The app is a client-rendered SPA, so <Seo> only sets per-route
 * <title>/description/canonical/OG *after* JavaScript runs. Link-preview bots
 * (Slack, WhatsApp, LinkedIn, X) and non-rendering crawlers never see that.
 *
 * This writes a static `dist/<route>/index.html` for every route with the
 * correct head tags and a BreadcrumbList baked in, from the same data the app
 * uses (src/data/seo.js, src/data/products.js). The SPA still boots and renders
 * the route body on top — this only fixes the crawlable/shareable metadata.
 *
 * It must never fail the build: any error is logged and the process exits 0.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  pages,
  SITE_URL,
  DEFAULT_IMAGE,
  DEFAULT_IMAGE_ALT,
  breadcrumbLd,
  productSeo,
} from '../src/data/seo.js'
import { products } from '../src/data/products.js'

const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist')

const attr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;')
const text = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
const abs = (p) => (p.startsWith('http') ? p : `${SITE_URL}${p}`)

function entries() {
  const list = Object.entries(pages)
    .filter(([path]) => path !== '/')
    .map(([path, p]) => ({
      path,
      title: p.title,
      description: p.description,
      image: p.image,
      imageAlt: p.imageAlt,
      crumbs: [{ name: 'Home', path: '/' }, { name: p.crumb, path }],
    }))
  for (const product of products) list.push(productSeo(product))
  return list
}

function rewrite(html, page) {
  const url = `${SITE_URL}${page.path}`
  const img = abs(page.image || DEFAULT_IMAGE)
  const alt = page.imageAlt || DEFAULT_IMAGE_ALT
  const set = (re, value) => {
    if (!re.test(html)) throw new Error(`template is missing a tag for ${re}`)
    html = html.replace(re, `$1${attr(value)}$2`)
  }

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${text(page.title)}</title>`)
  set(/(<meta\s+name="description"\s+content=")[\s\S]*?(")/, page.description)
  set(/(<link\s+rel="canonical"\s+href=")[\s\S]*?(")/, url)
  set(/(<meta\s+property="og:title"\s+content=")[\s\S]*?(")/, page.title)
  set(/(<meta\s+property="og:description"\s+content=")[\s\S]*?(")/, page.description)
  set(/(<meta\s+property="og:url"\s+content=")[\s\S]*?(")/, url)
  set(/(<meta\s+property="og:image"\s+content=")[\s\S]*?(")/, img)
  set(/(<meta\s+property="og:image:alt"\s+content=")[\s\S]*?(")/, alt)
  set(/(<meta\s+name="twitter:title"\s+content=")[\s\S]*?(")/, page.title)
  set(/(<meta\s+name="twitter:description"\s+content=")[\s\S]*?(")/, page.description)
  set(/(<meta\s+name="twitter:image"\s+content=")[\s\S]*?(")/, img)
  set(/(<meta\s+name="twitter:image:alt"\s+content=")[\s\S]*?(")/, alt)

  // A page with its own image is not 1200x630; drop the stale size hints.
  if (page.image) html = html.replace(/\s*<meta\s+property="og:image:(width|height)"[^>]*>/g, '')

  const ld = `    <script type="application/ld+json" data-seo-route="static">${JSON.stringify(
    breadcrumbLd(page.crumbs),
  )}</script>\n  </head>`
  return html.replace('</head>', ld)
}

async function main() {
  const indexPath = join(DIST, 'index.html')
  if (!existsSync(indexPath)) {
    console.warn('[seo-snapshot] dist/index.html not found — skipped')
    return
  }
  const base = await readFile(indexPath, 'utf8')
  let n = 0
  for (const page of entries()) {
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
