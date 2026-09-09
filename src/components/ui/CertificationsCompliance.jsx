import { Container } from './Container'
import { Reveal, RevealGroup } from './Reveal'
import { complianceIntro, complianceLine, complianceCards } from '../../data/certifications'

/** Certifications & Compliance — product / supplier / market dependent. No owned-certification claims. */
export function CertificationsCompliance({ tone = 'ink' }) {
  const light = tone === 'light'
  return (
    <section className={light ? 'bg-ink text-ivory' : 'border-y border-line bg-ivory-deep/40'}>
      <Container className="py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <p
                className={`text-label font-semibold uppercase tracking-label ${
                  light ? 'text-gold-soft' : 'text-gold'
                }`}
              >
                Certifications & compliance
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className={`mt-5 text-[1.6rem] leading-[1.2] sm:text-[2rem] ${
                  light ? 'text-ivory' : 'text-ink'
                }`}
              >
                {complianceLine}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p
                className={`mt-5 max-w-sm text-[0.98rem] leading-[1.7] ${
                  light ? 'text-ivory/60' : 'text-ink/65'
                }`}
              >
                {complianceIntro}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <RevealGroup className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {complianceCards.map((c) => (
                <RevealGroup.Item key={c.title} className="flex flex-col bg-ivory p-6">
                  <span className="text-[0.68rem] font-semibold uppercase tracking-label text-ink/45">
                    {c.kicker}
                  </span>
                  <span className="mt-2 text-[1rem] font-medium tracking-[-0.01em] text-ink">
                    {c.title}
                  </span>
                  <span className="mt-2.5 text-[0.85rem] leading-relaxed text-ink/60">{c.body}</span>
                </RevealGroup.Item>
              ))}
            </RevealGroup>
            <Reveal>
              <p
                className={`mt-6 text-[0.82rem] leading-relaxed ${
                  light ? 'text-ivory/45' : 'text-ink/50'
                }`}
              >
                Certification and compliance documentation is coordinated according to product,
                application and destination-market requirements. Ventura does not hold these
                certifications itself.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
