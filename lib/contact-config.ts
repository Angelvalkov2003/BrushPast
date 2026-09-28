import { PHOTO } from "./photo-placeholder";

export const CONTACT_SOURCE = "get-in-touch" as const;

export const CONTACT_HERO_IMAGE = {
  src: "/getintouch1.PNG",
  alt: "Women and community members with Social Impact Coffee at a Brush Past gathering",
} as const;

export const CONTACT_SUBJECTS = [
  { value: "general", label: "General enquiry", hint: "Questions, hello, or anything else" },
  { value: "collaborate", label: "Collaboration", hint: "Partnerships, venues and programmes" },
  { value: "workshop", label: "Workshops", hint: "Join or host a creative session" },
  { value: "support", label: "Support the work", hint: "Shop, donations and sponsorship" },
  { value: "story", label: "Share a story", hint: "Art, writing, photography and voice" },
] as const;

export type ContactSubjectValue = (typeof CONTACT_SUBJECTS)[number]["value"];

export const CONTACT_CONNECT_CARDS = [
  {
    title: "Join a Workshop",
    description:
      "Ask about upcoming sessions or how to take part through a partner organisation.",
    imageCaption: "Enquire About Workshops.",
    cta: "See upcoming workshops",
    href: "/workshops",
    image: "/workshops.png",
    photoNumber: PHOTO.contactJoinWorkshop,
  },
  {
    title: "Work Together",
    description:
      "Talk to Brush Past Community Arts CIC about a venue, workshop or commercial collaboration.",
    imageCaption: "Work Together",
    cta: "Let's talk",
    href: "#contact-form",
    image: "/home-hero.png",
    photoNumber: PHOTO.contactCollaborate,
  },
  {
    title: "Support the Work",
    description:
      "Donate to Brush Past Foundation to support its charitable work.",
    imageCaption: "Support the Work",
    cta: "Support the work",
    href: "/sponsor",
    image: "/shop1.png",
    photoNumber: PHOTO.contactSupportWork,
  },
] as const;
