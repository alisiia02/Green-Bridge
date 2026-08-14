/**
 * Shape returned by GET /api/patterns.
 *
 * Mirrors frontend/src/types/pattern.ts. The two are kept in sync by hand - there is not
 * enough shared surface yet to justify extracting a shared package.
 */
export interface Pattern {
  id: string
  name: string
  category: PatternCategory
  summary: string
  imageAlt: string
  status: PatternStatus
}

export type PatternCategory = 'Microclimate' | 'Community' | 'Infrastructure' | 'Wellbeing'

export type PatternStatus = 'confirmed' | 'candidate' | 'exploring'
