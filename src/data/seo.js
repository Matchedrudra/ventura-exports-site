// Single source of truth for page-level SEO.
//
// Used by the runtime <Seo> component, by scripts/seo-snapshot.mjs (which bakes
// the same tags into static HTML for crawlers and link previews) and by
// scripts/generate-sitemap.mjs. Plain ESM with no imports so Node can load it.
//
// Positioning: textile yarns, fabrics and weaving accessories first;
// FIBC / woven bags and agro products are secondary and only ever described as
// such. Nothing here claims certifications, customers, statistics or owned
// manufacturing.

export const SITE_URL = 'https://www.venturaexports.in'
export const SITE_NAME = 'Ventura Exports'
export const LAST_MODIFIED = '2026-11-09' // update when page content materially changes

export const DEFAULT_IMAGE = '/og-image.jpg'
export const DEFAULT_IMAGE_ALT =
  'Ventura Exports — textile yarns, fabrics and weaving accessories supplied from India'

export const HOME_TITLE = 'Ventura Exports | Textile Yarns, Fabrics & Weaving Accessories'
export const HOME_DESCRIPTION =
  'Ventura Exports is an India-based textile supply and export company specialising in cotton yarn, polyester yarn, blended yarn, fabrics and precision weaving accessories for international markets.'

const brand = (t) => `${t} | ${SITE_NAME}`

/** Fit text to a meta-description length, cutting at a word boundary. */
export function clip(text, max = 158) {
  const t = String(text).replace(/\s+/g, ' ').trim()
  if (t.length <= max) return t
  const cut = t.slice(0, max - 1)
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:—-]+$/, '')}…`
}

export const pages = {
  '/': {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    crumb: 'Home',
  },
  '/about': {
    title: 'About Us | Ventura Exports — Indian Textile Supply & Export',
    description:
      'Ventura Exports is a Gujarat-based textile supply and export company sourcing yarns, fabrics and weaving accessories for international buyers.',
    crumb: 'About Us',
  },
  '/yarns': {
    title: brand('Cotton, Polyester & Blended Yarns from India'),
    description:
      'Cotton, polyester and blended yarns from India: combed, carded, ring spun, open end and compact. Specify count, composition and export cone packaging.',
    crumb: 'Yarns',
    image: '/images/textile/spinning-line-india.jpg',
    imageAlt: 'A ring-spinning line in an Indian textile mill, with rows of yarn packages',
  },
  '/fabrics': {
    title: brand('Cotton & Polyester Fabrics, Knitted & Woven'),
    description:
      'Cotton, polyester and blended fabrics, knitted and woven, from India. Specify GSM, width, construction, colour and finish for international orders.',
    crumb: 'Fabrics',
    image: '/images/textile/fabric-rolls-factory.jpg',
    imageAlt: 'Rolls of finished fabric stored on racks in a textile factory',
  },
  '/weaving-accessories': {
    title: brand('Skew Heald Wires, Leno Healds & Drop Wires'),
    description:
      'Precision weaving accessories from India: skew heald wires (O, C and J type), leno healds, drop wires and ridderless healds, plus reeds and heald frames.',
    crumb: 'Weaving Accessories',
    image: '/images/skew/skew-heald-wires-panel.jpg',
    imageAlt: 'Heald wires of several profiles',
  },
  '/quality-packaging': {
    title: brand('Quality & Export Packaging for Yarn Cones'),
    description:
      'How Ventura Exports coordinates specifications, cone configuration, export cartons, labelling and documentation with its Indian manufacturing partners.',
    crumb: 'Quality & Packaging',
    image: '/images/textile/cones-cartoning.jpg',
    imageAlt: 'A worker packing yarn cones into export cartons',
  },
  '/other-products': {
    title: brand('Additional Sourcing: FIBC, Woven Bags & Spices'),
    description:
      'Beyond its core textile range, Ventura Exports also serves selected requirements for FIBC jumbo bags, PP woven bags, Indian spices, and dehydrated onion and garlic.',
    crumb: 'Other Products',
  },
  '/contact': {
    title: 'Contact Ventura Exports | Textile Yarns, Fabrics & Accessories',
    description:
      'Contact Ventura Exports in Gujarat, India. Email info@venturaexports.in, call or WhatsApp +91 81609 59023, or send a textile enquiry.',
    crumb: 'Contact',
  },
  '/request-a-quote': {
    title: brand('Request a Quote'),
    description:
      'Request a quote from Ventura Exports for yarns, fabrics, weaving accessories and other products. Share your specification, packaging and destination.',
    crumb: 'Request a Quote',
  },
}

/** Pages listed in the sitemap, in order. */
export const sitemapPaths = Object.keys(pages)

/** Absolute URL for a site path. */
export const absUrl = (path) => `${SITE_URL}${path === '/' ? '/' : path}`

/** BreadcrumbList structured data from [{ name, path }]. */
export function breadcrumbLd(crumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absUrl(c.path),
    })),
  }
}

/** Props for <Seo> for a core page. */
export function pageSeo(path) {
  const p = pages[path]
  if (!p) throw new Error(`No SEO entry for ${path}`)
  const crumbs = path === '/' ? [] : [{ name: 'Home', path: '/' }, { name: p.crumb, path }]
  return { path, title: p.title, description: p.description, image: p.image, imageAlt: p.imageAlt, crumbs }
}

/** SEO for a secondary-product detail page (FIBC, woven bags, etc.). */
export function productSeo(product) {
  const path = `/products/${product.slug}`
  return {
    path,
    title: brand(product.name),
    description: clip(product.summary),
    image: product.image || undefined,
    imageAlt: product.imageAlt || product.name,
    crumbs: [
      { name: 'Home', path: '/' },
      { name: 'Other Products', path: '/other-products' },
      { name: product.name, path },
    ],
  }
}
