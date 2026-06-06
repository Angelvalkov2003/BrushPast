import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "components/layout/footer";
import { ShopProductCard } from "components/shop/shop-product-card";
import { displayImageUrl } from "lib/image-url";
import { getShopCategoryBySlug } from "lib/supabase/categories";
import { getCollectionProducts } from "lib/supabase/products";
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
    <div className="bg-bp-canvas text-bp-text">
      <div className="border-b border-bp-text/10 px-4 py-8 md:px-10 md:py-12">
        <div className="mx-auto max-w-[1400px]">
          <Link
            href="/shop"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-bp-accent hover:underline"
          >
            ← The Archive Shop
          </Link>
          <div className="mt-8 grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-bp-accent">The Archive</p>
              <h1 className="mt-2 text-4xl font-bold uppercase tracking-tight md:text-5xl lg:text-6xl">
                {category.name}
              </h1>
              {category.short_description ? (
                <p className="mt-4 max-w-lg text-lg text-bp-text/80">{category.short_description}</p>
              ) : null}
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-bp-text/60">
                {products.length} {products.length === 1 ? "product" : "products"}
              </p>
            </div>
            {displayImageUrl(category.image_url) ? (
              <div className="relative aspect-[4/3] max-h-[360px] w-full overflow-hidden rounded-sm bg-bp-surface">
                <Image
                  src={displayImageUrl(category.image_url)!}
                  alt=""
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-[1400px] px-4 py-12 md:px-10 md:py-16">
        {products.length === 0 ? (
          <p className="text-center text-bp-text/60">No products in this category yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
            {products.map((product) => (
              <ShopProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        <div className="mt-12 border-t border-bp-text/10 pt-8">
          <Link
            href="/shop"
            className="text-xs font-bold uppercase tracking-[0.2em] text-bp-text hover:text-bp-accent"
          >
            ← All categories
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
