import {
  IndexCard,
  SectionEyebrow,
} from "components/home/home-decor";
import {
  bpBodyClass,
  bpBodySmClass,
  bpDisplayClass,
  bpDisplayUtility,
  bpTitleClass,
  bpTitleUtility,
  PAGE_HERO_SECTION_CLASS,
} from "components/home/home-typography";
import { TextureSection } from "components/shared/texture-section";
import { BoxImagePlaceholder } from "components/shop/box-image-placeholder";
import { SHOP_IMPACT, SHOP_VALUE_PROPS } from "lib/shop-hub-config";

type ShopImpactSectionProps = {
  /** Use as page opening on /shop */
  as?: "header" | "section";
};

/** 65% impact block — page opening on /shop. */
export function ShopImpactSection({ as = "section" }: ShopImpactSectionProps) {
  const isPageHero = as === "header";

  return (
    <TextureSection
      as={as}
      texture="secondary"
      overlay={isPageHero ? "heroShell" : undefined}
      className={
        isPageHero ? PAGE_HERO_SECTION_CLASS : "px-4 py-12 md:px-10 md:py-16"
      }
    >
      <div className="mx-auto max-w-[1400px]">
        <IndexCard panelTexture="secondary" panelTone="cream" className="!overflow-visible">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-10">
            <div className="min-w-0">
              <SectionEyebrow>{SHOP_IMPACT.eyebrow}</SectionEyebrow>
              <p
                className={`${bpDisplayClass} ${bpDisplayUtility} mt-2 text-[clamp(3.25rem,9vw,4.75rem)] font-bold leading-none text-bp-accent`}
                aria-hidden
              >
                65%
              </p>
              <h1
                className={`${bpTitleClass} ${bpTitleUtility} mt-4 text-lg font-bold uppercase leading-snug text-bp-text md:text-xl`}
              >
                {SHOP_IMPACT.headline}
              </h1>
              <p className={`${bpBodyClass} mt-3 max-w-lg text-sm text-bp-text/75 md:text-base`}>
                {SHOP_IMPACT.body}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-2.5 sm:gap-3">
                {SHOP_VALUE_PROPS.map((item) => (
                  <div
                    key={item.title}
                    className="border border-bp-text/10 bg-bp-canvas/55 px-3 py-3 text-center"
                  >
                    <p
                      className={`${bpTitleClass} ${bpTitleUtility} text-[0.65rem] font-bold uppercase tracking-wide text-bp-text sm:text-xs`}
                    >
                      {item.title}
                    </p>
                    <p className={`${bpBodySmClass} mt-1 text-[0.7rem] text-bp-text/60 sm:text-xs`}>
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Frameless media — height capped to the copy column on desktop */}
            <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
              <div
                className="pointer-events-none absolute -left-3 -top-3 h-16 w-16 border-l-2 border-t-2 border-bp-accent/70"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -bottom-3 -right-3 h-16 w-16 border-b-2 border-r-2 border-bp-accent/70"
                aria-hidden
              />
              <div className="relative rotate-[-1.5deg] overflow-hidden shadow-[8px_10px_0_rgba(1,2,0,0.08)] transition-transform duration-500 hover:rotate-0">
                <BoxImagePlaceholder
                  alt={SHOP_IMPACT.imageAlt}
                  note={SHOP_IMPACT.imageNote}
                  labelNumber={SHOP_IMPACT.photoNumber}
                  objectFit="contain"
                  priority
                  className="!aspect-auto h-[260px] w-full sm:h-[300px] lg:h-[320px]"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-bp-dark/75 via-bp-dark/25 to-transparent px-4 pb-3 pt-10">
                  <p
                    className={`${bpTitleClass} ${bpTitleUtility} text-sm uppercase tracking-[0.12em] text-bp-canvas`}
                  >
                    {SHOP_IMPACT.polaroidCaption}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </IndexCard>
      </div>
    </TextureSection>
  );
}
