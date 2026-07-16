import Image from "next/image";
import clsx from "clsx";
import { HomeCta, PolaroidFrame, SectionEyebrow } from "components/home/home-decor";
import {
  bpBodyClass,
  bpWhisperUtility,
  homeHandClass,
} from "components/home/home-typography";
import {
  TextureSection,
  type TextureVariant,
} from "components/shared/texture-section";

type ShopHeroProps = {
  /** On the homepage — section + h2, links out to /shop */
  embedded?: boolean;
  ctaHref?: string;
  texture?: TextureVariant;
};

export function ShopHero({
  embedded = false,
  ctaHref = embedded ? "/shop" : "#categories",
  texture = embedded ? "primary" : "secondary",
}: ShopHeroProps = {}) {
  const HeadingTag = embedded ? "h2" : "h1";

  return (
    <TextureSection
      as={embedded ? "section" : "header"}
      texture={texture}
      className="px-4 py-14 md:px-10 md:py-20"
    >
      <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-2 md:items-center md:gap-16">
        <div className={clsx(embedded && "md:order-2")}>
          <SectionEyebrow>The Archive</SectionEyebrow>
          <HeadingTag className="mt-1 text-[clamp(2.75rem,8vw,5.5rem)] font-bold leading-[0.92] text-bp-text">
            The Archive Shop
          </HeadingTag>
          <p className={`${bpBodyClass} mt-6 max-w-md text-bp-text/85`}>
            Art, objects and editions created through lived experience.
          </p>
          <p
            className={`${homeHandClass} ${bpWhisperUtility} mt-4 text-2xl text-bp-text/90 md:text-3xl`}
          >
            Every piece shares a story.
          </p>
          <div className="mt-9">
            <HomeCta href={ctaHref} variant="primary">
              Explore the archive →
            </HomeCta>
          </div>
        </div>

        <PolaroidFrame
          index={0}
          className={clsx(
            "mx-auto w-full max-w-md md:max-w-none",
            embedded && "md:order-1",
          )}
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-bp-surface md:aspect-[5/4]">
            <Image
              src="/shop1.png"
              alt="Archive shop - art, coffee and editions"
              fill
              className="object-cover"
              priority={!embedded}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <p
            className={`${homeHandClass} ${bpWhisperUtility} mt-3 text-center text-xl text-bp-text/75`}
          >
            Hold the story
          </p>
        </PolaroidFrame>
      </div>
    </TextureSection>
  );
}
