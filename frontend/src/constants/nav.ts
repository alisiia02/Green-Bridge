export interface NavLink {
  label: string
  path: string
}

/** Single source of truth for site navigation. Kept in sync with routes/router.tsx. */
export const NAV_LINKS: NavLink[] = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Patterns', path: '/patterns' },
]
