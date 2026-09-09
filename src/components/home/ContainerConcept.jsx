import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { useScrollProgress, easeInOut, slice } from '../../hooks/useScrollProgress'

/*
 * Signature scroll story. A shipping container is pinned; as the visitor
 * scrolls it runs through five phases —
 *   requirement → coordination → loading → organised load → one source.
 * Plain SVG + transform/opacity, scroll-linked, reduced-motion safe.
 */

const VB_W = 660
const VB_H = 430

// container interior grid
const BOX = { x: 168, y: 118, w: 360, h: 224 }
const DOOR = 30
const COLS = [
  BOX.x + DOOR + 66,
  BOX.x + DOOR + 66 + 100,
  BOX.x + DOOR + 66 + 200,
]
const ROWS = [BOX.y + 66, BOX.y + 160]
const CENTER = { x: BOX.x + BOX.w / 2, y: BOX.y + BOX.h / 2 }

const ITEMS = [
  { key: 'fibc', label: 'FIBC' },
  { key: 'woven', label: 'Woven Bags' },
  { key: 'bopp', label: 'BOPP' },
  { key: 'corrugated', label: 'Corrugated' },
  { key: 'filter', label: 'Filter Bags' },
  { key: 'custom', label: 'Custom' },
].map((it, i) => ({
  ...it,
  // resting position inside the container
  tx: COLS[i % 3],
  ty: ROWS[Math.floor(i / 3)],
  // requirement marker start position (ring around the centre)
  mx: CENTER.x + Math.cos((i / 6) * Math.PI * 2 - Math.PI / 2) * 250,
  my: CENTER.y + Math.sin((i / 6) * Math.PI * 2 - Math.PI / 2) * 150,
  // coordination gather point (tight ring)
  gx: CENTER.x + Math.cos((i / 6) * Math.PI * 2 - Math.PI / 2) * 60,
  gy: CENTER.y + Math.sin((i / 6) * Math.PI * 2 - Math.PI / 2) * 40,
}))

const PHASES = ['Requirement', 'Coordination', 'Loading', 'Organised load', 'One source']

/* clean product silhouettes, ~62 x 74, drawn around (0,0) top-left */
function Silhouette({ kind }) {
  const s = { fill: '#c2a06a', fillOpacity: 0.12, stroke: '#c2a06a', strokeOpacity: 0.55, strokeWidth: 1.3, strokeLinejoin: 'round' }
  switch (kind) {
    case 'fibc':
      return (
        <g {...s}>
          <path d="M8 16 h46 v54 q0 4 -4 4 h-38 q-4 0 -4 -4 z" />
          <path d="M26 16 v-9 q0 -3 3 -3 M36 16 v-9 q0 -3 3 -3" fill="none" />
          <rect x="26" y="6" width="10" height="8" />
        </g>
      )
    case 'woven':
      return (
        <g {...s}>
          <path d="M20 12 q-4 4 -6 14 l-4 40 q-1 6 5 6 h32 q6 0 5 -6 l-4 -40 q-2 -10 -6 -14 z" />
          <path d="M20 12 q10 -5 22 0" fill="none" />
        </g>
      )
    case 'bopp':
      return (
        <g {...s}>
          <path d="M20 12 q-4 4 -6 14 l-4 40 q-1 6 5 6 h32 q6 0 5 -6 l-4 -40 q-2 -10 -6 -14 z" />
          <rect x="17" y="26" width="28" height="30" fillOpacity="0.22" />
        </g>
      )
    case 'corrugated':
      return (
        <g {...s}>
          <path d="M8 24 h46 v46 h-46 z" />
          <path d="M8 24 l23 -12 l23 12 M31 12 v58 M8 24 l0 -0" fill="none" />
        </g>
      )
    case 'filter':
      return (
        <g {...s}>
          <rect x="22" y="12" width="18" height="6" />
          <path d="M20 18 h22 v52 q0 4 -4 4 h-14 q-4 0 -4 -4 z" />
          <path d="M20 30 h22 M20 44 h22" fill="none" strokeOpacity="0.3" />
        </g>
      )
    default:
      return (
        <g {...s}>
          <path d="M18 14 q-3 3 -5 12 l-4 42 q-1 6 5 6 h32 q6 0 5 -6 l-4 -42 q-2 -9 -5 -12 z" strokeDasharray="3 3" />
        </g>
      )
  }
}

export function ContainerConcept() {
  const { ref, progress, reduced } = useScrollProgress({ start: 0.92, end: 0.06 })
  const P = reduced ? 1 : progress

  // phase timings
  const marker = (i) => (reduced ? 0 : slice(P, 0.04 + i * 0.02, 0.16 + i * 0.02)) // 0→1 appear
  const gather = easeInOut(slice(P, 0.2, 0.42))
  const markerFade = 1 - slice(P, 0.4, 0.5)
  const ventura = slice(P, 0.22, 0.3) * (1 - slice(P, 0.44, 0.52))
  const load = (i) => easeInOut(slice(P, 0.46 + i * 0.045, 0.58 + i * 0.045))
  const tags = slice(P, 0.76, 0.84) * (1 - slice(P, 0.9, 0.96))
  const doors = easeInOut(slice(P, 0.88, 0.955))
  const endMsg = slice(P, 0.93, 1)
  const focus = slice(P, 0.44, 0.5) - slice(P, 0.86, 0.94) // container emphasis 0..1..0

  const phaseIdx = reduced
    ? 4
    : P < 0.2 ? 0 : P < 0.44 ? 1 : P < 0.76 ? 2 : P < 0.9 ? 3 : 4

  return (
    <section ref={ref} className="relative bg-ink text-ivory h-[240vh] lg:h-[340vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <Container className="w-full">
          <div className="grid items-center gap-x-16 gap-y-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3">
                <p className="text-label font-semibold uppercase tracking-label text-gold-soft">
                  Specification-driven supply
                </p>
                <span className="text-[0.66rem] uppercase tracking-widelabel text-ivory/35">
                  {PHASES[phaseIdx]}
                </span>
              </div>
              <h2 className="mt-4 text-[1.55rem] leading-[1.12] text-ivory sm:mt-5 sm:text-[2.35rem]">
                One container.
                <br />
                Built around your requirements.
              </h2>
              <p className="mt-4 hidden max-w-md text-[1rem] leading-[1.7] text-ivory/60 sm:mt-5 sm:block">
                Multiple packaging requirements can be coordinated into a consolidated supply plan,
                subject to product compatibility, quantities and logistics.
              </p>
              <div className="mt-6 hidden sm:mt-9 sm:block">
                <Button to="/request-a-quote" variant="outlineLight">
                  Request a Quote
                </Button>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="relative border border-white/10 bg-[#141f33] p-3 sm:p-5">
                <svg
                  viewBox={`0 0 ${VB_W} ${VB_H}`}
                  className="block w-full"
                  role="img"
                  aria-label="A shipping container being loaded with FIBC, woven, BOPP, corrugated, filter and customized packaging, coordinated through Ventura"
                >
                  <defs>
                    <clipPath id="cc-interior">
                      <rect x={BOX.x + DOOR} y={BOX.y + 4} width={BOX.w - DOOR - 6} height={BOX.h - 8} />
                    </clipPath>
                  </defs>

                  {/* coordination lines: requirement marker -> centre */}
                  <g stroke="#c2a06a" strokeOpacity="0.28" strokeWidth="1" fill="none">
                    {ITEMS.map((it, i) => {
                      const a = marker(i) * markerFade
                      if (a <= 0.01 || gather <= 0.01) return null
                      const x = it.mx + (it.gx - it.mx) * gather
                      const y = it.my + (it.gy - it.my) * gather
                      return <line key={it.key} x1={x} y1={y} x2={CENTER.x} y2={CENTER.y} opacity={a * gather} />
                    })}
                  </g>

                  {/* centre coordination node */}
                  <g opacity={reduced ? 0 : ventura} textAnchor="middle">
                    <circle cx={CENTER.x} cy={CENTER.y} r="20" fill="#c2a06a" fillOpacity="0.08" stroke="#c2a06a" strokeOpacity="0.4" />
                    <text x={CENTER.x} y={CENTER.y + 3} fill="#e9dcc0" fontSize="10" letterSpacing="2">VENTURA</text>
                  </g>

                  {/* container shell */}
                  <g
                    style={{
                      transform: reduced ? 'none' : `scale(${1 + focus * 0.02})`,
                      transformOrigin: `${CENTER.x}px ${CENTER.y}px`,
                      transition: 'transform 200ms linear',
                    }}
                  >
                    <rect x={BOX.x} y={BOX.y} width={BOX.w} height={BOX.h} fill="#101a2e" stroke="#3a4a68" strokeWidth="2" />
                    {/* corrugation */}
                    <g stroke="#26364f" strokeWidth="5">
                      <line x1={BOX.x + DOOR + 4} y1={BOX.y + 6} x2={BOX.x + BOX.w - 6} y2={BOX.y + 6} />
                      <line x1={BOX.x + DOOR + 4} y1={BOX.y + BOX.h - 6} x2={BOX.x + BOX.w - 6} y2={BOX.y + BOX.h - 6} />
                    </g>
                    {/* left door */}
                    <rect x={BOX.x} y={BOX.y} width={DOOR} height={BOX.h} fill="#1b2740" stroke="#3a4a68" strokeWidth="2" />
                    {[8, 15, 22].map((d) => (
                      <line key={d} x1={BOX.x + d} y1={BOX.y + 8} x2={BOX.x + d} y2={BOX.y + BOX.h - 8} stroke="#2c3c5a" strokeWidth="1.6" />
                    ))}
                    <circle cx={BOX.x + 15} cy={CENTER.y} r="3.5" fill="#c2a06a" />

                    {/* products loading in */}
                    <g clipPath="url(#cc-interior)">
                      {ITEMS.map((it, i) => {
                        const l = load(i)
                        const fromX = VB_W + 30 + i * 14
                        const x = reduced ? it.tx : fromX + (it.tx - fromX) * l
                        const op = reduced ? 1 : slice(P, 0.46 + i * 0.045, 0.52 + i * 0.045)
                        return (
                          <g key={it.key} transform={`translate(${x - 31} ${it.ty - 37})`} opacity={op}>
                            <Silhouette kind={it.key} />
                          </g>
                        )
                      })}
                    </g>

                    {/* closing doors */}
                    <g opacity={reduced ? 0 : doors > 0.01 ? 1 : 0}>
                      <rect
                        x={BOX.x + DOOR}
                        y={BOX.y}
                        width={(BOX.w - DOOR) / 2}
                        height={BOX.h}
                        fill="#16223a"
                        stroke="#3a4a68"
                        strokeWidth="1.4"
                        transform={`translate(${doors * ((BOX.w - DOOR) / 2)} 0)`}
                      />
                      <rect
                        x={BOX.x + BOX.w - (BOX.w - DOOR) / 2}
                        y={BOX.y}
                        width={(BOX.w - DOOR) / 2}
                        height={BOX.h}
                        fill="#16223a"
                        stroke="#3a4a68"
                        strokeWidth="1.4"
                        transform={`translate(${-doors * ((BOX.w - DOOR) / 2)} 0)`}
                      />
                    </g>
                  </g>

                  {/* requirement markers (labels orbiting the container) */}
                  <g>
                    {ITEMS.map((it, i) => {
                      const a = marker(i) * markerFade
                      if (a <= 0.01) return null
                      const x = it.mx + (it.gx - it.mx) * gather
                      const y = it.my + (it.gy - it.my) * gather
                      const wpx = it.label.length * 5.6 + 16
                      return (
                        <g key={it.key} transform={`translate(${x} ${y})`} opacity={a}>
                          <rect x={-wpx / 2} y={-9} width={wpx} height={18} rx="1" fill="#14213a" stroke="#3a4a68" strokeWidth="1" />
                          <text x="0" y="3.5" textAnchor="middle" fill="#cdd3e2" fontSize="8.5" letterSpacing="0.08em" style={{ textTransform: 'uppercase' }}>
                            {it.label}
                          </text>
                        </g>
                      )
                    })}
                    {/* "YOUR REQUIREMENTS" */}
                    <text
                      x={CENTER.x}
                      y={BOX.y - 24}
                      textAnchor="middle"
                      fill="#e6dcc6"
                      fontSize="9"
                      letterSpacing="0.2em"
                      opacity={reduced ? 0 : slice(P, 0.02, 0.1) * (1 - slice(P, 0.16, 0.24))}
                      style={{ textTransform: 'uppercase' }}
                    >
                      Your requirements
                    </text>
                  </g>

                  {/* organised-load tags */}
                  <g opacity={reduced ? 0 : tags} textAnchor="middle" fill="#9aa4bd" fontSize="7.5" letterSpacing="0.12em" style={{ textTransform: 'uppercase' }}>
                    {['Specification', 'Quantity', 'Compatibility', 'Logistics'].map((t, i) => (
                      <text key={t} x={BOX.x + 40 + i * ((BOX.w - 80) / 3)} y={BOX.y + BOX.h + 22}>
                        {t}
                      </text>
                    ))}
                  </g>

                  {/* final message */}
                  <g
                    opacity={reduced ? 0 : endMsg}
                    textAnchor="middle"
                    style={{ transform: reduced ? 'none' : `scale(${0.96 + endMsg * 0.04})`, transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
                  >
                    <rect x={BOX.x} y={BOX.y} width={BOX.w} height={BOX.h} fill="#101a2e" opacity={endMsg * 0.9} />
                    <text x={CENTER.x} y={CENTER.y - 16} fill="#e9dcc0" fontSize="16" fontWeight="600" letterSpacing="3">
                      ONE SOURCE
                    </text>
                    <text x={CENTER.x} y={CENTER.y + 8} fill="#c9cede" fontSize="11" letterSpacing="2">
                      MULTIPLE PACKAGING SOLUTIONS
                    </text>
                    <text x={CENTER.x} y={CENTER.y + 34} fill="#c2a06a" fontSize="10" letterSpacing="4">
                      VENTURA
                    </text>
                  </g>
                </svg>

                <p
                  className="mt-4 text-[0.78rem] leading-relaxed text-ivory/40"
                  style={{ opacity: reduced ? 1 : 0.4 + slice(P, 0.9, 1) * 0.6 }}
                >
                  Conceptual. Consolidated loading depends on product compatibility, quantities,
                  loading constraints and supplier capability, and is confirmed per shipment.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}
