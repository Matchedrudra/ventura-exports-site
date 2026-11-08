import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Container } from '../ui/Container'
import { Logo } from '../ui/Logo'
import { nav } from '../../data/site'
import { cn } from '../../lib/cn'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) window.__lenis?.stop()
    else window.__lenis?.start()
    return () => {
      document.body.style.overflow = ''
      window.__lenis?.start()
    }
  }, [open])

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 bg-ivory/95 backdrop-blur transition-[box-shadow,border-color] duration-300',
          scrolled
            ? 'border-b border-line shadow-[0_1px_0_rgba(23,35,58,0.05)]'
            : 'border-b border-transparent',
        )}
      >
        <Container
          className={cn(
            'flex items-center justify-between gap-4 transition-[height] duration-300 ease-editorial lg:gap-6',
            scrolled ? 'h-[68px] sm:h-[76px]' : 'h-[84px] sm:h-[100px] xl:h-[108px]',
          )}
        >
          <Link to="/" aria-label="Ventura Exports — home" className="shrink-0">
            <Logo
              variant="row"
              className={cn(
                'transition-[height] duration-300 ease-editorial',
                scrolled && '!h-[48px] sm:!h-[56px]',
              )}
            />
          </Link>

          <nav className="hidden items-center xl:flex xl:gap-[1.05rem] 2xl:gap-7" aria-label="Primary">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    'relative whitespace-nowrap text-[0.72rem] font-medium uppercase tracking-[0.07em] transition-colors duration-300 2xl:text-[0.78rem] 2xl:tracking-label',
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

          <div className="hidden items-center xl:flex">
            <Link
              to="/request-a-quote"
              className="group inline-flex items-center gap-2 whitespace-nowrap bg-ink px-4 py-2.5 text-[0.72rem] font-medium uppercase tracking-[0.08em] text-ivory 2xl:px-5 2xl:tracking-label transition-colors duration-300 hover:bg-ink-soft"
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
        className={cn('fixed inset-0 z-40 bg-ivory xl:hidden', open ? 'block' : 'hidden')}
      >
        <div className="flex h-full flex-col overflow-y-auto px-6 pb-10 pt-[100px]">
          <nav
            className="flex flex-col divide-y divide-line border-y border-line"
            aria-label="Mobile"
          >
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    'flex items-center justify-between py-4 text-lg tracking-tight transition-colors',
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

          <div className="mt-auto pt-8">
            <Link
              to="/request-a-quote"
              className="inline-flex w-full items-center justify-center gap-2 bg-ink px-6 py-4 text-sm font-medium uppercase tracking-widelabel text-ivory"
            >
              Request a Quote →
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
