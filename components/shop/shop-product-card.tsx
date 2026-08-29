import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { PolaroidFrame } from "components/home/home-decor";
import { bpWhisperUtility } from "components/home/home-typography";
import { OutOfStockPlaque } from "components/shop/out-of-stock-plaque";
import { ProductSizeRow } from "components/shop/product-size-row";
import { isValidImageUrl } from "lib/image-url";
import type { SizeAvailability } from "lib/product-variants";
import type { Product } from "lib/types";
import { formatPrice } from "lib/currency";

export function ShopProductCard({
  product,
  index = 0,
  sizes = [],
}: {
  product: Product;
  index?: number;
  sizes?: SizeAvailability[];
}) {
  const subtitle =
    product.description.length > 80
      ? `${product.description.slice(0, 80)}…`
      : product.description;
  const outOfStock = !product.available;

  return (
    <Link
      href={`/product/${product.handle}`}
      className="group block focus-visible:outline-offset-4"
      aria-label={
        outOfStock ? `${product.title} — out of stock` : product.title
      }
    >
      <PolaroidFrame index={index + 1} className="group-hover:rotate-0">
        <div className="relative aspect-square overflow-hidden bg-bp-text/5">
          {isValidImageUrl(product.featuredImage?.url) ? (
            <Image
              src={product.featuredImage!.url}
              alt={product.title}
              fill
              className={clsx(
                "object-cover transition-transform duration-500 group-hover:scale-[1.03]",
                outOfStock && "opacity-70",
              )}
              sizes="(max-width: 640px) 50vw, 25vw"
            />
          ) : (
            <div
              className="flex h-full items-center justify-center px-3 text-center"
              aria-hidden
            >
              <span className={`${bpWhisperUtility} text-sm text-bp-text/35`}>
                No image
              </span>
            </div>
          )}
          {outOfStock ? <OutOfStockPlaque /> : null}
        </div>
        <p className="mt-3 line-clamp-2 text-center text-lg font-bold leading-snug text-bp-text">
          {product.title}
        </p>
      </PolaroidFrame>
      <ProductSizeRow sizes={sizes} className="mt-2" />
      {subtitle ? (
        <p
          className={`${bpWhisperUtility} mt-3 text-center text-xs leading-relaxed text-bp-text/65`}
        >
          {subtitle}
        </p>
      ) : null}
      <p className="mt-2 text-center text-lg text-bp-accent">
        {formatPrice(product.price)}
      </p>
    </Link>
  );
}
