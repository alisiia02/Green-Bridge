import { cn } from '@/lib/cn'
import { LeafIcon } from './icons'

export type PlaceholderAspect = 'video' | 'square' | 'wide' | 'portrait' | 'none'

const ASPECTS: Record<PlaceholderAspect, string> = {
  video: 'aspect-[16/9]',
  square: 'aspect-square',
  wide: 'aspect-[21/9]',
  portrait: 'aspect-[3/4]',
  /** Height comes from className instead - for full-bleed banners. */
  none: '',
}

export type PlaceholderVariant = 'framed' | 'plain'

const VARIANTS: Record<PlaceholderVariant, string> = {
  /** Dashed outline - obviously a stand-in. Right for inline content images. */
  framed: 'border border-dashed border-green-200 bg-green-100',
  /** Flat fill, no outline. Right for large banners where dashes would look broken. */
  plain: 'bg-green-100',
}

interface PlaceholderImageProps {
  /** Caption shown inside the frame. Describe what the real image will be. */
  label?: string
  aspect?: PlaceholderAspect
  variant?: PlaceholderVariant
  /** Hide the caption and icon - for banners sitting behind other content. */
  quiet?: boolean
  className?: string
}

/**
 * Stand-in for photography the project does not have yet.
 *
 * Aspect ratios are already final, so swapping in a real <img> later will not shift the
 * surrounding layout.
 */
export function PlaceholderImage({
  label = 'Image coming soon',
  aspect = 'video',
  variant = 'framed',
  quiet = false,
  className,
}: PlaceholderImageProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        'flex w-full flex-col items-center justify-center gap-3 rounded-lg p-6 text-center',
        ASPECTS[aspect],
        VARIANTS[variant],
        className,
      )}
    >
      {!quiet && (
        <>
          <LeafIcon className="h-8 w-8 text-green-300" />
          <span className="text-sm font-medium text-green-700">{label}</span>
        </>
      )}
    </div>
  )
}
