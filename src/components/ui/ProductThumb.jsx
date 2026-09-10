import { cn } from '../../lib/cn'
import { Figure } from './Figure'

/**
 * Product thumbnail. Renders the category photo where one is set; otherwise a
 * restrained tinted panel carrying the category name. Same aspect box either
 * way, so grids stay even. Photographs of specific packaging live only in the
 * "Packaging examples" gallery on the detail pages.
 */
export function ProductThumb({
  image,
  alt,
  label,
  ratio = '4 / 3',
  fit = 'cover',
  priority = false,
  imgClassName,
  labelClassName,
}) {
  if (image) {
    return (
      <Figure
        src={image}
        alt={alt}
        ratio={ratio}
        fit={fit}
        priority={priority}
        imgClassName={imgClassName}
      />
    )
  }
  return (
    <div
      className="flex items-center justify-center overflow-hidden bg-gradient-to-br from-ivory-deep to-line/60"
      style={{ aspectRatio: ratio }}
    >
      <span
        className={cn(
          'px-6 text-center font-serif leading-snug text-ink/55',
          labelClassName || 'text-[1.1rem]',
        )}
      >
        {label}
      </span>
    </div>
  )
}
