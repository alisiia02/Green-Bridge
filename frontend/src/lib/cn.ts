import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind class names, resolving conflicts in favour of the last one.
 *
 * Lets every component take a `className` prop that can override its own defaults:
 *   cn('p-6 rounded-lg', className)  ->  caller's `p-8` wins over the built-in `p-6`
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
