import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { Home } from '@/pages/Home'
import { AboutUs } from '@/pages/AboutUs'
import { Patterns } from '@/pages/Patterns'
import { NotFound } from '@/pages/NotFound'

/** Route table. Paths shown in navigation are mirrored in constants/nav.ts. */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <AboutUs /> },
      { path: 'patterns', element: <Patterns /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])
