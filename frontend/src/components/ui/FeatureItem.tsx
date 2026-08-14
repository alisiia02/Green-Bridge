import type { ComponentType, SVGProps } from 'react'
import { cn } from '@/lib/cn'

interface FeatureItemProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  label: string
  description?: string
  className?: string
}

/**
 * Icon, uppercase label, optional line of text - with no box around it.
 *
 * The point of this component is restraint: a row of these reads as one calm group,
 * where the same content in four bordered cards reads as clutter.
 */
export function FeatureItem({ icon: Icon, label, description, className }: FeatureItemProps) {
  return (
    <div className={cn('flex flex-col items-center gap-4 text-center', className)}>
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
        <Icon className="h-7 w-7" />
      </span>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-green-800">{label}</p>
      {description && <p className="max-w-[22ch] text-sm leading-relaxed text-neutral-500">{description}</p>}
    </div>
  )
}
