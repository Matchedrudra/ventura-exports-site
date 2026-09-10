import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { useScrollProgress, slice } from '../../hooks/useScrollProgress'
import { processSteps } from '../../data/process'
import { cn } from '../../lib/cn'

/*
 * "From specification to supply" — a connected four-stage journey.
 * A progress line draws forward as the section scrolls; the current stage
 * lifts into focus. Transform/opacity only, reduced-motion safe.
 */
export function FromSpecToSupply() {
  const { ref, progress, reduced } = useScrollProgress({ start: 0.82, end: 0.3 })
  const n = processSteps.length
  const fill = reduced ? 1 : progress
  // which stage is "active" — biased so each holds focus for a stretch
  const active = reduced ? n - 1 : Math.min(n - 1, Math.floor(progress * (n - 0.001)))

  return (
    <section ref={ref} className="bg-ink text-ivory">
      <Container className="py-20 lg:py-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="text-label font-semibold uppercase tracking-label text-gold-soft">
              How we work
            </p>
            <h2 className="mt-5 text-[1.9rem] leading-[1.14] text-ivory sm:text-[2.35rem]">
              From specification to supply.
            </h2>
          </div>
          <Link
            to="/how-we-work"
            className="group inline-flex items-center gap-2 text-[0.82rem] font-medium uppercase tracking-widelabel text-ivory/55 transition-colors hover:text-ivory"
          >
            Full process
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* desktop: horizontal rail */}
        <div className="relative mt-20 hidden lg:block">
          <div className="absolute left-0 right-0 top-[7px] h-px bg-white/12" />
          <div
            className="absolute left-0 top-[7px] h-px bg-gold origin-left"
            style={{ transform: `scaleX(${fill})`, width: '100%', transition: 'transform 120ms linear' }}
          />
          <ol className="grid grid-cols-4 gap-8">
            {processSteps.map((step, i) => {
              const on = reduced || i <= active
              const isActive = !reduced && i === active
              return (
                <li key={step.index} className="relative pt-8">
                  <span
                    className={cn(
                      'absolute left-0 top-0 h-3.5 w-3.5 -translate-y-[6px] rounded-full border transition-colors duration-500',
                      on ? 'border-gold bg-gold' : 'border-white/25 bg-ink',
                    )}
                  />
                  <span
                    className={cn(
                      'font-serif text-sm transition-colors duration-500',
                      on ? 'text-gold-soft' : 'text-ivory/30',
                    )}
                  >
                    {step.index}
                  </span>
                  <h3
                    className={cn(
                      'mt-2 text-[1.15rem] font-medium tracking-[-0.01em] transition-all duration-500',
                      isActive ? 'text-ivory' : on ? 'text-ivory/80' : 'text-ivory/35',
                    )}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={cn(
                      'mt-3 text-[0.9rem] leading-relaxed transition-opacity duration-500',
                      isActive ? 'text-ivory/70 opacity-100' : 'text-ivory/45 opacity-90',
                    )}
                  >
                    {step.summary}
                  </p>
                </li>
              )
            })}
          </ol>
        </div>

        {/* mobile: vertical rail */}
        <ol className="relative mt-14 space-y-9 lg:hidden">
          <div className="absolute bottom-2 left-[6px] top-2 w-px bg-white/12" />
          <div
            className="absolute left-[6px] top-2 w-px bg-gold origin-top"
            style={{ transform: `scaleY(${fill})`, height: 'calc(100% - 16px)' }}
          />
          {processSteps.map((step, i) => {
            const on = reduced || i <= active
            return (
              <li key={step.index} className="relative pl-8">
                <span
                  className={cn(
                    'absolute left-0 top-1 h-3 w-3 rounded-full border transition-colors duration-500',
                    on ? 'border-gold bg-gold' : 'border-white/25 bg-ink',
                  )}
                />
                <div className="flex items-baseline gap-3">
                  <span className={cn('font-serif text-sm', on ? 'text-gold-soft' : 'text-ivory/30')}>
                    {step.index}
                  </span>
                  <h3 className={cn('text-[1.1rem] font-medium', on ? 'text-ivory' : 'text-ivory/40')}>
                    {step.title}
                  </h3>
                </div>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-ivory/55">{step.summary}</p>
              </li>
            )
          })}
        </ol>
      </Container>
    </section>
  )
}
