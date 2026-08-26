// The people on the division. Rosters live here rather than being repeated per
// page: `subteams.ts` gives each subteam its `members` array (typed by `Member`
// below, first entry is that subteam's lead) and this file holds the one person
// who sits above all three.
//
// Headshots are resolved by filename in `pages/team.astro` rather than imported
// here, so adding a member is a name, a study line, and a dropped .webp — no
// import to wire up. Same four people and the same wording as the main Duke
// AERO site's roster (`../duke-aero-website/src/data/team.ts`); the two repos
// share no package, so a change there has to be carried over by hand.

export interface Member {
  name: string;
  /** Major and class year, e.g. "MechE/Aero '29" — matches the main site's format. */
  study: string;
  /** Filename in src/assets/team/, without the extension. */
  photo: string;
}

/** Runs the division; sits above the three subteams rather than inside one. */
export const divisionLead: Member & { role: string } = {
  role: "Division Lead",
  name: "Jack Do",
  study: "MechE/Aero '28",
  photo: "jack-do",
};
