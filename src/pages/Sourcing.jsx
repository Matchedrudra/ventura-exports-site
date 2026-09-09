import { Seo } from '../components/ui/Seo'
import { PageHeader } from '../components/ui/PageHeader'
import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'
import { Figure } from '../components/ui/Figure'
import { CtaBand } from '../components/ui/CtaBand'
import { processSteps } from '../data/process'

export default function Sourcing() {
  return (
    <>
      <Seo
        path="/sourcing"
        title="How We Work"
        description="How Ventura works: understand, source, validate, supply — the coordination process between international buyers and capable Indian manufacturing partners."
      />
      <PageHeader
        label="How we work"
        title="Understand. Source. Validate. Supply."
        lead="Four stages that carry an order from the buyer’s requirement through to repeat supply."
      />

      <section className="py-16 lg:py-24">
        <Container>
          <div className="mb-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6 lg:pt-2">
              <div className="max-w-prose space-y-5 text-[1.02rem] leading-[1.8] text-ink/75">
                <Reveal>
                  <p>
                    A cross-border packaging order turns on a few details: a specification both sides
                    read the same way, print and liner decisions taken early, and a packing plan
                    built for the container.
                  </p>
                </Reveal>
                <Reveal delay={0.05}>
                  <p>
                    Ventura’s process settles those details up front — writing the specification
                    down, confirming it with the manufacturing partner, and staying with the order
                    through dispatch.
                  </p>
                </Reveal>
              </div>
            </div>
            <div className="lg:col-span-6">
              <Reveal>
                <Figure
                  src="/images/quality-inspection.jpg"
                  alt="Inspector checking woven bag stitching and fabric against a specification sheet"
                  ratio="16 / 10"
                />
              </Reveal>
            </div>
          </div>

          <ol className="border-t border-line">
            {processSteps.map((step, i) => (
              <li key={step.index}>
                <Reveal>
                  <div className="grid gap-4 border-b border-line py-10 lg:grid-cols-12 lg:gap-8">
                    <div className="lg:col-span-2">
                      <span className="font-serif text-[1.4rem] text-gold">{step.index}</span>
                    </div>
                    <div className="lg:col-span-3">
                      <h2 className="text-[1.35rem] font-medium tracking-[-0.01em] text-ink">
                        {step.title}
                      </h2>
                    </div>
                    <div className="lg:col-span-7">
                      <p className="text-[1.02rem] leading-[1.7] text-ink/80">{step.summary}</p>
                      <p className="mt-3 text-[0.92rem] leading-relaxed text-ink/55">{step.detail}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <CtaBand
        title="Start with a specification."
        body="Send what you know — product, construction, quantity, destination. We will structure the rest with you."
      />
    </>
  )
}
