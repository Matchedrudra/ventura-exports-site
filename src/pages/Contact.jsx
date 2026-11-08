import { Seo } from '../components/ui/Seo'
import { PageHeader } from '../components/ui/PageHeader'
import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'
import { QuoteForm } from '../components/quote/QuoteForm'
import { contact, site } from '../data/site'

const rows = [
  { label: 'Business email', value: contact.email, href: `mailto:${contact.email}` },
  { label: 'Phone', value: contact.phoneDisplay, href: contact.phoneHref },
  { label: 'WhatsApp', value: contact.phoneDisplay, href: contact.whatsappHref },
  { label: 'Location', value: contact.location },
  { label: 'Hours', value: contact.hours },
  { label: 'Website', value: site.domain, href: site.url },
]

const categories = ['Yarns', 'Fabrics', 'FIBC Bags', 'Spices & Agro Commodities', 'Other Products']

export default function Contact() {
  return (
    <>
      <Seo
        path="/contact"
        title="Contact"
        description="Contact Ventura Exports — Gujarat, India. Email info@venturaexports.in, call or WhatsApp, or send a product enquiry for yarns, fabrics and other products."
      />
      <PageHeader
        label="Contact"
        title="Let’s Discuss Your Next Sourcing Requirement."
        lead="For product enquiries, the form below reaches us with your specification already structured. For anything else, the details are on this page."
      />

      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <dl className="border-t border-line">
                {rows.map((row) => (
                  <div key={row.label} className="grid grid-cols-1 gap-1 border-b border-line py-4">
                    <dt className="text-label font-semibold uppercase tracking-label text-ink/45">{row.label}</dt>
                    <dd className="text-[1.02rem] text-ink/85">
                      {row.href ? (
                        <a
                          href={row.href}
                          className="u-underline transition-colors hover:text-gold"
                          {...(row.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                        >
                          {row.value}
                        </a>
                      ) : (
                        row.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>

              <Reveal>
                <div className="mt-8">
                  <p className="text-label font-semibold uppercase tracking-label text-gold">Product categories</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {categories.map((c) => (
                      <li key={c} className="border border-line px-3 py-1.5 text-[0.82rem] text-ink/70">
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="mt-8 max-w-prose text-[0.86rem] leading-relaxed text-ink/50">
                  Ventura Exports is an India-based export and sourcing company, with {site.experience}{' '}
                  connecting international buyers with Indian manufacturing partners. Correspondence
                  is by email, phone or WhatsApp.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-8">
              <h2 className="mb-8 font-serif text-[1.6rem] font-normal leading-snug text-ink">Send a business enquiry</h2>
              <QuoteForm source="website-contact-form" />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
