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
import { KARL_STORY } from "lib/stories/karl-content";
import {
  JED_STORY,
  SANDRA_STORY,
} from "lib/stories/portrait-stories-content";
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
  [KARL_STORY.slug]: KARL_STORY.heroImage,
};

/** Hand-coded story routes that may not yet have DB rows */
export const STATIC_STORY_LISTING: {
  slug: string;
  title: string;
  page_url: string;
  short_description: string;
}[] = [
  {
    slug: KARL_STORY.slug,
    title: KARL_STORY.title,
    page_url: `/stories/${KARL_STORY.slug}`,
    short_description: KARL_STORY.heroQuote,
  },
  {
    slug: JED_STORY.slug,
    title: JED_STORY.title,
    page_url: `/stories/${JED_STORY.slug}`,
    short_description: JED_STORY.heroQuote ?? "",
  },
  {
    slug: SANDRA_STORY.slug,
    title: SANDRA_STORY.title,
    page_url: `/stories/${SANDRA_STORY.slug}`,
    short_description: SANDRA_STORY.heroQuote ?? "",
  },
];

export function storyCardImageUrl(story: PublicStory): string | undefined {
  const slug = story.slug?.trim();
  return displayImageUrl(story.image_url) ?? (slug ? STORY_IMAGE_FALLBACKS[slug] : undefined);
}

export function hasStoryCardImage(story: PublicStory): boolean {
  return storyCardImageUrl(story) !== undefined;
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
