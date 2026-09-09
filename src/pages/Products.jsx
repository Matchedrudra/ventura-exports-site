import { Link } from 'react-router-dom'
import { Seo } from '../components/ui/Seo'
import { PageHeader } from '../components/ui/PageHeader'
import { Container } from '../components/ui/Container'
import { Figure } from '../components/ui/Figure'
import { Reveal } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import { CtaBand } from '../components/ui/CtaBand'
import { products } from '../data/products'
import { cn } from '../lib/cn'

export default function Products() {
  return (
    <>
      <Seo
        path="/products"
        title="Products"
        description="Ventura's packaging portfolio: FIBC and jumbo bags, PP & HDPE woven bags, BOPP laminated bags, customized woven packaging, corrugated boxes and cartons, and industrial filter bags — sourced from Indian manufacturing partners to specification."
      />
      <PageHeader
        label="Packaging portfolio"
        title="One portfolio, specified to the application."
        lead="Seven categories across bulk, woven, laminated, corrugated and filtration formats. Specifications are configured to the buyer's requirement and coordinated with the manufacturing partner before production."
      />

      <section className="py-16 lg:py-24">
        <Container>
          <div className="space-y-20 lg:space-y-28">
            {products.map((p, i) => (
              <article key={p.slug} id={p.slug} className="scroll-mt-28">
                <div
                  className={cn(
                    'grid items-center gap-10 lg:grid-cols-12 lg:gap-16',
                    i % 2 === 1 && 'lg:[&>*:first-child]:order-2',
                  )}
                >
                  <div className="lg:col-span-6">
                    <Reveal>
                      <Figure src={p.image} alt={p.imageAlt} ratio="4 / 3" />
                    </Reveal>
                  </div>
                  <div className="lg:col-span-6">
                    <Reveal>
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <span className="font-serif text-sm text-gold">{p.index}</span>
                        <span className="text-label font-semibold uppercase tracking-label text-ink/45">
                          {p.group}
                        </span>
                        <span className="text-[0.7rem] uppercase tracking-widelabel text-ink/35">
                          {p.kicker}
                        </span>
                      </div>
                    </Reveal>
                    <Reveal delay={0.05}>
                      <h2 className="mt-4 text-[1.7rem] leading-tight text-ink sm:text-[2.1rem]">
                        {p.name}
                      </h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                      <p className="mt-4 max-w-prose text-[1.02rem] leading-[1.75] text-ink/70">
                        {p.summary}
                      </p>
                    </Reveal>
                    <Reveal delay={0.14}>
                      <ul className="mt-6 flex flex-wrap gap-x-2 gap-y-2">
                        {p.applications.slice(0, 4).map((a) => (
                          <li
                            key={a}
                            className="border border-line px-3 py-1.5 text-[0.82rem] text-ink/70"
                          >
                            {a}
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                    <Reveal delay={0.18}>
                      <div className="mt-8">
                        <Button to={`/products/${p.slug}`} variant="outline">
                          View {p.shortName}
                        </Button>
                      </div>
                    </Reveal>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <Reveal>
            <p className="mt-20 max-w-prose border-t border-line pt-6 text-[0.86rem] leading-relaxed text-ink/50">
              Dimensions, fabric weights and other values shown as “confirmed per specification” are
              set against your requirement at enquiry stage and agreed with the manufacturing partner
              before production.
            </p>
          </Reveal>
        </Container>
      </section>

      <CtaBand
        title="Have a specification ready?"
        body="Send the product, construction, quantity and destination. We will identify a suitable manufacturing partner and return a quotation."
      />
    </>
  )
}
