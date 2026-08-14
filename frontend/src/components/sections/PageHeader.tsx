import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/cn'

interface PageHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  className?: string
}

/** Lighter page opener for inner pages - same role as Hero, without the panel and image. */
export function PageHeader({ eyebrow, title, description, className }: PageHeaderProps) {
  return (
    <div className={cn('max-w-2xl space-y-5 pt-12 md:pt-16', className)}>
      {eyebrow && <Badge>{eyebrow}</Badge>}
      <h1 className="text-4xl font-semibold tracking-tight text-green-900 md:text-5xl">{title}</h1>
      {description && <p className="text-lg leading-relaxed text-neutral-600">{description}</p>}
    </div>
  )
}
