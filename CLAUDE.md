# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Landing site for Duke AERO's Liquid Propulsion division, deployed at
`lpd.dukerocketry.com`. A small, single-page Astro + Tailwind site — same
stack as the main [Duke AERO site](https://github.com/Duke-AERO-Team/duke-aero-website),
kept as its own repo/deploy since it has its own domain. Ships as a fully
static site to Cloudflare (via `@astrojs/cloudflare`, `imageService:
"compile"` — there is no worker/runtime image endpoint, so all image
processing happens at build time).

## Relationship to duke-aero-website

This repo was forked/copied from the main Duke AERO site — locally at
`../duke-aero-website` (relative to this repo, i.e. a sibling folder under
`Github/`), remotely at
[Duke-AERO-Team/duke-aero-website](https://github.com/Duke-AERO-Team/duke-aero-website).
That repo is the reference for stack conventions, visual language, and code
patterns (Tailwind theme tokens, Prettier/eslint setup, Astro file
structure, component style, `Starfield.astro`/parallax approach, hero
video-poster technique, etc.) — when in doubt about "how does this team
normally do X," check there first rather than inventing a new convention.

Key differences from that reference, by design:

- **Scope**: this site covers Duke AERO's Liquid Propulsion subteam only
  (`lpd.dukerocketry.com`), not the whole club. The main site is
  multi-page (`team`, `sponsors`, `join`, `donate`, `past-projects/[id]`
  with MDX content collections, EXIF-tagged photo galleries, a sponsor
  marquee, etc.); this site is intentionally a single page
  (`Hero` → `MissionSection` → `Footer`) with no content collections, no
  MDX, no sponsors/team/join infrastructure. Don't pull that machinery in
  unless the site's scope actually grows to need it.
- **Branding**: same visual system (dark theme, same font stack, same
  starfield/rocket motifs, same logo) but positioned as "Duke AERO —
  Liquid Propulsion" rather than "Duke AERO," and every nav link back to
  the main team points at `dukerocketry.com`.
- **Deploy**: separate repo and separate Cloudflare deploy so the LPD
  subdomain can ship independently of the main site, even though it's
  still the same club/brand underneath.

Because the two repos evolve in parallel, a fix to a shared pattern (e.g. a
bug in the starfield parallax script, a Tailwind token change, a
build/deploy quirk) may need to be ported to the other repo by hand — there
is no shared package between them.

## Commands

Requires Node >=22.12.0 and `pnpm`.

- `pnpm install` — install dependencies
- `pnpm dev` — dev server at `localhost:4321`
- `pnpm build` — production build (outputs to `dist/`)
- `pnpm preview` — preview the production build
- `pnpm lint` — format the repo with Prettier (writes changes)
- `pnpm lint:check` — check formatting without writing (use this to verify, not `lint`)

There is no test suite and no separate typecheck script; `astro check` is not
wired up as an npm script. `eslint` and `eslint-plugin-astro` are listed as
devDependencies but there is no eslint config file in the repo yet.

## Architecture

Everything renders through one page (`src/pages/index.astro`), composed from
a handful of section components in `src/components/`:
`Hero.astro` → `MissionSection.astro` → `Footer.astro`, each wrapped by
`src/layouts/Layout.astro` (head/meta/OG tags/fonts) which every page
(`index.astro`, `404.astro`) uses. `Header.astro` is imported inside `Hero`
rather than by the page, since it's positioned fixed over the hero.

Key patterns to follow when extending this site:

- **Astro file structure**: code above the `---` fence is server-only JS/TS
  (runs at build time, no client JS unless in a `<script>` tag); markup below
  renders to HTML, referencing frontmatter values with `{jsVar}`.
- **Styling**: Tailwind v4 via `@tailwindcss/vite`, imported through
  `src/styles/global.css` using CSS-first config (`@theme`, `@utility` — no
  `tailwind.config.js`). Custom design tokens (colors, fonts) are defined
  there as CSS variables under `@theme`. Component-scoped CSS lives in
  `<style>` blocks in the `.astro` files that need it (see `Header.astro`,
  `404.astro`).
- **Client-side JS**: kept minimal and vanilla, inline in `<script>` tags
  scoped to the component that needs it (header scroll/menu state, hero
  video lazy-load, starfield parallax). No framework/islands are used.
- **Images/assets**: static assets live in `src/assets/` and are imported
  as modules so Astro's build-time image optimization applies (see
  `astro:assets`'s `<Image>` and `getImage()` usage in `Hero.astro` and
  `Layout.astro`). Files in `public/` (favicons) are served as-is, unoptimized.
- **Content**: copy/team data (e.g. `focusAreas` in `MissionSection.astro`)
  is inlined as frontmatter arrays/objects next to the component that
  renders it — there's no CMS or content collection layer.
- Comments in this codebase tend to explain *why* a non-obvious technique
  was used (e.g. seeded PRNG for a deterministic starfield, poster-then-load
  video sequencing for LCP) — match that style rather than narrating what
  the code does.

## Before this goes live

(from README — still open as of this writing)

- Register `lpd.dukerocketry.com` with whoever admins the Plausible instance
  at `stats.derock.dev` and drop the resulting analytics `<script>` snippet
  into `src/layouts/Layout.astro` (marked with a `TODO(analytics)`).
- Decide whether to keep the shared Duke AERO favicon/logo or use a
  dedicated LPD mark.
- Confirm the "SUBTEAM 08 / DUKE AERO" hero eyebrow line — swap in a
  founding date if the team wants one instead.
