/** Hand-coded copy for /stories/little-george - Little George's Story */

export type LittleGeorgeParagraph = {
  text: string;
  emphasis?: boolean;
  pull?: boolean;
  highlight?: string;
};

export type LittleGeorgeColumn = {
  paragraphs: LittleGeorgeParagraph[];
};

export const LITTLE_GEORGE_STORY = {
  slug: "little-george",
  title: "Little George",
  subtitle: "Little George's Story",
  tags: "Writing. Recovery. Hope.",
  heroQuote:
    "There were days - which were most days - when rising to the morning and the daylight was a daunting experience.",
  heroQuoteHighlight: "daunting experience",
  heroImage: "/stories/littleGeorge/1.webp",
  storyIntro:
    "From wishing you had not woken up, to a glimpse of light away from the darkness of addiction.",
  storyColumns: [
    {
      paragraphs: [
        {
          text: "There were days, which were most days when rising to the morning and the daylight was a daunting experience.",
          pull: true,
          highlight: "daunting experience",
        },
        {
          text: "The only certainty was that it was going to be the same as rest of the enumerable days wishing that you hadn't woken up and that you were still oblivious to the new day.",
        },
        {
          text: "Eventually you realise the darkness of the night has given way to the light of day and you are part of it, as much as you wish you were not.",
          emphasis: true,
          highlight: "light of day",
        },
      ],
    },
    {
      paragraphs: [
        {
          text: "You play your mundane part which is usually the same script of feeding the addiction trying to cover up that darkness of your existence coping with the day.",
          pull: true,
          highlight: "darkness of your existence",
        },
        {
          text: "Until one day you wake up, you realise you no longer want to be in the darkness of your day and see a glimpse of light away from the darkness of addiction and that light brings recovery.",
          emphasis: true,
          highlight: "that light brings recovery",
        },
      ],
    },
  ] satisfies LittleGeorgeColumn[],
  dawn: {
    title: "The glimpse",
    paragraphs: [
      "Most days followed the same script - feeding the addiction, covering the darkness, getting through until night returned.",
      "Recovery began not as a sudden fix, but as a refusal to stay in the dark - a willingness to notice light, even when it felt far away.",
    ],
    quote: "That light brings recovery.",
  },
  notebookQuote:
    "You no longer want to be in the darkness of your day - and you see a glimpse of light.",
  closingQuote: "That light brings recovery.",
} as const;
