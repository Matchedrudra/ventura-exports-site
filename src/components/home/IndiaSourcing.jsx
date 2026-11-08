import { useEffect, useRef, useState } from 'react'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { VIEWBOXES, POINTS } from './worldMapMeta'
import { indiaCopy, marketsOfInterest } from '../../data/textiles'

/*
 * "India as Your Textile Sourcing Destination."
 *
 * A geographically accurate trade map. Country shapes are Natural Earth 1:10m
 * (India point-of-view edition, so India appears with its officially depicted
 * boundary), projected with D3's Natural Earth projection at build time
 * (scripts/build-world-map.mjs); every marker below is that same projection of
 * a real latitude/longitude, so nothing is positioned by eye. Origin is
 * Ahmedabad, Gujarat; destinations are national capitals.
 *
 * The path data (~160 KB) is loaded only when the section is about to be seen.
 * When it scrolls into view, routes draw outward from India one after another;
 * reduced motion shows the finished map immediately.
 */

const ORIGIN = POINTS.origin

// Destinations in reveal order. `label` is the offset of the text from its
// marker in on-screen pixels, `bow` how far the route arcs (fraction of its length).
const DESTINATIONS = [
  { key: 'germany', bow: 0.2, label: { dx: -10, dy: 4, anchor: 'end' } },
  { key: 'turkey', bow: 0.26, label: { dx: -10, dy: 4, anchor: 'end' } },
  { key: 'israel', bow: 0.34, label: { dx: 9, dy: 17, anchor: 'start' } },
  { key: 'egypt', bow: 0.3, label: { dx: -10, dy: 13, anchor: 'end' } },
  { key: 'bangladesh', bow: 0.5, label: { dx: 2, dy: 21, anchor: 'middle' } },
  { key: 'vietnam', bow: 0.34, label: { dx: 10, dy: 4, anchor: 'start' }, compact: { dx: 4, dy: 32, anchor: 'middle' } },
]

const STEP = 0.22 // seconds between routes
const DRAW = 1.5 // seconds to draw one route
const LEAD = 0.5

const GOLD = '#d3b982'

function routePath(from, to, bow) {
  const mx = (from.x + to.x) / 2
  const my = (from.y + to.y) / 2
  const dx = to.x - from.x
  const dy = to.y - from.y
  const dist = Math.hypot(dx, dy) || 1
  let nx = -dy / dist
  let ny = dx / dist
  if (ny > 0) {
    nx = -nx
    ny = -ny
  }
  const off = dist * bow
  return `M${from.x} ${from.y} Q${(mx + nx * off).toFixed(1)} ${(my + ny * off).toFixed(1)} ${to.x} ${to.y}`
}

function vbParts(vb) {
  const [x, y, w, h] = vb.split(' ').map(Number)
  return { x, y, w, h }
}

export function IndiaSourcing() {
  const reduced = usePrefersReducedMotion()
  const sectionRef = useRef(null)
  const mapRef = useRef(null)

  const [geo, setGeo] = useState(null) // lazily loaded path data
  const [seen, setSeen] = useState(false)
  const [compact, setCompact] = useState(false)
  const [width, setWidth] = useState(800)

  // load the heavy geometry shortly before the section is reached
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    let cancelled = false
    const load = () => import('./worldMap.json').then((m) => !cancelled && setGeo(m.default))
    if (typeof IntersectionObserver === 'undefined') {
      load()
      return () => {
        cancelled = true
      }
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          load()
          io.disconnect()
        }
      },
      { rootMargin: '900px 0px' },
    )
    io.observe(el)
    return () => {
      cancelled = true
      io.disconnect()
    }
  }, [])

  // start the reveal once the map itself is on screen
  useEffect(() => {
    const el = mapRef.current
    if (!el) return
    if (reduced || typeof IntersectionObserver === 'undefined') {
      setSeen(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.25 },
    )
    io.observe(el)
    const t = setTimeout(() => setSeen(true), 6000)
    return () => {
      io.disconnect()
      clearTimeout(t)
    }
  }, [reduced])

  // tighter crop on phones; track rendered width so text stays a constant size
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const onMq = () => setCompact(mq.matches)
    onMq()
    mq.addEventListener('change', onMq)
    let ro
    if (mapRef.current && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width || 800))
      ro.observe(mapRef.current)
    }
    return () => {
      mq.removeEventListener('change', onMq)
      ro?.disconnect()
    }
  }, [])

  const vbKey = compact ? 'mobile' : 'desktop'
  const vbStr = VIEWBOXES[vbKey]
  const vb = vbParts(vbStr)
  const k = vb.w / Math.max(width, 1) // user units per screen pixel
  const go = seen && geo
  const animate = !reduced

  const t = (delay, dur = 0.8) => (animate ? `opacity ${dur}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s` : 'none')
  const arrive = (i) => LEAD + i * STEP + DRAW * 0.82

  return (
    <section id="markets" ref={sectionRef} className="scroll-mt-24 overflow-hidden bg-ink text-ivory">
      <Container className="py-24 lg:py-32">
        <div className="grid items-center gap-x-14 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="mb-4 flex items-center gap-3 text-[0.66rem] font-semibold uppercase leading-none tracking-[0.2em] text-gold-soft">
                <span aria-hidden="true" className="h-px w-8 bg-gold-soft/70" />
                International trade
              </p>
              <h2 className="font-serif text-[1.85rem] font-medium leading-[1.15] text-ivory sm:text-[2.15rem] lg:text-[2.4rem]">
                India as Your Textile Sourcing Destination.
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-5 max-w-sm text-[0.98rem] leading-[1.8] text-ivory/65">{indiaCopy}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-ivory/45">Markets of interest</p>
              <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-[0.9rem] text-ivory/80">
                {marketsOfInterest.map((m, i) => (
                  <li key={m} className="flex items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className="h-px w-4 transition-colors duration-700"
                      style={{
                        background: go ? GOLD : 'rgba(255,255,255,0.25)',
                        transitionDelay: animate && i < DESTINATIONS.length ? `${arrive(i)}s` : '0s',
                      }}
                    />
                    {m}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-8 lg:-mr-10 xl:-mr-14">
            <div
              ref={mapRef}
              className="relative w-full"
              style={{
                aspectRatio: `${vb.w} / ${vb.h}`,
                WebkitMaskImage: 'radial-gradient(ellipse 72% 78% at 52% 50%, #000 62%, transparent 100%)',
                maskImage: 'radial-gradient(ellipse 72% 78% at 52% 50%, #000 62%, transparent 100%)',
              }}
            >
              <svg
                viewBox={vbStr}
                className="absolute inset-0 h-full w-full"
                role="img"
                aria-label="Map showing trade routes from Ahmedabad, India to Germany, Turkey, Israel, Egypt, Bangladesh and Vietnam"
              >
                <defs>
                  <filter id="india-glow" x="-10%" y="-10%" width="120%" height="120%">
                    <feGaussianBlur stdDeviation={2.4 * k} />
                  </filter>
                  <filter id="route-glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation={2.2 * k} result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {geo && (
                  <g>
                    <path d={geo.GRATICULE_D} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
                    <path
                      d={geo.BASE_D}
                      fill="#1f2d49"
                      stroke="rgba(160,178,212,0.28)"
                      strokeWidth="0.6"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                    {DESTINATIONS.map((d, i) => (
                      <path
                        key={d.key}
                        d={geo.HIGHLIGHT_D[d.key]}
                        fill={go ? '#28395a' : '#1f2d49'}
                        stroke={go ? 'rgba(211,185,130,0.6)' : 'rgba(160,178,212,0.28)'}
                        strokeWidth="0.7"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                        style={{ transition: animate ? `fill 1.2s ease ${arrive(i)}s, stroke 1.2s ease ${arrive(i)}s` : 'none' }}
                      />
                    ))}
                    <path
                      d={geo.HIGHLIGHT_D.india}
                      fill={go ? '#2c3c5f' : '#1f2d49'}
                      style={{ transition: animate ? 'fill 1.4s ease 0.1s' : 'none' }}
                    />
                    <path
                      d={geo.HIGHLIGHT_D.india}
                      fill="rgba(214,186,128,0.21)"
                      style={{ opacity: go || !animate ? 1 : 0, transition: animate ? 'opacity 1.4s ease 0.1s' : 'none' }}
                    />
                    <path
                      d={geo.HIGHLIGHT_D.india}
                      fill="none"
                      stroke={GOLD}
                      strokeWidth={2.2 * k}
                      strokeLinejoin="round"
                      filter="url(#india-glow)"
                      style={{ opacity: go || !animate ? 0.4 : 0, transition: animate ? 'opacity 1.6s ease 0.1s' : 'none' }}
                    />
                    <path
                      d={geo.HIGHLIGHT_D.india}
                      fill="none"
                      stroke="rgba(226,205,160,0.95)"
                      strokeWidth="0.8"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </g>
                )}

                {geo && (
                  <>
                    {/* routes */}
                    <g fill="none" stroke={GOLD} strokeLinecap="round" filter="url(#route-glow)">
                      {DESTINATIONS.map((d, i) => (
                        <path
                          key={d.key}
                          d={routePath(ORIGIN, POINTS[d.key], d.bow)}
                          strokeWidth={1.2 * k}
                          pathLength="1"
                          strokeDasharray="1"
                          strokeDashoffset={go || !animate ? 0 : 1}
                          opacity="0.9"
                          style={{
                            transition: animate ? `stroke-dashoffset ${DRAW}s cubic-bezier(0.4, 0, 0.2, 1) ${LEAD + i * STEP}s` : 'none',
                          }}
                        />
                      ))}
                    </g>

                    {/* destination markers + labels */}
                    {DESTINATIONS.map((d, i) => {
                      const p = POINTS[d.key]
                      const lab = compact && d.compact ? d.compact : d.label
                      return (
                        <g key={d.key} style={{ opacity: go || !animate ? 1 : 0, transition: t(arrive(i), 0.9) }}>
                          <circle cx={p.x} cy={p.y} r={5 * k} fill="rgba(211,185,130,0.16)" />
                          <circle cx={p.x} cy={p.y} r={2.6 * k} fill={GOLD} />
                          <circle cx={p.x} cy={p.y} r={4.4 * k} fill="none" stroke={GOLD} strokeWidth={0.8 * k} opacity="0.7" />
                          <text
                            x={p.x + lab.dx * k}
                            y={p.y + lab.dy * k}
                            textAnchor={lab.anchor}
                            fill="#eef1f7"
                            fontSize={10 * k}
                            fontWeight="500"
                            letterSpacing={1.4 * k}
                            stroke="#17233a"
                            strokeWidth={3.2 * k}
                            strokeLinejoin="round"
                            paintOrder="stroke"
                            style={{ textTransform: 'uppercase' }}
                          >
                            {p.name}
                          </text>
                        </g>
                      )
                    })}

                    {/* origin: India */}
                    <g style={{ opacity: go || !animate ? 1 : 0, transition: t(0, 1) }}>
                      {animate && (
                        <circle
                          cx={ORIGIN.x}
                          cy={ORIGIN.y}
                          r={6 * k}
                          fill="none"
                          stroke={GOLD}
                          strokeWidth={1 * k}
                          className="map-pulse"
                          style={{ transformOrigin: `${ORIGIN.x}px ${ORIGIN.y}px`, animationPlayState: go ? 'running' : 'paused' }}
                        />
                      )}
                      <circle cx={ORIGIN.x} cy={ORIGIN.y} r={9 * k} fill="rgba(211,185,130,0.18)" />
                      <circle cx={ORIGIN.x} cy={ORIGIN.y} r={4.2 * k} fill="#f1e3c0" stroke={GOLD} strokeWidth={1.4 * k} />
                      <text
                        x={ORIGIN.x - 10 * k}
                        y={ORIGIN.y + 19 * k}
                        textAnchor="end"
                        fill="#f6efd9"
                        fontSize={10.5 * k}
                        fontWeight="600"
                        letterSpacing={1.6 * k}
                        stroke="#17233a"
                        strokeWidth={3.6 * k}
                        strokeLinejoin="round"
                        paintOrder="stroke"
                        style={{ textTransform: 'uppercase' }}
                      >
                        {ORIGIN.name}
                      </text>
                    </g>
                  </>
                )}
              </svg>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
