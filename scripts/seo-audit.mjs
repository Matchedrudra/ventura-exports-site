/**
 * SEO audit of the *built* site (run `npm run build` first, then `npm run seo:audit`).
 *
 * Checks every URL in the sitemap against its static snapshot in dist/: title,
 * description, canonical, robots, Open Graph / Twitter tags, JSON-LD validity,
 * domain consistency and the textile-first identity. Exits 1 on any failure.
 */
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { SITE_URL, HOME_TITLE, HOME_DESCRIPTION } from '../src/data/seo.js'

const DIST = 'dist'
let failures = 0
let warnings = 0
const fail = (m) => { failures += 1; console.log('  ✗ FAIL', m) }
const warn = (m) => { warnings += 1; console.log('  ! warn', m) }
const ok = (m) => console.log('  ✓', m)

const unescape = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&lt;/g, '<')
const tag = (html, re) => { const m = html.match(re); return m ? unescape(m[1]) : null }
const metaName = (html, n) => tag(html, new RegExp(`<meta\\s+name="${n}"\\s+content="([^"]*)"`))
const metaProp = (html, n) => tag(html, new RegExp(`<meta\\s+property="${n}"\\s+content="([^"]*)"`))

// ── sitemap ────────────────────────────────────────────────────────────────
console.log('\nsitemap.xml')
const sitemapPath = join(DIST, 'sitemap.xml')
if (!existsSync(sitemapPath)) fail('dist/sitemap.xml missing')
const sitemap = existsSync(sitemapPath) ? readFileSync(sitemapPath, 'utf8') : ''
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
urls.length ? ok(`${urls.length} URLs`) : fail('no <loc> entries')
if (new Set(urls).size !== urls.length) fail('duplicate URLs in sitemap')
for (const u of urls) {
  if (!u.startsWith(`${SITE_URL}/`) && u !== SITE_URL) fail(`off-domain URL: ${u}`)
  if (/vercel\.app|localhost|http:\/\//.test(u)) fail(`non-canonical URL: ${u}`)
}
if (/<lastmod>/.test(sitemap)) ok('lastmod present')

// ── robots.txt ─────────────────────────────────────────────────────────────
console.log('\nrobots.txt')
const robots = existsSync(join(DIST, 'robots.txt')) ? readFileSync(join(DIST, 'robots.txt'), 'utf8') : ''
robots ? ok('present') : fail('missing')
if (/^\s*Disallow:\s*\/\s*$/m.test(robots)) fail('blocks the whole site')
else ok('does not block the site')
if (robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) ok('declares the sitemap')
else fail('sitemap not declared')

// ── per-URL checks ─────────────────────────────────────────────────────────
const seenTitles = new Map()
const seenDescs = new Map()
for (const u of urls) {
  const path = u.replace(SITE_URL, '') || '/'
  console.log(`\n${path}`)
  const file = path === '/' ? join(DIST, 'index.html') : join(DIST, path, 'index.html')
  if (!existsSync(file)) { fail(`no static snapshot at ${file}`); continue }
  const html = readFileSync(file, 'utf8')

  const title = tag(html, /<title>([\s\S]*?)<\/title>/)
  const desc = metaName(html, 'description')
  const canonical = tag(html, /<link\s+rel="canonical"\s+href="([^"]*)"/)
  const robotsMeta = metaName(html, 'robots')

  if (!title) fail('no <title>')
  else {
    title.length > 70 ? warn(`title is ${title.length} chars (may truncate): ${title}`) : ok(`title (${title.length}): ${title}`)
    seenTitles.set(title, [...(seenTitles.get(title) || []), path])
  }
  if (!desc) fail('no meta description')
  else {
    if (desc.length < 70) warn(`description short (${desc.length})`)
    else if (desc.length > 165) warn(`description is ${desc.length} chars (Google may truncate)`)
    else ok(`description (${desc.length})`)
    seenDescs.set(desc, [...(seenDescs.get(desc) || []), path])
  }
  canonical === u ? ok(`canonical = ${canonical}`) : fail(`canonical ${canonical} ≠ ${u}`)
  robotsMeta && !/noindex/i.test(robotsMeta) ? ok(`robots: ${robotsMeta}`) : fail(`robots meta missing or noindex (${robotsMeta})`)

  const og = {
    title: metaProp(html, 'og:title'),
    description: metaProp(html, 'og:description'),
    url: metaProp(html, 'og:url'),
    image: metaProp(html, 'og:image'),
    alt: metaProp(html, 'og:image:alt'),
    site: metaProp(html, 'og:site_name'),
    type: metaProp(html, 'og:type'),
  }
  const tw = {
    title: metaName(html, 'twitter:title'),
    description: metaName(html, 'twitter:description'),
    image: metaName(html, 'twitter:image'),
    card: metaName(html, 'twitter:card'),
  }
  og.title === title && og.description === desc && og.url === u ? ok('Open Graph title/description/url match') : fail('Open Graph does not match page')
  tw.title === title && tw.description === desc && tw.image === og.image && tw.card ? ok('Twitter tags match') : fail('Twitter tags do not match page')
  og.image?.startsWith(`${SITE_URL}/`) ? ok(`og:image ${og.image}`) : fail(`og:image not on the permanent domain: ${og.image}`)
  og.alt ? ok('og:image:alt present') : fail('og:image:alt missing')
  og.site === 'Ventura Exports' ? ok('og:site_name') : fail(`og:site_name = ${og.site}`)
  if (og.image && !existsSync(join(DIST, og.image.replace(SITE_URL, '')))) fail(`og:image file not found in dist: ${og.image}`)

  // JSON-LD
  const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1])
  const parsed = []
  for (const b of blocks) {
    try { parsed.push(JSON.parse(b)) } catch (e) { fail(`invalid JSON-LD: ${e.message}`) }
  }
  const flat = parsed.flatMap((d) => (d['@graph'] ? d['@graph'] : [d]))
  const byType = (t) => flat.filter((n) => n['@type'] === t)
  const [org] = byType('Organization')
  const [site] = byType('WebSite')
  if (!org || !site) fail('Organization / WebSite JSON-LD missing')
  else {
    const need = ['name', 'url', 'logo', 'email']
    const miss = need.filter((k) => !org[k])
    miss.length ? fail(`Organization missing ${miss.join(', ')}`) : ok('Organization JSON-LD valid')
    org.email === 'info@venturaexports.in' ? ok('Organization email = info@venturaexports.in') : fail(`Organization email ${org.email}`)
    site.name && site.url ? ok('WebSite JSON-LD valid') : fail('WebSite missing name/url')
  }
  const crumbs = byType('BreadcrumbList')
  if (path === '/') crumbs.length === 0 ? ok('no breadcrumb on home (correct)') : warn('breadcrumb on home')
  else if (crumbs.length !== 1) fail(`expected 1 BreadcrumbList, found ${crumbs.length}`)
  else {
    const items = crumbs[0].itemListElement || []
    const good = items.length >= 2 && items.every((it, i) => it.position === i + 1 && it.name && it.item?.startsWith(`${SITE_URL}/`))
    good && items[items.length - 1].item === u ? ok(`BreadcrumbList: ${items.map((i) => i.name).join(' › ')}`) : fail('BreadcrumbList malformed or last item ≠ page URL')
  }

  // hygiene
  if (/vercel\.app|localhost:/.test(html)) fail('temporary/dev URL found in HTML')
  if (/rudra@/i.test(html)) fail('old email found')
}

// ── uniqueness ─────────────────────────────────────────────────────────────
console.log('\nuniqueness')
for (const [t, ps] of seenTitles) if (ps.length > 1) fail(`duplicate title on ${ps.join(', ')}: ${t}`)
for (const [d, ps] of seenDescs) if (ps.length > 1) fail(`duplicate description on ${ps.join(', ')}`)
if (![...seenTitles.values()].some((v) => v.length > 1)) ok('all titles unique')
if (![...seenDescs.values()].some((v) => v.length > 1)) ok('all descriptions unique')

// ── identity ───────────────────────────────────────────────────────────────
console.log('\nidentity')
const home = readFileSync(join(DIST, 'index.html'), 'utf8')
tag(home, /<title>([\s\S]*?)<\/title>/) === HOME_TITLE ? ok('home title is the required title') : fail('home title differs from required')
metaName(home, 'description') === HOME_DESCRIPTION ? ok('home description is the required description') : fail('home description differs from required')
const identityText = `${HOME_TITLE} ${HOME_DESCRIPTION}`
const secondaryLed = /fibc|jumbo|packaging/i.test(identityText)
secondaryLed ? fail('FIBC/packaging appears in the home title/description') : ok('no FIBC/packaging in home title or description')

// secondary products must never lead a core page's title
for (const u of urls) {
  const path = u.replace(SITE_URL, '') || '/'
  if (['/', '/about', '/yarns', '/fabrics', '/weaving-accessories', '/contact'].includes(path)) {
    const t = tag(readFileSync(path === '/' ? join(DIST, 'index.html') : join(DIST, path, 'index.html'), 'utf8'), /<title>([\s\S]*?)<\/title>/) || ''
    if (/fibc|jumbo|spice/i.test(t)) fail(`${path} title mentions a secondary product`)
  }
}

console.log(`\n${failures === 0 ? 'PASS' : 'FAIL'} — ${failures} failure(s), ${warnings} warning(s)\n`)
process.exit(failures === 0 ? 0 : 1)
