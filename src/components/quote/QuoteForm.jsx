import { useCallback, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TextField, SelectField, TextArea, FieldSet } from './Field'
import { Turnstile, turnstileEnabled } from './Turnstile'
import { Button } from '../ui/Button'
import { validateEnquiry, PRODUCT_OPTIONS } from '../../lib/validation'
import { fibcTypes, fibcOptions } from '../../data/products'

const EMPTY = {
  fullName: '',
  company: '',
  email: '',
  country: '',
  phone: '',
  product: '',
  quantity: '',
  dimensions: '',
  swl: '',
  construction: '',
  filling: '',
  discharge: '',
  liner: '',
  gsm: '',
  lamination: '',
  printing: '',
  application: '',
  operatingTemp: '',
  specification: '',
  destinationCountry: '',
  destinationPort: '',
  message: '',
  botField: '',
}

const fillingItems = fibcOptions.find((g) => g.key === 'filling')?.items ?? []
const dischargeItems = fibcOptions.find((g) => g.key === 'discharge')?.items ?? []

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

export function QuoteForm() {
  const [params] = useSearchParams()
  const initialProduct = PRODUCT_OPTIONS.includes(params.get('product') || '')
    ? params.get('product')
    : ''

  const [values, setValues] = useState({ ...EMPTY, product: initialProduct })
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

  const isFibc = values.product === 'FIBC / Jumbo Bags'
  const isWoven =
    values.product === 'PP & HDPE Woven Bags' ||
    values.product === 'BOPP Laminated Bags' ||
    values.product === 'Customized Woven Packaging'
  const isFilter = values.product === 'Industrial Filter Bags'

  const set = (name) => (e) => {
    const value = e.target.value
    setValues((v) => ({ ...v, [name]: value }))
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev))
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
          submittedFrom: 'website-quote-form',
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || `Request failed (${res.status})`)
      }

      setStatus('success')
      setValues({ ...EMPTY })
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
        className="border border-line bg-ivory-deep/40 p-8 sm:p-12"
        role="status"
        aria-live="polite"
      >
        <p className="text-label font-semibold uppercase tracking-label text-gold">
          Enquiry received
        </p>
        <h2 className="mt-4 font-serif text-[1.7rem] leading-snug text-ink sm:text-[2rem]">
          Thank you for sharing your requirements.
        </h2>
        <p className="mt-4 max-w-prose text-[1rem] leading-[1.7] text-ink/70">
          We will review your enquiry and get back to you. If it is urgent, you can also reach us by
          email or WhatsApp from the contact page.
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

      <FieldSet legend="Your details">
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
          name="country"
          label="Country"
          required
          autoComplete="country-name"
          value={values.country}
          onChange={set('country')}
          error={errors.country}
        />
        <TextField
          name="phone"
          label="Phone / WhatsApp"
          type="tel"
          autoComplete="tel"
          placeholder="Include country code"
          value={values.phone}
          onChange={set('phone')}
          className="sm:col-span-2"
        />
      </FieldSet>

      <FieldSet legend="Product requirement">
        <SelectField
          name="product"
          label="Product"
          required
          value={values.product}
          onChange={set('product')}
          error={errors.product}
        >
          <option value="">Select a product…</option>
          {PRODUCT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </SelectField>
        <TextField
          name="quantity"
          label="Quantity"
          placeholder="e.g. 20,000 bags / 2 x 40ft"
          value={values.quantity}
          onChange={set('quantity')}
        />

        {isFibc && (
          <>
            <TextField
              name="dimensions"
              label="Bag dimensions (mm)"
              placeholder="L x W x H"
              value={values.dimensions}
              onChange={set('dimensions')}
            />
            <TextField
              name="swl"
              label="SWL / capacity"
              placeholder="e.g. 1000 kg / 1.2 m³"
              value={values.swl}
              onChange={set('swl')}
            />
            <SelectField
              name="construction"
              label="Bag construction"
              value={values.construction}
              onChange={set('construction')}
            >
              <option value="">Not sure yet</option>
              {fibcTypes.map((t) => (
                <option key={t.slug} value={t.name}>
                  {t.name}
                </option>
              ))}
            </SelectField>
            <TextField
              name="liner"
              label="Liner requirement"
              placeholder="e.g. loose LDPE liner / none"
              value={values.liner}
              onChange={set('liner')}
            />
            <SelectField
              name="filling"
              label="Filling option"
              value={values.filling}
              onChange={set('filling')}
            >
              <option value="">Not sure yet</option>
              {fillingItems.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </SelectField>
            <SelectField
              name="discharge"
              label="Discharge option"
              value={values.discharge}
              onChange={set('discharge')}
            >
              <option value="">Not sure yet</option>
              {dischargeItems.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </SelectField>
            <TextField
              name="printing"
              label="Printing requirement"
              placeholder="e.g. 1 colour / 2 colours / none"
              value={values.printing}
              onChange={set('printing')}
              className="sm:col-span-2"
            />
          </>
        )}

        {isWoven && (
          <>
            <TextField
              name="dimensions"
              label="Bag dimensions (cm)"
              placeholder="W x L (+ gusset)"
              value={values.dimensions}
              onChange={set('dimensions')}
            />
            <TextField
              name="gsm"
              label="Fabric weight (GSM)"
              placeholder="e.g. 80 GSM"
              value={values.gsm}
              onChange={set('gsm')}
            />
            <SelectField
              name="lamination"
              label="Lamination"
              value={values.lamination}
              onChange={set('lamination')}
            >
              <option value="">Not sure yet</option>
              <option value="Laminated">Laminated</option>
              <option value="Unlaminated">Unlaminated</option>
            </SelectField>
            <TextField
              name="liner"
              label="Liner requirement"
              placeholder="e.g. LDPE liner / none"
              value={values.liner}
              onChange={set('liner')}
            />
            <TextField
              name="printing"
              label="Printing requirement"
              placeholder="Colours / artwork"
              value={values.printing}
              onChange={set('printing')}
              className="sm:col-span-2"
            />
          </>
        )}

        {isFilter && (
          <>
            <TextField
              name="application"
              label="Filtration application"
              placeholder="e.g. cement kiln baghouse / pulse-jet"
              value={values.application}
              onChange={set('application')}
            />
            <TextField
              name="operatingTemp"
              label="Operating temperature"
              placeholder="Continuous / peak (°C)"
              value={values.operatingTemp}
              onChange={set('operatingTemp')}
            />
            <TextField
              name="dimensions"
              label="Bag dimensions & fitting"
              placeholder="Dia x length, snap-band / cuff"
              value={values.dimensions}
              onChange={set('dimensions')}
              className="sm:col-span-2"
            />
          </>
        )}

        <TextArea
          name="specification"
          label="Specification / requirement"
          rows={4}
          placeholder="Construction, material, print, capacity, standards — as much as you have."
          value={values.specification}
          onChange={set('specification')}
          className="sm:col-span-2"
        />
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
          label="Destination port / city"
          value={values.destinationPort}
          onChange={set('destinationPort')}
        />
      </FieldSet>

      <FieldSet legend="Additional requirements">
        <TextArea
          name="message"
          label="Anything else we should know"
          rows={6}
          placeholder="Standards, certificates, inspection, packing, timelines, target price…"
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
            Spec sheet, drawing or artwork — PDF, image, Word, Excel or ZIP, up to 3 MB.
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
            Your enquiry could not be sent. Please try again, or contact us directly by email at
            rudra@venturaexports.in.
            {serverMessage ? <span className="block text-[0.8rem] opacity-70">({serverMessage})</span> : null}
          </p>
        )}

        {turnstileEnabled && <Turnstile onToken={onTurnstile} />}

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-sm text-[0.82rem] leading-relaxed text-ink/50">
            Fields marked <span className="text-gold">*</span> are required. Your details are used
            only to respond to this enquiry.
          </p>
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="group inline-flex items-center justify-center gap-2.5 bg-ink px-8 py-4 text-sm font-medium uppercase tracking-widelabel text-ivory transition-colors duration-300 hover:bg-ink-soft disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'submitting' ? 'Sending enquiry…' : 'Send enquiry'}
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
