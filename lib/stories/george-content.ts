/** Hand-coded copy for /stories/george — George's Story */

export type GeorgeParagraph = {
  text: string;
  emphasis?: boolean;
  pull?: boolean;
  highlight?: string;
};

export type GeorgeColumn = {
  paragraphs: GeorgeParagraph[];
};

export const GEORGE_STORY = {
  slug: "george",
  title: "George",
  subtitle: "George's Story",
  tags: "Photography. Art. Recovery.",
  heroQuote:
    "Photography comes from the Greek for \"painting with light\" — and brushstrokes belong in the frame.",
  heroQuoteHighlight: "painting with light",
  heroImage: "/stories/george/1.webp",
  storyIntro:
    "From a rejected print in the 1980s to Photoshop, Van Gogh, and a project called Now and Then.",
  storyColumns: [
    {
      paragraphs: [
        {
          text: "When Jeremy and David asked me to create an image that represents me as an artist for the Brush Past project, my first thought was to use a photograph I had taken back in the 1980s or 90s. The problem was that all the successful prints had long since been framed and given away as gifts—leaving only the rejects in my portfolio. So, I ended up rephotographing one of those rejected prints with my iPhone. Interestingly, the phone automatically brightened the photo, correcting what had originally been far too dark.",
          pull: true,
          highlight: "rejected prints",
        },
        {
          text: "From there, I decided to go further: I used Photoshop to place the image of a mother and child back into the painting they were standing in front of. I'd always considered myself something of a purist and had never touched Photoshop before. But after hours of experimenting, I got the hang of it—and to my surprise, I had a great time. Using the tools, especially the paintbrush, I felt more like a painter in the spirit of Dali or Magritte than a photographer.",
          emphasis: true,
          highlight: "Dali or Magritte",
        },
      ],
    },
    {
      paragraphs: [
        {
          text: "If you look closely at the right side of the frame, where there's a collage of a face (LL Cool J) sticking out its tongue, you'll notice some very rough, obvious brushstrokes. Instead of disguising them to make the image appear more photographic, I decided to leave them as they were—brushstrokes. After all, the word photography comes from the Greek for \"painting with light.\" That thought inspired me to sign the piece in the style of Van Gogh, in the bottom right corner.",
          pull: true,
          highlight: "painting with light",
        },
        {
          text: "This project reawakened something in me. As a teenager, making art felt almost like a spiritual practice. Spending hours drawing or painting—even something as simple as a bowl of fruit—taught me to truly see. Back then, as a troubled youth, art was calming, and in many ways a form of meditation. Today, as a member of a 12-Step fellowship, meditation and prayer are central in my life, and I believe deeply in the spiritual solutions to addiction. Along the way, I've found trusted friends, including David and Jeremy.",
          emphasis: true,
          highlight: "spiritual solutions",
        },
        {
          text: "Being part of Brush Past has already encouraged me to dig out my old negatives, make new prints, and begin reimagining them with modern tools. I'm even considering an exhibition of these reworked images—past and present in dialogue with each other. I might call it Now and Then.",
          highlight: "Now and Then",
        },
      ],
    },
  ] satisfies GeorgeColumn[],
  studio: {
    title: "Painting with light",
    paragraphs: [
      "A rejected print, an iPhone, and hours in Photoshop — until the image felt less like a correction and more like a return to making.",
      "Art as meditation then. Meditation and prayer in recovery now. The tools change; the need to truly see does not.",
    ],
    quote: "Past and present in dialogue with each other.",
  },
  notebookQuote:
    "Making art felt almost like a spiritual practice — even something as simple as a bowl of fruit taught me to truly see.",
  closingQuote: "I might call it Now and Then.",
} as const;
