# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## What this is

Landing site for Duke AERO's Liquid Propulsion division, deployed at
`lpd.dukerocketry.com`. A small Astro + Tailwind site — same stack as the main
[Duke AERO site](https://github.com/Duke-AERO-Team/duke-aero-website), kept as
its own repo/deploy since it has its own domain. Ships as a fully static site to
Cloudflare (via `@astrojs/cloudflare`, `imageService: "compile"` — there is no
worker/runtime image endpoint, so all image processing happens at build time).

It started as a single page and has since grown a few routes (a `/projects`
index and one page per subteam), but it is still deliberately small: local data
files instead of content collections, no MDX, no CMS.

## Relationship to duke-aero-website

This repo was forked/copied from the main Duke AERO site — locally at
`../duke-aero-website` (relative to this repo, i.e. a sibling folder under
`Github/`), remotely at
[Duke-AERO-Team/duke-aero-website](https://github.com/Duke-AERO-Team/duke-aero-website).
That repo is the reference for stack conventions, visual language, and code
patterns (Tailwind theme tokens, Prettier/eslint setup, Astro file structure,
component style, `Starfield.astro`/parallax approach, page shells like
`past-projects/index.astro`, etc.) — when in doubt about "how does this team
normally do X," check there first rather than inventing a new convention.

Key differences from that reference, by design:

- **Scope**: this site covers Duke AERO's Liquid Propulsion subteam only
  (`lpd.dukerocketry.com`), not the whole club. The main site is multi-page
  (`team`, `sponsors`, `join`, `donate`, `past-projects/[id]` with MDX content
  collections, EXIF-tagged photo galleries, a sponsor marquee, etc.); this site
  has a homepage, a `/projects` index, and three subteam pages, with **no
  content collections, no MDX, and no sponsors/team/join infrastructure**. Don't
  pull that machinery in unless the site's scope actually grows to need it — two
  projects and three subteams do not earn a content collection.
- **Branding**: same visual system (dark theme, same font stack, same logo) but
  positioned as "Duke AERO — Liquid Propulsion" rather than "Duke AERO," and
  every nav link back to the main team points at `dukerocketry.com`. Where the
  main site uses a cool blue starfield, this one uses a warm **ember** field
  (`Embers.astro`) and orange/peach accents — same idiom, different temperature,
  because the subject is combustion.
- **Deploy**: separate repo and separate Cloudflare deploy so the LPD subdomain
  can ship independently of the main site, even though it's still the same
  club/brand underneath.

Because the two repos evolve in parallel, a fix to a shared pattern (e.g. a bug
in the parallax script, a Tailwind token change, a build/deploy quirk) may need
to be ported to the other repo by hand — there is no shared package between
them.

## Commands

Requires Node >=22.12.0 and `pnpm`.

- `pnpm install` — install dependencies
- `pnpm dev` — dev server at `localhost:4321`
- `pnpm build` — production build (outputs to `dist/`)
- `pnpm preview` — preview the production build
- `pnpm lint` — format the repo with Prettier (writes changes)
- `pnpm lint:check` — check formatting without writing (use this to verify, not
  `lint`)

There is no test suite and no separate typecheck script; `astro check` is not
wired up as an npm script. `eslint` and `eslint-plugin-astro` are listed as
devDependencies but there is no eslint config file in the repo yet.

## Deploying

`pnpm build` writes `dist/client` (all the static output, plus a generated
`wrangler.json`) and an empty `dist/server` — empty because nothing on the site
is server-rendered, so the Cloudflare adapter emits an assets-only Worker with
no handler code.

Deploy the generated config rather than hand-writing one:

```bash
pnpm build
npx wrangler deploy --config dist/client/wrangler.json
```

Add `--temporary` to publish to a throwaway preview account with no login —
useful for handing the team a URL to look at. `--site` can be overridden at
build time (`pnpm build --site https://…`) when a preview URL needs correct
absolute OG/canonical tags, since `site` in `astro.config.mjs` is hard-coded to
the production domain.

Note that Cloudflare's asset server canonicalizes to a trailing slash, so
`/projects` **307s** to `/projects/`. Internal links are currently written
without the trailing slash and take that redirect.

## Architecture

Four routes, all wrapped by `src/layouts/Layout.astro` (head/meta/OG
tags/fonts):

- `src/pages/index.astro` — `Hero` → `AboutSection` → `PhotoWall` →
  `ProjectsSection` → `Footer`. `Header.astro` is imported inside `Hero` rather
  than by the page, since it's positioned fixed over the hero.
- `src/pages/projects/index.astro` — the projects index. Mirrors the _structure_
  of duke-aero-website's `past-projects/index.astro` (centred eyebrow →
  `text-gradient-metal` H1 → intro line → card grid) in this site's palette.
  Imports `Header`/`Footer` directly, as all non-home pages do.
- `src/pages/[subteam].astro` — one route generating all three subteam pages
  from `src/data/subteams.ts` via `getStaticPaths`.
- `src/pages/404.astro`

Key patterns to follow when extending this site:

- **Astro file structure**: code above the `---` fence is server-only JS/TS
  (runs at build time, no client JS unless in a `<script>` tag); markup below
  renders to HTML, referencing frontmatter values with `{jsVar}`.
- **Styling**: Tailwind v4 via `@tailwindcss/vite`, imported through
  `src/styles/global.css` using CSS-first config (`@theme`, `@utility` — no
  `tailwind.config.js`). Custom design tokens (colors, fonts) are defined there
  as CSS variables under `@theme`. Component-scoped CSS lives in `<style>`
  blocks in the `.astro` files that need it (see `Header.astro`,
  `ProjectCard.astro`, `404.astro`).
- **Client-side JS**: kept minimal and vanilla, inline in `<script>` tags scoped
  to the component that needs it. Only two components ship any: `Header.astro`
  (scroll state, mobile menu) and `Embers.astro` (parallax). Prefer a platform
  element over a script — `ProjectCard.astro`'s subsystem disclosure is a native
  `<details>` precisely so it costs no JS and gets keyboard and screen-reader
  behaviour for free. No framework/islands are used.
- **Images/assets**: static assets live in `src/assets/` and are imported as
  modules so Astro's build-time image optimization applies (see `astro:assets`'s
  `<Image>` and `getImage()` usage in `Hero.astro` and `Layout.astro`). Files in
  `public/` (favicons) are served as-is, unoptimized. Two conventions coexist
  deliberately: `PhotoWall.astro` **globs** a drop-folder
  (`src/assets/wall/row-*/`) because the wall is unordered and photos get added
  in bulk, while project covers are **explicit imports** from
  `src/assets/projects/<slug>/` because a cover is a deliberate pick.
- **Content**: copy and structured data live in plain local arrays —
  `src/data/projects.ts` and `src/data/subteams.ts` for anything shared across
  routes, or inline in component frontmatter when only one component renders it.
  There's no CMS or content collection layer.
- **Terminology**: the engine efforts are **projects** (Project Eno, Project
  Prometheus), never "programs." The one surviving use of "program" is in
  `Footer.astro`, where it means Duke AERO's club-wide rocketry program — a
  different sense, and correct as written.
- Comments in this codebase tend to explain _why_ a non-obvious technique was
  used (e.g. seeded PRNG for a deterministic ember field, `<picture>` so only
  one hero crop is ever downloaded, `1lh` background sizing for the metal
  gradient) — match that style rather than narrating what the code does.

### Projects data model

`src/data/projects.ts` drives both the homepage timeline
(`ProjectsSection.astro`, a chronological rail, oldest first) and the
`/projects` card grid (`ProjectCard.astro`, newest first — there the grid is an
index, so it leads with what's current).

Two optional fields are forward-declarations, and both are designed to degrade
rather than break:

- `Project.detailHref` — when set, `ProjectCard`'s face becomes a link and the
  homepage "Learn more" buttons point at it. While undefined the card face
  renders as a `<div>` and the buttons fall back to `/projects`, so no link on
  the site points at a page that isn't built.
- `Workstream.href` — when set, a subsystem row becomes a link with a hover
  arrow; otherwise it renders as plain text.

Set `detailHref` to `/projects/${slug}` if and when per-project detail pages are
added; `slug` already exists for that purpose.

## Before this goes live

- Register `lpd.dukerocketry.com` with whoever admins the Plausible instance at
  `stats.derock.dev` and drop the resulting analytics `<script>` snippet into
  `src/layouts/Layout.astro` (marked with a `TODO(analytics)`).
- Decide whether to keep the shared Duke AERO favicon/logo or use a dedicated
  LPD mark.
- **Content still outstanding from the team** (marked `TODO(content)` in
  `src/data/projects.ts`): real year ranges for both projects — both currently
  read `20XX` and nothing here should guess a date — and real names and one-line
  summaries for all six workstreams, which currently render as
  `TODO — workstream name` in both the homepage timeline and the `/projects`
  card disclosures.
