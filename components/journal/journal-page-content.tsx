import type { PublicJournalPost } from "lib/supabase/journal";
import { HomeSectionTitle } from "components/home/home-decor";
import { Reveal, REVEAL_STAGGER_MS } from "components/shared/reveal";
import { TextureSection } from "components/shared/texture-section";
import { JournalPostCard } from "./journal-post-card";

export function JournalPageContent({ posts }: { posts: PublicJournalPost[] }) {
  return (
    <TextureSection texture="secondary" className="px-4 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <HomeSectionTitle eyebrow="From the road" title="Latest entries" align="left" />
        </Reveal>

        {posts.length === 0 ? (
          <p className="mt-12 text-center text-2xl text-bp-text/50">
            Journal updates coming soon.
          </p>
        ) : (
          <div className="mt-14 grid gap-10 md:grid-cols-2 lg:gap-12">
            {posts.map((post, index) => (
              <Reveal key={post.id} variant="fade-scale" delay={index * REVEAL_STAGGER_MS}>
                <JournalPostCard post={post} index={index} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </TextureSection>
  );
}
