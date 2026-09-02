import { cn } from '../../lib/cn'

/** Two-column specification list with hairline rows. */
export function SpecTable({ rows = [], className }) {
  return (
    <dl className={cn('border-t border-line', className)}>
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid grid-cols-1 gap-1 border-b border-line py-4 sm:grid-cols-[minmax(0,10rem)_1fr] sm:gap-6"
        >
          <dt className="text-label font-semibold uppercase tracking-label text-ink/45 sm:pt-1">
            {row.label}
          </dt>
          <dd className="text-[0.98rem] leading-relaxed text-ink/80">{row.value}</dd>
        </div>
      ))}
    </dl>
  )
}
