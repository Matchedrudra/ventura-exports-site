import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { RevealGroup } from '../ui/Reveal'
import { processSteps } from '../../data/process'

export function ProcessStrip() {
  return (
    <section className="bg-ink py-20 text-ivory lg:py-28">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            tone="light"
            label="How we work"
            title="Understand. Source. Validate. Supply."
          />
          <Link
            to="/sourcing"
            className="group inline-flex items-center gap-2 text-[0.82rem] font-medium uppercase tracking-widelabel text-ivory/55 transition-colors hover:text-ivory"
          >
            Full process
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <RevealGroup className="mt-14 grid gap-px border border-white/12 bg-white/12 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step) => (
            <RevealGroup.Item
              key={step.index}
              className="flex flex-col bg-ink p-6 transition-colors duration-300 hover:bg-ink-soft lg:p-7"
            >
              <span className="font-serif text-sm text-gold-soft">{step.index}</span>
              <span className="mt-3 text-[1.05rem] font-medium tracking-[-0.01em] text-ivory">
                {step.title}
              </span>
              <span className="mt-3 text-[0.88rem] leading-relaxed text-ivory/55">{step.summary}</span>
            </RevealGroup.Item>
          ))}
        </RevealGroup>
      </Container>
    </section>
  )
}
