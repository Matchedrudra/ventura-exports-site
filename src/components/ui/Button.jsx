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
    'bg-ink text-ivory px-6 py-3 text-[0.8rem] tracking-[0.04em] hover:bg-ink-soft',
  outline:
    'border border-ink/25 text-ink px-6 py-3 text-[0.8rem] tracking-[0.04em] hover:border-ink hover:bg-ink hover:text-ivory',
  light:
    'bg-ivory text-ink px-6 py-3 text-[0.8rem] tracking-[0.04em] hover:bg-white',
  outlineLight:
    'border border-white/30 text-ivory px-6 py-3 text-[0.8rem] tracking-[0.04em] hover:border-white hover:bg-white hover:text-ink',
  link: 'text-[0.82rem] tracking-[0.02em] text-ink hover:text-gold px-0 py-1',
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
