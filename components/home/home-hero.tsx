import Image from "next/image";
import { HomeCta, PolaroidFrame } from "./home-decor";
import { bpHandUtility, bpSubtitleClass, bpTitleClass, homeHandClass } from "./home-typography";
import { HomeTextureSection } from "./home-texture-section";

export function HomeHero() {
  return (
    <HomeTextureSection texture="primary" className="px-4 py-14 md:px-10 md:py-24">
      <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-2 md:items-center md:gap-16">
        <div>
          <p className={`${homeHandClass} ${bpHandUtility} text-2xl text-bp-accent md:text-3xl`}>
            Welcome in - take your time
          </p>
          <h1
            className={`${bpTitleClass} mt-2 text-[clamp(2.75rem,8vw,5rem)] font-bold leading-[0.95] text-bp-text`}
          >
            Stories that stay with you.
          </h1>
          <p
            className={`${bpSubtitleClass} mt-6 max-w-xl text-lg leading-relaxed text-bp-text/85 md:text-xl`}
          >
            Real voices through art, writing, photography and design - made with people
            rebuilding from life&apos;s hardest chapters.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <HomeCta href="/stories" variant="primary">
              Explore stories →
            </HomeCta>
            <HomeCta href="/shop" variant="outline">
              Start a collection →
            </HomeCta>
          </div>
          <p className={`${homeHandClass} ${bpHandUtility} mt-8 text-xl text-bp-text/70 md:text-2xl`}>
            ☕ Pull up a chair. Everyone belongs here.
          </p>
        </div>

        <PolaroidFrame index={0} className="mx-auto w-full max-w-md md:max-w-none">
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
          <p className={`${homeHandClass} mt-3 text-center text-xl text-bp-text/75`}>
            Drink the story
          </p>
        </PolaroidFrame>
      </div>
    </HomeTextureSection>
  );
}
