import Image from "next/image";
import { HomeCta, IndexCard, PolaroidFrame, SectionEyebrow } from "./home-decor";
import { HomeTextureSection } from "./home-texture-section";
import {
  bpBodyClass,
  bpTitleClass,
  bpTitleUtility,
  bpWhisperUtility,
  homeHandClass,
} from "./home-typography";

export function HomeHero() {
  return (
    <HomeTextureSection
      texture="secondary"
      overlay="heroShell"
      className="px-4 py-14 md:px-10 md:py-24"
    >
      <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-2 md:items-center md:gap-16">
        <IndexCard
          className="flex flex-col justify-center"
          panelTexture="secondary"
          panelTone="heroCard"
        >
          <SectionEyebrow>Welcome in - take your time</SectionEyebrow>
          <h1
            className={`${bpTitleClass} ${bpTitleUtility} mt-2 text-[clamp(2.75rem,8vw,5rem)] font-bold leading-[0.95] text-bp-text`}
          >
            Stories that stay with you.
          </h1>
          <p className={`${bpBodyClass} mt-6 max-w-xl text-bp-text/85`}>
            Real voices through art, writing, photography and design - made with
            people rebuilding from life&apos;s hardest chapters.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <HomeCta href="/stories" variant="primary">
              Explore stories →
            </HomeCta>
            <HomeCta href="/shop" variant="outline">
              Start a collection →
            </HomeCta>
          </div>
          <p
            className={`${homeHandClass} ${bpWhisperUtility} mt-8 text-xl text-bp-text/70 md:text-2xl`}
          >
            Pull up a chair. Everyone belongs here.
          </p>
        </IndexCard>

        <PolaroidFrame
          index={0}
          className="mx-auto w-full max-w-md md:max-w-none"
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-bp-surface">
            <Image
              src="/home-hero.png"
              alt="Brush Past - coffee, gift box and story card"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <p
            className={`${homeHandClass} ${bpWhisperUtility} mt-3 text-center text-xl text-bp-text/75`}
          >
            Drink the story
          </p>
        </PolaroidFrame>
      </div>
    </HomeTextureSection>
  );
}
