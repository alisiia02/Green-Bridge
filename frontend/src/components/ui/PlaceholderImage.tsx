import { cn } from '@/lib/cn'

export type PlaceholderAspect = 'video' | 'square' | 'wide' | 'portrait'

const ASPECTS: Record<PlaceholderAspect, string> = {
  video: 'aspect-[16/9]',
  square: 'aspect-square',
  wide: 'aspect-[21/9]',
  portrait: 'aspect-[3/4]',
}

interface PlaceholderImageProps {
  /** Caption shown inside the frame. Describe what the real image will be. */
  label?: string
  aspect?: PlaceholderAspect
  className?: string
}

/**
 * Stand-in for photography the project does not have yet.
 *
 * The aspect ratios are already final, so swapping in a real <img> later will not shift the
 * surrounding layout.
 */
export function PlaceholderImage({
  label = 'Image coming soon',
  aspect = 'video',
  className,
}: PlaceholderImageProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        'flex w-full flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-green-200 bg-green-100 p-6 text-center',
        ASPECTS[aspect],
        className,
      )}
    >
      <LeafMark />
      <span className="text-sm font-medium text-green-700">{label}</span>
    </div>
  )
}

function LeafMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-8 w-8 text-green-300"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 20c0-7 5-12 12-13 1 8-4 13-12 13Z" />
      <path d="M4 20c3-4 6-6 9-7" />
    </svg>
  )
}
