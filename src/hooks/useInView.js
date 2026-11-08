import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * One-shot "has entered the viewport" flag. Content is never left hidden:
 * reduced motion or no IntersectionObserver reveals immediately, and a
 * failsafe timer reveals it regardless.
 */
export function useInView({ rootMargin = '0px 0px -8% 0px', immediate = false } = {}) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (immediate || reduced || typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin, threshold: 0.01 },
    )
    io.observe(el)
    const t = setTimeout(() => setShown(true), 4000)
    return () => {
      io.disconnect()
      clearTimeout(t)
    }
  }, [reduced, rootMargin, immediate])

  return { ref, shown, reduced }
}
