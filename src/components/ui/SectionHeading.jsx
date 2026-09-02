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
              'mb-5 text-label font-semibold uppercase tracking-label',
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
            'text-[1.7rem] leading-[1.15] sm:text-[2.1rem] lg:text-[2.5rem]',
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
              'mt-5 text-[1.0625rem] leading-[1.7]',
              light ? 'text-ivory/70' : 'text-ink/70',
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
