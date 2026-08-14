/**
 * Thin fetch wrapper for the Green Bridge API.
 *
 * Not called anywhere yet - the Patterns page renders local placeholder data while the
 * project has no real content. When real patterns exist, swap the `mockPatterns` import in
 * pages/Patterns.tsx for `getJSON<Pattern[]>('/patterns')`.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api'

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

/** GET `path` (relative to the API base) and parse the response as JSON. */
export async function getJSON<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { Accept: 'application/json' },
    ...init,
  })

  if (!response.ok) {
    throw new ApiError(`Request to ${path} failed`, response.status)
  }

  return (await response.json()) as T
}
