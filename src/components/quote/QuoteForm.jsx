import { useCallback, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TextField, SelectField, TextArea, FieldSet } from './Field'
import { Turnstile, turnstileEnabled } from './Turnstile'
import { Button } from '../ui/Button'
import {
  validateEnquiry,
  CATEGORY_OPTIONS,
  PRODUCT_TYPES,
  CATEGORY_YARNS,
  CATEGORY_FABRICS,
  CATEGORY_FIBC,
  CATEGORY_AGRO,
  CATEGORY_OTHER,
  resolveLegacyProduct,
} from '../../lib/validation'
import { fibcOptions } from '../../data/products'
import { contact } from '../../data/site'

const EMPTY = {
  fullName: '',
  company: '',
  email: '',
  country: '',
  phone: '',
  category: '',
  product: '',
  specification: '',
  composition: '',
  yarnPly: '',
  spinning: '',
  gsm: '',
  width: '',
  construction: '',
  colour: '',
  finish: '',
  quantity: '',
  packaging: '',
  dimensions: '',
  swl: '',
  filling: '',
  discharge: '',
  liner: '',
  lamination: '',
  printing: '',
  application: '',
  operatingTemp: '',
  destinationCountry: '',
  destinationPort: '',
  message: '',
  botField: '',
}

// Everything that depends on the chosen category — cleared when it changes.
const CATEGORY_KEYS = [
  'product', 'specification', 'composition', 'yarnPly', 'spinning', 'gsm', 'width',
  'construction', 'colour', 'finish', 'quantity', 'packaging', 'dimensions', 'swl',
  'filling', 'discharge', 'liner', 'lamination', 'printing', 'application', 'operatingTemp',
]

const fillingItems = fibcOptions.find((g) => g.key === 'filling')?.items ?? []
const dischargeItems = fibcOptions.find((g) => g.key === 'discharge')?.items ?? []

// Category-specific fields, rendered between the product type and quantity.
const CATEGORY_FIELDS = {
  [CATEGORY_YARNS]: [
    { name: 'composition', label: 'Composition', placeholder: 'e.g. 100% cotton, 65:35 polyester-cotton' },
    { name: 'specification', label: 'Yarn count', placeholder: 'e.g. Ne 30/1, Ne 20/2, 75D/36F' },
    { name: 'yarnPly', label: 'Single / double', options: ['Single', 'Double (2-ply)', 'Not sure yet'] },
    {
      name: 'spinning',
      label: 'Ring spun / open end / compact',
      options: ['Ring spun', 'Open end', 'Compact', 'Not applicable / not sure'],
    },
  ],
  [CATEGORY_FABRICS]: [
    { name: 'composition', label: 'Composition', placeholder: 'e.g. 100% cotton, 60:40 cotton-polyester' },
    { name: 'gsm', label: 'GSM', placeholder: 'e.g. 180 GSM' },
    { name: 'width', label: 'Width', placeholder: 'e.g. 58 inches / 150 cm' },
    { name: 'construction', label: 'Construction', placeholder: 'e.g. single jersey, 2/1 twill, 40x40 / 100x80' },
    { name: 'colour', label: 'Colour', placeholder: 'e.g. grey, dyed, printed, reference shade' },
    { name: 'finish', label: 'Finish', placeholder: 'e.g. enzyme wash, peach, none' },
  ],
  [CATEGORY_FIBC]: [
    { name: 'dimensions', label: 'Bag dimensions (mm)', placeholder: 'L x W x H' },
    { name: 'swl', label: 'SWL / capacity', placeholder: 'e.g. 1000 kg / 1.2 m³' },
    { name: 'liner', label: 'Liner requirement', placeholder: 'e.g. loose LDPE liner / none' },
    { name: 'filling', label: 'Filling option', options: fillingItems },
    { name: 'discharge', label: 'Discharge option', options: dischargeItems },
    { name: 'printing', label: 'Printing requirement', placeholder: 'e.g. 1 colour / none' },
  ],
  [CATEGORY_AGRO]: [],
  [CATEGORY_OTHER]: [
    { name: 'dimensions', label: 'Dimensions', placeholder: 'Size / dimensions' },
    { name: 'printing', label: 'Printing / branding', placeholder: 'Colours / artwork / none' },
  ],
}

const TYPE_LABEL = {
  [CATEGORY_YARNS]: 'Yarn type',
  [CATEGORY_FABRICS]: 'Fabric type',
  [CATEGORY_FIBC]: 'FIBC bag type',
  [CATEGORY_AGRO]: 'Product',
  [CATEGORY_OTHER]: 'Product',
}

const QTY_PLACEHOLDER = {
  [CATEGORY_YARNS]: 'e.g. 10 tonnes, 1 x 20ft container',
  [CATEGORY_FABRICS]: 'e.g. 20,000 metres / 10 tonnes',
  [CATEGORY_FIBC]: 'e.g. 5,000 bags / 1 x 40ft',
  [CATEGORY_AGRO]: 'e.g. 5 tonnes',
  [CATEGORY_OTHER]: 'e.g. 20,000 pieces',
}

const PACKAGING_PLACEHOLDER = {
  [CATEGORY_YARNS]: 'e.g. cone weight, cones per carton, labelling, palletised',
  [CATEGORY_FABRICS]: 'e.g. roll length, wrapping, labelling, palletised',
  [CATEGORY_FIBC]: 'e.g. bales, pallets',
  [CATEGORY_AGRO]: 'e.g. bag size, carton, labelling',
  [CATEGORY_OTHER]: 'e.g. bundle, carton, pallet',
}

// Kept under Vercel's ~4.5 MB serverless request-body limit once base64-encoded.
const ATTACH_MAX = 3 * 1024 * 1024
const ATTACH_EXT = /\.(pdf|jpe?g|png|docx?|xlsx?|zip)$/i

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader()
    r.onload = () => resolve(String(r.result).split(',')[1] || '')
    r.onerror = () => reject(new Error('Could not read the file.'))
    r.readAsDataURL(file)
  })
}

function initialSelection(params, lockedCategory) {
  if (lockedCategory) {
    const type = params.get('type') || ''
    return { category: lockedCategory, product: PRODUCT_TYPES[lockedCategory].includes(type) ? type : '' }
  }
  const category = params.get('category') || ''
  if (CATEGORY_OPTIONS.includes(category)) {
    const type = params.get('type') || ''
    return { category, product: PRODUCT_TYPES[category].includes(type) ? type : '' }
  }
  const legacy = resolveLegacyProduct(params.get('product'))
  if (legacy) return { category: legacy.category, product: legacy.type }
  return { category: '', product: '' }
}

/**
 * Multi-product B2B enquiry form.
 *
 * `lockedCategory` pins the category (used by the yarn and fabric
 * "Tell us your requirements" sections); `submitLabel`/`source` tune the
 * embedded versions. Submissions go to /api/enquiry; success is shown only
 * after the server confirms delivery.
 */
export function QuoteForm({ lockedCategory = null, submitLabel = 'Send enquiry', source = 'website-quote-form' }) {
  const [params] = useSearchParams()

  const [values, setValues] = useState(() => ({ ...EMPTY, ...initialSelection(params, lockedCategory) }))
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [serverMessage, setServerMessage] = useState('')
  const [file, setFile] = useState(null)
  const [fileError, setFileError] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const busyRef = useRef(false)
  const formRef = useRef(null)
  const fileInputRef = useRef(null)
  const mountedAt = useRef(Date.now())
  const onTurnstile = useCallback((t) => setTurnstileToken(t), [])

  const category = values.category
  const types = category ? PRODUCT_TYPES[category] : []
  const extraFields = category ? CATEGORY_FIELDS[category] : []
  const hasSpecArea = category === CATEGORY_AGRO || category === CATEGORY_OTHER || category === CATEGORY_FIBC

  const onFile = (e) => {
    const f = e.target.files?.[0]
    setFileError('')
    if (!f) {
      setFile(null)
      return
    }
    if (!ATTACH_EXT.test(f.name)) {
      setFile(null)
      setFileError('Use a PDF, image, Word, Excel or ZIP file.')
      e.target.value = ''
      return
    }
    if (f.size > ATTACH_MAX) {
      setFile(null)
      setFileError('That file is over 3 MB — please compress it or send it by email.')
      e.target.value = ''
      return
    }
    setFile(f)
  }

  const clearFile = () => {
    setFile(null)
    setFileError('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const set = (name) => (e) => {
    const value = e.target.value
    setValues((v) => ({ ...v, [name]: value }))
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev))
  }

  const setCategory = (e) => {
    const value = e.target.value
    setValues((v) => {
      const next = { ...v, category: value }
      for (const k of CATEGORY_KEYS) next[k] = ''
      return next
    })
    setErrors((prev) => ({ ...prev, category: undefined, product: undefined }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (busyRef.current) return

    const nextErrors = validateEnquiry(values)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      const firstKey = Object.keys(nextErrors)[0]
      const el = formRef.current?.querySelector(`[name="${firstKey}"]`)
      el?.focus()
      el?.scrollIntoView({ block: 'center', behavior: 'smooth' })
      return
    }

    // Honeypot — pretend success, send nothing.
    if (values.botField) {
      setStatus('success')
      return
    }

    if (turnstileEnabled && !turnstileToken) {
      setStatus('error')
      setServerMessage('Please complete the verification challenge.')
      return
    }

    busyRef.current = true
    setStatus('submitting')
    setServerMessage('')

    try {
      let attachment
      if (file) {
        attachment = {
          filename: file.name,
          contentType: file.type || 'application/octet-stream',
          data: await readFileAsBase64(file),
        }
      }

      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          attachment,
          turnstileToken: turnstileToken || undefined,
          elapsedMs: Date.now() - mountedAt.current,
          submittedFrom: source,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || `Request failed (${res.status})`)
      }

      setStatus('success')
      setValues({ ...EMPTY, category: lockedCategory || '' })
      setErrors({})
      clearFile()
    } catch (err) {
      setStatus('error')
      setServerMessage(
        typeof err?.message === 'string' && err.message.length < 160 ? err.message : '',
      )
    } finally {
      busyRef.current = false
    }
  }

  if (status === 'success') {
    return (
      <div
        className="border border-line bg-paper p-8 sm:p-12"
        role="status"
        aria-live="polite"
      >
        <p className="text-label font-semibold uppercase tracking-label text-gold">
          Enquiry received
        </p>
        <h2 className="mt-4 font-serif text-[1.7rem] font-normal leading-snug text-ink sm:text-[2rem]">
          Thank you for sharing your requirements.
        </h2>
        <p className="mt-4 max-w-prose text-[1rem] leading-[1.7] text-ink/70">
          We will review your enquiry and get back to you. If it is urgent, you can also reach us by
          email at {contact.email} or on WhatsApp.
        </p>
        <div className="mt-8">
          <Button
            as="button"
            type="button"
            variant="outline"
            arrow={false}
            onClick={() => setStatus('idle')}
          >
            Send another enquiry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-14">
      {/* Honeypot */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company_website">Company website</label>
        <input
          id="company_website"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          value={values.botField}
          onChange={set('botField')}
        />
      </div>

      <FieldSet legend="Personal details">
        <TextField
          name="fullName"
          label="Full name"
          required
          autoComplete="name"
          value={values.fullName}
          onChange={set('fullName')}
          error={errors.fullName}
        />
        <TextField
          name="company"
          label="Company name"
          required
          autoComplete="organization"
          value={values.company}
          onChange={set('company')}
          error={errors.company}
        />
        <TextField
          name="email"
          label="Business email"
          type="email"
          required
          autoComplete="email"
          value={values.email}
          onChange={set('email')}
          error={errors.email}
        />
        <TextField
          name="phone"
          label="Phone / WhatsApp"
          type="tel"
          autoComplete="tel"
          placeholder="Include country code"
          value={values.phone}
          onChange={set('phone')}
        />
        <TextField
          name="country"
          label="Country"
          required
          autoComplete="country-name"
          value={values.country}
          onChange={set('country')}
          error={errors.country}
          className="sm:col-span-2"
        />
      </FieldSet>

      <FieldSet legend="Product requirements">
        {!lockedCategory && (
          <SelectField
            name="category"
            label="Product category"
            required
            value={values.category}
            onChange={setCategory}
            error={errors.category}
          >
            <option value="">Select a category…</option>
            {CATEGORY_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </SelectField>
        )}

        <SelectField
          name="product"
          label={category ? TYPE_LABEL[category] : 'Product type'}
          value={values.product}
          onChange={set('product')}
          error={errors.product}
          disabled={!category}
          className={lockedCategory ? 'sm:col-span-2' : undefined}
        >
          <option value="">{category ? 'Select a type… (or leave open)' : 'Select a category first'}</option>
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </SelectField>

        {extraFields.map((f) =>
          f.options ? (
            <SelectField key={f.name} name={f.name} label={f.label} value={values[f.name]} onChange={set(f.name)}>
              <option value="">Not sure yet</option>
              {f.options.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </SelectField>
          ) : (
            <TextField
              key={f.name}
              name={f.name}
              label={f.label}
              placeholder={f.placeholder}
              value={values[f.name]}
              onChange={set(f.name)}
            />
          ),
        )}

        {category && (
          <>
            <TextField
              name="quantity"
              label="Required quantity"
              placeholder={QTY_PLACEHOLDER[category]}
              value={values.quantity}
              onChange={set('quantity')}
            />
            <TextField
              name="packaging"
              label="Preferred packaging"
              placeholder={PACKAGING_PLACEHOLDER[category]}
              value={values.packaging}
              onChange={set('packaging')}
            />
          </>
        )}

        {hasSpecArea && (
          <TextArea
            name="specification"
            label="Specification / requirement"
            rows={4}
            placeholder="Construction, material, grade, standards — as much as you have."
            value={values.specification}
            onChange={set('specification')}
            className="sm:col-span-2"
          />
        )}
      </FieldSet>

      <FieldSet legend="Destination">
        <TextField
          name="destinationCountry"
          label="Destination country"
          value={values.destinationCountry}
          onChange={set('destinationCountry')}
        />
        <TextField
          name="destinationPort"
          label="Destination port"
          value={values.destinationPort}
          onChange={set('destinationPort')}
        />
      </FieldSet>

      <FieldSet legend="Additional requirements">
        <TextArea
          name="message"
          label="Anything else we should know"
          rows={5}
          placeholder="Standards, labelling, inspection, timelines, target price…"
          value={values.message}
          onChange={set('message')}
          error={errors.message}
          className="sm:col-span-2"
        />

        <div className="sm:col-span-2">
          <label
            htmlFor="attachment"
            className="block text-[0.82rem] font-medium uppercase tracking-widelabel text-ink/70"
          >
            Attachment <span className="normal-case tracking-normal text-ink/50">(optional)</span>
          </label>
          <p className="mt-1 text-[0.82rem] leading-relaxed text-ink/50">
            Spec sheet, sample photo or artwork — PDF, image, Word, Excel or ZIP, up to 3 MB.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <input
              ref={fileInputRef}
              id="attachment"
              name="attachment"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx,.zip,application/pdf,image/*"
              onChange={onFile}
              className="block max-w-full text-[0.85rem] text-ink/70 file:mr-3 file:cursor-pointer file:border file:border-ink/20 file:bg-ivory-deep file:px-4 file:py-2 file:text-[0.78rem] file:font-medium file:uppercase file:tracking-widelabel file:text-ink hover:file:bg-line/50"
            />
            {file && (
              <button
                type="button"
                onClick={clearFile}
                className="text-[0.8rem] uppercase tracking-widelabel text-ink/50 underline underline-offset-4 hover:text-ink"
              >
                Remove
              </button>
            )}
          </div>
          {file && (
            <p className="mt-2 text-[0.82rem] text-ink/60">
              Attached: {file.name} ({(file.size / 1024 / 1024).toFixed(1)} MB)
            </p>
          )}
          {fileError && (
            <p role="alert" className="mt-2 text-[0.82rem] text-[#8f3123]">
              {fileError}
            </p>
          )}
        </div>
      </FieldSet>

      <div className="border-t border-line pt-8">
        {status === 'error' && (
          <p
            role="alert"
            className="mb-5 border border-[#a33a2b]/40 bg-[#a33a2b]/5 px-4 py-3 text-[0.9rem] text-[#8f3123]"
          >
            Your enquiry could not be sent. Please try again, or contact us directly by email at{' '}
            {contact.email}.
            {serverMessage ? <span className="block text-[0.8rem] opacity-70">({serverMessage})</span> : null}
          </p>
        )}

        {turnstileEnabled && <Turnstile onToken={onTurnstile} />}

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-sm text-[0.82rem] leading-relaxed text-ink/50">
            Fields marked <span className="text-gold">*</span> are required. Specifications and
            availability are confirmed individually. Your details are used only to respond to this
            enquiry.
          </p>
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="group inline-flex items-center justify-center gap-2.5 bg-ink px-8 py-4 text-sm font-medium uppercase tracking-widelabel text-ivory transition-colors duration-300 hover:bg-ink-soft disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'submitting' ? 'Sending enquiry…' : submitLabel}
            {status !== 'submitting' && (
              <span
                aria-hidden="true"
                className="transition-transform duration-300 ease-editorial group-hover:translate-x-1"
              >
                →
              </span>
            )}
          </button>
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        {status === 'submitting' ? 'Sending enquiry' : status === 'error' ? 'Enquiry failed to send' : ''}
      </p>
    </form>
  )
}
