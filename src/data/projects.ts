// Multi-year engine projects, ordered oldest first so reading down the page is
// reading forward in time. Same local-array approach as `subteams.ts` — two
// entries doesn't earn a content collection.
//
// The two projects are a lineage, not a list: Eno's cold flow data is what
// Prometheus is designed from, which is why `outcome` exists as a field. A past
// project's result is the reason the next one looks the way it does.
//
// TODO(content): still outstanding from the team —
//   1. Narrative write-ups for the /projects/eno and /projects/prometheus MDX
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
  /**
   * Alt text for `cover`. Needed because the homepage timeline stands the
   * cover on its own; ProjectCard leaves it `alt=""` since there the image
   * sits inside a link the project name already names.
   */
  coverAlt: string;
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

export const projects: Project[] = [
  {
    slug: "eno",
    name: "Project Eno",
    cover: enoCover,
    coverAlt:
      "The assembled clamshell engine resting on a workbench, bolt holes running the length of the flange where its two machined halves meet.",
    tagline: "The clamshell engine, and the cold flow campaign that ended it.",
    years: "2023–2026",
    status: "past",
    statusLabel: "Concluded",
    objective:
      "Take a clamshell-architecture engine from design through to a hot fire.",
    outcome:
      "Cold flow testing exposed too many problems with the clamshell design — among other issues — to carry it forward. The team redrafted rather than patched it, and Eno's test data became the foundation Prometheus is designed from.",
    workstreams: [
      {
        index: "01",
        name: "Engine Control & Measurement Electronics",
        summary:
          "A chamber-pressure tap routed through the injector centerline, plus the sensors and wiring that read it during cold flow.",
      },
      {
        index: "02",
        name: "Tanks & Feed System",
        summary:
          "Nitrogen-pressurized kerosene and N2O tanks, run pressure-fed rather than pump-fed to keep the system simple.",
      },
      {
        index: "03",
        name: "Engine Design",
        summary:
          "The regeneratively cooled clamshell chamber and cone injector, atomizing kerosene and N2O by collision at the injector face.",
      },
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
    coverAlt:
      "The regeneratively cooled chamber standing upright on a workbench, cooling channels running the full length of its outer wall.",
    tagline: "A regeneratively cooled clean-sheet redesign, aimed at hot fire.",
    years: "2026–present",
    status: "active",
    statusLabel: "Active",
    objective:
      "A clean-sheet redesign built on what Eno measured, aimed at getting from drawing to hot-fire test vehicle in as little time as possible.",
    workstreams: [
      {
        index: "01",
        name: "Engine Core",
        summary:
          "The regeneratively cooled chamber and injector that mix and burn propellant to produce thrust.",
      },
      {
        index: "02",
        name: "Electropump",
        summary:
          "An electrically driven pump, plus the motor and controller that run it, feeding propellant to the engine at high pressure.",
      },
      {
        index: "03",
        name: "Flight Tanks & Feed System",
        summary:
          "The tanks that carry propellant in flight and the plumbing that routes it from tank to engine.",
      },
      {
        index: "04",
        name: "Ground System",
        summary:
          "The igniter, propellant fill system, and test stand/deluge that support ground testing and launch.",
      },
      {
        index: "05",
        name: "Controller & Active Pressurization",
        summary:
          "The master controller that sequences a firing, and the pressurization valves and power that hold tank pressure in range.",
      },
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
