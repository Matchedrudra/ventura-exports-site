import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { Figure } from '../ui/Figure'
import { Reveal, RevealGroup } from '../ui/Reveal'
import { useInView } from '../../hooks/useInView'
import {
  skew,
  skewFeatures,
  skewProducts,
  healdWireDimensions,
  yarnSizes,
  eyeSizeRecommendations,
  compatibleMachines,
  compatibilityNote,
} from '../../data/skew'
import { cn } from '../../lib/cn'

/** Deep link into the page's own enquiry form with a product pre-selected. */
export const enquiryLink = (type) => ({
  pathname: '/weaving-accessories',
  search: `?type=${encodeURIComponent(type)}`,
  hash: '#requirements',
})

const CATALOGUE = 'Technical Catalogue Request'

const Eyebrow = ({ children, light }) => (
  <p
    className={cn(
      'mb-4 flex items-center gap-3 text-[0.66rem] font-semibold uppercase leading-none tracking-[0.2em]',
      light ? 'text-gold-soft' : 'text-gold',
    )}
  >
    <span aria-hidden="true" className={cn('h-px w-8', light ? 'bg-gold-soft/70' : 'bg-gold')} />
    {children}
  </p>
)

const Pill = ({ children }) => (
  <span className="inline-block border border-line bg-paper px-2 py-[3px] text-[0.8rem] tabular-nums leading-none text-ink">
    {children}
  </span>
)

/* ───────────────────────── A. Introduction ───────────────────────── */

/** A hairline that draws itself across the width when it scrolls into view. */
function DrawRule({ className }) {
  const { ref, shown, reduced } = useInView()
  return (
    <div ref={ref} className={cn('h-px w-full bg-ink/10', className)}>
      <div
        className="h-px origin-left bg-gold"
        style={{
          width: '100%',
          transform: shown || reduced ? 'scaleX(1)' : 'scaleX(0)',
          transition: reduced ? 'none' : 'transform 1.4s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />
    </div>
  )
}

const LINEUP = [
  {
    name: 'Heald Wires',
    type: 'Skew Heald Wires',
    src: '/images/skew/skew-heald-wires-panel.jpg',
    alt: 'Heald wires of several profiles',
  },
  {
    name: 'Leno Healds & Doup',
    type: 'Leno Healds',
    src: '/images/skew/skew-leno-healds.jpg',
    alt: 'A set of leno healds and a leno doup in several lengths',
  },
  {
    name: 'Drop Wires',
    type: 'Drop Wires',
    src: '/images/skew/skew-drop-wires.jpg',
    alt: 'Four drop wire profiles',
  },
]

function Intro() {
  return (
    <div>
      <Reveal>
        <Eyebrow>Weaving Accessories</Eyebrow>
      </Reveal>
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
        <Reveal delay={0.05} className="lg:col-span-8">
          <h2 className="font-serif text-[2.4rem] font-medium leading-[1.04] tracking-[-0.01em] text-ink sm:text-[3.2rem] lg:text-[4rem]">
            Precision Weaving Components.
          </h2>
        </Reveal>
        <Reveal delay={0.12} className="lg:col-span-4 lg:pb-2">
          <p className="font-serif text-[1.3rem] italic leading-snug text-gold-deep sm:text-[1.5rem]">
            Engineered for Precision. Built for Performance.
          </p>
        </Reveal>
      </div>

      <DrawRule className="mt-10 lg:mt-14" />

      <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-12 lg:gap-16">
        <Reveal delay={0.05} className="lg:col-span-6">
          <p className="text-[1.02rem] leading-[1.9] text-charcoal">
            Discover precision-engineered weaving components designed for reliable performance across
            modern textile manufacturing operations. Our range includes specialised heald wires,
            leno healds and drop wires, manufactured to meet diverse weaving requirements.
          </p>
        </Reveal>
        <Reveal delay={0.12} className="lg:col-span-5 lg:col-start-8">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button to={enquiryLink(CATALOGUE)} variant="solid">
              Request Technical Catalogue
            </Button>
            <Button to={enquiryLink('Skew Heald Wires')} variant="outline">
              Enquire About a Product
            </Button>
          </div>
          <p className="mt-6 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-charcoal/55">
            Manufacturing Partner: {skew.name}
          </p>
        </Reveal>
      </div>

      <RevealGroup className="mt-16 grid gap-5 sm:grid-cols-3 lg:mt-20 lg:gap-8" stagger={0.1}>
        {LINEUP.map((p) => (
          <RevealGroup.Item key={p.name}>
            <Link to={enquiryLink(p.type)} className="group block">
              <Figure src={p.src} alt={p.alt} ratio="4 / 5" fit="contain" zoom className="[&>div]:!bg-[#ececec]" />
              <span className="mt-4 flex items-baseline justify-between gap-4 border-t border-ink/15 pt-3">
                <span className="font-serif text-[1.25rem] font-medium text-ink transition-transform duration-500 ease-editorial group-hover:translate-x-1">
                  {p.name}
                </span>
                <span
                  aria-hidden="true"
                  className="-translate-x-2 text-gold opacity-0 transition-all duration-500 ease-editorial group-hover:translate-x-0 group-hover:opacity-100"
                >
                  →
                </span>
              </span>
            </Link>
          </RevealGroup.Item>
        ))}
      </RevealGroup>
    </div>
  )
}

/* ───────────────────────── B. Features (navy) ───────────────────────── */

function Features() {
  return (
    <div className="bg-ink text-ivory">
      <Container className="py-20 lg:py-28">
        <Reveal>
          <Eyebrow light>Heald wires</Eyebrow>
          <h3 className="max-w-xl font-serif text-[1.8rem] font-medium leading-[1.12] text-ivory sm:text-[2.2rem]">
            Designed for demanding weaving conditions.
          </h3>
        </Reveal>
        <RevealGroup className="mt-12 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {skewFeatures.map((f, i) => (
            <RevealGroup.Item key={f.title} className="border-t border-white/15 py-6">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-[1rem] text-gold-soft">{String(i + 1).padStart(2, '0')}</span>
                <h4 className="text-[1rem] font-medium leading-snug text-ivory">{f.title}</h4>
              </div>
              <p className="mt-3 pl-9 text-[0.88rem] leading-[1.75] text-ivory/65">{f.body}</p>
            </RevealGroup.Item>
          ))}
        </RevealGroup>
      </Container>
    </div>
  )
}

/* ───────────────────────── C. Product range ───────────────────────── */

function Range() {
  return (
    <div className="pt-20 lg:pt-28">
      <Reveal>
        <Eyebrow>The range</Eyebrow>
        <h3 className="font-serif text-[1.7rem] font-medium leading-[1.12] text-ink sm:text-[2rem]">
          The complete range.
        </h3>
      </Reveal>
      <RevealGroup className="mt-10" stagger={0.05}>
        {skewProducts.map((p, i) => (
          <RevealGroup.Item key={p.slug}>
            <div
              className="grid gap-3 border-t border-ink/15 py-5 sm:grid-cols-[2.5rem_15rem_1fr_auto] sm:items-baseline sm:gap-6"
            >
              <span className="font-serif text-[1rem] text-gold">{String(i + 1).padStart(2, '0')}</span>
              <h4 className="font-serif text-[1.3rem] font-medium leading-tight text-ink">{p.name}</h4>
              <div>
                <p className="max-w-xl text-[0.9rem] leading-[1.7] text-charcoal">{p.blurb}</p>
                <p className="mt-1 text-[0.72rem] uppercase tracking-[0.14em] text-charcoal/55">{p.note}</p>
              </div>
              <Link
                to={enquiryLink(p.enquiry)}
                className="group inline-flex items-center gap-2 whitespace-nowrap text-[0.78rem] font-medium uppercase tracking-[0.12em] text-ink transition-colors hover:text-gold-deep"
              >
                Enquire
                <span aria-hidden="true" className="transition-transform duration-300 ease-editorial group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </RevealGroup.Item>
        ))}
        <div className="border-t border-ink/15" />
      </RevealGroup>
    </div>
  )
}

/* ───────────────────────── D. Heald wire dimensions ───────────────────────── */

const FILTERS = [
  { key: 'all', label: 'All types' },
  { key: 'O', label: 'O Type' },
  { key: 'C', label: 'C Type' },
  { key: 'J', label: 'J Type' },
]

function DimensionTables() {
  const [filter, setFilter] = useState('all')
  const rows = healdWireDimensions.filter((r) => filter === 'all' || r.type === filter)

  return (
    <div id="textile-healds" className="scroll-mt-24 pt-20 lg:pt-28">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <Reveal>
          <Eyebrow>Technical data</Eyebrow>
          <h3 className="font-serif text-[1.7rem] font-medium leading-[1.12] text-ink sm:text-[2rem]">
            Heald wire dimensions.
          </h3>
          <p className="mt-3 max-w-lg text-[0.92rem] leading-[1.75] text-charcoal">
            O, C and J types in simplex and duplex. All dimensions are in millimetres.
          </p>
        </Reveal>
        <div role="group" aria-label="Filter by heald wire type" className="flex border border-line bg-paper">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              aria-pressed={filter === f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                'px-4 py-2.5 text-[0.72rem] font-medium uppercase tracking-[0.12em] transition-colors duration-300',
                filter === f.key ? 'bg-ink text-ivory' : 'text-charcoal hover:bg-ivory-deep',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* desktop table */}
      <div className="mt-8 hidden border border-line bg-paper md:block">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Heald wire dimensions by type, configuration, length, eyelet and strip size, in millimetres</caption>
          <thead>
            <tr className="bg-ink text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ivory">
              <th scope="col" className="w-36 px-6 py-4">Type</th>
              <th scope="col" className="w-32 px-4 py-4">Config</th>
              <th scope="col" className="px-4 py-4">Length (mm)</th>
              <th scope="col" className="px-4 py-4">Eyelet (mm)</th>
              <th scope="col" className="px-4 py-4">Strip size (mm)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const firstOfType = i === 0 || rows[i - 1].type !== r.type
              return (
                <tr key={`${r.type}-${r.config}`} className={cn('align-top', firstOfType && i !== 0 && 'border-t-2 border-t-ink/20', 'border-b border-line')}>
                  <th scope="row" className="px-6 py-5">
                    {firstOfType ? (
                      <span className="flex items-baseline gap-2">
                        <span className="font-serif text-[2rem] font-medium leading-none text-ink">{r.type}</span>
                        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold-deep">Type</span>
                      </span>
                    ) : null}
                  </th>
                  <td className="px-4 py-5 text-[0.82rem] font-medium uppercase tracking-[0.1em] text-ink">{r.config}</td>
                  <td className="px-4 py-5"><div className="flex flex-wrap gap-1.5">{r.lengths.map((l) => <Pill key={l}>{l}</Pill>)}</div></td>
                  <td className="px-4 py-5"><div className="flex max-w-[22rem] flex-wrap gap-1.5">{r.eyelets.map((e) => <Pill key={e}>{e}</Pill>)}</div></td>
                  <td className="px-4 py-5"><div className="flex flex-wrap gap-1.5">{r.strips.map((s) => <Pill key={s}>{s}</Pill>)}</div></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* mobile cards */}
      <div className="mt-8 space-y-4 md:hidden">
        {rows.map((r) => (
          <div key={`${r.type}-${r.config}`} className="border border-line bg-paper">
            <div className="flex items-baseline gap-3 bg-ink px-4 py-3 text-ivory">
              <span className="font-serif text-[1.5rem] leading-none">{r.type}</span>
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold-soft">Type</span>
              <span className="ml-auto text-[0.74rem] font-medium uppercase tracking-[0.12em]">{r.config}</span>
            </div>
            <dl className="divide-y divide-line">
              {[
                ['Length (mm)', r.lengths],
                ['Eyelet (mm)', r.eyelets],
                ['Strip size (mm)', r.strips],
              ].map(([label, vals]) => (
                <div key={label} className="px-4 py-3">
                  <dt className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-charcoal/60">{label}</dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">{vals.map((v) => <Pill key={v}>{v}</Pill>)}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      <p className="mt-4 text-[0.78rem] text-charcoal/65">
        Heald wires are also manufactured as per customer requirements.
      </p>
    </div>
  )
}

/* ───────────────────────── E. Eye size recommendation ───────────────────────── */

function EyeSizeTable() {
  const [hot, setHot] = useState(null)
  const colCls = (i) => cn('px-2 py-3 text-center tabular-nums transition-colors duration-200', hot === i && 'bg-gold/15')
  const hover = (i) => ({ onMouseEnter: () => setHot(i), onMouseLeave: () => setHot(null) })

  const sizeRows = [
    ['Denier', 'denier'],
    ['Nm (metric)', 'nm'],
    ['Tex', 'tex'],
    ['Ne (cotton)', 'ne'],
  ]
  const groups = [
    ['Eye size for spun yarns', eyeSizeRecommendations.spun],
    ['Eye size for filament yarns', eyeSizeRecommendations.filament],
  ]

  return (
    <div className="pt-20 lg:pt-28">
      <Reveal>
        <Eyebrow>Choosing an eye size</Eyebrow>
        <h3 className="font-serif text-[1.7rem] font-medium leading-[1.12] text-ink sm:text-[2rem]">
          Eye size recommendation by yarn size.
        </h3>
        <p className="mt-3 max-w-xl text-[0.92rem] leading-[1.75] text-charcoal">
          Using the correct eye size of heald wire for the warp yarn is very important. Study the
          table to decide which eye size to use.
        </p>
      </Reveal>

      <div className="mt-8 overflow-x-auto border border-line bg-paper">
        <table className="w-full min-w-[720px] border-collapse text-[0.88rem]">
          <caption className="sr-only">Recommended heald wire eye sizes for spun and filament yarns, by denier, Nm, tex and Ne</caption>
          <tbody>
            {sizeRows.map(([label, key]) => (
              <tr key={key} className="border-b border-line">
                <th scope="row" className="sticky left-0 z-10 w-40 bg-ivory-deep px-4 py-3 text-left text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-gold-deep">
                  {label}
                </th>
                {yarnSizes.map((y, i) => (
                  <td key={i} {...hover(i)} className={cn(colCls(i), 'font-serif text-[1.05rem] text-ink')}>
                    {y[key]}
                  </td>
                ))}
              </tr>
            ))}
            {groups.map(([title, recs]) => (
              <GroupRows key={title} title={title} recs={recs} colCls={colCls} hover={hover} />
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-[0.78rem] text-charcoal/65">
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="inline-block h-2.5 w-2.5 bg-ink" /> Recommended eye size (mm) for that yarn size
        </span>
      </p>
    </div>
  )
}

function GroupRows({ title, recs, colCls, hover }) {
  return (
    <>
      <tr className="border-b border-line bg-ivory-deep/70">
        <th scope="colgroup" colSpan={yarnSizes.length + 1} className="px-4 py-2.5 text-left text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink">
          {title}
        </th>
      </tr>
      {recs.map((r) => (
        <tr key={r.eye} className="border-b border-line last:border-b-0">
          <th scope="row" className="sticky left-0 z-10 bg-ivory-deep px-4 py-3 text-left font-serif text-[1.05rem] font-medium text-ink">
            {r.eye}
          </th>
          {yarnSizes.map((_, i) => (
            <td key={i} {...hover(i)} className={colCls(i)}>
              {r.fits.includes(i) ? (
                <>
                  <span aria-hidden="true" className="inline-block h-2.5 w-2.5 bg-ink" />
                  <span className="sr-only">Recommended</span>
                </>
              ) : (
                <span className="sr-only">Not recommended</span>
              )}
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}

/* ───────────────────────── F. Compatibility ───────────────────────── */

function Compatibility() {
  return (
    <div className="pt-20 lg:pt-28">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <Eyebrow>Machine compatibility</Eyebrow>
          <h3 className="font-serif text-[1.7rem] font-medium leading-[1.12] text-ink sm:text-[2rem]">
            Suitable for automatic drawing-in machines.
          </h3>
        </Reveal>
        <div className="lg:col-span-7">
          <Reveal delay={0.06}>
            <p className="max-w-xl text-[0.95rem] leading-[1.8] text-charcoal">{compatibilityNote}</p>
            <ul className="mt-6 grid grid-cols-2 border-l border-t border-line sm:grid-cols-3">
              {compatibleMachines.map((m) => (
                <li key={m} className="border-b border-r border-line bg-paper px-4 py-4 font-serif text-[1.15rem] font-medium text-ink">
                  {m}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[0.74rem] leading-relaxed text-charcoal/60">
              Machine manufacturer names are used only to indicate compatibility.
            </p>
          </Reveal>
        </div>
      </div>
    </div>
  )
}

/* ───────────────────────── G. Leno healds / drop wires ───────────────────────── */

function OtherProducts() {
  const items = [
    {
      id: 'leno-healds',
      title: 'Leno Healds & Magnetic Leno Heald Doup',
      img: '/images/skew/skew-leno-healds.jpg',
      alt: 'A set of leno healds and a leno doup in several lengths',
      body: 'Manufactured for smooth yarn control, accurate crossing motion and consistent weaving performance. Precision forming and fine surface finishing ensure reduced friction, stable running and dependable operation in demanding weaving conditions.',
      types: ['Leno Healds', 'Magnetic Leno Heald Doup'],
    },
    {
      id: 'drop-wires',
      title: 'Drop Wires',
      img: '/images/skew/skew-drop-wires.jpg',
      alt: 'Four drop wire profiles',
      body: 'Produced with strict dimensional control and durable finishing to ensure reliable performance, long service life and smooth operation across modern weaving applications.',
      types: ['Drop Wires'],
    },
  ]
  return (
    <div className="pt-20 lg:pt-28">
      <div className="grid gap-px border border-line bg-line md:grid-cols-2">
        {items.map((it) => (
          <Reveal key={it.id} className="flex flex-col bg-ivory">
            <div id={it.id} className="scroll-mt-24 bg-ivory-deep p-6 sm:p-8">
              <Figure src={it.img} alt={it.alt} ratio="4 / 5" fit="contain" zoom className="[&>div]:!bg-ivory-deep" />
            </div>
            <div className="flex flex-1 flex-col p-6 sm:p-8">
              <h3 className="font-serif text-[1.45rem] font-medium leading-tight text-ink">{it.title}</h3>
              <p className="mt-3 text-[0.92rem] leading-[1.75] text-charcoal">{it.body}</p>
              <p className="mt-3 text-[0.72rem] uppercase tracking-[0.14em] text-charcoal/55">Dimensions on request</p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {it.types.map((t) => (
                  <Link
                    key={t}
                    to={enquiryLink(t)}
                    className="group inline-flex items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.12em] text-ink transition-colors hover:text-gold-deep"
                  >
                    Enquire — {t}
                    <span aria-hidden="true" className="transition-transform duration-300 ease-editorial group-hover:translate-x-1">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

/* ───────────────────────── H. Catalogue request ───────────────────────── */

function CatalogueBand() {
  return (
    <div className="mt-20 lg:mt-28">
      <div className="bg-ink px-6 py-12 text-ivory sm:px-12 sm:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow light>Technical catalogue</Eyebrow>
              <h3 className="font-serif text-[1.8rem] font-medium leading-[1.12] text-ivory sm:text-[2.2rem]">
                Request the technical catalogue.
              </h3>
              <p className="mt-4 max-w-lg text-[0.95rem] leading-[1.8] text-ivory/70">
                Tell us who you are and which machines you run. We will send the technical catalogue and
                respond to your machinery requirements.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:col-span-5 lg:justify-end">
            <Button to={enquiryLink(CATALOGUE)} variant="light">
              Request Technical Catalogue
            </Button>
            <Button to={enquiryLink('Skew Heald Wires')} variant="outlineLight">
              Submit Machinery Requirements
            </Button>
          </Reveal>
        </div>
      </div>
    </div>
  )
}

export function PrecisionComponents() {
  return (
    <section id="precision" className="scroll-mt-24 border-t border-line">
      <Container className="pt-24 lg:pt-32">
        <Intro />
      </Container>
      <div className="mt-20 lg:mt-28">
        <Features />
      </div>
      <Container className="pb-24 lg:pb-32">
        <Range />
        <DimensionTables />
        <EyeSizeTable />
        <Compatibility />
        <OtherProducts />
        <CatalogueBand />
      </Container>
    </section>
  )
}
