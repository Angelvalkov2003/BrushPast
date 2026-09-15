import {
  HomeCta,
  HomeSectionTitle,
} from "components/home/home-decor";
import {
  bpBodyClass,
  bpBodySmClass,
  bpTitleClass,
  bpTitleUtility,
} from "components/home/home-typography";
import { TextureSection } from "components/shared/texture-section";
import { BoxImagePlaceholder } from "components/shop/box-image-placeholder";
import { HOME_GIFT_BOX_PROCESS } from "lib/home-shop-config";

/** Compact gift-box process teaser — links to full shop chooser. */
export function HomeShopGiftTeaser() {
  const photo = HOME_GIFT_BOX_PROCESS.photo;

  return (
    <TextureSection texture="primary" className="px-4 py-10 md:px-10 md:py-14">
      <div className="mx-auto max-w-[1400px]">
        <HomeSectionTitle
          eyebrow={HOME_GIFT_BOX_PROCESS.eyebrow}
          title={HOME_GIFT_BOX_PROCESS.title}
          align="left"
        />
        <p className={`${bpBodyClass} mt-3 max-w-2xl text-sm text-bp-text/75 md:text-base`}>
          {HOME_GIFT_BOX_PROCESS.intro}
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-12">
          <ol className="space-y-4">
            {HOME_GIFT_BOX_PROCESS.steps.map((step, index) => (
              <li
                key={step.title}
                className="flex gap-4 border border-bp-text/10 bg-bp-canvas/50 p-4"
              >
                <span
                  className={`${bpTitleClass} ${bpTitleUtility} flex h-8 w-8 shrink-0 items-center justify-center bg-bp-accent/10 text-sm font-bold text-bp-accent`}
                >
                  {index + 1}
                </span>
                <div>
                  <p
                    className={`${bpTitleClass} ${bpTitleUtility} text-sm font-bold uppercase tracking-wide text-bp-text`}
                  >
                    {step.title}
                  </p>
                  <p className={`${bpBodySmClass} mt-1 text-bp-text/70`}>
                    {step.note}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none">
            <div
              className="pointer-events-none absolute -left-2 -top-2 h-14 w-14 border-l-2 border-t-2 border-bp-accent/60 md:-left-3 md:-top-3 md:h-16 md:w-16"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-2 -right-2 h-14 w-14 border-b-2 border-r-2 border-bp-accent/60 md:-bottom-3 md:-right-3 md:h-16 md:w-16"
              aria-hidden
            />
            <div className="relative rotate-[1.25deg] overflow-hidden bg-bp-canvas/40 shadow-[10px_12px_0_rgba(1,2,0,0.07)] transition-transform duration-500 hover:rotate-0">
              <BoxImagePlaceholder
                alt={photo.alt}
                note={photo.note}
                labelNumber={photo.photoNumber}
                objectFit="contain"
                className="aspect-[4/3] min-h-0 w-full"
              />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <HomeCta href={HOME_GIFT_BOX_PROCESS.ctaHref} variant="primary">
            {HOME_GIFT_BOX_PROCESS.cta} →
          </HomeCta>
        </div>
      </div>
    </TextureSection>
  );
}
