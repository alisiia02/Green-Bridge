import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { NAV_LINKS } from '@/constants/nav'
import { SITE } from '@/constants/site'
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
 * Site header. No fill of its own - on hero pages it sits over the image, elsewhere it
 * shows the page background through it. That means it cannot be sticky: with nothing
 * behind it, content would scroll through the links.
 */
export function NavBar({ overlay = false }: NavBarProps) {
  const [open, setOpen] = useState(false)

  return (
    <header
      className={cn(
        'z-40 w-full',
        overlay ? 'absolute inset-x-0 top-0' : 'relative',
      )}
    >
      <PageContainer>
        <nav className="grid h-20 grid-cols-[auto_1fr_auto] items-center gap-4">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className={cn(
              'flex items-center gap-2.5 rounded-md text-lg font-semibold',
              overlay ? 'text-white' : 'text-green-900',
            )}
          >
            <BridgeMark className={overlay ? 'text-green-200' : 'text-green-500'} />
            {SITE.name}
          </Link>

          <ul className="hidden items-center justify-center gap-9 sm:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) => navLinkClasses(isActive, overlay)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <button
            type="button"
            aria-expanded={open}
            aria-label="Toggle navigation"
            onClick={() => setOpen((value) => !value)}
            className={cn(
              'col-start-3 justify-self-end rounded-md p-2 transition-colors sm:hidden',
              overlay ? 'text-white hover:bg-white/15' : 'text-green-700 hover:bg-green-50',
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

/** Active state is an underline rather than a filled pill - there is no fill to sit on. */
function navLinkClasses(isActive: boolean, overlay: boolean) {
  return cn(
    'rounded-sm text-sm transition-colors',
    isActive && 'font-semibold underline decoration-2 underline-offset-8',
    overlay
      ? isActive
        ? 'text-white decoration-green-200'
        : 'font-medium text-white/80 hover:text-white'
      : isActive
        ? 'text-green-900 decoration-green-500'
        : 'font-medium text-neutral-600 hover:text-green-700',
  )
}

function BridgeMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn('h-7 w-7', className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M3 24c0-8 5.8-13 13-13s13 5 13 13" />
      <path d="M3 24h26" />
      <path d="M16 11V5" />
    </svg>
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
