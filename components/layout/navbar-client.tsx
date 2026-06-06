"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import CartModal from "components/cart/modal";
import BrandLogo from "components/brand-logo";
import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./navbar/mobile-menu";
import { NavLink } from "./navbar/nav-link";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import {
  dropdownItemClass,
  dropdownPanelClass,
} from "lib/brand-classes";

interface Collection {
  id: string;
  handle: string;
  title: string;
}

const MAIN_LINKS = [
  { label: "Stories", href: "/stories" },
  { label: "Workshops", href: "/workshops" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
  { label: "Get in Touch", href: "/contact" },
] as const;

function isShopPath(pathname: string) {
  return (
    pathname.startsWith("/shop") ||
    pathname.startsWith("/search") ||
    pathname.startsWith("/products") ||
    pathname.startsWith("/product")
  );
}

export function NavbarClient() {
  const pathname = usePathname();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [shopOpen, setShopOpen] = useState(false);
  const shopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/collections")
      .then((res) => res.json())
      .then((data) => {
        setCollections(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shopRef.current && !shopRef.current.contains(event.target as Node)) {
        setShopOpen(false);
      }
    };
    if (shopOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [shopOpen]);

  const collectionMenu = collections.map((c) => ({
    title: c.title,
    path: `/shop/${c.handle}`,
  }));

  return (
    <header className="bp-navbar sticky top-0 z-40 w-full">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 md:px-8 lg:px-10">
        {/* Mobile: logo left */}
        <Link
          href="/"
          prefetch
          className="relative z-50 shrink-0 lg:hidden"
          aria-label="Brush Past home"
        >
          <BrandLogo size="md" priority />
        </Link>

        {/* Mobile: cart + menu (right) */}
        <div className="flex items-center gap-0.5 lg:hidden">
          <CartModal />
          <Suspense fallback={null}>
            <MobileMenu collections={collectionMenu} loading={loading} />
          </Suspense>
        </div>

        {/* Desktop */}
        <div className="hidden w-full items-center justify-between lg:flex">
          <Link href="/" prefetch className="shrink-0" aria-label="Brush Past home">
            <BrandLogo size="lg" priority />
          </Link>

          <nav
            className="flex flex-1 items-center justify-center gap-8 xl:gap-10"
            aria-label="Main"
          >
            <NavLink href="/stories">Stories</NavLink>

            <div className="relative" ref={shopRef}>
              <button
                type="button"
                onClick={() => setShopOpen((o) => !o)}
                className={clsx(
                  "flex items-center gap-1 text-sm font-bold uppercase tracking-[0.12em] text-bp-text transition-colors hover:text-bp-accent",
                  (shopOpen || isShopPath(pathname ?? "")) &&
                    "text-bp-accent underline decoration-bp-accent decoration-wavy decoration-2 underline-offset-[6px]",
                )}
                aria-expanded={shopOpen}
                aria-haspopup="true"
              >
                Shop
                <ChevronDownIcon
                  className={clsx(
                    "h-4 w-4 stroke-[2.5] transition-transform",
                    shopOpen && "rotate-180",
                  )}
                />
              </button>
              {shopOpen ? (
                <div
                  className={`absolute left-1/2 top-full z-50 mt-3 w-52 -translate-x-1/2 ${dropdownPanelClass}`}
                >
                  <ul className="py-2">
                    <li>
                      <Link
                        href="/shop"
                        className={dropdownItemClass}
                        onClick={() => setShopOpen(false)}
                      >
                        The Archive Shop
                      </Link>
                    </li>
                    {!loading &&
                      collections.map((c) => (
                        <li key={c.id}>
                          <Link
                            href={`/shop/${c.handle}`}
                            className={dropdownItemClass}
                            onClick={() => setShopOpen(false)}
                          >
                            {c.title}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              ) : null}
            </div>

            {MAIN_LINKS.slice(1).map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-5">
            <Link
              href="/share-your-story"
              className="bg-bp-accent px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-bp-canvas transition-opacity hover:opacity-90"
            >
              Share your story
            </Link>
            <CartModal />
          </div>
        </div>
      </div>
    </header>
  );
}
