import { useEffect, useState } from 'react'

/**
 * How far the page has scrolled through `distance`, clamped to 0..1.
 *
 * Used to drive the logo handoff between the hero and the header. Both components read the
 * same distance so their halves of the transition stay in step.
 */
export function useScrollProgress(distance: number): number {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      setProgress(Math.min(1, Math.max(0, window.scrollY / distance)))
    }

    const onScroll = () => {
      // Coalesce bursts of scroll events into one write per frame.
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [distance])

  return progress
}

/** Clamp to 0..1. */
export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value))
}
