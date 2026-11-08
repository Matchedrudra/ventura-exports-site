import { Container } from '../ui/Container'
import { Reveal, RevealGroup } from '../ui/Reveal'
import { approachSteps, approachHighlights } from '../../data/textiles'

/** "Every Requirement Deserves Attention." — six-stage sourcing approach, as an editorial numbered list. */
export function Approach({ id = 'approach' }) {
  return (
    <section id={id} className="scroll-mt-24 border-y border-line py-28 lg:py-36">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="mb-4 text-[0.66rem] font-semibold uppercase leading-none tracking-[0.2em] text-gold">
                Working with Ventura
              </p>
              <h2 className="font-serif text-[1.85rem] font-medium leading-[1.15] text-ink sm:text-[2.15rem] lg:text-[2.4rem]">
                Every Requirement Deserves Attention.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-4 max-w-sm text-[0.98rem] leading-[1.75] text-charcoal">
                From the first specification to the shipment, each order is coordinated around what
                the buyer has asked for.
              </p>
              <ul className="mt-7 grid grid-cols-2 gap-x-6 gap-y-2.5 text-[0.84rem] text-ink/75">
                {approachHighlights.map((h) => (
                  <li key={h} className="flex items-center gap-2.5">
                    <span aria-hidden="true" className="h-px w-3 shrink-0 bg-gold" />
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <RevealGroup className="grid gap-x-12 sm:grid-cols-2">
              {approachSteps.map((s) => (
                <RevealGroup.Item key={s.index} className="border-t border-ink/15 py-6">
                  <div className="flex items-baseline gap-4">
                    <span className="font-serif text-[1.15rem] text-gold">{s.index}</span>
                    <h3 className="text-[0.98rem] font-medium leading-snug tracking-[-0.005em] text-ink">{s.title}</h3>
                  </div>
                  <p className="mt-2.5 pl-9 text-[0.88rem] leading-[1.7] text-charcoal/80">{s.body}</p>
                </RevealGroup.Item>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Container>
    </section>
  )
}
