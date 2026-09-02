import { Reveal } from '../ui/Reveal'

export function Interlude() {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src="/images/warehouse-aisle.jpg"
        alt="Palletised goods on high-bay racking in a distribution warehouse"
        loading="lazy"
        decoding="async"
        width="1700"
        height="1133"
        className="h-[52vh] min-h-[360px] w-full object-cover lg:h-[62vh]"
      />
      <div className="absolute inset-0 bg-ink/58" />
      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-[1320px] px-6 lg:px-14">
          <Reveal
            as="blockquote"
            className="max-w-2xl font-serif text-[1.55rem] font-normal leading-[1.42] text-ivory sm:text-[1.95rem]"
          >
            “The bag that arrives should match the filling line, the product and the route — decided
            before production, not discovered on delivery.”
          </Reveal>
        </div>
      </div>
    </section>
  )
}
