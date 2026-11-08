import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'
import { Figure } from '../ui/Figure'
import { RevealGroup } from '../ui/Reveal'
import { yarnCategories, yarnCountExamples } from '../../data/textiles'

export function YarnDivision() {
  return (
    <section className="border-y border-line bg-ivory-deep/50 py-20 lg:py-28">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            label="Primary division — Yarns"
            title="Yarns — Sourced to Your Specifications."
            lead="We supply a range of textile yarns sourced from Indian manufacturing partners, catering to the requirements of textile mills, fabric manufacturers, knitting units and international distributors."
          />
          <div className="flex shrink-0 flex-wrap items-center gap-x-6 gap-y-3">
            <Button to="/yarns" variant="solid">
              Explore Yarns
            </Button>
            <Button to="/yarns#requirements" variant="link">
              Tell us your yarn requirements
            </Button>
          </div>
        </div>

        <RevealGroup className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {yarnCategories.map((c) => (
            <RevealGroup.Item key={c.slug}>
              <Link to={`/yarns#${c.slug}`} className="group block">
                <div className="overflow-hidden">
                  <Figure
                    src={c.image}
                    alt={c.imageAlt}
                    ratio="4 / 5"
                    imgClassName="transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="font-serif text-[0.85rem] text-gold">{c.index}</span>
                  <h3 className="text-[1.15rem] font-medium tracking-[-0.01em] text-ink transition-colors group-hover:text-gold-deep">
                    {c.name}
                  </h3>
                </div>
                <ul className="mt-3 space-y-1 text-[0.88rem] leading-snug text-ink/60">
                  {c.variants.slice(0, 4).map((v) => (
                    <li key={v}>{v.replace(/, subject to sourcing availability/, '')}</li>
                  ))}
                </ul>
              </Link>
            </RevealGroup.Item>
          ))}
        </RevealGroup>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 lg:flex-row lg:items-center lg:gap-10">
          <p className="shrink-0 text-[0.72rem] font-semibold uppercase tracking-widelabel text-ink/55">
            Specify by count
          </p>
          <ul className="flex flex-wrap gap-2">
            {yarnCountExamples.map((e) => (
              <li key={e.count} className="border border-line bg-paper px-3.5 py-1.5 font-serif text-[0.98rem] text-ink">
                {e.count}
              </li>
            ))}
          </ul>
          <p className="text-[0.8rem] text-ink/50 lg:ml-auto lg:max-w-[16rem]">
            Examples of how a count can be specified — not a statement of stock.
          </p>
        </div>
      </Container>
    </section>
  )
}
