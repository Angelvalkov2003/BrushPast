import Footer from "components/layout/footer";
import { HomeHero } from "components/home/home-hero";
import { HomeGiftBoxes } from "components/home/home-gift-boxes";
import { ShopHero } from "components/shop/shop-hero";
import { HomeShopWays } from "components/home/home-shop-ways";
import { HomeStoriesPreview } from "components/home/home-stories-preview";
import { HomeHowItWorks } from "components/home/home-how-it-works";
import { HomeNewsletter } from "components/home/home-newsletter";
import { bpFontVariables } from "components/home/home-typography";
import { getShopCategories } from "lib/supabase/categories";
import { getPublicStories } from "lib/supabase/stories";
import { SITE_NAME, SITE_TAGLINE } from "lib/site-config";

export const metadata = {
  title: {
    absolute: SITE_NAME,
  },
  description: SITE_TAGLINE,
  openGraph: {
    title: SITE_NAME,
    description: SITE_TAGLINE,
    type: "website",
  },
  twitter: {
    card: "summary_large_image" as const,
    title: SITE_NAME,
    description: SITE_TAGLINE,
  },
};

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [categories, stories] = await Promise.all([
    getShopCategories(),
    getPublicStories(),
  ]);

  return (
    <div
      className={`${bpFontVariables} max-w-full overflow-x-clip bg-bp-canvas text-bp-text selection:bg-bp-accent-bg`}
    >
      <HomeHero />
      <HomeGiftBoxes />
      <ShopHero embedded />
      <HomeShopWays categories={categories} />
      <HomeStoriesPreview stories={stories} />
      <HomeHowItWorks />
      <HomeNewsletter />
      <Footer />
    </div>
  );
}
