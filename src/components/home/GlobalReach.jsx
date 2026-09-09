import { useEffect, useRef, useState } from 'react'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { WORLD_VIEWBOX, WORLD_LAND_D } from './worldLand'

/*
 * "From India to global markets." A recognizable equirectangular world map
 * (Natural Earth 50m land, public domain) in deep navy.
 *
 * When the section enters view, seven supply routes draw outward from a
 * single India origin — one to each market region — lightly staggered.
 * Each route then keeps a small muted-gold dot travelling its real SVG
 * path, India → destination, on a loop. Everything after the reveal runs
 * on its own; scrolling is not required. Reduced motion shows the routes
 * and points as a clean static state with no travelling dots.
 *
 * Regions shown are market groupings, not claims of active supply.
 */

const px = (lon) => ((lon + 180) / 360) * 1000
const py = (lat) => ((90 - lat) / 180) * 500

const ORIGIN = { lon: 79, lat: 22 }
const OX = px(ORIGIN.lon)
const OY = py(ORIGIN.lat)

// bow = how far the arc bows toward the top of the map, as a fraction of the
// straight-line distance (capped). Tuned so all seven routes read separately.
const NODES = [
  { name: 'North America', lon: -96, lat: 40, place: 'end', bow: 0.16 },
  { name: 'Latin America', lon: -61, lat: -12, place: 'end', bow: 0.18 },
  { name: 'Europe', lon: 10, lat: 50, place: 'mid', bow: 0.24 },
  { name: 'Middle East', lon: 47, lat: 27, place: 'end', bow: 0.6 },
  { name: 'Africa', lon: 22, lat: 3, place: 'end', bow: 0.32 },
  { name: 'Asia Pacific', lon: 119, lat: 12, place: 'start', bow: 0.34 },
  { name: 'Australia', lon: 135, lat: -25, place: 'start', bow: 0.24 },
]

function routeD(to) {
  const x2 = px(to.lon)
  const y2 = py(to.lat)
  const mx = (OX + x2) / 2
  const my = (OY + y2) / 2
  const dx = x2 - OX
  const dy = y2 - OY
  const dist = Math.hypot(dx, dy) || 1
  // unit normal to the chord, forced to point toward the top of the map
  let nx = -dy / dist
  let ny = dx / dist
  if (ny > 0) {
    nx = -nx
    ny = -ny
  }
  const off = Math.min(dist * to.bow, 118)
  return `M${OX} ${OY} Q${mx + nx * off} ${my + ny * off} ${x2} ${y2}`
}

const DRAW_MS = 900
const STEP = 140 // stagger between route reveals
const LEAD = 220 // delay before the first route starts
const DOTS_LEAD = LEAD + (7 - 1) * STEP + 500 // dots begin as the last route lands
const TRAVEL = 4600 // ms for one India → destination pass
const LAUNCH_STEP = 320 // ms between each dot setting off
const PULSE = 700

const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

export function GlobalReach() {
  const reduced = usePrefersReducedMotion()
  const sectionRef = useRef(null)
  const [active, setActive] = useState(reduced)
  const activeRef = useRef(active)
  activeRef.current = active

  // one-shot reveal when the section scrolls into view
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

  // continuous dot travel along the real SVG paths
  const pathRefs = useRef([])
  const dotRefs = useRef([])
  const pulseRefs = useRef([])

  useEffect(() => {
    if (reduced) return
    let raf = 0
    let startedAt = 0
    const lastU = NODES.map(() => 0)
    const pulseAt = NODES.map(() => -1)

    const tick = (now) => {
      if (activeRef.current) {
        if (!startedAt) startedAt = now
        for (let i = 0; i < NODES.length; i += 1) {
          const dot = dotRefs.current[i]
          const path = pathRefs.current[i]
          if (!dot || !path) continue

          // dots set off one after another, then loop independently
          const local = now - startedAt - DOTS_LEAD - i * LAUNCH_STEP
          if (local < 0) {
            dot.style.opacity = '0'
            continue
          }
          const u = (local % TRAVEL) / TRAVEL
          if (u < lastU[i]) pulseAt[i] = now
          lastU[i] = u

          const len = path.getTotalLength()
          const pt = path.getPointAtLength(easeInOut(u) * len)
          dot.setAttribute('transform', `translate(${pt.x} ${pt.y})`)
          dot.style.opacity = String(0.9 * Math.sin(Math.PI * u))

          const pulse = pulseRefs.current[i]
          if (pulse) {
            const age = now - pulseAt[i]
            if (pulseAt[i] >= 0 && age < PULSE) {
              const k = age / PULSE
              pulse.setAttribute('r', String(2.4 + 9 * k))
              pulse.style.opacity = String(0.4 * (1 - k))
            } else {
              pulse.style.opacity = '0'
            }
          }
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduced])

  const drawTransition = (i, prop) =>
    reduced ? 'none' : `${prop} ${DRAW_MS}ms cubic-bezier(0.4, 0, 0.2, 1) ${LEAD + i * STEP}ms`

  return (
    <section ref={sectionRef} className="bg-ink text-ivory">
      <Container className="py-16 lg:py-24">
        <div className="grid items-center gap-x-12 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="text-label font-semibold uppercase tracking-label text-gold-soft">
                Global markets
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 text-[1.9rem] leading-[1.14] text-ivory sm:text-[2.3rem]">
                From India to global markets.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-sm text-[1rem] leading-[1.7] text-ivory/60">
                Connecting international buyers with capable Indian manufacturing partners.
              </p>
            </Reveal>
            <ul className="mt-7 grid grid-cols-2 gap-x-6 gap-y-2.5 text-[0.9rem] text-ivory/80">
              {NODES.map((r, i) => (
                <li key={r.name} className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className="h-px w-3.5 transition-colors duration-500"
                    style={{
                      background: active ? '#a8814a' : 'rgba(255,255,255,0.28)',
                      transitionDelay: reduced ? '0ms' : `${LEAD + i * STEP}ms`,
                    }}
                  />
                  {r.name}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[0.78rem] leading-relaxed text-ivory/40">
              Market regions, not a claim of active supply in every territory.
            </p>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={0.08}>
              <figure className="m-0 border border-white/10 bg-[#131d30] p-2 sm:p-3">
                <svg
                  viewBox={WORLD_VIEWBOX}
                  className="block w-full"
                  role="img"
                  aria-label="World map with supply routes from India to North America, Latin America, Europe, the Middle East, Africa, Asia Pacific and Australia"
                >
                  <path
                    d={WORLD_LAND_D}
                    fill="#26344d"
                    stroke="#3a4a68"
                    strokeWidth="0.5"
                    strokeLinejoin="round"
                  />

                  {/* seven supply routes — draw once, then stay */}
                  <g fill="none" stroke="#c2a06a" strokeLinecap="round">
                    {NODES.map((n, i) => (
                      <path
                        key={n.name}
                        ref={(el) => {
                          pathRefs.current[i] = el
                        }}
                        d={routeD(n)}
                        strokeWidth="1.1"
                        opacity="0.82"
                        pathLength="1"
                        strokeDasharray="1"
                        strokeDashoffset={reduced || active ? 0 : 1}
                        style={{ transition: drawTransition(i, 'stroke-dashoffset') }}
                      />
                    ))}
                  </g>

                  {/* destination markers */}
                  {NODES.map((n, i) => {
                    const x = px(n.lon)
                    const y = py(n.lat)
                    const anchor = n.place === 'end' ? 'end' : n.place === 'start' ? 'start' : 'middle'
                    const dx = n.place === 'end' ? -7 : n.place === 'start' ? 7 : 0
                    const ly = y - 9
                    const w = n.name.length * 6.2 + 8
                    const lx = x + dx - (anchor === 'end' ? w - 4 : anchor === 'start' ? 4 : w / 2)
                    return (
                      <g key={`m-${n.name}`}>
                        <circle
                          ref={(el) => {
                            pulseRefs.current[i] = el
                          }}
                          cx={x}
                          cy={y}
                          r="2.6"
                          fill="none"
                          stroke="#d8c6a0"
                          strokeWidth="0.9"
                          style={{ opacity: 0 }}
                        />
                        <g
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
                            fontSize="9.5"
                            fontWeight="500"
                            letterSpacing="0.1em"
                            style={{ textTransform: 'uppercase' }}
                          >
                            {n.name}
                          </text>
                        </g>
                      </g>
                    )
                  })}

                  {/* travelling dots — positioned each frame along the real path */}
                  {!reduced && (
                    <g aria-hidden="true">
                      {NODES.map((n, i) => (
                        <g
                          key={`d-${n.name}`}
                          ref={(el) => {
                            dotRefs.current[i] = el
                          }}
                          style={{ opacity: 0 }}
                        >
                          <circle r="3.4" fill="#c2a06a" opacity="0.16" />
                          <circle r="1.7" fill="#e2d2ae" />
                        </g>
                      ))}
                    </g>
                  )}

                  {/* origin: India — brighter than the destinations, the source of every route */}
                  <g
                    style={{
                      opacity: reduced || active ? 1 : 0,
                      transition: reduced ? 'none' : 'opacity 500ms ease 60ms',
                    }}
                  >
                    <circle cx={OX} cy={OY} r="6" fill="#c2a06a" opacity="0.12" />
                    <circle cx={OX} cy={OY} r="3.6" fill="none" stroke="#d8c6a0" strokeWidth="1.1" />
                    <circle cx={OX} cy={OY} r="2.1" fill="#e7d6ac" />
                    <text
                      x={OX + 8}
                      y={OY + 3}
                      fill="#f2e9d6"
                      fontSize="9.5"
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
