import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type BadgeTone = 'green' | 'accent' | 'neutral'

const TONES: Record<BadgeTone, string> = {
  green: 'bg-green-100 text-green-800',
  accent: 'bg-accent-50 text-accent-600',
  neutral: 'bg-neutral-100 text-neutral-600',
}

interface BadgeProps {
  tone?: BadgeTone
  className?: string
  children: ReactNode
}

/** Small pill label. Badges describe - they never link or act. */
export function Badge({ tone = 'green', className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
