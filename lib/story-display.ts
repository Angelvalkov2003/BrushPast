import { displayImageUrl } from "lib/image-url";
import { ED_BEERBOHM_STORY } from "lib/stories/ed-beerbohm-content";
import { ENEH_STORY } from "lib/stories/eneh-content";
import { ROB_STORY } from "lib/stories/rob-content";
import { ERROL_STORY } from "lib/stories/errol-content";
import { CHRISSIE_STORY } from "lib/stories/chrissie-content";
import { MAIMOUNA_STORY } from "lib/stories/maimouna-content";
import { BOBBY_STORY } from "lib/stories/bobby-content";
import { DAVID_STORY } from "lib/stories/david-content";
import { GEORGE_STORY } from "lib/stories/george-content";
import { JAMIE_STORY } from "lib/stories/jamie-content";
import { JEREMY_STORY } from "lib/stories/jeremy-content";
import { LITTLE_GEORGE_STORY } from "lib/stories/little-george-content";
import { JR_STORY } from "lib/stories/jr-content";
import type { PublicStory } from "lib/supabase/stories";

const STORY_IMAGE_FALLBACKS: Record<string, string> = {
  [ED_BEERBOHM_STORY.slug]: ED_BEERBOHM_STORY.heroImage,
  [ENEH_STORY.slug]: ENEH_STORY.heroImage,
  [ROB_STORY.slug]: ROB_STORY.heroImage,
  [ERROL_STORY.slug]: ERROL_STORY.heroImage,
  [CHRISSIE_STORY.slug]: CHRISSIE_STORY.heroImage,
  [MAIMOUNA_STORY.slug]: MAIMOUNA_STORY.heroImage,
  [BOBBY_STORY.slug]: BOBBY_STORY.heroImage,
  [GEORGE_STORY.slug]: GEORGE_STORY.heroImage,
  [JAMIE_STORY.slug]: JAMIE_STORY.heroImage,
  [JEREMY_STORY.slug]: JEREMY_STORY.heroImage,
  [LITTLE_GEORGE_STORY.slug]: LITTLE_GEORGE_STORY.heroImage,
  [JR_STORY.slug]: JR_STORY.heroImage,
  [DAVID_STORY.slug]: DAVID_STORY.heroImage,
};

export function storyCardImageUrl(story: PublicStory): string | undefined {
  return displayImageUrl(story.image_url) ?? STORY_IMAGE_FALLBACKS[story.slug];
}

export function storyDisplayName(story: PublicStory): string {
  if (story.creator_is_anonymous) return "Anonymous";
  return story.title || story.creator_name || "Story";
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
