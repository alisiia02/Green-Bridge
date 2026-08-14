/**
 * Scroll distance, in pixels, over which the hero logo hands off to the mark in the header.
 *
 * Hero and NavBar both read this constant. If they disagree, the big logo finishes shrinking
 * before the small one appears (or the other way round) and the handoff stops reading as one
 * continuous movement.
 */
export const LOGO_HANDOFF_DISTANCE = 420
