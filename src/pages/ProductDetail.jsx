import { useParams, Link, Navigate } from 'react-router-dom'
import { Seo } from '../components/ui/Seo'
import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import { Figure } from '../components/ui/Figure'
import { SpecTable } from '../components/products/SpecTable'
import { OptionGroups } from '../components/products/OptionGroup'
import { FibcTypeGrid } from '../components/products/FibcTypeCard'
import { CtaBand } from '../components/ui/CtaBand'
import { products, getProduct, fibcTypes, fibcOptions, catalogueYear } from '../data/products'

const QUOTE_PRODUCT = {
  'fibc-jumbo-bags': 'FIBC / Jumbo Bags',
  'pp-hdpe-woven-bags': 'PP & HDPE Woven Bags',
  'bopp-laminated-bags': 'BOPP Laminated Bags',
  'customized-woven-packaging': 'Customized Woven Packaging',
  'corrugated-boxes-cartons': 'Corrugated Boxes & Cartons',
  'industrial-filter-bags': 'Industrial Filter Bags',
  'industrial-commercial-packaging': 'Other Industrial Packaging',
}

// Retired slugs from the previous site structure.
const SLUG_ALIASES = {
  'pp-woven-bags': 'pp-hdpe-woven-bags',
  'hdpe-woven-bags': 'pp-hdpe-woven-bags',
}

export default function ProductDetail() {
  const { slug } = useParams()
  if (SLUG_ALIASES[slug]) return <Navigate to={`/products/${SLUG_ALIASES[slug]}`} replace />

  const product = getProduct(slug)
  if (!product) return <Navigate to="/products" replace />

  const idx = products.findIndex((p) => p.slug === slug)
  const prev = products[(idx - 1 + products.length) % products.length]
  const next = products[(idx + 1) % products.length]
  const quoteHref = `/request-a-quote?product=${encodeURIComponent(
    QUOTE_PRODUCT[slug] || 'Other Industrial Packaging',
  )}`
  const quoteLabel = product.quoteCta || 'Request specification & quote'

  return (
    <>
      <Seo
        path={`/products/${slug}`}
        title={product.name}
        description={product.summary}
        image={product.image}
      />

      {/* Header */}
      <header className="bg-ink text-ivory pt-12 pb-14 sm:pt-16 sm:pb-16">
        <Container>
          <nav className="text-[0.78rem] uppercase tracking-widelabel text-ivory/45" aria-label="Breadcrumb">
            <Link to="/products" className="transition-colors hover:text-ivory">
              Products
            </Link>
            <span className="mx-2 text-ivory/25">/</span>
            <span className="text-ivory/75">{product.shortName}</span>
          </nav>

          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-sm text-gold-soft">{product.index}</span>
                <span className="text-label font-semibold uppercase tracking-label text-ivory/45">
                  {product.kicker}
                </span>
              </div>
              <Reveal delay={0.04}>
                <h1 className="mt-4 text-[2.1rem] leading-[1.08] text-ivory sm:text-[2.8rem] lg:text-[3.1rem]">
                  {product.name}
                </h1>
              </Reveal>
            </div>
            <div className="lg:col-span-5 lg:pt-2">
              <Reveal delay={0.08}>
                <p className="text-[1.05rem] leading-[1.75] text-ivory/65">{product.tagline}</p>
              </Reveal>
            </div>
          </div>
        </Container>
      </header>

      {/* Intro + image */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <div className="max-w-prose space-y-5 text-[1.02rem] leading-[1.8] text-ink/75">
                {product.intro.map((p, i) => (
                  <Reveal key={i} delay={i * 0.05}>
                    <p>{p}</p>
                  </Reveal>
                ))}
              </div>
              {product.catalogueBacked && (
                <Reveal delay={0.16}>
                  <p className="mt-8 border-l-2 border-gold/50 pl-4 text-[0.86rem] leading-relaxed text-ink/55">
                    Construction types, safe working loads, safety factors and technical options on
                    this page follow the manufacturing partner’s reference product catalogue
                    ({catalogueYear}). Dimensions and any value shown as “confirmed per specification”
                    are set against your requirement.
                  </p>
                </Reveal>
              )}
            </div>
            <div className="lg:col-span-6">
              <Reveal>
                <Figure src={product.image} alt={product.imageAlt} ratio="4 / 3" priority />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Specification */}
      <section className="border-t border-line py-16 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <h2 className="text-[1.5rem] leading-tight text-ink sm:text-[1.8rem]">Specification</h2>
              <p className="mt-4 text-[0.92rem] leading-relaxed text-ink/55">
                A working summary. The full sheet is confirmed with the partner before production.
              </p>
            </div>
            <div className="lg:col-span-8">
              <SpecTable rows={product.specs} />
            </div>
          </div>
        </Container>
      </section>

      {/* FIBC construction types */}
      {product.hasTypes && (
        <section className="border-t border-line bg-ivory-deep/40 py-16 lg:py-24">
          <Container>
            <div className="max-w-2xl">
              <h2 className="text-[1.5rem] leading-tight text-ink sm:text-[1.9rem]">
                Construction types
              </h2>
              <p className="mt-4 text-[0.98rem] leading-relaxed text-ink/60">
                Eight FIBC constructions. All are rated 500–2000 kg SWL at a 5:1 or 6:1 safety
                factor; the construction is chosen for the product and the handling method, and the
                final specification is configured to your requirement.
              </p>
            </div>
            <div className="mt-12">
              <FibcTypeGrid types={fibcTypes} />
            </div>
          </Container>
        </section>
      )}

      {/* FIBC technical options */}
      {product.hasOptions && (
        <section className="border-t border-line py-16 lg:py-24">
          <Container>
            <div className="max-w-2xl">
              <h2 className="text-[1.5rem] leading-tight text-ink sm:text-[1.9rem]">
                Technical options
              </h2>
              <p className="mt-4 text-[0.98rem] leading-relaxed text-ink/60">
                Loop, filling, discharge, closure, liner, fabric and print options are combined into
                one build specification per order.
              </p>
            </div>
            <div className="mt-10">
              <OptionGroups groups={fibcOptions} />
            </div>
          </Container>
        </section>
      )}

      {/* Filter bag operating requirements */}
      {product.filterOperating && (
        <section className="border-t border-line bg-ivory-deep/40 py-16 lg:py-24">
          <Container>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <h2 className="text-[1.5rem] leading-tight text-ink sm:text-[1.9rem]">
                  Operating requirements
                </h2>
                <p className="mt-4 text-[0.92rem] leading-relaxed text-ink/55">
                  Filter bag specifications are developed around the operating conditions and
                  filtration requirements of the application.
                </p>
              </div>
              <div className="lg:col-span-8">
                <ul className="grid gap-x-8 gap-y-3 border-t border-line pt-6 sm:grid-cols-2">
                  {product.filterOperating.map((item) => (
                    <li key={item} className="flex gap-3 text-[0.95rem] text-ink/75">
                      <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Customized brief checklist */}
      {product.specBrief && (
        <section className="border-t border-line bg-ivory-deep/40 py-16 lg:py-24">
          <Container>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <h2 className="text-[1.5rem] leading-tight text-ink sm:text-[1.9rem]">
                  What to put in the brief
                </h2>
                <p className="mt-4 text-[0.92rem] leading-relaxed text-ink/55">
                  The more of this you can supply, the tighter the quotation and the first sample.
                </p>
              </div>
              <div className="lg:col-span-8">
                <ul className="grid gap-x-8 gap-y-3 border-t border-line pt-6 sm:grid-cols-2">
                  {product.specBrief.map((item) => (
                    <li key={item} className="flex gap-3 text-[0.95rem] text-ink/75">
                      <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Applications */}
      <section className="border-t border-line py-16 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <h2 className="text-[1.5rem] leading-tight text-ink sm:text-[1.9rem]">Applications</h2>
            </div>
            <div className="lg:col-span-8">
              <ul className="grid gap-x-8 gap-y-0 border-t border-line sm:grid-cols-2">
                {product.applications.map((a) => (
                  <li
                    key={a}
                    className="border-b border-line py-3.5 text-[0.98rem] text-ink/75"
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Quote CTA specific to product */}
      <section className="border-t border-line py-16 lg:py-20">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md font-serif text-[1.4rem] leading-snug text-ink">
              Tell us about your {product.shortName.toLowerCase()} requirement.
            </p>
            <Button to={quoteHref} variant="solid">
              {quoteLabel}
            </Button>
          </div>
        </Container>
      </section>

      {/* Prev / next */}
      <nav className="border-t border-line" aria-label="More products">
        <Container className="grid divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          <Link to={`/products/${prev.slug}`} className="group flex flex-col gap-1 py-8 pr-4">
            <span className="text-[0.72rem] uppercase tracking-widelabel text-ink/40">Previous</span>
            <span className="text-[1.05rem] text-ink transition-colors group-hover:text-gold">
              ← {prev.name}
            </span>
          </Link>
          <Link
            to={`/products/${next.slug}`}
            className="group flex flex-col gap-1 py-8 sm:items-end sm:pl-4"
          >
            <span className="text-[0.72rem] uppercase tracking-widelabel text-ink/40">Next</span>
            <span className="text-[1.05rem] text-ink transition-colors group-hover:text-gold">
              {next.name} →
            </span>
          </Link>
        </Container>
      </nav>

      <CtaBand />
    </>
  )
}
