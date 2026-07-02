"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";

type HomeLinkProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  "aria-label"?: string;
};

function isAtHome(pathname: string | null) {
  return (
    pathname === "/" &&
    window.location.search === "" &&
    window.location.hash === ""
  );
}

/**
 * Reliable link to `/`. Scrolls to top when already home; falls back to full
 * navigation if client-side routing to home fails (seen with Turbopack in dev).
 */
export function HomeLink({ children, className, onClick, "aria-label": ariaLabel }: HomeLinkProps) {
  const pathname = usePathname();
  const router = useRouter();
  const pendingRef = useRef(false);

  useEffect(() => {
    pendingRef.current = false;
  }, [pathname]);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.();

    if (isAtHome(pathname)) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    event.preventDefault();
    pendingRef.current = true;
    router.push("/");

    window.setTimeout(() => {
      if (!pendingRef.current) return;
      if (window.location.pathname !== "/") {
        window.location.assign("/");
      }
    }, 300);
  };

  return (
    <Link
      href="/"
      prefetch
      scroll
      className={className}
      aria-label={ariaLabel}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
