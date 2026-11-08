import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

/**
 * Editorial list: hairline-separated rows, optionally linked, in one or two
 * columns. Used wherever a set of products would otherwise become a grid of
 * boxes.
 */
export function HairlineList({ items, columns = 1, className, tone = 'ink' }) {
  const rows = items.map((it) => (typeof it === 'string' ? { name: it } : it))
  return (
    <ul className={cn('grid gap-x-10', columns === 2 && 'sm:grid-cols-2', className)}>
      {rows.map((r) => {
        const inner = (
          <>
            <span>{r.name}</span>
            {r.to && (
              <span
                aria-hidden="true"
                className="text-charcoal/25 transition-transform duration-300 ease-editorial group-hover:translate-x-1 group-hover:text-gold"
              >
                →
              </span>
            )}
          </>
        )
        const base = cn(
          'flex items-center justify-between gap-4 border-t py-3 text-[0.93rem]',
          tone === 'ink' ? 'border-line text-ink/85' : 'border-white/15 text-ivory/85',
        )
        return (
          <li key={r.name}>
            {r.to ? (
              <Link to={r.to} className={cn(base, 'group transition-colors hover:text-gold-deep')}>
                {inner}
              </Link>
            ) : (
              <div className={base}>{inner}</div>
            )}
          </li>
        )
      })}
    </ul>
  )
}
