import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { WORLD_VIEWBOX, WORLD_LAND_D } from './worldLand'

/*
 * Editorial trade map: an accurate equirectangular world (Natural Earth
 * 110m land, public domain) in deep navy, with thin gold supply routes
 * running from India to the regions Ventura serves. No globe, no glow.
 */

// equirectangular lon/lat -> the 1000 x 500 space the land path is drawn in
const px = (lon) => ((lon + 180) / 360) * 1000
const py = (lat) => ((90 - lat) / 180) * 500

const ORIGIN = { lon: 79, lat: 22 }

const NODES = [
  { name: 'North America', lon: -92, lat: 39, place: 'end' },
  { name: 'Europe', lon: 9, lat: 50, place: 'mid' },
  { name: 'Middle East', lon: 46, lat: 25, place: 'end' },
  { name: 'Africa', lon: 18, lat: 4, place: 'end' },
  { name: 'Asia', lon: 116, lat: 32, place: 'start' },
]

function routeD(to) {
  const x1 = px(ORIGIN.lon)
  const y1 = py(ORIGIN.lat)
  const x2 = px(to.lon)
  const y2 = py(to.lat)
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  const dist = Math.hypot(x2 - x1, y2 - y1)
  // bow the arc "north" (upward) for a great-circle feel
  const cy = my - Math.min(dist * 0.32, 120) - 6
  return `M${x1} ${y1} Q${mx} ${cy} ${x2} ${y2}`
}

export function GlobalReach() {
  const reduced = usePrefersReducedMotion()
  const ox = px(ORIGIN.lon)
  const oy = py(ORIGIN.lat)

  return (
    <section className="bg-ink text-ivory">
      <Container className="py-12 lg:py-16">
        <div className="grid items-center gap-x-12 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="text-label font-semibold uppercase tracking-label text-gold-soft">
                Global reach
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 text-[1.7rem] leading-[1.15] text-ivory sm:text-[2.05rem]">
                Sourced in India.
                <br />
                Supplied worldwide.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-sm text-[1rem] leading-[1.7] text-ivory/60">
                Production runs from Indian manufacturing partners; Ventura coordinates
                specification, documentation and dispatch to buyers across five regions.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <ul className="mt-7 grid grid-cols-2 gap-x-6 gap-y-2.5 text-[0.9rem] text-ivory/70">
                {['Europe', 'Middle East', 'Africa', 'Asia', 'North America'].map((r) => (
                  <li key={r} className="flex items-center gap-2.5">
                    <span aria-hidden="true" className="h-px w-3.5 bg-gold" />
                    {r}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={0.08}>
              <figure className="m-0 border border-white/10 bg-[#131d30] p-2 sm:p-3">
                <svg
                  viewBox={WORLD_VIEWBOX}
                  className="block w-full"
                  role="img"
                  aria-label="World map with supply routes running from India to Europe, the Middle East, Africa, Asia and North America"
                >
                  {/* landmass */}
                  <path
                    d={WORLD_LAND_D}
                    fill="#26344d"
                    stroke="#3a4a68"
                    strokeWidth="0.5"
                    strokeLinejoin="round"
                  />

                  {/* routes */}
                  <g fill="none" stroke="#c2a06a" strokeLinecap="round">
                    {NODES.map((n, i) => {
                      const d = routeD(n)
                      return (
                        <path
                          key={n.name}
                          d={d}
                          strokeWidth="1.1"
                          opacity="0.85"
                          style={
                            reduced
                              ? undefined
                              : {
                                  strokeDasharray: 560,
                                  strokeDashoffset: 560,
                                  animation: `vx-draw 1.5s cubic-bezier(0.22,1,0.36,1) ${0.2 + i * 0.16}s forwards`,
                                }
                          }
                        />
                      )
                    })}
                  </g>

                  {/* travelling pulse */}
                  {!reduced &&
                    NODES.map((n, i) => (
                      <circle key={`p-${n.name}`} r="1.8" fill="#e6d6b4">
                        <animateMotion
                          dur="5s"
                          begin={`${1.4 + i * 0.4}s`}
                          repeatCount="indefinite"
                          path={routeD(n)}
                          keyPoints="0;1"
                          keyTimes="0;1"
                          calcMode="linear"
                        />
                        <animate
                          attributeName="opacity"
                          values="0;1;1;0"
                          keyTimes="0;0.08;0.9;1"
                          dur="5s"
                          begin={`${1.4 + i * 0.4}s`}
                          repeatCount="indefinite"
                        />
                      </circle>
                    ))}

                  {/* destination markers */}
                  {NODES.map((n) => {
                    const x = px(n.lon)
                    const y = py(n.lat)
                    const dx = n.place === 'end' ? -6 : n.place === 'start' ? 6 : 0
                    const anchor = n.place === 'end' ? 'end' : n.place === 'start' ? 'start' : 'middle'
                    return (
                      <g key={`m-${n.name}`}>
                        <circle cx={x} cy={y} r="2.4" fill="none" stroke="#d8c6a0" strokeWidth="0.9" />
                        <circle cx={x} cy={y} r="0.9" fill="#e9dcc0" />
                        <text
                          x={x + dx}
                          y={y - 6}
                          textAnchor={anchor}
                          fill="#cdd3e2"
                          fontSize="8.5"
                          letterSpacing="0.12em"
                          style={{ textTransform: 'uppercase' }}
                        >
                          {n.name}
                        </text>
                      </g>
                    )
                  })}

                  {/* origin: India */}
                  {!reduced && (
                    <circle cx={ox} cy={oy} r="3" fill="none" stroke="#c2a06a" strokeWidth="0.8">
                      <animate
                        attributeName="r"
                        values="3;11;3"
                        dur="3.4s"
                        repeatCount="indefinite"
                        calcMode="spline"
                        keyTimes="0;0.5;1"
                        keySplines="0.4 0 0.2 1;0.4 0 0.2 1"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.9;0;0.9"
                        dur="3.4s"
                        repeatCount="indefinite"
                        keyTimes="0;0.5;1"
                      />
                    </circle>
                  )}
                  <circle cx={ox} cy={oy} r="3.4" fill="none" stroke="#c2a06a" strokeWidth="1" />
                  <circle cx={ox} cy={oy} r="1.7" fill="#a8814a" />
                  <text
                    x={ox + 7}
                    y={oy + 3}
                    textAnchor="start"
                    fill="#e9dcc0"
                    fontSize="9"
                    letterSpacing="0.14em"
                    style={{ textTransform: 'uppercase' }}
                  >
                    India
                  </text>
                </svg>
              </figure>
            </Reveal>
          </div>
        </div>
      </Container>

      <style>{`
        @keyframes vx-draw { to { stroke-dashoffset: 0; } }
        @media (prefers-reduced-motion: reduce) {
          [style*="vx-draw"] { animation: none !important; stroke-dashoffset: 0 !important; }
        }
      `}</style>
    </section>
  )
}
