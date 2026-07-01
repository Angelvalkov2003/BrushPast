"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reducedMotion = usePrefersReducedMotion();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin || reducedMotion) {
    return children;
  }

  return <div className="page-route-enter">{children}</div>;
}
