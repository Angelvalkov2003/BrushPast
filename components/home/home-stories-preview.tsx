import Link from "next/link";
import type { PublicStory } from "lib/supabase/stories";
import { HomeStoryTeaser } from "./home-story-teaser";

export function HomeStoriesPreview({ stories }: { stories: PublicStory[] }) {
  const featured = stories.slice(0, 4);

  return (
    <section className="border-b border-bp-text/10 bg-bp-canvas px-4 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-2xl font-bold uppercase tracking-wide text-bp-text md:text-3xl">
            Stories from our community
          </h2>
          <Link
            href="/stories"
            className="text-xs font-bold uppercase tracking-[0.2em] text-bp-accent hover:underline"
          >
            See more stories →
          </Link>
        </div>

        {featured.length === 0 ? (
          <p className="text-center text-bp-text/60">Stories coming soon.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {featured.map((story) => (
              <HomeStoryTeaser key={story.id} story={story} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
