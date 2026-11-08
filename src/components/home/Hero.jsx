import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { site } from '../../data/site'
import { cn } from '../../lib/cn'

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
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[68%_52%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/5 lg:via-ink/40 lg:to-transparent"
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-ink/55 to-transparent" />

      <Container className="flex min-h-[480px] items-center py-16 sm:min-h-[520px] lg:min-h-[560px] lg:py-20">
        <div className="max-w-[34rem]">
          <p
            className={cn(
              'flex items-center gap-3 text-[0.66rem] font-semibold uppercase leading-none tracking-[0.22em] text-gold-soft',
              rise(0).className,
            )}
            style={rise(0).style}
          >
            <span aria-hidden="true" className="h-px w-8 bg-gold-soft/80" />
            {site.tagline.replace(/\.$/, '')}
          </p>
          <h1
            className={cn(
              'mt-6 font-serif text-[2.15rem] font-medium leading-[1.08] tracking-[-0.01em] text-ivory sm:text-[2.7rem] lg:text-[3.15rem]',
              rise(1).className,
            )}
            style={rise(1).style}
          >
            Textile Excellence.
            <br />
            <span className="italic text-gold-soft">Crafted for Global Markets.</span>
          </h1>
          <p
            className={cn('mt-6 max-w-[30rem] text-[0.98rem] leading-[1.8] text-ivory/80', rise(2).className)}
            style={rise(2).style}
          >
            From premium yarns and fabrics to specialised weaving components, Ventura Exports
            delivers comprehensive textile sourcing and supply solutions to international markets.
          </p>
          <div
            className={cn('mt-8 flex flex-wrap items-center gap-3', rise(3).className)}
            style={rise(3).style}
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
