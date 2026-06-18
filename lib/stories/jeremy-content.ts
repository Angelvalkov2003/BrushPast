/** Hand-coded copy for /stories/jeremy — A fish named Jeremy */

export type JeremyParagraph = {
  text: string;
  emphasis?: boolean;
  pull?: boolean;
  highlight?: string;
};

export type JeremyColumn = {
  paragraphs: JeremyParagraph[];
};

export const JEREMY_STORY = {
  slug: "jeremy",
  title: "Jeremy",
  subtitle: "A fish named Jeremy",
  fullName: "Jeremy Knight",
  tags: "Writing. Recovery. Collaboration.",
  heroQuote:
    "There's a fish swimming in a tank at Ohio State Prison with my name on it.",
  heroQuoteHighlight: "my name on it",
  heroImage: "/stories/Jeremy/1.webp",
  storyIntro:
    "Ohio State Prison was never on the map — until hope showed up behind glass, with my name on the label.",
  storyColumns: [
    {
      paragraphs: [
        {
          text: "Ohio State Prison: not a place I ever imagined being connected to. Yet, there's a fish swimming in a tank there with my name on it.",
          pull: true,
          highlight: "my name on it",
        },
        {
          text: "For years, I was a master of disguise, hiding an addiction that whispered, 'You're not good enough.'",
        },
        {
          text: "Success felt like a borrowed suit, always waiting to be taken back.",
          emphasis: true,
        },
        {
          text: "Rock bottom? I knew it well, but then I discovered there was a basement.",
          pull: true,
          highlight: "basement",
        },
      ],
    },
    {
      paragraphs: [
        {
          text: "Recovery has been a stumble forward, a messy, imperfect journey.",
        },
        {
          text: "It's about facing the truth, not just about addiction, but about myself.",
          emphasis: true,
        },
        {
          text: "Now, I'm collaborating with people inside, sharing stories through art, reaching across walls and water.",
          pull: true,
          highlight: "walls and water",
        },
        {
          text: "The fish? They're a symbol of something unexpected, a reminder that hope can swim in the unlikeliest of places.",
          emphasis: true,
          highlight: "hope can swim",
        },
        {
          text: "So, pause with your coffee, and remember, we're all just trying to find our way.",
          highlight: "find our way",
        },
      ],
    },
  ] satisfies JeremyColumn[],
  fishTank: {
    title: "The fish",
    paragraphs: [
      "A name on a tank in Ohio — unexpected, almost absurd — and yet exactly the kind of symbol recovery keeps offering when you stop looking away.",
      "Collaboration across prison walls, art that travels further than words alone, and the quiet reminder that connection can surface anywhere.",
    ],
    quote: "Hope can swim in the unlikeliest of places.",
  },
  notebookQuote:
    "Pause with your coffee, and remember — we're all just trying to find our way.",
  closingQuote: "We're all just trying to find our way.",
} as const;
