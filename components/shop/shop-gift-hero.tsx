import Link from "next/link";
import clsx from "clsx";
import {
  HomeCta,
  PolaroidFrame,
  SectionEyebrow,
} from "components/home/home-decor";
import {
  bpBodyClass,
  PAGE_HERO_GRID_SPLIT_CLASS,
  PAGE_HERO_H1_CLASS,
  PAGE_HERO_H1_MINIMAL_CLASS,
  PAGE_HERO_INTRO_CLASS,
  PAGE_HERO_POLAROID_WRAP_CLASS,
  PAGE_HERO_SECTION_CLASS,
  PAGE_HERO_SECTION_COMPACT_CLASS,
  PAGE_HERO_CONTAINER_CLASS,
} from "components/home/home-typography";
import { TextureSection } from "components/shared/texture-section";
import { BoxImagePlaceholder } from "./box-image-placeholder";
import { SHOP_GIFT_HERO } from "lib/shop-hub-config";

type ShopGiftHeroProps = {
  compact?: boolean;
  primaryHref?: string;
  secondaryHref?: string;
};

export function ShopGiftHero({
  compact = false,
  primaryHref = SHOP_GIFT_HERO.primaryHref,
  secondaryHref = SHOP_GIFT_HERO.secondaryHref,
}: ShopGiftHeroProps) {
  return (
    <TextureSection
      as={compact ? "section" : "header"}
      texture="secondary"
      overlay={compact ? undefined : "heroShell"}
      className={clsx(
        compact ? PAGE_HERO_SECTION_COMPACT_CLASS : PAGE_HERO_SECTION_CLASS,
      )}
    >
      <div
        className={clsx(
          PAGE_HERO_CONTAINER_CLASS,
          PAGE_HERO_GRID_SPLIT_CLASS,
          compact && "gap-8 md:gap-12",
        )}
      >
        <div className="min-w-0">
          <SectionEyebrow>{SHOP_GIFT_HERO.eyebrow}</SectionEyebrow>
          <h2
            className={clsx(
              compact ? PAGE_HERO_H1_MINIMAL_CLASS : PAGE_HERO_H1_CLASS,
              "mt-3 uppercase",
              !compact && "leading-[0.92]",
            )}
          >
            {SHOP_GIFT_HERO.title}
          </h2>
          <p className={clsx(PAGE_HERO_INTRO_CLASS, compact && "!mt-4")}>
            {SHOP_GIFT_HERO.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <HomeCta href={primaryHref} variant="primary">
              {SHOP_GIFT_HERO.primaryCta}
            </HomeCta>
            <Link
              href={secondaryHref}
              className={`${bpBodyClass} font-bold text-bp-text underline decoration-bp-accent/50 underline-offset-4 transition-colors hover:text-bp-accent`}
            >
              {SHOP_GIFT_HERO.secondaryCta}
            </Link>
          </div>
          {!compact ? (
            <div className="mt-8 flex gap-2" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-bp-accent" />
              <span className="h-2.5 w-2.5 rounded-full bg-bp-text/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-bp-text/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-bp-text/20" />
            </div>
          ) : null}
        </div>

        <div className="min-w-0">
          <PolaroidFrame index={0} className={PAGE_HERO_POLAROID_WRAP_CLASS} tilt={false}>
            <BoxImagePlaceholder
              alt={SHOP_GIFT_HERO.imageAlt}
              note={SHOP_GIFT_HERO.imageNote}
              labelNumber={SHOP_GIFT_HERO.photoNumber}
              className={clsx(
                "aspect-[4/3]",
                compact ? "min-h-[180px] md:min-h-[220px]" : "min-h-[240px] md:min-h-[360px]",
              )}
            />
          </PolaroidFrame>
        </div>
      </div>
    </TextureSection>
  );
}
