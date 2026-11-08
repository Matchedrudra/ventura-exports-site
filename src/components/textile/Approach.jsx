import { Container } from '../ui/Container'
import { Reveal, RevealGroup } from '../ui/Reveal'
import { approachSteps, approachHighlights } from '../../data/textiles'

/** "Every Requirement Deserves Attention." — six-stage sourcing approach. */
export function Approach({ id = 'approach' }) {
  return (
    <section id={id} className="scroll-mt-24 bg-ink text-ivory">
      <Container className="py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-label font-semibold uppercase tracking-label text-gold-soft">
                Quality &amp; sourcing approach
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-serif text-[1.9rem] font-normal leading-[1.14] tracking-[-0.015em] text-ivory sm:text-[2.5rem]">
                Every Requirement Deserves Attention.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-md text-[1rem] leading-[1.7] text-ivory/65">
                From the first specification to the shipment, the order is coordinated around what
                the buyer has asked for.
              </p>
            </Reveal>
            <ul className="mt-8 flex flex-wrap gap-2">
              {approachHighlights.map((h) => (
                <li key={h} className="border border-white/15 px-3 py-1.5 text-[0.8rem] text-ivory/70">
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <RevealGroup className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
              {approachSteps.map((s) => (
                <RevealGroup.Item key={s.index} className="bg-ink p-6">
                  <span className="font-serif text-[1.1rem] text-gold-soft">{s.index}</span>
                  <h3 className="mt-3 text-[1.02rem] font-medium leading-snug tracking-[-0.01em] text-ivory">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 text-[0.88rem] leading-relaxed text-ivory/60">{s.body}</p>
                </RevealGroup.Item>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Container>
    </section>
  )
}
