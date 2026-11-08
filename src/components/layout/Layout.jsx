import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { Header } from './Header'
import { Footer } from './Footer'
import { WhatsAppButton } from '../ui/WhatsAppButton'
import { useScrollTop } from '../../hooks/useScrollTop'
import { useSmoothScroll } from '../../hooks/useSmoothScroll'

export function Layout() {
  useSmoothScroll()
  useScrollTop()
  const { pathname } = useLocation()
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-ivory"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        <div key={pathname} className="motion-safe:animate-page-in">
          <Suspense fallback={<div className="min-h-[60vh]" aria-hidden="true" />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
      <Analytics />
    </div>
  )
}
