import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'
import { Figure } from '../ui/Figure'
import { Reveal } from '../ui/Reveal'
import {
  ConeSizesDiagram,
  WindingFormatsDiagram,
  CartonLayoutsDiagram,
  PackagingComparisonDiagram,
} from './ConeDiagrams'
import { coneOptions, packagingOptions, packagingNote, packagingDisclaimer } from '../../data/textiles'

const INTRO =
  'Different international buyers have different requirements. Textile buyers can specify their preferred cone configurations and export packaging, and we work with our manufacturing partners to accommodate them.'

function Panel({ title, caption, children }) {
  return (
    <figure className="m-0 border border-line bg-paper p-5 sm:p-6">
      <div className="flex min-h-[140px] items-center justify-center">{children}</div>
      <figcaption className="mt-4 border-t border-line pt-3">
        <span className="block text-[0.72rem] font-semibold uppercase tracking-label text-ink/60">{title}</span>
        {caption && <span className="mt-1 block text-[0.82rem] leading-relaxed text-ink/55">{caption}</span>}
      </figcaption>
    </figure>
  )
}

/** Compact version for the homepage. */
function Summary() {
  return (
    <section id="packaging" className="border-y border-line bg-paper py-20 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading label="Cones & export packaging" title="Packaging That Works for Your Business." lead={INTRO} />
            <ul className="mt-8 divide-y divide-line border-y border-line text-[0.95rem] text-ink/75">
              {[
                ['Cone options', 'Sizes, weights, winding formats and package configurations.'],
                ['Customised packaging', 'Cones per carton, carton quantities, labelling, palletisation.'],
                ['Destination-specific', 'Packaging discussed to suit the destination market and your specification.'],
              ].map(([t, b]) => (
                <li key={t} className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-6">
                  <span className="w-44 shrink-0 font-medium text-ink">{t}</span>
                  <span className="text-ink/65">{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button to="/quality-packaging#packaging" variant="outline">
                Cone &amp; packaging options
              </Button>
            </div>
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <Figure
                src="/images/textile/cone-winding-operator.jpg"
                alt="Operator handling white yarn cones at a cone-winding machine in a textile mill"
                ratio="3 / 2"
              />
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mt-4 border border-line bg-paper p-5">
                <PackagingComparisonDiagram className="mx-auto h-auto w-full max-w-[520px]" />
                <p className="mt-2 text-center text-[0.72rem] uppercase tracking-label text-ink/45">
                  Illustrative — configuration agreed per order
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}

/** Full section for the Quality & Packaging page. */
function Full() {
  return (
    <section id="packaging" className="scroll-mt-24 bg-paper py-16 lg:py-24">
      <Container>
        <SectionHeading label="Cones & export packaging" title="Packaging That Works for Your Business." lead={INTRO} />

        {/* A — cone options */}
        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <p className="font-serif text-[1.1rem] text-gold">A</p>
            <h3 className="mt-2 font-serif text-[1.6rem] font-normal leading-tight text-ink">Cone options</h3>
            <p className="mt-4 text-[0.98rem] leading-[1.7] text-ink/70">
              Yarn can be supplied on cones configured to your machines and handling. The options
              below are the points a buyer can specify.
            </p>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {coneOptions.map((o) => (
                <li key={o.title} className="py-3.5">
                  <span className="block text-[0.9rem] font-medium text-ink">{o.title}</span>
                  <span className="mt-0.5 block text-[0.86rem] leading-relaxed text-ink/60">{o.body}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <Reveal>
                <Panel title="Different cone sizes" caption="Dimensions and weight per cone as you specify.">
                  <ConeSizesDiagram className="h-auto w-full max-w-[300px]" />
                </Panel>
              </Reveal>
              <Reveal delay={0.06}>
                <Panel title="Winding formats" caption="Parallel or tapered, to suit the next process.">
                  <WindingFormatsDiagram className="h-auto w-full max-w-[300px]" />
                </Panel>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Figure
                  src="/images/textile/blue-yarn-cones.jpg"
                  alt="Blue yarn cones wound in parallel rows"
                  ratio="4 / 3"
                  caption="Yarn wound on cones — specification confirmed per order."
                />
                <Figure
                  src="/images/textile/cones-on-frame.jpg"
                  alt="White yarn packages in rows on a winding frame"
                  ratio="4 / 3"
                  caption="Cone configuration is set with the manufacturing partner."
                />
              </div>
            </Reveal>
          </div>
        </div>

        {/* B — customised packaging */}
        <div className="mt-20 grid gap-10 border-t border-line pt-16 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <p className="font-serif text-[1.1rem] text-gold">B</p>
            <h3 className="mt-2 font-serif text-[1.6rem] font-normal leading-tight text-ink">Customised packaging</h3>
            <p className="mt-4 text-[0.98rem] leading-[1.7] text-ink/70">
              We aim to accommodate buyer-specific packaging preferences, subject to manufacturer
              capabilities and order specifications.
            </p>
            <ul className="mt-6 space-y-2.5">
              {packagingOptions.map((o) => (
                <li key={o} className="flex gap-3 text-[0.92rem] leading-relaxed text-ink/75">
                  <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-gold" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <Panel title="Cones per carton" caption="Carton layouts seen from above — quantities are agreed per order.">
                <CartonLayoutsDiagram className="h-auto w-full max-w-[420px]" />
              </Panel>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mt-4">
                <Figure
                  src="/images/textile/cones-palletising.jpg"
                  alt="Workers stacking wound yarn cones onto a pallet in a warehouse"
                  ratio="16 / 9"
                  caption="Cones handled and palletised ahead of export shipment."
                />
              </div>
            </Reveal>
          </div>
        </div>

        {/* C — international buyer requirements */}
        <div className="mt-20 grid gap-10 border-t border-line pt-16 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <p className="font-serif text-[1.1rem] text-gold">C</p>
            <h3 className="mt-2 font-serif text-[1.6rem] font-normal leading-tight text-ink">
              International buyer requirements
            </h3>
            <p className="mt-4 text-[0.98rem] leading-[1.7] text-ink/70">
              Packaging can be discussed according to the destination market and your specification.
            </p>
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <blockquote className="border-l-2 border-gold pl-6 font-serif text-[1.25rem] leading-[1.55] text-ink/85 sm:text-[1.4rem]">
                “{packagingNote}”
              </blockquote>
            </Reveal>
            <Reveal delay={0.08} className="mt-6">
              <Panel
                title="Packing arrangements compared"
                caption="An individually wrapped cone, cones layered in a carton, and cartons palletised — illustrative only."
              >
                <PackagingComparisonDiagram className="h-auto w-full max-w-[600px]" />
              </Panel>
            </Reveal>
            <p className="mt-5 text-[0.84rem] leading-relaxed text-ink/50">{packagingDisclaimer}</p>
          </div>
        </div>
      </Container>
    </section>
  )
}

export function ConePackaging({ variant = 'full' }) {
  return variant === 'summary' ? <Summary /> : <Full />
}
