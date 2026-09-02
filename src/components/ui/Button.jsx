import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

function Arrow({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn('h-[1em] w-[1em] shrink-0', className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M5 12h13M12 5.5 18.5 12 12 18.5" strokeLinecap="square" />
    </svg>
  )
}

const base =
  'group inline-flex items-center justify-center gap-2.5 font-medium tracking-[0.01em] transition-all duration-300 ease-editorial disabled:cursor-not-allowed disabled:opacity-55'

const variants = {
  solid:
    'bg-ink text-ivory px-7 py-3.5 text-sm hover:bg-ink-soft',
  outline:
    'border border-ink/25 text-ink px-7 py-3.5 text-sm hover:border-ink hover:bg-ink hover:text-ivory',
  outlineLight:
    'border border-white/25 text-ivory px-7 py-3.5 text-sm hover:border-white hover:bg-white hover:text-ink',
  link: 'text-sm text-ink hover:text-gold px-0 py-1',
}

export function Button({
  as,
  to,
  href,
  variant = 'solid',
  arrow = true,
  className,
  children,
  ...rest
}) {
  const classes = cn(base, variants[variant] || variants.solid, className)
  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <Arrow className="transition-transform duration-300 ease-editorial group-hover:translate-x-1" />
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {inner}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {inner}
      </a>
    )
  }
  const Tag = as || 'button'
  return (
    <Tag className={classes} {...rest}>
      {inner}
    </Tag>
  )
}
