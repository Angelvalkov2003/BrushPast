export const CONTACT_SOURCE = "get-in-touch" as const;

export const CONTACT_SUBJECTS = [
  { value: "general", label: "General enquiry" },
  { value: "collaborate", label: "Collaboration" },
  { value: "workshop", label: "Workshops" },
  { value: "support", label: "Support the work" },
  { value: "story", label: "Share a story" },
] as const;

export const CONTACT_CONNECT_CARDS = [
  {
    title: "Share something",
    description: "Tell us your story — art, writing, photography or lived experience.",
    cta: "Share your story",
    href: "/share-your-story",
    color: "bg-[#e8dff5]",
    icon: "brush" as const,
  },
  {
    title: "Join a workshop",
    description: "Creative sessions rooted in real spaces and community.",
    cta: "See upcoming workshops",
    href: "/workshops",
    color: "bg-[#f5e6dc]",
    icon: "person" as const,
  },
  {
    title: "Collaborate",
    description: "Partnerships, venues, programmes and joint projects.",
    cta: "Let's talk",
    href: "#contact-form",
    color: "bg-[#dfe8e0]",
    icon: "handshake" as const,
  },
  {
    title: "Support the work",
    description: "Every purchase and donation helps creators and programmes.",
    cta: "Support Brush Past",
    href: "/shop",
    color: "bg-[#dce8f2]",
    icon: "heart" as const,
  },
] as const;

export const CONTACT_SPACES_ICONS = [
  "Conversations",
  "Workshops",
  "Exhibitions",
  "Collaboration",
  "Coffee",
  "Community",
] as const;
