import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'
import { Figure } from '../ui/Figure'
import { Reveal } from '../ui/Reveal'
import { site } from '../../data/site'

const PILLARS = ['Product consistency', 'Supply coordination', 'Export documentation']

export function AboutIntro() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-0">
          <div className="lg:col-span-5">
            <SectionHeading label="About Ventura" title="Built Around Quality. Connected Through Global Trade." />
            <div className="mt-7 max-w-[30rem] space-y-4 text-[0.98rem] leading-[1.85] text-charcoal">
              <Reveal>
                <p>
                  Ventura Exports is an India-based export and sourcing company focused on supplying
                  quality textile products to international markets.
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <p>
                  With a primary focus on yarns and fabrics, we work with our manufacturing partners
                  to meet diverse buyer requirements — from product specifications and yarn counts to
                  customised packaging and export coordination.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p>
                  Our approach rests on a clear understanding of each requirement, dependable
                  supplier relationships built over {site.experience}, and professional international
                  trade practices.
                </p>
              </Reveal>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-ink/70">
              {PILLARS.map((p) => (
                <li key={p} className="flex items-center gap-2.5">
                  <span aria-hidden="true" className="h-px w-3 bg-gold" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button to="/about" variant="link">
                About Ventura
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="grid grid-cols-12 items-end gap-5">
              <Reveal className="col-span-8">
                <Figure
                  src="/images/textile/spinning-line-india.jpg"
                  alt="A spinning line in an Indian textile mill, with a worker walking the frames"
                  ratio="4 / 5"
                  imgClassName="object-[40%_50%]"
                />
              </Reveal>
              <Reveal delay={0.1} className="col-span-4 pb-10">
                <Figure
                  src="/images/textile/cones-on-frame.jpg"
                  alt="Close view of white yarn cones on a winding frame"
                  ratio="3 / 4"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
