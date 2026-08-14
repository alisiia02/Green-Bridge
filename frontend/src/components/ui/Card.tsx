import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type CardVariant = 'glass' | 'solid' | 'plain'

const VARIANTS: Record<CardVariant, string> = {
  /** Frosted panel. Needs something behind it - an image or a tinted Band - to read. */
  glass: 'bg-white/70 backdrop-blur-md border border-white/70 shadow-[0_1px_24px_rgba(35,61,32,0.06)]',
  /** Opaque surface with a hairline. Use when there is nothing interesting behind it. */
  solid: 'bg-white border border-neutral-200',
  /** No chrome at all - just padding. The default choice for grid items. */
  plain: '',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  /** Adds a hover treatment. Only for cards that are actually clickable. */
  interactive?: boolean
  className?: string
  children: ReactNode
}

/**
 * A surface. Reach for this sparingly - see DESIGN.md: content sits directly on the page
 * or on a tinted Band by default, and a card is what you use when a block genuinely needs
 * to lift off the background.
 */
export function Card({
  variant = 'glass',
  interactive = false,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg p-6 transition-colors',
        VARIANTS[variant],
        interactive && 'hover:bg-white/90',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

export function CardTitle({ className, children }: { className?: string; children: ReactNode }) {
  return <h3 className={cn('text-lg font-semibold text-green-900', className)}>{children}</h3>
}

export function CardBody({ className, children }: { className?: string; children: ReactNode }) {
  return <p className={cn('leading-relaxed text-neutral-600', className)}>{children}</p>
}
