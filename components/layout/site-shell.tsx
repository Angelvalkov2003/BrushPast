"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ConditionalNavbar } from "./conditional-navbar";

/**
 * Public chrome. Always keep the same outer tags on server and client so
 * usePathname admin checks cannot cause hydration tag mismatches.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  return (
    <div id="bp-site-shell" data-shell={isAdmin ? "admin" : "public"}>
      {isAdmin ? null : <ConditionalNavbar />}
      <main className="min-w-0 max-w-full">{children}</main>
    </div>
  );
}
