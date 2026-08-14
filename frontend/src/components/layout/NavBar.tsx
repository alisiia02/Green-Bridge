import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { NAV_LINKS } from '@/constants/nav'
import { SITE } from '@/constants/site'
import { cn } from '@/lib/cn'
import { PageContainer } from './PageContainer'

export function NavBar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-neutral-50/95 backdrop-blur">
      <PageContainer>
        <nav className="flex h-16 items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-2.5 rounded-md text-lg font-semibold text-green-900"
            onClick={() => setOpen(false)}
          >
            <BridgeMark />
            {SITE.name}
          </Link>

          <ul className="hidden items-center gap-1 sm:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <NavLink to={link.path} end={link.path === '/'} className={navLinkClasses}>
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
            className="rounded-md p-2 text-green-700 transition-colors hover:bg-green-50 sm:hidden"
          >
            <MenuIcon open={open} />
          </button>
        </nav>

        {open && (
          <ul className="flex flex-col gap-1 pb-4 sm:hidden">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  end={link.path === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => cn(navLinkClasses({ isActive }), 'block')}
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

function navLinkClasses({ isActive }: { isActive: boolean }) {
  return cn(
    'rounded-full px-4 py-2 text-sm font-medium transition-colors',
    isActive ? 'bg-green-100 text-green-800' : 'text-neutral-600 hover:bg-green-50 hover:text-green-700',
  )
}

function BridgeMark() {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className="h-7 w-7 text-green-500"
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
