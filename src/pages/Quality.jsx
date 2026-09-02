import { Seo } from '../components/ui/Seo'
import { PageHeader } from '../components/ui/PageHeader'
import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'
import { CtaBand } from '../components/ui/CtaBand'
import { qualityPillars, qualityIntro, qualityNotes } from '../data/quality'

export default function Quality() {
  return (
    <>
      <Seo
        path="/quality"
        title="Quality"
        description="Every Ventura Exports order is built around an agreed specification — from the buyer’s requirements and manufacturing through to the batch documentation that accompanies each shipment."
      />
      <PageHeader
        label="Quality"
        title="Quality starts with the specification."
        lead={qualityIntro}
      />

      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-px border border-line bg-line md:grid-cols-2">
            {qualityPillars.map((pillar) => (
              <Reveal key={pillar.index} className="flex flex-col bg-ivory p-8 lg:p-10">
                <span className="font-serif text-[1.3rem] text-gold">{pillar.index}</span>
                <h2 className="mt-4 text-[1.3rem] font-medium tracking-[-0.01em] text-ink">
                  {pillar.title}
                </h2>
                <p className="mt-4 text-[0.98rem] leading-[1.7] text-ink/70">{pillar.body}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-label font-semibold uppercase tracking-label text-gold">
                In every order
              </p>
            </div>
            <div className="lg:col-span-8">
              <ul className="divide-y divide-line border-y border-line">
                {qualityNotes.map((note) => (
                  <li key={note} className="py-4 text-[0.98rem] leading-relaxed text-ink/70">
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Inspection and documentation, coordinated."
        body="Note any requirement in your enquiry — third-party inspection, specific certificates or destination documentation — and Ventura arranges it with the manufacturing partner."
      />
    </>
  )
}
