// Shared, dependency-free validation used by the quote form and the
// serverless enquiry handler.

export const PRODUCT_OPTIONS = [
  'FIBC / Jumbo Bags',
  'PP Woven Bags',
  'HDPE Woven Bags',
  'Customized Woven Packaging',
  'Other',
]

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
  if (isBlank(data.product)) errors.product = 'Please select a product.'
  else if (!PRODUCT_OPTIONS.includes(data.product)) errors.product = 'Please select a valid product.'

  if (String(data.message || '').length > 4000)
    errors.message = 'Please keep the message under 4000 characters.'

  return errors
}

/** Field groups rendered by the form, in order. */
export const FIBC_FIELDS = [
  'dimensions',
  'swl',
  'construction',
  'filling',
  'discharge',
  'liner',
  'printing',
]
