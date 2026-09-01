import type { ContactSpaceIconKey } from "components/icons/brush-past-icons";
import { PHOTO } from "./photo-placeholder";

export const CONTACT_SOURCE = "get-in-touch" as const;

export const CONTACT_HERO_IMAGE = {
  src: "/getintouch.png",
  alt: "Community workshop at Brush Past - people collaborating around a table",
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
    title: "Join a workshop",
    description: "Creative sessions rooted in",
    descriptionAccent: "real spaces and community.",
    cta: "See upcoming workshops",
    href: "/workshops",
    image: "/workshops.png",
    photoNumber: PHOTO.contactJoinWorkshop,
  },
  {
    title: "Collaborate",
    description: "Partnerships, venues, programmes and",
    descriptionAccent: "joint projects.",
    cta: "Let's talk",
    href: "#contact-form",
    image: "/home-hero.png",
    photoNumber: PHOTO.contactCollaborate,
  },
  {
    title: "Support the work",
    description: "Sponsor a workshop, an artist, or",
    descriptionAccent: "the next community story.",
    cta: "Become a sponsor",
    href: "/sponsor",
    image: "/shop1.png",
    photoNumber: PHOTO.contactSupportWork,
  },
] as const;

export const CONTACT_PECKHAM_PHOTO = {
  alt: "London Coffee Factory space in Peckham",
  note: "Peckham, London — London Coffee Factory space.",
  photoNumber: PHOTO.contactPeckham,
} as const;

export const CONTACT_SPACES: { label: string; icon: ContactSpaceIconKey }[] = [
  { label: "Conversations", icon: "conversations" },
  { label: "Workshops", icon: "workshops" },
  { label: "Exhibitions", icon: "exhibitions" },
  { label: "Collaboration", icon: "collaboration" },
  { label: "Coffee", icon: "coffee" },
  { label: "Community", icon: "community" },
];
