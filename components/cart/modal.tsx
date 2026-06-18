"use client";

import clsx from "clsx";
import { Dialog, Transition } from "@headlessui/react";
import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import LoadingDots from "components/loading-dots";
import Price from "components/price";
import { createUrl } from "lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import { useFormStatus } from "react-dom";
import { useCart } from "./cart-context";
import { CartLineVariant } from "./cart-line-variant";
import { DeleteItemButton } from "./delete-item-button";
import { EditItemQuantityButton } from "./edit-item-quantity-button";
import OpenCart from "./open-cart";
import { UK_SHIPPING_SUMMARY, UK_RETURNS_SUMMARY } from "lib/uk-copy";

export default function CartModal() {
  const { cart, cartPulse, updateCartItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  // Cart is now managed in localStorage, no need to create in database
  // Cart modal only opens when user clicks the cart button, not automatically

  return (
    <>
      <button aria-label="Open cart" onClick={openCart} type="button">
        <OpenCart quantity={cart?.totalQuantity} pulseKey={cartPulse} />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-bp-text/10 bg-bp-canvas/95 p-6 text-bp-text backdrop-blur-xl md:w-[390px]">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">Your bag</p>
                <button aria-label="Close cart" onClick={closeCart}>
                  <CloseCart />
                </button>
              </div>

              {!cart || cart.items.length === 0 ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                  <ShoppingCartIcon className="h-16" />
                  <p className="mt-6 text-center text-2xl font-bold">
                    Your bag is empty.
                  </p>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                  <ul className="grow overflow-auto py-4">
                    {cart.items
                      .sort((a, b) =>
                        a.product.title.localeCompare(b.product.title),
                      )
                      .map((item, i) => {
                        const productUrl = `/product/${item.product.handle}`;

                        return (
                          <li
                            key={i}
                            className="flex w-full flex-col border-b border-bp-text/10"
                          >
                            <div className="relative flex w-full flex-row justify-between px-1 py-4">
                              <div className="absolute z-40 -ml-1 -mt-2">
                                <DeleteItemButton
                                  item={item}
                                  optimisticUpdate={updateCartItem}
                                />
                              </div>
                              <div className="flex flex-row">
                                <div className="relative h-16 w-16 overflow-hidden border border-bp-text/15 bg-bp-text/5">
                                  <Image
                                    className="h-full w-full object-cover"
                                    width={64}
                                    height={64}
                                    alt={item.product.image.altText || item.product.title}
                                    src={item.product.image.url}
                                  />
                                </div>
                                <div className="z-30 ml-2 flex flex-1 flex-col text-base">
                                  <Link
                                    href={productUrl}
                                    onClick={closeCart}
                                    className="leading-tight font-medium hover:underline"
                                  >
                                    {item.product.title}
                                  </Link>
                                  <CartLineVariant item={item} />
                                </div>
                              </div>
                              <div className="flex h-16 flex-col justify-between">
                                <Price
                                  className="flex justify-end space-y-2 text-right text-sm text-bp-text"
                                  amount={(item.price * item.quantity).toString()}
                                  currencyCode={cart.currency}
                                />
                                <div className="ml-auto flex h-9 flex-row items-center border border-bp-text/15">
                                  <EditItemQuantityButton
                                    item={item}
                                    type="minus"
                                    optimisticUpdate={updateCartItem}
                                  />
                                  <p className="w-6 text-center">
                                    <span className="w-full text-sm">
                                      {item.quantity}
                                    </span>
                                  </p>
                                  <EditItemQuantityButton
                                    item={item}
                                    type="plus"
                                    optimisticUpdate={updateCartItem}
                                  />
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                  <div className="py-4 text-sm text-bp-text/60">
                    <div className="mb-3 flex items-center justify-between border-b border-bp-text/10 pb-1">
                      <p>Subtotal</p>
                      <Price
                        className="text-right text-base text-bp-text"
                        amount={cart.subtotal.toString()}
                        currencyCode={cart.currency}
                      />
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b border-bp-text/10 pb-1 pt-1">
                      <p>Delivery (UK)</p>
                      <p className="text-right text-xs">At checkout</p>
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b border-bp-text/10 pb-1 pt-1">
                      <p>Total</p>
                      <Price
                        className="text-right text-base text-bp-text"
                        amount={cart.total.toString()}
                        currencyCode={cart.currency}
                      />
                    </div>
                    <div className="mt-3 text-xs text-bp-text/45">
                      <p className="text-center leading-snug">{UK_SHIPPING_SUMMARY}</p>
                      <p className="mt-2 text-center leading-snug">{UK_RETURNS_SUMMARY}</p>
                    </div>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="block w-full bg-bp-accent p-3 text-center text-xs font-bold uppercase tracking-[0.2em] text-bp-canvas transition-opacity hover:opacity-90"
                  >
                    Checkout
                  </Link>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}

function CloseCart({ className }: { className?: string }) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center border border-bp-text/15 text-bp-text transition-colors hover:border-bp-accent">
      <XMarkIcon
        className={clsx(
          "h-6 transition-all ease-in-out hover:scale-110",
          className,
        )}
      />
    </div>
  );
}

