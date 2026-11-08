import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'
import { Figure } from '../ui/Figure'
import { Reveal } from '../ui/Reveal'
import { HairlineList } from '../ui/HairlineList'
import { tailoredCapabilities, tailoredLead } from '../../data/textiles'

export function TailoredSpecs() {
  return (
    <section id="packaging" className="border-y border-line bg-ivory-deep/60 py-20 lg:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-0">
          <div className="lg:col-span-5">
            <SectionHeading label="Customised packaging" title="Tailored to Your Specifications." lead={tailoredLead} />
            <HairlineList items={tailoredCapabilities} columns={2} className="mt-8" />
            <div className="border-t border-line" />
            <div className="mt-8">
              <Button to="/quality-packaging#packaging" variant="outline">
                Cone &amp; packaging options
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <Figure
                src="/images/textile/cones-cartoning.jpg"
                alt="A worker packing yarn cones into export cartons in a warehouse"
                ratio="3 / 2"
                imgClassName="object-[30%_40%]"
              />
            </Reveal>
            <div className="mt-5 grid grid-cols-12 gap-5">
              <Reveal delay={0.08} className="col-span-7">
                <Figure
                  src="/images/textile/cartons-palletised.jpg"
                  alt="Shrink-wrapped export cartons stacked on pallets in a warehouse"
                  ratio="4 / 3"
                />
              </Reveal>
              <Reveal delay={0.14} className="col-span-5">
                <Figure
                  src="/images/textile/cones-palletising.jpg"
                  alt="Workers stacking wound yarn cones onto a pallet"
                  ratio="3 / 4"
                  imgClassName="object-[45%_50%]"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
