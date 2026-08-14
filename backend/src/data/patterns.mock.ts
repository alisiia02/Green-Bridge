import type { Pattern } from '../types/pattern.js'

/**
 * Static placeholder patterns. Stands in for a database until there is real content to
 * store - swap this module for a data layer when that time comes.
 */
export const patterns: Pattern[] = [
  {
    id: 'urban-ravine',
    name: 'The Urban Ravine',
    category: 'Microclimate',
    summary:
      'Rail cuttings, canal edges and flood channels already sit below street level. Their geometry alone buffers noise, blocks wind and holds humidity - the separation a large park normally needs acres to achieve.',
    imageAlt: 'A lowered green corridor running below street level',
    status: 'confirmed',
  },
  {
    id: 'sanctuary-garden',
    name: 'The Sanctuary Garden',
    category: 'Community',
    summary:
      'Churches hold quiet land in dense neighbourhoods and carry a tradition of contemplative space. That combination gives a green space both an owner and a reason to be protected.',
    imageAlt: 'A small garden beside a church building',
    status: 'candidate',
  },
  {
    id: 'placeholder-pattern-3',
    name: 'Pattern three',
    category: 'Wellbeing',
    summary:
      'Placeholder entry. The third pattern will be identified during the literature review and expert interviews, then written up in the same format as the others.',
    imageAlt: 'Placeholder image for an unnamed pattern',
    status: 'exploring',
  },
  {
    id: 'placeholder-pattern-4',
    name: 'Pattern four',
    category: 'Infrastructure',
    summary:
      'Placeholder entry. Reserved for the fourth and final pattern of this project cycle - depth over breadth, so this slot stays empty until the evidence is there.',
    imageAlt: 'Placeholder image for an unnamed pattern',
    status: 'exploring',
  },
]
