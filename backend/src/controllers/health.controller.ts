import type { Request, Response } from 'express'

/** GET /api/health - liveness check. */
export function getHealth(_req: Request, res: Response) {
  res.json({
    status: 'ok',
    service: 'green-bridge-api',
    timestamp: new Date().toISOString(),
  })
}
