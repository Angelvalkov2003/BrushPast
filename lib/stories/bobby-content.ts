/** Hand-coded copy for /stories/bobby — Steel Door Studios */

const BASE = "/stories/bobby";

export type BobbyFragment = {
  title: string;
  quote: string;
};

export const BOBBY_STORY = {
  slug: "bobby",
  title: "Bobby",
  headline: "Bobby",
  subtitle: "My story",
  heroQuote:
    "I don't see myself as the product of my crime. I see myself as the product of my creativity.",
  heroQuoteHighlight: "creativity",
  tags: ["Writing", "Painting", "Survival", "Creativity"],
  /** Unique images from /public/stories/bobby — each used once */
  images: {
    hero: `${BASE}/hero.jpg`,
    mohawk: `${BASE}/mohawk.jpg`,
    humanBeans: `${BASE}/human-beans.jpg`,
    systema: `${BASE}/systema.jpg`,
  },
  heroImage: `${BASE}/hero.jpg`,
  introPullQuote: "The first artwork I ever really looked at got me into trouble.",
  introBody: [
    "The first artwork I ever really looked at got me into trouble. I was in an institution and came across a book on Salvador Dalí—melting clocks, impossible rooms, a world that didn't obey the rules I'd been given.",
    "I didn't know it was art history. I just knew something in me responded. Looking became dangerous. Observing became survival. The staff noticed before I did.",
    "That moment started a lifelong argument between who they said I was and who I could become with a brush in my hand.",
  ],
  inHisWords: {
    title: "In his words",
    quote:
      "Being encased within steel and mortar shouldn't alter the human condition.",
    paragraphs: [
      "I grew up on an estate where silence was safer than hope.",
      "Art became the one place I could tell the truth without apologising—bold colour over pain, humour over shame.",
    ],
  },
  aboutArtwork: {
    title: "About the artwork",
    paragraphs: [
      "From portraits that hold a cell inside the skull, to cans labelled Human Beans, to Justice chained beside a broken system—Bobby paints what confinement does to people, and what creativity can still unlock.",
      "Steel Door Studios is where that work lives: honest, sharp, and unwilling to look away.",
    ],
  },
  fragments: {
    title: "Fragments",
    items: [
      {
        title: "Part",
        quote:
          "We all play our part. It's up to you whether it's constructive or destructive.",
      },
      {
        title: "Condition",
        quote:
          "Being encased within steel and mortar shouldn't alter the human condition.",
      },
      {
        title: "Survival",
        quote: "Looking became dangerous. Observing became survival.",
      },
      {
        title: "Creativity",
        quote: "I see myself as the product of my creativity.",
      },
    ] satisfies BobbyFragment[],
  },
  closingQuote:
    "I don't see myself as the product of my crime. I see myself as the product of my creativity.",
  cta: {
    left: "Every story shared creates",
    highlight: "connection",
    right: "and opportunity.",
    aside: "Stories create understanding. Creativity creates possibility.",
    button: "Get in touch",
    href: "/contact#contact-form",
  },
} as const;
