import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'
import { Figure } from '../ui/Figure'
import { Reveal } from '../ui/Reveal'
import { CountUp } from '../ui/CountUp'

const STRENGTHS = [
  ['Product knowledge', 'Counts, compositions, constructions and the technical detail behind them.'],
  ['Manufacturing relationships', 'Established Indian partners, matched to each requirement.'],
  ['Sourcing capabilities', 'Yarns, fabrics and weaving components sourced to specification.'],
  ['Quality expectations', 'Agreed with the partner before production begins.'],
  ['International supply', 'Packing, documents and shipment coordinated to the destination.'],
]

export function AboutIntro() {
  return (
    <section className="overflow-hidden py-28 lg:py-40">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-0">
          <div className="lg:col-span-7 lg:-ml-10 xl:-ml-14">
            <Figure
              src="/images/textile/spinning-line-india.jpg"
              alt="A spinning line in an Indian textile mill, with a worker walking along the frames"
              ratio="5 / 6"
              zoom
              imgClassName="object-[38%_50%]"
              className="lg:max-w-[46rem]"
            />
          </div>

          <div className="lg:col-span-5 lg:pl-4">
            <SectionHeading label="About Ventura" title="Driven by Textile Expertise." />
            <div className="mt-7 max-w-[28rem] space-y-4 text-[0.98rem] leading-[1.85] text-charcoal">
              <Reveal>
                <p>
                  Ventura Exports is a textile-focused company, specialising in yarns, fabrics and
                  weaving accessories for international buyers.
                </p>
              </Reveal>
              <Reveal delay={0.06}>
                <p>
                  Our strength is product knowledge — and the manufacturing relationships that let us
                  source against each buyer&apos;s specification, coordinate quality expectations and
                  manage supply to markets abroad.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <dl className="mt-9 divide-y divide-line border-y border-line">
                {STRENGTHS.map(([t, d]) => (
                  <div key={t} className="grid gap-1 py-3 sm:grid-cols-[10.5rem_1fr] sm:gap-4">
                    <dt className="text-[0.8rem] font-medium text-ink">{t}</dt>
                    <dd className="text-[0.84rem] leading-relaxed text-charcoal/75">{d}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-9 grid grid-cols-3 gap-6">
                <div>
                  <p className="font-serif text-[2.2rem] font-medium leading-none text-ink">
                    <CountUp to={5} suffix="+" />
                  </p>
                  <p className="mt-2 text-[0.72rem] uppercase tracking-[0.14em] text-charcoal/70">Years of experience</p>
                </div>
                <div>
                  <p className="font-serif text-[2.2rem] font-medium leading-none text-ink">
                    <CountUp to={3} />
                  </p>
                  <p className="mt-2 text-[0.72rem] uppercase tracking-[0.14em] text-charcoal/70">Core textile divisions</p>
                </div>
                <div>
                  <p className="font-serif text-[1.35rem] font-medium leading-tight text-ink">Gujarat, India</p>
                  <p className="mt-2 text-[0.72rem] uppercase tracking-[0.14em] text-charcoal/70">Headquarters</p>
                </div>
              </div>
            </Reveal>

            <div className="mt-9">
              <Button to="/about" variant="link">
                About Ventura
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
