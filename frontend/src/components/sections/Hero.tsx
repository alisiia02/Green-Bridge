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
 * Full-width image banner with the page title in a frosted panel over it.
 *
 * The image runs edge to edge, so it is the one element on the site without a corner
 * radius - a rounded full-bleed banner would show slivers of background at the corners.
 * Everything layered on top of it stays rounded.
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

      <PageContainer className="absolute inset-x-0 bottom-0 pb-10 md:pb-16">
        <div className="max-w-2xl rounded-xl border border-white/70 bg-white/80 p-8 backdrop-blur-md md:p-10">
          <div className="space-y-5">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <h1 className="text-4xl font-bold tracking-tight text-green-900 md:text-6xl">{title}</h1>
            <p className="max-w-xl text-lg leading-relaxed text-neutral-600">{description}</p>
            {actions && <div className="flex flex-wrap items-center gap-3 pt-2">{actions}</div>}
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
