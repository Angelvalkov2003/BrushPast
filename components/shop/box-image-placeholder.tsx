import Image from "next/image";
import clsx from "clsx";

import { bpBodyClass } from "components/home/home-typography";
import {
  formatPhotoPlaceholderLabel,
  photoSrcForNumber,
} from "lib/photo-placeholder";

/** Numbered photo slot — shows the real image when available, else a grey placeholder. */
export function BoxImagePlaceholder({
  alt,
  note,
  className,
  labelNumber,
  objectFit = "cover",
  priority = false,
}: {
  alt: string;
  note?: string;
  className?: string;
  labelNumber: number;
  objectFit?: "cover" | "contain";
  priority?: boolean;
}) {
  const displayLabel = formatPhotoPlaceholderLabel(labelNumber);
  const src = photoSrcForNumber(labelNumber);
  const frameClass = clsx(
    "relative w-full min-w-0 max-w-full overflow-hidden",
    className ?? "aspect-[3/4] min-h-[280px] md:min-h-[380px]",
  );

  if (src) {
    return (
      <div
        className={clsx(
          frameClass,
          objectFit === "contain" && "bg-bp-dark",
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className={clsx(
            "object-center",
            objectFit === "contain" ? "object-contain" : "object-cover",
          )}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={note ? `${displayLabel}. ${note}` : displayLabel}
      title={alt}
      className={clsx(
        frameClass,
        "flex flex-col items-center justify-center border border-dashed border-bp-text/25 bg-bp-text/[0.04] px-4 text-center",
      )}
    >
      <span className={`${bpBodyClass} text-lg text-bp-text/45`}>
        {displayLabel}
      </span>
    </div>
  );
}
