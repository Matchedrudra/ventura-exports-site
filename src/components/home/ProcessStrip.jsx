import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { RevealGroup } from '../ui/Reveal'
import { processSteps } from '../../data/process'

export function ProcessStrip() {
  return (
    <section className="border-b border-line bg-ivory-deep/40 py-20 lg:py-28">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            label="How we work"
            title="A sourcing process, kept deliberately plain."
          />
          <Link
            to="/sourcing"
            className="group inline-flex items-center gap-2 text-[0.82rem] font-medium uppercase tracking-widelabel text-ink/60 transition-colors hover:text-ink"
          >
            Full process
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <RevealGroup className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step) => (
            <RevealGroup.Item
              key={step.index}
              className="flex flex-col bg-ivory p-6 lg:p-7"
            >
              <span className="font-serif text-sm text-gold">{step.index}</span>
              <span className="mt-3 text-[1.05rem] font-medium tracking-[-0.01em] text-ink">
                {step.title}
              </span>
              <span className="mt-3 text-[0.88rem] leading-relaxed text-ink/60">{step.summary}</span>
            </RevealGroup.Item>
          ))}
        </RevealGroup>
      </Container>
    </section>
  )
}
