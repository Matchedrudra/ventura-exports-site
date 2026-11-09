import { Link } from 'react-router-dom'
import { Seo } from '../components/ui/Seo'
import { PageHeader } from '../components/ui/PageHeader'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { ProductThumb } from '../components/ui/ProductThumb'
import { Figure } from '../components/ui/Figure'
import { Reveal, RevealGroup } from '../components/ui/Reveal'
import { CtaBand } from '../components/ui/CtaBand'
import { products } from '../data/products'
import { CATEGORY_AGRO } from '../lib/validation'
import { pageSeo } from '../data/seo'

const AGRO_ITEMS = [
  { name: 'Indian Spices', note: 'Whole and ground spices, sourced to the grade and pack size you specify.' },
  { name: 'Dehydrated Onion', note: 'Dehydrated onion products, with form and packing agreed per enquiry.' },
  { name: 'Dehydrated Garlic', note: 'Dehydrated garlic products, with form and packing agreed per enquiry.' },
  { name: 'Other Agricultural Commodity', note: 'Other Indian agricultural commodities, on enquiry.' },
]

const FIRST = ['fibc-jumbo-bags', 'pp-hdpe-woven-bags']
const ordered = [
  ...FIRST.map((slug) => products.find((p) => p.slug === slug)).filter(Boolean),
  ...products.filter((p) => !FIRST.includes(p.slug)),
]

const agroHref = (type) => `/request-a-quote?${new URLSearchParams({ category: CATEGORY_AGRO, type })}`

const seo = pageSeo('/other-products')

export default function OtherProducts() {
  return (
    <>
      <Seo {...seo} />
      <PageHeader
        label="Other products"
        title="Additional Sourcing Capabilities."
        lead="Alongside its textile business, Ventura also sources industrial packaging and agro commodities from Indian manufacturing partners — specified and coordinated in the same way."
      />

      <section id="packaging" className="scroll-mt-24 py-16 lg:py-24">
        <Container>
          <SectionHeading
            label="Industrial packaging"
            title="FIBC Jumbo Bags, PP Woven Bags and industrial packaging."
            lead="Specifications are configured to the buyer’s requirement and confirmed with the manufacturing partner before production."
          />
          <RevealGroup className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {ordered.map((p) => (
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
                  <h3 className="mt-4 text-[1.05rem] font-medium tracking-[-0.01em] text-ink transition-colors group-hover:text-gold-deep">
                    {p.name}
                  </h3>
                  <p className="mt-1.5 text-[0.88rem] leading-relaxed text-charcoal/75">{p.tagline}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[0.76rem] font-medium uppercase tracking-widelabel text-ink/40 transition-colors group-hover:text-gold-deep">
                    View product
                    <span aria-hidden="true" className="transition-transform duration-300 ease-editorial group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </RevealGroup.Item>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <section id="agro" className="scroll-mt-24 border-t border-line bg-ivory-deep/50 py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                label="Agro commodities"
                title="Indian spices and agricultural commodities."
                lead="Sourced on enquiry from Indian suppliers. Tell us the product, grade, quantity and packing you need and we will confirm what can be supplied."
              />
              <Reveal>
                <div className="mt-8">
                  <Figure src="/images/textile/spices-assorted.jpg" alt="An assortment of Indian spices" ratio="3 / 2" />
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <ul className="divide-y divide-line border-y border-line">
                {AGRO_ITEMS.map((a) => (
                  <li key={a.name}>
                    <Reveal>
                      <div className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                        <div>
                          <h3 className="text-[1.15rem] font-medium tracking-[-0.01em] text-ink">{a.name}</h3>
                          <p className="mt-1.5 max-w-md text-[0.92rem] leading-relaxed text-charcoal/75">{a.note}</p>
                        </div>
                        <Link
                          to={agroHref(a.name)}
                          className="u-underline inline-flex shrink-0 items-center gap-2 text-[0.8rem] font-medium uppercase tracking-widelabel text-ink transition-colors hover:text-gold"
                        >
                          Enquire <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Have a requirement outside textiles?"
        body="Send the product and specification and we will check what can be sourced from our Indian manufacturing and supplier network."
        primaryLabel="Send an Enquiry"
        secondaryLabel="Contact"
      />
    </>
  )
}
