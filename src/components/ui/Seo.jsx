import { useEffect } from 'react'
import { SITE_URL, SITE_NAME, DEFAULT_IMAGE, DEFAULT_IMAGE_ALT, HOME_TITLE, breadcrumbLd } from '../../data/seo'
import { site } from '../../data/site'

/**
 * Document head manager for this SPA: title, description, canonical, robots,
 * Open Graph / Twitter tags and per-route JSON-LD (BreadcrumbList plus any
 * extras). The crawlable baseline for every route is baked into static HTML at
 * build time by scripts/seo-snapshot.mjs from the same data; this keeps the
 * live document in sync as the visitor navigates.
 */

function setMeta(selector, attr, key, value) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function Seo({
  title,
  description,
  path = '/',
  image,
  imageAlt,
  type = 'website',
  noindex = false,
  crumbs,
  jsonLd,
}) {
  const fullTitle = title || HOME_TITLE
  const desc = description || site.descriptionShort
  const url = `${SITE_URL}${path === '/' ? '/' : path}`
  const imgPath = image || DEFAULT_IMAGE
  const img = imgPath.startsWith('http') ? imgPath : `${SITE_URL}${imgPath}`
  const alt = imageAlt || DEFAULT_IMAGE_ALT
  const robots = noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large'
  // value-based key so callers can pass fresh arrays/objects each render
  const ldKey = JSON.stringify([crumbs || null, jsonLd || null])

  useEffect(() => {
    document.title = fullTitle

    setMeta('meta[name="description"]', 'name', 'description', desc)
    setMeta('meta[name="robots"]', 'name', 'robots', robots)
    setLink('canonical', url)

    setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', SITE_NAME)
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle)
    setMeta('meta[property="og:description"]', 'property', 'og:description', desc)
    setMeta('meta[property="og:url"]', 'property', 'og:url', url)
    setMeta('meta[property="og:type"]', 'property', 'og:type', type)
    setMeta('meta[property="og:image"]', 'property', 'og:image', img)
    setMeta('meta[property="og:image:alt"]', 'property', 'og:image:alt', alt)

    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', desc)
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', img)
    setMeta('meta[name="twitter:image:alt"]', 'name', 'twitter:image:alt', alt)
  }, [fullTitle, desc, url, img, alt, type, robots])

  // Route-level JSON-LD. Replaces anything baked into the static snapshot for
  // this route so the document never carries duplicates.
  useEffect(() => {
    const [c, extra] = JSON.parse(ldKey)
    const blocks = []
    if (c && c.length > 1) blocks.push(breadcrumbLd(c))
    if (extra) blocks.push(...(Array.isArray(extra) ? extra : [extra]))

    document.head.querySelectorAll('script[data-seo-route]').forEach((el) => el.remove())
    const nodes = blocks.map((block) => {
      const el = document.createElement('script')
      el.type = 'application/ld+json'
      el.dataset.seoRoute = 'true'
      el.textContent = JSON.stringify(block)
      document.head.appendChild(el)
      return el
    })
    return () => nodes.forEach((el) => el.remove())
  }, [ldKey])

  return null
}
