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

/** Cardboard texture washed in brand beige, with a pulsing logo centred. */
export function PageLoadingScreen({
  texture = "primary",
  fixed = true,
}: PageLoadingScreenProps) {
  return (
    <div
      className={
        fixed
          ? "fixed inset-0 z-[200] flex min-h-[100dvh] items-center justify-center bg-bp-canvas"
          : "relative flex min-h-[70vh] w-full items-center justify-center bg-bp-canvas"
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
          className="object-cover opacity-55"
          sizes="100vw"
          priority
        />
        {/* Main beige wash so cardboard reads as brand canvas */}
        <div className="absolute inset-0 bg-bp-canvas/72" />
      </div>
      <div className="navigation-loading-logo relative z-10 mx-auto">
        <BrandLogo size="hero" priority className="mx-auto object-center" />
      </div>
    </div>
  );
}
