import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "components/layout/footer";
import { HomeCta, PolaroidFrame } from "components/home/home-decor";
import { homeHand, homeSerif, homeHandClass, homeSerifClass } from "components/home/home-typography";
import { ShopProductCard } from "components/shop/shop-product-card";
import { displayImageUrl } from "lib/image-url";
import { getShopCategoryBySlug } from "lib/supabase/categories";
import { getCollectionProducts } from "lib/supabase/products";
import { TextureSection } from "components/shared/texture-section";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getShopCategoryBySlug(slug);
  if (!category) return { title: "Shop" };
  return {
    title: category.name,
    description: category.short_description ?? undefined,
  };
}

export default async function ShopCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getShopCategoryBySlug(slug);
  if (!category) notFound();

  const products = await getCollectionProducts(slug);

  return (
    <div
      className={`${homeHand.variable} ${homeSerif.variable} bg-bp-canvas text-bp-text selection:bg-bp-accent/20`}
    >
      <TextureSection texture="secondary" className="px-4 py-10 md:px-10 md:py-14">
        <div className="mx-auto max-w-[1400px]">
          <Link
            href="/shop"
            className={`${homeHandClass} inline-flex items-center text-lg text-bp-text/65 transition-colors hover:text-bp-accent`}
          >
            ← The Archive Shop
          </Link>

          <div className="mt-8 grid gap-10 md:grid-cols-[1fr_1fr] md:items-center md:gap-14">
            <div>
              <p className={`${homeHandClass} text-xl text-bp-accent md:text-2xl`}>The Archive</p>
              <h1
                className={`${homeHandClass} mt-1 text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[0.92] text-bp-text`}
              >
                {category.name}
              </h1>
              {category.short_description ? (
                <p
                  className={`${homeSerifClass} mt-4 max-w-lg text-lg italic leading-relaxed text-bp-text/85`}
                >
                  {category.short_description}
                </p>
              ) : null}
              <p className={`${homeHandClass} mt-6 text-lg text-bp-text/60`}>
                {products.length} {products.length === 1 ? "piece" : "pieces"}
              </p>
            </div>

            {displayImageUrl(category.image_url) ? (
              <PolaroidFrame index={0} className="mx-auto max-w-md md:max-w-none">
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

      <section className="border-b border-bp-text/10 bg-bp-canvas px-4 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-[1400px]">
          {products.length === 0 ? (
            <p className={`${homeHandClass} text-center text-2xl text-bp-text/50`}>
              No products in this category yet.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-10">
              {products.map((product, index) => (
                <ShopProductCard key={product.id} product={product} index={index} />
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
      </section>

      <Footer />
    </div>
  );
}
