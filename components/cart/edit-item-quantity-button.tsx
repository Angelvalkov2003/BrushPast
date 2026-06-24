"use client";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import type { CartItem } from "lib/types";

export function EditItemQuantityButton({
  item,
  type,
  optimisticUpdate,
}: {
  item: CartItem;
  type: "plus" | "minus";
  optimisticUpdate: (itemId: string, updateType: "plus" | "minus" | "delete") => boolean;
}) {
  const atMax =
    type === "plus" &&
    item.maxQuantity !== undefined &&
    item.quantity >= item.maxQuantity;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (atMax) return;
    optimisticUpdate(item.id, type);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={atMax}
      aria-label={
        type === "plus" ? "Increase quantity" : "Decrease quantity"
      }
      className={clsx(
        "ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80",
        {
          "ml-auto": type === "minus",
          "cursor-not-allowed opacity-40": atMax,
        },
      )}
    >
      {type === "plus" ? (
        <PlusIcon className="h-4 w-4 dark:text-neutral-500" />
      ) : (
        <MinusIcon className="h-4 w-4 dark:text-neutral-500" />
      )}
    </button>
  );
}
