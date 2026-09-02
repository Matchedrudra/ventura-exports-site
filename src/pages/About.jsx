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
    body: 'Enquiries are matched to partners whose construction range, capacity and terms fit — not routed to a single factory by default.',
  },
  {
    index: '03',
    title: 'Stated plainly',
    body: 'We describe what we coordinate and what we do not. Claims stay within what the specification and the partner support.',
  },
]

export default function About() {
  return (
    <>
      <Seo
        path="/about"
        title="About"
        description="Ventura Exports is a sourcing partner between Indian supply and international demand for industrial packaging and woven products."
      />
      <PageHeader
        label="About"
        title="A sourcing partner between Indian supply and international demand."
        lead="Ventura Exports connects international B2B buyers with selected Indian manufacturing partners for industrial packaging and woven products."
      />

      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="max-w-prose space-y-6 text-[1.05rem] leading-[1.8] text-ink/75">
                <Reveal>
                  <p>
                    Ventura Exports is a B2B sourcing and export coordination business based in
                    Ahmedabad, Gujarat. We work with international buyers who want to source
                    industrial packaging from India and would rather run that process through one
                    point of contact.
                  </p>
                </Reveal>
                <Reveal delay={0.05}>
                  <p>
                    We coordinate product requirements, supplier communication, documentation and
                    export details to help buyers source from India with greater clarity. That means
                    translating a requirement into a build specification, identifying a suitable
                    manufacturing partner, and staying with the order through production, packing and
                    dispatch.
                  </p>
                </Reveal>
                <Reveal delay={0.1}>
                  <p>
                    Ventura is not a manufacturer. We do not present partner factories, capacity or
                    certifications as our own. What we offer is the coordination layer — the part that
                    keeps a cross-border packaging order moving without the buyer having to manage
                    several suppliers directly.
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
                What we don’t claim
              </p>
            </div>
            <div className="lg:col-span-8">
              <ul className="divide-y divide-line border-y border-line text-[0.98rem] text-ink/70">
                {[
                  'Ownership of manufacturing plants or production lines.',
                  'A fixed number of years in business, customers, countries or shipments.',
                  'Certifications issued to Ventura Exports.',
                  'Laboratory testing performed by Ventura Exports.',
                ].map((item) => (
                  <li key={item} className="py-4">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 max-w-prose text-[0.92rem] leading-relaxed text-ink/55">
                Where a project requires certificates, test reports or third-party inspection, those
                are provided by the manufacturing partner or an appointed agency and confirmed per
                order.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  )
}
