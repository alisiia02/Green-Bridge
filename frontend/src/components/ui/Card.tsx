import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Adds a hover treatment. Only use on cards that are actually clickable. */
  interactive?: boolean
  className?: string
  children: ReactNode
}

/** Rounded, hairline-bordered surface. The default container for grouped content. */
export function Card({ interactive = false, className, children, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-neutral-200 bg-white p-6 transition-colors',
        interactive && 'hover:border-green-200 hover:bg-green-50/40',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

/** Optional heading row for a Card. */
export function CardTitle({ className, children }: { className?: string; children: ReactNode }) {
  return <h3 className={cn('text-lg font-semibold text-green-900', className)}>{children}</h3>
}

/** Optional body text for a Card. */
export function CardBody({ className, children }: { className?: string; children: ReactNode }) {
  return <p className={cn('leading-relaxed text-neutral-600', className)}>{children}</p>
}
