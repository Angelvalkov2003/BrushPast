/** Workshops page copy - design mockup + client brief */

import type {
  WorkshopProcessIconKey,
  WorkshopsPageIconKey,
} from "components/icons/brush-past-icons";
import { PHOTO } from "./photo-placeholder";

export const WORKSHOPS_HERO_INTRO =
  "We began by working alongside people affected by homelessness, addiction and the criminal justice system. We run workshops with partner organisations and adapt each session to the people taking part. Our workshops bring people together through art, photography, writing and design: a place to breathe, make something and be yourself without pressure to perform or explain. No previous experience is needed.";

export type WorkshopCategory = {
  name: string;
  /** Anchor id used to jump to the matching past workshop */
  id: string;
  active: boolean;
};

/** Client workshop categories — only active types are clickable for now */
export const WORKSHOP_CATEGORIES: WorkshopCategory[] = [
  { name: "T-Shirt Design", id: "t-shirt-design", active: true },
  { name: "Photography", id: "photography", active: true },
  { name: "Storytelling", id: "storytelling", active: false },
  { name: "Business Mentoring", id: "business-mentoring", active: false },
  { name: "Beyond the Gate", id: "beyond-the-gate", active: false },
];

export const WORKSHOPS_CORE_VALUES: {
  title: string;
  description: string;
  icon: WorkshopsPageIconKey;
}[] = [
  {
    title: "Safe space",
    description: "No judgment, no pressure - show up exactly as you are.",
    icon: "safeSpace",
  },
  {
    title: "Be creative",
    description:
      "Any medium, any skill level - art, writing, photography, design.",
    icon: "beCreative",
  },
  {
    title: "Connect",
    description: "Meet others, build confidence and community in real rooms.",
    icon: "connect",
  },
];

/** Create / Connect / Capture / Share — shown under What Happens */
export const WORKSHOPS_PROCESS: {
  title: string;
  caption: string;
  image: string;
  icon: WorkshopProcessIconKey;
}[] = [
  {
    title: "Create",
    caption: "Draw, write, photograph or design - guided, unhurried sessions.",
    image: "/workshops/workshop-no-1/create.jpg",
    icon: "create",
  },
  {
    title: "Connect",
    caption: "Share a table, a conversation and confidence with others.",
    image: "/workshops/workshop-no-1/connect.jpg",
    icon: "connect",
  },
  {
    title: "Capture",
    caption: "Document your work - digital or print, your choice.",
    image: "/workshops/workshop-no-1/capture.jpg",
    icon: "capture",
  },
  {
    title: "Share",
    caption: "Publish on Brush Past, exhibit, or keep it private.",
    image: "/workshops/workshop-no-1/share.jpg",
    icon: "share",
  },
];

export type PastWorkshopDetail = {
  categoryId: "photography" | "t-shirt-design";
  categoryLabel: string;
  title: string;
  location: string;
  partner: string;
  facilitator?: string;
  body: string[];
  quote?: {
    attribution: string;
    text: string;
  };
  href?: string;
  /** Fallback image when no numbered photo slot is used */
  image?: string;
  /** Numbered site photo slot (снимка N) — preferred when set */
  photoNumber?: number;
  imageAlt?: string;
  imageNote?: string;
};

export const PAST_WORKSHOPS: PastWorkshopDetail[] = [
  {
    categoryId: "photography",
    categoryLabel: "Photography",
    title: "The Estate We're In: Cotton Gardens Photography",
    location: "Cotton Gardens Community Centre, Kennington, London",
    partner: "Residents' Association",
    body: [
      'We ran a "day in the life" photography workshop at the Cotton Gardens Community Centre in Kennington, working with the Residents\' Association.',
      "Everyone left with a photograph they had created, printed on the day.",
    ],
    href: "/workshops/photography",
    photoNumber: PHOTO.pastWorkshopCottonGardens,
    imageAlt: "Cotton Gardens photography workshop — The Estate We're In",
    imageNote:
      "IMAGE NEEDED: Photograph from The Estate We're In — Cotton Gardens photography workshop.",
  },
  {
    categoryId: "t-shirt-design",
    categoryLabel: "T-Shirt Design",
    title: "T-Shirt Workshop at Edward Alsop",
    location: "Edward Alsop homeless hostel, Victoria, London",
    partner: "Look Ahead",
    body: [
      "We worked with Look Ahead to create a workshop where people could design their own T-shirts, with the possibility of developing longer-term collaborations.",
      "The idea is to encourage people to recognise the value in their own work, stories, lived experience, creativity, and self-expression.",
    ],
    href: "/workshops/workshop-no-1",
    photoNumber: PHOTO.pastWorkshopEdwardAlsop,
    imageAlt: "T-shirt workshop at Edward Alsop hostel",
    imageNote: "Photograph from the Edward Alsop T-shirt workshop.",
  },
];

export const WORKSHOPS_IMPACT_STATS = [
  { value: "43+", label: "creators published", icon: "people" as const },
  { value: "17+", label: "workshops delivered", icon: "calendar" as const },
  {
    value: "£18,760+",
    label: "paid directly to creators",
    icon: "pound" as const,
  },
  { value: "120+", label: "stories in circulation", icon: "stories" as const },
] as const;
