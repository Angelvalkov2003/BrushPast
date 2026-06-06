import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { displayImageUrl } from "lib/image-url";
import type { ShopCategory } from "lib/supabase/categories";
import { categoryCtaLabel } from "lib/shop-display";

export function CategoryRow({
  category,
  index,
}: {
  category: ShopCategory;
  index: number;
}) {
  const reversed = index % 2 === 1;
  const cta = categoryCtaLabel(category);

  return (
    <Link
      href={`/shop/${category.slug}`}
      className={clsx(
        "group grid gap-8 border-b border-bp-text/10 py-12 md:grid-cols-2 md:items-center md:gap-12 md:py-16",
        reversed && "md:[&>div:first-child]:order-2",
      )}
    >
      <div className={reversed ? "md:pl-4" : "md:pr-4"}>
        <h2 className="text-3xl font-bold uppercase tracking-wide text-bp-text md:text-4xl lg:text-5xl">
          {category.name}
        </h2>
        {category.short_description ? (
          <p className="mt-4 max-w-md text-base leading-relaxed text-bp-text/75 md:text-lg">
            {category.short_description}
          </p>
        ) : null}
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-bp-text transition-colors group-hover:text-bp-accent">
          {cta} →
        </p>
      </div>

      <div className="relative aspect-[3/4] min-h-[280px] w-full overflow-hidden rounded-sm bg-bp-surface md:min-h-[420px]">
        {displayImageUrl(category.image_url) ? (
          <Image
            src={displayImageUrl(category.image_url)!}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm uppercase tracking-widest text-bp-text/40">
            No image
          </div>
        )}
      </div>
    </Link>
  );
}
