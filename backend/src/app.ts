import express, { type NextFunction, type Request, type Response } from 'express'
import cors from 'cors'
import { healthRouter } from './routes/health.routes.js'
import { patternsRouter } from './routes/patterns.routes.js'

export function createApp() {
  // Read inside the factory, not at module load - server.ts loads .env after its imports
  // have already been evaluated.
  const corsOrigin = (process.env.CORS_ORIGIN ?? 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())

  const app = express()

  app.use(cors({ origin: corsOrigin }))
  app.use(express.json())

  app.use('/api/health', healthRouter)
  app.use('/api/patterns', patternsRouter)

  app.use((_req: Request, res: Response) => {
    res.status(404).json({ message: 'Not found' })
  })

  app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  })

  return app
}
