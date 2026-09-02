import { RevealGroup } from '../ui/Reveal'

/** A single FIBC technical-option group: title, note, and a chip list. */
export function OptionGroup({ group }) {
  return (
    <div className="border-t border-line py-7">
      <div className="grid gap-4 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <h3 className="text-[1.02rem] font-medium text-ink">{group.title}</h3>
          {group.note && (
            <p className="mt-2 text-[0.86rem] leading-relaxed text-ink/55">{group.note}</p>
          )}
        </div>
        <ul className="flex flex-wrap gap-x-2 gap-y-2 lg:col-span-8">
          {group.items.map((item) => (
            <li
              key={item}
              className="border border-line px-3 py-1.5 text-[0.85rem] text-ink/75"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function OptionGroups({ groups = [] }) {
  return (
    <RevealGroup className="border-b border-line">
      {groups.map((group) => (
        <RevealGroup.Item key={group.key}>
          <OptionGroup group={group} />
        </RevealGroup.Item>
      ))}
    </RevealGroup>
  )
}
