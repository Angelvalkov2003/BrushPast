/** Hand-coded copy for /stories/maimouna — Sleeping pills */

export type MaimounaLyricLine = {
  text: string;
  emphasis?: boolean;
  highlight?: string;
};

export type MaimounaSection = {
  label: string;
  lines: MaimounaLyricLine[];
};

export const MAIMOUNA_STORY = {
  slug: "maimouna",
  title: "Maimouna",
  artist: "@myteakultcha (Mighty Culture)",
  artistName: "Maimouna Camara",
  songTitle: "Sleeping pills",
  tags: "Writing. Music. Recovery.",
  heroQuote: "Sleeping pills offer a quick-and-easy fix",
  heroQuoteHighlight: "quick-and-easy fix",
  heroImage: "/stories/maimouna/1.webp",
  secondaryImage: "/stories/maimouna/2.webp",
  intro:
    "A song from Mighty Culture — written in the space between rest and unrest, pills and poetry.",
  sections: [
    {
      label: "Verse 1",
      lines: [
        { text: "Continual body contact provided by soft mattress" },
        { text: "But the lack of support can cause the neck and spine to sag" },
        { text: "The level of firmness should relate to your body weight" },
        { text: "The heavier you are, the firmer it should be" },
        { text: "Uninterrupted", emphasis: true },
      ],
    },
    {
      label: "Chorus",
      lines: [
        { text: "Sleeping pills offer a quick-and-easy fix", highlight: "quick-and-easy fix" },
        { text: "Temporary answers" },
        { text: "Many of them have side-effects" },
        { text: "Sleeping pills offer a quick-and-easy fix", highlight: "quick-and-easy fix" },
        { text: "Sleeping pills!", emphasis: true, highlight: "Sleeping pills!" },
      ],
    },
    {
      label: "Verse 2",
      lines: [
        { text: "I'm feeling well, I'm carefree" },
        { text: "I feel safe and relaxed" },
        { text: "I get up with caffeine or tobacco" },
        { text: "I make sure I'm reasonably cool" },
        { text: "I try to avoid upsetting activities" },
        { text: "My bedroom is kept exclusively" },
        {
          text: "For sleep and more specific aspects",
          emphasis: true,
          highlight: "sleep",
        },
      ],
    },
    {
      label: "Chorus",
      lines: [
        { text: "Sleeping pills offer a quick-and-easy fix", highlight: "quick-and-easy fix" },
        { text: "Temporary answers" },
        { text: "Many of them have side-effects" },
        { text: "Sleeping pills offer a quick-and-easy fix", highlight: "quick-and-easy fix" },
        { text: "Sleeping pills!", emphasis: true, highlight: "Sleeping pills!" },
      ],
    },
  ] satisfies MaimounaSection[],
  inspirationNote:
    '*Inspired by the book "Need to Know? Sleep" by Doctor Chris Idzikowski ISBN: 9780007202232',
  closingQuote: "Temporary answers — many of them have side-effects.",
} as const;
