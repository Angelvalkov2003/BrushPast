import Footer from "components/layout/footer";
import { Gallery } from "components/product/gallery";
import { BackButton } from "components/product/back-button";
import { ProductDescription } from "components/product/product-description";
import { ShopProductCard } from "components/shop/shop-product-card";
import { getProductDetail } from "lib/supabase/product-detail";
import { getProducts } from "lib/supabase/products";
import type { Image } from "lib/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = await getProductDetail(params.handle);

  if (!product) return notFound();

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
    <div className="bg-bp-canvas text-bp-text">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />

      <div className="mx-auto max-w-[1400px] px-4 py-8 md:px-10 md:py-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <div>
            <BackButton />
            <Gallery images={galleryImages} />
          </div>
          <div className="lg:py-2">
            <ProductDescription product={product} />
          </div>
        </div>

        <RelatedProducts category={product.category} currentId={product.id} />
      </div>

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
      <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-bp-accent">
        From the same collection
      </h2>
      <p className="mt-2 text-2xl font-bold uppercase tracking-wide text-bp-text md:text-3xl">
        You may also like
      </p>
      <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {relatedProducts.map((item) => (
          <li key={item.id}>
            <ShopProductCard product={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}
