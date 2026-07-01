import Footer from "components/layout/footer";
import { HomeHero } from "components/home/home-hero";
import { HomeImpact } from "components/home/home-impact";
import { HomeShopWays } from "components/home/home-shop-ways";
import { HomeStoriesPreview } from "components/home/home-stories-preview";
import { HomeHowItWorks } from "components/home/home-how-it-works";
import { HomeNewsletter } from "components/home/home-newsletter";
import { bpFontVariables } from "components/home/home-typography";
import { getShopCategories } from "lib/supabase/categories";
import { getPublicStories } from "lib/supabase/stories";
import { SITE_TAGLINE } from "lib/site-config";

export const metadata = {
  title: "Home",
  description: SITE_TAGLINE,
  openGraph: { type: "website" },
};

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [categories, stories] = await Promise.all([getShopCategories(), getPublicStories()]);

  return (
    <div
      className={`${bpFontVariables} bg-bp-canvas text-bp-text selection:bg-bp-accent-bg`}
    >
      <HomeHero />
      <HomeImpact />
      <HomeShopWays categories={categories} />
      <HomeStoriesPreview stories={stories} />
      <HomeHowItWorks />
      <HomeNewsletter />
      <Footer />
    </div>
  );
}
