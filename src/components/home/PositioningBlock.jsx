import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { Figure } from '../ui/Figure'
import { Reveal } from '../ui/Reveal'

export function PositioningBlock() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6 lg:pt-4">
            <Reveal>
              <p className="text-label font-semibold uppercase tracking-label text-gold">About</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-serif text-[1.8rem] font-normal leading-[1.25] text-ink sm:text-[2.15rem]">
                A sourcing partner between Indian supply and international demand.
              </h2>
            </Reveal>
            <div className="mt-6 max-w-prose space-y-5 text-[1.02rem] leading-[1.75] text-ink/70">
              <Reveal delay={0.1}>
                <p>
                  Ventura Exports connects international B2B buyers with selected Indian manufacturing
                  partners for industrial packaging and woven products.
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <p>
                  We coordinate product requirements, supplier communication, documentation and
                  export details — so buyers can source from India with more clarity and fewer open
                  questions.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.18}>
              <div className="mt-9">
                <Button to="/about" variant="outline">
                  About Ventura
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal>
              <Figure
                src="/images/manufacturing-partner.jpg"
                alt="Industrial circular weaving machine running synthetic yarn at a manufacturing plant"
                ratio="5 / 6"
              />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
