import { ShopProductCard } from "components/shop/shop-product-card";
import { RevealSection } from "components/shared/reveal-section";
import type { Product } from "lib/types";

/**
 * At most one related shop product under a story.
 * Hide entirely when there is no suitable product (caller passes null).
 */
export function StoryRelatedProductSection({
  product,
  note,
  className = "border-b border-bp-text/10 px-4 py-14 md:px-10 md:py-20",
}: {
  product: Product | null;
  note?: string;
  className?: string;
}) {
  if (!product) return null;

  return (
    <RevealSection className={className}>
      <div className="mx-auto max-w-[1400px]">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-bp-accent">
          From this story
        </p>
        <h2 className="mt-2 text-2xl font-bold uppercase tracking-wide md:text-3xl">
          Take a piece home
        </h2>
        {note ? (
          <p className="mt-3 max-w-xl text-sm text-bp-text/70">{note}</p>
        ) : null}
        <div className="mx-auto mt-10 w-full max-w-[20rem] sm:max-w-[22rem] md:mx-0 md:max-w-[24rem]">
          <ShopProductCard
            product={product}
            imageSizes="(max-width: 640px) 85vw, 24rem"
          />
        </div>
      </div>
    </RevealSection>
  );
}
