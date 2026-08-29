import Image from "next/image";
import clsx from "clsx";
import { TEXTURE_IMAGES } from "components/shared/texture-section";
import { bpTitleClass, bpTitleUtility } from "components/home/home-typography";

/**
 * Cardboard plaque overlay for unavailable products / tiles.
 * Place inside a `relative` image container.
 */
export function OutOfStockPlaque({
  className,
  label = "Out of stock",
  size = "md",
}: {
  className?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <div
      className={clsx(
        "pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-bp-text/25",
        className,
      )}
      aria-hidden
    >
      <div
        className={clsx(
          "relative rotate-[-6deg] overflow-hidden border border-bp-text/25 shadow-[3px_4px_0_rgba(1,2,0,0.22)]",
          size === "sm" && "px-2.5 py-1.5",
          size === "md" && "px-3.5 py-2",
          size === "lg" && "px-5 py-3",
        )}
      >
        <Image
          src={TEXTURE_IMAGES.secondary}
          alt=""
          fill
          className="object-cover"
          sizes="160px"
        />
        <div className="absolute inset-0 bg-[#f5ebe0]/55" />
        <span
          className={clsx(
            bpTitleClass,
            bpTitleUtility,
            "relative z-[1] block whitespace-nowrap font-bold uppercase tracking-wide text-bp-text",
            size === "sm" && "text-[0.65rem] leading-none",
            size === "md" && "text-xs leading-none sm:text-sm",
            size === "lg" && "text-sm leading-none sm:text-base",
          )}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
