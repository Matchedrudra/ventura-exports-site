import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { Logo } from '../ui/Logo'
import { site, contact, footerNav } from '../../data/site'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-ink text-ivory">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo variant="row" tone="light" />
            <p className="mt-6 max-w-xs text-[0.95rem] leading-relaxed text-ivory/60">
              India-based packaging and industrial supply — FIBC, woven and BOPP bags, corrugated
              cartons and industrial filter bags, coordinated from specification to dispatch.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            {footerNav.map((group) => (
              <nav key={group.heading} aria-label={group.heading}>
                <p className="text-label font-semibold uppercase tracking-label text-ivory/40">
                  {group.heading}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="text-[0.9rem] text-ivory/75 transition-colors duration-300 hover:text-gold-soft"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className="lg:col-span-3">
            <p className="text-label font-semibold uppercase tracking-label text-ivory/40">Contact</p>
            <ul className="mt-4 space-y-2.5 text-[0.9rem] text-ivory/75">
              <li>
                <a href={`mailto:${contact.email}`} className="transition-colors hover:text-gold-soft">
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={contact.phoneHref} className="transition-colors hover:text-gold-soft">
                  {contact.phoneDisplay}
                </a>
              </li>
              <li className="text-ivory/60">{contact.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-[0.8rem] text-ivory/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p className="uppercase tracking-widelabel">{site.label}</p>
        </div>
      </Container>
    </footer>
  )
}
