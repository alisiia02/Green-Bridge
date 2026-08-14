import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface SectionProps {
  /** Optional section heading. */
  title?: string
  /** Optional supporting line under the heading. */
  description?: string
  className?: string
  children: ReactNode
}

/**
 * Vertical rhythm wrapper. Every page section goes through this so spacing stays
 * consistent instead of being re-decided per page.
 */
export function Section({ title, description, className, children }: SectionProps) {
  return (
    <section className={cn('py-12 md:py-16', className)}>
      {(title || description) && (
        <div className="mb-8 max-w-2xl space-y-3">
          {title && <h2 className="text-2xl font-semibold text-green-900 md:text-3xl">{title}</h2>}
          {description && <p className="leading-relaxed text-neutral-600">{description}</p>}
        </div>
      )}
      {children}
    </section>
  )
}
