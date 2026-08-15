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
 * Index of the link the arch frames - the middle of however many are published.
 *
 * The layout assumes an odd number, so that this one is the true middle with equal counts
 * either side. An even number would sit off centre and pull away from the arch; group the
 * extras rather than letting the slots go uneven. With one link it is that link.
 */
const ARCH_INDEX = Math.floor(NAV_LINKS.length / 2)

/**
 * Site header: a single row of centred links with the bridge arch spanning the middle one.
 * The arch sits on the page centre line, which is where the hero logo shrinks to.
 *
 * The same row at every width - no hamburger. Three links and the arch fit a 360px screen
 * once the type, the gaps, the arch and its reserve all step down together; those four are
 * a set, and changing one without the others either overflows the screen or lets the arch
 * legs land on the neighbouring links.
 *
 * It carries no fill at the top of a page and takes one on once scrolled - past the hero
 * there is nothing behind it, and content would otherwise run through the links. On hero
 * pages it is fixed and the mark fades in as the hero logo fades out; on every other page
 * it is sticky and the mark is simply always there.
 */
export function NavBar({ overlay = false }: NavBarProps) {
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
        scrolled ? 'border-neutral-200 bg-neutral-50/90 backdrop-blur-md' : 'border-transparent',
      )}
    >
      <PageContainer>
        {/* One row, with the arch spanning the middle link - Patterns, see
            constants/nav.ts. overflow-hidden crops the arch at the header edges. */}
        <nav className="relative h-16 overflow-hidden">
          {/*
            Decorative: the arch frames the middle link rather than acting as a control.
            It sits behind the links and takes no pointer events, so the link it spans
            stays clickable - its box is far wider than the word it arches over.

            Taller than the row and pulled up past its top edge, so the arch crosses the
            row at its widest rather than at the apex - that is what clears the label,
            which is centred on the row. transform-origin keeps the top edge put while the
            handoff scales it.
          */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-2 left-1/2 z-0 sm:-top-4"
            style={{
              opacity: markOpacity,
              // Centring and the handoff scale share one transform, so a class-based
              // -translate-x-1/2 would be overwritten - both live here instead.
              transform: `translateX(-50%) scale(${0.85 + 0.15 * markOpacity})`,
              transformOrigin: 'top center',
            }}
          >
            <Logo light={lightText} alt="" className="h-[4.5rem] w-auto sm:h-[5.5rem]" />
          </span>

          {/* justify-center only bites when the side slots are absent - i.e. while most
              pages are unpublished and a single link is left to centre. */}
          <ul className="relative z-10 flex h-full w-full items-center justify-center gap-2 sm:gap-6">
            {NAV_LINKS.map((link, index) => (
              <li
                key={link.path}
                className={cn(
                  index === ARCH_INDEX
                    ? // Reserves the width the arch needs, or its legs land on the
                      // neighbouring links. Steps up with the arch at each breakpoint.
                      'shrink-0 px-12 text-center sm:px-16 md:px-20'
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
        </nav>
      </PageContainer>
    </header>
  )
}

/** Active state is an underline rather than a filled pill - there is often no fill to sit on. */
function navLinkClasses(isActive: boolean, lightText: boolean) {
  return cn(
    'whitespace-nowrap rounded-sm text-xs transition-colors sm:text-sm',
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
