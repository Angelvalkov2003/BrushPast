"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const BP_SITE_CLASS = "bp-site";

/**
 * Applies brand body styles on public routes only. Admin (/admin/*) unchanged.
 */
export function PublicBodyTheme() {
  const pathname = usePathname();

  useEffect(() => {
    const isAdmin = pathname?.startsWith("/admin") ?? false;
    document.body.classList.toggle(BP_SITE_CLASS, !isAdmin);
    return () => {
      document.body.classList.remove(BP_SITE_CLASS);
    };
  }, [pathname]);

  return null;
}
