/** Hand-coded copy for /stories/jr - artist story layout */

export type JrStoryLine = {
  text: string;
  emphasis?: boolean;
  highlight?: string;
};

export type JrFragment = {
  title: string;
  quote: string;
};

export const JR_STORY = {
  slug: "jr",
  title: "JR",
  artistHeadline: "JR",
  heroQuote: "I painted the word love because I needed something to hold onto.",
  heroQuoteHighlight: "love",
  location: "London",
  year: "2023",
  organisation: "London Coffee Factory",
  heroImage: "/jr.png",
  myStory: {
    title: "My story",
    lines: [
      { text: "This painting meant so much in the time of despair for me." },
      { text: "I had been through court fighting for access to my son." },
      { text: "I soon lost contact again." },
      { text: "This destroyed my world - leading to suicidal thoughts.", emphasis: true },
      { text: "I had to do something to distract my mind." },
      { text: "Focus one step at a time.", emphasis: true },
      { text: "I painted the word 'love' as a reminder.", highlight: "love" },
      { text: "Why it hurts. Why it was worth the fight." },
      { text: "I had to go on." },
    ] satisfies JrStoryLine[],
  },
  inMyWords: {
    title: "In my words",
    paragraphs: [
      "Court took everything I thought I had left. Losing contact with my son again broke me in ways I still struggle to name. Some days the only thing between me and giving up was finding one small task I could finish.",
      "Painting became that task. Not a grand project - just a word, one letter at a time, until the canvas said something I could read back to myself when the room went quiet.",
      "Having gone to court a second time, I won my case against adversity. That word on the canvas gave me the drive and strength I needed to keep showing up - for my son, for myself, for the next ordinary day.",
    ],
  },
  aboutTheArtwork: {
    title: "About the artwork",
    paragraphs: [
      "The love painting is raw on purpose - black and white ground, red and yellow pushed into the letters like they were scraped out of feeling rather than planned.",
      "It is not decoration. It is a lifeline I made when language failed. Every mark is a step I took when I could not see the next one.",
      "The sketches alongside it - dogs, faces, small studies - are how I practise staying present. Art helps me keep showing up.",
    ],
  },
  gallery: {
    main: "/jr.png",
    grid: [
      "/stories/jr/hero.jpg",
      "/stories/jr/hero.jpg",
      "/stories/jr/hero.jpg",
      "/stories/jr/hero.jpg",
      "/stories/jr/hero.jpg",
      "/stories/jr/hero.jpg",
    ],
    portrait: "/stories/jr/hero.jpg",
    portraitCaption: "Reiley Love Dad",
  },
  fragments: {
    title: "Fragments",
    items: [
      {
        title: "Love",
        quote: "I painted the word love because I needed something to hold onto.",
      },
      {
        title: "One day",
        quote: "Focus one step at a time - that was all I could manage.",
      },
      {
        title: "Art",
        quote: "Making something with my hands kept the darkness from swallowing me whole.",
      },
      {
        title: "Reiley",
        quote: "Every stroke was for my son - a reminder of why the fight mattered.",
      },
    ] satisfies JrFragment[],
  },
  closingQuote: "I paint to stay present. Art helps me keep showing up.",
} as const;
