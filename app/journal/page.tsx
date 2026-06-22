import Footer from "components/layout/footer";
import { JournalHero } from "components/journal/journal-hero";
import { JournalPageContent } from "components/journal/journal-page-content";
import { homeHand, homeSerif } from "components/home/home-typography";
import { getPublicJournalPosts } from "lib/supabase/journal";

export const metadata = {
  title: "Journal",
  description: "News, workshops, shop drops and moments from the BrushPast journey.",
};

export const dynamic = "force-dynamic";

export default async function JournalPage() {
  const posts = await getPublicJournalPosts();

  return (
    <div
      className={`${homeHand.variable} ${homeSerif.variable} bg-bp-canvas text-bp-text selection:bg-bp-accent/20`}
    >
      <JournalHero />
      <JournalPageContent posts={posts} />
      <Footer />
    </div>
  );
}
