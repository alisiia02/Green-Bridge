import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))

export default {
  plugins: {
    // Pinned to an absolute path. Tailwind otherwise looks for tailwind.config.ts relative
    // to the working directory, and the root `npm run dev` starts Vite from the repo root -
    // where it would find nothing, fall back to an empty `content`, and silently emit the
    // CSS reset with none of the utilities.
    tailwindcss: { config: path.join(here, 'tailwind.config.ts') },
    autoprefixer: {},
  },
}
