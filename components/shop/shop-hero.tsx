import Image from "next/image";
import Link from "next/link";
import { HomeCta, PolaroidFrame } from "components/home/home-decor";
import { homeHandClass, homeSerifClass } from "components/home/home-typography";
import { TextureSection } from "components/shared/texture-section";

export function ShopHero() {
  return (
    <TextureSection as="header" texture="secondary" className="px-4 py-14 md:px-10 md:py-20">
      <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-2 md:items-center md:gap-16">
        <div>
          <p className={`${homeHandClass} text-2xl text-bp-accent md:text-3xl`}>The Archive</p>
          <h1
            className={`${homeHandClass} mt-1 text-[clamp(2.75rem,8vw,5.5rem)] font-bold leading-[0.92] text-bp-text`}
          >
            The Archive Shop
          </h1>
          <p className={`${homeSerifClass} mt-6 max-w-md text-lg italic text-bp-text/85 md:text-xl`}>
            Art, objects and editions created through lived experience.
          </p>
          <p className={`${homeHandClass} mt-4 text-2xl text-bp-text/90 md:text-3xl`}>
            Every piece shares a story.
          </p>
          <div className="mt-9">
            <HomeCta href="#categories" variant="primary">
              Explore the archive →
            </HomeCta>
          </div>
        </div>

        <PolaroidFrame index={0} className="mx-auto w-full max-w-md md:max-w-none">
          <div className="relative aspect-[4/3] overflow-hidden bg-bp-surface md:aspect-[5/4]">
            <Image
              src="/shop1.png"
              alt="Archive shop — art, coffee and editions"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <p className={`${homeHandClass} mt-3 text-center text-xl text-bp-text/75`}>
            Hold the story
          </p>
        </PolaroidFrame>
      </div>
    </TextureSection>
  );
}
