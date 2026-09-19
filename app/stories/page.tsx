import Footer from "components/layout/footer";
import { StoriesHero } from "components/stories/stories-hero";
import { StoriesPageClient } from "components/stories/stories-page-client";
import { bpFontVariables } from "components/home/home-typography";
import { STATIC_STORY_LISTING } from "lib/story-display";
import { getPublicStories, type PublicStory } from "lib/supabase/stories";

export const metadata = {
  title: "Stories",
  description: "Art. Writing. Photography. Real people. Real voices - Brush Past.",
};

export const dynamic = "force-dynamic";

function mergeStaticStories(stories: PublicStory[]): PublicStory[] {
  const existing = new Set(
    stories.map((s) => s.slug?.trim().toLowerCase()).filter(Boolean),
  );
  const extras: PublicStory[] = STATIC_STORY_LISTING.filter(
    (s) => !existing.has(s.slug.toLowerCase()),
  ).map((s, index) => ({
    id: `static-${s.slug}`,
    slug: s.slug,
    title: s.title,
    short_description: s.short_description,
    image_url: null,
    page_url: s.page_url,
    tags: ["art", "community-stories"],
    sort_order: 20 - index,
    created_at: new Date().toISOString(),
    creator_name: s.title,
    creator_is_anonymous: false,
  }));
  return [...stories, ...extras];
}

export default async function StoriesPage() {
  const stories = mergeStaticStories(await getPublicStories());

  return (
    <div
      className={`${bpFontVariables} bg-bp-canvas text-bp-text selection:bg-bp-accent-bg`}
    >
      <StoriesHero />
      <StoriesPageClient stories={stories} />
      <Footer />
    </div>
  );
}
