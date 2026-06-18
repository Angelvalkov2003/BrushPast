/** Hand-coded copy for /workshops/workshop-no-1 — Edward Allsop Court */

export const WORKSHOP_NO_1 = {
  slug: "workshop-no-1",
  title: "Workshop No.1",
  headline: "Workshop No.1",
  location: "Edward Allsop Court, London",
  tagline:
    "Nine t-shirts, nine voices, one afternoon that proved creativity belongs to everyone.",
  heroImage: "/workshops/workshop-no-1/hero.jpg",
  narrativeColumns: [
    {
      title: "The beginning",
      body: "BrushPast began with a simple belief: everyone has a story, and everyone can make something real. Workshop No.1 at Edward Allsop Court was where that belief left the page — nine people around one table, markers in hand, no pressure to perform or explain.",
    },
    {
      title: "More than a t-shirt",
      body: "Each design is evidence — not of talent reserved for studios, but of creativity showing up in an ordinary afternoon. Every shirt is original, every mark made by hand. Nothing copied, nothing manufactured without a person behind it.",
    },
    {
      title: "Why it matters",
      body: "We make space for connection — between neighbours, between strangers who become collaborators, between a lived moment and something you can hold. Creativity is not reserved for galleries. It belongs in community rooms, at kitchen tables, wherever people gather.",
    },
  ],
  processTitle: "From sketch to shirt",
  processSteps: [
    { label: "Let's begin", image: "/workshops/workshop-no-1/process/01-lets-begin.jpg" },
    { label: "First ideas", image: "/workshops/workshop-no-1/process/02-first-ideas.jpg" },
    { label: "Taking shape", image: "/workshops/workshop-no-1/process/03-taking-shape.jpg" },
    { label: "Sharing & creating", image: "/workshops/workshop-no-1/process/04-sharing-creating.jpg" },
    { label: "The tools", image: "/workshops/workshop-no-1/process/05-the-tools.jpg" },
    { label: "Colour & character", image: "/workshops/workshop-no-1/process/06-colour-character.jpg" },
    { label: "Finished design", image: "/workshops/workshop-no-1/process/07-finished-design.jpg" },
    { label: "Proud moment", image: "/workshops/workshop-no-1/process/08-proud-moment.jpg" },
  ],
  archive: {
    title: "A living archive",
    body: "Workshop No.1 marks the start of the BrushPast archive — a record of what happens when people are given time, materials and the freedom to make something their own. Every collection begins here.",
    statsTitle: "Workshop No.1",
    statsLocation: "Edward Allsop Court • London",
    stats: [
      { value: "9", label: "creators", icon: "people" as const },
      { value: "9", label: "original designs", icon: "shirt" as const },
      { value: "1", label: "shared experience", icon: "heart" as const },
    ],
    footerLine: "The first chapter of BrushPast.",
  },
  collectionTitle: "The collection",
  collection: [
    { number: "01", title: "Kites", image: "/workshops/workshop-no-1/collection/01-kites.jpg" },
    { number: "02", title: "Fishing trip", image: "/workshops/workshop-no-1/collection/02-fishing-trip.jpg" },
    { number: "03", title: "Pattern cross", image: "/workshops/workshop-no-1/collection/03-pattern-cross.jpg" },
    { number: "04", title: "Rave on", image: "/workshops/workshop-no-1/collection/04-rave-on.jpg" },
    { number: "05", title: "Faces", image: "/workshops/workshop-no-1/collection/05-faces.jpg" },
    { number: "06", title: "Mighty culture", image: "/workshops/workshop-no-1/collection/06-mighty-culture.jpg" },
    { number: "07", title: "Eyes", image: "/workshops/workshop-no-1/collection/07-eyes.jpg" },
    { number: "08", title: "Rangers crest", image: "/workshops/workshop-no-1/collection/08-rangers-crest.jpg" },
    { number: "09", title: "Workshop cross", image: "/workshops/workshop-no-1/collection/09-workshop-cross.jpg" },
  ],
  closing: {
    left: "Every collection starts with one piece. Workshop No.1 will always be where the BrushPast archive began.",
    right:
      "65% of profits are reinvested into creators, workshops and programmes that create new opportunities through creativity.",
  },
} as const;
