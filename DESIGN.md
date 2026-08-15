# Green Bridge — Design System

The visual language for the Green Bridge pattern library. This document is the reference for
anyone adding a page or component: use these tokens, follow these conventions, and the site
stays coherent without anyone having to police it.

---

## 1. Overview

Green Bridge presents research on urban green spaces and shinrin-yoku (forest bathing). The
interface should feel like the thing it advocates for: **calm, natural, unhurried, and easy
to be in**. Nothing sharp, nothing shouty, nothing that looks like a dashboard.

**Five rules that define the look:**

1. **Green is the identity.** One green scale carries the whole site. Everything else is
   support.
2. **No gradients.** Solid fills and flat translucency only, everywhere, no exceptions.
3. **Nothing sharp.** Every box, button, image, and tag has a rounded corner. The smallest
   radius on the site is 8px. The single exception is full-bleed banners (see §8).
4. **Bands, not borders.** Sections are separated by full-width tinted backgrounds, not by
   drawing an outline around every block.
5. **Cards are the exception.** Content sits directly on the page by default. A card is
   what you reach for when a block genuinely needs to lift off what is behind it — not the
   default wrapper for everything. Four bordered boxes in a row read as clutter; the same
   content as icons and text reads as one calm group.

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
| Gap between split rows | `space-y-20 md:space-y-28` | Big gaps are the point |
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
| Page title (h1) | `text-4xl md:text-6xl font-bold tracking-tight text-green-900` |
| Section title (h2) | `text-3xl md:text-4xl font-semibold tracking-tight text-green-900` |
| Eyebrow | `text-xs font-semibold uppercase tracking-[0.18em] text-green-600` |
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
| `outline-light` | Transparent, `border-white/70`, white text — over photos and dark bands |
| `ghost` | Transparent, no border, `green-700` text |

Sizes: `sm` (`px-4 py-2 text-sm`), `md` (`px-5 py-2.5`), `lg` (`px-7 py-3 text-lg`).
Renders as `<a>` when given `href`, otherwise `<button>`.

### Band

Full-width tinted section — the main tool for separating content. Tones: `soft`
(`green-50`), `green` (`green-100`), `white`, `dark` (`green-800`). Place a `Band` as a
direct child of the page, a **sibling** of `PageContainer` rather than inside it, or the
background will stop at the content width instead of reaching the viewport edges.

Alternate `soft` and untinted sections down a page. Two identical tones touching read as
one long block.

### Card

Three variants, in order of how often you should use them:

| Variant | Appearance | When |
| --- | --- | --- |
| `plain` | Padding only, no chrome | Grid items, most content blocks |
| `glass` (default) | `bg-white/70` + `backdrop-blur-md` + `border-white/70` | On top of a tinted Band or an image |
| `solid` | `bg-white` + `border-neutral-200` | Only when nothing interesting is behind it |

`glass` is the house style, but it only works when something shows through it. A frosted
panel on a plain background is just a white box with extra steps — put it on a `Band` or
over a photo, or use `plain` instead.

### Eyebrow

Small uppercase label above a heading: `text-xs font-semibold uppercase tracking-[0.18em]`.
Use for structural labels ("what section is this"). Use a `Badge` instead when the label is
data, like a pattern's category.

### FeatureItem

Circular pale-green icon, uppercase label, one line of text — deliberately **no box**. This
is the replacement for a row of small cards.

### PlaceholderImage

Stands in for every real image until the project has photography. Filled with `green-100`,
a leaf mark and an optional `label`. Props:

- `aspect`: `video` | `square` | `wide` | `portrait` | `none` (height from `className`)
- `variant`: `framed` (dashed outline, for inline content) | `plain` (flat fill, for banners
  — dashes look broken at large sizes)
- `quiet`: hides the icon and caption, for banners with content layered on top

When real images arrive, replace the component call, not the layout around it — the aspect
ratios are already set so nothing shifts.

### Hero / SplitRow

`Hero` is a full-bleed image banner with the title sitting **directly on the photo** — no
panel around it. Legibility comes from a flat scrim (`bg-green-900/45`, a solid colour at
partial opacity, not a gradient) plus white text. Buttons over it use the `outline-light`
variant; the standard `outline` disappears against a photograph. One per site, home only.

The image drifts on scroll via `useParallax`. The strength and the layer's size are a
matched pair: strength `0.3` needs a layer `160%` tall starting at `-30%`, so the overscan
runs out at exactly the moment the banner leaves the viewport. **Change one and you must
change the other**, or the image either sticks early or shows a gap at the top. The hook
returns `0` under `prefers-reduced-motion`.

### Logo

Two files, one component:

| Form | File | Used in |
| --- | --- | --- |
| Wordmark inside the arch | `assets/logo-wordmark.svg` (88 KB) | Hero — it *is* the `<h1>` |
| Bare arch | `assets/logo-mark.svg` (6 KB) | Header |

The artwork is dark green with no light variant, so `light` inverts it to white via a CSS
filter for use over photographs. The filter transitions, so the header mark does not pop
when the background arrives.

The wordmark is 88 KB because the lettering is outlined paths. That is fine for one hero
image; don't reach for it anywhere it would load repeatedly.

### NavBar

Carries no fill at the top of a page, and takes one on once scrolled — past the hero there
is nothing behind it, and content would otherwise run through the links. Two modes, chosen
by route in `Layout`:

| Mode | Used on | Position | At top | Scrolled |
| --- | --- | --- | --- | --- |
| `overlay` | Pages opening on a hero (`/`) | `fixed` | Transparent, white text, mark hidden | Fill, dark text, mark shown |
| default | Everything else | `sticky` | Transparent, dark text | Fill, dark text |

One row, with the **bridge arch spanning the middle link** — `NAV_LINKS` is ordered so
**Patterns** is that middle entry. The arch is decorative: `aria-hidden`, no pointer
events, and behind the links, because its box is far wider than the word it arches over and
would otherwise swallow clicks meant for that link.

Three measurements hold this together. Change the arch height and all three move:

| Concern | Rule |
| --- | --- |
| Middle link is centred | Side links get `flex-1` **equal-width slots**. Centring the row is not enough — the links differ in width, which shifts the middle one off the centre line and away from the arch. |
| Arch clears its neighbours | The middle link reserves `px-28` (`md:px-32`). At `h-32` the arch is 276px wide against a ~62px word, so it overhangs by ~107px each side. |
| Label sits in the opening | The arch anchors to `top-0` and is taller than the row; the row uses `items-end pb-4`. The opening's centre is ~⅔ down the artwork, which puts both at ~85px from the row top. |

The row is `overflow-hidden` so the legs crop at the header edge. The arch's centring
translate and its handoff scale share one `transform`, so both live in the inline style — a
class-based `-translate-x-1/2` would be overwritten by the scale — with
`transform-origin: top center` so scaling does not drag it off its anchor.

The layout assumes an **odd** number of links, so the middle one has equal counts either
side. The active link is underlined rather than filled, since there is often no fill for a
pill to sit on.

### Logo handoff

Scrolling the home page shrinks the hero logo and fades the header mark in over the same
distance, so the big logo appears to travel up into the header. The two are different
artwork, so this is a cross-fade, not a morph.

The header mark sits just right of centre, after the links, so the hero logo drifts that
way as it goes — `LOGO_HANDOFF_DRIFT_X`. That value is approximate by design: a cross-fade
only has to point in the right direction, so it is not worth measuring both elements to
land it exactly.

Both components read `LOGO_HANDOFF_DISTANCE` from `constants/motion.ts`. **Keep them on the
same constant**: if they disagree, one half finishes before the other starts and the
illusion breaks. The hero's shrink is skipped under `prefers-reduced-motion`, but the
cross-fade still runs, so the header mark always ends up visible.

`SplitRow` is image one side, text the other, with a `reverse` prop to alternate. Two of
these carry more weight than six small cards and give the eye somewhere to rest.

### Badge

`rounded-full`, `text-xs font-medium`, `px-3 py-1`. Two tones: `green` (default) and
`accent` (for pattern categories). Badges label, they don't link.

---

## 7. Do / Don't

**Do**

- Solid green fills from the scale above
- Rounded corners on everything — `rounded-lg` is the safe default for containers
- Generous vertical whitespace between sections — more than feels necessary
- Warm neutrals for text instead of pure gray or black
- Separate sections with tinted `Band`s and let content sit directly on them
- One accent element per section at most

**Don't**

- Gradients of any kind (`bg-gradient-*`, `from-*`, `via-*`, `to-*`)
- Sharp corners (`rounded-none`) or radii below 8px, except full-bleed banners
- Wrap everything in a card. If a section is a grid of bordered boxes, ask whether it could
  be a `FeatureItem` row, an alternating `SplitRow`, or plain text on a `Band` instead.
- Pure `#000` text or `#fff` page backgrounds — use `green-900` and `neutral-50`
- Heavy drop shadows — a hairline border or a `Band` does the job
- New colors outside the three scales. If something needs a color that isn't here, the token
  set should be extended deliberately, not bypassed inline.

---

## 8. Full-bleed exception

Banners and `Band`s run to the viewport edge, so they carry **no corner radius** — a
rounded full-bleed element shows slivers of the page background at its corners. This is the
only place `rounded-none` is correct. Everything layered on top of a banner (the hero's
glass panel, cards on a Band) keeps its normal radius.
