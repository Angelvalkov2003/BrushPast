import Image from "next/image";
import Link from "next/link";
import { isValidImageUrl } from "lib/image-url";
import type { Product } from "lib/types";
import { formatPrice } from "lib/currency";

export function ShopProductCard({ product }: { product: Product }) {
  const subtitle =
    product.description.length > 80
      ? `${product.description.slice(0, 80)}…`
      : product.description;

  return (
    <Link
      href={`/product/${product.handle}`}
      className="group block"
    >
      <div className="relative aspect-square overflow-hidden rounded-sm bg-bp-surface">
        <Image
          src={
            isValidImageUrl(product.featuredImage?.url)
              ? product.featuredImage!.url
              : "/placeholder-image.jpg"
          }
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 50vw, 25vw"
        />
      </div>
      <h3 className="mt-4 text-sm font-bold uppercase leading-snug tracking-wide text-bp-text">
        {product.title}
      </h3>
      {subtitle ? (
        <p className="mt-1 text-xs text-bp-text/60">{subtitle}</p>
      ) : null}
      <p className="mt-2 text-sm font-medium text-bp-text">{formatPrice(product.price)}</p>
    </Link>
  );
}
