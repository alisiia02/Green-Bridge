import { UNDER_CONSTRUCTION } from '@/constants/site'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/cn'

/**
 * The site's "we're still building this" message.
 *
 * Delete this component (and its call in pages/Home.tsx) once the real content ships.
 */
export function UnderConstructionNotice({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'rounded-lg border border-green-200 bg-white p-8 md:p-10',
        className,
      )}
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
          <SeedlingIcon />
        </span>

        <div className="space-y-4">
          <Badge tone="accent">{UNDER_CONSTRUCTION.eyebrow}</Badge>
          <h2 className="text-2xl font-semibold text-green-900 md:text-3xl">
            {UNDER_CONSTRUCTION.title}
          </h2>
          <p className="max-w-2xl leading-relaxed text-neutral-600">{UNDER_CONSTRUCTION.body}</p>
          <p className="text-sm text-neutral-400">{UNDER_CONSTRUCTION.note}</p>
        </div>
      </div>
    </div>
  )
}

function SeedlingIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21v-8" />
      <path d="M12 13c0-3.3 2.7-6 6-6 0 3.3-2.7 6-6 6Z" />
      <path d="M12 15c0-2.8-2.2-5-5-5 0 2.8 2.2 5 5 5Z" />
    </svg>
  )
}
