"use client";

import clsx from "clsx";
import Image from "next/image";
import { PolaroidFrame } from "components/home/home-decor";
import { bpWhisperUtility } from "components/home/home-typography";
import { formatPrice } from "lib/currency";
import { isValidImageUrl } from "lib/image-url";
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

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled || !product.available}
      aria-pressed={selected}
      className={clsx(
        "w-[11.5rem] shrink-0 snap-start text-left focus-visible:outline-offset-4 sm:w-[13rem]",
        (disabled || !product.available) && "cursor-not-allowed opacity-40",
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
              className="object-cover"
              sizes="208px"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-3 text-center">
              <span className={`${bpWhisperUtility} text-sm text-bp-text/35`}>
                No image
              </span>
            </div>
          )}
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
      <p className="mt-1 text-center text-sm text-bp-accent">
        {formatPrice(product.price)}
      </p>
    </button>
  );
}
