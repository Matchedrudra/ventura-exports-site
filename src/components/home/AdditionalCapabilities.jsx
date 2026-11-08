import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'

const ITEMS = [
  { name: 'FIBC Jumbo Bags', to: '/products/fibc-jumbo-bags' },
  { name: 'PP Woven Bags', to: '/products/pp-hdpe-woven-bags' },
  { name: 'Indian Spices', to: '/other-products#agro' },
  { name: 'Dehydrated Onion and Garlic', to: '/other-products#agro' },
]

/* Deliberately quiet: text only, no images, small type. */
export function AdditionalCapabilities() {
  return (
    <section className="border-t border-line py-16 lg:py-20">
      <Container>
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="font-serif text-[1.35rem] font-medium leading-snug text-ink sm:text-[1.5rem]">
                Additional Sourcing Capabilities
              </h2>
              <p className="mt-3 max-w-md text-[0.88rem] leading-[1.75] text-charcoal/80">
                Beyond our core textile portfolio, Ventura Exports also serves selected requirements
                across industrial packaging and agricultural commodities.
              </p>
            </div>
            <div className="lg:col-span-7">
              <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[0.9rem] text-ink/85">
                {ITEMS.map((i) => (
                  <li key={i.name}>
                    <Link
                      to={i.to}
                      className="group relative inline-flex items-center gap-2 transition-colors duration-300 hover:text-gold-deep after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-[width] after:duration-500 hover:after:w-full"
                    >
                      {i.name}
                      <span aria-hidden="true" className="text-gold transition-transform duration-300 ease-editorial group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
