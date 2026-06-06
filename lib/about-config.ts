/** About page copy — aligned with brushpast.org / design mockup */

export const ABOUT_VALUES = [
  {
    title: "Dignity",
    description:
      "Everyone deserves to be seen as a whole person — not defined by their hardest chapter.",
    icon: "dignity" as const,
  },
  {
    title: "Creativity",
    description:
      "Art, writing and design unlock voices that stigma and circumstance have silenced.",
    icon: "creativity" as const,
  },
  {
    title: "Opportunity",
    description:
      "Paid work, exhibitions and skills build confidence and pathways beyond crisis.",
    icon: "opportunity" as const,
  },
  {
    title: "Community",
    description:
      "Real spaces, mentors and peers — recovery and creativity happen together.",
    icon: "community" as const,
  },
] as const;

export const ABOUT_MENTORING_POINTS = [
  "Early intervention where creativity meets recovery",
  "One-to-one mentoring with people who understand the journey",
  "Workshops in art, writing, photography and design",
  "Exhibitions and platforms that publish overlooked voices",
  "Partnerships with housing, recovery and community organisations",
] as const;

export const ABOUT_PROCESS = [
  {
    step: 1,
    title: "Share a story",
    description: "Workshops and safe spaces where lived experience becomes creative work.",
    icon: "share" as const,
  },
  {
    step: 2,
    title: "Create the work",
    description: "Stories become art, apparel, prints and products people can hold.",
    icon: "create" as const,
  },
  {
    step: 3,
    title: "Fund the next opportunity",
    description: "Shop sales and collaborations reinvest in creators and future workshops.",
    icon: "fund" as const,
  },
] as const;

export const ABOUT_IMPACT_STATS = [
  { value: "43", label: "people published as artists", icon: "people" as const },
  { value: "£18,760", label: "paid directly to creators", icon: "pound" as const },
  { value: "17", label: "workshops delivered", icon: "calendar" as const },
  { value: "120+", label: "stories in circulation", icon: "stories" as const },
] as const;

export const ABOUT_QUOTE =
  "We came from different sides of the street, but met on the same roundabout.";

export const ABOUT_QUOTE_ASIDE =
  "A chance conversation between two people with very different backgrounds became a shared belief: creativity can rebuild identity, confidence and connection — and that belief became Brush Past.";
