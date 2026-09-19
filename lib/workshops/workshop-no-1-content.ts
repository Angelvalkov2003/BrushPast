/** Hand-coded copy for /workshops/workshop-no-1 - Edward Alsop */

export const WORKSHOP_NO_1 = {
  slug: "workshop-no-1",
  title: "T-Shirt Workshop at Edward Alsop",
  headline: "T-Shirt Workshop at Edward Alsop",
  location: "Edward Alsop homeless hostel, Victoria, London",
  tagline:
    "We worked with Evolve so people could design their own T-shirts—and begin to see the value in their own work.",
  heroImage: "/workshops/workshop-no-1/hero.jpg",
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
    left: "Every collection starts with people recognising the value in their own work.",
    right:
      "65% of profits are reinvested into creators, workshops and programmes that create new opportunities through creativity.",
  },
} as const;
