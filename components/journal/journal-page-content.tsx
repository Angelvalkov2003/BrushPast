import type { PublicJournalPost } from "lib/supabase/journal";
import { HomeSectionTitle } from "components/home/home-decor";
import { homeHandClass } from "components/home/home-typography";
import { TextureSection } from "components/shared/texture-section";
import { JournalPostCard } from "./journal-post-card";

export function JournalPageContent({ posts }: { posts: PublicJournalPost[] }) {
  return (
    <TextureSection texture="secondary" className="px-4 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1400px]">
        <HomeSectionTitle eyebrow="From the road" title="Latest entries" align="left" />

        {posts.length === 0 ? (
          <p className={`${homeHandClass} mt-12 text-center text-2xl text-bp-text/50`}>
            Journal updates coming soon.
          </p>
        ) : (
          <div className="mt-14 grid gap-10 md:grid-cols-2 lg:gap-12">
            {posts.map((post, index) => (
              <JournalPostCard key={post.id} post={post} index={index} />
            ))}
          </div>
        )}
      </div>
    </TextureSection>
  );
}
