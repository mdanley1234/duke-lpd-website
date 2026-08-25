// Multi-year engine projects, ordered oldest first so reading down the page is
// reading forward in time. Same local-array approach as `subteams.ts` — two
// entries doesn't earn a content collection.
//
// The two projects are a lineage, not a list: Eno's cold flow data is what
// Prometheus is designed from, which is why `outcome` exists as a field. A past
// project's result is the reason the next one looks the way it does.
//
// TODO(content): still outstanding from the team —
//   1. Real year ranges for both projects. Nothing here should guess a date.
//   2. Workstream names and one-line summaries for both projects.
//   3. Narrative write-ups for the /projects/eno and /projects/prometheus MDX
//      pages (src/pages/projects/*.mdx) — currently placeholder prose marked
//      TODO(content) in those files.

import type { ImageMetadata } from "astro";
import enoCover from "../assets/projects/eno/assembled-clamshell-engine.webp";
import enoCnc from "../assets/projects/eno/clamshell-half-in-the-cnc.webp";
import enoOpened from "../assets/projects/eno/clamshell-halves-opened.webp";
import enoInspecting from "../assets/projects/eno/inspecting-the-clamshell-halves.webp";
import enoContour from "../assets/projects/eno/machined-clamshell-contour.webp";
import prometheusCover from "../assets/projects/prometheus/regen-chamber-upright.webp";
import prometheusCutting from "../assets/projects/prometheus/cutting-regen-cooling-channels.webp";
import prometheusChannels from "../assets/projects/prometheus/regen-chamber-cooling-channels.webp";

export interface Workstream {
  index: string;
  name: string;
  /** One line. Kept short — these are scanned, not read. */
  summary: string;
  /**
   * Future per-subsystem page. Undefined renders the row as plain text rather
   * than a dead link — nothing routes off this yet.
   */
  href?: string;
}

export interface GalleryPhoto {
  src: ImageMetadata;
  /** Descriptive, not decorative — these carry real information on the detail page. */
  alt: string;
  caption: string;
}

export interface Project {
  /** Used for /projects/[slug]-style routing and to key the detail page's MDX file to its data row. */
  slug: string;
  name: string;
  /**
   * Card face on /projects. Imported rather than globbed: PhotoWall's drop-folder
   * glob suits an unordered wall, but a cover is a deliberate pick per project.
   */
  cover: ImageMetadata;
  /** One line under the name on the card. Shorter than `objective`. */
  tagline: string;
  /** Free-form string with an en dash, matching duke-aero-website's `years`. */
  years: string;
  /** Drives styling only; the label below carries the meaning. */
  status: "active" | "past";
  /** Explicit rather than derived, so the wording stays under the team's control. */
  statusLabel: string;
  /** What the project set out to do. */
  objective: string;
  /** Why a past project ended, and what it handed forward. Absent while active. */
  outcome?: string;
  workstreams: Workstream[];
  /**
   * Build/process photography shown on the project's detail page. Explicit
   * imports, same reasoning as `cover` — a small deliberate set, not a glob.
   */
  gallery: GalleryPhoto[];
  /** `/projects/${slug}`. Undefined leaves the card face inert (renders a
   * `<div>` rather than a dead link) for any future project without a
   * detail page yet. */
  detailHref?: string;
}

const TODO_SUMMARY =
  "TODO — one line describing this workstream. Replace before publishing.";

export const projects: Project[] = [
  {
    slug: "eno",
    name: "Project Eno",
    cover: enoCover,
    tagline: "The clamshell engine, and the cold flow campaign that ended it.",
    years: "20XX–20XX",
    status: "past",
    statusLabel: "Superseded",
    objective:
      "Take a clamshell-architecture engine from design through to a hot fire.",
    outcome:
      "Cold flow testing exposed too many problems with the clamshell design — among other issues — to carry it forward. The team redrafted rather than patched it, and Eno's test data became the foundation Prometheus is designed from.",
    workstreams: [
      { index: "01", name: "TODO — workstream name", summary: TODO_SUMMARY },
      { index: "02", name: "TODO — workstream name", summary: TODO_SUMMARY },
      { index: "03", name: "TODO — workstream name", summary: TODO_SUMMARY },
    ],
    gallery: [
      {
        src: enoCnc,
        alt: "One half of the clamshell engine held in a CNC mill, mid-machining.",
        caption: "Machining a clamshell half.",
      },
      {
        src: enoContour,
        alt: "Close-up of the machined internal contour of a clamshell engine half.",
        caption: "The machined internal contour, before assembly.",
      },
      {
        src: enoInspecting,
        alt: "Team members inspecting the two opened clamshell halves.",
        caption: "Inspecting the clamshell halves.",
      },
      {
        src: enoOpened,
        alt: "The two clamshell halves opened and laid side by side.",
        caption: "The clamshell halves, opened.",
      },
    ],
    detailHref: "/projects/eno",
  },
  {
    slug: "prometheus",
    name: "Project Prometheus",
    cover: prometheusCover,
    tagline: "A regeneratively cooled clean-sheet redesign, aimed at hot fire.",
    years: "20XX–present",
    status: "active",
    statusLabel: "Active",
    objective:
      "A clean-sheet redesign built on what Eno measured, aimed at getting from drawing to hot-fire test vehicle in as little time as possible.",
    workstreams: [
      { index: "01", name: "TODO — workstream name", summary: TODO_SUMMARY },
      { index: "02", name: "TODO — workstream name", summary: TODO_SUMMARY },
      { index: "03", name: "TODO — workstream name", summary: TODO_SUMMARY },
    ],
    gallery: [
      {
        src: prometheusCutting,
        alt: "A regeneratively cooled chamber on a mill, mid-cut, with coolant channels visible along its wall.",
        caption: "Cutting the regenerative cooling channels.",
      },
      {
        src: prometheusChannels,
        alt: "Close-up of the finished regenerative cooling channels machined into the chamber wall.",
        caption: "The finished cooling channels, before jacketing.",
      },
    ],
    detailHref: "/projects/prometheus",
  },
];
