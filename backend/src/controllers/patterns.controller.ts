import type { Request, Response } from 'express'
import { patterns } from '../data/patterns.mock.js'

/** GET /api/patterns - all patterns in the library. */
export function listPatterns(_req: Request, res: Response) {
  res.json(patterns)
}

/** GET /api/patterns/:id - a single pattern. */
export function getPatternById(req: Request, res: Response) {
  const pattern = patterns.find((item) => item.id === req.params.id)

  if (!pattern) {
    res.status(404).json({ message: `No pattern with id "${req.params.id}"` })
    return
  }

  res.json(pattern)
}
