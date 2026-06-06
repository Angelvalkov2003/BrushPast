"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const BP_SITE_CLASS = "bp-site";
const ADMIN_SITE_CLASS = "admin-site";

/**
 * Applies brand body styles on public routes; forces light admin theme on /admin/*.
 */
export function PublicBodyTheme() {
  const pathname = usePathname();

  useEffect(() => {
    const isAdmin = pathname?.startsWith("/admin") ?? false;
    document.body.classList.toggle(BP_SITE_CLASS, !isAdmin);
    document.body.classList.toggle(ADMIN_SITE_CLASS, isAdmin);

    if (isAdmin) {
      document.documentElement.dataset.adminTheme = "light";
      document.documentElement.style.colorScheme = "light";
      document.documentElement.classList.remove("dark");
    } else {
      delete document.documentElement.dataset.adminTheme;
      document.documentElement.style.colorScheme = "";
      document.documentElement.classList.remove("dark");
    }

    return () => {
      document.body.classList.remove(BP_SITE_CLASS);
      document.body.classList.remove(ADMIN_SITE_CLASS);
      delete document.documentElement.dataset.adminTheme;
      document.documentElement.style.colorScheme = "";
    };
  }, [pathname]);

  return null;
}
