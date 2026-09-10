import { useEffect, useRef } from 'react'

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY
const SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

let scriptPromise = null
function loadScript() {
  if (window.turnstile) return Promise.resolve()
  if (scriptPromise) return scriptPromise
  scriptPromise = new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = SRC
    s.async = true
    s.defer = true
    s.onload = () => resolve()
    s.onerror = () => reject(new Error('Turnstile failed to load'))
    document.head.appendChild(s)
  })
  return scriptPromise
}

/**
 * Cloudflare Turnstile widget — renders only when VITE_TURNSTILE_SITE_KEY is
 * configured, so the form works untouched until anti-spam is switched on.
 * Calls onToken(token | '') as the challenge passes / expires.
 */
export function Turnstile({ onToken }) {
  const ref = useRef(null)
  const widgetId = useRef(null)

  useEffect(() => {
    if (!SITE_KEY) return undefined
    let cancelled = false
    loadScript()
      .then(() => {
        if (cancelled || !ref.current || !window.turnstile) return
        widgetId.current = window.turnstile.render(ref.current, {
          sitekey: SITE_KEY,
          theme: 'light',
          callback: (token) => onToken(token),
          'expired-callback': () => onToken(''),
          'error-callback': () => onToken(''),
        })
      })
      .catch(() => onToken(''))
    return () => {
      cancelled = true
      try {
        if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current)
      } catch {
        /* widget already gone */
      }
    }
  }, [onToken])

  if (!SITE_KEY) return null
  return <div ref={ref} className="mt-2" />
}

export const turnstileEnabled = Boolean(SITE_KEY)
