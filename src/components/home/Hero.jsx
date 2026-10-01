import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { site } from '../../data/site'
import { cn } from '../../lib/cn'

const FIBC_QUOTE_HREF = `/request-a-quote?product=${encodeURIComponent('FIBC / Jumbo Bags')}`

// FIBC is the primary product, so it carries the hero visual — real FIBC
// photography plus the construction-types reference fill most of the grid;
// one tile keeps a supporting packaging category in view.
const HERO_TILES = [
  {
    src: '/images/ventura_fibc_bulk_bags.jpg',
    alt: 'FIBC / jumbo bags stacked on pallets in a warehouse',
    className: 'col-span-2 row-span-2',
    position: '50% 45%',
  },
  {
    src: '/images/product-fibc.jpg',
    alt: 'An FIBC jumbo bag being loaded and lifted at a packing facility',
    className: 'col-span-2',
    position: '70% 45%',
  },
  {
    src: '/images/ventura_fibc_types.jpg',
    alt: 'FIBC construction types — standard, circular, tunnel-lift, baffle, U-panel, full-loop, conductive and dissipative',
    className: 'bg-paper',
    fit: 'contain',
  },
  {
    src: '/images/ventura_bopp_bluefert.jpg',
    alt: 'A BOPP-laminated woven sack with full-colour print',
    className: '',
    position: '50% 55%',
  },
]

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
            FIBC &amp; Jumbo Bags,
            <br className="hidden sm:inline" />
            <span className="sm:hidden"> </span>
            sourced from <span className="italic text-gold-deep">India</span>.
          </h1>

          <p
            className={cn('mt-7 max-w-md text-[1.05rem] leading-[1.75] text-ink/70', rise(2))}
            style={delay(2)}
          >
            Ventura connects international buyers with capable Indian manufacturing partners for FIBC
            and jumbo bags, with woven, laminated, paper and other industrial packaging available as
            complementary solutions.
          </p>

          <div
            className={cn('mt-9 flex flex-wrap items-center gap-x-3 gap-y-4', rise(3))}
            style={delay(3)}
          >
            <Button to="/products/fibc-jumbo-bags" variant="solid">
              Explore FIBC &amp; Jumbo Bags
            </Button>
            <Button to={FIBC_QUOTE_HREF} variant="link">
              Request an FIBC quote
            </Button>
          </div>
        </div>

        <div className="relative lg:col-span-5 xl:col-span-6">
          <div
            className={cn(
              'relative h-full min-h-[340px] overflow-hidden bg-ivory-deep sm:min-h-[440px] lg:min-h-[560px] xl:-mr-14',
              !reduced && 'animate-fade-up',
            )}
          >
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-1.5">
            {HERO_TILES.map((t, i) => (
              <img
                key={t.src}
                src={t.src}
                alt={t.alt}
                className={cn(
                  'h-full w-full',
                  t.fit === 'contain' ? 'object-contain p-3' : 'object-cover',
                  t.className,
                )}
                style={t.position ? { objectPosition: t.position } : undefined}
                {...(i === 0 ? { fetchpriority: 'high' } : {})}
                decoding="async"
              />
            ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
