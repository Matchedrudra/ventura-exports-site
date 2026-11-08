import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'
import { Figure } from '../ui/Figure'
import { Reveal } from '../ui/Reveal'

const GROUPS = [
  {
    key: 'packaging',
    label: 'Industrial packaging',
    image: '/images/product-fibc.jpg',
    alt: 'An FIBC jumbo bag being lifted at a packing facility',
    items: [
      { name: 'FIBC Jumbo Bags', to: '/products/fibc-jumbo-bags' },
      { name: 'PP Woven Bags', to: '/products/pp-hdpe-woven-bags' },
      { name: 'Industrial Packaging Products', to: '/other-products' },
    ],
  },
  {
    key: 'agro',
    label: 'Agro commodities',
    image: '/images/textile/spices-assorted.jpg',
    alt: 'An assortment of Indian spices',
    items: [
      { name: 'Indian Spices', to: '/other-products#agro' },
      { name: 'Dehydrated Onion', to: '/other-products#agro' },
      { name: 'Dehydrated Garlic', to: '/other-products#agro' },
      { name: 'Other agricultural commodities', to: '/other-products#agro' },
    ],
  },
]

export function AdditionalCapabilities() {
  return (
    <section className="border-y border-line bg-ivory-deep/50 py-16 lg:py-20">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading label="Beyond textiles" title="Additional Sourcing Capabilities." />
          <Button to="/other-products" variant="link" className="shrink-0">
            All other products
          </Button>
        </div>

        <div className="mt-10 grid gap-px border border-line bg-line md:grid-cols-2">
          {GROUPS.map((g) => (
            <Reveal key={g.key} className="flex gap-5 bg-ivory p-5 sm:p-6">
              <div className="hidden w-32 shrink-0 sm:block">
                <Figure src={g.image} alt={g.alt} ratio="4 / 5" />
              </div>
              <div className="min-w-0">
                <p className="text-label font-semibold uppercase tracking-label text-gold">{g.label}</p>
                <ul className="mt-4 divide-y divide-line border-y border-line">
                  {g.items.map((i) => (
                    <li key={i.name}>
                      <Link
                        to={i.to}
                        className="group flex items-center justify-between gap-4 py-2.5 text-[0.95rem] text-ink/80 transition-colors hover:text-gold-deep"
                      >
                        {i.name}
                        <span aria-hidden="true" className="text-ink/25 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-gold">
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
