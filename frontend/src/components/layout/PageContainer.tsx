import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface PageContainerProps {
  className?: string
  children: ReactNode
}

/** Content width and horizontal padding. Wrap every page and the nav/footer rows in this. */
export function PageContainer({ className, children }: PageContainerProps) {
  return <div className={cn('mx-auto w-full max-w-content px-5 sm:px-8', className)}>{children}</div>
}
