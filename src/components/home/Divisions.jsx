import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { cn } from '../../lib/cn'

// Yarns and fabrics are the principal divisions; the rest read as supporting.
const DIVISIONS = [
  { name: 'Yarns', to: '/yarns', major: true },
  { name: 'Fabrics', to: '/fabrics', major: true },
  { name: 'Weaving Accessories', to: '/weaving-accessories' },
  { name: 'Industrial Packaging', to: '/other-products' },
  { name: 'Agro Products', to: '/other-products#agro' },
]

export function Divisions() {
  return (
    <nav aria-label="Product divisions" className="border-b border-line bg-ivory">
      <Container>
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {DIVISIONS.map((d, i) => (
            <li key={d.to} className={cn('border-line', i > 0 && 'lg:border-l')}>
              <Link
                to={d.to}
                className="group flex items-center justify-between gap-3 px-1 py-4 lg:px-6 lg:first:pl-0"
              >
                <span className="flex items-baseline gap-3">
                  <span className="font-serif text-[0.8rem] text-gold">{String(i + 1).padStart(2, '0')}</span>
                  <span
                    className={cn(
                      'transition-colors group-hover:text-gold-deep',
                      d.major ? 'text-[0.92rem] font-medium text-ink' : 'text-[0.82rem] text-charcoal/80',
                    )}
                  >
                    {d.name}
                  </span>
                </span>
                <span aria-hidden="true" className="text-charcoal/25 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-gold">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  )
}
