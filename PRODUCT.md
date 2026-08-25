# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary audience is sponsors and donors evaluating whether to fund Duke AERO's
Liquid Propulsion division — people deciding whether the team's engineering is
credible enough to back. Secondary audiences (not the design target, but who the
site will also reach): prospective Duke students considering joining, and the
general public/portfolio viewers. Copy and proof should read as convincing to a
technically literate outsider, not just to teammates who already know the
context.

## Product Purpose

A landing site for Duke AERO's Liquid Propulsion subteam
(`lpd.dukerocketry.com`) that makes the case for the team's engineering work —
what it has built, how it is run, and what it's chasing next — to an audience
deciding whether to support it.

## Positioning

Not a general club recruiting page — a focused technical case study of one
subteam's engine program. The lineage between projects (Eno's cold-flow data
directly shaping Prometheus's clean-sheet redesign) is the credibility story:
this is a team that tests, learns, and iterates on hardware, not just proposes
it.

## Operating Context

- Deployed as a fully static site to Cloudflare (`@astrojs/cloudflare`,
  `imageService: "compile"` — no server runtime, everything renders at build
  time).
- Separate repo/deploy from the main Duke AERO site
  (`Duke-AERO-Team/duke-aero-website`, sibling repo at `../duke-aero-website`),
  which remains the reference for shared stack conventions and visual language,
  even though the two evolve independently.
- Maintained by student team members, not a dedicated content/marketing function
  — copy and data are edited directly in local TS/MDX files, not through a CMS.

## Capabilities and Constraints

- Two engine projects exist: **Project Eno** (past, superseded — clamshell
  architecture, ended by cold-flow test results) and **Project Prometheus**
  (active — regeneratively cooled clean-sheet redesign built on what Eno
  measured). Terminology: these are **projects**, never "programs" (the one
  exception is Footer.astro's club-wide "program," a different sense).
- Structured project metadata (cover image, tagline, years, status, objective,
  outcome, workstreams) lives in `src/data/projects.ts` as the single source of
  truth, feeding both the homepage timeline and the `/projects` index card grid.
- Per-project detail pages are being added at `/projects/eno` and
  `/projects/prometheus`, authored in MDX so long-form narrative content
  (campaign write-ups, findings) can be written as prose rather than crammed
  into the structured data model. This is a deliberate, scoped exception to the
  site's normal no-MDX/no-content-collection stance — added because these two
  pages specifically need long-form authored narrative, not because the site is
  adopting MDX/CMS infrastructure broadly.
- Real year ranges for both projects and real names/summaries for all six
  workstreams are still outstanding from the team (currently placeholder `20XX`
  / `TODO — workstream name` values) — do not invent these.
- No test suite, no typecheck script wired up; `pnpm lint:check` (Prettier) is
  the only automated check.

## Brand Commitments

- Same visual system as the main Duke AERO site (dark theme, font stack, logo)
  but positioned as "Duke AERO — Liquid Propulsion," with nav links back to the
  main team pointing at `dukerocketry.com`.
- Distinguishing idiom: a warm **ember** field (`Embers.astro`) and orange/peach
  accents, in place of the main site's cool blue starfield — same visual
  language, shifted warmer because the subject is combustion.
- Analytics (Plausible via `stats.derock.dev`) and final favicon/logo choice are
  still pending team decisions before launch.

## Evidence on Hand

- Real cover photography exists for both projects (`src/assets/projects/eno/`,
  `src/assets/projects/prometheus/`).
- No written narrative content, additional photo galleries, or test data exist
  yet for the new MDX detail pages — build with clearly marked placeholder
  content (matching the existing `TODO(content)` convention in
  `src/data/projects.ts`) rather than inventing specifics (dates, test results,
  numbers) that the team hasn't confirmed.

## Product Principles

- Deliberately small: local data files over content collections/CMS, no
  framework islands, minimal client JS — don't pull in machinery the site's
  actual scope doesn't need.
- One source of truth per fact: structured project metadata lives in
  `src/data/projects.ts`; don't fork copies of it into MDX frontmatter.
- Placeholder content is marked, never invented — dates, results, and names the
  team hasn't confirmed stay as visible TODOs, not plausible-sounding guesses.
- Every change to shared visual patterns (parallax, tokens, build/deploy quirks)
  may need hand-porting to the sibling `duke-aero-website` repo — there is no
  shared package between them.
