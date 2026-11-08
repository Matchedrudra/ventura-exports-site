import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'
import { Figure } from '../ui/Figure'
import { Reveal, RevealGroup } from '../ui/Reveal'
import { tailoredCapabilities, tailoredLead } from '../../data/textiles'

export function TailoredSpecs() {
  return (
    <section id="packaging" className="scroll-mt-24 bg-ivory-deep/70">
      <Figure
        src="/images/textile/cartons-palletised.jpg"
        alt="Shrink-wrapped export cartons stacked on pallets in a warehouse"
        ratio="21 / 8"
        zoom
        className="[&>div]:!bg-ink"
        imgClassName="object-[50%_58%]"
      />

      <Container className="py-28 lg:py-36">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading label="Customised packaging" title="Made to Meet Your Specifications." />
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-8">
            <Reveal delay={0.08}>
              <p className="text-[0.98rem] leading-[1.85] text-charcoal">{tailoredLead}</p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <Figure
              src="/images/textile/cones-cartoning.jpg"
              alt="A worker packing yarn cones into export cartons in a warehouse"
              ratio="4 / 3"
              zoom
              imgClassName="object-[28%_40%]"
            />
            <div className="mt-5 grid grid-cols-2 gap-5">
              <Figure
                src="/images/textile/cones-palletising.jpg"
                alt="Workers stacking wound yarn cones onto a pallet"
                ratio="1 / 1"
                zoom
                imgClassName="object-[45%_50%]"
              />
              <Figure
                src="/images/textile/blue-yarn-cones.jpg"
                alt="Blue yarn cones wound in parallel rows"
                ratio="1 / 1"
                zoom
              />
            </div>
          </div>

          <div className="lg:col-span-6">
            <RevealGroup className="grid gap-x-8 sm:grid-cols-2" stagger={0.05}>
              {tailoredCapabilities.map((c, i) => (
                <RevealGroup.Item key={c.title} className="border-t border-ink/15 py-4">
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-[0.9rem] text-gold">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="text-[0.88rem] font-medium leading-snug text-ink">{c.title}</h3>
                  </div>
                  <p className="mt-1.5 pl-8 text-[0.8rem] leading-relaxed text-charcoal/75">{c.note}</p>
                </RevealGroup.Item>
              ))}
            </RevealGroup>
            <p className="mt-6 border-t border-ink/15 pt-4 text-[0.78rem] leading-relaxed text-charcoal/65">
              Arrangements are subject to manufacturer capabilities and order specifications, and
              confirmed individually for each enquiry.
            </p>
            <div className="mt-8">
              <Button to="/quality-packaging#packaging" variant="outline">
                Cone &amp; packaging options
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
