"use client";

import { useEffect, useState } from "react";
import BrandLogo from "components/brand-logo";
import type { TextureVariant } from "components/shared/texture-section";
import { PageLoadingScreen } from "./page-loading-screen";

const FIRST_VISIT_KEY = "bp-cardboard-seen";

/**
 * Route `loading.tsx` fallback: full cardboard + logo on first visit this session.
 * Later navigations still show the logo (shorter, no full-screen cardboard).
 */
export function PageLoadingGate({
  texture = "primary",
}: {
  texture?: TextureVariant;
}) {
  const [mode, setMode] = useState<"pending" | "full" | "minimal">("pending");

  useEffect(() => {
    try {
      const seen = sessionStorage.getItem(FIRST_VISIT_KEY) === "1";
      if (seen) {
        setMode("minimal");
        return;
      }
      sessionStorage.setItem(FIRST_VISIT_KEY, "1");
      setMode("full");
    } catch {
      setMode("full");
    }
  }, []);

  if (mode === "pending" || mode === "minimal") {
    return (
      <div
        className="flex min-h-[40vh] w-full items-center justify-center bg-bp-accent-bg/40"
        role="status"
        aria-live="polite"
        aria-label="Loading page"
      >
        <div className="navigation-loading-logo">
          <BrandLogo size="lg" priority />
        </div>
      </div>
    );
  }

  return <PageLoadingScreen texture={texture} fixed={false} />;
}
