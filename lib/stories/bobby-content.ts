/** Hand-coded copy for /stories/bobby - Steel Door Studios */

export type BobbyFragment = {
  title: string;
  quote: string;
};

export const BOBBY_STORY = {
  slug: "bobby",
  title: "Bobby",
  headline: "Bobby",
  subtitle: "Steel Door Studios",
  heroQuote:
    "I don't see myself as the product of my crime. I see myself as the product of my creativity.",
  tags: ["Writing", "Painting", "Survival", "Creativity"],
  heroImage: "/bobby.png",
  introPullQuote: "The first artwork I ever really looked at got me into trouble.",
  introBody: [
    "The first artwork I ever really looked at got me into trouble. I was in an institution and came across a book on Salvador Dalí - melting clocks, impossible rooms, a world that didn't obey the rules I'd been given.",
    "I didn't know it was art history. I just knew something in me responded. Looking became dangerous. Observing became survival. The staff noticed before I did.",
    "That moment started a lifelong argument between who they said I was and who I could become with a brush in my hand.",
  ],
  introArtwork: "/bobby.png",
  inHisWords: {
    quote:
      "Being encased within steel and mortar shouldn't alter the fundamental essence of a human being.",
    paragraphs: [
      "Grew up on an estate where silence was safer than hope. Art became the one place I could tell the truth without apologising - bold colour over pain, humour over shame.",
      "Years inside taught me to watch everything: the way light fell on a wall, the rhythm of a corridor, the small freedoms people invent when the big ones are gone. Painting was how I kept my name.",
      "Steel Door Studios is that practice made visible - work that refuses to whisper, even when the world prefers you quiet.",
    ],
  },
  fragments: {
    title: "Fragments",
    items: [
      { title: "Survival", quote: "Creativity became survival." },
      { title: "Companion", quote: "Art was my constant companion." },
      { title: "Observe", quote: "Isolation taught me to observe." },
      { title: "Voice", quote: "Paint gave me a voice." },
    ] satisfies BobbyFragment[],
  },
  cta: {
    left: "Every story shared creates",
    highlight: "connection",
    right: "and opportunity.",
    aside: "Stories create understanding. Creativity creates possibility.",
    button: "Get in touch",
    href: "/contact#contact-form",
  },
} as const;
