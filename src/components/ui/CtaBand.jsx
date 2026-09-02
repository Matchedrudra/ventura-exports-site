import { Container } from './Container'
import { Button } from './Button'
import { Reveal } from './Reveal'

export function CtaBand({
  title = 'Send us a specification.',
  body = 'Share the product, the construction and the destination. We will come back with a considered quotation and the right manufacturing partner.',
  primaryLabel = 'Request a Quote',
  primaryTo = '/request-a-quote',
  secondaryLabel = 'Contact',
  secondaryTo = '/contact',
}) {
  return (
    <section className="bg-ink text-ivory">
      <Container className="py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="text-[1.9rem] leading-[1.15] text-ivory sm:text-[2.4rem]">{title}</h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-5 max-w-xl text-[1.02rem] leading-[1.7] text-ivory/65">{body}</p>
            </Reveal>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3 lg:col-span-5 lg:justify-end">
            <Button to={primaryTo} variant="outlineLight">
              {primaryLabel}
            </Button>
            <Button to={secondaryTo} variant="link" className="text-ivory hover:text-gold-soft">
              {secondaryLabel}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
