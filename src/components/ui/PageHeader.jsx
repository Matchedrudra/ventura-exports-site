import { Container } from './Container'
import { Reveal } from './Reveal'
import { cn } from '../../lib/cn'

/** Standard interior-page masthead — deep navy, light type, kept compact. */
export function PageHeader({ label, title, lead, aside, className }) {
  return (
    <header className={cn('bg-ink text-ivory pb-12 pt-14 sm:pb-16 sm:pt-20', className)}>
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            {label && (
              <Reveal>
                <p className="mb-5 flex items-center gap-3 text-[0.66rem] font-semibold uppercase leading-none tracking-[0.2em] text-gold-soft">
                  <span aria-hidden="true" className="h-px w-8 bg-gold-soft/70" />
                  {label}
                </p>
              </Reveal>
            )}
            <Reveal delay={0.05}>
              <h1 className="font-serif text-[2.15rem] font-medium leading-[1.08] tracking-[-0.01em] text-ivory sm:text-[2.7rem] lg:text-[3.1rem]">
                {title}
              </h1>
            </Reveal>
          </div>
          {(lead || aside) && (
            <div className="lg:col-span-5 lg:pt-1">
              {lead && (
                <Reveal delay={0.1}>
                  <p className="text-[0.98rem] leading-[1.8] text-ivory/65">{lead}</p>
                </Reveal>
              )}
              {aside && <div className="mt-6">{aside}</div>}
            </div>
          )}
        </div>
      </Container>
    </header>
  )
}
