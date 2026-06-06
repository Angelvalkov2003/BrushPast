"use client";

import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import {
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import CartModal from "components/cart/modal";
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

  const close = () => {
    setIsOpen(false);
    setShopOpen(false);
  };

  useEffect(() => {
    close();
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex h-11 w-11 items-center justify-center text-bp-text"
        aria-label="Open menu"
      >
        <Bars3Icon className="h-7 w-7 stroke-[2]" />
      </button>

      <Transition show={isOpen}>
        <Dialog onClose={close} className="relative z-[60] lg:hidden">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-bp-text/40" aria-hidden />
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
            <Dialog.Panel className="fixed inset-y-0 right-0 flex w-full max-w-sm flex-col bg-bp-canvas shadow-xl">
              <div className="flex items-center justify-end border-b border-bp-text/10 px-5 py-4">
                <button
                  type="button"
                  onClick={close}
                  className="flex h-10 w-10 items-center justify-center text-bp-text"
                  aria-label="Close menu"
                >
                  <XMarkIcon className="h-7 w-7 stroke-[2]" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-6 py-8" aria-label="Mobile">
                <ul className="space-y-1">
                  <li>
                    <div className="py-2">
                      <NavLink
                        href="/stories"
                        className="block py-2 text-base"
                        onClick={close}
                      >
                        Stories
                      </NavLink>
                    </div>
                  </li>

                  <li>
                    <button
                      type="button"
                      onClick={() => setShopOpen((o) => !o)}
                      className="flex w-full items-center justify-between py-3 text-base font-bold uppercase tracking-[0.12em] text-bp-text"
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
                      <ul className="mb-2 ml-2 space-y-1 border-l-2 border-bp-accent/40 pl-4">
                        <li>
                          <Link
                            href="/shop"
                            onClick={close}
                            className="block py-2 text-sm font-semibold uppercase tracking-wide text-bp-text/80 hover:text-bp-accent"
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
                                className="block py-2 text-sm font-semibold uppercase tracking-wide text-bp-text/80 hover:text-bp-accent"
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
                        className="block py-3 text-base"
                        onClick={close}
                      >
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/share-your-story"
                  onClick={close}
                  className="mt-10 block w-full bg-bp-accent py-4 text-center text-xs font-bold uppercase tracking-[0.14em] text-bp-canvas"
                >
                  Share your story
                </Link>

                <div className="mt-8 flex items-center justify-between border-t border-bp-text/10 pt-6">
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-bp-text">
                    Your bag
                  </span>
                  <CartModal />
                </div>
              </nav>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
