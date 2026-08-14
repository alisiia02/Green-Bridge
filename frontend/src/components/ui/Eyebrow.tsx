import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Small uppercase label above a heading. Used instead of a Badge when the label is
 * structural ("what section is this") rather than a piece of data.
 */
export function Eyebrow({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <p className={cn('text-xs font-semibold uppercase tracking-[0.18em] text-green-600', className)}>
      {children}
    </p>
  )
}
