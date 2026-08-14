import path from 'node:path'
import type { Config } from 'tailwindcss'

// Anchored to this file rather than the working directory, so the class scan finds the
// source whether Vite is started from frontend/ or from the repo root. Forward slashes
// because the glob matcher does not accept Windows backslashes.
const root = path.resolve(__dirname).replace(/\\/g, '/')

/**
 * Green Bridge design tokens.
 *
 * See DESIGN.md at the repo root for usage guidance. Two rules the config can't enforce
 * on its own, so they live in review instead:
 *   - never use gradient utilities (bg-gradient-*, from-*, via-*, to-*)
 *   - never use rounded-none; 8px (rounded-sm) is the floor
 */
export default {
  content: [`${root}/index.html`, `${root}/src/**/*.{ts,tsx}`],
  theme: {
    extend: {
      colors: {
        // Brand scale. Deliberately overrides Tailwind's default green.
        green: {
          50: '#f2f8f1',
          100: '#e0efdd',
          200: '#c1dfbb',
          300: '#9bc98f',
          400: '#71ad63',
          500: '#4f9142',
          600: '#3c7532',
          700: '#2f5c28',
          800: '#294a24',
          900: '#233d20',
        },
        // Warm clay. Sparing use only - badges and small highlights.
        accent: {
          50: '#fbf5ee',
          500: '#c98a4b',
          600: '#a86e37',
        },
        // Warm stone instead of pure gray, so text sits comfortably next to the greens.
        neutral: {
          50: '#faf9f6',
          100: '#f2f0ea',
          200: '#e5e2d9',
          300: '#cfcabb',
          400: '#a8a396',
          500: '#8a8577',
          600: '#6b6659',
          700: '#544f44',
          800: '#3c392f',
          900: '#26241d',
        },
      },
      borderRadius: {
        sm: '0.5rem', // 8px  - smallest allowed
        DEFAULT: '0.75rem', // 12px
        md: '1rem', // 16px - buttons
        lg: '1.5rem', // 24px - cards, containers
        xl: '2rem', // 32px - hero panels
        '2xl': '2.5rem', // 40px - statement panels
        full: '9999px',
      },
      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      maxWidth: {
        content: '72rem',
      },
    },
  },
  plugins: [],
} satisfies Config
