/**
 * Seivio brand configuration — the single source of truth for the
 * product name, palette and credits.
 *
 * Anything user-visible that names the product in code (metadata,
 * logo, auth screens, sidebar, credits) reads from here, so a future
 * rename is a one-file change. UI copy that lives in the i18n
 * catalogues (`messages/*.json`) spells the name out literally —
 * search for "Seivio" there when renaming.
 */

export interface BrandCreator {
  name: string;
  github: string;
  handle: string;
}

export const BRAND = {
  name: "Seivio",
  tagline: "The WhatsApp CRM for teams that care about every conversation.",
  description:
    "Seivio is a WhatsApp CRM — shared inbox, contacts, sales pipelines, broadcasts, automations and an AI reply assistant on the official WhatsApp Business API.",
  repoUrl: "https://github.com/prasannab4362/wacrm",

  /**
   * Brand palette. Burgundy is the primary, cream the light surface,
   * dusty pink the soft accent. The CSS tokens in `globals.css`
   * (`html[data-theme="seivio"]` + the MODE blocks) mirror these.
   */
  colors: {
    burgundy: "#7B1E3A",
    burgundyDeep: "#561127",
    burgundyBright: "#B23A5A",
    cream: "#F7F0E6",
    creamSoft: "#FFFBF5",
    dustyPink: "#D8A7B1",
    dustyPinkSoft: "#EED5DA",
  },

  /** Designers of Seivio — shown as "Designed by Pranash & Prasanna B". */
  creators: [
    {
      name: "Pranash",
      github: "https://github.com/PRANASH-R",
      handle: "PRANASH-R",
    },
    {
      name: "Prasanna B",
      github: "https://github.com/prasannab4362",
      handle: "prasannab4362",
    },
  ] as const satisfies readonly BrandCreator[],

  /** Open-source project Seivio is based on (MIT). Credited in the UI. */
  basedOn: {
    name: "wacrm",
    url: "https://github.com/ArnasDon/wacrm",
    author: "Arnas Donauskas",
  },
} as const;
