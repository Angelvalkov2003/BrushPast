import Footer from "components/layout/footer";
import { StoriesHero } from "components/stories/stories-hero";
import { StoriesPageClient } from "components/stories/stories-page-client";
import { bpFontVariables } from "components/home/home-typography";
import { getPublicStories } from "lib/supabase/stories";

export const metadata = {
  title: "Stories",
  description: "Art. Writing. Photography. Real people. Real voices - Brush Past.",
};

export const dynamic = "force-dynamic";

export default async function StoriesPage() {
  const stories = await getPublicStories();

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
