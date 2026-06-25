import type { ContactSpaceIconKey } from "components/icons/brush-past-icons";

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
  },
  {
    title: "Collaborate",
    description: "Partnerships, venues, programmes and",
    descriptionAccent: "joint projects.",
    cta: "Let's talk",
    href: "#contact-form",
    image: "/home-hero.png",
  },
  {
    title: "Support the work",
    description: "Every purchase and donation helps",
    descriptionAccent: "creators and programmes.",
    cta: "Support Brush Past",
    href: "/shop",
    image: "/shop1.png",
  },
] as const;

export const CONTACT_SPACES: { label: string; icon: ContactSpaceIconKey }[] = [
  { label: "Conversations", icon: "conversations" },
  { label: "Workshops", icon: "workshops" },
  { label: "Exhibitions", icon: "exhibitions" },
  { label: "Collaboration", icon: "collaboration" },
  { label: "Coffee", icon: "coffee" },
  { label: "Community", icon: "community" },
];
