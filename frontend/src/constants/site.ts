/**
 * Site-wide copy. Centralised so placeholder text can be swapped for real content in one
 * place rather than hunting through components.
 */
export const SITE = {
  name: 'Green Bridge',
  tagline: 'A pattern language for cross-continental green integration',
  intro:
    'Bringing the proven benefits of shinrin-yoku out of distant forests and into the everyday green spaces of European cities.',
  programme: 'HZ Honours Programme',
  academicYear: '2025-2026',
  team: ['Alisiia Mishchenko', 'Lucas Krysmalski'],
  email: 'greenbridge.honours@gmail.com',
} as const

export const UNDER_CONSTRUCTION = {
  eyebrow: 'Work in progress',
  title: 'Sorry, we are currently working on this website',
  body: 'There will be updates soon. We are finishing the research behind our patterns and preparing the full library. Everything you see here is a preview of the layout, not the final content.',
  note: 'Expect the first patterns to appear after our fieldwork.',
} as const

/** Placeholder copy used across the shell until real content is written. */
export const PLACEHOLDER_TEXT = {
  short: 'Placeholder text. Real content will be added as the research progresses.',
  medium:
    'Placeholder text. This block will hold real content once the research phase is complete. For now it exists to show how the layout breathes at a realistic length, so nothing shifts when the actual writing lands.',
} as const

export const FOOTER_NOTE = `${SITE.programme} - ${SITE.academicYear}`
