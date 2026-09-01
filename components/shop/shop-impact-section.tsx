import {
  IndexCard,
  PolaroidFrame,
  SectionEyebrow,
} from "components/home/home-decor";
import {
  bpBodyClass,
  bpBodySmClass,
  bpTitleClass,
  bpTitleUtility,
  bpWhisperUtility,
  homeHandClass,
} from "components/home/home-typography";
import { TextureSection } from "components/shared/texture-section";
import { BoxImagePlaceholder } from "components/shop/box-image-placeholder";
import { SHOP_IMPACT, SHOP_VALUE_PROPS } from "lib/shop-hub-config";

/** 65% impact block — shared on homepage and /shop opening. */
export function ShopImpactSection() {
  return (
    <TextureSection texture="secondary" className="px-4 py-12 md:px-10 md:py-16">
      <div className="mx-auto max-w-[1400px]">
        <IndexCard panelTexture="secondary" panelTone="cream">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
            <div className="min-w-0">
              <SectionEyebrow>{SHOP_IMPACT.eyebrow}</SectionEyebrow>
              <p
                className={`${homeHandClass} ${bpWhisperUtility} mt-2 text-[clamp(3.25rem,9vw,4.75rem)] font-bold leading-none text-bp-accent`}
              >
                65%
              </p>
              <p
                className={`${bpTitleClass} ${bpTitleUtility} mt-4 text-lg font-bold uppercase leading-snug text-bp-text md:text-xl`}
              >
                {SHOP_IMPACT.headline}
              </p>
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

            <PolaroidFrame index={0} className="mx-auto w-full max-w-md lg:max-w-none">
              <BoxImagePlaceholder
                alt={SHOP_IMPACT.imageAlt}
                note={SHOP_IMPACT.imageNote}
                labelNumber={SHOP_IMPACT.photoNumber}
                className="aspect-[4/5] min-h-[240px] md:min-h-[320px]"
              />
              <p
                className={`${bpTitleClass} ${bpTitleUtility} mt-3 text-center text-sm uppercase tracking-[0.1em] text-bp-text/70`}
              >
                {SHOP_IMPACT.polaroidCaption}
              </p>
            </PolaroidFrame>
          </div>
        </IndexCard>
      </div>
    </TextureSection>
  );
}
