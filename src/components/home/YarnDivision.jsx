import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'
import { Figure } from '../ui/Figure'
import { Reveal } from '../ui/Reveal'
import { HairlineList } from '../ui/HairlineList'
import { yarnTypeList, homeYarnCounts } from '../../data/textiles'

export function YarnDivision() {
  return (
    <section className="border-y border-line bg-paper py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-0">
          <div className="lg:col-span-6">
            <div className="grid grid-cols-12 items-start gap-5">
              <Reveal className="col-span-8">
                <Figure
                  src="/images/textile/white-cones-winder.jpg"
                  alt="A worker handling white cotton yarn cones at a cone-winding machine"
                  ratio="4 / 5"
                  imgClassName="object-[30%_50%]"
                />
              </Reveal>
              <Reveal delay={0.1} className="col-span-4 pt-14">
                <Figure
                  src="/images/textile/blue-yarn-cones.jpg"
                  alt="Blue yarn cones wound in parallel rows"
                  ratio="3 / 5"
                />
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <SectionHeading
              label="01 — Yarns"
              title="Yarns, Sourced to Your Specifications."
              lead="Cotton, polyester and blended yarns for textile mills, fabric manufacturers, knitting units and international distributors — specified by count, composition and spinning system."
            />
            <HairlineList items={yarnTypeList} columns={2} className="mt-8" />
            <div className="border-t border-line" />

            <div className="mt-8">
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-ink/55">Yarn counts</p>
              <p className="mt-3 font-serif text-[1.35rem] leading-snug text-ink">
                {homeYarnCounts.join('  ·  ')}
              </p>
              <p className="mt-2 text-[0.84rem] text-charcoal/70">and other specifications on request.</p>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button to="/yarns" variant="solid">
                Explore Yarns
              </Button>
              <Button to="/yarns#requirements" variant="link">
                Tell us your requirements
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
