// Vercel serverless function — receives the website enquiry form and
// emails a structured enquiry to Ventura Exports via Resend.
//
// Required environment variables (see .env.example):
//   RESEND_API_KEY   — Resend API key
//   ENQUIRY_FROM     — verified sender, e.g. "Ventura Exports <enquiries@venturaexports.in>"
//   ENQUIRY_TO       — destination, e.g. rudra@venturaexports.in
// Optional:
//   ENQUIRY_CC       — comma-separated extra recipients
//   ENQUIRY_TOKEN    — shared secret for server-to-server callers; if set, a
//                      request must send header x-ventura-token. LEAVE UNSET for
//                      the public website form (a browser can't hold a secret).
//   TURNSTILE_SECRET — Cloudflare Turnstile secret; if set, the request must
//                      carry a valid `turnstileToken` (pair with the client's
//                      VITE_TURNSTILE_SITE_KEY). Dormant when unset.

import { Resend } from 'resend'

// --- lightweight abuse controls -------------------------------------------
// Best-effort per-IP throttle. Serverless instances are ephemeral and not
// shared, so this only blunts bursts that hit the same warm instance — good
// enough alongside the honeypot + timing check. For hard guarantees put a
// Vercel KV / Upstash counter here instead.
const RATE = { WINDOW_MS: 60_000, MAX: 5 }
const hits = new Map() // ip -> number[] (timestamps)

function rateLimited(ip) {
  if (!ip) return false
  const now = Date.now()
  const arr = (hits.get(ip) || []).filter((t) => now - t < RATE.WINDOW_MS)
  arr.push(now)
  hits.set(ip, arr)
  if (hits.size > 5000) hits.clear() // crude memory cap
  return arr.length > RATE.MAX
}

async function turnstileOk(token, ip) {
  const secret = process.env.TURNSTILE_SECRET
  if (!secret) return true // feature dormant
  if (!token) return false
  try {
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token, ...(ip ? { remoteip: ip } : {}) }),
    })
    const j = await r.json()
    return j.success === true
  } catch {
    return false
  }
}

const ATTACH_MAX = 3 * 1024 * 1024
const ATTACH_EXT = /\.(pdf|jpe?g|png|docx?|xlsx?|zip)$/i

function normalizeAttachment(a) {
  if (!a || typeof a !== 'object') return { ok: true, value: undefined }
  const filename = String(a.filename || '').trim().slice(0, 180)
  const data = String(a.data || '')
  if (!filename || !data) return { ok: true, value: undefined }
  if (!ATTACH_EXT.test(filename)) return { ok: false, error: 'Unsupported attachment type.' }
  if (!/^[A-Za-z0-9+/]+=*$/.test(data)) return { ok: false, error: 'Attachment could not be read.' }
  const bytes = Math.floor((data.length * 3) / 4)
  if (bytes > ATTACH_MAX) return { ok: false, error: 'Attachment is larger than 3 MB.' }
  return { ok: true, value: { filename, content: data } }
}

// Validation is intentionally inlined (not imported from src/) so this
// function is fully self-contained for the Vercel Node runtime. It mirrors
// src/lib/validation.js — keep the two in sync.
const PRODUCT_OPTIONS = [
  'FIBC / Jumbo Bags',
  'PP & HDPE Woven Bags',
  'BOPP Laminated Bags',
  'Customized Woven Packaging',
  'Corrugated Boxes & Cartons',
  'Industrial Filter Bags',
  'Other Industrial Packaging',
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
  application: 'Application',
  operatingTemp: 'Operating temperature',
  specification: 'Specification / requirement',
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
      <div style="font:600 14px/1.4 -apple-system,Segoe UI,Roboto,Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#f5f2ea">New Ventura B2B Enquiry</div>
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
        [FIELD_LABELS.application, d.application],
        [FIELD_LABELS.operatingTemp, d.operatingTemp],
        [FIELD_LABELS.specification, d.specification],
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
    `NEW VENTURA B2B ENQUIRY\n\n` +
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
    line('Application', d.application) +
    line('Operating temperature', d.operatingTemp) +
    line('Specification / requirement', d.specification) +
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

  const ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    ''

  if (rateLimited(ip)) {
    return res.status(429).json({ error: 'Too many enquiries in a short time. Please try again shortly.' })
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

  // Timing check — a real person takes more than a couple of seconds to fill
  // this in. `elapsedMs` is measured on the client, so it's clock-skew safe.
  const elapsed = Number(body.elapsedMs)
  if (Number.isFinite(elapsed) && elapsed >= 0 && elapsed < 2500) {
    return res.status(200).json({ ok: true })
  }

  if (!(await turnstileOk(body.turnstileToken, ip))) {
    return res.status(403).json({ error: 'Verification failed. Please reload the page and try again.' })
  }

  const attach = normalizeAttachment(body.attachment)
  if (!attach.ok) {
    return res.status(422).json({ error: attach.error })
  }

  const data = {}
  for (const key of [
    'fullName', 'company', 'email', 'country', 'phone', 'product', 'quantity',
    'dimensions', 'swl', 'construction', 'filling', 'discharge', 'liner', 'gsm',
    'lamination', 'printing', 'application', 'operatingTemp', 'specification',
    'destinationCountry', 'destinationPort', 'message',
  ]) {
    const long = key === 'message' || key === 'specification'
    data[key] = clean(body[key]).slice(0, long ? 4000 : 300)
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
    ip,
  }

  const subject = `Enquiry — ${data.product}${data.company ? ` — ${data.company}` : ''}`

  // Staging / QA escape hatch: render the email but do not send it.
  if (apiKey === 'TEST_MODE') {
    console.log(
      '[enquiry:TEST_MODE]',
      subject,
      attach.value ? `\n[attachment: ${attach.value.filename}]` : '',
      '\n',
      buildText(data, meta),
    )
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
      attachments: attach.value ? [attach.value] : undefined,
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
