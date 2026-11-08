/*
 * Line diagrams of yarn cone formats and export-carton arrangements, drawn
 * in the same single-weight navy line style as the FIBC construction icons.
 * They illustrate the *kinds* of configuration a buyer can specify — not a
 * product range or fixed dimensions.
 */

const INK = '#17233a'
const GOLD = '#a8814a'
const LINE = { stroke: INK, strokeWidth: 1.4, fill: 'none', strokeLinejoin: 'round', strokeLinecap: 'round' }
const YARN = { stroke: GOLD, strokeWidth: 0.9, fill: 'none', strokeLinecap: 'round' }

/** A tapered cone: wide at the base, narrow toward the tube end. */
function TaperCone({ cx, base, h, wBase, wTop }) {
  const top = base - h
  const bands = Math.max(3, Math.round(h / 9))
  return (
    <g>
      {/* paper tube */}
      <rect x={cx - wTop / 2 + 1.5} y={top - 5} width={wTop - 3} height={6} {...LINE} />
      {/* wound yarn */}
      <path d={`M${cx - wBase / 2} ${base} L${cx - wTop / 2} ${top} L${cx + wTop / 2} ${top} L${cx + wBase / 2} ${base} Z`} {...LINE} />
      {Array.from({ length: bands }, (_, i) => {
        const t = (i + 1) / (bands + 1)
        const y = top + (base - top) * t
        const half = (wTop + (wBase - wTop) * t) / 2
        return <path key={i} d={`M${cx - half + 1} ${y} H${cx + half - 1}`} {...YARN} />
      })}
    </g>
  )
}

/** A parallel-wound (cylindrical) package. */
function ParallelCone({ cx, base, h, w }) {
  const top = base - h
  const bands = Math.max(3, Math.round(h / 9))
  return (
    <g>
      <rect x={cx - w / 2} y={top} width={w} height={h} {...LINE} />
      {Array.from({ length: bands }, (_, i) => {
        const y = top + (h * (i + 1)) / (bands + 1)
        return <path key={i} d={`M${cx - w / 2 + 1} ${y} H${cx + w / 2 - 1}`} {...YARN} />
      })}
      <path d={`M${cx - w / 2} ${top} q${w / 2} -5 ${w} 0`} {...LINE} />
    </g>
  )
}

function Caption({ x, y, children }) {
  return (
    <text x={x} y={y} textAnchor="middle" fontSize="8.5" letterSpacing="0.14em" fill={INK} opacity="0.6" style={{ textTransform: 'uppercase' }}>
      {children}
    </text>
  )
}

export function ConeSizesDiagram({ className }) {
  return (
    <svg viewBox="0 0 240 130" className={className} role="img" aria-label="Three yarn cones of different sizes standing side by side">
      <path d="M14 108 H226" {...LINE} strokeWidth="1" opacity="0.4" />
      <TaperCone cx={52} base={108} h={46} wBase={34} wTop={17} />
      <TaperCone cx={120} base={108} h={64} wBase={44} wTop={20} />
      <TaperCone cx={190} base={108} h={84} wBase={56} wTop={23} />
      <Caption x={52} y={124}>Size A</Caption>
      <Caption x={120} y={124}>Size B</Caption>
      <Caption x={190} y={124}>Size C</Caption>
    </svg>
  )
}

export function WindingFormatsDiagram({ className }) {
  return (
    <svg viewBox="0 0 240 130" className={className} role="img" aria-label="A parallel-wound package beside a tapered cone">
      <path d="M14 108 H226" {...LINE} strokeWidth="1" opacity="0.4" />
      <ParallelCone cx={72} base={108} h={66} w={46} />
      <TaperCone cx={168} base={108} h={70} wBase={48} wTop={22} />
      <Caption x={72} y={124}>Parallel</Caption>
      <Caption x={168} y={124}>Tapered</Caption>
    </svg>
  )
}

/** Cartons seen from above: how many cones, and how they are laid out. */
function CartonTop({ x, y, cols, rows, label }) {
  const w = 58
  const h = 58
  const padX = 7
  const padY = 7
  const cellW = (w - padX * 2) / cols
  const cellH = (h - padY * 2) / rows
  const r = Math.min(cellW, cellH) / 2 - 1.2
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} {...LINE} />
      {Array.from({ length: cols * rows }, (_, i) => {
        const c = i % cols
        const rr = Math.floor(i / cols)
        return (
          <circle
            key={i}
            cx={x + padX + cellW * (c + 0.5)}
            cy={y + padY + cellH * (rr + 0.5)}
            r={r}
            {...LINE}
            strokeWidth="1.1"
          />
        )
      })}
      <Caption x={x + w / 2} y={y + h + 15}>{label}</Caption>
    </g>
  )
}

export function CartonLayoutsDiagram({ className }) {
  return (
    <svg viewBox="0 0 240 110" className={className} role="img" aria-label="Three carton layouts seen from above, with different numbers of cones per carton">
      <CartonTop x={10} y={12} cols={2} rows={2} label="4 / carton" />
      <CartonTop x={91} y={12} cols={3} rows={2} label="6 / carton" />
      <CartonTop x={172} y={12} cols={3} rows={3} label="9 / carton" />
    </svg>
  )
}

/** Individual wrapped cone, a carton with layered cones, and a palletised stack. */
export function PackagingComparisonDiagram({ className }) {
  return (
    <svg viewBox="0 0 360 150" className={className} role="img" aria-label="Three packing arrangements: an individually wrapped cone, cones layered in a carton, and cartons stacked on a pallet">
      {/* A — individually wrapped */}
      <g>
        <path d="M24 122 H96" {...LINE} strokeWidth="1" opacity="0.4" />
        <TaperCone cx={60} base={122} h={58} wBase={38} wTop={18} />
        <path d="M36 122 C34 84 40 70 52 62 M84 122 C86 84 80 70 68 62" {...LINE} strokeWidth="1" opacity="0.7" strokeDasharray="3 3" />
        <Caption x={60} y={142}>Wrapped cone</Caption>
      </g>

      {/* B — layered in a carton */}
      <g>
        <rect x={134} y={52} width={92} height={70} {...LINE} />
        <path d="M134 52 l14 -12 h92 l-14 12 M240 40 v70 l-14 12" {...LINE} />
        {[0, 1].map((layer) =>
          [0, 1, 2].map((c) => (
            <circle key={`${layer}-${c}`} cx={152 + c * 28} cy={72 + layer * 26} r="10" {...LINE} strokeWidth="1.1" />
          )),
        )}
        <Caption x={180} y={142}>Cones per carton</Caption>
      </g>

      {/* C — palletised */}
      <g>
        <rect x={262} y={112} width={86} height={9} {...LINE} />
        <path d="M268 121 v8 M305 121 v8 M342 121 v8" {...LINE} />
        {[0, 1, 2].map((layer) =>
          [0, 1].map((c) => (
            <rect key={`${layer}-${c}`} x={266 + c * 40} y={86 - layer * 25 + 1} width={38} height={24} {...LINE} strokeWidth="1.1" />
          )),
        )}
        <path d="M262 98 H348" stroke={GOLD} strokeWidth="1" strokeDasharray="2 2" />
        <Caption x={305} y={142}>Palletised</Caption>
      </g>
    </svg>
  )
}
