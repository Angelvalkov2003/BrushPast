import {
  ArchiveBoxIcon,
  ArrowPathIcon,
  PaintBrushIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import {
  HomeCta,
  HomeSectionTitle,
  IndexCard,
  PolaroidFrame,
  SectionEyebrow,
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
import { BrushPastIconBadge } from "components/icons/brush-past-icons";
import { BoxImagePlaceholder } from "./box-image-placeholder";
import { ShopGiftChooser } from "./shop-gift-chooser";
import { ShopPageHero } from "./shop-page-hero";
import {
  SHOP_MISSION_STEPS,
  SHOP_STORY_CARDS,
} from "lib/shop-hub-config";

const MISSION_ICONS = {
  create: SparklesIcon,
  produce: PaintBrushIcon,
  gift: ArchiveBoxIcon,
  reinvest: ArrowPathIcon,
} as const;

function ShopGiftMission() {
  return (
    <TextureSection
      texture="secondary"
      className="px-4 py-14 md:px-10 md:py-20"
    >
      <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
        <div>
          <SectionEyebrow>Our mission</SectionEyebrow>
          <h2
            className={`${bpTitleClass} ${bpTitleUtility} mt-2 text-[clamp(2rem,5vw,3.25rem)] font-bold uppercase leading-[1.05] text-bp-text`}
          >
            Creativity that keeps creating.
          </h2>
          <p className={`${bpBodyClass} mt-5 max-w-md text-bp-text/80`}>
            Every gift funds artists, workshops and the next story. Create,
            produce, gift, reinvest — then start again.
          </p>
        </div>
        <IndexCard>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {SHOP_MISSION_STEPS.map((step) => {
              const Icon = MISSION_ICONS[step.icon];
              return (
                <div key={step.title} className="text-center">
                  <div className="flex justify-center">
                    <BrushPastIconBadge icon={Icon} size="lg" />
                  </div>
                  <p
                    className={`${bpTitleClass} ${bpTitleUtility} mt-3 text-lg font-bold uppercase tracking-wide text-bp-text`}
                  >
                    {step.title}
                  </p>
                  <p className={`${bpBodySmClass} mt-2 text-bp-text/65`}>
                    {step.note}
                  </p>
                </div>
              );
            })}
          </div>
        </IndexCard>
      </div>
    </TextureSection>
  );
}

function ShopGiftStories() {
  return (
    <TextureSection texture="primary" className="px-4 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1400px]">
        <HomeSectionTitle
          eyebrow="From the archive"
          title="Stories from our community"
          align="left"
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
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
          Not everyone wants another product.
        </h2>
        <p className={`${bpBodyClass} mx-auto mt-5 max-w-xl text-bp-text/75`}>
          Some simply want to help artists create. Sponsor a workshop, an
          artist, or the next community story.
        </p>
        <HomeCta href="/sponsor" className="mt-8" variant="primary">
          Become a donor
        </HomeCta>
      </div>
    </TextureSection>
  );
}

export function ShopGiftHub() {
  return (
    <>
      <ShopPageHero />
      <ShopGiftChooser />
      <ShopGiftMission />
      <ShopGiftStories />
      <ShopGiftDonor />
    </>
  );
}
