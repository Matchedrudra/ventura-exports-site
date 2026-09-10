import { forwardRef, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

/*
 * Full-screen image viewer with real zoom + pan.
 *
 * - wheel / trackpad zoom toward the cursor
 * - pinch-to-zoom and one-finger pan on touch
 * - drag to pan while zoomed, double-click / double-tap to toggle zoom
 * - +/- , reset and close controls; prev / next when several images are passed
 * - Escape and arrow keys; restrained dark backdrop; respects reduced motion
 *
 * No external library — pointer events + CSS transforms only. The files in
 * /images are the full-resolution originals, so zooming inspects the real
 * photograph.
 */

const MIN = 1
const MAX = 5
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))

export function Lightbox({ images, startIndex = 0, onClose }) {
  const reduced = usePrefersReducedMotion()
  const [i, setI] = useState(startIndex)
  const [t, setT] = useState({ s: 1, x: 0, y: 0 })
  const [show, setShow] = useState(false)
  const [interacting, setInteracting] = useState(false)

  const stageRef = useRef(null)
  const imgRef = useRef(null)
  const pointers = useRef(new Map())
  const drag = useRef(null)
  const pinch = useRef(null)
  const closeBtn = useRef(null)

  const many = images.length > 1
  const current = images[i]
  const zoomed = t.s > MIN

  const reset = useCallback(() => setT({ s: 1, x: 0, y: 0 }), [])

  const go = useCallback(
    (dir) => {
      setI((prev) => (prev + dir + images.length) % images.length)
      reset()
    },
    [images.length, reset],
  )

  const clampPan = useCallback((x, y, s) => {
    const stage = stageRef.current
    const img = imgRef.current
    if (!stage || !img) return [x, y]
    const maxX = Math.max(0, (img.clientWidth * s - stage.clientWidth) / 2)
    const maxY = Math.max(0, (img.clientHeight * s - stage.clientHeight) / 2)
    return [clamp(x, -maxX, maxX), clamp(y, -maxY, maxY)]
  }, [])

  // resolver is an absolute scale or a fn(prevScale) -> scale; zoom keeps the
  // point (cx, cy) — measured from the stage centre — fixed under the cursor.
  const applyZoom = useCallback(
    (resolver, cx = 0, cy = 0) => {
      setT((prev) => {
        const target = typeof resolver === 'function' ? resolver(prev.s) : resolver
        const s = clamp(target, MIN, MAX)
        if (s === prev.s) return prev
        const ratio = s / prev.s
        const rawX = s === MIN ? 0 : cx - ratio * (cx - prev.x)
        const rawY = s === MIN ? 0 : cy - ratio * (cy - prev.y)
        const [x, y] = clampPan(rawX, rawY, s)
        return { s, x, y }
      })
    },
    [clampPan],
  )
  const zoomBy = useCallback((factor, cx, cy) => applyZoom((s) => s * factor, cx, cy), [applyZoom])

  useEffect(() => {
    const id = requestAnimationFrame(() => setShow(true))
    return () => cancelAnimationFrame(id)
  }, [])

  useLayoutEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.__lenis?.stop()
    closeBtn.current?.focus()
    return () => {
      document.body.style.overflow = prev
      window.__lenis?.start()
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight' && many) go(1)
      else if (e.key === 'ArrowLeft' && many) go(-1)
      else if (e.key === '+' || e.key === '=') zoomBy(1.4)
      else if (e.key === '-' || e.key === '_') zoomBy(1 / 1.4)
      else if (e.key === '0') reset()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [many, go, zoomBy, reset, onClose])

  // non-passive wheel so preventDefault works
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const onWheel = (e) => {
      e.preventDefault()
      const r = el.getBoundingClientRect()
      zoomBy(
        Math.exp(-e.deltaY * 0.0016),
        e.clientX - r.left - r.width / 2,
        e.clientY - r.top - r.height / 2,
      )
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [zoomBy])

  const relCenter = (clientX, clientY) => {
    const r = stageRef.current.getBoundingClientRect()
    return { cx: clientX - r.left - r.width / 2, cy: clientY - r.top - r.height / 2 }
  }

  const onPointerDown = (e) => {
    try {
      stageRef.current.setPointerCapture?.(e.pointerId)
    } catch {
      /* non-fatal: pointer capture unavailable */
    }
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    setInteracting(true)
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()]
      const mid = relCenter((a.x + b.x) / 2, (a.y + b.y) / 2)
      pinch.current = {
        dist: Math.hypot(a.x - b.x, a.y - b.y) || 1,
        s: t.s,
        x: t.x,
        y: t.y,
        cx: mid.cx,
        cy: mid.cy,
      }
      drag.current = null
    } else if (t.s > MIN) {
      drag.current = { x: e.clientX, y: e.clientY, tx: t.x, ty: t.y }
    }
  }

  const onPointerMove = (e) => {
    if (!pointers.current.has(e.pointerId)) return
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })

    if (pointers.current.size === 2 && pinch.current) {
      const [a, b] = [...pointers.current.values()]
      const dist = Math.hypot(a.x - b.x, a.y - b.y)
      const s = clamp((pinch.current.s * dist) / pinch.current.dist, MIN, MAX)
      const ratio = s / pinch.current.s
      let rawX = pinch.current.cx - ratio * (pinch.current.cx - pinch.current.x)
      let rawY = pinch.current.cy - ratio * (pinch.current.cy - pinch.current.y)
      if (s === MIN) {
        rawX = 0
        rawY = 0
      }
      const [x, y] = clampPan(rawX, rawY, s)
      setT({ s, x, y })
    } else if (pointers.current.size === 1 && drag.current) {
      const [x, y] = clampPan(
        drag.current.tx + (e.clientX - drag.current.x),
        drag.current.ty + (e.clientY - drag.current.y),
        t.s,
      )
      setT((prev) => ({ ...prev, x, y }))
    }
  }

  const endPointer = (e) => {
    pointers.current.delete(e.pointerId)
    if (pointers.current.size < 2) pinch.current = null
    if (pointers.current.size === 0) {
      drag.current = null
      setInteracting(false)
    } else if (pointers.current.size === 1) {
      const [only] = [...pointers.current.values()]
      drag.current = t.s > MIN ? { x: only.x, y: only.y, tx: t.x, ty: t.y } : null
    }
  }

  const onDoubleClick = (e) => {
    if (t.s > MIN) {
      reset()
    } else {
      const { cx, cy } = relCenter(e.clientX, e.clientY)
      applyZoom(2.5, cx, cy)
    }
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Image viewer — ${current.alt}`}
      className="fixed inset-0 z-[120] flex flex-col bg-ink/95 backdrop-blur-md"
      style={{ opacity: show ? 1 : 0, transition: reduced ? 'none' : 'opacity 220ms ease' }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <span className="text-[0.75rem] uppercase tracking-widelabel text-ivory/50">
          {many ? `${i + 1} / ${images.length}` : ''}
        </span>
        <div className="flex items-center gap-1.5">
          <IconButton label="Zoom out" onClick={() => zoomBy(1 / 1.4)} disabled={!zoomed}>
            <line x1="5" y1="11" x2="17" y2="11" />
          </IconButton>
          <IconButton label="Zoom in" onClick={() => zoomBy(1.4)} disabled={t.s >= MAX}>
            <line x1="11" y1="5" x2="11" y2="17" />
            <line x1="5" y1="11" x2="17" y2="11" />
          </IconButton>
          <IconButton label="Reset zoom" onClick={reset} disabled={!zoomed}>
            <path d="M11 4a7 7 0 1 0 7 7" />
            <path d="M18 4v4h-4" />
          </IconButton>
          <IconButton ref={closeBtn} label="Close image viewer" onClick={onClose} strong>
            <path d="M5 5 L17 17 M17 5 L5 17" />
          </IconButton>
        </div>
      </div>

      <div
        ref={stageRef}
        className="relative flex-1 select-none overflow-hidden"
        style={{
          touchAction: 'none',
          cursor: zoomed ? (interacting ? 'grabbing' : 'grab') : 'zoom-in',
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPointer}
        onPointerCancel={endPointer}
        onDoubleClick={onDoubleClick}
      >
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4 sm:p-10">
          <img
            ref={imgRef}
            src={current.src}
            alt={current.alt}
            draggable={false}
            className="max-h-full max-w-full object-contain shadow-2xl"
            style={{
              transform: `translate3d(${t.x}px, ${t.y}px, 0) scale(${t.s})`,
              transformOrigin: 'center center',
              transition:
                interacting || reduced
                  ? 'none'
                  : 'transform 200ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease',
              opacity: show ? 1 : 0,
            }}
          />
        </div>

        {many && (
          <>
            <Arrow side="left" label="Previous image" onClick={() => go(-1)} />
            <Arrow side="right" label="Next image" onClick={() => go(1)} />
          </>
        )}
      </div>
    </div>,
    document.body,
  )
}

const IconButton = forwardRef(function IconButton(
  { children, label, onClick, disabled, strong },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={
        'inline-flex h-9 w-9 items-center justify-center rounded-full border text-ivory/80 outline-none transition-colors disabled:cursor-default disabled:opacity-25 focus-visible:ring-1 focus-visible:ring-gold/60 ' +
        (strong
          ? 'border-white/25 bg-white/10 hover:bg-white/20'
          : 'border-white/12 bg-white/[0.05] hover:border-white/25 hover:bg-white/10')
      }
    >
      <svg
        viewBox="0 0 22 22"
        className="h-[18px] w-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {children}
      </svg>
    </button>
  )
})

function Arrow({ side, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={
        'absolute top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] text-ivory/80 outline-none transition-colors hover:border-white/25 hover:bg-white/10 focus-visible:ring-1 focus-visible:ring-gold/60 ' +
        (side === 'left' ? 'left-3 sm:left-6' : 'right-3 sm:right-6')
      }
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {side === 'left' ? <path d="M15 5l-7 7 7 7" /> : <path d="M9 5l7 7-7 7" />}
      </svg>
    </button>
  )
}
