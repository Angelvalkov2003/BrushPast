/** Hand-coded copy for /stories/david - The Rooms */

export type DavidParagraph = {
  text: string;
  emphasis?: boolean;
  pull?: boolean;
  highlight?: string;
};

export type DavidColumn = {
  paragraphs: DavidParagraph[];
};

export const DAVID_STORY = {
  slug: "david",
  title: "David",
  subtitle: "The Rooms",
  tags: "Writing. Recovery. Fellowship.",
  heroQuote:
    "As a child I was sent to my room, without a voice to reply, or knowing how to reply, to await my outcome.",
  heroQuoteHighlight: "await my outcome",
  heroImage: "/stories/david/1.webp",
  storyIntro:
    "From childhood bedrooms to prison cells to the Rooms of Recovery - each space shaped who I became.",
  storyColumns: [
    {
      paragraphs: [
        {
          text: "As a child I was sent to my room, without a voice to reply, or knowing how to reply, to await my outcome. Sometimes the outcome would be full of joy, other times, my outcome would be full of pain.",
          pull: true,
          highlight: "await my outcome",
        },
        {
          text: "As a teenager, as I battled with myself to scrape out an identity for myself, coming from a dysfunctional room (home), I was sent to many different rooms (cells!) by those who thought they knew what was best for me.",
        },
        {
          text: "Within those rooms (prison cells) I found & embraced a lifestyle that I would free me!",
          emphasis: true,
          highlight: "would free me",
        },
      ],
    },
    {
      paragraphs: [
        {
          text: "Infact, it caused me to spend many more years in/out of those same rooms (prison cells) & loose out on many of life's love & opportunities.",
          pull: true,
          highlight: "in/out",
        },
        {
          text: "To say I had a love/hate with a room would not be wrong.",
        },
        {
          text: "Today the hate is gone & the love is strong for I have found a set of rooms that allow me to be safe, fully free, & be me.",
          emphasis: true,
          highlight: "fully free",
        },
        {
          text: "The Rooms of Recovery & Fellowship have allowed me to embrace the shadows of my life & to finally have peace within.",
          highlight: "peace within",
        },
      ],
    },
  ] satisfies DavidColumn[],
  rooms: {
    title: "The Rooms",
    paragraphs: [
      "Childhood rooms where outcomes swung between joy and pain. Prison cells where a lifestyle promised freedom and delivered the opposite.",
      "Recovery rooms where the hate is gone, the love is strong, and shadows can finally be embraced.",
    ],
    quote: "Peace within.",
  },
  notebookQuote:
    "I have found a set of rooms that allow me to be safe, fully free, & be me.",
  closingQuote: "To finally have peace within.",
} as const;
