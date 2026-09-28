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
    <div className={compact ? "mb-3" : "mb-5"}>
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
          compact
            ? "text-base sm:text-lg md:text-xl"
            : "text-lg sm:text-xl md:text-3xl",
        )}
      >
        {title}
      </h3>
    </div>
  );
}

function TrioTile({
  href,
  imageAlt,
  imageNote,
  photoNumber,
  title,
  subtitle,
  accentSubtitle,
  compact,
}: {
  href: string;
  imageAlt: string;
  imageNote?: string;
  photoNumber: number;
  title: string;
  subtitle?: string;
  accentSubtitle?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href={href}
      className="group relative block min-w-0 overflow-hidden bg-bp-text/5"
    >
      <BoxImagePlaceholder
        alt={imageAlt}
        note={imageNote}
        labelNumber={photoNumber}
        className="aspect-square min-h-0"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bp-text/90 via-bp-text/45 to-transparent px-1.5 pb-1.5 pt-6 sm:px-2.5 sm:pb-2.5 sm:pt-8">
        <h4
          className={clsx(
            bpTitleClass,
            bpTitleUtility,
            "font-bold uppercase leading-tight tracking-wide text-bp-canvas",
            compact
              ? "text-[9px] sm:text-[10px] md:text-xs"
              : "text-[10px] sm:text-xs md:text-sm",
          )}
        >
          {title}
        </h4>
        {accentSubtitle ? (
          <p className="mt-0.5 text-[9px] font-bold text-bp-accent sm:text-[10px] md:text-xs">
            {accentSubtitle}
          </p>
        ) : null}
        {subtitle && !compact ? (
          <p className="mt-0.5 hidden text-[11px] leading-snug text-bp-canvas/80 md:block">
            {subtitle}
          </p>
        ) : null}
      </div>
    </Link>
  );
}

export function ShopGiftChooser({ compact = false }: { compact?: boolean }) {
  const cardPad = compact ? "!p-3 sm:!p-4 md:!p-5" : "!p-4 md:!p-6";
  const signatureImageClass = compact
    ? "aspect-[5/3] min-h-[140px]"
    : "aspect-[5/3] min-h-[160px] md:min-h-[220px]";
  const buildImageClass = compact
    ? "aspect-[5/3] min-h-[120px]"
    : "aspect-[5/3] min-h-[140px] md:min-h-[180px]";

  return (
    <TextureSection
      texture="primary"
      className={clsx(
        "px-4 md:px-10",
        compact ? "py-10 md:py-12" : "py-12 md:py-20",
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
          font="display"
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

        <div className={clsx("space-y-5 md:space-y-8", compact ? "mt-8" : "mt-10 md:mt-12")}>
          <IndexCard className={cardPad}>
            <ChooserHeading
              compact={compact}
              number="01"
              title="One Piece Gift Boxes (choose one)"
            />
            <div className="grid grid-cols-3 gap-1 sm:gap-2">
              {SHOP_SINGLE_OPTIONS.map((option) => (
                <TrioTile
                  key={option.key}
                  href={option.href}
                  imageAlt={option.imageAlt}
                  imageNote={option.imageNote}
                  photoNumber={option.photoNumber}
                  title={option.title}
                  subtitle={option.description}
                  compact={compact}
                />
              ))}
            </div>
          </IndexCard>

          <IndexCard className={cardPad}>
            <ChooserHeading
              compact={compact}
              number="02"
              title="Two Piece Gift Boxes (choose two)"
            />
            <div className="grid grid-cols-3 gap-1 sm:gap-2">
              {SHOP_PAIR_OPTIONS.map((option) => (
                <TrioTile
                  key={option.key}
                  href={option.href}
                  imageAlt={option.imageAlt}
                  imageNote={option.imageNote}
                  photoNumber={option.photoNumber}
                  title={option.title}
                  accentSubtitle={option.priceLabel}
                  compact={compact}
                />
              ))}
            </div>
          </IndexCard>

          <div className="grid gap-5 md:grid-cols-2 md:gap-6 lg:gap-8">
            <IndexCard className={cardPad}>
              <ChooserHeading
                compact={compact}
                number="03"
                title="The Next Chapter Box (all three)"
              />
              <Link
                href={SHOP_SIGNATURE.href}
                className="group grid gap-4 sm:grid-cols-2 sm:items-center sm:gap-5"
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
                      compact ? "text-base sm:text-lg" : "text-lg sm:text-2xl",
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
                        ? "text-lg sm:text-xl"
                        : "text-xl sm:text-[clamp(1.85rem,4vw,2.75rem)]",
                    )}
                  >
                    {SHOP_SIGNATURE.title}
                  </h4>
                  <p
                    className={clsx(
                      bpBodyClass,
                      "mt-2 text-bp-text/75",
                      compact ? "text-sm" : "text-sm sm:text-base",
                    )}
                  >
                    {SHOP_SIGNATURE.description}
                  </p>
                  <p
                    className={clsx(
                      bpTitleClass,
                      bpTitleUtility,
                      "mt-3 font-bold text-bp-accent",
                      compact ? "text-lg" : "text-2xl sm:text-3xl",
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
                title="Build Your Own Gift Box (pick & mix)"
              />
              <div className="grid gap-4 sm:grid-cols-2 sm:items-center sm:gap-5">
                <div>
                  <h4
                    className={clsx(
                      bpTitleClass,
                      bpTitleUtility,
                      "font-bold uppercase leading-tight text-bp-text",
                      compact
                        ? "text-lg sm:text-xl"
                        : "text-xl sm:text-[clamp(1.85rem,4vw,2.75rem)]",
                    )}
                  >
                    {SHOP_BUILD_OWN.title}
                  </h4>
                  <p
                    className={clsx(
                      bpBodyClass,
                      "mt-3 text-bp-text/75",
                      compact ? "text-sm" : "text-sm sm:text-base",
                    )}
                  >
                    {SHOP_BUILD_OWN.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 sm:mt-4 sm:gap-3">
                    {SHOP_BUILD_OWN.checks.map((label) => (
                      <span
                        key={label}
                        className={clsx(
                          bpBodySmClass,
                          "flex items-center gap-2 text-bp-text/70",
                          "text-[11px] sm:text-xs",
                        )}
                      >
                        <span
                          className="inline-block h-3 w-3 border border-bp-text/40 bg-bp-canvas/70 sm:h-3.5 sm:w-3.5"
                          aria-hidden
                        />
                        {label}
                      </span>
                    ))}
                  </div>
                  <HomeCta
                    href={SHOP_BUILD_OWN.href}
                    className={compact ? "mt-5" : "mt-6 sm:mt-8"}
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
