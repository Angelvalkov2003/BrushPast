"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ConditionalNavbar } from "./conditional-navbar";

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div id="bp-site-shell">
      <ConditionalNavbar />
      <main className="min-w-0 max-w-full" suppressHydrationWarning>
        {children}
      </main>
    </div>
  );
}
