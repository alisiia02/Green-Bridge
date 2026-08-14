import type { ReactNode } from 'react'
import { Badge } from '@/components/ui/Badge'
import { PlaceholderImage } from '@/components/ui/PlaceholderImage'
import { cn } from '@/lib/cn'

interface HeroProps {
  eyebrow?: string
  title: string
  description: string
  /** Buttons or links rendered under the description. */
  actions?: ReactNode
  imageLabel?: string
  className?: string
}

/** Large rounded opening panel. Home page only, unless a page earns the same weight. */
export function Hero({
  eyebrow,
  title,
  description,
  actions,
  imageLabel = 'Header image coming soon',
  className,
}: HeroProps) {
  return (
    <div className={cn('rounded-xl bg-green-50 p-8 md:p-12', className)}>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="space-y-6">
          {eyebrow && <Badge>{eyebrow}</Badge>}
          <h1 className="text-4xl font-semibold tracking-tight text-green-900 md:text-5xl">
            {title}
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-neutral-600">{description}</p>
          {actions && <div className="flex flex-wrap items-center gap-3 pt-1">{actions}</div>}
        </div>

        <PlaceholderImage label={imageLabel} aspect="video" className="bg-green-100" />
      </div>
    </div>
  )
}
