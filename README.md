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

## What is live, and how to change it

The site is under construction, so only the **home page** (banner + the
under-construction notice) and the **404** are reachable. About Us and Patterns are written
and working but hidden — their code stays in the repo, stays imported, and keeps
type-checking, so it cannot rot while it waits.

Everything is controlled from one file: **`frontend/src/constants/publish.ts`**.

| To do this | Change |
| --- | --- |
| Put a page live | Add its path to `PUBLISHED_PATHS` |
| Show the home page's preview sections | `SHOW_HOME_PREVIEW = true` |
| Take the whole site live | `PUBLISHED_PATHS = ALL_PATHS` and `SHOW_HOME_PREVIEW = true` |

Adding a path is the whole job — the route registers itself, the link appears in the header
and footer, and the matching button on the home page comes back. Paths that are not
published fall through to the 404 rather than a blank screen.

## Deployment

**greenbridge-honours.com**, hosted on Cloudflare Pages. Only the frontend is deployed —
the site is a static build and never calls the API, so no server is running.

### First-time setup

In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**, pick
this repo, then:

| Setting | Value |
| --- | --- |
| Framework preset | None |
| Build command | `npm run build:web` |
| Build output directory | `frontend/dist` |
| Root directory | *(leave as the repo root)* |

Node version comes from `.node-version`, so it does not need setting in the dashboard.

Then **Custom domains → Set up a domain** and add `greenbridge-honours.com`. Because the
domain's DNS is already on Cloudflare, the record and the HTTPS certificate are created for
you — there is nothing to configure by hand.

After that, every push to `main` rebuilds and redeploys. Pull requests get their own preview
URL.

### Two files that make it work

Both live in `frontend/public/`, which Vite copies to the build output as-is:

- **`_redirects`** — serves `index.html` for every path. The app uses history-based routing,
  so `/patterns` is not a real file; without this, opening or refreshing any URL other than
  `/` returns Cloudflare's 404 and the app never boots. Delete it and direct links break.
- **`_headers`** — caches the fingerprinted `/assets/*` for a year and forbids caching
  `index.html`, so a new build is picked up immediately instead of serving stale asset URLs.

### When the backend is needed

It is not deployed and does not need to be yet. The Patterns page reads local mock data, so
nothing would call it. Once that page is wired to `/api/patterns`, the options are a
Cloudflare Worker (same dashboard, keeps everything in one place) or a small Node host such
as Render or Railway. Either way, set `VITE_API_BASE_URL` in the Pages build settings so the
frontend knows where to look.

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
