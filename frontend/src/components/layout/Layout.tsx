import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { NavBar } from './NavBar'
import { Footer } from './Footer'

/** Page shell: nav on top, routed page in the middle, footer pinned to the bottom. */
export function Layout() {
  const { pathname } = useLocation()

  // Land at the top of each page on navigation rather than keeping the previous scroll.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
