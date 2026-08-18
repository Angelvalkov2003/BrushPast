import Link from "next/link";
import clsx from "clsx";
import { PolaroidFrame } from "components/home/home-decor";
import {
  bpBodyClass,
  bpLinkUtility,
  bpTitleClass,
  bpTitleUtility,
  bpWhisperUtility,
  homeHandClass,
} from "components/home/home-typography";
import { BoxImagePlaceholder } from "./box-image-placeholder";
import type { BoxHubCard } from "lib/shop-box-config";

export function BoxTypeCard({
  card,
  index,
}: {
  card: BoxHubCard;
  index: number;
}) {
  const reversed = index % 2 === 1;
  const inner = (
    <>
      <div className={reversed ? "md:pl-4" : "md:pr-4"}>
        <p
          className={`${homeHandClass} ${bpWhisperUtility} text-xl text-bp-accent`}
        >
          {card.eyebrow}
          {card.comingSoon && card.available ? (
            <span className={`${bpBodyClass} ml-3 text-xs font-bold uppercase tracking-[0.16em] text-bp-text/45`}>
              Next
            </span>
          ) : null}
        </p>
        <h2
          className={`${bpTitleClass} ${bpTitleUtility} mt-1 text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-tight text-bp-text`}
        >
          {card.name}
        </h2>
        <p className={`${bpBodyClass} mt-4 max-w-md text-bp-text/80`}>
          {card.description}
        </p>
        <p
          className={clsx(
            `${bpBodyClass} ${bpLinkUtility} mt-6 font-bold`,
            card.available
              ? "text-bp-accent opacity-80 transition-opacity group-hover:opacity-100"
              : "text-bp-text/45",
          )}
        >
          {card.cta}
        </p>
      </div>

      <PolaroidFrame index={index + 1} className="group-hover:rotate-0">
        <BoxImagePlaceholder alt={card.imageAlt} note={card.imageNote} />
      </PolaroidFrame>
    </>
  );

  const layoutClass = clsx(
    "group grid gap-10 border-b border-bp-text/10 py-12 md:grid-cols-2 md:items-center md:gap-14 md:py-16",
    reversed && "md:[&>div:first-child]:order-2",
  );

  if (!card.available || !card.href) {
    return (
      <div
        className={clsx(layoutClass, "cursor-not-allowed opacity-70")}
        aria-disabled="true"
      >
        {inner}
      </div>
    );
  }

  return (
    <Link href={card.href} className={layoutClass}>
      {inner}
    </Link>
  );
}
