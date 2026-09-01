import clsx from "clsx";

import { bpBodyClass } from "components/home/home-typography";
import { formatPhotoPlaceholderLabel } from "lib/photo-placeholder";

/** Grey framed slot until the real photograph is supplied. */
export function BoxImagePlaceholder({
  alt,
  note,
  className,
  labelNumber,
}: {
  alt: string;
  note?: string;
  className?: string;
  labelNumber: number;
}) {
  const displayLabel = formatPhotoPlaceholderLabel(labelNumber);

  return (
    <div
      role="img"
      aria-label={note ? `${displayLabel}. ${note}` : displayLabel}
      title={alt}
      className={clsx(
        "flex w-full min-w-0 max-w-full flex-col items-center justify-center border border-dashed border-bp-text/25 bg-bp-text/[0.04] px-4 text-center",
        className ?? "aspect-[3/4] min-h-[280px] md:min-h-[380px]",
      )}
    >
      <span className={`${bpBodyClass} text-lg text-bp-text/45`}>
        {displayLabel}
      </span>
    </div>
  );
}
