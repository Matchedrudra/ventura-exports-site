import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { site } from '../../data/site'
import { cn } from '../../lib/cn'

export function Hero() {
  const reduced = usePrefersReducedMotion()
  const rise = () => (reduced ? '' : 'animate-fade-up')
  const delay = (i) => (reduced ? undefined : { animationDelay: `${i * 90}ms` })

  return (
    <section className="relative overflow-hidden border-b border-line">
      <Container className="grid items-stretch gap-y-10 lg:grid-cols-12 lg:gap-x-12">
        <div className="flex flex-col justify-center py-16 sm:py-20 lg:col-span-7 lg:py-28 lg:pr-6 xl:col-span-6">
          <p
            className={cn('text-label font-semibold uppercase tracking-widelabel text-gold', rise(0))}
            style={delay(0)}
          >
            {site.label}
          </p>

          <h1
            className={cn(
              'mt-7 font-serif text-[2.4rem] font-normal leading-[1.08] tracking-[-0.015em] text-ink text-balance sm:text-[2.9rem] lg:text-[3.15rem] xl:text-[3.6rem]',
              rise(1),
            )}
            style={delay(1)}
          >
            Industrial packaging &amp; filtration,
            <br className="hidden sm:inline" />
            <span className="sm:hidden"> </span>
            sourced from <span className="italic text-gold-deep">India</span>.
          </h1>

          <p
            className={cn('mt-7 max-w-md text-[1.05rem] leading-[1.75] text-ink/70', rise(2))}
            style={delay(2)}
          >
            Ventura connects international buyers with capable Indian manufacturing partners across
            industrial packaging and filtration — from FIBC and woven bags to corrugated cartons and
            industrial filter bags.
          </p>

          <div
            className={cn('mt-9 flex flex-wrap items-center gap-x-3 gap-y-4', rise(3))}
            style={delay(3)}
          >
            <Button to="/products" variant="solid">
              Explore products
            </Button>
            <Button to="/request-a-quote" variant="link">
              Request a quote
            </Button>
          </div>
        </div>

        <div className="relative lg:col-span-5 xl:col-span-6">
          <div
            className={cn(
              'relative h-full min-h-[320px] overflow-hidden bg-ivory-deep sm:min-h-[420px] lg:min-h-[560px] xl:-mr-14',
              !reduced && 'animate-fade-up',
            )}
          >
            <img
              src="/images/hero-fibc-warehouse.jpg"
              alt="Dock workers loading woven-packed bales into a shipping container at a port"
              className="absolute inset-0 h-full w-full object-cover"
              fetchpriority="high"
              decoding="async"
              width="2000"
              height="1333"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/15 to-transparent" />
          </div>
        </div>
      </Container>
    </section>
  )
}
