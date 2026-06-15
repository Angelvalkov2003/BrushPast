import Footer from "components/layout/footer";
import { JournalHero } from "components/journal/journal-hero";
import { JournalPageContent } from "components/journal/journal-page-content";
import { getPublicJournalPosts } from "lib/supabase/journal";

export const metadata = {
  title: "Journal",
  description: "News, workshops, shop drops and moments from the BrushPast journey.",
};

export const dynamic = "force-dynamic";

export default async function JournalPage() {
  const posts = await getPublicJournalPosts();

  return (
    <div className="bg-bp-canvas text-bp-text">
      <JournalHero />
      <JournalPageContent posts={posts} />
      <Footer />
    </div>
  );
}
