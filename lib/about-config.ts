/** About page copy - aligned with brushpast.org / design mockup */

import type {
  AboutValuesIconKey,
  ContactSpaceIconKey,
} from "components/icons/brush-past-icons";
import { PHOTO } from "./photo-placeholder";

export const ABOUT_HERO_IMAGE = {
  src: "/about1.png",
  alt: "Brush Past founders - Jeremy and David",
} as const;

export const ABOUT_MISSION =
  "Brush Past works alongside people whose creativity and stories are too often overlooked. Through workshops, mentoring and opportunities to share their work, we help people turn ideas into art, products and new possibilities. People decide what to share and what to keep for themselves.";

export const ABOUT_VALUES: {
  title: string;
  description: string;
  icon: AboutValuesIconKey;
}[] = [
  {
    title: "Dignity",
    description:
      "Everyone deserves to be seen as a whole person - not defined by their hardest chapter.",
    icon: "dignity",
  },
  {
    title: "Creativity",
    description:
      "Art, writing and design unlock voices that stigma and circumstance have silenced.",
    icon: "creativity",
  },
  {
    title: "Opportunity",
    description:
      "Paid work, exhibitions and skills build confidence and pathways beyond crisis.",
    icon: "opportunity",
  },
  {
    title: "Community",
    description:
      "Real spaces, mentors and peers - recovery and creativity happen together.",
    icon: "community",
  },
];

export const ABOUT_FOUNDERS_PATH = {
  title: "How Brush Past began",
  body: "Jeremy and David met in rooms of recovery. Volunteering with Groundswell brought them into conversation with people whose stories changed the way they saw the world. Those conversations led to Brush Past: a place where people can create, develop skills and be heard on their own terms.",
  photo: {
    alt: "Jeremy and David — founders of Brush Past",
    note: "IMAGE NEEDED: Founders photo for the Groundswell / recovery story box.",
    photoNumber: PHOTO.aboutFoundersPath,
  },
} as const;

export const ABOUT_ON_THE_GROUND =
  "We run creative workshops with partner organisations and support people who want to develop their ideas further. Some work is shared through exhibitions or products with the creator’s agreement.";

export const ABOUT_ORGANISATIONS = {
  eyebrow: "Structure",
  title: "How the Two Organisations Work",
  body: "Brush Past Community Arts CIC is the trading organisation behind the shop and its products. Brush Past Foundation is the registered charity that receives donations to support workshops and mentoring. Together, they help more people create, connect and develop what comes next.",
} as const;

export const ABOUT_IMPACT_STATS = [
  { value: "43", label: "people published as artists", icon: "people" as const },
  { value: "£18,760", label: "paid directly to creators", icon: "pound" as const },
  { value: "17", label: "workshops delivered", icon: "calendar" as const },
  { value: "120+", label: "stories in circulation", icon: "stories" as const },
] as const;

export const ABOUT_LAUNCH_OVERLAY = {
  eyebrow: "Transparency",
  headline: "We've just launched - help us out!",
  buttonLabel: "Join the newsletter",
} as const;

export const ABOUT_QUOTE =
  "We came from different sides of the street, but met on the same roundabout.";

export const ABOUT_QUOTE_ASIDE =
  "A chance conversation between two people with very different backgrounds became a shared belief: creativity can rebuild identity, confidence and connection - and that belief became Brush Past.";

export const ABOUT_SPACES: { label: string; icon: ContactSpaceIconKey }[] = [
  { label: "Conversations", icon: "conversations" },
  { label: "Workshops", icon: "workshops" },
  { label: "Exhibitions", icon: "exhibitions" },
  { label: "Collaboration", icon: "collaboration" },
  { label: "Coffee", icon: "coffee" },
  { label: "Community", icon: "community" },
];
