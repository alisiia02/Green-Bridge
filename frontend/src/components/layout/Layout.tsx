import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { NavBar } from './NavBar'
import { Footer } from './Footer'

/** Routes that open on a hero image, where the header lies over the banner. */
const OVERLAY_ROUTES = ['/']

/** Page shell: header, routed page, footer pinned to the bottom. */
export function Layout() {
  const { pathname } = useLocation()
  const overlay = OVERLAY_ROUTES.includes(pathname)

  // Land at the top of each page on navigation rather than keeping the previous scroll.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="relative flex min-h-screen flex-col bg-neutral-50">
      <NavBar overlay={overlay} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
