import { Seo } from '../components/ui/Seo'
import { PageHeader } from '../components/ui/PageHeader'
import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'
import { CtaBand } from '../components/ui/CtaBand'
import { regions, marketsIntro } from '../data/markets'

export default function Markets() {
  return (
    <>
      <Seo
        path="/markets"
        title="Markets"
        description="Ventura supports international buyers sourcing industrial packaging and filtration from India. Europe, the Middle East, North America, Africa and Asia & Oceania are among the key market regions."
      />
      <PageHeader label="Markets" title="Indian supply, coordinated to the destination." lead={marketsIntro} />

      <section className="py-16 lg:py-24">
        <Container>
          <ol className="border-t border-line">
            {regions.map((region, i) => (
              <li key={region.name}>
                <Reveal>
                  <div className="grid gap-4 border-b border-line py-10 lg:grid-cols-12 lg:gap-8">
                    <div className="lg:col-span-1">
                      <span className="font-serif text-sm text-gold">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="lg:col-span-4">
                      <h2 className="text-[1.4rem] font-medium tracking-[-0.01em] text-ink">
                        {region.name}
                      </h2>
                    </div>
                    <div className="lg:col-span-7">
                      <p className="text-[1.02rem] leading-[1.7] text-ink/75">{region.note}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal>
            <p className="mt-14 max-w-prose text-[0.9rem] leading-relaxed text-ink/55">
              These are key market regions; supply is evaluated according to product requirements,
              destination and order specifications.
            </p>
          </Reveal>
        </Container>
      </section>

      <CtaBand
        title="Sourcing for a specific market?"
        body="Tell us the destination port and any local documentation or marking requirements, and we will factor them into the quotation."
      />
    </>
  )
}
