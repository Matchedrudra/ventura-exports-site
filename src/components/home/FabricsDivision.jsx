import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'
import { Figure } from '../ui/Figure'
import { Reveal } from '../ui/Reveal'
import { HairlineList } from '../ui/HairlineList'
import { fabricTypeList } from '../../data/textiles'

export function FabricsDivision() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-0">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <SectionHeading
              label="02 — Fabrics"
              title="Fabrics, Sourced for Diverse Applications."
              lead="Woven and knitted fabrics through Ventura's Indian manufacturing network, specified by composition, GSM, width, construction, colour and finish."
            />
            <HairlineList items={fabricTypeList} className="mt-8 max-w-sm" />
            <div className="border-t border-line max-w-sm" />
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button to="/fabrics" variant="solid">
                Explore Fabrics
              </Button>
              <Button to="/fabrics#requirements" variant="link">
                Send a fabric enquiry
              </Button>
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
            <div className="grid grid-cols-12 items-start gap-5">
              <Reveal className="col-span-7 pt-12">
                <Figure
                  src="/images/textile/fabric-rolls-factory.jpg"
                  alt="Rolls of finished fabric stored on racks in a textile factory"
                  ratio="4 / 5"
                  imgClassName="object-[30%_50%]"
                />
              </Reveal>
              <Reveal delay={0.1} className="col-span-5">
                <Figure
                  src="/images/textile/warp-threads-loom.jpg"
                  alt="Warp threads aligned on a loom ahead of weaving"
                  ratio="3 / 5"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
