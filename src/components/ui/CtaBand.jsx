import { Container } from './Container'
import { Button } from './Button'
import { Reveal } from './Reveal'

/** Closing call to action — a light, hairline-bounded band so the navy footer stays the only dark anchor. */
export function CtaBand({
  title = 'Send us your requirement.',
  body = 'Share the product, the specification and the destination. We will come back with a considered response and the right manufacturing partner.',
  primaryLabel = 'Request a Quote',
  primaryTo = '/request-a-quote',
  secondaryLabel = 'Contact',
  secondaryTo = '/contact',
}) {
  return (
    <section className="border-t border-line bg-ivory-deep/60">
      <Container className="py-14 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <span aria-hidden="true" className="mb-5 block h-px w-10 bg-gold" />
              <h2 className="font-serif text-[1.7rem] font-medium leading-[1.15] text-ink sm:text-[2.1rem]">{title}</h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-4 max-w-xl text-[0.98rem] leading-[1.75] text-charcoal">{body}</p>
            </Reveal>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 lg:col-span-5 lg:justify-end">
            <Button to={primaryTo} variant="solid">
              {primaryLabel}
            </Button>
            <Button to={secondaryTo} variant="link">
              {secondaryLabel}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
