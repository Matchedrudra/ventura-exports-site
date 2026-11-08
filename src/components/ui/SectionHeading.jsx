import { cn } from '../../lib/cn'
import { Reveal } from './Reveal'

/**
 * Editorial section heading: a small tracked label, a display heading,
 * and an optional lead paragraph. Left-aligned by default.
 */
export function SectionHeading({
  label,
  title,
  lead,
  align = 'left',
  tone = 'ink',
  as: TitleTag = 'h2',
  className,
  children,
}) {
  const light = tone === 'light'
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {label && (
        <Reveal>
          <p
            className={cn(
              'mb-4 text-[0.66rem] font-semibold uppercase leading-none tracking-[0.2em]',
              light ? 'text-gold-soft' : 'text-gold',
            )}
          >
            {label}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <TitleTag
          className={cn(
            'font-serif text-[1.85rem] font-medium leading-[1.15] tracking-[-0.005em] sm:text-[2.15rem] lg:text-[2.4rem]',
            light ? 'text-ivory' : 'text-ink',
          )}
        >
          {title}
        </TitleTag>
      </Reveal>
      {lead && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              'mt-4 text-[0.98rem] leading-[1.75]',
              light ? 'text-ivory/70' : 'text-charcoal',
            )}
          >
            {lead}
          </p>
        </Reveal>
      )}
      {children}
    </div>
  )
}
