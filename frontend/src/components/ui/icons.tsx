import type { SVGProps } from 'react'

/**
 * Small line icons. Deliberately minimal and stroke-only so they sit quietly next to the
 * palette rather than competing with it.
 */
type IconProps = SVGProps<SVGSVGElement>

function Base({ children, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {children}
    </svg>
  )
}

/** Evidence / research. */
export function BookIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H19v14H5.5A1.5 1.5 0 0 0 4 19.5Z" />
      <path d="M4 19.5A1.5 1.5 0 0 1 5.5 18H19v2H5.5A1.5 1.5 0 0 1 4 19.5Z" />
      <path d="m9 9 2 2 3.5-3.5" />
    </Base>
  )
}

/** Speed of implementation. */
export function ClockIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 1.8" />
    </Base>
  )
}

/** Cost. */
export function CoinIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M14.5 9.5A3 3 0 0 0 9.5 12a3 3 0 0 0 5 2.5" />
      <path d="M8 11h5M8 13h5" />
    </Base>
  )
}

/** Measurable outcomes. */
export function ChartIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 19h16" />
      <path d="M7 19v-5" />
      <path d="M12 19V7" />
      <path d="M17 19v-8" />
    </Base>
  )
}

/** Decorative leaf, used by PlaceholderImage. */
export function LeafIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 20c0-7 5-12 12-13 1 8-4 13-12 13Z" />
      <path d="M4 20c3-4 6-6 9-7" />
    </Base>
  )
}
