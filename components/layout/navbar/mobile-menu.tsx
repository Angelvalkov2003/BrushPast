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
import { homeHandClass } from "components/home/home-typography";
import { TEXTURE_IMAGES } from "components/shared/texture-section";
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
        className={`${homeHandClass} flex h-11 w-11 items-center justify-center text-2xl text-bp-text`}
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
            <Dialog.Panel className="fixed inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-hidden border-l border-bp-text/10 shadow-xl">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${TEXTURE_IMAGES.primary})` }}
                aria-hidden
              />
              <div className="absolute inset-0 bg-bp-canvas/94 backdrop-blur-[2px]" aria-hidden />

              <div className="relative z-10 flex flex-1 flex-col">
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
                      <NavLink href="/stories" className="block py-2 text-2xl" onClick={close}>
                        Stories
                      </NavLink>
                    </li>

                    <li>
                      <button
                        type="button"
                        onClick={() => setShopOpen((o) => !o)}
                        className={`${homeHandClass} flex w-full items-center justify-between py-3 text-2xl text-bp-text`}
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
                        <ul className="mb-2 ml-2 space-y-1 border-l-2 border-bp-accent/50 pl-4">
                          <li>
                            <Link
                              href="/shop"
                              onClick={close}
                              className={`${homeHandClass} block py-2 text-xl text-bp-text/80 hover:text-bp-accent`}
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
                                  className={`${homeHandClass} block py-2 text-xl text-bp-text/80 hover:text-bp-accent`}
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
                          className="block py-3 text-2xl"
                          onClick={close}
                        >
                          {link.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
