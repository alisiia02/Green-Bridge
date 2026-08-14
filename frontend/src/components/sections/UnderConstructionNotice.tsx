import { UNDER_CONSTRUCTION } from '@/constants/site'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { cn } from '@/lib/cn'

/**
 * The site's "we're still building this" message.
 *
 * Sits directly on a tinted Band with no box around it - this is the one message every
 * visitor must read, so it gets the whole width of the band rather than a card.
 *
 * Delete this component (and its call in pages/Home.tsx) once the real content ships.
 */
export function UnderConstructionNotice({ className }: { className?: string }) {
  return (
    <div className={cn('mx-auto max-w-3xl py-20 text-center md:py-28', className)}>
      <span className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-white/70 text-green-600 backdrop-blur-md">
        <SeedlingIcon />
      </span>

      <Eyebrow className="mb-5">{UNDER_CONSTRUCTION.eyebrow}</Eyebrow>

      <h2 className="text-3xl font-semibold tracking-tight text-green-900 md:text-4xl">
        {UNDER_CONSTRUCTION.title}
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-green-800/80">
        {UNDER_CONSTRUCTION.body}
      </p>

      <p className="mt-6 text-sm text-green-700/70">{UNDER_CONSTRUCTION.note}</p>
    </div>
  )
}

function SeedlingIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21v-8" />
      <path d="M12 13c0-3.3 2.7-6 6-6 0 3.3-2.7 6-6 6Z" />
      <path d="M12 15c0-2.8-2.2-5-5-5 0 2.8 2.2 5 5 5Z" />
    </svg>
  )
}
