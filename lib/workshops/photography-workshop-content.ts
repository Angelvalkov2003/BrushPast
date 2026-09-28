/** Hand-coded copy for /workshops/photography — Cotton Gardens */

import { PHOTO } from "lib/photo-placeholder";

export const PHOTOGRAPHY_WORKSHOP = {
  slug: "photography",
  title: "The Estate We're In: Cotton Gardens Photography",
  headline: "The Estate We're In",
  location: "Cotton Gardens Community Centre, Kennington, London",
  partner: "Residents' Association",
  facilitator: "George Ponza, filmmaker and photographer",
  tagline:
    "A day-in-the-life photography workshop where residents captured moments that meant something — and took a print home the same day.",
  photoNumber: PHOTO.pastWorkshopCottonGardens,
  imageAlt: "Cotton Gardens photography workshop — The Estate We're In",
  imageNote:
    "IMAGE NEEDED: Photograph from The Estate We're In — Cotton Gardens photography workshop.",
  narrativeColumns: [
    {
      title: "At Cotton Gardens",
      body: 'We ran a "day in the life" photography workshop at the Cotton Gardens Community Centre in Kennington, working with the Residents\' Association.',
    },
    {
      title: "With George Ponza",
      body: "George Ponza, the filmmaker and photographer behind The Hard Stop, facilitated the workshop. We gave everyone a digital camera and invited them to capture moments that meant something in their lives.",
    },
    {
      title: "Printed the same day",
      body: "We then produced their work, and everybody took home a photograph they had created, printed on the day.",
    },
  ],
  quote: {
    attribution: "Michael, Chair of the Residents' Association",
    text: "This was a unique experience for the residents, which brought everyone together and gave us the opportunity to capture the simple aspects of our lives that really matter to us.",
  },
  closing: {
    left: "Every workshop starts with people seeing their own lives as worth framing.",
    right:
      "65% of profits are reinvested into creators, workshops and programmes that create new opportunities through creativity.",
    cta: "Back to workshops",
    href: "/workshops",
  },
} as const;
