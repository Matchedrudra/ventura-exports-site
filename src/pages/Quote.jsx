import { Seo } from '../components/ui/Seo'
import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'
import { QuoteForm } from '../components/quote/QuoteForm'
import { contact } from '../data/site'

const checklist = [
  'Product and construction',
  'Quantity and target timeline',
  'Dimensions and capacity',
  'Printing, lamination and liner',
  'Destination port and documentation',
]

export default function Quote() {
  return (
    <>
      <Seo
        path="/request-a-quote"
        title="Request a Quote"
        description="Send Ventura Exports a B2B enquiry for FIBC, PP woven, HDPE woven or customized woven packaging. The form reaches us with the specification structured."
      />

      <header className="border-b border-line pt-16 pb-14 sm:pt-24 sm:pb-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="mb-6 text-label font-semibold uppercase tracking-label text-gold">
                  Request a Quote
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="text-[2.1rem] leading-[1.08] sm:text-[2.8rem] lg:text-[3.2rem]">
                  Send us a specification.
                </h1>
              </Reveal>
            </div>
            <div className="lg:col-span-5 lg:pt-2">
              <Reveal delay={0.1}>
                <p className="text-[1.02rem] leading-[1.75] text-ink/70">
                  The more detail you provide, the more precise the quotation. If you are still
                  scoping the requirement, send what you have — we will follow up with the open
                  questions.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </header>

      <section className="py-14 lg:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <p className="text-label font-semibold uppercase tracking-label text-ink/45">
                  Helpful to include
                </p>
                <ul className="mt-5 space-y-3 border-t border-line pt-5">
                  {checklist.map((item) => (
                    <li key={item} className="flex gap-3 text-[0.92rem] leading-relaxed text-ink/70">
                      <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 border-t border-line pt-5 text-[0.86rem] leading-relaxed text-ink/55">
                  Prefer email? Write to{' '}
                  <a
                    href={`mailto:${contact.email}`}
                    className="u-underline text-ink transition-colors hover:text-gold"
                  >
                    {contact.email}
                  </a>
                  .
                </p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <QuoteForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
