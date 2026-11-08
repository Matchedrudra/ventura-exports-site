import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'
import { Figure } from '../ui/Figure'
import { Reveal } from '../ui/Reveal'
import { HairlineList } from '../ui/HairlineList'

const GROUPS = [
  {
    key: 'packaging',
    label: '04 — Industrial packaging',
    image: '/images/product-fibc.jpg',
    alt: 'An FIBC jumbo bag being lifted at a packing facility',
    items: [
      { name: 'FIBC Bags', to: '/products/fibc-jumbo-bags' },
      { name: 'PP Woven Bags', to: '/products/pp-hdpe-woven-bags' },
      { name: 'Customised Packaging', to: '/products/customized-woven-packaging' },
    ],
  },
  {
    key: 'agro',
    label: '05 — Agro products',
    image: '/images/textile/spices-assorted.jpg',
    alt: 'An assortment of Indian spices',
    items: [
      { name: 'Indian Spices', to: '/other-products#agro' },
      { name: 'Dehydrated Onion', to: '/other-products#agro' },
      { name: 'Dehydrated Garlic', to: '/other-products#agro' },
    ],
  },
]

export function AdditionalCapabilities() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading label="Additional capabilities" title="Beyond Textiles." />
          <Button to="/other-products" variant="link" className="shrink-0">
            All other products
          </Button>
        </div>

        <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-16">
          {GROUPS.map((g) => (
            <Reveal key={g.key}>
              <Figure src={g.image} alt={g.alt} ratio="16 / 7" />
              <p className="mt-6 text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-gold">{g.label}</p>
              <HairlineList items={g.items} className="mt-4" />
              <div className="border-t border-line" />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
