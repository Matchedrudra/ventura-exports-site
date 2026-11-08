import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { site } from '../../data/site'
import { cn } from '../../lib/cn'

const DIVISIONS = [
  { index: '01', name: 'Yarns', to: '/yarns', major: true },
  { index: '02', name: 'Fabrics', to: '/fabrics', major: true },
  { index: '03', name: 'Weaving Accessories', to: '/weaving-accessories', major: false },
  { index: '04', name: 'Industrial Packaging', to: '/other-products', major: false },
  { index: '05', name: 'Agro Commodities', to: '/other-products#agro', major: false },
]

export function Hero() {
  const reduced = usePrefersReducedMotion()
  const rise = (i) => ({
    className: reduced ? '' : 'animate-fade-up',
    style: reduced ? undefined : { animationDelay: `${i * 90}ms` },
  })

  return (
    <section className="relative isolate overflow-hidden bg-ink text-ivory">
      <img
        src="/images/textile/spinning-hall-hero.jpg"
        alt="A spinning hall in an Indian textile mill, with rows of white yarn packages along the ring frames"
        width="2000"
        height="1333"
        fetchpriority="high"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[62%_50%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/95 via-ink/70 to-ink/20 lg:via-ink/55 lg:to-transparent"
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-2/5 bg-gradient-to-t from-ink/85 to-transparent" />

      <Container className="flex min-h-[560px] flex-col justify-end pt-24 sm:min-h-[640px] lg:min-h-[min(760px,calc(100svh-108px))]">
        <div className="max-w-[44rem] pb-14 lg:pb-20">
          <p
            className={cn('text-label font-semibold uppercase tracking-widelabel text-gold-soft', rise(0).className)}
            style={rise(0).style}
          >
            {site.label}
          </p>
          <h1
            className={cn(
              'mt-6 font-serif text-[2.35rem] font-normal leading-[1.06] tracking-[-0.02em] text-ivory text-balance sm:text-[3.1rem] lg:text-[3.9rem]',
              rise(1).className,
            )}
            style={rise(1).style}
          >
            Connecting Indian Textile Excellence With{' '}
            <span className="italic text-gold-soft">Global Markets.</span>
          </h1>
          <p
            className={cn('mt-6 max-w-xl text-[1.05rem] leading-[1.75] text-ivory/80', rise(2).className)}
            style={rise(2).style}
          >
            Your sourcing partner for quality yarns, fabrics and textile solutions. We connect
            international buyers with reliable Indian manufacturing partners through dependable
            sourcing, customised specifications and export coordination.
          </p>
          <div
            className={cn('mt-9 flex flex-wrap items-center gap-3', rise(3).className)}
            style={rise(3).style}
          >
            <Button to="/yarns" variant="light">
              Explore Our Products
            </Button>
            <Button to="/request-a-quote" variant="outlineLight">
              Send an Enquiry
            </Button>
          </div>
        </div>

        <nav aria-label="Product divisions" className="border-t border-white/15">
          <ul className="grid grid-cols-2 lg:grid-cols-5">
            {DIVISIONS.map((d) => (
              <li key={d.to} className="border-b border-white/10 last:border-b-0 lg:border-b-0 lg:border-r lg:border-white/10 lg:last:border-r-0">
                <Link
                  to={d.to}
                  className="group flex items-baseline gap-3 px-1 py-4 transition-colors sm:py-5 lg:px-5 lg:first:pl-0"
                >
                  <span className="font-serif text-[0.8rem] text-gold-soft">{d.index}</span>
                  <span
                    className={cn(
                      'transition-colors group-hover:text-gold-soft',
                      d.major
                        ? 'text-[1rem] font-medium text-ivory sm:text-[1.1rem]'
                        : 'text-[0.85rem] text-ivory/60 sm:text-[0.92rem]',
                    )}
                  >
                    {d.name}
                  </span>
                  <span aria-hidden="true" className="ml-auto text-ivory/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-gold-soft">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  )
}
