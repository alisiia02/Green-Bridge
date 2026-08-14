import { Eyebrow } from '@/components/ui/Eyebrow'
import { cn } from '@/lib/cn'

interface PageHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  className?: string
}

/** Opener for inner pages - same role as Hero, without the banner image. */
export function PageHeader({ eyebrow, title, description, className }: PageHeaderProps) {
  return (
    <div className={cn('max-w-3xl space-y-5 pt-20 md:pt-28', className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h1 className="text-4xl font-bold tracking-tight text-green-900 md:text-6xl">{title}</h1>
      {description && <p className="text-lg leading-relaxed text-neutral-600">{description}</p>}
    </div>
  )
}
