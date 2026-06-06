/** Story listing filters (matches public /stories design). */

export const STORY_FILTER_TABS = [
  { id: "all", label: "All Stories" },
  { id: "writing", label: "Writing" },
  { id: "photography", label: "Photography" },
  { id: "art", label: "Art" },
  { id: "recovery", label: "Recovery" },
  { id: "workshops", label: "Workshops" },
  { id: "community-stories", label: "Community" },
  { id: "limited-editions", label: "Limited Editions" },
  { id: "coffee-editions", label: "Coffee Editions" },
  { id: "anonymous", label: "Anonymous" },
] as const;

export type StoryFilterId = (typeof STORY_FILTER_TABS)[number]["id"];

export const STORY_TAG_OPTIONS = STORY_FILTER_TABS.filter((t) => t.id !== "all").map(
  (t) => t.id,
);

export type StoryCardLayout = "wide" | "tall" | "standard" | "text-accent" | "text-dark";

/** Masonry rhythm similar to design mockup */
export const STORY_LAYOUT_PATTERN: StoryCardLayout[] = [
  "wide",
  "standard",
  "tall",
  "standard",
  "standard",
  "text-accent",
  "standard",
  "tall",
  "wide",
  "standard",
  "text-dark",
  "standard",
];

export function layoutForIndex(index: number): StoryCardLayout {
  return STORY_LAYOUT_PATTERN[index % STORY_LAYOUT_PATTERN.length] ?? "standard";
}
