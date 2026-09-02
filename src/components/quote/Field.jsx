import { cn } from '../../lib/cn'

const controlBase =
  'mt-2 w-full border border-line bg-paper px-3.5 py-3 text-[0.95rem] text-ink placeholder:text-ink/35 transition-colors duration-200 focus:border-ink focus:outline-none focus:ring-0'

function Label({ htmlFor, children, required }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-label font-semibold uppercase tracking-label text-ink/55"
    >
      {children}
      {required && <span className="ml-1 text-gold">*</span>}
    </label>
  )
}

function ErrorText({ id, children }) {
  if (!children) return null
  return (
    <p id={id} className="mt-1.5 text-[0.8rem] text-[#a33a2b]">
      {children}
    </p>
  )
}

export function TextField({ name, label, required, error, className, ...rest }) {
  const errId = `${name}-error`
  return (
    <div className={className}>
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      <input
        id={name}
        name={name}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errId : undefined}
        className={cn(controlBase, error && 'border-[#a33a2b]')}
        {...rest}
      />
      <ErrorText id={errId}>{error}</ErrorText>
    </div>
  )
}

export function SelectField({ name, label, required, error, children, className, ...rest }) {
  const errId = `${name}-error`
  return (
    <div className={className}>
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      <select
        id={name}
        name={name}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errId : undefined}
        className={cn(controlBase, 'appearance-none bg-[right_0.9rem_center] bg-no-repeat pr-10', error && 'border-[#a33a2b]')}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2317233a' stroke-width='1.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
        }}
        {...rest}
      >
        {children}
      </select>
      <ErrorText id={errId}>{error}</ErrorText>
    </div>
  )
}

export function TextArea({ name, label, required, error, className, rows = 5, ...rest }) {
  const errId = `${name}-error`
  return (
    <div className={className}>
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errId : undefined}
        className={cn(controlBase, 'resize-y', error && 'border-[#a33a2b]')}
        {...rest}
      />
      <ErrorText id={errId}>{error}</ErrorText>
    </div>
  )
}

export function FieldSet({ legend, children }) {
  return (
    <fieldset className="border-0 p-0">
      <legend className="mb-6 flex w-full items-center gap-4 text-[0.78rem] font-semibold uppercase tracking-widelabel text-ink">
        {legend}
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
      </legend>
      <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  )
}
