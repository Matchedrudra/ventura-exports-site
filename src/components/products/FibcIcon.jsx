/*
 * Minimal line diagrams of the eight FIBC constructions — a clean,
 * brand-consistent alternative to a photographed types chart.
 * viewBox 64 x 76, single stroke.
 */
const S = { fill: 'none', stroke: '#17233a', strokeWidth: 1.4, strokeLinejoin: 'round', strokeLinecap: 'round' }

export function FibcIcon({ type, className }) {
  return (
    <svg viewBox="0 0 64 76" className={className} role="img" aria-hidden="true">
      {/* fill spout (common) */}
      <path d="M28 8 h8 v6 h-8 z" {...S} />

      {/* body */}
      {type === 'circular' ? (
        <path d="M14 20 q0 -6 18 -6 q18 0 18 6 v40 q0 6 -18 6 q-18 0 -18 -6 z" {...S} />
      ) : (
        <path d="M14 16 h36 v52 h-36 z" {...S} />
      )}

      {/* loops */}
      {type === 'tunnel-lift' ? (
        <>
          <path d="M12 22 h40 M12 30 h40" {...S} />
        </>
      ) : type === 'full-loop' ? (
        <>
          <path d="M18 16 v-6 q0 -4 3 -4 M18 68 v0 M18 16 v52 M46 16 v-6 q0 -4 -3 -4 M46 16 v52" {...S} />
        </>
      ) : (
        <>
          <path d="M20 16 v-7 q0 -3 3 -3 M28 16 v-7 q0 -3 3 -3" {...S} />
          <path d="M36 16 v-7 q0 -3 3 -3 M44 16 v-7 q0 -3 3 -3" {...S} />
        </>
      )}

      {/* construction detail */}
      {type === 'u-panel' && <path d="M22 16 v46 h20 v-46" {...S} strokeDasharray="1 3" />}
      {type === 'baffle' && (
        <path d="M20 24 l24 12 M20 40 l24 12 M20 52 l24 -12" {...S} strokeDasharray="2 3" opacity="0.7" />
      )}
      {type === 'conductive' && (
        <>
          <path d="M22 18 v48 M32 18 v48 M42 18 v48" {...S} opacity="0.5" />
          <path d="M28 70 h8 M30 73 h4" {...S} />
        </>
      )}
      {type === 'dissipative' && (
        <g fill="#17233a" opacity="0.55">
          {[24, 34, 44].flatMap((x) => [26, 38, 50, 62].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1" />))}
        </g>
      )}
      {type === 'standard' && <path d="M32 16 v52" {...S} opacity="0.35" />}
    </svg>
  )
}
