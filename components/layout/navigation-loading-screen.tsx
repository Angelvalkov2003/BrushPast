"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { PageLoadingScreen } from "./page-loading-screen";
import type { TextureVariant } from "components/shared/texture-section";

type NavigationLoadingScreenProps = {
  texture?: TextureVariant;
};

export function NavigationLoadingScreen({
  texture = "primary",
}: NavigationLoadingScreenProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <PageLoadingScreen texture={texture} fixed />,
    document.body,
  );
}
