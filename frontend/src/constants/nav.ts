import { isPublished } from './publish'

export interface NavLink {
  label: string
  path: string
}

/**
 * Every navigation entry the site has, live or not. Kept in sync with routes/router.tsx.
 *
 * Order matters visually: the links are centred as a row and the arch spans the middle one,
 * so Patterns is deliberately that middle entry. Keep an odd number of published links, or
 * the middle one drifts off the centre line and away from the arch - see NavBar.
 */
export const ALL_NAV_LINKS: NavLink[] = [
  { label: 'Home', path: '/' },
  { label: 'Patterns', path: '/patterns' },
  { label: 'About Us', path: '/about' },
]

/**
 * The entries actually shown, in the header and the footer.
 *
 * Filtered rather than commented out, so a hidden page cannot be linked to by accident.
 * See constants/publish.ts to put one back.
 */
export const NAV_LINKS: NavLink[] = ALL_NAV_LINKS.filter((link) => isPublished(link.path))
