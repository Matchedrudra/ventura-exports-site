/**
 * Writes public/sitemap.xml from the same page list the app and the static
 * snapshots use, so the three can never disagree. Only canonical, indexable
 * URLs on the permanent domain are listed.
 *
 * Run: npm run seo:sitemap   (after adding a page or materially changing one;
 * bump LAST_MODIFIED in src/data/seo.js first)
 */
import { writeFileSync } from 'node:fs'
import { sitemapPaths, absUrl, LAST_MODIFIED } from '../src/data/seo.js'
import { products } from '../src/data/products.js'

const paths = [...sitemapPaths, ...products.map((p) => `/products/${p.slug}`)]
const body = paths
  .map((p) => `  <url>\n    <loc>${absUrl(p)}</loc>\n    <lastmod>${LAST_MODIFIED}</lastmod>\n  </url>`)
  .join('\n')
writeFileSync(
  'public/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
)
console.log(`sitemap.xml: ${paths.length} URLs`)
