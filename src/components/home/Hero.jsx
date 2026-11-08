import { useRef } from 'react'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useParallax } from '../../hooks/useParallax'
import { site } from '../../data/site'
import { cn } from '../../lib/cn'

/** Words rise out of a mask, one after another. Screen readers get the full line via aria-label on the h1. */
function Words({ text, start, step = 0.08, reduced, className }) {
  return text.split(' ').map((w, i) => (
    <span key={`${w}-${i}`} aria-hidden="true" className="inline-block overflow-hidden pb-[0.14em] align-bottom">
      <span
        className={cn('inline-block', !reduced && 'animate-word-rise', className)}
        style={reduced ? undefined : { animationDelay: `${(start + i * step).toFixed(2)}s` }}
      >
        {w}
        {' '}
      </span>
    </span>
  ))
}

export function Hero() {
  const reduced = usePrefersReducedMotion()
  const imgRef = useRef(null)
  useParallax(imgRef, 0.12)

  const rise = (delay) => ({
    className: reduced ? '' : 'animate-fade-up',
    style: reduced ? undefined : { animationDelay: `${delay}s` },
  })

  return (
    <section className="relative isolate overflow-hidden bg-ink text-ivory">
      <div className={cn('absolute inset-0 -z-20', !reduced && 'animate-hero-reveal')}>
        <img
          ref={imgRef}
          src="/images/textile/spinning-hall-hero.jpg"
          alt="A spinning hall in an Indian textile mill, with rows of white yarn packages along the ring frames"
          width="2000"
          height="1333"
          fetchpriority="high"
          decoding="async"
          className="absolute -top-[10%] left-0 h-[120%] w-full object-cover object-[68%_52%] will-change-transform"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/5 lg:via-ink/40 lg:to-transparent"
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-ink/55 to-transparent" />

      <Container className="flex min-h-[540px] items-center py-24 sm:min-h-[600px] lg:min-h-[min(680px,calc(100svh-74px))] lg:py-28">
        <div className="max-w-[36rem]">
          <p
            className={cn(
              'flex items-center gap-3 text-[0.66rem] font-semibold uppercase leading-none tracking-[0.22em] text-gold-soft',
              rise(0.3).className,
            )}
            style={rise(0.3).style}
          >
            <span aria-hidden="true" className="h-px w-8 bg-gold-soft/80" />
            {site.tagline.replace(/\.$/, '')}
          </p>

          <h1
            aria-label="Textile Excellence. Crafted for Global Markets."
            className="mt-7 font-serif text-[2.15rem] font-medium leading-[1.1] tracking-[-0.01em] text-ivory sm:text-[2.7rem] lg:text-[3.15rem]"
          >
            <Words text="Textile Excellence." start={0.45} reduced={reduced} />
            <br />
            <Words text="Crafted for Global Markets." start={0.8} reduced={reduced} className="italic text-gold-soft" />
          </h1>

          <p
            className={cn('mt-7 max-w-[30rem] text-[0.98rem] leading-[1.85] text-ivory/80', rise(1.45).className)}
            style={rise(1.45).style}
          >
            Discover quality yarns, fabrics and specialised weaving solutions from Ventura Exports.
            Connecting textile requirements with dependable manufacturing and supply capabilities.
          </p>

          <div
            className={cn('mt-9 flex flex-wrap items-center gap-3', rise(1.7).className)}
            style={rise(1.7).style}
          >
            <Button to="/yarns" variant="light">
              Explore Our Products
            </Button>
            <Button to="/request-a-quote" variant="outlineLight">
              Discuss Your Requirements
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
