import { cn } from '../../lib/cn'

/**
 * Ventura Exports brand lockup.
 *
 * NOTE: this is a typographic rendering of the wordmark so the site is
 * complete and consistent. To use the official artwork, drop the files
 * into /public/brand/ and see BRAND_ASSETS.md for the swap.
 */

function Monogram({ className, tone = 'ink' }) {
  const stroke = tone === 'light' ? '#f5f2ea' : '#17233a'
  return (
    <svg
      viewBox="0 0 104 88"
      className={className}
      role="img"
      aria-label="Ventura Exports monogram"
      fill="none"
    >
      {/* V */}
      <path d="M10 9 L40 79 L70 9" stroke={stroke} strokeWidth="13.5" strokeLinejoin="miter" />
      {/* E — interlocked, muted gold */}
      <g stroke="#a8814a" strokeWidth="12.5" strokeLinecap="butt">
        <path d="M62 12 L62 78" />
        <path d="M61 13 L98 13" />
        <path d="M61 45 L90 45" />
        <path d="M61 77 L98 77" />
      </g>
    </svg>
  )
}

export function Logo({ variant = 'row', tone = 'ink', className }) {
  const light = tone === 'light'
  const text = light ? 'text-ivory' : 'text-ink'

  if (variant === 'mark') {
    return <Monogram tone={tone} className={cn('h-9 w-auto', className)} />
  }

  if (variant === 'stack') {
    return (
      <span className={cn('inline-flex flex-col items-center gap-3', text, className)}>
        <Monogram tone={tone} className="h-14 w-auto" />
        <span className="flex flex-col items-center leading-none">
          <span className="font-serif text-[1.35rem] tracking-[0.2em] pl-[0.2em]">VENTURA</span>
          <span className="mt-2 flex w-full items-center gap-2.5">
            <span className="h-px flex-1 bg-current/30" />
            <span className="text-[0.66rem] font-semibold uppercase tracking-[0.34em] text-gold">
              Exports
            </span>
            <span className="h-px flex-1 bg-current/30" />
          </span>
        </span>
      </span>
    )
  }

  // row (default) — compact horizontal lockup for the header
  return (
    <span className={cn('inline-flex items-center gap-3', text, className)}>
      <Monogram tone={tone} className="h-8 w-auto sm:h-9" />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[1.02rem] tracking-[0.18em] pl-[0.18em] sm:text-[1.12rem]">
          VENTURA
        </span>
        <span className="mt-1.5 flex items-center gap-2">
          <span className="text-[0.58rem] font-semibold uppercase tracking-[0.32em] text-gold sm:text-[0.62rem]">
            Exports
          </span>
          <span className="h-px w-6 bg-current/30" />
        </span>
      </span>
    </span>
  )
}
