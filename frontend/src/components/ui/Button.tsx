import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-green-500 text-white hover:bg-green-600',
  secondary: 'bg-green-100 text-green-800 hover:bg-green-200',
  outline: 'border border-green-200 text-green-700 hover:bg-green-50',
  ghost: 'text-green-700 hover:bg-green-50',
}

const SIZES: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3 text-base',
}

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors disabled:pointer-events-none disabled:opacity-50'

interface StyleProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: ReactNode
}

export type ButtonProps = StyleProps &
  (
    | ({ to: string; href?: never } & Record<string, unknown>)
    | ({ href: string; to?: never } & Omit<
        AnchorHTMLAttributes<HTMLAnchorElement>,
        keyof StyleProps
      >)
    | ({ to?: never; href?: never } & Omit<
        ButtonHTMLAttributes<HTMLButtonElement>,
        keyof StyleProps
      >)
  )

/**
 * The site's only button. Renders as a react-router <Link> when given `to`, an <a> when
 * given `href`, and a <button> otherwise - so navigation stays semantically correct
 * without wrapping buttons in links.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className)
  const { to, href, ...attributes } = rest as { to?: string; href?: string }

  if (to !== undefined) {
    return (
      <Link to={to} className={classes} {...attributes}>
        {children}
      </Link>
    )
  }

  if (href !== undefined) {
    return (
      <a href={href} className={classes} {...(attributes as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    )
  }

  return (
    <button
      type="button"
      className={classes}
      {...(attributes as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  )
}
