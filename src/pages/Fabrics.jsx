import { Seo } from '../components/ui/Seo'
import { PageHeader } from '../components/ui/PageHeader'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Figure } from '../components/ui/Figure'
import { Reveal, RevealGroup } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import { CtaBand } from '../components/ui/CtaBand'
import { QuoteForm } from '../components/quote/QuoteForm'
import { fabricCategories, fabricSpecTerms } from '../data/textiles'
import { CATEGORY_FABRICS } from '../lib/validation'
import { pageSeo } from '../data/seo'

const seo = pageSeo('/fabrics')

export default function Fabrics() {
  return (
    <>
      <Seo {...seo} />
      <PageHeader
        label="Fabrics"
        title="Fabrics — Sourced for Diverse Applications."
        lead="Alongside yarns, Ventura Exports offers sourcing solutions for a range of textile fabrics through its Indian manufacturing network."
        aside={
          <Button to="#requirements" variant="light">
            Send a fabric enquiry
          </Button>
        }
      />

      <Figure
        src="/images/textile/fabric-rolls-factory.jpg"
        alt="Rolls of finished fabric stored on racks in a textile factory"
        ratio="21 / 8"
        priority
        className="[&>div]:!bg-ink"
        imgClassName="object-[50%_55%]"
      />

      <section className="py-16 lg:py-24">
        <Container>
          <SectionHeading label="Fabric categories" title="Six starting points for a fabric requirement." />
          <RevealGroup className="mt-12 grid gap-x-14 md:grid-cols-2">
            {fabricCategories.map((f, i) => (
              <RevealGroup.Item key={f.slug} className="border-t border-ink/15 py-6">
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-[1.05rem] text-gold">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="text-[1.05rem] font-medium tracking-[-0.005em] text-ink">{f.name}</h3>
                </div>
                <p className="mt-2 pl-9 text-[0.92rem] leading-[1.7] text-charcoal/80">{f.note}</p>
              </RevealGroup.Item>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <section className="border-y border-line bg-ivory-deep/50 py-16 lg:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <SectionHeading
                label="Specifying a fabric"
                title="Tell us the weight, width and construction."
                lead="Specifications and availability are confirmed individually for each enquiry — nothing here is a statement of stock."
              />
              <dl className="mt-10 divide-y divide-line border-y border-line">
                {fabricSpecTerms.map((t) => (
                  <div key={t.term} className="grid gap-1 py-4 sm:grid-cols-[7rem_1fr] sm:gap-6">
                    <dt className="text-[0.82rem] font-semibold uppercase tracking-label text-ink">{t.term}</dt>
                    <dd className="text-[0.93rem] leading-relaxed text-charcoal">{t.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="grid grid-cols-12 gap-4 lg:col-span-6">
              <Reveal className="col-span-7">
                <Figure
                  src="/images/textile/warp-threads-loom.jpg"
                  alt="Warp threads aligned on a loom ahead of weaving"
                  ratio="4 / 5"
                />
              </Reveal>
              <Reveal delay={0.1} className="col-span-5 self-end">
                <Figure
                  src="/images/textile/fabric-rolls-shelf.jpg"
                  alt="Rolls of white and green fabric on a storage shelf"
                  ratio="3 / 4"
                />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section id="requirements" className="scroll-mt-24 bg-paper py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <SectionHeading
                  label="Fabric enquiry"
                  title="Tell Us Your Fabric Requirements."
                  lead="Share the fabric type, composition, GSM, width, construction, colour and finish — and anything you would like advice on."
                />
              </div>
            </div>
            <div className="lg:col-span-8">
              <QuoteForm lockedCategory={CATEGORY_FABRICS} submitLabel="Send fabric enquiry" source="website-fabrics-form" />
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Looking for a fabric not listed here?"
        body="Send the specification or a sample reference — we will check what can be sourced through our manufacturing network."
        primaryLabel="Send an Enquiry"
        secondaryLabel="Contact"
      />
    </>
  )
}
