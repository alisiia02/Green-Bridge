import wordmark from '@/assets/logo-wordmark.svg'
import mark from '@/assets/logo-mark.svg'
import { cn } from '@/lib/cn'

interface LogoProps {
  /** Use the version with the wordmark set inside the arch. */
  withText?: boolean
  /** Render white, for use over a photograph or a dark band. */
  light?: boolean
  /** Alt text. Pass an empty string only when an adjacent heading already names the site. */
  alt: string
  className?: string
}

/**
 * The Green Bridge logo, in its two forms: the full wordmark for the hero, and the bare
 * arch for the header.
 *
 * There is no light artwork, so `light` inverts the dark green to white via a filter.
 * The filter transitions, so the header mark does not pop when the background comes in.
 */
export function Logo({ withText = false, light = false, alt, className }: LogoProps) {
  return (
    <img
      src={withText ? wordmark : mark}
      alt={alt}
      draggable={false}
      className={cn(
        'select-none transition-[filter] duration-300',
        light && 'brightness-0 invert',
        className,
      )}
    />
  )
}
