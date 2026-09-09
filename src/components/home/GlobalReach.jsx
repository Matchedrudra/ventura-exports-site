import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { useScrollProgress, slice, easeInOut } from '../../hooks/useScrollProgress'
import { WORLD_VIEWBOX, WORLD_LAND_D } from './worldLand'

/*
 * "From India to global markets." An accurate equirectangular world map
 * (Natural Earth 110m land, public domain) in deep navy. As the section
 * scrolls, supply routes draw outward from India and market regions
 * activate in turn. Scroll-linked, transform/opacity, reduced-motion safe.
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
  { name: 'Asia Pacific', lon: 120, lat: 14, place: 'start' },
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

export function GlobalReach() {
  const { ref, progress, reduced } = useScrollProgress({ start: 0.82, end: 0.28 })
  const ox = px(ORIGIN.lon)
  const oy = py(ORIGIN.lat)
  const originOn = reduced ? 1 : slice(progress, 0.02, 0.12)

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
                const on = reduced || progress > 0.14 + i * 0.11
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
                  aria-label="World map with supply routes from India to North America, Latin America, Europe, the Middle East, Africa and Asia Pacific"
                >
                  <path d={WORLD_LAND_D} fill="#26344d" stroke="#3a4a68" strokeWidth="0.5" strokeLinejoin="round" />

                  {/* routes — drawn by scroll */}
                  <g fill="none" stroke="#c2a06a" strokeLinecap="round">
                    {NODES.map((n, i) => {
                      const seg = easeInOut(slice(progress, 0.12 + i * 0.1, 0.32 + i * 0.1))
                      return (
                        <path
                          key={n.name}
                          d={routeD(n)}
                          strokeWidth="1.1"
                          opacity="0.85"
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
                    const dotOn = reduced ? 1 : slice(progress, 0.28 + i * 0.1, 0.36 + i * 0.1)
                    const anchor = n.place === 'end' ? 'end' : n.place === 'start' ? 'start' : 'middle'
                    const dx = n.place === 'end' ? -7 : n.place === 'start' ? 7 : 0
                    const ly = y - 9
                    const w = n.name.length * 6.2 + 8
                    const lx = x + dx - (anchor === 'end' ? w - 4 : anchor === 'start' ? 4 : w / 2)
                    return (
                      <g key={`m-${n.name}`}>
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

                  {/* origin: India */}
                  <g opacity={originOn}>
                    {!reduced && (
                      <circle cx={ox} cy={oy} r="3" fill="none" stroke="#c2a06a" strokeWidth="0.8">
                        <animate attributeName="r" values="3;12;3" dur="3.6s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.9;0;0.9" dur="3.6s" repeatCount="indefinite" />
                      </circle>
                    )}
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
