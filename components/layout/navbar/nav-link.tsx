"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** Match child paths, e.g. /shop for /search and /products; /contact for get-in-touch */
  activePrefix?: string;
  onClick?: () => void;
};

export function NavLink({
  href,
  children,
  className,
  activePrefix,
  onClick,
}: NavLinkProps) {
  const pathname = usePathname();
  const prefix = activePrefix ?? href;
  const isActive =
    pathname === href ||
    (prefix !== "/" && pathname.startsWith(`${prefix}/`)) ||
    pathname === prefix;

  return (
    <Link
      href={href}
      prefetch
      onClick={onClick}
      className={clsx(
        "text-sm font-bold uppercase tracking-[0.12em] text-bp-text transition-colors hover:text-bp-accent",
        isActive &&
          "underline decoration-bp-accent decoration-wavy decoration-2 underline-offset-[6px]",
        className,
      )}
    >
      {children}
    </Link>
  );
}
