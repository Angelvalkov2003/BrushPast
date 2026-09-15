import Image from "next/image";
import BrandLogo from "components/brand-logo";
import {
  TEXTURE_IMAGES,
  type TextureVariant,
} from "components/shared/texture-section";

type PageLoadingScreenProps = {
  texture?: TextureVariant;
  /** When false, render inline (for route loading.tsx). Default portal-ready fixed overlay. */
  fixed?: boolean;
};

/** Cardboard + logo loading UI — works in SSR route `loading.tsx` and client overlays. */
export function PageLoadingScreen({
  texture = "primary",
  fixed = true,
}: PageLoadingScreenProps) {
  return (
    <div
      className={
        fixed
          ? "fixed inset-0 z-[200] flex min-h-[100dvh] items-center justify-center bg-bp-accent-bg"
          : "flex min-h-[70vh] w-full items-center justify-center bg-bp-accent-bg"
      }
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <Image
          src={TEXTURE_IMAGES[texture]}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-bp-accent-bg/78 backdrop-blur-[1px]" />
      </div>
      <div className="navigation-loading-logo relative z-10">
        <BrandLogo size="hero" priority />
      </div>
    </div>
  );
}
