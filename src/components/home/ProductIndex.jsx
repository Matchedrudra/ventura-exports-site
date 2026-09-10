import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'
import { RevealGroup } from '../ui/Reveal'
import { ProductThumb } from '../ui/ProductThumb'
import { products } from '../../data/products'

// Six primary portfolio categories on the homepage.
const featured = products.filter((p) => p.slug !== 'industrial-commercial-packaging')

export function ProductIndex() {
  return (
    <section className="border-b border-line py-20 lg:py-28">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            label="Packaging portfolio"
            title="A growing packaging & filtration portfolio."
            lead="Ventura sources across bulk, woven, laminated, corrugated and filtration formats — coordinating the specification with the manufacturing partner before production."
          />
          <Button to="/products" variant="link" className="shrink-0">
            All products
          </Button>
        </div>

        <RevealGroup className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
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
              </Link>
            </RevealGroup.Item>
          ))}
        </RevealGroup>
      </Container>
    </section>
  )
}
