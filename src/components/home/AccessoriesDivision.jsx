import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'
import { Figure } from '../ui/Figure'
import { Reveal } from '../ui/Reveal'
import { HairlineList } from '../ui/HairlineList'
import { weavingTypeList } from '../../data/textiles'

/* Below Yarns and Fabrics: a supporting textile division, kept quieter. */
export function AccessoriesDivision() {
  return (
    <section className="border-b border-line bg-paper py-16 lg:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-0">
          <div className="lg:col-span-5">
            <SectionHeading
              label="03 — Weaving accessories"
              title="Textile Accessories & Weaving Solutions."
              lead="Specialised weaving components sourced through our manufacturing and supplier network, coordinated to the buyer's technical requirements and machinery specifications."
            />
            <HairlineList items={weavingTypeList} className="mt-7" />
            <div className="border-t border-line" />
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button to="/weaving-accessories" variant="outline">
                Explore weaving accessories
              </Button>
              <Button to="/weaving-accessories#requirements" variant="link">
                Send a product enquiry
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="grid grid-cols-12 items-end gap-5">
              <Reveal className="col-span-7">
                <Figure
                  src="/images/textile/weaving-reed.jpg"
                  alt="Close view of a weaving reed set in the beater of a loom"
                  ratio="4 / 5"
                  imgClassName="object-[35%_50%]"
                />
              </Reveal>
              <Reveal delay={0.1} className="col-span-5 pb-12">
                <Figure
                  src="/images/textile/loom-heald-frames.jpg"
                  alt="A technician working on the heald frames of an industrial weaving machine"
                  ratio="3 / 4"
                  imgClassName="object-[60%_50%]"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
