import { useEffect } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * Very gentle vertical drift for a background image: transform-only, one
 * rAF-throttled passive scroll listener, and idle once the element is far
 * off screen. Does nothing under reduced motion.
 */
export function useParallax(ref, factor = 0.1) {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return
    const host = el.parentElement
    let raf = 0

    const update = () => {
      raf = 0
      const rect = host.getBoundingClientRect()
      if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return
      // distance the host's centre sits from the viewport centre
      const offset = rect.top + rect.height / 2 - window.innerHeight / 2
      el.style.transform = `translate3d(0, ${(-offset * factor).toFixed(1)}px, 0)`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [ref, factor, reduced])
}
