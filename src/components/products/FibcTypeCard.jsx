import { RevealGroup } from '../ui/Reveal'

export function FibcTypeGrid({ types = [] }) {
  return (
    <RevealGroup className="grid gap-px border border-line bg-line sm:grid-cols-2">
      {types.map((t) => (
        <RevealGroup.Item key={t.slug} className="flex flex-col bg-ivory p-6 lg:p-8">
          <h3 className="text-[1.15rem] font-medium tracking-[-0.01em] text-ink">{t.name}</h3>
          <p className="mt-1 text-[0.82rem] uppercase tracking-label text-ink/45">{t.construction}</p>

          <dl className="mt-5 grid grid-cols-2 gap-4 border-y border-line py-4 text-[0.85rem]">
            <div>
              <dt className="text-[0.7rem] uppercase tracking-label text-ink/45">SWL</dt>
              <dd className="mt-1 text-ink/80">{t.swl}</dd>
            </div>
            <div>
              <dt className="text-[0.7rem] uppercase tracking-label text-ink/45">Safety factor</dt>
              <dd className="mt-1 text-ink/80">{t.safetyFactor}</dd>
            </div>
          </dl>

          <ul className="mt-4 space-y-2 text-[0.88rem] leading-relaxed text-ink/65">
            {t.features.map((f) => (
              <li key={f} className="flex gap-2.5">
                <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-gold" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <p className="mt-5 text-[0.8rem] leading-relaxed text-ink/50">
            <span className="uppercase tracking-label text-ink/40">Typical use — </span>
            {t.applications.join(', ')}.
          </p>
        </RevealGroup.Item>
      ))}
    </RevealGroup>
  )
}
