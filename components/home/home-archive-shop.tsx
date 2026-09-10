import { HomeShopGiftTeaser } from "components/home/home-shop-gift-teaser";
import { ShopGiftHero } from "components/shop/shop-gift-hero";

/** Archive Shop block on homepage — intro + process teaser (65% lives on /shop). */
export function HomeArchiveShop() {
  return (
    <>
      <ShopGiftHero
        compact
        primaryHref="/shop#choose-box"
        secondaryHref="/shop"
      />
      <HomeShopGiftTeaser />
    </>
  );
}
