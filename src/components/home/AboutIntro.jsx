import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'
import { Figure } from '../ui/Figure'
import { Reveal } from '../ui/Reveal'

export function AboutIntro() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6">
            <SectionHeading label="About Ventura" title="Built Around Quality. Connected Through Global Trade." />
            <div className="mt-8 max-w-prose space-y-5 text-[1.03rem] leading-[1.8] text-ink/75">
              <Reveal>
                <p>
                  Ventura Exports is an India-based export and sourcing company focused on supplying
                  quality textile products to international markets.
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <p>
                  With a primary focus on yarns and fabrics, we work with manufacturing partners to
                  address diverse buyer requirements, from product specifications and yarn counts to
                  customised packaging and export coordination.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p>
                  Our approach is built around understanding customer requirements, dependable
                  supplier relationships and professional international trade practices.
                </p>
              </Reveal>
            </div>
            <div className="mt-9">
              <Button to="/about" variant="outline">
                About Ventura
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-12 gap-4">
              <Reveal className="col-span-8">
                <Figure
                  src="/images/textile/spinning-line-india.jpg"
                  alt="A spinning line in an Indian textile mill, with a worker walking the frames"
                  ratio="4 / 5"
                  imgClassName="object-[40%_50%]"
                />
              </Reveal>
              <Reveal delay={0.1} className="col-span-4 self-end">
                <Figure
                  src="/images/textile/cones-on-frame.jpg"
                  alt="Close view of white yarn cones on a winding frame"
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
