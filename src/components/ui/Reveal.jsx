import {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
  Children,
  cloneElement,
  isValidElement,
} from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { cn } from '../../lib/cn'

/**
 * Understated entrance: a short fade with a small upward move, once,
 * when the element scrolls into view.
 *
 * Robust by design — content is never left permanently hidden:
 *   • reduced-motion or no IntersectionObserver → render visible immediately
 *   • a safety timeout reveals content even if the observer never fires
 */

const GroupCtx = createContext(null)

function useReveal({ rootMargin = '0px 0px -8% 0px' } = {}) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  // When true, snap to the final state with no transition (reduced-motion,
  // no observer support, or the failsafe fired).
  const [instant, setInstant] = useState(reduced)

  useEffect(() => {
    if (reduced || typeof IntersectionObserver === 'undefined') {
      setInstant(true)
      setShown(true)
      return
    }
    const el = ref.current
    if (!el) return

    let done = false
    const reveal = (snap) => {
      if (done) return
      done = true
      if (snap) setInstant(true)
      setShown(true)
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          reveal(false)
          io.disconnect()
        }
      },
      { rootMargin, threshold: 0.01 },
    )
    io.observe(el)

    // Failsafe: never leave content invisible — and skip the animation.
    const t = setTimeout(() => reveal(true), 1600)

    return () => {
      io.disconnect()
      clearTimeout(t)
    }
  }, [reduced, rootMargin])

  return { ref, shown, reduced: reduced || instant }
}

const transition = 'opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1)'

export function Reveal({ as: Tag = 'div', children, delay = 0, y = 16, className, style, ...rest }) {
  const group = useContext(GroupCtx)
  const solo = useReveal()
  const shown = group ? group.shown : solo.shown
  const reduced = group ? group.reduced : solo.reduced

  const motionStyle = reduced
    ? undefined
    : {
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : `translateY(${y}px)`,
        transition,
        transitionDelay: shown ? `${delay}s` : '0s',
        willChange: 'opacity, transform',
      }

  return (
    <Tag
      ref={group ? undefined : solo.ref}
      className={className}
      style={{ ...motionStyle, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Staggered container — direct <RevealGroup.Item> children fade in together with an offset. */
export function RevealGroup({ children, className, stagger = 0.08, ...rest }) {
  const { ref, shown, reduced } = useReveal()
  let i = 0
  const indexed = Children.map(children, (child) =>
    isValidElement(child) && child.type === RevealGroup.Item
      ? cloneElement(child, { index: i++ })
      : child,
  )
  return (
    <GroupCtx.Provider value={{ shown, reduced, stagger }}>
      <div ref={ref} className={className} {...rest}>
        {indexed}
      </div>
    </GroupCtx.Provider>
  )
}

RevealGroup.Item = function RevealItem({ children, className, y = 16, index = 0, ...rest }) {
  const group = useContext(GroupCtx)
  const shown = group ? group.shown : true
  const reduced = group ? group.reduced : true
  const stagger = group ? group.stagger : 0

  const style = reduced
    ? undefined
    : {
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : `translateY(${y}px)`,
        transition,
        transitionDelay: shown ? `${index * stagger}s` : '0s',
      }

  return (
    <div className={cn(className)} style={style} {...rest}>
      {children}
    </div>
  )
}
