import Footer from "components/layout/footer";
import { CategoryRow } from "components/shop/category-row";
import { KettleGalleryAnnounce } from "components/shop/kettle-gallery-announce";
import { ShopHero } from "components/shop/shop-hero";
import { ShopValuesBar } from "components/shop/shop-values-bar";
import { getShopCategories } from "lib/supabase/categories";

export const metadata = {
  title: "The Archive Shop",
  description: "Art, objects and editions created through lived experience — Brush Past (UK).",
};

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const categories = await getShopCategories();

  return (
    <div className="bg-bp-canvas text-bp-text">
      <ShopHero />
      <section id="categories" className="mx-auto max-w-[1400px] px-4 md:px-10">
        {categories.length === 0 ? (
          <p className="py-20 text-center text-bp-text/60">
            Categories coming soon. Add them in the admin panel.
          </p>
        ) : (
          categories.map((category, index) => (
            <CategoryRow key={category.id} category={category} index={index} />
          ))
        )}
      </section>
      <KettleGalleryAnnounce />
      <ShopValuesBar />
      <Footer />
    </div>
  );
}
