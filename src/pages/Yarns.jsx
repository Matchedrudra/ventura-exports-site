import { Link } from 'react-router-dom'
import { Seo } from '../components/ui/Seo'
import { PageHeader } from '../components/ui/PageHeader'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Figure } from '../components/ui/Figure'
import { Reveal } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import { CtaBand } from '../components/ui/CtaBand'
import { QuoteForm } from '../components/quote/QuoteForm'
import { yarnCategories, yarnCountExamples, yarnCountExplainer, yarnSpecFields } from '../data/textiles'
import { CATEGORY_YARNS } from '../lib/validation'
import { cn } from '../lib/cn'
import { pageSeo } from '../data/seo'

const seo = pageSeo('/yarns')

export default function Yarns() {
  return (
    <>
      <Seo {...seo} />
      <PageHeader
        label="Yarns"
        title="Yarns — Sourced to Your Specifications."
        lead="We supply a range of textile yarns sourced from Indian manufacturing partners, catering to the requirements of textile mills, fabric manufacturers, knitting units and international distributors. From yarn counts and compositions to cone specifications and export packaging, we work towards meeting individual buyer requirements."
        aside={
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <Button to="#requirements" variant="light">
              Tell us your requirements
            </Button>
          </div>
        }
      />

      <div className="relative">
        <Figure
          src="/images/textile/spinning-line-india.jpg"
          alt="A spinning line in an Indian textile mill"
          ratio="21 / 8"
          priority
          className="[&>div]:!bg-ink"
          imgClassName="object-[50%_60%]"
        />
      </div>

      <section className="py-16 lg:py-24">
        <Container>
          <SectionHeading label="Product categories" title="Four ways to specify a yarn." />
          <div className="mt-14 space-y-16 lg:space-y-24">
            {yarnCategories.map((c, i) => (
              <article key={c.slug} id={c.slug} className="scroll-mt-28">
                <div
                  className={cn(
                    'grid items-start gap-10 lg:grid-cols-12 lg:gap-16',
                    i % 2 === 1 && 'lg:[&>*:first-child]:order-2',
                  )}
                >
                  <div className="lg:col-span-5">
                    <Reveal>
                      <Figure src={c.image} alt={c.imageAlt} ratio="4 / 3" />
                    </Reveal>
                  </div>
                  <div className="lg:col-span-7">
                    <Reveal>
                      <p className="font-serif text-sm text-gold">{c.index}</p>
                      <h3 className="mt-2 font-serif text-[1.65rem] font-medium leading-tight text-ink sm:text-[1.95rem]">
                        {c.name}
                      </h3>
                    </Reveal>
                    <Reveal delay={0.06}>
                      <p className="mt-4 max-w-prose text-[1.02rem] leading-[1.75] text-charcoal">{c.summary}</p>
                    </Reveal>
                    <Reveal delay={0.1}>
                      <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
                        {c.variants.map((v) => (
                          <li key={v} className="border-t border-line py-2.5 text-[0.95rem] leading-snug text-charcoal">
                            {v}
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                    <Reveal delay={0.14}>
                      <p className="mt-5 max-w-prose text-[0.9rem] leading-relaxed text-charcoal/75">{c.note}</p>
                      <div className="mt-6">
                        <Link
                          to={`/request-a-quote?category=Yarns`}
                          className="u-underline inline-flex items-center gap-2 text-[0.82rem] font-medium uppercase tracking-widelabel text-ink transition-colors hover:text-gold"
                        >
                          Enquire about {c.name.toLowerCase()} <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </Reveal>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="counts" className="scroll-mt-24 border-y border-line bg-ivory-deep/50 py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                label="Yarn counts"
                title="Count, ply and composition — specified by you."
                lead="Buyers can enquire about different counts and specifications. The counts below are examples of how a requirement can be written, not a guarantee of available inventory."
              />
              <dl className="mt-10 space-y-5">
                {yarnCountExplainer.map((e) => (
                  <div key={e.term} className="border-t border-line pt-4">
                    <dt className="text-[0.82rem] font-semibold uppercase tracking-label text-ink">{e.term}</dt>
                    <dd className="mt-1.5 text-[0.93rem] leading-relaxed text-charcoal">{e.body}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="lg:col-span-7">
              <Reveal>
                <div className="border border-line bg-paper">
                  <table className="w-full text-left">
                    <caption className="border-b border-line px-5 py-3 text-left text-[0.72rem] font-semibold uppercase tracking-label text-charcoal/75">
                      Examples of count notation
                    </caption>
                    <thead className="sr-only">
                      <tr>
                        <th>Count</th>
                        <th>Ply</th>
                        <th>Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      {yarnCountExamples.map((e) => (
                        <tr key={e.count} className="border-b border-line last:border-b-0">
                          <td className="whitespace-nowrap px-5 py-4 font-serif text-[1.3rem] text-ink">{e.count}</td>
                          <td className="px-3 py-4 text-[0.78rem] uppercase tracking-label text-gold-deep">{e.ply}</td>
                          <td className="hidden px-5 py-4 text-[0.9rem] leading-snug text-charcoal/75 sm:table-cell">{e.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Reveal>
              <p className="mt-4 text-[0.84rem] leading-relaxed text-ink/50">
                Availability of any count, composition or spinning system is confirmed individually
                with the manufacturing partner for each enquiry.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <Reveal>
                <Figure
                  src="/images/textile/cones-palletising.jpg"
                  alt="Workers stacking wound yarn cones onto a pallet in a warehouse"
                  ratio="3 / 2"
                />
              </Reveal>
            </div>
            <div className="lg:col-span-6">
              <SectionHeading
                label="Cones & export packaging"
                title="Cone configuration and carton packing, to your instruction."
                lead="Specify cone size and weight, winding format, cones per carton, labelling and palletisation. We coordinate the arrangement with the manufacturing partner."
              />
              <div className="mt-8">
                <Button to="/quality-packaging#packaging" variant="outline">
                  Cone &amp; packaging options
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="requirements" className="scroll-mt-24 border-t border-line bg-paper py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <SectionHeading
                  label="Yarn enquiry"
                  title="Tell Us Your Yarn Requirements."
                  lead="Give us what you know — leave anything open that you would like advice on. We confirm specifications and availability individually."
                />
                <ul className="mt-8 space-y-2.5 border-t border-line pt-5">
                  {yarnSpecFields.map((f) => (
                    <li key={f} className="flex gap-3 text-[0.9rem] text-charcoal">
                      <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-gold" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="lg:col-span-8">
              <QuoteForm lockedCategory={CATEGORY_YARNS} submitLabel="Send yarn enquiry" source="website-yarns-form" />
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Not sure which yarn fits?"
        body="Describe the fabric or end product and the machines you run — we will help narrow the count, composition and spinning system."
        primaryLabel="Send an Enquiry"
        secondaryLabel="Contact"
      />
    </>
  )
}
