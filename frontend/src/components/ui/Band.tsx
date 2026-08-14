import type { ReactNode } from 'react'
import { PageContainer } from '@/components/layout/PageContainer'
import { cn } from '@/lib/cn'

export type BandTone = 'soft' | 'green' | 'white' | 'dark'

const TONES: Record<BandTone, string> = {
  soft: 'bg-green-50',
  green: 'bg-green-100',
  white: 'bg-white',
  dark: 'bg-green-800',
}

interface BandProps {
  tone?: BandTone
  /** Drop the inner width constraint - for content that should touch the viewport edges. */
  bleed?: boolean
  className?: string
  children: ReactNode
}

/**
 * Full-width tinted section.
 *
 * Colour bands are how this site separates content, instead of drawing a border around
 * every block. Place these as direct children of the page (siblings of PageContainer, not
 * inside it) so the background reaches the viewport edges.
 */
export function Band({ tone = 'soft', bleed = false, className, children }: BandProps) {
  return (
    <div className={cn('w-full', TONES[tone], className)}>
      {bleed ? children : <PageContainer>{children}</PageContainer>}
    </div>
  )
}
