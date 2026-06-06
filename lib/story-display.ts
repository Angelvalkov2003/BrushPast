import type { PublicStory } from "lib/supabase/stories";

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
