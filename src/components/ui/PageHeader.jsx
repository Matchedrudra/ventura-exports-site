import { Container } from './Container'
import { Reveal } from './Reveal'
import { cn } from '../../lib/cn'

/** Standard interior-page masthead — deep navy, light type. */
export function PageHeader({ label, title, lead, aside, className }) {
  return (
    <header
      className={cn(
        'bg-ink text-ivory pt-16 pb-14 sm:pt-24 sm:pb-20',
        className,
      )}
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            {label && (
              <Reveal>
                <p className="mb-6 text-label font-semibold uppercase tracking-label text-gold-soft">
                  {label}
                </p>
              </Reveal>
            )}
            <Reveal delay={0.05}>
              <h1 className="text-[2.1rem] leading-[1.08] text-ivory sm:text-[2.9rem] lg:text-[3.4rem]">
                {title}
              </h1>
            </Reveal>
          </div>
          {(lead || aside) && (
            <div className="lg:col-span-5 lg:pt-2">
              {lead && (
                <Reveal delay={0.1}>
                  <p className="text-[1.0625rem] leading-[1.75] text-ivory/65">{lead}</p>
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
