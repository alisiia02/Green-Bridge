import type { ReactNode } from 'react'
import { Eyebrow } from './Eyebrow'
import { cn } from '@/lib/cn'

interface SectionProps {
  eyebrow?: string
  title?: string
  description?: string
  /** Centre the heading block. Use on tinted Bands, not on plain page sections. */
  centered?: boolean
  className?: string
  children?: ReactNode
}

/**
 * Vertical rhythm wrapper. Every page section goes through this so spacing stays
 * consistent instead of being re-decided per page.
 */
export function Section({
  eyebrow,
  title,
  description,
  centered = false,
  className,
  children,
}: SectionProps) {
  const hasHeading = eyebrow || title || description

  return (
    <section className={cn('py-16 md:py-24', className)}>
      {hasHeading && (
        <div
          className={cn(
            'mb-12 max-w-2xl space-y-4',
            centered && 'mx-auto text-center',
          )}
        >
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          {title && (
            <h2 className="text-3xl font-semibold tracking-tight text-green-900 md:text-4xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-lg leading-relaxed text-neutral-600">{description}</p>
          )}
        </div>
      )}
      {children}
    </section>
  )
}
