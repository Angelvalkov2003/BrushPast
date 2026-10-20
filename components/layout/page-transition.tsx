"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

/**
 * Keep a stable DOM wrapper on server + first client paint to avoid hydration
 * mismatches (prefers-reduced-motion / admin branching must not change tags).
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      setAnimate(false);
      return;
    }

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setAnimate(false);
      return;
    }

    // Remount animation on route change after hydration only
    setAnimate(false);
    const frame = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(frame);
  }, [pathname, isAdmin]);

  return (
    <div
      className={animate ? "page-route-enter" : undefined}
      data-page-transition={isAdmin ? "admin" : "public"}
    >
      {children}
    </div>
  );
}
