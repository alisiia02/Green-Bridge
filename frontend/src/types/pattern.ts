/**
 * A single entry in the Green Bridge pattern library.
 *
 * Mirrors the shape returned by GET /api/patterns. The backend keeps its own copy of this
 * shape in backend/src/data/patterns.mock.ts - the two must be kept in sync by hand until
 * there is enough shared surface to justify a shared package.
 */
export interface Pattern {
  id: string
  name: string
  category: PatternCategory
  summary: string
  /** Alt text for the image that will eventually replace the placeholder. */
  imageAlt: string
  status: PatternStatus
}

export type PatternCategory = 'Microclimate' | 'Community' | 'Infrastructure' | 'Wellbeing'

export type PatternStatus = 'confirmed' | 'candidate' | 'exploring'

export const PATTERN_STATUS_LABEL: Record<PatternStatus, string> = {
  confirmed: 'Confirmed',
  candidate: 'Candidate',
  exploring: 'Exploring',
}
