import type { ImageMetadata } from "astro";

import type { Member } from "./team";

// Card crops (dark, cropped, meant to sit under a scrim) and full plates (lighter,
// uncropped, meant to be read) are separate images from the same sources — a
// background and a figure want opposite treatments.
import cardChamber from "../assets/card-chamber.webp";
import cardFluids from "../assets/card-fluids.webp";
import cardControls from "../assets/card-controls.webp";
import plateChamber from "../assets/plate-chamber.webp";
import plateFluids from "../assets/plate-fluids.webp";
import plateControls from "../assets/plate-controls.webp";

export interface Subteam {
  slug: string;
  index: string;
  name: string;
  /** One line, used on the About card. */
  summary: string;
  /** What the subteam actually owns, used at the top of its own page. */
  detail: string;
  /**
   * Everyone on the subteam, first entry first: that one is the lead, and both
   * the subteam page and /team read it from position 0 rather than from a
   * separate field, so there is only ever one place a lead is named.
   */
  members: Member[];
  card: ImageMetadata;
  cardAlt: string;
  plate: ImageMetadata;
  plateAlt: string;
  plateCaption: string;
  /** Read off the team's own drawings — nothing here is estimated. */
  specs: { label: string; value: string }[];
}

export const subteams: Subteam[] = [
  {
    slug: "combustion",
    index: "01",
    name: "Combustion Devices",
    summary:
      "Injector, chamber, and igniter design — turning propellant flow into thrust.",
    detail:
      "Combustion Devices owns everything between the injector face and the nozzle exit: how propellant is atomised and mixed, how the chamber survives what happens next, and how that gas is accelerated into thrust.",
    members: [
      { name: "Archer White", study: "MechE/Aero '29", photo: "archer-white" },
    ],
    card: cardChamber,
    cardAlt:
      "Cross-section of the engine: converging-diverging nozzle and chamber liner.",
    plate: plateChamber,
    plateAlt:
      "Engine cross-section showing the bolted outer jacket, chamber liner, throat, and nozzle.",
    plateCaption:
      "Engine cross-section: a bolted outer jacket carries the chamber liner, converging to the throat and expanding through the nozzle.",
    specs: [
      { label: "Owns", value: "Injector, chamber, igniter" },
      { label: "Nozzle", value: "Converging–diverging" },
      { label: "Assembly", value: "Bolted jacket and liner" },
    ],
  },
  {
    slug: "fluids",
    index: "02",
    name: "Fluid Systems",
    summary:
      "Propellant feed, pressurization, and plumbing that get kerosene and N2O to the chamber safely.",
    detail:
      "Fluid Systems owns the path from tank to injector: pressurisation, propellant routing, and the valves and interlocks that make a test sequence safe to run and, more importantly, safe to abort.",
    members: [
      {
        name: "Ethan Rosenfeld",
        study: "MechE/Physics '29",
        photo: "ethan-rosenfeld",
      },
    ],
    card: cardFluids,
    cardAlt:
      "Piping and instrumentation diagram showing propellant tanks, servo ball valves, and check valves.",
    plate: plateFluids,
    plateAlt:
      "Full piping and instrumentation diagram of the propellant feed system, with tanks, valves, regulators, and a legend.",
    plateCaption:
      "Piping and instrumentation diagram for the 26/27 system — fuel, oxidiser, and nitrogen pressurant, routed through servo ball valves, check valves, and regulators.",
    specs: [
      { label: "Actuation", value: "Servo and 3-way ball valves" },
      {
        label: "Instrumentation",
        value: "Pressure transducers, thermocouples",
      },
      { label: "Line sizes", value: '1/4", 1/2", 3/4"' },
    ],
  },
  {
    slug: "controls",
    index: "03",
    name: "Electrical & Controls",
    summary:
      "The in-house control board and software that arm, sequence, and monitor every test.",
    detail:
      "Electrical & Controls owns the board and the software that arm, sequence, and log a test. Every valve command and every reading passes through hardware the team laid out itself.",
    members: [
      { name: "Michael Danley", study: "ECE, CS '29", photo: "michael-danley" },
    ],
    card: cardControls,
    cardAlt:
      "Layout of the in-house liquid propulsion control board, showing the servo bus and pressure-transducer interface.",
    plate: plateControls,
    plateAlt:
      "Full board layout of the Liquid Propulsion Control Board V1.0, showing the twelve-channel pressure-transducer interface and eight-channel servo bus.",
    plateCaption:
      "Liquid Propulsion Control Board V1.0 — a twelve-channel pressure-transducer interface, an eight-channel servo bus, and the trigger lines that sequence a firing.",
    specs: [
      { label: "Servo bus", value: "8 channels" },
      { label: "PT interface", value: "12 channels" },
      { label: "Acquisition", value: "3 × 8-channel ADC" },
    ],
  },
];
