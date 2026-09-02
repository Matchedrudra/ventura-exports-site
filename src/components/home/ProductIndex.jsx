import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { products } from '../../data/products'

export function ProductIndex() {
  return (
    <section className="border-b border-line py-20 lg:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              label="Products"
              title="Four categories, specified to the load."
              lead="Ventura works across woven industrial packaging — from two-tonne bulk bags to retail-size woven sacks — and coordinates the specification with the manufacturing partner before production."
            />
          </div>
          <div className="lg:col-span-7 lg:pt-2">
            <ul className="border-t border-line">
              {products.map((p) => (
                <li key={p.slug}>
                  <Reveal>
                    <Link
                      to={`/products/${p.slug}`}
                      className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 border-b border-line py-6 transition-colors duration-300 hover:bg-ivory-deep/50 sm:gap-x-8"
                    >
                      <span className="font-serif text-sm text-gold">{p.index}</span>
                      <span className="min-w-0">
                        <span className="block text-[1.15rem] font-medium tracking-[-0.01em] text-ink sm:text-[1.3rem]">
                          {p.name}
                        </span>
                        <span className="mt-1 block text-[0.92rem] leading-relaxed text-ink/55">
                          {p.tagline}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="translate-x-0 text-ink/30 transition-transform duration-300 ease-editorial group-hover:translate-x-1 group-hover:text-gold"
                      >
                        →
                      </span>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
