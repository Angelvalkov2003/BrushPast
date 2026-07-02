import Image from "next/image";
import Link from "next/link";
import { Reveal, REVEAL_STAGGER_MS } from "components/shared/reveal";
import {
  brushPastIcons,
  BrushPastIconBadge,
  HOME_SHOP_ICON_BY_SLUG,
} from "components/icons/brush-past-icons";
import { displayImageUrl } from "lib/image-url";
import type { ShopCategory } from "lib/supabase/categories";
import { HOME_SHOP_WAYS } from "lib/home-config";
import { HomeSectionTitle, PolaroidFrame } from "./home-decor";
import { homeHandClass } from "./home-typography";
import { HomeTextureSection } from "./home-texture-section";

function resolveWays(categories: ShopCategory[]) {
  return HOME_SHOP_WAYS.map((fallback) => {
    const cat = categories.find((c) => c.slug === fallback.slug);
    const href = cat ? `/shop/${cat.slug}` : `/shop/${fallback.slug}`;
    const iconKey = HOME_SHOP_ICON_BY_SLUG[fallback.slug];
    return {
      href,
      slug: fallback.slug,
      title: cat?.name ?? fallback.title,
      description: cat?.short_description ?? fallback.description,
      cta: cat?.shop_cta ?? fallback.cta,
      image: displayImageUrl(cat?.image_url) ?? displayImageUrl(fallback.image) ?? null,
      icon: iconKey ? brushPastIcons.homepage[iconKey] : brushPastIcons.homepage.wearIt,
    };
  });
}

export function HomeShopWays({ categories }: { categories: ShopCategory[] }) {
  const ways = resolveWays(categories);

  return (
    <HomeTextureSection texture="secondary" className="px-4 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <HomeSectionTitle
            eyebrow="The archive shop"
            title="Three ways to keep a story close"
            size="lg"
          />
        </Reveal>
        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {ways.map((way, index) => {
            const WayIcon = way.icon;
            return (
            <Reveal key={way.href + way.title} variant="fade-scale" delay={index * REVEAL_STAGGER_MS}>
              <Link
                href={way.href}
                className="group block focus-visible:outline-offset-4"
              >
                <PolaroidFrame index={index + 1}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-bp-text/5">
                    {displayImageUrl(way.image) ? (
                      <Image
                        src={displayImageUrl(way.image)!}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center gap-3">
                        <BrushPastIconBadge icon={way.icon} size="lg" />
                        <span className={`${homeHandClass} text-xl text-bp-text/50`}>
                          {way.title}
                        </span>
                      </div>
                    )}
                    {displayImageUrl(way.image) ? (
                      <div className="absolute left-3 top-3">
                        <BrushPastIconBadge
                          icon={way.icon}
                          size="sm"
                          className="border-bp-canvas/80 bg-bp-canvas/95"
                        />
                      </div>
                    ) : null}
                  </div>
                  <p
                    className={`${homeHandClass} mt-3 flex items-center justify-center gap-2 text-[1.65rem] font-bold text-bp-text md:text-3xl`}
                  >
                    <WayIcon className="h-7 w-7 text-bp-accent md:h-8 md:w-8" strokeWidth={1.5} aria-hidden />
                    {way.title}
                  </p>
                </PolaroidFrame>
                <p className={`${homeHandClass} mt-4 text-center text-base leading-relaxed text-bp-text/75 md:text-lg`}>
                  {way.description}
                </p>
                <p
                  className={`${homeHandClass} mt-3 text-center text-xl text-bp-accent opacity-0 transition-opacity group-hover:opacity-100 md:text-2xl`}
                >
                  {way.cta} →
                </p>
              </Link>
            </Reveal>
            );
          })}
        </div>
      </div>
    </HomeTextureSection>
  );
}
