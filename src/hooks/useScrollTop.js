import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * On route change: scroll to top (unless the URL carries a hash) and move
 * keyboard focus to <main> so screen-reader and keyboard users land on the
 * new page rather than keeping focus on the link they just followed.
 */
export function useScrollTop() {
  const { pathname, hash } = useLocation()
  const firstRender = useRef(true)

  useEffect(() => {
    if (hash) return
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true, force: true })
    else window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

    // Skip focus juggling on the initial load — only on navigations.
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    const main = document.getElementById('main')
    if (main) {
      main.setAttribute('tabindex', '-1')
      main.focus({ preventScroll: true })
      main.addEventListener('blur', () => main.removeAttribute('tabindex'), { once: true })
    }
  }, [pathname, hash])
}
