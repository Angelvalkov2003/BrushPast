import { PHOTO } from "./photo-placeholder";

/** Homepage gift-box teaser — process copy (full chooser lives on /shop). */
export const HOME_GIFT_BOX_PROCESS = {
  eyebrow: "The archive",
  title: "How a Brush Past gift comes together",
  intro:
    "Four journeys — one checkout. Pick coffee, wearable art or prints; we pack every order as a gift box with your message inside.",
  steps: [
    {
      title: "Choose your journey",
      note: "Single Collection, Curated Pairings, Next Chapter, or Build Your Own.",
    },
    {
      title: "Pick the pieces",
      note: "Designs and sizes for tees; fixed pairings from £40; Next Chapter £70.",
    },
    {
      title: "Write your message",
      note: "Thoughtfully packaged — ready to give, with impact built in.",
    },
  ],
  cta: "Choose your gift box",
  ctaHref: "/shop#choose-box",
  photos: [
    {
      alt: "Brush Past gift box being opened",
      note: "IMAGE NEEDED: Lifestyle photo of an open gift box.",
      photoNumber: PHOTO.homeGiftTeaserOpenBox,
    },
    {
      alt: "Coffee, tee and print arranged as a gift",
      note: "IMAGE NEEDED: Flat lay of box contents.",
      photoNumber: PHOTO.homeGiftTeaserFlatLay,
    },
  ],
} as const;
