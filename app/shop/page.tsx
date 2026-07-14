import Footer from "components/layout/footer";
import { CategoryRow } from "components/shop/category-row";
import { KettleGalleryAnnounce } from "components/shop/kettle-gallery-announce";
import { HomeImpact } from "components/home/home-impact";
import { ShopValuesBar } from "components/shop/shop-values-bar";
import { bpBodyClass, bpFontVariables } from "components/home/home-typography";
import { TextureSection } from "components/shared/texture-section";
import { getShopCategories } from "lib/supabase/categories";

export const metadata = {
  title: "The Archive Shop",
  description:
    "Art, objects and editions created through lived experience - Brush Past (UK).",
};

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const categories = await getShopCategories();

  return (
    <div
      className={`${bpFontVariables} bg-bp-canvas text-bp-text selection:bg-bp-accent-bg`}
    >
      <h1 className="sr-only">The Archive Shop</h1>
      <HomeImpact texture="secondary" />
      <TextureSection texture="primary" className="px-4 md:px-10">
        <div id="categories" className="mx-auto max-w-[1400px]">
          {categories.length === 0 ? (
            <p className={`${bpBodyClass} py-20 text-center text-bp-text/50`}>
              Categories coming soon. Add them in the admin panel.
            </p>
          ) : (
            categories.map((category, index) => (
              <CategoryRow
                key={category.id}
                category={category}
                index={index}
              />
            ))
          )}
        </div>
      </TextureSection>
      <KettleGalleryAnnounce />
      <ShopValuesBar />
      <Footer />
    </div>
  );
}
