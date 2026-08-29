import Footer from "components/layout/footer";
import { Gallery } from "components/product/gallery";
import { BackButton } from "components/product/back-button";
import { ProductDescription } from "components/product/product-description";
import { ProductRelations } from "components/product/product-relations";
import { HomeSectionTitle } from "components/home/home-decor";
import { bpFontVariables } from "components/home/home-typography";
import { ShopProductCard } from "components/shop/shop-product-card";
import { TextureSection } from "components/shared/texture-section";
import { getProductDetail } from "lib/supabase/product-detail";
import { getProducts } from "lib/supabase/products";
import type { Image } from "lib/types";
import type { Metadata } from "next";
import { connection } from "next/server";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  await connection();
  const params = await props.params;
  const product = await getProductDetail(params.handle);

  if (!product) {
    return { title: "Product" };
  }

  const { url, width, height, altText: alt } = product.featuredImage || {};

  return {
    title: product.title,
    description: product.shortDescription || product.description,
    robots: {
      index: product.available,
      follow: product.available,
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt: alt || product.title,
            },
          ],
        }
      : null,
  };
}

export default async function ProductPage(props: {
  params: Promise<{ handle: string }>;
}) {
  await connection();
  const params = await props.params;
  const product = await getProductDetail(params.handle);

  if (!product) return notFound();

  const galleryImages = [
    {
      src: product.featuredImage?.url || "",
      altText: product.featuredImage?.altText || product.title,
    },
    ...(product.images || []).slice(0, 4).map((image: Image) => ({
      src: image.url,
      altText: image.altText || product.title,
    })),
  ].filter((img) => img.src);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.fullDescription || product.description,
    image: product.featuredImage?.url || "",
    offers: {
      "@type": "Offer",
      availability: product.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceCurrency: "GBP",
      price: product.price,
    },
  };

  return (
    <div
      className={`${bpFontVariables} bg-bp-canvas text-bp-text selection:bg-bp-accent-bg`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />

      <TextureSection texture="primary" className="overflow-x-clip px-4 py-8 md:px-10 md:py-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14 xl:gap-16">
            <div className="min-w-0">
              <BackButton />
              <Gallery images={galleryImages} outOfStock={!product.available} />
            </div>
            <div className="min-w-0 lg:row-span-2 lg:row-start-1 lg:col-start-2">
              <ProductDescription product={product} />
            </div>
            <div className="min-w-0 lg:col-start-1 lg:row-start-2">
              <ProductRelations product={product} />
            </div>
          </div>

          <RelatedProducts category={product.category} currentId={product.id} />
        </div>
      </TextureSection>

      <Footer />
    </div>
  );
}

async function RelatedProducts({
  category,
  currentId,
}: {
  category?: string;
  currentId: string;
}) {
  if (!category) return null;

  const relatedProducts = await getProducts({
    collection: category,
    limit: 4,
    excludeId: currentId,
  });

  if (!relatedProducts.length) return null;

  return (
    <section className="mt-16 border-t border-bp-text/10 pt-12 md:mt-20 md:pt-16">
      <HomeSectionTitle eyebrow="From the same collection" title="You may also like" align="left" />
      <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {relatedProducts.map((item, index) => (
          <li key={item.id}>
            <ShopProductCard product={item} index={index} />
          </li>
        ))}
      </ul>
    </section>
  );
}
