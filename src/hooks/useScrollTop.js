import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * On route change: scroll to top, or — when the URL carries a hash — to that
 * element (retrying briefly, since routes are lazy-loaded). Keyboard focus
 * moves to <main> on navigations so screen-reader and keyboard users land on
 * the new page rather than keeping focus on the link they just followed.
 */
export function useScrollTop() {
  const { pathname, hash } = useLocation()
  const firstRender = useRef(true)

  useEffect(() => {
    let cancelled = false
    let timer = 0

    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      let tries = 0
      const go = () => {
        if (cancelled) return
        const el = document.getElementById(id)
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 96
          if (window.__lenis) window.__lenis.scrollTo(Math.max(0, top), { immediate: true, force: true })
          else window.scrollTo({ top: Math.max(0, top), left: 0, behavior: 'auto' })
        } else if (tries < 25) {
          tries += 1
          timer = window.setTimeout(go, 80)
        }
      }
      go()
    } else if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true, force: true })
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }

    // Skip focus juggling on the initial load — only on navigations.
    if (firstRender.current) {
      firstRender.current = false
    } else {
      const main = document.getElementById('main')
      if (main) {
        main.setAttribute('tabindex', '-1')
        main.focus({ preventScroll: true })
        main.addEventListener('blur', () => main.removeAttribute('tabindex'), { once: true })
      }
    }

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [pathname, hash])
}
