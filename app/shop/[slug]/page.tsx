import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { notFound } from "next/navigation";
import Footer from "components/layout/footer";
import { HomeCta, PolaroidFrame, SectionEyebrow } from "components/home/home-decor";
import {
  bpBodyClass,
  bpBodySmClass,
  bpFontVariables,
  PAGE_HERO_CONTAINER_CLASS,
  PAGE_HERO_GRID_SPLIT_CLASS,
  PAGE_HERO_H1_MINIMAL_CLASS,
  PAGE_HERO_INTRO_CLASS,
  PAGE_HERO_POLAROID_WRAP_CLASS,
  PAGE_HERO_SECTION_COMPACT_CLASS,
  bpWhisperUtility,
} from "components/home/home-typography";
import { ShopProductCard } from "components/shop/shop-product-card";
import { displayImageUrl } from "lib/image-url";
import { sizeAvailabilityFromVariants } from "lib/product-variants";
import { BOX_CATEGORY_ROWS } from "lib/shop-box-config";
import { getShopCategoryBySlug } from "lib/supabase/categories";
import { getCollectionProducts } from "lib/supabase/products";
import { loadVariantsByProductIds } from "lib/supabase/product-variant-stock";
import { TextureSection } from "components/shared/texture-section";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getShopCategoryBySlug(slug);
  if (!category) return { title: "Shop" };
  return {
    title: category.name,
    description: category.short_description ?? undefined,
  };
}

export default async function ShopCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getShopCategoryBySlug(slug);
  if (!category) notFound();

  const products = await getCollectionProducts(slug);
  const variantsById = await loadVariantsByProductIds(products);
  const tshirtSlug = BOX_CATEGORY_ROWS.find((row) => row.key === "tshirt")?.slug;
  const isTshirtCategory = slug === tshirtSlug;


  return (
    <div
      className={`${bpFontVariables} bg-bp-canvas text-bp-text selection:bg-bp-accent-bg`}
    >
      <TextureSection
        texture="secondary"
        overlay="heroShell"
        className={PAGE_HERO_SECTION_COMPACT_CLASS}
      >
        <div className={PAGE_HERO_CONTAINER_CLASS}>
          <Link
            href="/shop"
            className={`${bpWhisperUtility} inline-flex items-center text-lg text-bp-text/65 transition-colors hover:text-bp-accent`}
          >
            ← The Archive Shop
          </Link>

          <div className={clsx(PAGE_HERO_GRID_SPLIT_CLASS, "mt-8")}>
            <div>
              <SectionEyebrow>The Archive</SectionEyebrow>
              <h1 className={`${PAGE_HERO_H1_MINIMAL_CLASS} mt-3`}>
                {category.name}
              </h1>
              {category.short_description ? (
                <p className={PAGE_HERO_INTRO_CLASS}>
                  {category.short_description}
                </p>
              ) : null}
              <p className={`${bpBodySmClass} mt-6 text-bp-text/60`}>
                {products.length} {products.length === 1 ? "piece" : "pieces"}
              </p>
            </div>

            {displayImageUrl(category.image_url) ? (
              <PolaroidFrame index={0} className={PAGE_HERO_POLAROID_WRAP_CLASS}>
                <div className="relative aspect-[3/4] max-h-[400px] w-full overflow-hidden bg-bp-surface">
                  <Image
                    src={displayImageUrl(category.image_url)!}
                    alt=""
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </PolaroidFrame>
            ) : null}
          </div>
        </div>
      </TextureSection>

      <TextureSection
        texture="secondary"
        className="px-4 py-12 md:px-10 md:py-16"
      >
        <div className="mx-auto max-w-[1400px]">
          {products.length === 0 ? (
            <p className="text-center text-2xl text-bp-text/50">
              No products in this category yet.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-10">
              {products.map((product, index) => (
                <ShopProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  sizes={
                    isTshirtCategory
                      ? sizeAvailabilityFromVariants(
                          variantsById.get(product.id) ?? [],
                        )
                      : []
                  }
                />
              ))}
            </div>
          )}

          <div className="mt-14 flex flex-wrap justify-center gap-4 border-t border-bp-text/10 pt-10">
            <HomeCta href="/shop" variant="outline">
              ← All categories
            </HomeCta>
            <HomeCta href="/stories" variant="primary">
              Read the stories →
            </HomeCta>
          </div>
        </div>
      </TextureSection>

      <Footer />
    </div>
  );
}
