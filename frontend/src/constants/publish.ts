/**
 * What is live on the public site.
 *
 * The site is under construction, so only the home page and the 404 are reachable. The
 * other pages are finished enough to build but not to show: their code stays in the repo,
 * stays imported, and keeps type-checking, so it cannot rot while it waits. It is simply
 * not routed and not linked.
 *
 * ---------------------------------------------------------------------------------------
 * HOW TO PUT A PAGE LIVE
 *
 *   1. Add its path to PUBLISHED_PATHS below.
 *
 * That is the whole job. The route registers itself, the link appears in the header and
 * footer, and the matching button on the home page comes back. Nothing else to touch.
 *
 * To bring back the home page's preview sections - the two image/text rows and the row of
 * four qualities - set SHOW_HOME_PREVIEW to true.
 *
 * To take everything live at once:
 *
 *   PUBLISHED_PATHS = ALL_PATHS
 *   SHOW_HOME_PREVIEW = true
 * ---------------------------------------------------------------------------------------
 */

/** Every page the site has, live or not. Kept here so the full set stays visible. */
export const ALL_PATHS: string[] = ['/', '/patterns', '/about']

/**
 * Paths that are reachable right now.
 *
 * Anything not listed falls through to the 404 page, so a stale bookmark or a search engine
 * result lands somewhere sensible rather than on a blank screen.
 */
export const PUBLISHED_PATHS: string[] = ['/']

/**
 * Whether the home page shows its preview sections below the under-construction notice.
 *
 * Off while the content is placeholder - the page is currently the banner and the notice,
 * nothing else. Typed as boolean rather than inferred, so flipping it does not read as
 * unreachable code.
 */
export const SHOW_HOME_PREVIEW: boolean = false

/** Whether `path` is currently reachable. */
export function isPublished(path: string): boolean {
  return PUBLISHED_PATHS.includes(path)
}
