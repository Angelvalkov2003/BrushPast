import Footer from "components/layout/footer";
import { ShopGiftHub } from "components/shop/shop-gift-hub";
import { ShopValuesBar } from "components/shop/shop-values-bar";
import { bpFontVariables } from "components/home/home-typography";

export const metadata = {
  title: "The Archive Shop",
  description:
    "Curated gifts featuring coffee, wearable art and limited-edition prints that support artists and creative projects.",
};

export const dynamic = "force-dynamic";

export default function ShopPage() {
  return (
    <div
      className={`${bpFontVariables} max-w-full overflow-x-clip bg-bp-canvas text-bp-text selection:bg-bp-accent-bg`}
    >
      <ShopGiftHub />
      <ShopValuesBar />
      <Footer />
    </div>
  );
}
