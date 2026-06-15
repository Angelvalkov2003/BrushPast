import { displayImageUrl } from "lib/image-url";
import { BOBBY_STORY } from "lib/stories/bobby-content";
import { DAVID_STORY } from "lib/stories/david-content";
import { JAMIE_STORY } from "lib/stories/jamie-content";
import { JR_STORY } from "lib/stories/jr-content";
import type { PublicStory } from "lib/supabase/stories";

const STORY_IMAGE_FALLBACKS: Record<string, string> = {
  [BOBBY_STORY.slug]: BOBBY_STORY.heroImage,
  [JAMIE_STORY.slug]: JAMIE_STORY.heroImage,
  [JR_STORY.slug]: JR_STORY.heroImage,
  [DAVID_STORY.slug]: DAVID_STORY.heroImage,
};

export function storyCardImageUrl(story: PublicStory): string | undefined {
  return displayImageUrl(story.image_url) ?? STORY_IMAGE_FALLBACKS[story.slug];
}

export function storyDisplayName(story: PublicStory): string {
  if (story.creator_name && !story.creator_is_anonymous) {
    return story.creator_name;
  }
  return story.title || "Story";
}

export function storyQuote(story: PublicStory): string {
  const q = story.short_description?.trim();
  if (!q) return "";
  return q.startsWith('"') ? q : `"${q}"`;
}

export function storyTagsLabel(tags: string[] | null | undefined): string {
  return (tags ?? [])
    .map((t) => t.replace(/-/g, " ").toUpperCase())
    .join(", ");
}

export function storyHref(story: PublicStory): string | null {
  const custom = story.page_url?.trim();
  if (custom) return custom.startsWith("/") ? custom : `/${custom}`;
  if (!story.slug) return null;
  return `/stories/${story.slug}`;
}
