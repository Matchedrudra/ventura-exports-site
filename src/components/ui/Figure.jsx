import { useState } from 'react'
import { cn } from '../../lib/cn'
import { useInView } from '../../hooks/useInView'

/**
 * Image with a fixed aspect ratio and lazy loading. On entering the viewport
 * it reveals with a soft top-down wipe while settling from a slight scale;
 * with `zoom` it also eases in a subtle hover zoom. Reduced motion shows it
 * immediately.
 */
export function Figure({
  src,
  alt,
  ratio = '4 / 3',
  fit = 'cover',
  className,
  imgClassName,
  caption,
  priority = false,
  zoom = false,
  fill = false,
  sizes = '(min-width: 1024px) 50vw, 100vw',
}) {
  const [loaded, setLoaded] = useState(false)
  const { ref, shown, reduced } = useInView({ immediate: priority })
  const contain = fit === 'contain'
  const motion = !reduced
  const ease = 'cubic-bezier(0.22, 1, 0.36, 1)'

  return (
    <figure className={cn('group m-0', fill && 'h-full', className)}>
      <div
        ref={ref}
        className={cn('relative overflow-hidden', fill && 'h-full', contain ? 'bg-paper' : 'bg-ivory-deep')}
        style={fill ? undefined : { aspectRatio: ratio }}
      >
        <div
          className="absolute inset-0"
          style={
            motion
              ? {
                  clipPath: shown ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)',
                  transform: shown ? 'scale(1)' : 'scale(1.06)',
                  transition: `clip-path 1.1s ${ease}, transform 1.6s ${ease}`,
                }
              : undefined
          }
        >
          <img
            src={src}
            alt={alt}
            sizes={sizes}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchpriority={priority ? 'high' : 'auto'}
            onLoad={() => setLoaded(true)}
            className={cn(
              'h-full w-full transition-[opacity,transform] duration-[1200ms] ease-editorial',
              contain ? 'object-contain p-2 sm:p-4' : 'object-cover',
              loaded || !motion ? 'opacity-100' : 'opacity-0',
              zoom && 'group-hover:scale-[1.045]',
              imgClassName,
            )}
          />
        </div>
      </div>
      {caption && (
        <figcaption className="mt-3 text-[0.8rem] leading-relaxed text-charcoal/70">{caption}</figcaption>
      )}
    </figure>
  )
}
