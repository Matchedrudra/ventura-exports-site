import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'

/*
 * Closing unit: one editorial warehouse image carrying a short statement,
 * flowing straight into the enquiry call-to-action. One dark section, no
 * dead space between the picture and "Send us a specification."
 */
export function EnquiryInvite() {
  return (
    <section className="bg-ink text-ivory">
      <div className="relative isolate overflow-hidden">
        <img
          src="/images/warehouse-aisle.jpg"
          alt="Palletised woven packaging on high-bay racking in a distribution warehouse"
          loading="lazy"
          decoding="async"
          width="1700"
          height="1133"
          className="h-[36vh] min-h-[248px] w-full object-cover object-center sm:h-[40vh] sm:max-h-[440px]"
        />
        <div className="absolute inset-0 bg-ink/45" aria-hidden="true" />
        <Container className="pointer-events-none absolute inset-x-0 bottom-0">
          <Reveal as="blockquote" className="max-w-md bg-ink/85 px-5 py-5 sm:px-7 sm:py-6">
            <span aria-hidden="true" className="mb-4 block h-px w-10 bg-gold" />
            <span className="font-serif text-[1.1rem] leading-[1.5] text-ivory/90 sm:text-[1.3rem]">
              Every bag is matched to the filling line, the product and the route — and agreed in
              the specification before production begins.
            </span>
          </Reveal>
        </Container>
      </div>

      <Container className="border-t border-white/10 py-12 lg:py-16">
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-label font-semibold uppercase tracking-label text-gold-soft">
                Next step
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 text-[1.9rem] leading-[1.15] text-ivory sm:text-[2.4rem]">
                Send us a specification.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-xl text-[1.02rem] leading-[1.7] text-ivory/65">
                Share the product, the construction and the destination. We will come back with a
                considered quotation and the right manufacturing partner.
              </p>
            </Reveal>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3 lg:col-span-5 lg:justify-end">
            <Button to="/request-a-quote" variant="outlineLight">
              Request a Quote
            </Button>
            <Button to="/contact" variant="link" className="text-ivory hover:text-gold-soft">
              Contact
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
