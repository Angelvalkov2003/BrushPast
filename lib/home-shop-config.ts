import { PHOTO } from "./photo-placeholder";

/** Homepage gift-box teaser — process copy (full chooser lives on /shop). */
export const HOME_GIFT_BOX_PROCESS = {
  eyebrow: "The archive",
  title: "How a Brush Past gift comes together",
  intro:
    "Choose coffee, wearable art or a fine art print. Pick your pieces and add a personal message at checkout if you’d like.",
  steps: [
    {
      title: "Choose your journey",
      note: "One Piece Gift Boxes, Two Piece Gift Boxes, The Next Chapter Box, or Build Your Own Gift Box.",
    },
    {
      title: "Pick the pieces",
      note: "Choose designs and sizes for tees; pick your pairing or mix your own box.",
    },
    {
      title: "Write your message",
      note: "Thoughtfully packaged — ready to give, with impact built in.",
    },
  ],
  cta: "Choose your gift box",
  ctaHref: "/shop#choose-box",
  photo: {
    alt: "Brush Past gift box with coffee, tee and print",
    note: "Gift box lifestyle photograph.",
    photoNumber: PHOTO.homeGiftTeaserOpenBox,
  },
} as const;
