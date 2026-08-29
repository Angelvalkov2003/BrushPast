"use client";

import clsx from "clsx";
import Image from "next/image";
import { PolaroidFrame } from "components/home/home-decor";
import { bpWhisperUtility } from "components/home/home-typography";
import { OutOfStockPlaque } from "components/shop/out-of-stock-plaque";
import { ProductSizeRow } from "components/shop/product-size-row";
import { formatPrice } from "lib/currency";
import { isValidImageUrl } from "lib/image-url";
import { sizeAvailabilityFromVariants } from "lib/product-variants";
import type { BoxCatalogProduct } from "lib/supabase/shop-box-products";

export function BoxProductTile({
  product,
  selected,
  disabled,
  onSelect,
  index = 0,
}: {
  product: BoxCatalogProduct;
  selected: boolean;
  disabled?: boolean;
  onSelect: () => void;
  index?: number;
}) {
  const imageUrl = product.featuredImage?.url;
  const outOfStock = !product.available;
  const sizes =
    product.categoryKey === "tshirt"
      ? sizeAvailabilityFromVariants(product.variants)
      : [];

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled || outOfStock}
      aria-pressed={selected}
      aria-label={
        outOfStock ? `${product.title} — out of stock` : product.title
      }
      className={clsx(
        "w-[11.5rem] shrink-0 snap-start text-left focus-visible:outline-offset-4 sm:w-[13rem]",
        (disabled || outOfStock) && "cursor-not-allowed",
        disabled && product.available && "opacity-40",
      )}
    >
      <PolaroidFrame
        index={index}
        tilt={false}
        className={clsx(
          "pb-7 transition-shadow",
          selected && "ring-2 ring-inset ring-bp-accent",
        )}
      >
        <div className="relative aspect-square overflow-hidden bg-bp-text/5">
          {isValidImageUrl(imageUrl) ? (
            <Image
              src={imageUrl}
              alt={product.title}
              fill
              className={clsx("object-cover", outOfStock && "opacity-70")}
              sizes="208px"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-3 text-center">
              <span className={`${bpWhisperUtility} text-sm text-bp-text/35`}>
                No image
              </span>
            </div>
          )}
          {outOfStock ? <OutOfStockPlaque size="sm" /> : null}
        </div>
        <div className="mt-2 flex justify-center">
          <span
            className={clsx(
              "h-3.5 w-3.5 rounded-full border-2",
              selected
                ? "border-bp-accent bg-bp-accent"
                : "border-bp-text/30 bg-transparent",
            )}
            aria-hidden
          />
        </div>
      </PolaroidFrame>
      <p className="mt-2 line-clamp-2 text-center text-sm font-bold leading-snug text-bp-text">
        {product.title}
      </p>
      <ProductSizeRow sizes={sizes} />
      <p className="mt-1 text-center text-sm text-bp-accent">
        {formatPrice(product.price)}
      </p>
    </button>
  );
}
