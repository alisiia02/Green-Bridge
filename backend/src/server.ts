import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import { createApp } from './app.js'

// Resolve .env relative to this file rather than the working directory, so the server
// behaves the same whether it is started from backend/ or from the repo root.
const here = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(here, '..', '.env') })

const PORT = Number(process.env.PORT ?? 4000)

const app = createApp()

app.listen(PORT, () => {
  console.log(`Green Bridge API listening on http://localhost:${PORT}`)
})
