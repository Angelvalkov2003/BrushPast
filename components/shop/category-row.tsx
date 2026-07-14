import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { PolaroidFrame } from "components/home/home-decor";
import {
  bpBodyClass,
  bpLinkUtility,
  bpTitleClass,
  bpTitleUtility,
  bpWhisperUtility,
  homeHandClass,
} from "components/home/home-typography";
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
        "group grid gap-10 border-b border-bp-text/10 py-12 md:grid-cols-2 md:items-center md:gap-14 md:py-16",
        reversed && "md:[&>div:first-child]:order-2",
      )}
    >
      <div className={reversed ? "md:pl-4" : "md:pr-4"}>
        <h2
          className={`${bpTitleClass} ${bpTitleUtility} text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-tight text-bp-text`}
        >
          {category.name}
        </h2>
        {category.short_description ? (
          index === 0 ? (
            <p
              className={`${homeHandClass} ${bpWhisperUtility} mt-4 max-w-md text-[clamp(1.65rem,3.5vw,2.25rem)] leading-snug text-bp-text/85`}
            >
              {category.short_description}
            </p>
          ) : (
            <p className={`${bpBodyClass} mt-4 max-w-md text-bp-text/80`}>
              {category.short_description}
            </p>
          )
        ) : null}
        <p
          className={`${bpBodyClass} ${bpLinkUtility} mt-6 font-bold text-bp-accent opacity-80 transition-opacity group-hover:opacity-100`}
        >
          {cta} →
        </p>
      </div>

      <PolaroidFrame index={index + 1} className="group-hover:rotate-0">
        <div className="relative aspect-[3/4] min-h-[280px] w-full overflow-hidden bg-bp-text/5 md:min-h-[380px]">
          {displayImageUrl(category.image_url) ? (
            <Image
              src={displayImageUrl(category.image_url)!}
              alt=""
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div
              className={`${bpWhisperUtility} flex h-full items-center justify-center text-xl text-bp-text/35`}
            >
              {category.name}
            </div>
          )}
        </div>
      </PolaroidFrame>
    </Link>
  );
}
