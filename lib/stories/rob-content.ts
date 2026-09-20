/** Hand-coded copy for /stories/rob - Glitch + Rob's story */

export type RobPoemLine = {
  text: string;
  emphasis?: boolean;
  highlight?: string;
  pull?: boolean;
};

export type RobPoemStanza = {
  lines: RobPoemLine[];
};

export type RobParagraph = {
  text: string;
  emphasis?: boolean;
  pull?: boolean;
  highlight?: string;
};

export type RobColumn = {
  paragraphs: RobParagraph[];
};

export const ROB_STORY = {
  slug: "rob",
  title: "Rob",
  poemTitle: "Glitch",
  credits: {
    words: "Words by Rob",
    photography: "Photography by Sam",
  },
  tags: "Writing. Art. Recovery.",
  heroQuote: "I am just a glitch in your perfect system.",
  heroQuoteHighlight: "glitch",
  heroImage: "/stories/ROB'S-POEM/1.png",
  artworkCaption: "Artwork by Rob",
  poemIntro: '"There has been a…"',
  poemStanzas: [
    {
      lines: [
        { text: "As I lie in a ditch. A bitch. A parasite" },
        { text: "A whore of society to challenge your sobriety" },
        { text: "A sore to be scratched off like an itch" },
        { text: "Just a glitch", emphasis: true, highlight: "glitch" },
        { text: "Human scum. A man on the run" },
        { text: "A druggy, a drunkard, an explosive gun..." },
        { text: "Or perhaps I am none - of these!" },
        { text: "I beg for reprieve as I cough and splutter" },
        { text: "in my gutter and wheeze" },
      ],
    },
    {
      lines: [
        { text: "A glitch in the system", highlight: "glitch" },
        { text: "Through my own ill-gotten reasons" },
        { text: "Treasons to the sanctuary of my heart" },
        { text: "As I lie here" },
        { text: "Often cold, tormented and torn apart" },
        { text: "And no, I'm not whole as I lie in my hole" },
        { text: "A sometimes lonely, downtrodden" },
        { text: "And broken soul", emphasis: true },
      ],
    },
    {
      lines: [
        { text: "I know" },
        { text: "You say you see me" },
        { text: "But really" },
        { text: "You just look" },
        { text: "Right through me", pull: true, highlight: "through me" },
        { text: "I am sure I exist" },
        { text: "But to you" },
        { text: "I am just a glitch", highlight: "glitch" },
        { text: "A glitch" },
        { text: "In your perfect system", emphasis: true },
      ],
    },
  ] satisfies RobPoemStanza[],
  storyHeading: "Rob's story",
  storyIntro:
    "Homelessness is devastating—mentally, emotionally, and physically.",
  storyColumns: [
    {
      paragraphs: [
        {
          text: "Homelessness is devastating—mentally, emotionally, and physically. It impacts your whole world: your relationships, prospects, health, self-esteem, confidence, and ability to provide for yourself and the people you care for.",
          emphasis: true,
        },
        {
          text: "Having experienced homelessness on and off for the last 16 years, I consider myself very lucky to be alive.",
          pull: true,
          highlight: "lucky to be alive",
        },
        {
          text: "By the grace of God, good people, and my tenacity to overcome obstacles, I am still here—although barely.",
        },
      ],
    },
  ] satisfies RobColumn[],
  glitchNote: {
    title: "Glitch",
    quote: "I'm just a glitch in your perfect system.",
  },
  notebookQuote:
    "Having experienced homelessness on and off for the last 16 years, I consider myself very lucky to be alive.",
  closingQuote: "I'm just a glitch in your perfect system.",
} as const;
