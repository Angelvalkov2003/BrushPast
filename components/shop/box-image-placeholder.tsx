import clsx from "clsx";
import {
  bpBodyClass,
  bpWhisperUtility,
} from "components/home/home-typography";

/** Grey framed slot until the real photograph is supplied. */
export function BoxImagePlaceholder({
  alt,
  note,
  className,
}: {
  alt: string;
  note: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={alt}
      title={alt}
      className={clsx(
        "flex w-full min-w-0 max-w-full flex-col items-center justify-center border border-dashed border-bp-text/25 bg-bp-text/[0.04] px-4 text-center",
        className ?? "aspect-[3/4] min-h-[280px] md:min-h-[380px]",
      )}
    >
      {/* {note} */}
      <span className={`${bpWhisperUtility} text-lg text-bp-text/45`}>
        Photo to come
      </span>
      <span className={`${bpBodyClass} mt-2 max-w-xs break-words text-xs leading-relaxed text-bp-text/40`}>
        {note}
      </span>
    </div>
  );
}
