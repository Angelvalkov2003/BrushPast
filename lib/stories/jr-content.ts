/** Hand-coded copy for /stories/jr — artist story */

const BASE = "/stories/jr";

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
  heroQuote: "I painted the word LOVE because I needed something to hold onto.",
  heroQuoteHighlight: "LOVE",
  location: "London",
  year: "2023",
  organisation: "London Coffee Factory",
  /** Unique images from /public/stories/jr — each used once */
  images: {
    hero: `${BASE}/hero.jpg`,
    study: `${BASE}/study-blue.jpg`,
    forest: `${BASE}/forest.jpg`,
    windows: `${BASE}/windows.jpg`,
    dog: `${BASE}/dog.jpg`,
  },
  heroImage: `${BASE}/hero.jpg`,
  myStory: {
    title: "My story",
    lines: [
      {
        text: "This painting meant so much during a time of despair for me.",
      },
      { text: "I had been through court fighting for access to my son." },
      { text: "I soon lost contact again." },
      {
        text: "I had to do something to distract my mind and focus one step at a time.",
        emphasis: true,
      },
      {
        text: "I painted the word LOVE as a reminder—why it hurts, why it was worth the fight, and why I had to go on.",
        highlight: "LOVE",
      },
    ] satisfies JrStoryLine[],
  },
  makingForward: {
    title: "Making became part of moving forward",
    paragraphs: [
      "What began as something to focus my mind became something much bigger.",
      "I kept drawing. I kept experimenting—dogs, music, street art, graphic work, and painting. Sometimes detailed, sometimes loose, and sometimes simply an idea I wanted to get onto paper.",
      "There isn't one style. That's part of it.",
      "Creating gives me somewhere to put what I'm feeling. It keeps my mind occupied, gives me something to work towards, and reminds me that I can still make something positive.",
    ],
  },
  aboutTheArtwork: {
    title: "About the artwork",
    paragraphs: [
      "The LOVE painting is a reminder—why it hurts, why it was worth the fight, and why I had to go on.",
      "The sketches alongside it—dogs, music, street art, graphic work—are how I practise staying present.",
    ],
  },
  fragments: {
    title: "Fragments",
    items: [
      {
        title: "Love",
        quote:
          "I painted the word LOVE because I needed something to hold onto.",
      },
      {
        title: "One step",
        quote: "Focus one step at a time.",
      },
      {
        title: "Making",
        quote: "Making became part of moving forward.",
      },
      {
        title: "Present",
        quote: "I paint to stay present. Art helps me keep showing up.",
      },
    ] satisfies JrFragment[],
  },
  closingQuote: "I paint to stay present. Art helps me keep showing up.",
} as const;
