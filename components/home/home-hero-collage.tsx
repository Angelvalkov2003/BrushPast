import Image from "next/image";
import clsx from "clsx";

import { bpBodyClass, PAGE_HERO_MEDIA_FRAMELESS_CLASS } from "./home-typography";
import { HOME_HERO_COLLAGE } from "lib/home-config";
import { formatPhotoPlaceholderLabel, PHOTO, photoSrcForNumber } from "lib/photo-placeholder";

/**
 * Homepage hero collage — always frameless.
 * Polaroid/border is baked into the artwork from design; we do not wrap it.
 */
export function HomeHeroCollage({ className }: { className?: string }) {
  const { alt, desktop, mobile, ready } = HOME_HERO_COLLAGE;
  const src = photoSrcForNumber(PHOTO.homeHero) ?? desktop.src;

  if (!ready && !photoSrcForNumber(PHOTO.homeHero)) {
    return (
      <div
        className={clsx(
          "flex w-full items-center justify-center bg-bp-text/[0.04]",
          PAGE_HERO_MEDIA_FRAMELESS_CLASS,
          className,
        )}
        aria-hidden
      >
        <span className={`${bpBodyClass} text-bp-text/45`}>
          {formatPhotoPlaceholderLabel(PHOTO.homeHero)}
        </span>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "relative w-full overflow-visible bg-transparent",
        PAGE_HERO_MEDIA_FRAMELESS_CLASS,
        className,
      )}
    >
      <picture>
        <source media="(max-width: 767px)" srcSet={mobile.src} />
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain object-center !bg-transparent"
        />
      </picture>
    </div>
  );
}
