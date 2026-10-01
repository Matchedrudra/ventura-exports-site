import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'
import { RevealGroup } from '../ui/Reveal'
import { FibcIcon } from '../products/FibcIcon'
import { fibcTypes } from '../../data/products'

/*
 * "FIBC & Jumbo Bags" — the homepage's main product range, placed directly
 * after the hero so Ventura's primary product is unmistakable before the
 * broader portfolio is introduced further down the page.
 */

const QUOTE_HREF = `/request-a-quote?product=${encodeURIComponent('FIBC / Jumbo Bags')}`

// Buyers can specify a requirement against any of these — all already
// covered by the FIBC product data (fibcOptions / specs) or the quote form.
const SPEC_POINTS = [
  'Bag type / construction',
  'Dimensions',
  'Safe working load',
  'Lifting configuration',
  'Liner requirement',
  'Coating / lamination',
  'Printing',
  'Discharge configuration',
  'Application',
  'Quantity',
  'Destination',
]

export function FibcShowcase() {
  return (
    <section className="border-b border-line bg-ivory-deep/40 py-20 lg:py-28">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            label="Main product range"
            title="FIBC & Jumbo Bags"
            lead="Industrial bulk packaging sourced to your required construction, capacity, lifting configuration and application."
          />
          <div className="flex shrink-0 flex-wrap items-center gap-x-6 gap-y-3">
            <Button to="/products/fibc-jumbo-bags" variant="solid">
              Explore FIBC &amp; Jumbo Bags
            </Button>
            <Button to={QUOTE_HREF} variant="link">
              Request an FIBC quote
            </Button>
          </div>
        </div>

        <RevealGroup className="mt-14 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
          {fibcTypes.map((t) => (
            <RevealGroup.Item key={t.slug}>
              <Link
                to="/products/fibc-jumbo-bags#construction-types"
                className="group flex h-full flex-col items-center gap-3 bg-ivory px-4 py-8 text-center transition-colors duration-300 hover:bg-ivory-deep"
              >
                <FibcIcon type={t.slug} className="h-14 w-auto" />
                <span className="text-[0.85rem] font-medium tracking-[-0.01em] text-ink transition-colors group-hover:text-gold-deep">
                  {t.name}
                </span>
              </Link>
            </RevealGroup.Item>
          ))}
        </RevealGroup>

        <div className="mt-14 border-t border-line pt-10">
          <p className="text-[0.72rem] font-semibold uppercase tracking-widelabel text-ink/50">
            Specify your requirement
          </p>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {SPEC_POINTS.map((s) => (
              <li
                key={s}
                className="border border-line bg-ivory px-3.5 py-1.5 text-[0.82rem] text-ink/70"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
