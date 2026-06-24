/** Hand-coded copy for /stories/jamie */

export type JamieParagraph = {
  text: string;
  emphasis?: boolean;
  pull?: boolean;
  highlight?: string;
};

export type JamieColumn = {
  paragraphs: JamieParagraph[];
};

export const JAMIE_STORY = {
  slug: "jamie",
  title: "Jamie",
  tags: "Recovery. Hope. Community.",
  heroQuote:
    "This is not a sob story. I consider myself to be one of the very fortunate ones.",
  heroQuoteHighlight: "fortunate ones",
  heroImage: "/stories/JAMIE/1.png",
  storyIntro: "Ten years clean - a survivor story told in his own words.",
  storyColumns: [
    {
      paragraphs: [
        {
          text: "Both my parents were drug addicts and are dead as a result of that. I was placed in care young. It was bad, and a vulnerable kid popped out damaged.",
        },
        {
          text: "Then, I was long term fostered by great people, but in my family, you just 'got on with it'. And, by Lord! I had no idea how to do that.",
          pull: true,
        },
        {
          text: "At 11, I found drink and drugs, and everything changed.",
          emphasis: true,
          highlight: "everything changed",
        },
      ],
    },
    {
      paragraphs: [
        {
          text: "The thing about mind altering substances for a person like me is they offer a wonderful sense of 'I've arrived, I've got it now': passion, purpose, focus and the pain I was carrying disappeared which is incredibly intoxicating when all I'd felt was lost and hurt.",
        },
        {
          text: "Problem is, it's a veneer.",
          pull: true,
        },
        {
          text: "All the while, underneath, it's mining into the pain, my worth, shame, disconnection, and increasing my sense of emptiness. When my mind collapsed, I fell long and hard.",
        },
        {
          text: "The only thing I could see that gave me relief was more drugs.",
          emphasis: true,
        },
        {
          text: "Like I say, I was lucky that help was available when I was finally ready to accept it.",
          highlight: "lucky",
        },
        {
          text: "I'm 10 years clean now. My life continues to grow, as do I.",
          emphasis: true,
          highlight: "10 years clean",
        },
      ],
    },
    {
      paragraphs: [
        {
          text: "Trying to help others like me, the fallen, is important, which is why I've written this.",
        },
        {
          text: "If you can hold your hand out in some small way so when another fallen person reaches out, we are there to help.",
          pull: true,
          highlight: "hold your hand out",
        },
        {
          text: "The more recovering people there are in society, the better it is for all of us.",
          emphasis: true,
        },
      ],
    },
  ] satisfies JamieColumn[],
  reachingBack: {
    title: "A hand reaching back",
    paragraphs: [
      "Recovery taught me that survival isn't the finish line. The real work is what you do with the second chance - how you show up for the next person who thinks they're out of options.",
      "Mind-altering substances offered a veneer - passion, purpose, focus - while underneath they mined shame, disconnection and emptiness.",
      "When help was finally there and I was ready to accept it, everything could begin again.",
    ],
    quote: "The fallen need someone to reach back.",
  },
  notebookQuote:
    "I'm 10 years clean now. My life continues to grow, as do I.",
  closingQuote:
    "The more recovering people there are in society, the better it is for all of us.",
} as const;
