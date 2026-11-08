import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'
import { Figure } from '../ui/Figure'
import { Reveal } from '../ui/Reveal'
import { weavingProducts } from '../../data/textiles'

/* Sits below Yarns and Fabrics: a supporting textile division, not a headline one. */
export function AccessoriesDivision() {
  return (
    <section className="border-y border-line bg-ivory-deep/50 py-16 lg:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading
              label="Textile accessories"
              title="Textile Accessories & Weaving Solutions."
              lead="Ventura Exports also offers sourcing of specialised textile machinery accessories and weaving components through its manufacturing and supplier network. We coordinate sourcing based on the buyer’s technical requirements and machinery specifications."
            />
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {weavingProducts.map((p) => (
                <li key={p.slug}>
                  <Link
                    to={`/weaving-accessories#${p.slug}`}
                    className="group flex items-center justify-between gap-4 py-2.5 text-[0.95rem] text-ink/80 transition-colors hover:text-gold-deep"
                  >
                    {p.name}
                    <span aria-hidden="true" className="text-ink/25 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-gold">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button to="/weaving-accessories" variant="outline">
                Explore weaving accessories
              </Button>
              <Button to="/weaving-accessories#requirements" variant="link">
                Send a product enquiry
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 lg:col-span-6">
            <Reveal className="col-span-7">
              <Figure
                src="/images/textile/weaving-healds.jpg"
                alt="Heald shafts with heddle loops carrying warp threads on a loom"
                ratio="4 / 5"
                imgClassName="object-[35%_50%]"
              />
            </Reveal>
            <Reveal delay={0.1} className="col-span-5 self-end">
              <Figure
                src="/images/textile/loom-heald-frames.jpg"
                alt="A technician working on the heald frames of an industrial weaving machine"
                ratio="3 / 4"
                imgClassName="object-[55%_50%]"
              />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
