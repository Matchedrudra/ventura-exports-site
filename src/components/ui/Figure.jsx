import { useState } from 'react'
import { cn } from '../../lib/cn'

/**
 * Image with a fixed aspect ratio, lazy loading, and a quiet fade-in
 * once the file has decoded. No zoom, no parallax.
 */
export function Figure({
  src,
  alt,
  ratio = '4 / 3',
  className,
  imgClassName,
  caption,
  priority = false,
  sizes = '(min-width: 1024px) 50vw, 100vw',
}) {
  const [loaded, setLoaded] = useState(false)
  return (
    <figure className={cn('m-0', className)}>
      <div
        className="relative overflow-hidden bg-ivory-deep"
        style={{ aspectRatio: ratio }}
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
            'absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[900ms] ease-editorial',
            loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.03]',
            imgClassName,
          )}
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-[0.8rem] leading-relaxed text-ink/50">{caption}</figcaption>
      )}
    </figure>
  )
}
