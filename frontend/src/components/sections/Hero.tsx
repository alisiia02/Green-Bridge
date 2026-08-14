import type { ReactNode } from 'react'
import { PageContainer } from '@/components/layout/PageContainer'
import { PlaceholderImage } from '@/components/ui/PlaceholderImage'
import { Eyebrow } from '@/components/ui/Eyebrow'
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

const BANNER_HEIGHT = 'h-[62vh] min-h-[460px]'

/**
 * Full-width image banner with the page title sitting directly on the photo.
 *
 * The scrim is a flat colour at partial opacity, not a gradient - it holds the text
 * legible over whatever the photograph happens to be doing underneath.
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
  return (
    <section className={cn('relative isolate', className)}>
      {image ? (
        <img
          src={image}
          alt={imageAlt ?? ''}
          className={cn('w-full object-cover', BANNER_HEIGHT)}
        />
      ) : (
        <PlaceholderImage
          label={imageLabel ?? 'Header image'}
          aspect="none"
          variant="plain"
          quiet
          className={cn('rounded-none', BANNER_HEIGHT)}
        />
      )}

      <div className="absolute inset-0 bg-green-900/45" aria-hidden="true" />

      <PageContainer className="absolute inset-x-0 bottom-0 pb-14 md:pb-20">
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
