import type { ReactNode } from 'react'
import { PageContainer } from '@/components/layout/PageContainer'
import { PlaceholderImage } from '@/components/ui/PlaceholderImage'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { useParallax } from '@/lib/useParallax'
import { cn } from '@/lib/cn'

interface HeroProps {
  eyebrow?: string
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
 * Full-width image banner with the page title sitting directly on the photo.
 *
 * The image is oversized and drifts on scroll, so it travels slower than the page. The
 * header overlays this section, which is why the banner is tall and the text sits low -
 * the top of the frame belongs to the nav.
 *
 * The scrim is a flat colour at partial opacity, not a gradient. It does two jobs: holds
 * the title legible over whatever the photograph is doing, and keeps the transparent nav
 * readable across the top.
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

  return (
    <section className={cn('relative isolate', className)}>
      <div ref={ref} className="relative h-[86vh] min-h-[560px] overflow-hidden">
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

      <PageContainer className="absolute inset-x-0 bottom-0 pb-16 md:pb-24">
        <div className="max-w-2xl space-y-5">
          {eyebrow && <Eyebrow className="text-green-200">{eyebrow}</Eyebrow>}
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">{title}</h1>
          <p className="max-w-xl text-lg leading-relaxed text-green-50/90">{description}</p>
          {actions && <div className="flex flex-wrap items-center gap-3 pt-2">{actions}</div>}
        </div>
      </PageContainer>
    </section>
  )
}
