import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { cn } from '../../lib/cn'

/*
 * "One container. Built around your requirements."
 *
 * Six packaging modules sit around a clean 2.5D shipping container. When the
 * section enters view they converge — each from its own direction, gently
 * staggered — and settle into an organised load inside the container. The
 * modules stay visible and clickable, each linking to its product page.
 * Transform / opacity only; the loaded state is the resting state, so
 * reduced-motion simply shows the container already filled.
 */

const MODULES = [
  { key: 'fibc', l1: 'FIBC /', l2: 'Jumbo Bags', to: '/products/fibc-jumbo-bags' },
  { key: 'woven', l1: 'PP & HDPE', l2: 'Woven Bags', to: '/products/pp-hdpe-woven-bags' },
  { key: 'bopp', l1: 'BOPP', l2: 'Bags', to: '/products/bopp-laminated-bags' },
  { key: 'corrugated', l1: 'Corrugated', l2: 'Boxes', to: '/products/corrugated-boxes-cartons' },
  { key: 'filter', l1: 'Filter', l2: 'Bags', to: '/products/industrial-filter-bags' },
  { key: 'custom', l1: 'Custom', l2: 'Packaging', to: '/products/customized-woven-packaging' },
]

// Entry order: outer modules converge first, the two centre modules fill last.
const DELAY = { 0: 0, 2: 70, 3: 140, 5: 210, 1: 300, 4: 370 }

function startTransform(i, narrow) {
  if (narrow) return 'translate3d(0, 44px, 0) scale(0.94)'
  const col = i % 3
  const row = Math.floor(i / 3)
  const corner = col !== 1
  const x = (col - 1) * 94 * (corner ? 1.4 : 1)
  const y = (row === 0 ? -58 : 58) * (corner ? 1.12 : 1)
  return `translate3d(${x}px, ${y}px, 0) scale(0.92)`
}

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
  const [narrow, setNarrow] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const sync = () => setNarrow(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

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
      { rootMargin: '0px 0px -20% 0px', threshold: 0.2 },
    )
    io.observe(el)
    const t = setTimeout(() => setLoaded(true), 2400)
    return () => {
      io.disconnect()
      clearTimeout(t)
    }
  }, [reduced])

  const settle = (delayMs) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? 'none' : 'translateY(10px)',
    transition: reduced ? 'none' : 'opacity 700ms ease, transform 700ms cubic-bezier(0.22, 1, 0.36, 1)',
    transitionDelay: reduced ? '0ms' : `${delayMs}ms`,
  })

  return (
    <section className="bg-ink text-ivory">
      <Container className="py-20 lg:py-28">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12 lg:items-center">
          {/* copy + payoff */}
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

            {/* narrative ladder — revealed as the load settles */}
            <div className="mt-9 space-y-2" aria-hidden="true">
              <p
                className="text-[0.72rem] font-semibold uppercase tracking-widelabel text-ivory/45"
                style={settle(880)}
              >
                Multiple requirements
              </p>
              <p className="text-ivory/25" style={settle(960)}>
                ↓
              </p>
              <p
                className="text-[0.72rem] font-semibold uppercase tracking-widelabel text-ivory/45"
                style={settle(1040)}
              >
                One consolidated load
              </p>
              <p className="text-ivory/25" style={settle(1120)}>
                ↓
              </p>
              <p
                className="text-[0.72rem] font-semibold uppercase tracking-widelabel text-gold-soft"
                style={settle(1200)}
              >
                Ventura
              </p>
            </div>

            <p
              className="mt-6 font-serif text-[1.2rem] leading-snug text-ivory sm:text-[1.35rem]"
              style={settle(1320)}
            >
              One source. Multiple packaging solutions.
            </p>
            <div style={settle(1420)}>
              <Link
                to="/products"
                className="group mt-5 inline-flex items-center gap-2 text-[0.8rem] font-semibold uppercase tracking-widelabel text-ivory transition-colors hover:text-gold-soft"
              >
                Explore products
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 ease-editorial group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* container stage */}
          <div className="lg:col-span-8">
            <div
              ref={ref}
              className="relative overflow-hidden rounded-[3px] border border-white/12 bg-[#141f33]"
            >
              {/* corrugated body texture */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(90deg, rgba(255,255,255,0.028) 0 1px, transparent 1px 13px)',
                }}
              />
              {/* corner castings */}
              {['left-1.5 top-1.5', 'right-1.5 top-1.5', 'left-1.5 bottom-1.5', 'right-1.5 bottom-1.5'].map(
                (pos) => (
                  <span
                    key={pos}
                    aria-hidden="true"
                    className={cn('absolute h-2.5 w-2.5 border border-white/15', pos)}
                  />
                ),
              )}

              {/* top rail */}
              <div className="flex items-center gap-3 border-b border-white/10 px-4 py-2.5 sm:px-6">
                <span className="text-[0.62rem] font-semibold uppercase tracking-widelabel text-ivory/45">
                  Consolidated load plan
                </span>
                <span aria-hidden="true" className="flex flex-1 items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-white/20" />
                  <span className="h-1 w-1 rounded-full bg-white/20" />
                  <span className="h-1 w-1 rounded-full bg-white/20" />
                </span>
              </div>

              <div className="flex p-3 sm:p-5">
                {/* left doors */}
                <div className="relative mr-3 hidden w-9 shrink-0 border-r border-white/10 bg-[#1b2740] sm:block sm:w-11">
                  <span className="absolute inset-y-3 left-2 w-px bg-white/10" />
                  <span className="absolute inset-y-3 right-2 w-px bg-white/10" />
                  <span
                    className="absolute left-1/2 h-2.5 w-1.5 -translate-x-1/2 rounded-full bg-gold/70"
                    style={{ top: '50%', transform: 'translate(-50%,-50%)' }}
                  />
                </div>

                {/* load grid */}
                <div className="grid flex-1 grid-cols-2 gap-2.5 sm:grid-cols-3 sm:grid-rows-2 sm:gap-3">
                  {MODULES.map((m, i) => (
                    <div
                      key={m.key}
                      className="h-full"
                      style={{
                        opacity: loaded ? 1 : 0,
                        transform: loaded ? 'none' : startTransform(i, narrow),
                        transition: reduced
                          ? 'none'
                          : 'transform 780ms cubic-bezier(0.22, 1, 0.36, 1), opacity 520ms ease',
                        transitionDelay: reduced
                          ? '0ms'
                          : `${narrow ? i * 75 : DELAY[i]}ms`,
                        willChange: 'transform',
                      }}
                    >
                      <Link
                        to={m.to}
                        aria-label={`${m.l1} ${m.l2} — view product`}
                        className="group relative flex h-full items-center gap-3 rounded-[2px] border border-white/10 bg-white/[0.035] px-3 py-3.5 outline-none transition-[transform,background-color,border-color,box-shadow] duration-300 ease-editorial hover:-translate-y-[3px] hover:border-gold/45 hover:bg-white/[0.06] hover:shadow-[0_12px_34px_-14px_rgba(0,0,0,0.6)] focus-visible:border-gold/60 focus-visible:ring-1 focus-visible:ring-gold/40"
                      >
                        <Silhouette
                          kind={m.key}
                          className="h-9 w-auto shrink-0 text-gold-soft transition-transform duration-300 ease-editorial group-hover:scale-[1.06]"
                        />
                        <span className="block text-[0.72rem] font-medium leading-tight tracking-[-0.01em] text-ivory/85">
                          {m.l1}
                          <br />
                          {m.l2}
                        </span>
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute right-2 top-2 text-[0.6rem] font-semibold text-gold-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                        >
                          →
                        </span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* consolidation seam */}
              <div className="px-4 pb-4 sm:px-6 sm:pb-5">
                <span
                  className="block h-px bg-gold/45"
                  style={{
                    width: loaded ? '100%' : '0%',
                    transition: reduced ? 'none' : 'width 760ms cubic-bezier(0.22, 1, 0.36, 1)',
                    transitionDelay: reduced ? '0ms' : '820ms',
                  }}
                />
                <p
                  className="mt-2 text-center text-[0.62rem] font-semibold uppercase tracking-widelabel text-ivory/40"
                  style={settle(1000)}
                >
                  One consolidated load
                </p>
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
