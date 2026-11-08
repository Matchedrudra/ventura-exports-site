import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { Figure } from '../ui/Figure'
import { Reveal } from '../ui/Reveal'
import { fabricTypeList } from '../../data/textiles'

/* Fabrics: a wide image bleeding off the right edge, with a short typographic index and an inset detail. */
export function FabricsDivision() {
  return (
    <section className="overflow-hidden py-28 lg:py-40">
      <Container>
        <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4 lg:pt-6">
            <Reveal>
              <p className="mb-4 flex items-center gap-3 text-[0.66rem] font-semibold uppercase leading-none tracking-[0.2em] text-gold">
                <span aria-hidden="true" className="h-px w-8 bg-gold" />
                Fabrics
              </p>
              <h2 className="font-serif text-[1.85rem] font-medium leading-[1.15] text-ink sm:text-[2.15rem] lg:text-[2.4rem]">
                Fabrics for Diverse Applications.
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-5 text-[0.98rem] leading-[1.85] text-charcoal">
                Woven and knitted fabrics sourced through Ventura&apos;s Indian manufacturing network,
                specified by composition, GSM, width, construction, colour and finish.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-3 font-serif text-[1.25rem] font-medium text-ink">
                {fabricTypeList.map((f, i) => (
                  <li key={f} className="flex items-center gap-5">
                    <Link
                      to="/fabrics"
                      className="relative transition-colors duration-300 hover:text-gold-deep after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-[width] after:duration-500 hover:after:w-full"
                    >
                      {f}
                    </Link>
                    {i < fabricTypeList.length - 1 && <span aria-hidden="true" className="h-3 w-px bg-ink/20" />}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Button to="/fabrics" variant="solid">
                  Explore Fabrics
                </Button>
                <Button to="/fabrics#requirements" variant="link">
                  Send a fabric enquiry
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="relative lg:col-span-8 lg:-mr-10 xl:-mr-14">
            <Figure
              src="/images/textile/fabric-rolls-factory.jpg"
              alt="Rolls of finished fabric stored on racks in a textile factory"
              ratio="16 / 10"
              zoom
            />
            <Reveal delay={0.15} className="mt-5 w-2/5 sm:w-1/3 lg:absolute lg:-bottom-14 lg:-left-6 lg:mt-0 lg:w-[28%]">
              <Figure
                src="/images/textile/warp-threads-loom.jpg"
                alt="Warp threads aligned on a loom ahead of weaving"
                ratio="3 / 4"
                zoom
                className="shadow-[0_24px_60px_-24px_rgba(23,35,58,0.55)]"
              />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
