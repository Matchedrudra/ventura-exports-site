import { Seo } from '../components/ui/Seo'
import { PageHeader } from '../components/ui/PageHeader'
import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import { contact, site } from '../data/site'

const rows = [
  { label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
  { label: 'Phone', value: contact.phoneDisplay, href: contact.phoneHref },
  { label: 'WhatsApp', value: contact.phoneDisplay, href: contact.whatsappHref },
  { label: 'Website', value: site.domain, href: site.url },
  { label: 'Location', value: contact.location },
  { label: 'Hours', value: contact.hours },
]

export default function Contact() {
  return (
    <>
      <Seo
        path="/contact"
        title="Contact"
        description="Contact Ventura Exports — Ahmedabad, Gujarat, India. Email rudra@venturaexports.in or send an enquiry through the quote form."
      />
      <PageHeader
        label="Contact"
        title="Talk to Ventura Exports."
        lead="For product enquiries, use the quote form — it reaches us with the specification already structured. For anything else, the details below."
      />

      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <dl className="border-t border-line">
                {rows.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-1 gap-1 border-b border-line py-5 sm:grid-cols-[10rem_1fr] sm:gap-6"
                  >
                    <dt className="text-label font-semibold uppercase tracking-label text-ink/45 sm:pt-1">
                      {row.label}
                    </dt>
                    <dd className="text-[1.02rem] text-ink/85">
                      {row.href ? (
                        <a
                          href={row.href}
                          className="u-underline transition-colors hover:text-gold"
                          {...(row.href.startsWith('http')
                            ? { target: '_blank', rel: 'noreferrer' }
                            : {})}
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
                <p className="mt-8 max-w-prose text-[0.88rem] leading-relaxed text-ink/50">
                  Ventura Exports operates as a sourcing and export coordination business.
                  Correspondence is by email, phone or WhatsApp.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <div className="border border-line bg-ivory-deep/40 p-8">
                <h2 className="font-serif text-[1.5rem] leading-snug text-ink">
                  Ready to send a requirement?
                </h2>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/65">
                  The quote form captures product, construction, quantity and destination so we can
                  respond with a considered quotation.
                </p>
                <div className="mt-6">
                  <Button to="/request-a-quote" variant="solid">
                    Request a Quote
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
