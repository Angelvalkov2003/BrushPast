"use client";

import { Transition } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  Bars3Icon,
  ChevronDownIcon,
  EnvelopeIcon,
  PhoneIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { TEXTURE_IMAGES } from "components/shared/texture-section";
import { CONTACT_PHONE_TEL, PUBLIC_CONTACT_EMAIL } from "lib/site-config";
import { NavLink } from "./nav-link";

type MenuItem = {
  title: string;
  path: string;
};

const MAIN_LINKS = [
  { label: "Stories", href: "/stories" },
  { label: "Workshops", href: "/workshops" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
  { label: "Get in Touch", href: "/contact" },
] as const;

/** Mobile drawer — one size/style for every top-level item (text-xl = 20px) */
const mobileNavItemClass =
  "block py-3 text-xl font-normal text-bp-text/85 transition-colors hover:text-bp-accent";
const mobileShopToggleClass =
  "flex w-full items-center justify-between py-3 text-xl font-normal text-bp-text/85 transition-colors hover:text-bp-accent";

const NAV_CONNECT_LINKS = [
  {
    href: `tel:${CONTACT_PHONE_TEL}`,
    label: "Call us",
    icon: PhoneIcon,
  },
  {
    href: `mailto:${PUBLIC_CONTACT_EMAIL}`,
    label: "Email us",
    icon: EnvelopeIcon,
  },
];

function MobileMenuConnect({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="shrink-0 border-t border-bp-text/10 px-6 py-5">
      <p className="mb-4 text-center text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-bp-text/45">
        Get in touch
      </p>
      <ul className="flex items-center justify-center gap-3">
        {NAV_CONNECT_LINKS.map((item) => {
          const Icon = item.icon;

          return (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={onNavigate}
                aria-label={item.label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-bp-text/15 bg-bp-canvas/50 text-bp-text/75 shadow-[2px_2px_0_rgba(1,2,0,0.05)] transition-colors hover:border-bp-accent/40 hover:text-bp-accent"
              >
                <Icon className="h-5 w-5" />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function MobileMenu({
  collections,
  loading,
}: {
  collections: MenuItem[];
  loading: boolean;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const scrollLockY = useRef(0);

  const close = () => {
    setIsOpen(false);
    setShopOpen(false);
  };

  useEffect(() => {
    close();
  }, [pathname]);

  useEffect(() => {
    const body = document.body;

    const lockScroll = () => {
      scrollLockY.current = window.scrollY;
      body.classList.add("bp-mobile-menu-open");
      body.style.position = "fixed";
      body.style.top = `-${scrollLockY.current}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
      body.style.overflow = "hidden";
    };

    const unlockScroll = () => {
      if (!body.classList.contains("bp-mobile-menu-open")) return;

      const scrollY = scrollLockY.current;
      body.classList.remove("bp-mobile-menu-open");
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };

    if (isOpen) {
      lockScroll();
    } else {
      unlockScroll();
    }

    return unlockScroll;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex h-11 w-11 items-center justify-center text-2xl text-bp-text"
        aria-label="Open menu"
      >
        <Bars3Icon className="h-7 w-7 stroke-[2]" />
      </button>

      <Transition show={isOpen}>
        <div className="fixed inset-0 z-[100] lg:hidden">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity duration-300 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <button
              type="button"
              className="fixed inset-0 bg-bp-text/20 backdrop-blur-[10px] backdrop-saturate-[1.02]"
              aria-label="Close menu"
              onClick={close}
            />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition-transform duration-300 ease-out"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-transform duration-200 ease-in"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="fixed inset-y-0 right-0 z-[101] flex w-2/3 flex-col overflow-hidden rounded-l-2xl border-l border-bp-text/10 shadow-[-8px_0_32px_rgba(1,2,0,0.15)]"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${TEXTURE_IMAGES.primary})` }}
                aria-hidden
              />
              <div
                className="absolute inset-0 bg-bp-accent-bg/88 backdrop-blur-[1px]"
                aria-hidden
              />

              <div className="relative z-10 flex min-h-0 flex-1 flex-col">
                <div className="flex items-center justify-between border-b border-bp-text/10 px-5 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bp-text/50">
                    Menu
                  </p>
                  <button
                    type="button"
                    onClick={close}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-bp-text/10 text-bp-text transition-colors hover:border-bp-accent/40 hover:text-bp-accent"
                    aria-label="Close menu"
                  >
                    <XMarkIcon className="h-6 w-6 stroke-[2]" />
                  </button>
                </div>

                <nav
                  className="min-h-0 flex-1 overflow-y-auto px-6 py-6"
                  aria-label="Mobile"
                >
                  <ul className="space-y-0.5">
                    <li>
                      <NavLink
                        href="/stories"
                        className={mobileNavItemClass}
                        onClick={close}
                      >
                        Stories
                      </NavLink>
                    </li>

                    <li>
                      <button
                        type="button"
                        onClick={() => setShopOpen((o) => !o)}
                        className={mobileShopToggleClass}
                      >
                        Shop
                        <ChevronDownIcon
                          className={clsx(
                            "h-5 w-5 transition-transform",
                            shopOpen && "rotate-180",
                          )}
                        />
                      </button>
                      {shopOpen ? (
                        <ul className="mb-2 ml-2 space-y-0.5 border-l-2 border-bp-accent/50 pl-4">
                          <li>
                            <Link
                              href="/shop"
                              onClick={close}
                              className="block py-2 text-base text-bp-text/80 transition-colors hover:text-bp-accent"
                            >
                              The Archive Shop
                            </Link>
                          </li>
                          {!loading &&
                            collections.map((item) => (
                              <li key={item.path}>
                                <Link
                                  href={item.path}
                                  onClick={close}
                                  className="block py-2 text-base text-bp-text/80 transition-colors hover:text-bp-accent"
                                >
                                  {item.title}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      ) : null}
                    </li>

                    {MAIN_LINKS.slice(1).map((link) => (
                      <li key={link.href}>
                        <NavLink
                          href={link.href}
                          className={mobileNavItemClass}
                          onClick={close}
                        >
                          {link.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </nav>

                <MobileMenuConnect onNavigate={close} />
              </div>
            </div>
          </Transition.Child>
        </div>
      </Transition>
    </>
  );
}
