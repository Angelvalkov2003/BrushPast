/** Hand-coded copy for /workshops/workshop-no-1 - Edward Alsop */

const BASE = "/workshops/workshop-no-1";

export const WORKSHOP_NO_1 = {
  slug: "workshop-no-1",
  title: "T-Shirt Workshop at Edward Alsop",
  headline: "T-Shirt Workshop at Edward Alsop",
  location: "Edward Alsop homeless hostel, Victoria, London",
  partner: "Evolve",
  tagline:
    "We worked with Evolve so people could design their own T-shirts—and begin to see the value in their own work.",
  heroImage: `${BASE}/hero.jpg`,
  narrativeColumns: [
    {
      title: "With Evolve",
      body: "We worked with Evolve to create a workshop where people could design their own T-shirts, with the possibility of developing longer-term collaborations.",
    },
    {
      title: "Learning as you make",
      body: "Participants can have the opportunity to feature their T-shirts on the Brushpast website while learning about social media marketing and basic business principles.",
    },
    {
      title: "Value in your own work",
      body: "The idea is to encourage people to recognise the value in their own work, stories, lived experience, creativity, and self-expression. We are following up with an arranged marketing workshop to help participants put their designs out into the world.",
    },
  ],
  moments: [
    {
      title: "Create",
      caption: "Markers down. Ideas up. No pressure to perform.",
      image: `${BASE}/create.jpg`,
    },
    {
      title: "Connect",
      caption: "A shared table. Shared stories. Shared confidence.",
      image: `${BASE}/connect.jpg`,
    },
    {
      title: "Capture",
      caption: "Designs take shape — colour, character, and voice.",
      image: `${BASE}/capture.jpg`,
    },
    {
      title: "Share",
      caption: "Proud moments. Work you can hold and wear.",
      image: `${BASE}/share.jpg`,
    },
    {
      title: "Opportunity",
      caption: "A path to put designs into the world — if you choose.",
      image: `${BASE}/opportunity.jpg`,
    },
  ],
  processTitle: "From sketch to shirt",
  processIntro:
    "One afternoon. Real people. Original work made by hand — from first mark to finished tee.",
  processSteps: [
    { label: "Let's begin", image: `${BASE}/process/01.webp` },
    { label: "First ideas", image: `${BASE}/process/02.webp` },
    { label: "Taking shape", image: `${BASE}/process/03.webp` },
    { label: "Sharing & creating", image: `${BASE}/process/04.jpg` },
    { label: "The tools", image: `${BASE}/process/05.jpg` },
    { label: "Colour & character", image: `${BASE}/process/06.jpg` },
    { label: "Proud moment", image: `${BASE}/process/07.jpg` },
  ],
  archive: {
    title: "A living archive",
    body: "This Edward Alsop workshop marks a chapter of the BrushPast archive—creativity shared in a hostel, with room for longer collaborations to grow.",
    statsTitle: "Edward Alsop",
    statsLocation: "Victoria • London · Partner: Evolve",
    stats: [
      { value: "9", label: "creators", icon: "people" as const },
      { value: "9", label: "original designs", icon: "shirt" as const },
      { value: "1", label: "shared experience", icon: "heart" as const },
    ],
    footerLine: "Partner: Evolve — logo available.",
  },
  collectionTitle: "The collection",
  collectionIntro:
    "Each design is evidence — not of talent reserved for studios, but of creativity showing up in an ordinary afternoon.",
  collection: [
    { number: "01", title: "Design 01", image: `${BASE}/collection/01.jpg` },
    { number: "02", title: "Design 02", image: `${BASE}/collection/02.jpg` },
    { number: "03", title: "Design 03", image: `${BASE}/collection/03.jpg` },
    { number: "04", title: "Design 04", image: `${BASE}/collection/04.jpg` },
    { number: "05", title: "Design 05", image: `${BASE}/collection/05.jpg` },
  ],
  closing: {
    left: "Every collection starts with people recognising the value in their own work.",
    right:
      "65% of profits are reinvested into creators, workshops and programmes that create new opportunities through creativity.",
    cta: "Back to workshops",
    href: "/workshops",
  },
} as const;
