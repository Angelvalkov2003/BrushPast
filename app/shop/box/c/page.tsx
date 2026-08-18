import Footer from "components/layout/footer";
import { BoxBuilder } from "components/shop/box-builder/box-builder";
import {
  bpFontVariables,
} from "components/home/home-typography";
import { TextureSection } from "components/shared/texture-section";
import { getBoxCatalog } from "lib/supabase/shop-box-products";

export const metadata = {
  title: "Single Box — Build your box",
  description:
    "Choose one t-shirt, print or coffee. Packed as a Brush Past box with a gift message.",
};

export const dynamic = "force-dynamic";

export default async function ShopBoxCPage() {
  const catalog = await getBoxCatalog();

  return (
    <div
      className={`${bpFontVariables} bg-bp-canvas text-bp-text selection:bg-bp-accent-bg`}
    >
      <TextureSection
        texture="secondary"
        overlay="cream"
        className="px-4 py-10 md:px-10 md:py-14"
      >
        <div className="mx-auto max-w-[1400px] pb-8 lg:pb-16">
          <BoxBuilder boxType="c" catalog={catalog} />
        </div>
      </TextureSection>
      <Footer />
    </div>
  );
}
