import type { ReactNode } from 'react'
import { PageContainer } from '@/components/layout/PageContainer'
import { PlaceholderImage } from '@/components/ui/PlaceholderImage'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Logo } from '@/components/ui/Logo'
import { LOGO_HANDOFF_DISTANCE } from '@/constants/motion'
import { useParallax } from '@/lib/useParallax'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { useScrollProgress } from '@/lib/useScrollProgress'
import { cn } from '@/lib/cn'

interface HeroProps {
  eyebrow?: string
  /** Names the site. Used as the logo's alt text, since the logo *is* the title here. */
  title: string
  description: string
  /** Buttons or links rendered under the description. */
  actions?: ReactNode
  /** Imported image. Falls back to a PlaceholderImage when absent. */
  image?: string
  /** Describes the photo. Required whenever `image` is set. */
  imageAlt?: string
  /** Caption for the placeholder, used only when there is no `image`. */
  imageLabel?: string
  className?: string
}

/** Must stay in step with the layer sizing below - see useParallax. */
const PARALLAX_STRENGTH = 0.3

/**
 * Full-width image banner with the logo and intro centred over the photo.
 *
 * On scroll the logo shrinks and rises while the block fades, handing off to the mark in
 * the header, which fades in over the same distance. Both sit on the page centre line, so
 * the movement is straight up. The two are different artwork - one carries the wordmark,
 * one does not - so this is a cross-fade rather than a true morph.
 *
 * The image itself is oversized and drifts more slowly than the page. The scrim is a flat
 * colour at partial opacity, not a gradient: it holds the white text legible over whatever
 * the photograph is doing, and keeps the transparent header readable across the top.
 *
 * The image runs edge to edge, so it is the one element on the site without a corner
 * radius - a rounded full-bleed banner would show slivers of background at the corners.
 */
export function Hero({
  eyebrow,
  title,
  description,
  actions,
  image,
  imageAlt,
  imageLabel,
  className,
}: HeroProps) {
  const { ref, offset } = useParallax<HTMLDivElement>(PARALLAX_STRENGTH)
  const progress = useScrollProgress(LOGO_HANDOFF_DISTANCE)
  const reducedMotion = useReducedMotion()

  // Fades a little faster than it shrinks, so the header mark is arriving as this leaves.
  const contentOpacity = Math.max(0, 1 - progress * 1.4)
  const logoTransform = reducedMotion
    ? undefined
    : `translate3d(0, ${-progress * 70}px, 0) scale(${1 - progress * 0.62})`

  return (
    <section className={cn('relative isolate', className)}>
      {/* min-height keeps the banner usable on short landscape phones, where 86vh is barely
          taller than the header. */}
      <div ref={ref} className="relative h-[86vh] min-h-[440px] overflow-hidden sm:min-h-[560px]">
        {/* Layer is 160% tall starting at -30%, giving exactly the overscan the drift needs. */}
        <div
          className="absolute inset-x-0 -top-[30%] h-[160%] will-change-transform"
          style={{ transform: `translate3d(0, ${offset}px, 0)` }}
        >
          {image ? (
            <img src={image} alt={imageAlt ?? ''} className="h-full w-full object-cover" />
          ) : (
            <PlaceholderImage
              label={imageLabel ?? 'Header image'}
              aspect="none"
              variant="plain"
              quiet
              className="h-full rounded-none"
            />
          )}
        </div>

        <div className="absolute inset-0 bg-green-900/45" aria-hidden="true" />
      </div>

      <PageContainer className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="flex max-w-2xl flex-col items-center gap-6 text-center"
          style={{ opacity: contentOpacity }}
        >
          {eyebrow && <Eyebrow className="text-green-200">{eyebrow}</Eyebrow>}

          <h1 className="will-change-transform" style={{ transform: logoTransform }}>
            <Logo withText light alt={title} className="h-24 w-auto sm:h-28 md:h-40" />
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-green-50/90">{description}</p>

          {actions && (
            <div className="pointer-events-auto flex flex-wrap justify-center gap-3 pt-2">
              {actions}
            </div>
          )}
        </div>
      </PageContainer>
    </section>
  )
}
