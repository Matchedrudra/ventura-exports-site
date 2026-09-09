import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * Scroll-linked progress for a section.
 *
 * Returns { ref, progress } where `progress` runs 0 → 1 as the element
 * travels from just-entering the viewport to just-leaving it (tunable with
 * `start` / `end` as fractions of viewport height). rAF-throttled, passive,
 * transform/opacity friendly. Under reduced-motion it pins to 1.
 */
export function useScrollProgress({ start = 0.85, end = 0.35 } = {}) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef(null)
  const [progress, setProgress] = useState(reduced ? 1 : 0)

  useEffect(() => {
    if (reduced) {
      setProgress(1)
      return
    }
    const el = ref.current
    if (!el) return

    let raf = 0
    const compute = () => {
      raf = 0
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 1
      // 0 when the element top hits `start` of the viewport,
      // 1 when the element bottom passes `end` of the viewport.
      const total = rect.height + vh * (start - end)
      const travelled = vh * start - rect.top
      const p = total > 0 ? travelled / total : 0
      setProgress(Math.min(1, Math.max(0, p)))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute)
    }

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [reduced, start, end])

  return { ref, progress, reduced }
}

/** Ease a 0–1 value with a gentle cubic in-out. */
export const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

/** Map a sub-range of `p` (a→b) onto 0–1, clamped. */
export function slice(p, a, b) {
  if (p <= a) return 0
  if (p >= b) return 1
  return (p - a) / (b - a)
}
