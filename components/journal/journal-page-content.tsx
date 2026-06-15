import type { PublicJournalPost } from "lib/supabase/journal";
import { JournalPostCard } from "./journal-post-card";

export function JournalPageContent({ posts }: { posts: PublicJournalPost[] }) {
  return (
    <section className="border-b border-bp-text/10 bg-bp-surface px-4 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1400px]">
        {posts.length === 0 ? (
          <p className="text-center text-bp-text/60">Journal updates coming soon.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
            {posts.map((post) => (
              <JournalPostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
