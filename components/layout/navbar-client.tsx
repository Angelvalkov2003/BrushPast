"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import CartModal from "components/cart/modal";
import BrandLogo from "components/brand-logo";
import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./navbar/mobile-menu";
import { NavLink, activeNavClass } from "./navbar/nav-link";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { homeHandClass } from "components/home/home-typography";
import { TEXTURE_IMAGES } from "components/shared/texture-section";

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
  const router = useRouter();
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

  const shopActive = shopOpen || isShopPath(pathname ?? "");

  const handleShopClick = () => {
    if (pathname !== "/shop") {
      router.push("/shop");
    }
    setShopOpen((open) => !open);
  };

  return (
    <header className="bp-navbar sticky top-0 z-50 w-full">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${TEXTURE_IMAGES.primary})` }}
        />
        <div className="absolute inset-0 bg-bp-accent-bg/78 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3 md:px-8 md:py-3.5 lg:px-10">
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
            className="flex flex-1 items-center justify-center gap-7 overflow-visible xl:gap-9"
            aria-label="Main"
          >
            <NavLink href="/stories">Stories</NavLink>

            <div className="relative z-[60]" ref={shopRef}>
              <button
                type="button"
                onClick={handleShopClick}
                className={clsx(
                  `${homeHandClass} flex items-center gap-1 text-xl text-bp-text/85 transition-colors hover:text-bp-accent md:text-2xl`,
                  shopActive && activeNavClass,
                )}
                aria-expanded={shopOpen}
                aria-haspopup="true"
              >
                Shop
                <ChevronDownIcon
                  className={clsx(
                    "h-5 w-5 stroke-[2] transition-transform",
                    shopOpen && "rotate-180",
                  )}
                />
              </button>
              {shopOpen ? (
                <div className="absolute left-1/2 top-full z-[70] mt-3 w-56 -translate-x-1/2 overflow-hidden border border-bp-text/12 bg-bp-accent-bg shadow-[4px_5px_0_rgba(1,2,0,0.12)]">
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-40"
                    style={{ backgroundImage: `url(${TEXTURE_IMAGES.primary})` }}
                    aria-hidden
                  />
                  <div className="absolute inset-0 bg-bp-accent-bg/88 backdrop-blur-[1px]" aria-hidden />
                  <ul className="relative py-2">
                    {!loading && collections.length > 0 ? (
                      collections.map((c) => (
                        <li key={c.id}>
                          <Link
                            href={`/shop/${c.handle}`}
                            className={`${homeHandClass} block px-5 py-2.5 text-lg text-bp-text/85 transition-colors hover:bg-bp-canvas/80 hover:text-bp-accent`}
                            onClick={() => setShopOpen(false)}
                          >
                            {c.title}
                          </Link>
                        </li>
                      ))
                    ) : (
                      <li>
                        <span className={`${homeHandClass} block px-5 py-2.5 text-lg text-bp-text/50`}>
                          {loading ? "Loading…" : "No categories yet"}
                        </span>
                      </li>
                    )}
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
            <CartModal />
          </div>
        </div>
      </div>
    </header>
  );
}
