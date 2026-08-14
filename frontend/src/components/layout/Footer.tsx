import { Link } from 'react-router-dom'
import { NAV_LINKS } from '@/constants/nav'
import { FOOTER_NOTE, SITE } from '@/constants/site'
import { PageContainer } from './PageContainer'

export function Footer() {
  return (
    <footer className="mt-auto bg-green-800 text-green-100">
      <PageContainer>
        <div className="flex flex-col gap-10 py-12 sm:flex-row sm:justify-between">
          <div className="max-w-sm space-y-3">
            <p className="text-lg font-semibold text-white">{SITE.name}</p>
            <p className="text-sm leading-relaxed text-green-200">{SITE.tagline}</p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <div className="space-y-3">
              <p className="text-sm font-semibold text-white">Pages</p>
              <ul className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="rounded-sm text-sm text-green-200 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-white">Project</p>
              <ul className="space-y-2 text-sm text-green-200">
                {SITE.team.map((member) => (
                  <li key={member}>{member}</li>
                ))}
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="rounded-sm transition-colors hover:text-white"
                  >
                    {SITE.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-green-700 py-6">
          <p className="text-sm text-green-200">
            {FOOTER_NOTE} &middot; &copy; {new Date().getFullYear()} {SITE.name}
          </p>
        </div>
      </PageContainer>
    </footer>
  )
}
