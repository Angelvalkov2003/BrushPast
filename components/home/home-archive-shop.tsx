import { HomeShopGiftTeaser } from "components/home/home-shop-gift-teaser";
import { HomeShopImpact } from "components/home/home-shop-impact";
import { ShopGiftHero } from "components/shop/shop-gift-hero";

/** Archive Shop block on homepage — intro, process teaser, 65% impact. */
export function HomeArchiveShop() {
  return (
    <>
      <ShopGiftHero
        compact
        primaryHref="/shop#choose-box"
        secondaryHref="/shop"
      />
      <HomeShopGiftTeaser />
      <HomeShopImpact />
    </>
  );
}
