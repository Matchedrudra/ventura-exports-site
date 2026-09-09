import { Seo } from '../components/ui/Seo'
import { PageHeader } from '../components/ui/PageHeader'
import { Container } from '../components/ui/Container'
import { Figure } from '../components/ui/Figure'
import { Reveal } from '../components/ui/Reveal'
import { CtaBand } from '../components/ui/CtaBand'

const principles = [
  {
    index: '01',
    title: 'One specification',
    body: 'Every requirement is written down once and kept consistent from enquiry to dispatch. The buyer and the partner work from the same sheet.',
  },
  {
    index: '02',
    title: 'Selected partners',
    body: 'Each enquiry is matched to the manufacturing partner whose construction range, capacity and commercial terms fit the order.',
  },
  {
    index: '03',
    title: 'Documented throughout',
    body: 'Specification, quality checkpoints and export paperwork are recorded so the order is traceable from enquiry to dispatch.',
  },
]

export default function About() {
  return (
    <>
      <Seo
        path="/about"
        title="About"
        description="Ventura is an India-based packaging and industrial supply company connecting international buyers with capable Indian manufacturing partners across industrial packaging and filtration."
      />
      <PageHeader
        label="About"
        title="India-based packaging & industrial supply."
        lead="Ventura is an India-based packaging and industrial supply company focused on connecting international buyers with capable Indian manufacturing partners."
      />

      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="max-w-prose space-y-6 text-[1.05rem] leading-[1.8] text-ink/75">
                <Reveal>
                  <p>
                    Ventura is an India-based packaging and industrial supply company, based in
                    Ahmedabad, Gujarat. We connect international buyers with capable Indian
                    manufacturing partners and run the requirement through one point of contact.
                  </p>
                </Reveal>
                <Reveal delay={0.05}>
                  <p>
                    We work around buyer specifications, product requirements and destination-market
                    needs to identify suitable supply from India — across industrial packaging, bulk
                    packaging, woven packaging, corrugated packaging and industrial filtration.
                  </p>
                </Reveal>
                <Reveal delay={0.1}>
                  <p>
                    The focus is on understanding the requirement, identifying a suitable
                    manufacturing partner, aligning the specification, coordinating quality and
                    documentation, and supplying export-ready product — held consistent for repeat
                    orders.
                  </p>
                </Reveal>
              </div>
            </div>
            <div className="lg:col-span-5">
              <Reveal>
                <Figure
                  src="/images/woven-fabric-loom.jpg"
                  alt="Circular loom weaving polypropylene fabric at a woven packaging plant"
                  ratio="4 / 5"
                />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-ivory-deep/40 py-16 lg:py-24">
        <Container>
          <p className="text-label font-semibold uppercase tracking-label text-gold">How we operate</p>
          <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-3">
            {principles.map((p) => (
              <Reveal key={p.index} className="flex flex-col bg-ivory p-7 lg:p-8">
                <span className="font-serif text-sm text-gold">{p.index}</span>
                <h3 className="mt-3 text-[1.1rem] font-medium text-ink">{p.title}</h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-ink/65">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-label font-semibold uppercase tracking-label text-gold">
                What each order includes
              </p>
            </div>
            <div className="lg:col-span-8">
              <ul className="divide-y divide-line border-y border-line text-[0.98rem] text-ink/70">
                {[
                  'A single agreed specification, confirmed with the manufacturing partner before production.',
                  'Quality checkpoints recorded against that specification.',
                  'A batch-specific laboratory test report confirming compliance with the agreed product specifications.',
                  'Commercial and export documentation prepared for the destination market.',
                ].map((item) => (
                  <li key={item} className="py-4">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 max-w-prose text-[0.92rem] leading-relaxed text-ink/55">
                Relevant certificates, and third-party or buyer-appointed inspection, are provided or
                coordinated with the manufacturing partner where the order requires it.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  )
}
