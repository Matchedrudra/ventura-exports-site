import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { useScrollProgress, easeInOut, slice } from '../../hooks/useScrollProgress'

/*
 * Signature scroll experience. A shipping container is pinned on screen; as
 * the visitor scrolls, packaging categories glide in and settle into an
 * ordered load, the doors close, and the section resolves to the Ventura
 * message. Pure SVG + transform/opacity, scroll-linked, reduced-motion safe.
 */

const VB_W = 620
const VB_H = 360
const DOOR = 76
const INNER_X = 20 + DOOR + 8 // first bay x
const COLS = 2
const BAY_W = 232
const BAY_H = 92
const GAP = 12
const TOP = 34

const BAYS = [
  { l1: 'FIBC /', l2: 'Jumbo Bags' },
  { l1: 'PP & HDPE', l2: 'Woven Bags' },
  { l1: 'BOPP', l2: 'Laminated Bags' },
  { l1: 'Corrugated', l2: 'Boxes' },
  { l1: 'Industrial', l2: 'Filter Bags' },
  { l1: 'Custom', l2: 'Packaging' },
]

function bayXY(i) {
  const col = i % COLS
  const row = Math.floor(i / COLS)
  return { x: INNER_X + col * (BAY_W + GAP), y: TOP + row * (BAY_H + GAP) }
}

export function ContainerConcept() {
  const { ref, progress, reduced } = useScrollProgress({ start: 0.9, end: 0.1 })

  // choreography windows (fractions of the pinned scroll)
  const introDone = slice(progress, 0.02, 0.1)
  const doors = easeInOut(slice(progress, 0.72, 0.86)) // 0 open → 1 closed
  const settle = easeInOut(slice(progress, 0.62, 0.74))
  const endText = slice(progress, 0.84, 0.98)
  const loaded = Math.round(slice(progress, 0.12, 0.66) * BAYS.length)

  return (
    <section ref={ref} className="relative bg-ink text-ivory lg:h-[280vh]">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:overflow-hidden">
        <Container className="w-full py-20 lg:py-0">
          <div className="grid items-center gap-x-16 gap-y-12 lg:grid-cols-12">
            {/* copy */}
            <div className="lg:col-span-4">
              <p
                className="text-label font-semibold uppercase tracking-label text-gold-soft"
                style={{ opacity: reduced ? 1 : 0.3 + introDone * 0.7 }}
              >
                Specification-driven supply
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
                className="mt-8 flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-widelabel text-ivory/45"
                aria-hidden="true"
              >
                <span className={loaded > 0 ? 'text-ivory/70' : ''}>One container</span>
                <span className="h-px w-4 bg-gold/50" />
                <span className={loaded >= 3 ? 'text-ivory/70' : ''}>Multiple needs</span>
                <span className="h-px w-4 bg-gold/50" />
                <span className={endText > 0.4 ? 'text-gold-soft' : ''}>Ventura</span>
              </div>

              <div className="mt-9">
                <Button to="/request-a-quote" variant="outlineLight">
                  Request a Quote
                </Button>
              </div>
            </div>

            {/* container */}
            <div className="lg:col-span-8">
              <div className="relative border border-white/10 bg-[#141f33] p-4 sm:p-6">
                <svg
                  viewBox={`0 0 ${VB_W} ${VB_H}`}
                  className="block w-full"
                  role="img"
                  aria-label="A shipping container being loaded with FIBC, PP and HDPE woven, BOPP laminated, corrugated, industrial filter and customized packaging"
                >
                  <defs>
                    <clipPath id="cc-hold">
                      <rect x="20" y="18" width={VB_W - 40} height={VB_H - 36} />
                    </clipPath>
                  </defs>

                  {/* shell */}
                  <rect
                    x="20"
                    y="18"
                    width={VB_W - 40}
                    height={VB_H - 36}
                    fill="none"
                    stroke="#3a4a68"
                    strokeWidth="2"
                    style={{
                      transform: reduced ? 'none' : `scale(${1 - settle * 0.012})`,
                      transformOrigin: 'center',
                      transition: 'transform 200ms linear',
                    }}
                  />
                  {/* corrugation hints */}
                  <g stroke="#26364f" strokeWidth="6">
                    <line x1={20 + DOOR + 4} y1="24" x2={VB_W - 24} y2="24" />
                    <line x1={20 + DOOR + 4} y1={VB_H - 24} x2={VB_W - 24} y2={VB_H - 24} />
                  </g>

                  {/* bays + packages */}
                  <g clipPath="url(#cc-hold)">
                    {BAYS.map((bay, i) => {
                      const { x, y } = bayXY(i)
                      const p = easeInOut(slice(progress, 0.12 + i * 0.085, 0.24 + i * 0.085))
                      const fromX = VB_W + 40 // enter from off the right edge
                      const tx = reduced ? 0 : (1 - p) * (fromX - x)
                      const op = reduced ? 1 : slice(progress, 0.12 + i * 0.085, 0.19 + i * 0.085)
                      return (
                        <g key={bay.l1 + bay.l2} transform={`translate(${tx} 0)`} opacity={op}>
                          <rect
                            x={x}
                            y={y}
                            width={BAY_W}
                            height={BAY_H}
                            fill="#c2a06a"
                            fillOpacity={0.09 + doors * 0.04}
                            stroke="#c2a06a"
                            strokeOpacity="0.4"
                            strokeWidth="1"
                          />
                          <text x={x + BAY_W / 2} y={y + BAY_H / 2 - 3} textAnchor="middle" fill="#e6dcc6" fontSize="15" fontWeight="500">
                            {bay.l1}
                          </text>
                          <text x={x + BAY_W / 2} y={y + BAY_H / 2 + 16} textAnchor="middle" fill="#e6dcc6" fillOpacity="0.62" fontSize="13">
                            {bay.l2}
                          </text>
                        </g>
                      )
                    })}
                  </g>

                  {/* left door frame (static) */}
                  <rect x="20" y="18" width={DOOR} height={VB_H - 36} fill="#1b2740" stroke="#3a4a68" strokeWidth="2" />
                  {[34, 48, 62, 76].map((dx) => (
                    <line key={dx} x1={dx} y1="26" x2={dx} y2={VB_H - 26} stroke="#2c3c5a" strokeWidth="2" />
                  ))}
                  <circle cx="56" cy={VB_H / 2} r="4" fill="#c2a06a" />

                  {/* closing doors (right pair) */}
                  <g style={{ opacity: reduced ? 0 : doors > 0.02 ? 1 : 0 }}>
                    <rect
                      x={VB_W - 20}
                      y="18"
                      width={(VB_W - 40 - DOOR) / 2}
                      height={VB_H - 36}
                      fill="#18233a"
                      stroke="#3a4a68"
                      strokeWidth="1.5"
                      transform={`translate(${-doors * ((VB_W - 40 - DOOR) / 2)} 0)`}
                    />
                    <rect
                      x={20 + DOOR}
                      y="18"
                      width={(VB_W - 40 - DOOR) / 2}
                      height={VB_H - 36}
                      fill="#18233a"
                      stroke="#3a4a68"
                      strokeWidth="1.5"
                      transform={`translate(${doors * ((VB_W - 40 - DOOR) / 2)} 0)`}
                    />
                    {[0.28, 0.5, 0.72].map((f) => (
                      <line
                        key={f}
                        x1={20 + DOOR + (VB_W - 40 - DOOR) * f}
                        y1="26"
                        x2={20 + DOOR + (VB_W - 40 - DOOR) * f}
                        y2={VB_H - 26}
                        stroke="#2c3c5a"
                        strokeWidth="2"
                        style={{ opacity: doors }}
                      />
                    ))}
                  </g>

                  {/* resolved message */}
                  <g style={{ opacity: reduced ? 0 : endText }} textAnchor="middle">
                    <text x={VB_W / 2} y={VB_H / 2 - 12} fill="#e9dcc0" fontSize="17" fontWeight="600" letterSpacing="3">
                      ONE SOURCE
                    </text>
                    <text x={VB_W / 2} y={VB_H / 2 + 14} fill="#c9cede" fontSize="12.5" letterSpacing="2">
                      MULTIPLE PACKAGING SOLUTIONS
                    </text>
                  </g>
                </svg>

                {/* HTML end-line under the SVG, revealed last */}
                <p
                  className="mt-5 font-serif text-[1.15rem] leading-snug text-ivory sm:text-[1.35rem]"
                  style={{
                    opacity: reduced ? 1 : endText,
                    transform: reduced ? 'none' : `translateY(${(1 - endText) * 8}px)`,
                  }}
                >
                  One source. Multiple packaging solutions.
                </p>
                <p className="mt-2 text-[0.78rem] leading-relaxed text-ivory/40">
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
