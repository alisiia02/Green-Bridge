import { createBrowserRouter, type RouteObject } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { Home } from '@/pages/Home'
import { AboutUs } from '@/pages/AboutUs'
import { Patterns } from '@/pages/Patterns'
import { NotFound } from '@/pages/NotFound'
import { isPublished } from '@/constants/publish'

/**
 * Routes for pages that are built but not yet live.
 *
 * They are still imported and still type-checked, so the hidden pages cannot quietly break
 * while they wait. Registering the route is what publish.ts controls; an unregistered path
 * falls through to the catch-all below and renders the 404.
 */
const OPTIONAL_ROUTES: RouteObject[] = [
  { path: 'patterns', element: <Patterns />, id: '/patterns' },
  { path: 'about', element: <AboutUs />, id: '/about' },
].filter((route) => isPublished(route.id))

/** Route table. Paths shown in navigation are mirrored in constants/nav.ts. */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      ...OPTIONAL_ROUTES,
      { path: '*', element: <NotFound /> },
    ],
  },
])
