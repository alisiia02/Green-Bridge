# Green Bridge

Research on urban planning, honours programme.

A pattern language for bringing shinrin-yoku (forest bathing) benefits into European urban
green spaces. This repo holds the project's public website: a pattern library aimed at NGOs,
urban planners, and municipal green space departments.

> **Status: under construction.** The site currently ships a complete UI shell with
> placeholder content. Real patterns, copy, and imagery land later.

## Stack

| Part | Tech |
| --- | --- |
| Frontend | React 18 + Vite + TypeScript, Tailwind CSS, React Router |
| Backend | Node + Express + TypeScript (skeleton, no database yet) |
| Repo | npm workspaces monorepo |

## Structure

```
frontend/          React app
  src/
    components/    ui/ (primitives), layout/ (shell), sections/ (composed blocks)
    pages/         Home, AboutUs, Patterns, NotFound
    routes/        router definitions
    constants/     nav links, site copy
    lib/           cn() helper, api fetch wrapper
    types/         shared TypeScript types
    data/          placeholder pattern data
backend/           Express API skeleton
  src/
    routes/        route definitions
    controllers/   handlers
    data/          mock JSON
DESIGN.md          design system: colors, radii, spacing, component conventions
```

## Setup

```bash
npm install
```

One install at the root covers both workspaces.

## Running

```bash
npm run dev        # frontend + backend together
npm run dev:web    # frontend only  -> http://localhost:5173
npm run dev:api    # backend only   -> http://localhost:4000
```

Optional: copy `frontend/.env.example` to `frontend/.env` and `backend/.env.example` to
`backend/.env` if you need to change ports or the API base URL. Both have working defaults,
so this is not required for local development.

## API endpoints

| Method | Path | Returns |
| --- | --- | --- |
| GET | `/api/health` | `{ status: "ok" }` |
| GET | `/api/patterns` | Array of placeholder pattern objects |

## Design

See **[DESIGN.md](DESIGN.md)** before adding UI. Short version: green palette, no gradients
anywhere, rounded corners on everything.

## Next steps

- Replace placeholder copy on Home / About Us with real project text
- Swap `PlaceholderImage` calls for real photography from the Japan fieldwork
- Wire the Patterns page to the backend: replace the `mockPatterns` import in
  `frontend/src/pages/Patterns.tsx` with `getJSON<Pattern[]>('/patterns')` from
  `frontend/src/lib/api.ts` (the wrapper is already in place)
- Give each pattern its own detail page once the four patterns are finalised

## Team

Alisiia Mishchenko & Lucas Krysmalski — HZ Honours Programme, 2025–2026.
