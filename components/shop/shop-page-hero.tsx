import { HomeCta } from "components/home/home-decor";
import { bpBodyClass, PAGE_HERO_MEDIA_FRAMELESS_CLASS } from "components/home/home-typography";
import { PageHero } from "components/shared/page-hero";
import { BoxImagePlaceholder } from "components/shop/box-image-placeholder";
import { SHOP_PAGE_HERO } from "lib/shop-hub-config";

/** /shop opening hero — one Stick No Bills headline, Brush Past voice. */
export function ShopPageHero() {
  return (
    <PageHero
      eyebrow={SHOP_PAGE_HERO.eyebrow}
      title={SHOP_PAGE_HERO.title}
      handLine={SHOP_PAGE_HERO.handLine}
      intro={SHOP_PAGE_HERO.intro}
      titleUppercase
      actions={
        <HomeCta href={SHOP_PAGE_HERO.ctaHref} variant="primary" className="uppercase">
          {SHOP_PAGE_HERO.cta} →
        </HomeCta>
      }
      media={
        <BoxImagePlaceholder
          alt={SHOP_PAGE_HERO.imageAlt}
          labelNumber={SHOP_PAGE_HERO.photoNumber}
          className={PAGE_HERO_MEDIA_FRAMELESS_CLASS}
        />
      }
    >
      <p className={`${bpBodyClass} mt-4 max-w-xl font-semibold text-bp-text`}>
        {SHOP_PAGE_HERO.impactLine}
      </p>
    </PageHero>
  );
}
