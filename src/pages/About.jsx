import { Seo } from '../components/ui/Seo'
import { PageHeader } from '../components/ui/PageHeader'
import { Container } from '../components/ui/Container'
import { Figure } from '../components/ui/Figure'
import { Reveal } from '../components/ui/Reveal'
import { CtaBand } from '../components/ui/CtaBand'
import { site } from '../data/site'

const principles = [
  {
    index: '01',
    title: 'One specification',
    body: 'Every requirement is written down once and kept consistent from enquiry to dispatch, so buyer and partner work from the same sheet.',
  },
  {
    index: '02',
    title: 'Selected partners',
    body: 'Each enquiry is matched to the manufacturing partner whose range, capacity and commercial terms fit the order.',
  },
  {
    index: '03',
    title: 'Documented throughout',
    body: 'Specification, packing and export paperwork are recorded so the order is traceable from enquiry to shipment.',
  },
]

export default function About() {
  return (
    <>
      <Seo
        path="/about"
        title="About Us"
        description="Ventura Exports is an India-based export and sourcing company, headquartered in Gujarat, supplying yarns and fabrics to international buyers through reliable Indian manufacturing partners."
      />
      <PageHeader
        label="About us"
        title="Built Around Quality. Connected Through Global Trade."
        lead="Ventura Exports is an India-based export and sourcing company, headquartered in Gujarat, focused on supplying quality textile products to international markets."
      />

      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="max-w-prose space-y-6 text-[1.05rem] leading-[1.8] text-ink/75">
                <Reveal>
                  <p>
                    With a primary focus on yarns and fabrics, we work with manufacturing partners to
                    address diverse buyer requirements, from product specifications and yarn counts to
                    customised packaging and export coordination. For {site.experience}, that has meant
                    one point of contact for the buyer and a matched manufacturing partner for the order.
                  </p>
                </Reveal>
                <Reveal delay={0.05}>
                  <p>
                    Our approach is built around understanding customer requirements, dependable
                    supplier relationships and professional international trade practices.
                  </p>
                </Reveal>
                <Reveal delay={0.1}>
                  <p>
                    We source and coordinate supply through our Indian manufacturing partners, matching each
                    order to the partner best suited to it. Alongside textiles, we also source industrial packaging and agro
                    commodities on enquiry.
                  </p>
                </Reveal>
              </div>
            </div>
            <div className="lg:col-span-5">
              <Reveal>
                <Figure
                  src="/images/textile/spinning-hall-hero.jpg"
                  alt="A spinning hall in an Indian textile mill"
                  ratio="4 / 5"
                  imgClassName="object-[70%_50%]"
                />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-ivory-deep/50 py-16 lg:py-24">
        <Container>
          <p className="text-label font-semibold uppercase tracking-label text-gold">How we operate</p>
          <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-3">
            {principles.map((p) => (
              <Reveal key={p.index} className="flex flex-col bg-ivory p-7 lg:p-8">
                <span className="font-serif text-sm text-gold">{p.index}</span>
                <h3 className="mt-3 text-[1.1rem] font-medium text-ink">{p.title}</h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-ink/65">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  )
}
