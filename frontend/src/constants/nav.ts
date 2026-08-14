export interface NavLink {
  label: string
  path: string
}

/**
 * Single source of truth for site navigation. Kept in sync with routes/router.tsx.
 *
 * Order matters visually: the links are centred as a row beneath the centred logo, so the
 * middle entry sits directly under it. Patterns is deliberately that middle entry.
 */
export const NAV_LINKS: NavLink[] = [
  { label: 'Home', path: '/' },
  { label: 'Patterns', path: '/patterns' },
  { label: 'About Us', path: '/about' },
]
