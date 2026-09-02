import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Container } from '../ui/Container'
import { Logo } from '../ui/Logo'
import { nav, contact } from '../../data/site'
import { cn } from '../../lib/cn'

function EmailLink({ className }) {
  return (
    <a
      href={`mailto:${contact.email}`}
      className={cn(
        'group inline-flex items-center gap-1.5 text-[0.8rem] font-medium uppercase tracking-widelabel transition-colors hover:text-gold',
        className,
      )}
    >
      Email
      <span
        aria-hidden="true"
        className="transition-transform duration-300 ease-editorial group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      >
        ↗
      </span>
    </a>
  )
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
    <header
      className={cn(
        'sticky top-0 z-50 bg-ivory transition-shadow duration-300',
        scrolled
          ? 'border-b border-line shadow-[0_1px_0_rgba(23,35,58,0.05)]'
          : 'border-b border-transparent',
      )}
    >
      <Container className="flex h-[72px] items-center justify-between gap-4 lg:h-[84px] lg:gap-6">
        <Link to="/" aria-label="Ventura Exports — home" className="shrink-0">
          <Logo variant="row" />
        </Link>

        <nav className="hidden items-center gap-6 xl:flex xl:gap-8" aria-label="Primary">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'relative text-[0.82rem] font-medium uppercase tracking-widelabel transition-colors duration-300',
                  isActive ? 'text-ink' : 'text-ink/55 hover:text-ink',
                )
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  <span
                    className={cn(
                      'absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-300 ease-editorial',
                      isActive ? 'w-full' : 'w-0',
                    )}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-5 xl:flex xl:gap-6">
          <EmailLink />
          <Link
            to="/request-a-quote"
            className="group inline-flex items-center gap-2 whitespace-nowrap bg-ink px-5 py-2.5 text-[0.78rem] font-medium uppercase tracking-widelabel text-ivory transition-colors duration-300 hover:bg-ink-soft"
          >
            Request a Quote
            <span
              aria-hidden="true"
              className="transition-transform duration-300 ease-editorial group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="relative z-50 flex h-10 w-10 items-center justify-center xl:hidden"
        >
          <span className="sr-only">Menu</span>
          <span className="relative block h-4 w-6">
            <span
              className={cn(
                'absolute left-0 block h-px w-6 bg-ink transition-all duration-300 ease-editorial',
                open ? 'top-1/2 rotate-45' : 'top-0',
              )}
            />
            <span
              className={cn(
                'absolute left-0 top-1/2 block h-px w-6 bg-ink transition-opacity duration-200',
                open ? 'opacity-0' : 'opacity-100',
              )}
            />
            <span
              className={cn(
                'absolute left-0 block h-px w-6 bg-ink transition-all duration-300 ease-editorial',
                open ? 'top-1/2 -rotate-45' : 'top-full',
              )}
            />
          </span>
        </button>
      </Container>
    </header>

      {/* Mobile menu — sibling of <header> so `fixed` resolves to the viewport.
          Toggled with `hidden` (no fade) so it can never get stuck mid-transition. */}
      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-0 z-40 bg-ivory xl:hidden',
          open ? 'block' : 'hidden',
        )}
      >
        <div className="flex h-full flex-col px-6 pt-[88px] pb-10">
          <nav
            className="flex flex-col divide-y divide-line border-y border-line"
            aria-label="Mobile"
          >
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center justify-between py-5 text-lg tracking-tight transition-colors',
                    isActive ? 'text-gold' : 'text-ink hover:text-gold',
                  )
                }
              >
                {item.label}
                <span aria-hidden="true" className="text-ink/30">
                  →
                </span>
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-4 pt-10">
            <Link
              to="/request-a-quote"
              className="inline-flex items-center justify-center gap-2 bg-ink px-6 py-4 text-sm font-medium uppercase tracking-widelabel text-ivory"
            >
              Request a Quote →
            </Link>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center justify-center gap-2 border border-ink/20 px-6 py-4 text-sm font-medium uppercase tracking-widelabel text-ink"
            >
              Email ↗
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
