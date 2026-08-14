# Green Bridge — Design System

The visual language for the Green Bridge pattern library. This document is the reference for
anyone adding a page or component: use these tokens, follow these conventions, and the site
stays coherent without anyone having to police it.

---

## 1. Overview

Green Bridge presents research on urban green spaces and shinrin-yoku (forest bathing). The
interface should feel like the thing it advocates for: **calm, natural, unhurried, and easy
to be in**. Nothing sharp, nothing shouty, nothing that looks like a dashboard.

**Three rules that define the look:**

1. **Green is the identity.** One green scale carries the whole site. Everything else is
   support.
2. **No gradients.** Solid fills only, everywhere, no exceptions.
3. **Nothing sharp.** Every box, button, image, and tag has a rounded corner. The smallest
   radius on the site is 8px.

---

## 2. Color Tokens

Defined in `frontend/tailwind.config.ts` under `theme.extend.colors`.

### Green (primary)

The brand scale. Overrides Tailwind's default green on purpose — `green-*` classes anywhere
in the app refer to *these* values.

| Token | Hex | Use for |
| --- | --- | --- |
| `green-50` | `#f2f8f1` | Page background, softest surfaces |
| `green-100` | `#e0efdd` | Placeholder image fill, subtle section bands |
| `green-200` | `#c1dfbb` | Borders on green surfaces, dividers |
| `green-300` | `#9bc98f` | Muted icons, decorative marks |
| `green-400` | `#71ad63` | Hover states on light surfaces |
| `green-500` | `#4f9142` | **Primary brand color** — main buttons, active nav |
| `green-600` | `#3c7532` | Primary button hover, link hover |
| `green-700` | `#2f5c28` | Body emphasis, secondary headings |
| `green-800` | `#294a24` | Footer background, dark panels |
| `green-900` | `#233d20` | Headings, highest-contrast text |

### Accent (clay)

A warm counterpoint. **Sparing use only** — badges, category tags, the occasional highlight.
Never a primary action color, never more than a few elements per page.

| Token | Hex | Use for |
| --- | --- | --- |
| `accent-500` | `#c98a4b` | Badge text/border on light backgrounds |
| `accent-600` | `#a86e37` | Accent hover |
| `accent-50` | `#fbf5ee` | Badge background fill |

### Neutral (warm stone)

Replaces pure gray. Grays with a warm bias sit better next to green and stop the page from
feeling clinical.

| Token | Hex | Use for |
| --- | --- | --- |
| `neutral-50` | `#faf9f6` | Card backgrounds, page base |
| `neutral-100` | `#f2f0ea` | Alternating sections |
| `neutral-200` | `#e5e2d9` | Borders, hairlines |
| `neutral-400` | `#a8a396` | Placeholder text, disabled states |
| `neutral-600` | `#6b6659` | Body copy, secondary text |
| `neutral-800` | `#3c392f` | Strong body text |
| `neutral-900` | `#26241d` | Maximum-contrast text (rarely needed — prefer `green-900`) |

### ⛔ The gradient rule

**Never use `bg-gradient-to-*`, `from-*`, `via-*`, or `to-*`.** Solid fills only. If a
surface needs to feel less flat, use a neighbouring token from the same scale, a border, or
whitespace — not a gradient. This is the easiest rule to break by accident when copying a
snippet from elsewhere, so check for it in review.

---

## 3. Border Radius Tokens

Defined in `frontend/tailwind.config.ts` under `theme.extend.borderRadius`.

| Class | Value | Use for |
| --- | --- | --- |
| `rounded-sm` | 8px | Smallest allowed — inputs, tight inner elements |
| `rounded` | 12px | Default for miscellaneous boxes |
| `rounded-md` | 16px | Buttons |
| `rounded-lg` | 24px | Cards, content containers, placeholder images |
| `rounded-xl` | 32px | Hero panels, large feature blocks |
| `rounded-2xl` | 40px | Full-bleed statement panels (use rarely) |
| `rounded-full` | pill | Badges, tags, icon buttons, nav pills |

**Rule: never use `rounded-none`.** 8px is the floor. When nesting a rounded element inside
another, the inner radius should be smaller than the outer one, or the corners look wrong.

---

## 4. Spacing & Layout

Tailwind's default 4px spacing scale is used unchanged. The conventions that matter:

| Context | Class | Notes |
| --- | --- | --- |
| Section vertical rhythm | `py-16` / `md:py-24` | Handled by `<Section>` — don't hand-roll |
| Page content width | `max-w-6xl` | Handled by `<PageContainer>` |
| Horizontal page padding | `px-5 sm:px-8` | Also in `<PageContainer>` |
| Card padding | `p-6` | `p-8` for feature cards |
| Card grid gap | `gap-6` | |
| Stacked text blocks | `space-y-4` | |

Generous whitespace is part of the identity. When in doubt, add more space rather than more
decoration.

---

## 5. Typography

System font stack — no webfont dependency, fast, and neutral enough not to fight the palette.

| Element | Classes |
| --- | --- |
| Page title (h1) | `text-4xl md:text-5xl font-semibold tracking-tight text-green-900` |
| Section title (h2) | `text-2xl md:text-3xl font-semibold text-green-900` |
| Card title (h3) | `text-lg font-semibold text-green-900` |
| Body | `text-base leading-relaxed text-neutral-600` |
| Lead / intro | `text-lg leading-relaxed text-neutral-600` |
| Small / meta | `text-sm text-neutral-400` |

Headings use `font-semibold`, not `font-bold` — heavy weights read as loud against this
palette.

---

## 6. Component Conventions

Components live in three folders by role:

- `components/ui/` — generic primitives, no project knowledge (`Button`, `Card`, `Badge`,
  `Section`, `PlaceholderImage`)
- `components/layout/` — page shell (`Layout`, `NavBar`, `Footer`, `PageContainer`)
- `components/sections/` — composed, meaningful blocks (`Hero`, `PageHeader`,
  `UnderConstructionNotice`)

Every component accepts `className` and merges it with `cn()` from `lib/cn.ts` (clsx +
tailwind-merge), so callers can adjust spacing without the component needing a new prop.

### Button

`rounded-md`, `font-medium`, visible `focus-visible` ring in `green-500`.

| Variant | Appearance |
| --- | --- |
| `primary` | `bg-green-500` fill, white text, `hover:bg-green-600` |
| `secondary` | `bg-green-100` fill, `green-800` text, `hover:bg-green-200` |
| `outline` | Transparent, `border-green-200`, `green-700` text |
| `ghost` | Transparent, no border, `green-700` text |

Sizes: `sm` (`px-4 py-2 text-sm`), `md` (`px-5 py-2.5`), `lg` (`px-7 py-3 text-lg`).
Renders as `<a>` when given `href`, otherwise `<button>`.

### Card

`rounded-lg border border-neutral-200 bg-white p-6`. Optional `interactive` prop adds a
hover lift (`hover:border-green-200 hover:shadow-sm`) — only for cards that are actually
clickable.

### PlaceholderImage

Stands in for every real image until the project has photography. `rounded-lg`, filled with
`green-100`, a `green-200` dashed border, a small leaf mark and an optional `label`. Takes
an `aspect` prop (`video` | `square` | `wide` | `portrait`).

When real images arrive, replace the component call, not the layout around it — the aspect
ratios are already set so nothing shifts.

### Badge

`rounded-full`, `text-xs font-medium`, `px-3 py-1`. Two tones: `green` (default) and
`accent` (for pattern categories). Badges label, they don't link.

---

## 7. Do / Don't

**Do**

- Solid green fills from the scale above
- Rounded corners on everything — `rounded-lg` is the safe default for containers
- Generous vertical whitespace between sections
- Warm neutrals for text instead of pure gray or black
- One accent element per section at most

**Don't**

- Gradients of any kind (`bg-gradient-*`, `from-*`, `via-*`, `to-*`)
- Sharp corners (`rounded-none`) or radii below 8px
- Pure `#000` text or `#fff` page backgrounds — use `green-900` and `neutral-50`
- Heavy drop shadows — a hairline border does the job
- New colors outside the three scales. If something needs a color that isn't here, the token
  set should be extended deliberately, not bypassed inline.
