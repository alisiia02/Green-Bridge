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

In the Cloudflare dashboard: **Workers & Pages → Create → Connect to Git**, pick this repo,
then:

| Setting | Value |
| --- | --- |
| **Root directory** | **`frontend`** |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |

What gets deployed is described by **`frontend/wrangler.jsonc`**: an assets-only Worker with
no `main`, because nothing runs on the server. It points at `./dist` and sets
`not_found_handling: "single-page-application"`, which is what makes deep links work.

*(If you use the older **Pages** flow instead, there is no deploy command — set the build
output directory to `dist`, and routing needs a `public/_redirects` file containing
`/*    /index.html   200` rather than `wrangler.jsonc`. See the warning below before adding
one.)*

**The root directory matters.** Point Cloudflare at the repo root and the build fails with
*"application detection logic has been run in the root of a workspace instead of targeting a
specific project"* — this repo is an npm workspaces monorepo, and the detection will not run
at a workspace root. Targeting `frontend` gives it a plain Vite app. Every other path in
this table is then relative to `frontend`, which is why they are shorter than they look.

`frontend/package.json` declares all of its own dependencies, so it installs and builds on
its own without the workspace root. Node version comes from `.node-version`.

Then **Custom domains → Set up a domain** and add `greenbridge-honours.com`. Because the
domain's DNS is already on Cloudflare, the record and the HTTPS certificate are created for
you — there is nothing to configure by hand.

After that, every push to `main` rebuilds and redeploys. Pull requests get their own preview
URL.

### What makes deep links work

The app uses history-based routing, so `/patterns` is not a real file. Something has to
serve `index.html` for unmatched paths, or opening or refreshing any URL other than `/`
returns Cloudflare's own 404 and the app never boots — which also means our own 404 page
never renders.

On Workers that is **`not_found_handling: "single-page-application"`** in
`frontend/wrangler.jsonc`, and nothing else.

> **Do not add a `public/_redirects` file with `/* /index.html 200`.** That is the Pages way
> of doing the same thing, and Workers reads the file too — it rejects the rule as an
> infinite loop and **fails the deploy**. We shipped that once; the error is
> `Invalid _redirects configuration … Infinite loop detected [code: 100324]`. If the site
> ever moves to the Pages flow, that file comes back and `wrangler.jsonc` stops being used.

### Caching

`frontend/public/_headers` caches the fingerprinted `/assets/*` for a year and forbids
caching `index.html`, so a new build is picked up immediately instead of the browser holding
on to the previous build's asset URLs. Vite copies `public/` into the build output as-is.

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
