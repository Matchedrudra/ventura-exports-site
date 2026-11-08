import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { Figure } from '../ui/Figure'
import { Reveal, RevealGroup } from '../ui/Reveal'
import { yarnTypeList, homeYarnCounts } from '../../data/textiles'

/* The principal division: dark, full-bleed photography, and the largest type on the page. */
export function YarnDivision() {
  return (
    <section className="bg-ink text-ivory">
      <div className="relative">
        <Figure
          src="/images/textile/spinning-line-india.jpg"
          alt="Rows of yarn packages along a ring-spinning line in an Indian textile mill"
          ratio="21 / 8"
          className="[&>div]:!bg-ink"
          imgClassName="object-[50%_62%]"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <Container className="pb-28 lg:pb-40">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-0">
          <div className="relative self-start lg:col-span-5 lg:-mt-32">
            <Reveal>
              <Figure
                src="/images/textile/white-cones-winder.jpg"
                alt="A worker handling white cotton yarn cones at a cone-winding machine"
                ratio="4 / 5"
                zoom
                imgClassName="object-[30%_50%]"
              />
            </Reveal>
            <Reveal delay={0.12} className="absolute -right-6 bottom-10 hidden w-[44%] lg:block xl:-right-12">
              <Figure
                src="/images/textile/blue-yarn-cones.jpg"
                alt="Blue yarn cones wound in parallel rows"
                ratio="4 / 5"
                zoom
                className="shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)]"
              />
            </Reveal>
          </div>

          <div className="pt-4 lg:col-span-6 lg:col-start-7 lg:pt-16">
            <Reveal>
              <p className="mb-4 flex items-center gap-3 text-[0.66rem] font-semibold uppercase leading-none tracking-[0.2em] text-gold-soft">
                <span aria-hidden="true" className="h-px w-8 bg-gold-soft/70" />
                Our principal division
              </p>
              <h2 className="font-serif text-[2.4rem] font-medium leading-[1.05] text-ivory sm:text-[3rem] lg:text-[3.4rem]">
                Yarns.
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-5 max-w-[30rem] text-[0.98rem] leading-[1.85] text-ivory/70">
                Cotton, polyester and blended yarns for textile mills, fabric manufacturers, knitting
                units and international distributors — sourced to your count, composition and
                spinning system.
              </p>
            </Reveal>

            <RevealGroup className="mt-9" stagger={0.06}>
              {yarnTypeList.map((y, i) => (
                <RevealGroup.Item key={y.name}>
                  <Link
                    to={y.to}
                    className="group flex items-baseline gap-5 border-t border-white/15 py-3.5 transition-colors duration-500 hover:border-gold-soft"
                  >
                    <span className="w-6 font-serif text-[0.9rem] text-gold-soft">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-serif text-[1.4rem] font-medium text-ivory transition-transform duration-500 ease-editorial group-hover:translate-x-2 group-hover:text-gold-soft">
                      {y.name}
                    </span>
                    <span
                      aria-hidden="true"
                      className="ml-auto -translate-x-2 text-gold-soft opacity-0 transition-all duration-500 ease-editorial group-hover:translate-x-0 group-hover:opacity-100"
                    >
                      →
                    </span>
                  </Link>
                </RevealGroup.Item>
              ))}
              <div className="border-t border-white/15" />
            </RevealGroup>

            <Reveal delay={0.1}>
              <p className="mt-10 text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-ivory/50">Specifications</p>
              <ul className="mt-4 flex flex-wrap gap-x-7 gap-y-2">
                {homeYarnCounts.map((c) => (
                  <li key={c} className="font-serif text-[1.9rem] font-medium leading-none text-ivory">
                    {c}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[0.84rem] text-ivory/55">and other specifications on request.</p>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Button to="/yarns" variant="light">
                  Explore Yarns
                </Button>
                <Button to="/yarns#requirements" variant="link" className="!text-ivory hover:!text-gold-soft">
                  Tell us your requirements
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
