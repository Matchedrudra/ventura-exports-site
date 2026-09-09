import { useEffect, useRef, useState } from 'react'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { useScrollProgress, slice, easeInOut } from '../../hooks/useScrollProgress'
import { WORLD_VIEWBOX, WORLD_LAND_D } from './worldLand'

/*
 * "From India to global markets." An accurate equirectangular world map
 * (Natural Earth 110m land, public domain) in deep navy. As the section
 * scrolls, supply routes draw outward from India and market regions
 * activate in turn. Once a route is revealed it stays drawn, and a small
 * gold dot then travels its path continuously — India → destination, on a
 * loop, lightly staggered — independent of further scrolling. Reduced
 * motion keeps the routes and points but drops the travelling dots.
 * Regions shown are market groupings, not claims of active supply.
 */

const px = (lon) => ((lon + 180) / 360) * 1000
const py = (lat) => ((90 - lat) / 180) * 500

const ORIGIN = { lon: 79, lat: 22 }

const NODES = [
  { name: 'North America', lon: -96, lat: 40, place: 'end' },
  { name: 'Latin America', lon: -61, lat: -12, place: 'end' },
  { name: 'Europe', lon: 10, lat: 50, place: 'mid' },
  { name: 'Middle East', lon: 46, lat: 26, place: 'end' },
  { name: 'Africa', lon: 20, lat: 2, place: 'end' },
  { name: 'Asia Pacific', lon: 118, lat: 14, place: 'start' },
  { name: 'Australia', lon: 134, lat: -25, place: 'start' },
]

function routeD(to) {
  const x1 = px(ORIGIN.lon)
  const y1 = py(ORIGIN.lat)
  const x2 = px(to.lon)
  const y2 = py(to.lat)
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  const dist = Math.hypot(x2 - x1, y2 - y1)
  const cy = my - Math.min(dist * 0.32, 120) - 6
  return `M${x1} ${y1} Q${mx} ${cy} ${x2} ${y2}`
}

const ROUTE_LEN = 640
const TRAVEL = 4600 // ms for one India → destination pass
const STAGGER = 620 // ms offset between routes
const PULSE = 700 // ms destination pulse

export function GlobalReach() {
  const { ref, progress, reduced } = useScrollProgress({ start: 0.82, end: 0.28 })
  const ox = px(ORIGIN.lon)
  const oy = py(ORIGIN.lat)
  const originOn = reduced ? 1 : slice(progress, 0.02, 0.12)

  // Latch each route on once it has finished drawing — it then stays visible
  // and its dot keeps travelling regardless of later scrolling.
  const [revealed, setRevealed] = useState(() => NODES.map(() => reduced))
  const revealedRef = useRef(revealed)
  revealedRef.current = revealed

  useEffect(() => {
    if (reduced) return
    setRevealed((prev) => {
      let changed = false
      const next = prev.map((was, i) => {
        if (was) return true
        if (slice(progress, 0.12 + i * 0.1, 0.32 + i * 0.1) >= 0.98) {
          changed = true
          return true
        }
        return false
      })
      return changed ? next : prev
    })
  }, [progress, reduced])

  // Continuous dot travel along the real SVG paths.
  const pathRefs = useRef([])
  const dotRefs = useRef([])
  const pulseRefs = useRef([])

  useEffect(() => {
    if (reduced) return
    let raf = 0
    const t0 = performance.now()
    const lastU = NODES.map(() => 0)
    const pulseAt = NODES.map(() => -1)

    const tick = (now) => {
      for (let i = 0; i < NODES.length; i += 1) {
        const dot = dotRefs.current[i]
        const path = pathRefs.current[i]
        if (!dot || !path) continue

        if (!revealedRef.current[i]) {
          dot.style.opacity = '0'
          continue
        }
        const local = now - t0 - i * STAGGER
        if (local < 0) {
          dot.style.opacity = '0'
          continue
        }
        const u = (local % TRAVEL) / TRAVEL
        if (u < lastU[i]) pulseAt[i] = now // wrapped → arrived
        lastU[i] = u

        const len = path.getTotalLength()
        const pt = path.getPointAtLength(easeInOut(u) * len)
        dot.setAttribute('transform', `translate(${pt.x} ${pt.y})`)
        // appear near India, dissolve at the destination, seamless restart
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
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduced])

  return (
    <section ref={ref} className="bg-ink text-ivory">
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
              {NODES.map((r, i) => {
                const on = reduced || revealed[i] || progress > 0.14 + i * 0.11
                return (
                  <li key={r.name} className="flex items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className="h-px w-3.5 transition-colors duration-500"
                      style={{ background: on ? '#a8814a' : 'rgba(255,255,255,0.28)' }}
                    />
                    {r.name}
                  </li>
                )
              })}
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
                  <path d={WORLD_LAND_D} fill="#26344d" stroke="#3a4a68" strokeWidth="0.5" strokeLinejoin="round" />

                  {/* routes — draw on scroll, then stay */}
                  <g fill="none" stroke="#c2a06a" strokeLinecap="round">
                    {NODES.map((n, i) => {
                      const seg = revealed[i]
                        ? 1
                        : easeInOut(slice(progress, 0.12 + i * 0.1, 0.32 + i * 0.1))
                      return (
                        <path
                          key={n.name}
                          ref={(el) => { pathRefs.current[i] = el }}
                          d={routeD(n)}
                          strokeWidth="1.1"
                          opacity="0.8"
                          strokeDasharray={ROUTE_LEN}
                          strokeDashoffset={reduced ? 0 : ROUTE_LEN * (1 - seg)}
                        />
                      )
                    })}
                  </g>

                  {/* destination markers — dot activates after its route lands; label stays readable */}
                  {NODES.map((n, i) => {
                    const x = px(n.lon)
                    const y = py(n.lat)
                    const dotOn = reduced || revealed[i] ? 1 : slice(progress, 0.28 + i * 0.1, 0.36 + i * 0.1)
                    const anchor = n.place === 'end' ? 'end' : n.place === 'start' ? 'start' : 'middle'
                    const dx = n.place === 'end' ? -7 : n.place === 'start' ? 7 : 0
                    const ly = y - 9
                    const w = n.name.length * 6.2 + 8
                    const lx = x + dx - (anchor === 'end' ? w - 4 : anchor === 'start' ? 4 : w / 2)
                    return (
                      <g key={`m-${n.name}`}>
                        {/* subtle arrival pulse */}
                        <circle
                          ref={(el) => { pulseRefs.current[i] = el }}
                          cx={x}
                          cy={y}
                          r="2.6"
                          fill="none"
                          stroke="#d8c6a0"
                          strokeWidth="0.9"
                          style={{ opacity: 0 }}
                        />
                        <circle cx={x} cy={y} r={2.6} fill="none" stroke="#d8c6a0" strokeWidth="1" opacity={dotOn} />
                        <circle cx={x} cy={y} r="1.1" fill="#e9dcc0" opacity={dotOn} />
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
                    )
                  })}

                  {/* travelling dots — one per route, positioned each frame along the real path */}
                  {!reduced && (
                    <g aria-hidden="true">
                      {NODES.map((n, i) => (
                        <g
                          key={`d-${n.name}`}
                          ref={(el) => { dotRefs.current[i] = el }}
                          style={{ opacity: 0 }}
                        >
                          <circle r="3.4" fill="#c2a06a" opacity="0.16" />
                          <circle r="1.7" fill="#e2d2ae" />
                        </g>
                      ))}
                    </g>
                  )}

                  {/* origin: India */}
                  <g opacity={originOn}>
                    <circle cx={ox} cy={oy} r="3.4" fill="none" stroke="#c2a06a" strokeWidth="1" />
                    <circle cx={ox} cy={oy} r="1.7" fill="#a8814a" />
                    <text x={ox + 7} y={oy + 3} fill="#e9dcc0" fontSize="9" letterSpacing="0.14em" style={{ textTransform: 'uppercase' }}>
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
