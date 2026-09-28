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
  bpLinkUtility,
  bpTitleClass,
  bpTitleUtility,
  bpWhisperUtility,
  homeHandClass,
} from "components/home/home-typography";
import { TextureSection } from "components/shared/texture-section";
import { BoxImagePlaceholder } from "./box-image-placeholder";
import { ShopGiftChooser } from "./shop-gift-chooser";
import { ShopImpactSection } from "./shop-impact-section";
import { SHOP_STORY_CARDS } from "lib/shop-hub-config";

function ShopGiftStories() {
  return (
    <TextureSection texture="primary" className="px-4 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1400px]">
        <HomeSectionTitle
          eyebrow="From the archive"
          title="Stories from our community"
          align="left"
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SHOP_STORY_CARDS.map((card, index) => (
            <Link key={card.title} href={card.href} className="group block">
              <PolaroidFrame index={index} className="group-hover:rotate-0">
                <BoxImagePlaceholder
                  alt={card.imageAlt}
                  note={card.imageNote}
                  labelNumber={card.photoNumber}
                  className="aspect-[3/4] min-h-[180px]"
                />
              </PolaroidFrame>
              <h3
                className={`${bpTitleClass} ${bpTitleUtility} mt-4 text-xl font-bold text-bp-text`}
              >
                {card.title}
              </h3>
              <p className={`${bpBodySmClass} mt-2 text-bp-text/70`}>
                {card.snippet}
              </p>
              <span
                className={`${bpBodyClass} ${bpLinkUtility} mt-3 inline-block font-bold text-bp-accent`}
              >
                Read more →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </TextureSection>
  );
}

function ShopGiftDonor() {
  return (
    <TextureSection
      texture="secondary"
      className="px-4 py-16 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p
          className={`${homeHandClass} ${bpWhisperUtility} text-2xl text-bp-accent`}
        >
          Help creativity reach further
        </p>
        <h2
          className={`${bpTitleClass} ${bpTitleUtility} mt-3 text-[clamp(2.25rem,6vw,4rem)] font-bold uppercase leading-[0.95] text-bp-text`}
        >
          The shop isn&apos;t the only way to support.
        </h2>
        <p className={`${bpBodyClass} mx-auto mt-5 max-w-xl text-bp-text/75`}>
          If nothing catches your eye, you can still help fund creative
          workshops, mentoring and opportunities for people to share and sell
          their work.
        </p>
        <HomeCta href="/sponsor" className="mt-8" variant="primary">
          Support the work →
        </HomeCta>
      </div>
    </TextureSection>
  );
}

export function ShopGiftHub() {
  return (
    <>
      <ShopImpactSection as="header" />
      <ShopGiftChooser />
      <ShopGiftStories />
      <ShopGiftDonor />
    </>
  );
}
