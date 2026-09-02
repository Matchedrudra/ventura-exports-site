import { useMemo } from 'react'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

/*
 * A quiet dark world map. Landmass is a dot matrix (a coarse point grid
 * masked by simplified continent polygons), India is the origin, and thin
 * gold arcs run out to the regions Ventura supplies. No globe, no glow.
 */

const VB_W = 1000
const VB_H = 480

// Simplified continent polygons (equirectangular). Rough on purpose — they
// only mask the dot grid, so exact coastlines don't matter.
const CONTINENTS = [
  // North America
  [[150, 70], [250, 44], [362, 78], [360, 120], [300, 140], [286, 176], [252, 182], [214, 166], [193, 128], [150, 114]],
  // Central America
  [[262, 176], [300, 150], [300, 196], [278, 214], [258, 200]],
  // South America
  [[290, 214], [342, 208], [402, 254], [372, 322], [322, 382], [300, 320], [278, 262], [282, 218]],
  // Europe
  [[470, 112], [500, 80], [560, 62], [612, 92], [592, 136], [540, 146], [500, 140], [468, 128]],
  // Africa
  [[456, 150], [592, 150], [636, 206], [612, 250], [560, 336], [524, 300], [470, 236], [450, 196]],
  // Asia
  [[612, 92], [668, 78], [800, 54], [972, 58], [946, 96], [892, 140], [802, 202], [722, 232], [696, 186], [626, 192], [610, 140]],
  // SE Asia / islands
  [[792, 210], [842, 226], [860, 262], [822, 286], [792, 250]],
  // Australia
  [[815, 292], [880, 268], [930, 302], [900, 342], [840, 338], [810, 306]],
]

function pointInPoly(x, y, poly) {
  let inside = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i]
    const [xj, yj] = poly[j]
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside
  }
  return inside
}

// lon/lat -> viewBox coords
const px = (lon) => ((lon + 180) / 360) * VB_W
const py = (lat) => ((90 - lat) / 180) * VB_H

const ORIGIN = { name: 'India', lon: 79, lat: 22 }

const NODES = [
  { name: 'North America', lon: -95, lat: 40, anchor: 'end' },
  { name: 'Europe', lon: 12, lat: 52, anchor: 'middle' },
  { name: 'Middle East', lon: 47, lat: 26, anchor: 'end' },
  { name: 'Africa', lon: 18, lat: 4, anchor: 'end' },
  { name: 'Asia', lon: 112, lat: 30, anchor: 'start' },
]

function arc(from, to, lift = 0.28) {
  const x1 = px(from.lon)
  const y1 = py(from.lat)
  const x2 = px(to.lon)
  const y2 = py(to.lat)
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  const dx = x2 - x1
  const dy = y2 - y1
  const dist = Math.hypot(dx, dy)
  // control point pushed "up" (toward smaller y) for a gentle great-circle feel
  const cx = mx - dy * 0 // keep horizontal centre
  const cy = my - dist * lift - 12
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`
}

export function GlobalReach() {
  const reduced = usePrefersReducedMotion()

  const dots = useMemo(() => {
    const step = 13
    const out = []
    for (let y = step; y < VB_H; y += step) {
      for (let x = step; x < VB_W; x += step) {
        // slight offset per row for a less mechanical grid
        const ox = x + (Math.floor(y / step) % 2 ? step / 2 : 0)
        if (ox > VB_W - 4) continue
        if (CONTINENTS.some((poly) => pointInPoly(ox, y, poly))) out.push([ox, y])
      }
    }
    return out
  }, [])

  const ox = px(ORIGIN.lon)
  const oy = py(ORIGIN.lat)

  return (
    <section className="relative overflow-hidden bg-ink text-ivory">
      <Container className="py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="text-label font-semibold uppercase tracking-label text-gold-soft">
                Global reach
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 text-[1.7rem] leading-[1.15] text-ivory sm:text-[2.1rem]">
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
              <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2.5 text-[0.9rem] text-ivory/70">
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
              <svg
                viewBox={`0 0 ${VB_W} ${VB_H}`}
                className="w-full"
                role="img"
                aria-label="World map showing sourcing routes from India to Europe, the Middle East, Africa, Asia and North America"
              >
                <defs>
                  <radialGradient id="gr-origin" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#c2a06a" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#c2a06a" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* landmass dots */}
                <g fill="#7c88a0">
                  {dots.map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r="1.5" opacity="0.34" />
                  ))}
                </g>

                {/* routes */}
                <g fill="none" stroke="#c2a06a" strokeWidth="1.4" strokeLinecap="round">
                  {NODES.map((n, i) => {
                    const d = arc(ORIGIN, n)
                    return (
                      <g key={n.name}>
                        <path
                          d={d}
                          opacity="0.7"
                          style={
                            reduced
                              ? undefined
                              : {
                                  strokeDasharray: 620,
                                  strokeDashoffset: 620,
                                  animation: `vx-draw 1.4s cubic-bezier(0.22,1,0.36,1) ${0.25 + i * 0.18}s forwards`,
                                }
                          }
                        />
                        {!reduced && (
                          <circle r="2.6" fill="#e6d6b4">
                            <animateMotion
                              dur="4.4s"
                              begin={`${1.2 + i * 0.35}s`}
                              repeatCount="indefinite"
                              keyPoints="0;1"
                              keyTimes="0;1"
                              calcMode="linear"
                              path={d}
                            />
                            <animate
                              attributeName="opacity"
                              values="0;1;1;0"
                              keyTimes="0;0.1;0.85;1"
                              dur="4.4s"
                              begin={`${1.2 + i * 0.35}s`}
                              repeatCount="indefinite"
                            />
                          </circle>
                        )}
                      </g>
                    )
                  })}
                </g>

                {/* destination nodes */}
                <g>
                  {NODES.map((n) => (
                    <g key={n.name}>
                      <circle cx={px(n.lon)} cy={py(n.lat)} r="3" fill="#e9dcc0" />
                      <text
                        x={px(n.lon) + (n.anchor === 'end' ? -8 : n.anchor === 'start' ? 8 : 0)}
                        y={py(n.lat) - 9}
                        textAnchor={n.anchor}
                        fill="#c9cede"
                        fontSize="12"
                        letterSpacing="0.06em"
                        style={{ textTransform: 'uppercase' }}
                      >
                        {n.name}
                      </text>
                    </g>
                  ))}
                </g>

                {/* origin: India */}
                <circle cx={ox} cy={oy} r="26" fill="url(#gr-origin)" />
                <circle cx={ox} cy={oy} r="4.5" fill="#a8814a" />
                <circle cx={ox} cy={oy} r="4.5" fill="none" stroke="#c2a06a" strokeWidth="1">
                  {!reduced && (
                    <animate
                      attributeName="r"
                      values="4.5;16;4.5"
                      dur="3.2s"
                      repeatCount="indefinite"
                      calcMode="spline"
                      keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
                      keyTimes="0;0.5;1"
                    />
                  )}
                  {!reduced && (
                    <animate
                      attributeName="opacity"
                      values="0.9;0;0.9"
                      dur="3.2s"
                      repeatCount="indefinite"
                      keyTimes="0;0.5;1"
                    />
                  )}
                </circle>
                <text
                  x={ox}
                  y={oy + 24}
                  textAnchor="middle"
                  fill="#e9dcc0"
                  fontSize="12.5"
                  letterSpacing="0.08em"
                  style={{ textTransform: 'uppercase' }}
                >
                  India
                </text>
              </svg>
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
