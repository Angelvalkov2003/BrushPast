import Link from "next/link";
import {
  HomeCta,
  HomeSectionTitle,
  IndexCard,
  PolaroidFrame,
} from "components/home/home-decor";
import {
  bpBodyClass,
  bpBodySmClass,
  bpDisplayClass,
  bpDisplayUtility,
  bpTitleClass,
  bpTitleUtility,
} from "components/home/home-typography";
import { TextureSection } from "components/shared/texture-section";
import { BoxImagePlaceholder } from "components/shop/box-image-placeholder";
import {
  SHOP_BUILD_OWN,
  SHOP_PAIR_OPTIONS,
  SHOP_SIGNATURE,
  SHOP_SINGLE_OPTIONS,
} from "lib/shop-hub-config";

const JOURNEYS = [
  {
    key: "single",
    title: "Single Collection",
    note: "One piece — coffee, t-shirt or print — packed as a gift box.",
    href: "/shop/box/c",
    imageAlt: SHOP_SINGLE_OPTIONS[0].imageAlt,
    imageNote: SHOP_SINGLE_OPTIONS[0].imageNote,
  },
  {
    key: "pair",
    title: "Curated Pairings",
    note: `Three fixed pairs from ${SHOP_PAIR_OPTIONS.map((p) => p.priceLabel).join(" · ")}.`,
    href: "/shop#choose-box",
    imageAlt: SHOP_PAIR_OPTIONS[0].imageAlt,
    imageNote: SHOP_PAIR_OPTIONS[0].imageNote,
  },
  {
    key: "next",
    title: "Next Chapter",
    note: SHOP_SIGNATURE.description,
    href: SHOP_SIGNATURE.href,
    imageAlt: SHOP_SIGNATURE.imageAlt,
    imageNote: SHOP_SIGNATURE.imageNote,
  },
  {
    key: "byo",
    title: "Build Your Own",
    note: SHOP_BUILD_OWN.description,
    href: SHOP_BUILD_OWN.href,
    imageAlt: SHOP_BUILD_OWN.imageAlt,
    imageNote: SHOP_BUILD_OWN.imageNote,
  },
] as const;

/** Homepage gift-box hierarchy — shop journeys above stories. */
export function HomeGiftBoxes() {
  return (
    <TextureSection texture="primary" className="px-4 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1400px]">
        <HomeSectionTitle
          eyebrow="The Archive Shop"
          title="Every gift tells a story"
          align="left"
        />
        <p className={`${bpBodyClass} mt-4 max-w-2xl text-bp-text/75`}>
          Choose a Single Collection, a Curated Pairing, Next Chapter, or Build
          Your Own. Every purchase is packed as a Brush Past gift box.
        </p>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {JOURNEYS.map((journey, index) => (
            <Link
              key={journey.key}
              href={journey.href}
              className="group block min-w-0"
            >
              <PolaroidFrame index={index} className="group-hover:rotate-0">
                <BoxImagePlaceholder
                  alt={journey.imageAlt}
                  note={journey.imageNote}
                  className="aspect-[4/5] min-h-[180px]"
                />
              </PolaroidFrame>
              <h3
                className={`${bpDisplayClass} ${bpDisplayUtility} mt-4 text-xl font-bold uppercase leading-tight text-bp-text md:text-2xl`}
              >
                {journey.title}
              </h3>
              <p className={`${bpBodySmClass} mt-2 text-bp-text/70`}>
                {journey.note}
              </p>
              <span
                className={`${bpTitleClass} ${bpTitleUtility} mt-3 inline-block text-sm font-bold uppercase tracking-[0.12em] text-bp-accent`}
              >
                Gift this →
              </span>
            </Link>
          ))}
        </div>

        <IndexCard className="mt-12 !p-6 md:!p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className={`${bpBodyClass} max-w-xl text-bp-text/80`}>
              65% of profits are reinvested into creators, workshops and partner
              organisations. Your purchase already gives back.
            </p>
            <HomeCta href="/shop" variant="primary" className="shrink-0">
              Explore the shop →
            </HomeCta>
          </div>
        </IndexCard>
      </div>
    </TextureSection>
  );
}
