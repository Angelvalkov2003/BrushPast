import Link from "next/link";
import { Reveal, REVEAL_STAGGER_MS } from "components/shared/reveal";
import { TextureSection } from "components/shared/texture-section";
import type { PublicStory } from "lib/supabase/stories";
import { HomeSectionTitle } from "./home-decor";
import { HomeStoryTeaser } from "./home-story-teaser";

const FEATURED_COUNT = 3;

export function HomeStoriesPreview({ stories }: { stories: PublicStory[] }) {
  const featured = stories.slice(0, FEATURED_COUNT);

  return (
    <TextureSection texture="secondary" overlay="story" className="px-4 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <HomeSectionTitle
              align="left"
              eyebrow="From our community"
              title="Stories worth keeping"
              className="mb-0"
              eyebrowVariant="workshop"
            />
            <Link
              href="/stories"
              className="shrink-0 text-xl text-bp-accent transition-colors hover:text-bp-text"
            >
              Read more →
            </Link>
          </div>
        </Reveal>

        {featured.length === 0 ? (
          <p className="mt-12 text-center text-2xl text-bp-text/50">
            Stories coming soon.
          </p>
        ) : (
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {featured.map((story, index) => (
              <Reveal key={story.id} variant="fade-scale" delay={index * REVEAL_STAGGER_MS}>
                <HomeStoryTeaser story={story} index={index} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </TextureSection>
  );
}
