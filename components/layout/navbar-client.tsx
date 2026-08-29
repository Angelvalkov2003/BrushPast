"use client";

import { usePathname } from "next/navigation";
import CartModal from "components/cart/modal";
import BrandLogo from "components/brand-logo";
import { Suspense } from "react";
import MobileMenu from "./navbar/mobile-menu";
import { NavLink, activeNavClass } from "./navbar/nav-link";
import { HomeLink } from "./home-link";
import clsx from "clsx";
import { TEXTURE_IMAGES } from "components/shared/texture-section";

const MAIN_LINKS = [
  { label: "Stories", href: "/stories" },
  { label: "Workshops", href: "/workshops" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
  { label: "Sponsor", href: "/sponsor" },
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
  const shopActive = isShopPath(pathname ?? "");

  const logoLinkClass =
    "relative z-[70] inline-block shrink-0 focus-visible:outline-offset-4";

  return (
    <header className="bp-navbar sticky top-0 z-50 w-full">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${TEXTURE_IMAGES.primary})` }}
        />
        <div className="absolute inset-0 bg-bp-accent-bg/78 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3 md:px-8 md:py-3.5 lg:gap-8 lg:px-10">
        <HomeLink
          className={logoLinkClass}
          aria-label="Brush Past home"
        >
          <BrandLogo
            size="md"
            className="pointer-events-none h-14 w-auto max-w-[185px] lg:h-[72px] lg:max-w-[220px]"
            sizes="(max-width: 1023px) 185px, 220px"
          />
        </HomeLink>

        <div className="flex items-center gap-0.5 lg:hidden">
          <CartModal />
          <Suspense fallback={null}>
            <MobileMenu />
          </Suspense>
        </div>

        <div className="hidden min-w-0 flex-1 items-center justify-between lg:flex">
          <nav
            className="flex min-w-0 flex-1 items-center justify-center gap-5 overflow-visible xl:gap-9"
            aria-label="Main"
          >
            <NavLink href="/stories">Stories</NavLink>
            <NavLink
              href="/shop"
              className={clsx(shopActive && activeNavClass)}
            >
              Shop
            </NavLink>
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
