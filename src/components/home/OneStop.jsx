import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal, RevealGroup } from '../ui/Reveal'
import { products } from '../../data/products'

const tiles = products
  .filter((p) => p.slug !== 'industrial-commercial-packaging')
  .map((p) => ({ slug: p.slug, name: p.shortName, image: p.image, alt: p.imageAlt }))

export function OneStop() {
  return (
    <section className="border-b border-line bg-ivory-deep/40 py-20 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              label="One-stop supply"
              title="One source. Multiple packaging solutions."
              lead="Tell us what you need. Ventura coordinates suitable sourcing options from India around your product specifications, quantities and shipment requirements — so international buyers can work with one relationship rather than a separate supplier for every format."
            />
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-md text-[0.92rem] leading-relaxed text-ink/55">
                Where product compatibility, quantities and logistics allow, multiple packaging
                requirements can be coordinated into a consolidated supply plan.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-8">
                <Link
                  to="/request-a-quote"
                  className="group inline-flex items-center gap-2 text-[0.82rem] font-medium uppercase tracking-widelabel text-ink transition-colors hover:text-gold"
                >
                  Tell us what you need
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 ease-editorial group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <RevealGroup className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3">
              {tiles.map((t) => (
                <RevealGroup.Item key={t.slug} className="bg-ivory">
                  <Link to={`/products/${t.slug}`} className="group block">
                    <div className="relative aspect-[5/4] overflow-hidden bg-ivory-deep">
                      <img
                        src={t.image}
                        alt={t.alt}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover opacity-90 transition duration-500 ease-editorial group-hover:scale-[1.04] group-hover:opacity-100"
                      />
                    </div>
                    <p className="px-3 py-3 text-[0.8rem] font-medium tracking-[-0.01em] text-ink">
                      {t.name}
                    </p>
                  </Link>
                </RevealGroup.Item>
              ))}
            </RevealGroup>
            <Reveal>
              <p className="mt-4 flex items-center gap-3 text-[0.82rem] uppercase tracking-widelabel text-ink/45">
                <span className="h-px flex-1 bg-line" />
                One coordinated supply
                <span className="h-px flex-1 bg-line" />
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
