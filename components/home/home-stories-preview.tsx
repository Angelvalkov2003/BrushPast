import Link from "next/link";
import type { PublicStory } from "lib/supabase/stories";
import { HomeStoryTeaser } from "./home-story-teaser";

const FEATURED_COUNT = 3;

export function HomeStoriesPreview({ stories }: { stories: PublicStory[] }) {
  const featured = stories.slice(0, FEATURED_COUNT);

  return (
    <section className="border-b border-bp-text/10 bg-bp-surface px-4 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-2xl font-bold uppercase tracking-wide text-bp-text md:text-3xl">
            Stories from our community
          </h2>
          <Link
            href="/stories"
            className="text-xs font-bold uppercase tracking-[0.2em] text-bp-text transition-colors hover:text-bp-accent"
          >
            Read more →
          </Link>
        </div>

        {featured.length === 0 ? (
          <p className="text-center text-bp-text/60">Stories coming soon.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-3 md:gap-6">
            {featured.map((story) => (
              <HomeStoryTeaser key={story.id} story={story} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
