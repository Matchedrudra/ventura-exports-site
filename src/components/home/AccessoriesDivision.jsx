import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { Figure } from '../ui/Figure'
import { Reveal, RevealGroup } from '../ui/Reveal'
import { weavingTypeList } from '../../data/textiles'

/* Weaving accessories: a centred introduction over a three-image strip and a five-column index. */
export function AccessoriesDivision() {
  return (
    <section className="border-y border-line bg-paper py-28 lg:py-36">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="mb-4 text-[0.66rem] font-semibold uppercase leading-none tracking-[0.2em] text-gold">
              Weaving accessories
            </p>
            <h2 className="font-serif text-[1.85rem] font-medium leading-[1.15] text-ink sm:text-[2.15rem] lg:text-[2.4rem]">
              Components for the Loom.
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-5 text-[0.98rem] leading-[1.85] text-charcoal">
              Specialised weaving components sourced through our manufacturing and supplier network,
              coordinated to the buyer&apos;s technical requirements and machinery specifications.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid h-[520px] grid-cols-6 grid-rows-2 gap-3 sm:h-[400px] sm:grid-rows-1 sm:gap-4 lg:mt-20 lg:h-[460px] lg:grid-cols-[1.5fr_1fr_0.7fr] lg:gap-6">
          <Reveal className="col-span-6 h-full sm:col-span-3 lg:col-span-1">
            <Figure
              src="/images/textile/weaving-reed.jpg"
              alt="Close view of a weaving reed set in the beater of a loom"
              fill
              zoom
              imgClassName="object-[35%_50%]"
            />
          </Reveal>
          <Reveal delay={0.1} className="col-span-3 h-full sm:col-span-2 lg:col-span-1">
            <Figure
              src="/images/textile/weaving-healds.jpg"
              alt="Heald shafts with heddle loops carrying warp threads on a loom"
              fill
              zoom
              imgClassName="object-[30%_50%]"
            />
          </Reveal>
          <Reveal delay={0.2} className="col-span-3 h-full sm:col-span-1 lg:col-span-1">
            <Figure
              src="/images/textile/loom-heald-frames.jpg"
              alt="A technician working on the heald frames of an industrial weaving machine"
              fill
              zoom
              imgClassName="object-[62%_50%]"
            />
          </Reveal>
        </div>

        <RevealGroup className="mt-12 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:mt-16 lg:grid-cols-5" stagger={0.07}>
          {weavingTypeList.map((w, i) => (
            <RevealGroup.Item key={w.name}>
              <Link to={w.to} className="group block border-t border-ink/15 pb-5 pt-4 transition-colors duration-500 hover:border-gold">
                <span className="font-serif text-[0.95rem] text-gold">{String(i + 1).padStart(2, '0')}</span>
                <span className="mt-2 flex items-start justify-between gap-3 font-serif text-[1.3rem] font-medium leading-tight text-ink transition-transform duration-500 ease-editorial group-hover:translate-x-1">
                  {w.name}
                  <span aria-hidden="true" className="mt-1 -translate-x-2 text-[1rem] text-gold opacity-0 transition-all duration-500 ease-editorial group-hover:translate-x-0 group-hover:opacity-100">
                    →
                  </span>
                </span>
              </Link>
            </RevealGroup.Item>
          ))}
        </RevealGroup>

        <Reveal>
          <div className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-3">
            <Button to="/weaving-accessories" variant="outline">
              Explore weaving accessories
            </Button>
            <Button to="/weaving-accessories#requirements" variant="link">
              Send a product enquiry
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
