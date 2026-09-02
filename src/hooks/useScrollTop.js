import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scroll to top on route change (respecting in-page hash links). */
export function useScrollTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])
}
