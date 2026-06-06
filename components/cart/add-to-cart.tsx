"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { addItem } from "components/cart/actions";
import { Product } from "lib/types";
import { useActionState } from "react";
import { useCart } from "./cart-context";

function SubmitButton({ available }: { available: boolean }) {
  const buttonClasses =
    "relative flex w-full items-center justify-center bg-bp-accent px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-bp-canvas transition-opacity";
  const disabledClasses = "cursor-not-allowed opacity-50";

  if (!available) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        Out of stock
      </button>
    );
  }

  return (
    <button
      aria-label="Add to bag"
      className={clsx(buttonClasses, "hover:opacity-90")}
    >
      <PlusIcon className="absolute left-5 h-5 w-5" />
      Add to bag
    </button>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const { available } = product;
  const { addCartItem } = useCart();
  const [message, formAction] = useActionState(addItem, null);

  const variantData = {
    id: product.id,
    title: product.title,
    price: product.price,
    available: product.available,
    selectedOptions: [],
  };

  return (
    <form
      action={async () => {
        addCartItem(variantData, product);
        await formAction({
          productId: product.id,
          variantId: product.id,
          price: product.price,
        });
      }}
    >
      <SubmitButton available={available} />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
