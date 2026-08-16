# Duke AERO — Liquid Propulsion

Landing site for Duke AERO's Liquid Propulsion division, deployed at
`lpd.dukerocketry.com`. Built with `astro` and `tailwindcss`, same stack as the
main [Duke AERO site](https://github.com/Duke-AERO-Team/duke-aero-website), kept
as a separate repo/deploy since this is a small, single-page site with its own
domain.

## Development

You must have `nodejs` and `pnpm` installed.

1. Install dependencies with `pnpm install`
2. Run the development server with `pnpm dev`

In your web browser, head to `localhost:4321`.

Astro is quite simple: before the `---` separator is pure JavaScript, and below
it is HTML that gets rendered. Reference JS variables in markup with
`{js_var_here}`. Site assets live in `src/assets` and are optimized
automatically at build time.

## Before this goes live

- Register `lpd.dukerocketry.com` with whoever admins the Plausible instance at
  `stats.derock.dev` and drop the resulting analytics `<script>` snippet into
  `src/layouts/Layout.astro` (marked with a `TODO`).
- Decide whether to keep the shared Duke AERO favicon/logo or use a dedicated
  LPD mark.
- Confirm the "SUBTEAM 08 / DUKE AERO" hero eyebrow line — swap in a founding
  date if the team wants one instead.
