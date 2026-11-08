// Shared, dependency-free validation and option lists used by the quote form.
// The serverless handler (api/enquiry.js) deliberately inlines a copy so it
// stays self-contained — keep the two in sync.

export const CATEGORY_YARNS = 'Yarns'
export const CATEGORY_FABRICS = 'Fabrics'
export const CATEGORY_FIBC = 'FIBC Bags'
export const CATEGORY_WEAVING = 'Textile Accessories & Weaving'
export const CATEGORY_AGRO = 'Spices & Agro Commodities'
export const CATEGORY_OTHER = 'Other Products'

// category -> allowed product types (the "Product Type" dropdown)
export const PRODUCT_TYPES = {
  [CATEGORY_YARNS]: [
    '100% Cotton Yarn',
    'Combed Cotton Yarn',
    'Carded Cotton Yarn',
    'Ring Spun Cotton Yarn',
    'Open End Cotton Yarn',
    'Compact Cotton Yarn',
    'Polyester Spun Yarn',
    'Polyester Filament Yarn',
    'Textured Polyester Yarn',
    'Polyester Cotton Yarn',
    'Cotton Viscose Blend Yarn',
    'Other Blended Yarn',
    'Other Yarn',
  ],
  [CATEGORY_FABRICS]: [
    'Cotton Fabric',
    'Polyester Fabric',
    'Cotton-Polyester Blended Fabric',
    'Knitted Fabric',
    'Woven Fabric',
    'Other Fabric',
  ],
  [CATEGORY_WEAVING]: [
    'Skew Reeds',
    'Textile Healds',
    'Heald Frames & Accessories',
    'Drop Wires',
    'Other Weaving Machinery Accessories',
  ],
  [CATEGORY_FIBC]: [
    'Standard Bag',
    'U-Panel Bag',
    'Circular Bag',
    'Baffle Bag (Q-Bag)',
    'Tunnel Lift Bag',
    'Full Loop Bag',
    'Conductive Bag (Type-C)',
    'Dissipative Bag (Type-D)',
    'Other / not sure yet',
  ],
  [CATEGORY_AGRO]: [
    'Indian Spices',
    'Dehydrated Onion',
    'Dehydrated Garlic',
    'Other Agricultural Commodity',
  ],
  [CATEGORY_OTHER]: [
    'PP & HDPE Woven Bags',
    'BOPP Laminated Bags',
    'Jute Bags',
    'Packaging Tapes',
    'Corrugated Boxes & Cartons',
    'Customized Woven Packaging',
    'Industrial Filter Bags',
    'Industrial & Specialized Packaging',
    'Other Product',
  ],
}

export const CATEGORY_OPTIONS = Object.keys(PRODUCT_TYPES)

// Older deep links used ?product=<label>; map them onto category + type.
export function resolveLegacyProduct(label) {
  if (!label) return null
  if (label === 'FIBC / Jumbo Bags') return { category: CATEGORY_FIBC, type: '' }
  const other = {
    'PP & HDPE Woven Bags': 'PP & HDPE Woven Bags',
    'BOPP Laminated Bags': 'BOPP Laminated Bags',
    'Jute Bags': 'Jute Bags',
    'Packaging Tapes': 'Packaging Tapes',
    'Corrugated Boxes & Cartons': 'Corrugated Boxes & Cartons',
    'Customized Woven Packaging': 'Customized Woven Packaging',
    'Industrial Filter Bags': 'Industrial Filter Bags',
    'Industrial & Specialized Packaging': 'Industrial & Specialized Packaging',
  }
  if (other[label]) return { category: CATEGORY_OTHER, type: other[label] }
  if (label === 'Other Packaging Requirement') return { category: CATEGORY_OTHER, type: 'Other Product' }
  return null
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function isEmail(value) {
  return EMAIL_RE.test(String(value || '').trim())
}

export function isBlank(value) {
  return String(value || '').trim().length === 0
}

/**
 * Validate the enquiry payload. Returns an object of { field: message }.
 * An empty object means the payload is valid.
 */
export function validateEnquiry(data = {}) {
  const errors = {}

  if (isBlank(data.fullName)) errors.fullName = 'Please enter your full name.'
  if (isBlank(data.company)) errors.company = 'Please enter your company name.'
  if (isBlank(data.email)) errors.email = 'Please enter your business email.'
  else if (!isEmail(data.email)) errors.email = 'Please enter a valid email address.'
  if (isBlank(data.country)) errors.country = 'Please enter your country.'

  if (isBlank(data.category)) errors.category = 'Please select a product category.'
  else if (!CATEGORY_OPTIONS.includes(data.category)) errors.category = 'Please select a valid category.'
  else if (!isBlank(data.product) && !PRODUCT_TYPES[data.category].includes(data.product))
    errors.product = 'Please select a valid product type.'

  if (String(data.message || '').length > 4000)
    errors.message = 'Please keep the message under 4000 characters.'

  return errors
}
