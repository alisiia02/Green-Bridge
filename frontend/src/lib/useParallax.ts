import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

/**
 * Parallax offset for a banner image, in pixels.
 *
 * Returns a ref to attach to the clipping container, and how far the layer inside it
 * should be pushed down as the page scrolls. Moving the image down as the page moves up
 * makes it travel slower than the content, which is the whole effect.
 *
 * The offset is capped at `strength` x the container height, which is reached exactly when
 * the container has scrolled out of view - so the image never runs out of overscan and
 * never visibly sticks. Size the layer to match: `strength` of 0.3 needs a layer 160% tall
 * starting at -30%.
 *
 * Returns 0 for anyone who has asked for reduced motion.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(strength = 0.3) {
  const ref = useRef<T>(null)
  const [offset, setOffset] = useState(0)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (reducedMotion) {
      setOffset(0)
      return
    }

    let frame = 0

    const update = () => {
      frame = 0
      const rect = element.getBoundingClientRect()
      // How far the container's top has travelled above the viewport top.
      const scrolled = Math.max(0, -rect.top)
      setOffset(Math.min(scrolled * strength, rect.height * strength))
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
  }, [strength, reducedMotion])

  return { ref, offset }
}
