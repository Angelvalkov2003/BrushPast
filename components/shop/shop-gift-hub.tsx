import Link from "next/link";
import {
  ArchiveBoxIcon,
  ArrowPathIcon,
  PaintBrushIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
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
import {
  SHOP_BUILD_OWN,
  SHOP_GIFT_HERO,
  SHOP_MISSION_STEPS,
  SHOP_MOBILE_BOX_CARDS,
  SHOP_PAIR_OPTIONS,
  SHOP_SIGNATURE,
  SHOP_SINGLE_OPTIONS,
  SHOP_STORY_CARDS,
} from "lib/shop-hub-config";

const MISSION_ICONS = {
  create: SparklesIcon,
  produce: PaintBrushIcon,
  gift: ArchiveBoxIcon,
  reinvest: ArrowPathIcon,
} as const;

function GiftThis() {
  return (
    <span
      className={`${bpBodyClass} ${bpLinkUtility} mt-4 inline-block font-bold text-bp-accent`}
    >
      Gift this →
    </span>
  );
}

function ChooserHeading({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div className="mb-6">
      <p
        className={`${bpBodySmClass} font-bold uppercase tracking-[0.18em] text-bp-text/45`}
      >
        {number}
      </p>
      <h3
        className={`${bpTitleClass} ${bpTitleUtility} mt-1 text-2xl font-bold uppercase tracking-wide text-bp-text md:text-3xl`}
      >
        {title}
      </h3>
    </div>
  );
}

function ShopGiftHero() {
  return (
    <TextureSection
      as="header"
      texture="secondary"
      className="px-4 py-14 md:px-10 md:py-20"
    >
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16">
        <div className="min-w-0">
          <SectionEyebrow>{SHOP_GIFT_HERO.eyebrow}</SectionEyebrow>
          <h1
            className={`${bpTitleClass} ${bpTitleUtility} mt-2 break-words text-[clamp(2.75rem,7vw,5.25rem)] font-bold uppercase leading-[0.92] text-bp-text`}
          >
            {SHOP_GIFT_HERO.title}
          </h1>
          <p className={`${bpBodyClass} mt-6 max-w-lg text-bp-text/80`}>
            {SHOP_GIFT_HERO.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <HomeCta href={SHOP_GIFT_HERO.primaryHref} variant="primary">
              {SHOP_GIFT_HERO.primaryCta}
            </HomeCta>
            <Link
              href={SHOP_GIFT_HERO.secondaryHref}
              className={`${bpBodyClass} ${bpLinkUtility} font-bold text-bp-text`}
            >
              {SHOP_GIFT_HERO.secondaryCta}
            </Link>
          </div>
          <div className="mt-8 flex gap-2" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-bp-accent" />
            <span className="h-2.5 w-2.5 rounded-full bg-bp-text/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-bp-text/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-bp-text/20" />
          </div>
        </div>

        <div className="min-w-0">
          <PolaroidFrame index={0} className="w-full" tilt={false}>
            <BoxImagePlaceholder
              alt={SHOP_GIFT_HERO.imageAlt}
              note={SHOP_GIFT_HERO.imageNote}
              className="aspect-[4/3] min-h-[240px] md:min-h-[360px]"
            />
          </PolaroidFrame>
        </div>
      </div>
    </TextureSection>
  );
}

function ShopGiftChooser() {
  return (
    <TextureSection
      texture="primary"
      className="px-4 py-14 md:px-10 md:py-20"
    >
      <div id="choose-box" className="mx-auto max-w-[1400px] scroll-mt-28">
        <HomeSectionTitle
          eyebrow="The archive"
          title="Choose your gift box"
          align="left"
        />

        <div className="mt-12 md:hidden">
          <div className="grid gap-8">
            {SHOP_MOBILE_BOX_CARDS.map((option, index) => (
              <Link key={option.type} href={option.href} className="group block">
                <PolaroidFrame index={index} className="group-hover:rotate-0">
                  <BoxImagePlaceholder
                    alt={option.imageAlt}
                    note={option.imageNote}
                    className="aspect-[4/5] min-h-[240px]"
                  />
                </PolaroidFrame>
                <h3
                  className={`${bpTitleClass} ${bpTitleUtility} mt-4 text-3xl font-bold uppercase tracking-wide text-bp-text`}
                >
                  {option.title}
                </h3>
                <p className={`${bpBodyClass} mt-2 text-bp-text/75`}>
                  {option.description}
                </p>
                <GiftThis />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 hidden space-y-8 md:block">
          <IndexCard>
            <ChooserHeading number="01" title="Single collection (choose one)" />
            <div className="grid gap-8 sm:grid-cols-3">
              {SHOP_SINGLE_OPTIONS.map((option, index) => (
                <Link key={option.key} href={option.href} className="group block">
                  <PolaroidFrame index={index} className="group-hover:rotate-0">
                    <BoxImagePlaceholder
                      alt={option.imageAlt}
                      note={option.imageNote}
                      className="aspect-[4/5] min-h-[220px]"
                    />
                  </PolaroidFrame>
                  <h4
                    className={`${bpTitleClass} ${bpTitleUtility} mt-4 text-2xl font-bold text-bp-text`}
                  >
                    {option.title}
                  </h4>
                  <p className={`${bpBodyClass} mt-2 text-bp-text/75`}>
                    {option.description}
                  </p>
                  <GiftThis />
                </Link>
              ))}
            </div>
          </IndexCard>

          <IndexCard>
            <ChooserHeading number="02" title="Curated pairings (choose two)" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {SHOP_PAIR_OPTIONS.map((option, index) => (
                <Link key={option.key} href={option.href} className="group block">
                  <PolaroidFrame index={index + 1} className="group-hover:rotate-0">
                    <BoxImagePlaceholder
                      alt={option.imageAlt}
                      note={option.imageNote}
                      className="aspect-square min-h-[160px]"
                    />
                  </PolaroidFrame>
                  <h4
                    className={`${bpTitleClass} ${bpTitleUtility} mt-4 text-xl font-bold text-bp-text`}
                  >
                    {option.title}
                  </h4>
                  <GiftThis />
                </Link>
              ))}
            </div>
          </IndexCard>

          <IndexCard>
            <ChooserHeading number="03" title="Signature gift box (all three)" />
            <Link
              href={SHOP_SIGNATURE.href}
              className="group grid gap-8 md:grid-cols-2 md:items-center"
            >
              <PolaroidFrame index={2} className="group-hover:rotate-0">
                <BoxImagePlaceholder
                  alt={SHOP_SIGNATURE.imageAlt}
                  note={SHOP_SIGNATURE.imageNote}
                  className="aspect-[5/3] min-h-[220px]"
                />
              </PolaroidFrame>
              <div>
                <h4
                  className={`${bpTitleClass} ${bpTitleUtility} text-[clamp(1.85rem,4vw,2.75rem)] font-bold uppercase leading-tight text-bp-text`}
                >
                  {SHOP_SIGNATURE.title}
                </h4>
                <p className={`${bpBodyClass} mt-4 text-bp-text/75`}>
                  {SHOP_SIGNATURE.description}
                </p>
                <GiftThis />
              </div>
            </Link>
          </IndexCard>

          <IndexCard>
            <ChooserHeading number="04" title="Build your own box (pick & mix)" />
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <h4
                  className={`${bpTitleClass} ${bpTitleUtility} text-[clamp(1.85rem,4vw,2.75rem)] font-bold uppercase leading-tight text-bp-text`}
                >
                  {SHOP_BUILD_OWN.title}
                </h4>
                <p className={`${bpBodyClass} mt-4 text-bp-text/75`}>
                  {SHOP_BUILD_OWN.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  {SHOP_BUILD_OWN.checks.map((label) => (
                    <span
                      key={label}
                      className={`${bpBodySmClass} flex items-center gap-2 text-bp-text/70`}
                    >
                      <span
                        className="inline-block h-4 w-4 border border-bp-text/40 bg-bp-canvas/70"
                        aria-hidden
                      />
                      {label}
                    </span>
                  ))}
                </div>
                <HomeCta href={SHOP_BUILD_OWN.href} className="mt-8" variant="primary">
                  Build your box →
                </HomeCta>
              </div>
              <PolaroidFrame index={3} tilt={false}>
                <BoxImagePlaceholder
                  alt={SHOP_BUILD_OWN.imageAlt}
                  note={SHOP_BUILD_OWN.imageNote}
                  className="aspect-[5/3] min-h-[180px]"
                />
              </PolaroidFrame>
            </div>
          </IndexCard>
        </div>
      </div>
    </TextureSection>
  );
}

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
        <HomeCta href="/contact#become-a-sponsor" className="mt-8" variant="primary">
          Become a donor
        </HomeCta>
      </div>
    </TextureSection>
  );
}

export function ShopGiftHub() {
  return (
    <>
      <ShopGiftHero />
      <ShopGiftChooser />
      <ShopGiftMission />
      <ShopGiftStories />
      <ShopGiftDonor />
    </>
  );
}
