import type { ReactNode } from 'react'
import { PlaceholderImage } from '@/components/ui/PlaceholderImage'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { cn } from '@/lib/cn'

interface SplitRowProps {
  eyebrow?: string
  title: string
  body: string
  imageLabel: string
  /** Put the image on the left instead of the right. Alternate down a page. */
  reverse?: boolean
  actions?: ReactNode
  className?: string
}

/**
 * Image on one side, text on the other.
 *
 * Two of these alternating carry far more weight than a row of small cards, and give the
 * eye somewhere to rest between blocks.
 */
export function SplitRow({
  eyebrow,
  title,
  body,
  imageLabel,
  reverse = false,
  actions,
  className,
}: SplitRowProps) {
  return (
    <div className={cn('grid items-center gap-10 lg:grid-cols-2 lg:gap-16', className)}>
      <PlaceholderImage
        label={imageLabel}
        aspect="video"
        className={cn('lg:h-full', reverse ? 'lg:order-1' : 'lg:order-2')}
      />

      <div className={cn('space-y-4', reverse ? 'lg:order-2' : 'lg:order-1')}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h3 className="text-2xl font-semibold tracking-tight text-green-900 md:text-3xl">{title}</h3>
        <p className="max-w-xl leading-relaxed text-neutral-600">{body}</p>
        {actions && <div className="flex flex-wrap items-center gap-4 pt-2">{actions}</div>}
      </div>
    </div>
  )
}
