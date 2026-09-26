import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'
import { Reveal, RevealGroup } from '../ui/Reveal'
import { ProductThumb } from '../ui/ProductThumb'
import { products } from '../../data/products'

// The homepage portfolio, grouped into three calm rows rather than one dense
// grid. Packaging is the umbrella; each group is an equal part of it.
const GROUPS = [
  { key: 'flexible', label: 'Flexible & woven packaging', cols: 'lg:grid-cols-4' },
  { key: 'paper', label: 'Paper & commercial packaging', cols: 'lg:grid-cols-3' },
  { key: 'specialized', label: 'Industrial & specialized packaging', cols: 'lg:grid-cols-3' },
]

export function ProductIndex() {
  return (
    <section className="border-b border-line py-20 lg:py-28">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            label="Packaging portfolio"
            title="One packaging portfolio, sourced from India."
            lead="Ventura sources across flexible, woven, paper and commercial packaging — coordinating the specification with a suitable Indian manufacturing partner before production."
          />
          <Button to="/products" variant="link" className="shrink-0">
            All products
          </Button>
        </div>

        <div className="mt-16 space-y-16 lg:mt-20 lg:space-y-20">
          {GROUPS.map((group) => {
            const items = products.filter((p) => p.homeGroup === group.key)
            if (items.length === 0) return null
            return (
              <div key={group.key}>
                <Reveal>
                  <p className="flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-widelabel text-ink/50">
                    <span className="h-px w-8 bg-gold" aria-hidden="true" />
                    {group.label}
                  </p>
                </Reveal>
                <RevealGroup className={`mt-7 grid gap-x-8 gap-y-12 sm:grid-cols-2 ${group.cols}`}>
                  {items.map((p) => (
                    <RevealGroup.Item key={p.slug}>
                      <Link to={`/products/${p.slug}`} className="group block">
                        <div className="overflow-hidden bg-ivory-deep">
                          <ProductThumb
                            image={p.image}
                            alt={p.imageAlt}
                            label={p.shortName}
                            ratio="4 / 3"
                            fit={p.cardFit || 'cover'}
                            imgClassName="transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.04]"
                          />
                        </div>
                        <div className="mt-4 flex items-baseline gap-3">
                          <span className="font-serif text-[0.8rem] text-gold">{p.index}</span>
                          <h3 className="text-[1.08rem] font-medium tracking-[-0.01em] text-ink transition-colors group-hover:text-gold-deep">
                            {p.name}
                          </h3>
                        </div>
                        <p className="mt-2 text-[0.9rem] leading-relaxed text-ink/55">{p.tagline}</p>
                        <span className="mt-3 inline-flex items-center gap-1.5 text-[0.78rem] font-medium uppercase tracking-widelabel text-ink/40 transition-colors group-hover:text-gold-deep">
                          Explore product
                          <span
                            aria-hidden="true"
                            className="transition-transform duration-300 ease-editorial group-hover:translate-x-1"
                          >
                            →
                          </span>
                        </span>
                      </Link>
                    </RevealGroup.Item>
                  ))}
                </RevealGroup>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
