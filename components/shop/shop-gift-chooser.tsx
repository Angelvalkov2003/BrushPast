import Link from "next/link";
import clsx from "clsx";
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
import {
  SHOP_BUILD_OWN,
  SHOP_GIFT_CHOOSER,
  SHOP_MOBILE_BOX_CARDS,
  SHOP_PAIR_OPTIONS,
  SHOP_SIGNATURE,
  SHOP_SINGLE_OPTIONS,
} from "lib/shop-hub-config";

function GiftThis({ compact }: { compact?: boolean }) {
  return (
    <span
      className={clsx(
        bpBodyClass,
        bpLinkUtility,
        "inline-block font-bold text-bp-accent",
        compact ? "mt-3 text-sm" : "mt-4",
      )}
    >
      Gift this →
    </span>
  );
}

function ChooserHeading({
  number,
  title,
  compact,
}: {
  number: string;
  title: string;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "mb-4" : "mb-6"}>
      <p
        className={`${bpBodySmClass} font-bold uppercase tracking-[0.18em] text-bp-text/45`}
      >
        {number}
      </p>
      <h3
        className={clsx(
          bpTitleClass,
          bpTitleUtility,
          "mt-1 font-bold uppercase tracking-wide text-bp-text",
          compact ? "text-lg md:text-xl" : "text-2xl md:text-3xl",
        )}
      >
        {title}
      </h3>
    </div>
  );
}

export function ShopGiftChooser({ compact = false }: { compact?: boolean }) {
  const cardPad = compact ? "!p-4 md:!p-5" : undefined;
  const singleImageClass = compact
    ? "aspect-[4/5] min-h-[140px]"
    : "aspect-[4/5] min-h-[220px]";
  const pairImageClass = compact
    ? "aspect-square min-h-[120px]"
    : "aspect-square min-h-[160px]";
  const signatureImageClass = compact
    ? "aspect-[5/3] min-h-[160px]"
    : "aspect-[5/3] min-h-[220px]";
  const buildImageClass = compact
    ? "aspect-[5/3] min-h-[140px]"
    : "aspect-[5/3] min-h-[180px]";

  return (
    <TextureSection
      texture="primary"
      className={clsx(
        "px-4 md:px-10",
        compact ? "py-10 md:py-12" : "py-14 md:py-20",
      )}
    >
      <div
        id={compact ? undefined : "choose-box"}
        className="mx-auto max-w-[1400px] scroll-mt-28"
      >
        <HomeSectionTitle
          eyebrow={SHOP_GIFT_CHOOSER.eyebrow}
          title={SHOP_GIFT_CHOOSER.title}
          align="left"
          size={compact ? "default" : "lg"}
          headingAs="h2"
        />
        <p
          className={clsx(
            bpBodyClass,
            "mt-3 max-w-2xl text-bp-text/70",
            compact && "text-sm",
          )}
        >
          {SHOP_GIFT_CHOOSER.subtitle}
        </p>

        <div className={clsx(compact ? "mt-8 md:hidden" : "mt-12 md:hidden")}>
          <div className={clsx("grid gap-6", compact ? "grid-cols-2" : "gap-8")}>
            {SHOP_MOBILE_BOX_CARDS.map((option, index) => (
              <Link key={option.type} href={option.href} className="group block min-w-0">
                <PolaroidFrame index={index} className="group-hover:rotate-0">
                  <BoxImagePlaceholder
                    alt={option.imageAlt}
                    note={option.imageNote}
                    labelNumber={option.photoNumber}
                    className={
                      compact
                        ? "aspect-[4/5] min-h-[120px]"
                        : "aspect-[4/5] min-h-[240px]"
                    }
                  />
                </PolaroidFrame>
                <h3
                  className={clsx(
                    bpTitleClass,
                    bpTitleUtility,
                    "mt-3 font-bold uppercase tracking-wide text-bp-text",
                    compact ? "text-base" : "text-3xl",
                  )}
                >
                  {option.title}
                </h3>
                {!compact ? (
                  <>
                    <p className={`${bpBodyClass} mt-2 text-bp-text/75`}>
                      {option.description}
                    </p>
                    <GiftThis />
                  </>
                ) : (
                  <GiftThis compact />
                )}
              </Link>
            ))}
          </div>
        </div>

        <div
          className={clsx(
            "hidden space-y-6 md:block",
            compact ? "mt-8" : "mt-12 space-y-8",
          )}
        >
          <IndexCard className={cardPad}>
            <ChooserHeading
              compact={compact}
              number="01"
              title="Single Collection (choose one)"
            />
            <div className="grid gap-5 sm:grid-cols-3">
              {SHOP_SINGLE_OPTIONS.map((option, index) => (
                <Link key={option.key} href={option.href} className="group block">
                  <PolaroidFrame index={index} className="group-hover:rotate-0">
                    <BoxImagePlaceholder
                      alt={option.imageAlt}
                      note={option.imageNote}
                      labelNumber={option.photoNumber}
                      className={singleImageClass}
                    />
                  </PolaroidFrame>
                  <h4
                    className={clsx(
                      bpTitleClass,
                      bpTitleUtility,
                      "mt-3 font-bold text-bp-text",
                      compact ? "text-lg" : "text-2xl",
                    )}
                  >
                    {option.title}
                  </h4>
                  <p
                    className={clsx(
                      bpBodyClass,
                      "mt-1 text-bp-text/75",
                      compact && "text-sm",
                    )}
                  >
                    {option.description}
                  </p>
                  <GiftThis compact={compact} />
                </Link>
              ))}
            </div>
          </IndexCard>

          <IndexCard className={cardPad}>
            <ChooserHeading
              compact={compact}
              number="02"
              title="Curated Pairings (choose two)"
            />
            <div className="grid gap-4 sm:grid-cols-3">
              {SHOP_PAIR_OPTIONS.map((option, index) => (
                <Link key={option.key} href={option.href} className="group block">
                  <PolaroidFrame index={index + 1} className="group-hover:rotate-0">
                    <BoxImagePlaceholder
                      alt={option.imageAlt}
                      note={option.imageNote}
                      labelNumber={option.photoNumber}
                      className={pairImageClass}
                    />
                  </PolaroidFrame>
                  <h4
                    className={clsx(
                      bpTitleClass,
                      bpTitleUtility,
                      "mt-3 font-bold text-bp-text",
                      compact ? "text-base" : "text-xl",
                    )}
                  >
                    {option.title}
                  </h4>
                  <p
                    className={clsx(
                      bpBodySmClass,
                      "mt-1 font-bold text-bp-accent",
                      compact && "text-xs",
                    )}
                  >
                    {option.priceLabel}
                  </p>
                  <GiftThis compact={compact} />
                </Link>
              ))}
            </div>
          </IndexCard>

          <div
            className={clsx(
              "grid gap-6",
              compact ? "lg:grid-cols-2" : "gap-8",
            )}
          >
            <IndexCard className={cardPad}>
              <ChooserHeading
                compact={compact}
                number="03"
                title="Next Chapter (all three)"
              />
              <Link
                href={SHOP_SIGNATURE.href}
                className="group grid gap-5 md:grid-cols-2 md:items-center"
              >
                <PolaroidFrame index={2} className="group-hover:rotate-0">
                  <BoxImagePlaceholder
                    alt={SHOP_SIGNATURE.imageAlt}
                    note={SHOP_SIGNATURE.imageNote}
                    labelNumber={SHOP_SIGNATURE.photoNumber}
                    className={signatureImageClass}
                  />
                </PolaroidFrame>
                <div>
                  <p
                    className={clsx(
                      homeHandClass,
                      bpWhisperUtility,
                      "text-bp-accent",
                      compact ? "text-lg" : "text-2xl",
                    )}
                  >
                    {SHOP_SIGNATURE.proposition}
                  </p>
                  <h4
                    className={clsx(
                      bpTitleClass,
                      bpTitleUtility,
                      "mt-2 font-bold uppercase leading-tight text-bp-text",
                      compact
                        ? "text-xl md:text-2xl"
                        : "text-[clamp(1.85rem,4vw,2.75rem)]",
                    )}
                  >
                    {SHOP_SIGNATURE.title}
                  </h4>
                  <p
                    className={clsx(
                      bpBodyClass,
                      "mt-2 text-bp-text/75",
                      compact && "text-sm",
                    )}
                  >
                    {SHOP_SIGNATURE.description}
                  </p>
                  <p
                    className={clsx(
                      bpTitleClass,
                      bpTitleUtility,
                      "mt-3 font-bold text-bp-accent",
                      compact ? "text-xl" : "text-3xl",
                    )}
                  >
                    {SHOP_SIGNATURE.priceLabel}
                  </p>
                  <GiftThis compact={compact} />
                </div>
              </Link>
            </IndexCard>

            <IndexCard className={cardPad}>
              <ChooserHeading
                compact={compact}
                number="04"
                title="Build Your Own (pick & mix)"
              />
              <div className="grid gap-5 md:grid-cols-2 md:items-center">
                <div>
                  <h4
                    className={clsx(
                      bpTitleClass,
                      bpTitleUtility,
                      "font-bold uppercase leading-tight text-bp-text",
                      compact
                        ? "text-xl md:text-2xl"
                        : "text-[clamp(1.85rem,4vw,2.75rem)]",
                    )}
                  >
                    {SHOP_BUILD_OWN.title}
                  </h4>
                  <p
                    className={clsx(
                      bpBodyClass,
                      "mt-3 text-bp-text/75",
                      compact && "text-sm",
                    )}
                  >
                    {SHOP_BUILD_OWN.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {SHOP_BUILD_OWN.checks.map((label) => (
                      <span
                        key={label}
                        className={clsx(
                          bpBodySmClass,
                          "flex items-center gap-2 text-bp-text/70",
                          compact && "text-xs",
                        )}
                      >
                        <span
                          className="inline-block h-3.5 w-3.5 border border-bp-text/40 bg-bp-canvas/70"
                          aria-hidden
                        />
                        {label}
                      </span>
                    ))}
                  </div>
                  <HomeCta
                    href={SHOP_BUILD_OWN.href}
                    className={compact ? "mt-5" : "mt-8"}
                    variant="primary"
                  >
                    Build your box →
                  </HomeCta>
                </div>
                <PolaroidFrame index={3} tilt={false}>
                  <BoxImagePlaceholder
                    alt={SHOP_BUILD_OWN.imageAlt}
                    note={SHOP_BUILD_OWN.imageNote}
                    labelNumber={SHOP_BUILD_OWN.photoNumber}
                    className={buildImageClass}
                  />
                </PolaroidFrame>
              </div>
            </IndexCard>
          </div>
        </div>
      </div>
    </TextureSection>
  );
}
