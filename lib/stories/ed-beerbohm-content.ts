/** Hand-coded copy for /stories/ed-beerbohm */

export type EdBeerbohmParagraph = {
  text: string;
  emphasis?: boolean;
  pull?: boolean;
  highlight?: string;
};

export type EdBeerbohmColumn = {
  paragraphs: EdBeerbohmParagraph[];
};

export const ED_BEERBOHM_STORY = {
  slug: "ed-beerbohm",
  title: "Ed Beerbohm",
  tags: "Art. Film. Recovery.",
  heroQuote: "My flat — my home — has itself become a canvas.",
  heroQuoteHighlight: "canvas",
  heroImage: "/stories/ED-BEERBOHM/1.jpg",
  galleryImages: [
    "/stories/ED-BEERBOHM/2.webp",
    "/stories/ED-BEERBOHM/3.webp",
  ],
  storyIntro:
    "Disability, isolation, and art that turns walls from barriers into alternative vistas.",
  storyColumns: [
    {
      paragraphs: [
        {
          text: "Fairly late on in my life, I was afflicted with a neurological condition which slowly but surely eroded my ability to move about. Walking — previously an automatic function that I didn't really think about — became perplexing, exhausting and painful.",
        },
        {
          text: "And so with disability and immobility I became increasingly confined to my flat and increasingly isolated.",
          pull: true,
          highlight: "isolated",
        },
      ],
    },
    {
      paragraphs: [
        {
          text: "Art also came to me late in life and it has proved to be a means by which I can escape the tyranny of isolation.",
          emphasis: true,
          highlight: "escape the tyranny of isolation",
        },
        {
          text: "Disability reconfigures space: For me, walls, doors and stairs have become more barrier-like, more excluding and distances have stretched out while the fabric of everyday life and my navigation of it has become more complex and challenging.",
        },
        {
          text: "But painting and film-making have helped me adapt to this spatial reconfiguration, providing a means of escape more literal than a flight of fancy.",
          pull: true,
        },
        {
          text: "By painting the walls, I can transform them from barriers to the outside world into alternative vistas.",
          highlight: "alternative vistas",
        },
        {
          text: "In film my bathroom can become, rather than a site of mundane ablutions, instead a place where fish might chat to one another.",
          emphasis: true,
        },
      ],
    },
    {
      paragraphs: [
        {
          text: "It's a continual process — there's no fixed goal. Instead, by continually altering the interior of my home, I find myself negotiating and renegotiating my relationship with space.",
        },
        {
          text: "It's not a solution or panacea, but the dominant language in which I search for one.",
          pull: true,
          highlight: "dominant language",
        },
      ],
    },
  ] satisfies EdBeerbohmColumn[],
  interior: {
    title: "The flat as studio",
    paragraphs: [
      "Walls, doors and stairs became more barrier-like — distances stretched while everyday navigation grew more complex.",
      "Painting transforms those walls from exclusion into vista. Film turns the bathroom into somewhere fish might chat.",
      "A continual process with no fixed goal — only negotiation, again and again, with the space that holds him.",
    ],
    quote: "A means of escape more literal than a flight of fancy.",
  },
  notebookQuote:
    "By painting the walls, I can transform them from barriers to the outside world into alternative vistas.",
  closingQuote:
    "The dominant language in which I search for one.",
} as const;
