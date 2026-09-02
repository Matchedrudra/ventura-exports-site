import { cn } from '../../lib/cn'

/**
 * Ventura Exports logo — the official artwork (navy + muted gold on
 * transparent), used unmodified.
 *
 * The supplied file is a vertical lockup for light backgrounds. On dark
 * sections it is placed on a small ivory field (`tone="light"`) rather
 * than being recoloured. A dedicated knockout/horizontal variant can be
 * dropped in later — see BRAND_ASSETS.md.
 */

const SIZES = {
  row: 'h-[54px] w-auto sm:h-16 xl:h-[72px]',
  compact: 'h-11 w-auto sm:h-12',
  stack: 'h-28 w-auto sm:h-32',
  mark: 'h-12 w-auto',
}

export function Logo({ variant = 'row', tone = 'ink', className }) {
  const img = (
    <img
      src="/brand/ventura-logo.png"
      alt="Ventura Exports"
      width="785"
      height="655"
      className={cn(SIZES[variant] || SIZES.row, className)}
      decoding="async"
    />
  )

  if (tone === 'light') {
    return <span className="inline-flex bg-ivory px-4 py-3">{img}</span>
  }
  return img
}
