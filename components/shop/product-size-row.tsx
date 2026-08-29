import clsx from "clsx";
import type { SizeAvailability } from "lib/product-variants";
import { bpWhisperUtility } from "components/home/home-typography";

/** Size labels under a tee tile — OOS sizes are struck through and muted. */
export function ProductSizeRow({
  sizes,
  className,
}: {
  sizes: SizeAvailability[];
  className?: string;
}) {
  if (!sizes.length) return null;

  return (
    <ul
      className={clsx(
        "mt-1.5 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5",
        className,
      )}
      aria-label="Available sizes"
    >
      {sizes.map((size) => (
        <li key={size.label}>
          <span
            className={clsx(
              bpWhisperUtility,
              "text-[0.7rem] uppercase tracking-[0.06em]",
              size.available
                ? "text-bp-text/70"
                : "text-bp-text/35 line-through decoration-bp-text/40",
            )}
            title={
              size.available
                ? size.label
                : `${size.label} — out of stock`
            }
          >
            {size.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
