import { useEffect } from 'react'
import Lenis from 'lenis'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * Eased momentum scrolling (Lenis) for the whole document — the weighted,
 * unhurried feel of a considered marketing site rather than raw wheel steps.
 *
 * - one rAF loop drives Lenis; scroll-linked hooks keep listening to the
 *   native `scroll` event Lenis still dispatches, so nothing else changes
 * - in-page #anchors scroll smoothly (anchors: true)
 * - a global `window.__lenis` lets route changes jump instantly to the top
 * - fully disabled under prefers-reduced-motion — native scrolling returns
 */
export function useSmoothScroll() {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return

    let lenis
    try {
      // Coarse pointers (touch) already have good native momentum; Lenis on
      // touch can fight the mobile URL bar, so keep it wheel-only. `lerp` mode
      // (frame-rate independent) gives the continuous, weighted glide of a
      // considered marketing site rather than discrete wheel steps.
      lenis = new Lenis({
        lerp: 0.065,
        wheelMultiplier: 1,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1.6,
        anchors: { offset: -80 },
      })
    } catch {
      return // fall back to native scrolling
    }

    window.__lenis = lenis
    let raf = 0
    const loop = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      if (window.__lenis === lenis) delete window.__lenis
    }
  }, [reduced])
}
