import { notFound } from "next/navigation";
import Link from "next/link";
import Footer from "components/layout/footer";
import { BoxBuilder } from "components/shop/box-builder/box-builder";
import { BoxImagePlaceholder } from "components/shop/box-image-placeholder";
import {
  HomeCta,
  PolaroidFrame,
  SectionEyebrow,
} from "components/home/home-decor";
import {
  bpBodyClass,
  bpFontVariables,
  bpTitleClass,
  bpTitleUtility,
} from "components/home/home-typography";
import { TextureSection } from "components/shared/texture-section";
import {
  isBoxCategoryKey,
  type BoxCategoryKey,
} from "lib/shop-box-config";
import { SHOP_SINGLE_OPTIONS } from "lib/shop-hub-config";
import { getBoxCatalog } from "lib/supabase/shop-box-products";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const locked =
    category && isBoxCategoryKey(category) ? category : undefined;
  const title = locked
    ? `Single Collection — ${locked === "tshirt" ? "T-Shirt" : locked === "coffee" ? "Coffee" : "Print"}`
    : "Single Collection — Choose a collection";
  return {
    title,
    description:
      "Choose one coffee, t-shirt or print. Packed as a Brush Past gift box with a gift message.",
  };
}

export default async function ShopBoxCPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  let lockedCategory: BoxCategoryKey | undefined;
  if (category) {
    if (!isBoxCategoryKey(category)) notFound();
    lockedCategory = category;
  }

  if (!lockedCategory) {
    return (
      <div
        className={`${bpFontVariables} max-w-full overflow-x-clip bg-bp-canvas text-bp-text selection:bg-bp-accent-bg`}
      >
        <TextureSection
          texture="secondary"
          overlay="cream"
          className="px-4 py-10 md:px-10 md:py-14"
        >
          <div className="mx-auto max-w-[1400px]">
            <Link
              href="/shop"
              className={`${bpBodyClass} text-bp-text/65 transition-colors hover:text-bp-accent`}
            >
              ← Choose a box type
            </Link>
            <SectionEyebrow className="mt-8">Single Collection</SectionEyebrow>
            <h1
              className={`${bpTitleClass} ${bpTitleUtility} mt-2 text-[clamp(2.4rem,6vw,4.25rem)] font-bold uppercase leading-[0.92] text-bp-text`}
            >
              Choose one collection
            </h1>
            <p className={`${bpBodyClass} mt-4 max-w-xl text-bp-text/75`}>
              Each Single Collection is packed as a Brush Past gift box. Pick
              coffee, t-shirt or print — then choose the design.
            </p>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {SHOP_SINGLE_OPTIONS.map((option, index) => (
                <Link
                  key={option.key}
                  href={option.href}
                  className="group block"
                >
                  <PolaroidFrame index={index} className="group-hover:rotate-0">
                    <BoxImagePlaceholder
                      alt={option.imageAlt}
                      note={option.imageNote}
                      className="aspect-[4/5] min-h-[200px]"
                    />
                  </PolaroidFrame>
                  <h2
                    className={`${bpTitleClass} ${bpTitleUtility} mt-4 text-2xl font-bold text-bp-text`}
                  >
                    {option.title}
                  </h2>
                  <p className={`${bpBodyClass} mt-2 text-bp-text/75`}>
                    {option.description}
                  </p>
                </Link>
              ))}
            </div>
            <HomeCta href="/shop" className="mt-10" variant="outline">
              Back to shop
            </HomeCta>
          </div>
        </TextureSection>
        <Footer />
      </div>
    );
  }

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
            boxType="c"
            catalog={catalog}
            lockedCategory={lockedCategory}
          />
        </div>
      </TextureSection>
      <Footer />
    </div>
  );
}
