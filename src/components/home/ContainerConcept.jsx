import { useEffect, useRef, useState } from 'react'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

/*
 * "One container, configured around your specifications." A shipping
 * container whose bays fill in — one packaging format at a time — as the
 * section scrolls into view. Conceptual, not an operational promise.
 * Plain SVG + CSS transitions; simplifies to static on reduced-motion.
 */

const BAYS = [
  { l1: 'FIBC /', l2: 'Jumbo Bags' },
  { l1: 'PP & HDPE', l2: 'Woven Bags' },
  { l1: 'BOPP', l2: 'Laminated Bags' },
  { l1: 'Corrugated', l2: 'Cartons' },
  { l1: 'Industrial', l2: 'Filter Bags' },
  { l1: 'Customized', l2: 'Packaging' },
]

// bay geometry inside the container interior (viewBox 520 x 316, 64px door)
const COLS = 2
const X0 = 100
const Y0 = 36
const W = 186
const H = 76
const GAP = 10

export function ContainerConcept() {
  const reduced = usePrefersReducedMotion()
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (reduced || typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }
    const el = ref.current
    if (!el) return
    let done = false
    const reveal = () => {
      if (done) return
      done = true
      setShown(true)
    }
    const io = new IntersectionObserver(
      (entries) => entries.some((e) => e.isIntersecting) && (reveal(), io.disconnect()),
      { rootMargin: '0px 0px -15% 0px', threshold: 0.01 },
    )
    io.observe(el)
    const t = setTimeout(reveal, 1600)
    return () => {
      io.disconnect()
      clearTimeout(t)
    }
  }, [reduced])

  return (
    <section className="bg-ink text-ivory">
      <Container className="py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-label font-semibold uppercase tracking-label text-gold-soft">
                Specification-driven supply
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 text-[1.8rem] leading-[1.15] text-ivory sm:text-[2.2rem]">
                One container. Configured around your specifications.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-md text-[1rem] leading-[1.7] text-ivory/60">
                Need more than one packaging format? Where product compatibility, quantities and
                logistics allow, Ventura can coordinate suitable product combinations into a
                consolidated supply plan — reducing the need to manage separate sourcing
                relationships.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-8 flex flex-wrap gap-x-3 gap-y-1 text-[0.72rem] font-semibold uppercase tracking-widelabel text-ivory/45">
                <span>One container</span>
                <span aria-hidden="true" className="text-gold/60">·</span>
                <span>Multiple requirements</span>
                <span aria-hidden="true" className="text-gold/60">·</span>
                <span>One sourcing partner</span>
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-9">
                <Button to="/request-a-quote" variant="outlineLight">
                  Request a Quote
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <div ref={ref} className="border border-white/10 bg-[#141f33] p-4 sm:p-6">
                <svg
                  viewBox="0 0 520 316"
                  className="block w-full"
                  role="img"
                  aria-label="Conceptual shipping container with bays for FIBC, PP and HDPE woven, BOPP laminated, corrugated cartons, industrial filter bags and customized packaging"
                >
                  {/* container shell */}
                  <rect x="20" y="20" width="480" height="276" fill="none" stroke="#3a4a68" strokeWidth="2" />
                  {/* left door */}
                  <rect x="20" y="20" width="72" height="276" fill="#1b2740" stroke="#3a4a68" strokeWidth="2" />
                  {[34, 48, 62, 76].map((x) => (
                    <line key={x} x1={x} y1="30" x2={x} y2="286" stroke="#324162" strokeWidth="2" />
                  ))}
                  <circle cx="56" cy="158" r="4" fill="#c2a06a" />
                  {/* corrugated top / bottom hint */}
                  {[26, 290].map((y) => (
                    <line key={y} x1="98" y1={y} x2="494" y2={y} stroke="#28374f" strokeWidth="6" />
                  ))}

                  {/* bays */}
                  {BAYS.map((bay, i) => {
                    const col = i % COLS
                    const row = Math.floor(i / COLS)
                    const x = X0 + col * (W + GAP)
                    const y = Y0 + row * (H + GAP)
                    return (
                      <g
                        key={bay.l1 + bay.l2}
                        style={
                          reduced
                            ? undefined
                            : {
                                opacity: shown ? 1 : 0,
                                transform: shown ? 'none' : 'translateY(10px)',
                                transition:
                                  'opacity 600ms cubic-bezier(0.22,1,0.36,1), transform 600ms cubic-bezier(0.22,1,0.36,1)',
                                transitionDelay: shown ? `${i * 150}ms` : '0ms',
                              }
                        }
                      >
                        <rect
                          x={x}
                          y={y}
                          width={W}
                          height={H}
                          fill="#c2a06a"
                          fillOpacity="0.10"
                          stroke="#c2a06a"
                          strokeOpacity="0.4"
                          strokeWidth="1"
                        />
                        <text x={x + W / 2} y={y + H / 2 - 4} textAnchor="middle" fill="#e6dcc6" fontSize="13" fontWeight="500">
                          {bay.l1}
                        </text>
                        <text x={x + W / 2} y={y + H / 2 + 14} textAnchor="middle" fill="#e6dcc6" fillOpacity="0.65" fontSize="12">
                          {bay.l2}
                        </text>
                      </g>
                    )
                  })}
                </svg>
              </div>
            </Reveal>
            <Reveal>
              <p className="mt-4 text-[0.78rem] leading-relaxed text-ivory/40">
                Conceptual. Consolidated loading depends on product compatibility, quantities,
                loading constraints and supplier capability, and is confirmed per shipment.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
