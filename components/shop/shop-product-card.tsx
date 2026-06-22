import Image from "next/image";
import Link from "next/link";
import { PolaroidFrame } from "components/home/home-decor";
import { homeHandClass, homeSerifClass } from "components/home/home-typography";
import { isValidImageUrl } from "lib/image-url";
import type { Product } from "lib/types";
import { formatPrice } from "lib/currency";

export function ShopProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const subtitle =
    product.description.length > 80
      ? `${product.description.slice(0, 80)}…`
      : product.description;

  return (
    <Link href={`/product/${product.handle}`} className="group block focus-visible:outline-offset-4">
      <PolaroidFrame index={index + 1} className="group-hover:rotate-0">
        <div className="relative aspect-square overflow-hidden bg-bp-text/5">
          <Image
            src={
              isValidImageUrl(product.featuredImage?.url)
                ? product.featuredImage!.url
                : "/placeholder-image.jpg"
            }
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 50vw, 25vw"
          />
        </div>
        <p
          className={`${homeHandClass} mt-3 line-clamp-2 text-center text-lg font-bold leading-snug text-bp-text`}
        >
          {product.title}
        </p>
      </PolaroidFrame>
      {subtitle ? (
        <p
          className={`${homeSerifClass} mt-3 text-center text-xs leading-relaxed text-bp-text/65`}
        >
          {subtitle}
        </p>
      ) : null}
      <p className={`${homeHandClass} mt-2 text-center text-lg text-bp-accent`}>
        {formatPrice(product.price)}
      </p>
    </Link>
  );
}
