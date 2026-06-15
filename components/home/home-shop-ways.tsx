import Image from "next/image";
import Link from "next/link";
import { displayImageUrl } from "lib/image-url";
import type { ShopCategory } from "lib/supabase/categories";
import { HOME_SHOP_WAYS } from "lib/home-config";

function resolveWays(categories: ShopCategory[]) {
  return HOME_SHOP_WAYS.map((fallback) => {
    const cat = categories.find((c) => c.slug === fallback.slug);
    const href = cat ? `/shop/${cat.slug}` : `/shop/${fallback.slug}`;
    return {
      href,
      title: cat?.name ?? fallback.title,
      description: cat?.short_description ?? fallback.description,
      cta: cat?.shop_cta ?? fallback.cta,
      image: displayImageUrl(cat?.image_url) ?? displayImageUrl(fallback.image) ?? null,
    };
  });
}

export function HomeShopWays({ categories }: { categories: ShopCategory[] }) {
  const ways = resolveWays(categories);

  return (
    <section className="border-b border-bp-text/10 bg-bp-surface px-4 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="text-center text-2xl font-bold uppercase tracking-wide text-bp-text md:text-3xl">
          Three ways to keep a story close
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
          {ways.map((way) => (
            <Link
              key={way.href + way.title}
              href={way.href}
              className="group flex flex-col bg-bp-canvas"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-bp-text/5">
                {displayImageUrl(way.image) ? (
                  <Image
                    src={displayImageUrl(way.image)!}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs uppercase tracking-widest text-bp-text/30">
                    {way.title}
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-bold uppercase tracking-wide text-bp-text">{way.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-bp-text/75">{way.description}</p>
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.15em] text-bp-text group-hover:text-bp-accent">
                  {way.cta} →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
