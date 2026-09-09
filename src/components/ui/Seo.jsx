import { useEffect } from 'react'
import { site } from '../../data/site'

/**
 * Lightweight document head manager for this SPA — sets the title and the
 * meta/link tags that matter for sharing and indexing. No dependency; the
 * crawlable baseline lives in index.html and this keeps it in sync per route.
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

export function Seo({ title, description, path = '/', image = '/og-image.jpg', type = 'website' }) {
  const fullTitle = title
    ? `${title} — ${site.name}`
    : `${site.name} | Industrial Packaging & Filtration Supplier — India`
  const desc = description || site.descriptionShort
  const url = `${site.url}${path === '/' ? '/' : path}`
  const img = image.startsWith('http') ? image : `${site.url}${image}`

  useEffect(() => {
    document.title = fullTitle

    setMeta('meta[name="description"]', 'name', 'description', desc)
    setLink('canonical', url)

    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle)
    setMeta('meta[property="og:description"]', 'property', 'og:description', desc)
    setMeta('meta[property="og:url"]', 'property', 'og:url', url)
    setMeta('meta[property="og:type"]', 'property', 'og:type', type)
    setMeta('meta[property="og:image"]', 'property', 'og:image', img)

    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', desc)
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', img)
  }, [fullTitle, desc, url, img, type])

  return null
}
