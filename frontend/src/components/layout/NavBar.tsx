import { useState } from 'react'
import { NavLink } from 'react-router-dom'
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
 * Index of the link the arch frames.
 *
 * The layout assumes an odd number of links, so that this one is the true middle with
 * equal counts either side. An even number would sit off centre and pull away from the
 * arch; group the extras rather than letting the slots go uneven.
 */
const ARCH_INDEX = Math.floor(NAV_LINKS.length / 2)

/**
 * Site header: a single row of centred links with the bridge arch spanning the middle one.
 * The arch sits on the page centre line, which is where the hero logo shrinks to.
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
        {/* One row, with the arch spanning the middle link - Patterns, see
            constants/nav.ts. overflow-hidden crops the arch legs at the header edge. */}
        <nav className="relative h-28 overflow-hidden">
          {/*
            Decorative: the arch frames the middle link rather than acting as a control.
            It sits behind the links and takes no pointer events, so the link it spans
            stays clickable - its box is far wider than the word it arches over.

            Anchored to the top and taller than the row, so the legs run off the bottom.
            transform-origin keeps that top edge put while the handoff scales it.
          */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 z-0"
            style={{
              opacity: markOpacity,
              // Centring and the handoff scale share one transform, so a class-based
              // -translate-x-1/2 would be overwritten - both live here instead.
              transform: `translateX(-50%) scale(${0.85 + 0.15 * markOpacity})`,
              transformOrigin: 'top center',
            }}
          >
            <Logo light={lightText} alt="" className="h-32 w-auto" />
          </span>

          {/*
            items-end plus the bottom padding drops the labels into the arch opening,
            whose centre sits about two thirds of the way down the artwork.
          */}
          <ul className="relative z-10 hidden h-full w-full items-end gap-6 pb-4 sm:flex">
            {NAV_LINKS.map((link, index) => (
              <li
                key={link.path}
                className={cn(
                  index === ARCH_INDEX
                    ? // Reserves the width the arch needs, or its legs land on the
                      // neighbouring links.
                      'shrink-0 px-28 text-center md:px-32'
                    : // Equal-width slots either side. Centring the row is not enough:
                      // the links differ in width, which shifts the middle one off centre
                      // and away from the arch.
                      index < ARCH_INDEX
                      ? 'flex-1 text-right'
                      : 'flex-1 text-left',
                )}
              >
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
