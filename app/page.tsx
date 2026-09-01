import Footer from "components/layout/footer";
import { HomeHero } from "components/home/home-hero";
import { HomeArchiveShop } from "components/home/home-archive-shop";
import { HomeStoriesPreview } from "components/home/home-stories-preview";
import { HomeHowItWorks } from "components/home/home-how-it-works";
import { HomeNewsletter } from "components/home/home-newsletter";
import { bpFontVariables } from "components/home/home-typography";
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
  const stories = await getPublicStories();

  return (
    <div
      className={`${bpFontVariables} max-w-full overflow-x-clip bg-bp-canvas text-bp-text selection:bg-bp-accent-bg`}
    >
      <HomeHero />
      <HomeArchiveShop />
      <HomeStoriesPreview stories={stories} />
      <HomeHowItWorks />
      <HomeNewsletter />
      <Footer />
    </div>
  );
}
