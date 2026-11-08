import { useEffect, useRef, useState } from 'react'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { WORLD_LAND_D } from './worldLand'
import { indiaCopy, marketsOfInterest } from '../../data/textiles'

/*
 * "India as Your Textile Sourcing Destination." A world map (Natural Earth
 * 50m land, public domain) in deep navy. When the section scrolls into view,
 * routes draw once from India to each market of interest and stay. Reduced
 * motion shows the finished map immediately.
 *
 * These are markets of interest — not a claim of customers or shipments.
 */

// Cropped to Europe, Africa, the Middle East and Asia — where the markets of
// interest sit — so labels and routes stay legible.
const MAP_VIEWBOX = '395 55 560 250'

const px = (lon) => ((lon + 180) / 360) * 1000
const py = (lat) => ((90 - lat) / 180) * 500

const ORIGIN = { lon: 79, lat: 22 }
const OX = px(ORIGIN.lon)
const OY = py(ORIGIN.lat)

// bow = how far the arc bows toward the top of the map, as a fraction of the
// chord (capped); place = which side of the marker its label sits on.
const NODES = [
  { name: 'Germany', lon: 10, lat: 51, place: 'end', bow: 0.22 },
  { name: 'Turkey', lon: 35, lat: 39, place: 'end', bow: 0.3 },
  { name: 'Israel', lon: 35, lat: 31.5, place: 'start', bow: 0.34 },
  { name: 'Egypt', lon: 30, lat: 26, place: 'end', bow: 0.3 },
  { name: 'Bangladesh', lon: 90, lat: 24, place: 'start', bow: 0.5 },
  { name: 'Vietnam', lon: 106, lat: 16, place: 'start', bow: 0.34 },
]

function routeD(to) {
  const x2 = px(to.lon)
  const y2 = py(to.lat)
  const mx = (OX + x2) / 2
  const my = (OY + y2) / 2
  const dx = x2 - OX
  const dy = y2 - OY
  const dist = Math.hypot(dx, dy) || 1
  let nx = -dy / dist
  let ny = dx / dist
  if (ny > 0) {
    nx = -nx
    ny = -ny
  }
  const off = Math.min(dist * to.bow, 70)
  return `M${OX} ${OY} Q${mx + nx * off} ${my + ny * off} ${x2} ${y2}`
}

const DRAW_MS = 900
const STEP = 130
const LEAD = 200

export function IndiaSourcing() {
  const reduced = usePrefersReducedMotion()
  const sectionRef = useRef(null)
  const [active, setActive] = useState(reduced)

  useEffect(() => {
    if (reduced || typeof IntersectionObserver === 'undefined') {
      setActive(true)
      return
    }
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -15% 0px', threshold: 0.2 },
    )
    io.observe(el)
    const t = setTimeout(() => setActive(true), 2600)
    return () => {
      io.disconnect()
      clearTimeout(t)
    }
  }, [reduced])

  const drawTransition = (i) =>
    reduced ? 'none' : `stroke-dashoffset ${DRAW_MS}ms cubic-bezier(0.4, 0, 0.2, 1) ${LEAD + i * STEP}ms`

  return (
    <section id="markets" ref={sectionRef} className="scroll-mt-24 bg-ink text-ivory">
      <Container className="py-16 lg:py-24">
        <div className="grid items-center gap-x-14 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="mb-4 text-[0.66rem] font-semibold uppercase leading-none tracking-[0.2em] text-gold-soft">
                International trade
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-serif text-[1.85rem] font-medium leading-[1.15] text-ivory sm:text-[2.15rem] lg:text-[2.4rem]">
                India as Your Textile Sourcing Destination.
              </h2>
            </Reveal>
            {indiaCopy.map((p, i) => (
              <Reveal key={p} delay={0.1 + i * 0.05}>
                <p className="mt-5 max-w-sm text-[0.98rem] leading-[1.7] text-ivory/65">{p}</p>
              </Reveal>
            ))}
            <p className="mt-8 text-[0.72rem] font-semibold uppercase tracking-widelabel text-ivory/50">
              Markets of interest
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-[0.9rem] text-ivory/80">
              {marketsOfInterest.map((m, i) => (
                <li key={m} className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className="h-px w-3.5 transition-colors duration-500"
                    style={{
                      background: active ? '#a8814a' : 'rgba(255,255,255,0.28)',
                      transitionDelay: reduced ? '0ms' : `${LEAD + i * STEP}ms`,
                    }}
                  />
                  {m}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[0.78rem] leading-relaxed text-ivory/55">
              Markets of interest, not a claim of existing customers or shipments in these
              countries.
            </p>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={0.08}>
              <figure className="m-0 border border-white/10 bg-[#131d30] p-2 sm:p-3">
                <svg
                  viewBox={MAP_VIEWBOX}
                  className="block w-full"
                  role="img"
                  aria-label="World map with routes from India to Germany, Turkey, Israel, Egypt, Bangladesh and Vietnam"
                >
                  <path d={WORLD_LAND_D} fill="#26344d" stroke="#3a4a68" strokeWidth="0.5" strokeLinejoin="round" />

                  <g fill="none" stroke="#c2a06a" strokeLinecap="round">
                    {NODES.map((n, i) => (
                      <path
                        key={n.name}
                        d={routeD(n)}
                        strokeWidth="1.1"
                        opacity="0.82"
                        pathLength="1"
                        strokeDasharray="1"
                        strokeDashoffset={reduced || active ? 0 : 1}
                        style={{ transition: drawTransition(i) }}
                      />
                    ))}
                  </g>

                  {NODES.map((n, i) => {
                    const x = px(n.lon)
                    const y = py(n.lat)
                    const anchor = n.place === 'end' ? 'end' : 'start'
                    const dx = n.place === 'end' ? -7 : 7
                    const ly = y + 3
                    const w = n.name.length * 5.4 + 8
                    const lx = x + dx - (anchor === 'end' ? w - 4 : 4)
                    return (
                      <g
                        key={`m-${n.name}`}
                        style={{
                          opacity: reduced || active ? 1 : 0,
                          transition: reduced
                            ? 'none'
                            : `opacity 500ms ease ${LEAD + i * STEP + DRAW_MS * 0.5}ms`,
                        }}
                      >
                        <circle cx={x} cy={y} r={2.6} fill="none" stroke="#d8c6a0" strokeWidth="1" />
                        <circle cx={x} cy={y} r="1.1" fill="#e9dcc0" />
                        <rect x={lx} y={ly - 8} width={w} height={11} rx="1.5" fill="#0f1826" fillOpacity="0.82" />
                        <text
                          x={x + dx}
                          y={ly}
                          textAnchor={anchor}
                          fill="#e7ebf3"
                          fontSize="8"
                          fontWeight="500"
                          letterSpacing="0.1em"
                          style={{ textTransform: 'uppercase' }}
                        >
                          {n.name}
                        </text>
                      </g>
                    )
                  })}

                  <g
                    style={{
                      opacity: reduced || active ? 1 : 0,
                      transition: reduced ? 'none' : 'opacity 500ms ease 60ms',
                    }}
                  >
                    <circle cx={OX} cy={OY} r="6" fill="#c2a06a" opacity="0.14" />
                    <circle cx={OX} cy={OY} r="3.6" fill="none" stroke="#d8c6a0" strokeWidth="1.1" />
                    <circle cx={OX} cy={OY} r="2.1" fill="#e7d6ac" />
                    <text
                      x={OX - 3}
                      y={OY + 17}
                      textAnchor="end"
                      fill="#f2e9d6"
                      fontSize="8.5"
                      fontWeight="600"
                      letterSpacing="0.14em"
                      style={{ textTransform: 'uppercase' }}
                    >
                      India
                    </text>
                  </g>
                </svg>
              </figure>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
