import { Seo } from '../components/ui/Seo'
import { PageHeader } from '../components/ui/PageHeader'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Figure } from '../components/ui/Figure'
import { Reveal } from '../components/ui/Reveal'
import { CtaBand } from '../components/ui/CtaBand'
import { Approach } from '../components/textile/Approach'
import { ConePackaging } from '../components/textile/ConePackaging'

const COORDINATED = [
  {
    title: 'Specification',
    body: 'Product, count or GSM, composition, packing and destination are written into a single specification that the partner quotes and produces against.',
  },
  {
    title: 'Quality expectations',
    body: 'Your quality expectations are discussed and communicated to the manufacturing partner before production, and kept consistent for repeat orders.',
  },
  {
    title: 'Documentation',
    body: 'Commercial and export documentation is prepared for the destination market. Test reports, certificates or third-party inspection are requested from the partner where your order calls for them.',
  },
  {
    title: 'Communication',
    body: 'One point of contact between the buyer and the manufacturing partner, so questions are raised early and one version of the requirement stays in circulation.',
  },
]

export default function QualityPackaging() {
  return (
    <>
      <Seo
        path="/quality-packaging"
        title="Quality & Packaging"
        description="How Ventura Exports works: understanding buyer specifications, matching Indian manufacturing partners, and coordinating cone configuration, export packaging, documentation and shipment for yarns and fabrics."
      />
      <PageHeader
        label="Quality & packaging"
        title="Quality Starts With the Specification."
        lead="Product requirements, packaging and documentation are clarified before sourcing and production, and coordinated with the manufacturing partner through to shipment."
      />

      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <SectionHeading label="What we coordinate" title="Specification, expectations, documentation, communication." />
              <p className="mt-6 max-w-prose text-[0.95rem] leading-relaxed text-ink/55">
                Ventura works through Indian manufacturing partners, and our role is to coordinate the
                requirement and the order — from specification and packing through to documentation
                and shipment.
              </p>
            </div>
            <div className="lg:col-span-6">
              <Reveal>
                <Figure
                  src="/images/textile/white-cones-winder.jpg"
                  alt="A worker checking white yarn cones at a winding machine"
                  ratio="3 / 2"
                />
              </Reveal>
            </div>
          </div>

          <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-2">
            {COORDINATED.map((c, i) => (
              <Reveal key={c.title} className="flex flex-col bg-ivory p-8 lg:p-10">
                <span className="font-serif text-[1.2rem] text-gold">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-4 text-[1.25rem] font-medium tracking-[-0.01em] text-ink">{c.title}</h3>
                <p className="mt-3 text-[0.96rem] leading-[1.7] text-ink/70">{c.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Approach />
      <ConePackaging variant="full" />

      <CtaBand
        title="Tell us your packing requirement."
        body="Note cone size and weight, cones per carton, labelling or palletisation in your enquiry — we will confirm what the manufacturing partner can accommodate."
        primaryLabel="Request a Quote"
        secondaryLabel="Contact"
      />
    </>
  )
}
