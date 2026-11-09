import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { Logo } from '../ui/Logo'
import { site, contact, footerNav } from '../../data/site'

export function Footer() {
  return (
    <footer className="bg-ink text-ivory">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Logo variant="row" tone="light" className="!h-[54px]" />
            <p className="mt-6 max-w-xs font-serif text-[1.15rem] leading-snug text-ivory/80">
              {site.tagline}
            </p>
            <p className="mt-4 max-w-xs text-[0.88rem] leading-relaxed text-ivory/55">
              Indian textile yarn, fabrics and weaving accessories supplier — customised
              specifications and export coordination.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-4">
            {footerNav.map((group) => (
              <nav key={group.heading} aria-label={group.heading}>
                <p className="text-label font-semibold uppercase tracking-label text-ivory/60">
                  {group.heading}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
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
            <p className="text-label font-semibold uppercase tracking-label text-ivory/60">Contact</p>
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

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-[0.8rem] text-ivory/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {site.legalName}. All rights reserved.</p>
          <p className="uppercase tracking-widelabel">{site.label}</p>
        </div>
      </Container>
    </footer>
  )
}
