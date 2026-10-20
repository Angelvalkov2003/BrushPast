/** Hand-coded copy for /workshops/photography — Cotton Gardens */

import { PHOTO } from "lib/photo-placeholder";

const BASE = "/workshops/workshop-no-1";
const GALLERY_BASE = `${BASE}/morephotos`;

/** Gallery: estate morephotos + workshop-no-1 session stills. */
export const PHOTOGRAPHY_GALLERY = [
  `${GALLERY_BASE}/gallery-01.jpg`,
  `${GALLERY_BASE}/gallery-02.jpg`,
  `${GALLERY_BASE}/gallery-03.jpg`,
  `${GALLERY_BASE}/gallery-04.jpg`,
  `${GALLERY_BASE}/gallery-05.jpg`,
  `${GALLERY_BASE}/gallery-06.jpg`,
  `${GALLERY_BASE}/gallery-07.jpg`,
  `${GALLERY_BASE}/gallery-08.jpg`,
  `${GALLERY_BASE}/gallery-09.jpg`,
  `${GALLERY_BASE}/gallery-10.jpg`,
  `${BASE}/create.jpg`,
  `${BASE}/connect.jpg`,
  `${BASE}/capture.jpg`,
  `${BASE}/share.jpg`,
  `${BASE}/hero.jpg`,
  `${BASE}/opportunity.jpg`,
] as const;

export const PHOTOGRAPHY_WORKSHOP = {
  slug: "photography",
  title: "The Estate We're In: Cotton Gardens Photography",
  headline: "The Estate We're In",
  location: "Cotton Gardens Community Centre, Kennington, London",
  partner: "Residents' Association",
  facilitator: "George Amponsah, filmmaker and photographer",
  tagline:
    "A day-in-the-life photography workshop where residents captured moments that meant something, and took a print home the same day.",
  /** Main image — Drive “41.jpeg” / Workshops */
  heroImage: `${BASE}/41.jpeg`,
  photoNumber: PHOTO.pastWorkshopCottonGardens,
  imageAlt: "Cotton Gardens photography workshop — The Estate We're In",
  gallery: PHOTOGRAPHY_GALLERY,
  galleryTitle: "From the workshop",
  galleryIntro:
    "Moments from the Cotton Gardens photography workshop — cameras in hand, prints on the day.",
  narrativeColumns: [
    {
      title: "At Cotton Gardens",
      body: 'We ran a "day in the life" photography workshop at the Cotton Gardens Community Centre in Kennington, working with the Residents\' Association.',
    },
    {
      title: "With George Amponsah",
      body: "George Amponsah, the filmmaker and photographer behind The Hard Stop, facilitated the workshop. We gave everyone a digital camera and invited them to capture moments that meant something in their lives.",
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
