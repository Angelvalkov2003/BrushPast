/** Workshops page copy - design mockup + client brief */

export const WORKSHOPS_HERO_INTRO =
  "A space to breathe, make something, and be yourself - without pressure to perform or explain. Creative workshops for anyone with a story, at any skill level.";

/** Client workshop categories */
export const WORKSHOP_CATEGORIES = [
  "T-Shirt Design",
  "Photography",
  "Storytelling",
  "Creative Recovery",
  "Business Mentoring",
  "Beyond the Gates",
] as const;

export const WORKSHOPS_MISSION_COLUMNS = {
  origin:
    "BrushPast began working with people in recovery, homelessness and incarceration - using creativity to rebuild identity and confidence.",
  originHighlight: "But the model works for anyone.",
  choiceLead: "You choose your path.",
  choiceBody: "Share your work, sell your work, or keep it private. It's your choice. Always.",
} as const;

export const WORKSHOPS_CORE_VALUES = [
  {
    title: "Safe space",
    description: "No judgment, no pressure - show up exactly as you are.",
    icon: "safe" as const,
  },
  {
    title: "Be creative",
    description: "Any medium, any skill level - art, writing, photography, design.",
    icon: "creative" as const,
  },
  {
    title: "Connect",
    description: "Meet others, build confidence and community in real rooms.",
    icon: "connect" as const,
  },
  {
    title: "Opportunity",
    description: "Exhibitions, products and platforms when you're ready to share.",
    icon: "opportunity" as const,
  },
  {
    title: "Ownership",
    description: "Your work, your rights - we never take that away from you.",
    icon: "ownership" as const,
  },
] as const;

export const WORKSHOPS_PROCESS = [
  {
    title: "Create",
    caption: "Draw, write, photograph or design - guided, unhurried sessions.",
    image: "/workshops-hero.png",
  },
  {
    title: "Connect",
    caption: "Share a table, a conversation and confidence with others.",
    image: "/home-hero.png",
  },
  {
    title: "Capture",
    caption: "Document your work - digital or print, your choice.",
    image: "/contact-hero.png",
  },
  {
    title: "Share (if you want)",
    caption: "Publish on BrushPast, exhibit, or keep it private.",
    image: "/about-hero.png",
  },
  {
    title: "Opportunity",
    caption: "If work sells through our shop, creators earn fairly - 65% reinvested with creators and partners.",
    image: "/shop-hero.png",
  },
] as const;

export const WORKSHOPS_IMPACT_STATS = [
  { value: "43+", label: "creators published", icon: "people" as const },
  { value: "17+", label: "workshops delivered", icon: "calendar" as const },
  { value: "£18,760+", label: "paid directly to creators", icon: "pound" as const },
  { value: "120+", label: "stories in circulation", icon: "stories" as const },
] as const;
