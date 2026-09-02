// Vercel serverless function — receives the website enquiry form and
// emails a structured enquiry to Ventura Exports via Resend.
//
// Required environment variables (see .env.example):
//   RESEND_API_KEY   — Resend API key
//   ENQUIRY_FROM     — verified sender, e.g. "Ventura Exports <enquiries@venturaexports.in>"
//   ENQUIRY_TO       — destination, e.g. rudra@venturaexports.in
// Optional:
//   ENQUIRY_CC       — comma-separated extra recipients
//   ENQUIRY_TOKEN    — shared secret; if set, request must send header x-ventura-token

import { Resend } from 'resend'

// Validation is intentionally inlined (not imported from src/) so this
// function is fully self-contained for the Vercel Node runtime. It mirrors
// src/lib/validation.js — keep the two in sync.
const PRODUCT_OPTIONS = [
  'FIBC / Jumbo Bags',
  'PP Woven Bags',
  'HDPE Woven Bags',
  'Customized Woven Packaging',
  'Other',
]
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const blank = (v) => String(v || '').trim().length === 0

function validateEnquiry(data = {}) {
  const errors = {}
  if (blank(data.fullName)) errors.fullName = 'Please enter your full name.'
  if (blank(data.company)) errors.company = 'Please enter your company name.'
  if (blank(data.email)) errors.email = 'Please enter your business email.'
  else if (!EMAIL_RE.test(String(data.email).trim()))
    errors.email = 'Please enter a valid email address.'
  if (blank(data.country)) errors.country = 'Please enter your country.'
  if (blank(data.product)) errors.product = 'Please select a product.'
  else if (!PRODUCT_OPTIONS.includes(data.product))
    errors.product = 'Please select a valid product.'
  if (String(data.message || '').length > 4000)
    errors.message = 'Please keep the message under 4000 characters.'
  return errors
}

const FIELD_LABELS = {
  fullName: 'Name',
  company: 'Company',
  email: 'Email',
  country: 'Country',
  phone: 'Phone / WhatsApp',
  product: 'Product',
  quantity: 'Quantity',
  dimensions: 'Dimensions',
  swl: 'SWL / Capacity',
  construction: 'Construction',
  filling: 'Filling',
  discharge: 'Discharge',
  liner: 'Liner',
  gsm: 'Fabric weight (GSM)',
  lamination: 'Lamination',
  printing: 'Printing',
  destinationCountry: 'Destination country',
  destinationPort: 'Destination port / city',
}

const clean = (v) => String(v ?? '').trim()
const esc = (s) =>
  clean(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function row(label, value) {
  const v = clean(value)
  if (!v) return ''
  return `<tr><td style="padding:6px 16px 6px 0;color:#5b6472;font:500 12px/1.4 -apple-system,Segoe UI,Roboto,Arial,sans-serif;text-transform:uppercase;letter-spacing:.08em;white-space:nowrap;vertical-align:top">${esc(
    label,
  )}</td><td style="padding:6px 0;color:#17233a;font:400 14px/1.55 -apple-system,Segoe UI,Roboto,Arial,sans-serif">${esc(
    v,
  )}</td></tr>`
}

function section(title, pairs) {
  const body = pairs.map(([l, v]) => row(l, v)).join('')
  if (!body) return ''
  return `<h2 style="margin:28px 0 8px;font:600 13px/1.4 -apple-system,Segoe UI,Roboto,Arial,sans-serif;text-transform:uppercase;letter-spacing:.1em;color:#a8814a">${esc(
    title,
  )}</h2><table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%">${body}</table>`
}

function buildHtml(d, meta) {
  return `<!doctype html><html><body style="margin:0;background:#f5f2ea;padding:24px">
  <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #e4ddca">
    <div style="background:#17233a;padding:20px 24px">
      <div style="font:600 14px/1.4 -apple-system,Segoe UI,Roboto,Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#f5f2ea">New Ventura Exports B2B Enquiry</div>
    </div>
    <div style="padding:8px 24px 28px">
      ${section('Buyer details', [
        [FIELD_LABELS.fullName, d.fullName],
        [FIELD_LABELS.company, d.company],
        [FIELD_LABELS.email, d.email],
        [FIELD_LABELS.country, d.country],
        [FIELD_LABELS.phone, d.phone],
      ])}
      ${section('Product requirement', [
        [FIELD_LABELS.product, d.product],
        [FIELD_LABELS.quantity, d.quantity],
        [FIELD_LABELS.dimensions, d.dimensions],
        [FIELD_LABELS.swl, d.swl],
        [FIELD_LABELS.construction, d.construction],
        [FIELD_LABELS.filling, d.filling],
        [FIELD_LABELS.discharge, d.discharge],
        [FIELD_LABELS.liner, d.liner],
        [FIELD_LABELS.gsm, d.gsm],
        [FIELD_LABELS.lamination, d.lamination],
        [FIELD_LABELS.printing, d.printing],
      ])}
      ${section('Destination', [
        [FIELD_LABELS.destinationCountry, d.destinationCountry],
        [FIELD_LABELS.destinationPort, d.destinationPort],
      ])}
      ${
        clean(d.message)
          ? `<h2 style="margin:28px 0 8px;font:600 13px/1.4 -apple-system,Segoe UI,Roboto,Arial,sans-serif;text-transform:uppercase;letter-spacing:.1em;color:#a8814a">Additional requirements</h2>
             <p style="margin:0;color:#17233a;font:400 14px/1.6 -apple-system,Segoe UI,Roboto,Arial,sans-serif;white-space:pre-wrap">${esc(
               d.message,
             )}</p>`
          : ''
      }
      <hr style="border:0;border-top:1px solid #e4ddca;margin:28px 0 12px" />
      <p style="margin:0;color:#5b6472;font:400 12px/1.6 -apple-system,Segoe UI,Roboto,Arial,sans-serif">
        Submitted: ${esc(meta.submittedAt)}<br/>
        Source: ${esc(meta.source)}${meta.ip ? ` · IP ${esc(meta.ip)}` : ''}<br/>
        Reply directly to this email to respond to ${esc(d.email)}.
      </p>
    </div>
  </div>
  </body></html>`
}

function buildText(d, meta) {
  const line = (l, v) => (clean(v) ? `${l}: ${clean(v)}\n` : '')
  return (
    `NEW VENTURA EXPORTS B2B ENQUIRY\n\n` +
    `BUYER DETAILS\n` +
    line('Name', d.fullName) +
    line('Company', d.company) +
    line('Email', d.email) +
    line('Country', d.country) +
    line('Phone', d.phone) +
    `\nPRODUCT REQUIREMENT\n` +
    line('Product', d.product) +
    line('Quantity', d.quantity) +
    line('Dimensions', d.dimensions) +
    line('SWL / Capacity', d.swl) +
    line('Construction', d.construction) +
    line('Filling', d.filling) +
    line('Discharge', d.discharge) +
    line('Liner', d.liner) +
    line('Fabric weight (GSM)', d.gsm) +
    line('Lamination', d.lamination) +
    line('Printing', d.printing) +
    `\nDESTINATION\n` +
    line('Country', d.destinationCountry) +
    line('Port / City', d.destinationPort) +
    (clean(d.message) ? `\nADDITIONAL REQUIREMENTS\n${clean(d.message)}\n` : '') +
    `\n--\nSubmitted: ${meta.submittedAt}\nSource: ${meta.source}\n`
  )
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const requiredToken = process.env.ENQUIRY_TOKEN
  if (requiredToken && req.headers['x-ventura-token'] !== requiredToken) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  let body = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      return res.status(400).json({ error: 'Invalid JSON body' })
    }
  }
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'Missing request body' })
  }

  // Honeypot — accept silently, send nothing.
  if (clean(body.botField) || clean(body.company_website)) {
    return res.status(200).json({ ok: true })
  }

  const data = {}
  for (const key of [
    'fullName', 'company', 'email', 'country', 'phone', 'product', 'quantity',
    'dimensions', 'swl', 'construction', 'filling', 'discharge', 'liner', 'gsm',
    'lamination', 'printing', 'destinationCountry', 'destinationPort', 'message',
  ]) {
    data[key] = clean(body[key]).slice(0, key === 'message' ? 4000 : 300)
  }

  const errors = validateEnquiry(data)
  if (Object.keys(errors).length > 0) {
    return res.status(422).json({ error: 'Please check the form fields.', fields: errors })
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.ENQUIRY_FROM || 'Ventura Exports <onboarding@resend.dev>'
  const to = process.env.ENQUIRY_TO || 'rudra@venturaexports.in'
  const cc = (process.env.ENQUIRY_CC || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  if (!apiKey) {
    return res.status(503).json({
      error:
        'Email service is not configured yet. Add RESEND_API_KEY, ENQUIRY_FROM and ENQUIRY_TO in the Vercel project settings.',
    })
  }

  const meta = {
    submittedAt: new Date().toLocaleString('en-GB', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'short',
    }) + ' IST',
    source: clean(body.submittedFrom) || 'website',
    ip:
      (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
      req.socket?.remoteAddress ||
      '',
  }

  const subject = `Enquiry — ${data.product}${data.company ? ` — ${data.company}` : ''}`

  // Staging / QA escape hatch: render the email but do not send it.
  if (apiKey === 'TEST_MODE') {
    console.log('[enquiry:TEST_MODE]', subject, '\n', buildText(data, meta))
    return res.status(200).json({ ok: true, testMode: true })
  }

  const resend = new Resend(apiKey)

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      cc: cc.length ? cc : undefined,
      replyTo: data.email,
      subject,
      html: buildHtml(data, meta),
      text: buildText(data, meta),
    })

    if (error) {
      console.error('Resend error:', error)
      return res.status(502).json({ error: 'Email could not be delivered. Please try again.' })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Enquiry handler error:', err)
    return res.status(500).json({ error: 'Unexpected error sending the enquiry.' })
  }
}
