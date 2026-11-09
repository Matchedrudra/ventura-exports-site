import { Seo } from '../components/ui/Seo'
import { PageHeader } from '../components/ui/PageHeader'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { ProductThumb } from '../components/ui/ProductThumb'
import { Figure } from '../components/ui/Figure'
import { Reveal, RevealGroup } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import { CtaBand } from '../components/ui/CtaBand'
import { QuoteForm } from '../components/quote/QuoteForm'
import { PrecisionComponents } from '../components/weaving/PrecisionComponents'
import { weavingProducts, weavingSteps, weavingEnquiryFields } from '../data/textiles'

const OTHER_SLUGS = ['skew-reeds', 'heald-frames', 'other-accessories']
const otherComponents = weavingProducts.filter((p) => OTHER_SLUGS.includes(p.slug))
import { CATEGORY_WEAVING } from '../lib/validation'
import { pageSeo } from '../data/seo'

const seo = pageSeo('/weaving-accessories')

export default function WeavingAccessories() {
  return (
    <>
      <Seo {...seo} />
      <PageHeader
        label="Textile accessories"
        title="Textile Accessories & Weaving Solutions."
        lead="Ventura Exports also offers sourcing of specialised textile machinery accessories and weaving components through its manufacturing and supplier network — so we can support textile manufacturers with more than raw materials."
        aside={
          <Button to="#requirements" variant="light">
            Send a product enquiry
          </Button>
        }
      />

      <Figure
        src="/images/textile/weaving-reed.jpg"
        alt="Close view of a weaving reed set in the beater of a loom, with warp threads passing through"
        ratio="21 / 8"
        priority
        className="[&>div]:!bg-ink"
        imgClassName="object-[50%_55%]"
      />

      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                label="Technical sourcing"
                title="Sourced to your machinery specification."
                lead="We coordinate sourcing based on the buyer’s technical requirements and machinery specifications. Product availability is subject to supplier availability and is confirmed individually for each enquiry."
              />
            </div>
            <div className="lg:col-span-7">
              <ol className="divide-y divide-line border-y border-line">
                {weavingSteps.map((s) => (
                  <li key={s.index}>
                    <Reveal>
                      <div className="grid gap-2 py-6 sm:grid-cols-[3rem_1fr] sm:gap-6">
                        <span className="font-serif text-[1.15rem] text-gold">{s.index}</span>
                        <div>
                          <h3 className="text-[1.1rem] font-medium tracking-[-0.01em] text-ink">{s.title}</h3>
                          <p className="mt-1.5 max-w-prose text-[0.95rem] leading-relaxed text-charcoal">{s.body}</p>
                        </div>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      <PrecisionComponents />

      <section id="products" className="scroll-mt-24 border-y border-line bg-ivory-deep/50 py-20 lg:py-28">
        <Container>
          <SectionHeading
            label="Also sourced"
            title="Other weaving components."
            lead="Alongside the SKEW range, Ventura sources further components through its supplier network, to your machine and drawing."
          />
          <RevealGroup className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {otherComponents.map((p, i) => (
              <RevealGroup.Item key={p.slug} id={p.slug} className="scroll-mt-28">
                <ProductThumb image={p.image} alt={p.imageAlt} label={p.name} ratio="4 / 3" />
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="font-serif text-[0.9rem] text-gold">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-serif text-[1.3rem] font-medium text-ink">{p.name}</h3>
                </div>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-charcoal">{p.body}</p>
              </RevealGroup.Item>
            ))}
          </RevealGroup>
          <p className="mt-10 max-w-prose border-t border-line pt-5 text-[0.82rem] leading-relaxed text-charcoal/65">
            Photography of reeds and heald frames is illustrative of weaving components in general
            and does not represent a specific product. Dimensions, materials, compatibility and
            availability are confirmed individually against your machine and drawing.
          </p>
        </Container>
      </section>

      <section id="requirements" className="scroll-mt-24 bg-paper py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <SectionHeading
                  label="Product enquiry"
                  title="Tell Us What You Need."
                  lead="Send the part, your machine and any technical details. You can attach a technical drawing or specification document with your enquiry."
                />
                <ul className="mt-8 space-y-2.5 border-t border-line pt-5">
                  {weavingEnquiryFields.map((f) => (
                    <li key={f} className="flex gap-3 text-[0.9rem] text-charcoal">
                      <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-gold" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="lg:col-span-8">
              <QuoteForm
                lockedCategory={CATEGORY_WEAVING}
                submitLabel="Send product enquiry"
                source="website-weaving-accessories-form"
              />
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Need a component not listed?"
        body="Describe the part and the machine it is for, and attach a drawing if you have one — we will check what our supplier network can offer."
        primaryLabel="Send an Enquiry"
        secondaryLabel="Contact"
      />
    </>
  )
}
