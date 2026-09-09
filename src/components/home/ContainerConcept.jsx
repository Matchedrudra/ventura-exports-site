import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { cn } from '../../lib/cn'

/*
 * "Ventura Packaging Load Plan" — an empty container that loads itself
 * once, in one staggered sequence, when the section enters view. The six
 * packaging modules settle into an organised load and stay clickable,
 * each linking to its product page. Transform/opacity only; the loaded
 * state is the resting state, so reduced-motion simply shows it filled.
 */

const MODULES = [
  { key: 'fibc', l1: 'FIBC /', l2: 'Jumbo Bags', to: '/products/fibc-jumbo-bags', size: 'lg' },
  { key: 'woven', l1: 'PP & HDPE', l2: 'Woven', to: '/products/pp-hdpe-woven-bags', size: 'md' },
  { key: 'corrugated', l1: 'Corrugated', l2: 'Boxes', to: '/products/corrugated-boxes-cartons', size: 'md' },
  { key: 'bopp', l1: 'BOPP', l2: 'Bags', to: '/products/bopp-laminated-bags', size: 'md' },
  { key: 'filter', l1: 'Filter', l2: 'Bags', to: '/products/industrial-filter-bags', size: 'md' },
  { key: 'custom', l1: 'Custom', l2: 'Packaging', to: '/products/customized-woven-packaging', size: 'sm' },
]

function Silhouette({ kind, className }) {
  const s = {
    fill: 'currentColor',
    fillOpacity: 0.14,
    stroke: 'currentColor',
    strokeOpacity: 0.55,
    strokeWidth: 1.4,
    strokeLinejoin: 'round',
  }
  const paths = {
    fibc: (
      <g {...s}>
        <path d="M10 18 h44 v50 q0 4 -4 4 h-36 q-4 0 -4 -4 z" />
        <path d="M26 18 v-9 q0 -3 3 -3 M38 18 v-9 q0 -3 3 -3" fill="none" />
        <rect x="27" y="6" width="10" height="9" />
      </g>
    ),
    woven: (
      <g {...s}>
        <path d="M20 12 q-4 4 -6 13 l-4 38 q-1 6 5 6 h30 q6 0 5 -6 l-4 -38 q-2 -9 -6 -13 z" />
        <path d="M20 12 q9 -5 20 0" fill="none" />
      </g>
    ),
    bopp: (
      <g {...s}>
        <path d="M20 12 q-4 4 -6 13 l-4 38 q-1 6 5 6 h30 q6 0 5 -6 l-4 -38 q-2 -9 -6 -13 z" />
        <rect x="17" y="24" width="26" height="27" fillOpacity="0.24" />
      </g>
    ),
    corrugated: (
      <g {...s}>
        <path d="M8 24 h44 v44 h-44 z" />
        <path d="M8 24 l22 -11 l22 11 M30 13 v55" fill="none" />
      </g>
    ),
    filter: (
      <g {...s}>
        <rect x="21" y="10" width="18" height="6" />
        <path d="M19 16 h22 v54 q0 4 -4 4 h-14 q-4 0 -4 -4 z" />
        <path d="M19 28 h22 M19 42 h22 M19 56 h22" fill="none" strokeOpacity="0.3" />
      </g>
    ),
    custom: (
      <g {...s}>
        <path d="M18 13 q-3 3 -5 11 l-4 40 q-1 6 5 6 h30 q6 0 5 -6 l-4 -40 q-2 -8 -5 -11 z" strokeDasharray="3 3" />
      </g>
    ),
  }
  return (
    <svg viewBox="0 0 60 76" className={className} aria-hidden="true">
      {paths[kind]}
    </svg>
  )
}

export function ContainerConcept() {
  const reduced = usePrefersReducedMotion()
  const ref = useRef(null)
  const [loaded, setLoaded] = useState(reduced)

  useEffect(() => {
    if (reduced || typeof IntersectionObserver === 'undefined') {
      setLoaded(true)
      return
    }
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoaded(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -22% 0px', threshold: 0.15 },
    )
    io.observe(el)
    const t = setTimeout(() => setLoaded(true), 2200)
    return () => {
      io.disconnect()
      clearTimeout(t)
    }
  }, [reduced])

  return (
    <section className="bg-ink text-ivory">
      <Container className="py-20 lg:py-28">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12 lg:items-center">
          {/* copy */}
          <div className="lg:col-span-4">
            <p className="text-label font-semibold uppercase tracking-label text-gold-soft">
              Ventura packaging load plan
            </p>
            <h2 className="mt-5 text-[1.9rem] leading-[1.12] text-ivory sm:text-[2.35rem]">
              One container.
              <br />
              Built around your requirements.
            </h2>
            <p className="mt-5 max-w-md text-[1rem] leading-[1.7] text-ivory/60">
              Multiple packaging requirements can be coordinated into a consolidated supply plan,
              subject to product compatibility, quantities and logistics.
            </p>

            <div
              className="mt-8 space-y-1.5 text-[0.72rem] font-semibold uppercase tracking-widelabel text-ivory/45 transition-opacity duration-700"
              style={{ opacity: loaded ? 1 : 0 }}
              aria-hidden="true"
            >
              <p>One container</p>
              <p>Multiple requirements</p>
              <p className="text-gold-soft">Ventura</p>
            </div>
            <p
              className="mt-4 font-serif text-[1.15rem] leading-snug text-ivory transition-all duration-700 sm:text-[1.3rem]"
              style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(8px)' }}
            >
              One source. Multiple packaging solutions.
            </p>
          </div>

          {/* container */}
          <div className="lg:col-span-8">
            <div
              ref={ref}
              className="relative flex overflow-hidden border border-white/12 bg-[#141f33] p-3 sm:p-4"
            >
              {/* left door */}
              <div className="relative mr-3 w-8 shrink-0 border-r border-white/10 bg-[#1b2740] sm:mr-4 sm:w-10">
                <div
                  className="absolute inset-y-3 left-1/2 w-1.5 -translate-x-1/2 rounded-full bg-gold/70"
                  style={{ top: '50%', height: '10px', transform: 'translate(-50%,-50%)' }}
                />
                <div className="absolute inset-y-2 left-2 w-px bg-white/10" />
                <div className="absolute inset-y-2 right-2 w-px bg-white/10" />
              </div>

              {/* load grid */}
              <div className="grid flex-1 grid-cols-2 gap-2.5 sm:grid-cols-3 sm:grid-rows-2 sm:gap-3">
                {MODULES.map((m, i) => {
                  const delay = loaded && !reduced ? `${120 + i * 130}ms` : '0ms'
                  return (
                    <Link
                      key={m.key}
                      to={m.to}
                      aria-label={`${m.l1} ${m.l2} — view product`}
                      className="group relative flex flex-col items-center justify-center gap-2 rounded-[2px] border border-white/10 bg-white/[0.03] px-2 py-4 text-center outline-none transition-[transform,background-color,border-color,box-shadow] duration-300 ease-editorial hover:border-gold/45 hover:bg-white/[0.06] focus-visible:border-gold/60 focus-visible:ring-1 focus-visible:ring-gold/40 sm:py-5"
                      style={{
                        opacity: loaded ? 1 : 0,
                        transform: loaded ? 'translateX(0) scale(1)' : 'translateX(46px) scale(0.96)',
                        transitionProperty: 'transform, background-color, border-color, box-shadow, opacity',
                        transitionDuration: reduced ? '0ms' : '700ms',
                        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                        transitionDelay: delay,
                      }}
                    >
                      <Silhouette
                        kind={m.key}
                        className={cn(
                          'w-auto text-gold-soft transition-transform duration-300 ease-editorial group-hover:scale-[1.06]',
                          m.size === 'lg' ? 'h-16 sm:h-24' : m.size === 'sm' ? 'h-10 sm:h-12' : 'h-12 sm:h-16',
                        )}
                      />
                      <span className="text-[0.74rem] font-medium leading-tight tracking-[-0.01em] text-ivory/85">
                        {m.l1}
                        <br />
                        {m.l2}
                      </span>
                      <span className="pointer-events-none mt-0.5 flex items-center gap-1 text-[0.62rem] font-semibold uppercase tracking-widelabel text-gold-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                        Explore
                        <span aria-hidden="true">→</span>
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>

            <p className="mt-4 text-[0.78rem] leading-relaxed text-ivory/40">
              Conceptual. Consolidated loading depends on product compatibility, quantities, loading
              constraints and supplier capability, and is confirmed per shipment.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
