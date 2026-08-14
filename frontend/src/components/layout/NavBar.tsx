import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { NAV_LINKS } from '@/constants/nav'
import { LOGO_HANDOFF_DISTANCE } from '@/constants/motion'
import { Logo } from '@/components/ui/Logo'
import { clamp01, useScrollProgress } from '@/lib/useScrollProgress'
import { cn } from '@/lib/cn'
import { PageContainer } from './PageContainer'

interface NavBarProps {
  /**
   * Lay the header over the page instead of above it, with light text.
   * For pages that open on a hero image; without one there is nothing to read against.
   */
  overlay?: boolean
}

/**
 * Site header: a single row with the links centred, and the logo layered over the middle
 * of that row. Both sit on the page centre line, which is where the hero logo shrinks to.
 *
 * It carries no fill at the top of the page. Once scrolled it takes one on, because past
 * the hero there is nothing behind it and page content would otherwise run through the
 * links. On hero pages it is fixed and the mark fades in as the hero logo fades out; on
 * every other page it is sticky and the mark is simply always there.
 */
export function NavBar({ overlay = false }: NavBarProps) {
  const [open, setOpen] = useState(false)
  const progress = useScrollProgress(LOGO_HANDOFF_DISTANCE)

  const scrolled = progress > 0.5
  const lightText = overlay && !scrolled
  // Arrives in the back half of the handoff, as the hero logo is on its way out.
  const markOpacity = overlay ? clamp01((progress - 0.4) / 0.35) : 1

  return (
    <header
      className={cn(
        'z-40 w-full border-b transition-colors duration-300',
        overlay ? 'fixed inset-x-0 top-0' : 'sticky top-0',
        scrolled
          ? 'border-neutral-200 bg-neutral-50/90 backdrop-blur-md'
          : 'border-transparent',
      )}
    >
      <PageContainer>
        {/* One row. Links centred as a group, and the logo layered over the middle of
            that row - which is the Patterns link, see constants/nav.ts. */}
        <nav className="relative flex h-24 items-center justify-center">
          <ul className="hidden items-center gap-10 sm:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) => navLinkClasses(isActive, lightText)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <Link
            to="/"
            onClick={() => setOpen(false)}
            aria-hidden={markOpacity < 0.05}
            tabIndex={markOpacity < 0.05 ? -1 : undefined}
            className={cn(
              'absolute left-1/2 top-1/2',
              markOpacity < 0.05 && 'pointer-events-none',
            )}
            style={{
              opacity: markOpacity,
              // Centring and the handoff scale share one transform, so the class-based
              // translate would be overwritten - both live here instead.
              transform: `translate(-50%, -50%) scale(${0.85 + 0.15 * markOpacity})`,
            }}
          >
            {/* No padding of its own; the row height is the only constraint. */}
            <Logo light={lightText} alt="Green Bridge" className="h-20 w-auto" />
          </Link>

          <button
            type="button"
            aria-expanded={open}
            aria-label="Toggle navigation"
            onClick={() => setOpen((value) => !value)}
            className={cn(
              'absolute right-0 top-1/2 -translate-y-1/2 rounded-md p-2 transition-colors sm:hidden',
              lightText ? 'text-white hover:bg-white/15' : 'text-green-700 hover:bg-green-50',
            )}
          >
            <MenuIcon open={open} />
          </button>
        </nav>

        {open && (
          <ul className="mb-4 flex flex-col gap-1 rounded-lg border border-white/70 bg-white/90 p-3 backdrop-blur-md sm:hidden">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  end={link.path === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'block rounded-sm px-3 py-2 text-sm font-medium transition-colors',
                      isActive ? 'text-green-800' : 'text-neutral-600 hover:text-green-700',
                    )
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </PageContainer>
    </header>
  )
}

/** Active state is an underline rather than a filled pill - there is often no fill to sit on. */
function navLinkClasses(isActive: boolean, lightText: boolean) {
  return cn(
    'rounded-sm text-sm transition-colors',
    isActive && 'font-semibold underline decoration-2 underline-offset-8',
    lightText
      ? isActive
        ? 'text-white decoration-green-200'
        : 'font-medium text-white/80 hover:text-white'
      : isActive
        ? 'text-green-900 decoration-green-500'
        : 'font-medium text-neutral-600 hover:text-green-700',
  )
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      {open ? (
        <>
          <path d="M6 6l12 12" />
          <path d="M18 6L6 18" />
        </>
      ) : (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      )}
    </svg>
  )
}
