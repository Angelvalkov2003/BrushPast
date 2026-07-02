"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import BrandLogo from "components/brand-logo";
import { TEXTURE_IMAGES, type TextureVariant } from "components/shared/texture-section";

type NavigationLoadingScreenProps = {
  texture?: TextureVariant;
};

export function NavigationLoadingScreen({ texture = "primary" }: NavigationLoadingScreenProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      className="navigation-loading-screen fixed inset-0 z-[200] flex min-h-[100dvh] items-center justify-center bg-bp-accent-bg"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <Image
        src={TEXTURE_IMAGES[texture]}
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0 bg-bp-accent-bg/78 backdrop-blur-[1px]" aria-hidden />
      <div className="navigation-loading-logo relative z-10">
        <BrandLogo size="hero" />
      </div>
    </div>,
    document.body,
  );
}
