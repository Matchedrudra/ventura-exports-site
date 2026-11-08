import { useEffect, useState } from 'react'
import { useInView } from '../../hooks/useInView'

/** Counts from 0 to `to` once, when scrolled into view. Shows the final value immediately under reduced motion. */
export function CountUp({ to, suffix = '', duration = 1400 }) {
  const { ref, shown, reduced } = useInView()
  const [value, setValue] = useState(reduced ? to : 0)

  useEffect(() => {
    if (reduced) {
      setValue(to)
      return
    }
    if (!shown) return
    let raf = 0
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(eased * to))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [shown, reduced, to, duration])

  return (
    <span ref={ref} aria-label={`${to}${suffix}`}>
      <span aria-hidden="true">
        {value}
        {suffix}
      </span>
    </span>
  )
}
