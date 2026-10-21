"use client";

import clsx from "clsx";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PolaroidFrame } from "components/home/home-decor";
import {
  bpBodySmClass,
  bpTitleClass,
  bpTitleUtility,
  bpWhisperUtility,
} from "components/home/home-typography";
import { OutOfStockPlaque } from "components/shop/out-of-stock-plaque";
import { ProductSizeRow } from "components/shop/product-size-row";
import { formatPrice } from "lib/currency";
import { isValidImageUrl } from "lib/image-url";
import { boxUnitPriceForProduct } from "lib/shop-box-config";
import { sizeAvailabilityFromVariants } from "lib/product-variants";
import type { BoxCatalogProduct } from "lib/supabase/shop-box-products";

export function BoxProductTile({
  product,
  selected,
  selectedQuantity = 0,
  disabled,
  onSelect,
  onRemove,
  index = 0,
  layout = "grid",
}: {
  product: BoxCatalogProduct;
  selected: boolean;
  /** BYO: how many of this design are already in the box */
  selectedQuantity?: number;
  disabled?: boolean;
  onSelect: () => void;
  /** When set and product is in the box, show an X to clear the selection */
  onRemove?: () => void;
  index?: number;
  /** grid = 3-up; stack = larger / fewer columns */
  layout?: "grid" | "stack";
}) {
  const inBox = selected || selectedQuantity > 0;
  const imageUrl = product.featuredImage?.url;
  const outOfStock = !product.available;
  const displayPrice = boxUnitPriceForProduct(product);
  const sizes =
    product.categoryKey === "tshirt"
      ? sizeAvailabilityFromVariants(product.variants)
      : [];
  const stacked = layout === "stack";

  return (
    <div className="min-w-0">
      <button
        type="button"
        onClick={onSelect}
        disabled={disabled || outOfStock}
        aria-pressed={inBox}
        aria-label={
          outOfStock
            ? `${product.title} — out of stock`
            : selectedQuantity > 0
              ? `${product.title}, ${selectedQuantity} in your box`
              : product.title
        }
        className={clsx(
          "group w-full min-w-0 text-left focus-visible:outline-offset-4",
          (disabled || outOfStock) && "cursor-not-allowed",
          disabled && product.available && "opacity-40",
        )}
      >
        <div
          className={clsx(
            "relative transition-transform duration-300",
            inBox
              ? "rotate-0"
              : index % 2 === 0
                ? "rotate-[-0.8deg]"
                : "rotate-[0.8deg]",
            "group-hover:rotate-0",
          )}
        >
          <div
            className="pointer-events-none absolute -left-1.5 -top-1.5 h-8 w-8 border-l border-t border-bp-accent/50 opacity-0 transition-opacity group-hover:opacity-100"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-1.5 -right-1.5 h-8 w-8 border-b border-r border-bp-accent/50 opacity-0 transition-opacity group-hover:opacity-100"
            aria-hidden
          />

          <PolaroidFrame
            index={index}
            tilt={false}
            className={clsx(
              "pb-6 shadow-[4px_5px_0_rgba(1,2,0,0.05)] transition-shadow",
              inBox &&
                "ring-2 ring-inset ring-bp-accent shadow-[6px_7px_0_rgba(191,50,1,0.12)]",
            )}
          >
            <div
              className={clsx(
                "relative overflow-hidden bg-bp-text/5",
                stacked ? "aspect-[4/5] sm:aspect-[5/4]" : "aspect-square",
              )}
            >
              {isValidImageUrl(imageUrl) ? (
                <Image
                  src={imageUrl}
                  alt={product.title}
                  fill
                  className={clsx(
                    "object-cover transition-transform duration-500 group-hover:scale-[1.03]",
                    outOfStock && "opacity-70",
                  )}
                  sizes={
                    stacked
                      ? "(max-width: 640px) 100vw, 50vw"
                      : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  }
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-1 px-4 text-center">
                  <span
                    className={`${bpWhisperUtility} text-base text-bp-text/35 sm:text-lg`}
                  >
                    No image
                  </span>
                  <span className={`${bpBodySmClass} text-bp-text/30`}>
                    Photo to come
                  </span>
                </div>
              )}
              {outOfStock ? <OutOfStockPlaque size="sm" /> : null}
              {selectedQuantity > 0 ? (
                <span
                  className={`${bpTitleClass} ${bpTitleUtility} absolute right-2 top-2 min-w-[1.75rem] rounded-full bg-bp-accent px-2 py-0.5 text-center text-xs font-bold text-bp-canvas shadow-[2px_2px_0_rgba(1,2,0,0.15)]`}
                >
                  ×{selectedQuantity}
                </span>
              ) : null}
            </div>

            <div className="mt-2.5 flex items-center justify-between gap-2 px-0.5">
              <span
                className={clsx(
                  "h-3.5 w-3.5 shrink-0 rounded-full border-2 transition-colors",
                  inBox
                    ? "border-bp-accent bg-bp-accent"
                    : "border-bp-text/30 bg-transparent group-hover:border-bp-accent/50",
                )}
                aria-hidden
              />
              <p
                className={`${bpTitleClass} ${bpTitleUtility} text-[10px] font-bold uppercase tracking-[0.14em] text-bp-accent`}
              >
                {formatPrice(displayPrice)}
              </p>
            </div>
          </PolaroidFrame>
        </div>

        <p
          className={clsx(
            `${bpTitleClass} ${bpTitleUtility} mt-3 font-bold leading-snug text-bp-text`,
            stacked
              ? "line-clamp-2 text-base sm:text-lg"
              : "line-clamp-2 text-sm sm:text-[0.95rem]",
          )}
        >
          {product.title}
        </p>
        {product.description ? (
          <p
            className={clsx(
              `${bpBodySmClass} mt-1 text-bp-text/60`,
              stacked ? "line-clamp-2" : "line-clamp-1 hidden sm:block",
            )}
          >
            {product.description}
          </p>
        ) : null}
        <div className="mt-2">
          <ProductSizeRow sizes={sizes} />
        </div>
      </button>

      {inBox && onRemove ? (
        <div className="mt-3 flex justify-center">
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex h-8 w-8 items-center justify-center border border-bp-text/20 bg-bp-canvas text-bp-text/70 transition-colors hover:border-bp-accent hover:text-bp-accent"
            aria-label={`Remove ${product.title} from your box`}
            title="Remove from box"
          >
            <XMarkIcon className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>
      ) : null}
    </div>
  );
}
