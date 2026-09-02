import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { RevealGroup } from '../ui/Reveal'
import { regions } from '../../data/markets'

export function MarketsPreview() {
  return (
    <section className="border-y border-line bg-ivory-deep/40 py-20 lg:py-28">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading label="Markets" title="Supplying B2B buyers across five regions." />
          <Link
            to="/markets"
            className="group inline-flex items-center gap-2 text-[0.82rem] font-medium uppercase tracking-widelabel text-ink/60 transition-colors hover:text-ink"
          >
            Markets in detail
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <RevealGroup className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-6">
          {regions.map((region) => (
            <RevealGroup.Item key={region.name} className="border-t border-ink/15 pt-5">
              <h3 className="text-[1.05rem] font-medium text-ink">{region.name}</h3>
              <p className="mt-3 text-[0.88rem] leading-relaxed text-ink/60">{region.note}</p>
            </RevealGroup.Item>
          ))}
        </RevealGroup>
      </Container>
    </section>
  )
}
