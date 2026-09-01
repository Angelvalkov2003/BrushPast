import { notFound } from "next/navigation";
import Link from "next/link";
import Footer from "components/layout/footer";
import { BoxBuilder } from "components/shop/box-builder/box-builder";
import { HomeCta, SectionEyebrow } from "components/home/home-decor";
import {
  bpBodyClass,
  bpFontVariables,
  PAGE_HERO_H1_MINIMAL_CLASS,
  bpTitleClass,
  bpTitleUtility,
} from "components/home/home-typography";
import { TextureSection } from "components/shared/texture-section";
import {
  BOX_HUB_CARDS,
  boxTypeLabel,
  isBoxPairComboId,
  isBoxTypeId,
  type BoxPairComboId,
  type BoxTypeId,
} from "lib/shop-box-config";
import { getBoxCatalog } from "lib/supabase/shop-box-products";

export const dynamic = "force-dynamic";

const BUILDABLE: BoxTypeId[] = ["a", "b", "d"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  if (!isBoxTypeId(type)) return { title: "Build your box" };
  return {
    title: `${boxTypeLabel(type)} — Build your box`,
    description:
      type === "a"
        ? "Next Chapter — one coffee, one t-shirt and one print. Fixed £70 gift box with a gift message."
        : `Build a ${boxTypeLabel(type).toLowerCase()} with a gift message.`,
  };
}

export default async function ShopBoxTypePage({
  params,
  searchParams,
}: {
  params: Promise<{ type: string }>;
  searchParams: Promise<{ combo?: string }>;
}) {
  const { type } = await params;
  const { combo } = await searchParams;
  if (!isBoxTypeId(type) || type === "c") notFound();

  let comboId: BoxPairComboId | undefined;
  if (type === "b") {
    if (!combo || !isBoxPairComboId(combo)) {
      notFound();
    }
    comboId = combo;
  }

  if (BUILDABLE.includes(type)) {
    const catalog = await getBoxCatalog();
    return (
      <div
        className={`${bpFontVariables} max-w-full overflow-x-clip bg-bp-canvas text-bp-text selection:bg-bp-accent-bg`}
      >
        <TextureSection
          texture="secondary"
          overlay="cream"
          className="px-4 py-10 md:px-10 md:py-14"
        >
          <div className="mx-auto max-w-[1400px] pb-8 lg:pb-16">
            <BoxBuilder
              boxType={type}
              catalog={catalog}
              comboId={comboId}
            />
          </div>
        </TextureSection>
        <Footer />
      </div>
    );
  }

  const card = BOX_HUB_CARDS.find((item) => item.type === type);

  return (
    <div
      className={`${bpFontVariables} max-w-full overflow-x-clip bg-bp-canvas text-bp-text selection:bg-bp-accent-bg`}
    >
      <TextureSection
        texture="secondary"
        overlay="cream"
        className="px-4 py-16 md:px-10 md:py-24"
      >
        <div className="mx-auto max-w-2xl">
          <Link
            href="/shop"
            className="text-lg text-bp-text/65 transition-colors hover:text-bp-accent"
          >
            ← Choose a box type
          </Link>
          <SectionEyebrow className="mt-8">Coming next</SectionEyebrow>
          <h1 className={`${PAGE_HERO_H1_MINIMAL_CLASS} mt-2`}>
            {boxTypeLabel(type)}
          </h1>
          <p className={`${bpBodyClass} mt-6 text-bp-text/80`}>
            {card?.description ??
              "This box type is not ready to build yet."}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <HomeCta href="/shop/box/c" variant="primary">
              Try Single Collection →
            </HomeCta>
            <HomeCta href="/shop" variant="outline">
              Back to shop
            </HomeCta>
          </div>
        </div>
      </TextureSection>
      <Footer />
    </div>
  );
}
