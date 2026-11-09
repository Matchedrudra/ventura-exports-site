import { Seo } from '../components/ui/Seo'
import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'
import { QuoteForm } from '../components/quote/QuoteForm'
import { contact } from '../data/site'
import { pageSeo } from '../data/seo'

const checklist = [
  'Product category and type',
  'Yarn count or fabric specification',
  'Composition and quantity',
  'Preferred packaging',
  'Destination port and documentation',
]

const seo = pageSeo('/request-a-quote')

export default function Quote() {
  return (
    <>
      <Seo {...seo} />

      <header className="bg-ink text-ivory pt-16 pb-14 sm:pt-24 sm:pb-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="mb-6 text-label font-semibold uppercase tracking-label text-gold-soft">
                  Request a Quote
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="text-[2.1rem] leading-[1.08] text-ivory sm:text-[2.8rem] lg:text-[3.2rem]">
                  Request a Quote.
                </h1>
              </Reveal>
            </div>
            <div className="lg:col-span-5 lg:pt-2">
              <Reveal delay={0.1}>
                <p className="text-[1.02rem] leading-[1.75] text-ivory/65">
                  The more detail you provide, the more precise the response. Specifications and
                  availability are confirmed individually — if you are still scoping, send what
                  you have and we will follow up with the open questions.
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
                    <li key={item} className="flex gap-3 text-[0.92rem] leading-relaxed text-charcoal">
                      <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 border-t border-line pt-5 text-[0.86rem] leading-relaxed text-charcoal/75">
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
