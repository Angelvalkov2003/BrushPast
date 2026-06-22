"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckIcon, PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { addItem } from "components/cart/actions";
import Price from "components/price";
import { homeHandClass, homeSerifClass } from "components/home/home-typography";
import { enrichVariants, formatVariantLabel, optionsFromVariant } from "lib/product-variants";
import type { ProductDetail, ProductVariant } from "lib/types";
import { useActionState } from "react";
import { useCart } from "components/cart/cart-context";
import { VariantPicker } from "./variant-picker";

function pickVariant(product: ProductDetail, selectedId: string | null): ProductVariant {
  const variants = enrichVariants(product.variants);
  if (variants.length === 0) {
    return {
      id: product.id,
      title: "Default",
      price: product.price,
      available: product.available,
      selectedOptions: [],
    };
  }
  const found = variants.find((v) => v.id === selectedId && v.available);
  const fallback = variants.find((v) => v.available);
  return found ?? fallback ?? variants[0]!;
}

export function ProductPurchase({ product }: { product: ProductDetail }) {
  const { addCartItem } = useCart();
  const [message, formAction] = useActionState(addItem, null);
  const [justAdded, setJustAdded] = useState(false);
  const variants = useMemo(() => enrichVariants(product.variants), [product.variants]);
  const hasVariants = variants.length > 0;

  const defaultVariantId = useMemo(
    () => variants.find((v) => v.available)?.id ?? variants[0]?.id ?? null,
    [variants],
  );
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(defaultVariantId);

  useEffect(() => {
    setSelectedVariantId(defaultVariantId);
  }, [defaultVariantId]);

  useEffect(() => {
    if (!justAdded) return;
    const timer = window.setTimeout(() => setJustAdded(false), 1400);
    return () => window.clearTimeout(timer);
  }, [justAdded]);

  const variant = pickVariant(product, selectedVariantId);
  const canAdd = variant.available && product.available;
  const mustPickVariant = hasVariants && variants.length > 1;
  const selectedLabel = hasVariants
    ? formatVariantLabel(optionsFromVariant(variant), variant.title)
    : "";

  const handleAdd = async () => {
    if (!canAdd) return;
    const productForCart = { ...product, price: variant.price, available: variant.available };
    addCartItem(variant, productForCart, {
      variantOptions: hasVariants ? variants : undefined,
    });
    setJustAdded(true);
    await formAction({
      productId: product.id,
      variantId: variant.id,
      price: variant.price,
    });
  };

  return (
    <div className="border-t border-bp-text/10 pt-8">
      <div className="mb-6 flex items-baseline gap-3">
        <Price
          amount={variant.price.toString()}
          className={`${homeHandClass} text-4xl font-bold text-bp-text`}
        />
        {variant.inventory != null && variant.inventory > 0 ? (
          <span className={`${homeHandClass} text-base text-bp-accent`}>
            {variant.inventory} left
          </span>
        ) : product.inventoryType === "limited" && product.inventoryQuantity != null ? (
          <span className={`${homeHandClass} text-base text-bp-accent`}>
            {product.inventoryQuantity} left
          </span>
        ) : null}
      </div>

      {mustPickVariant ? (
        <div className="mb-6">
          <VariantPicker
            variants={variants}
            selectedVariantId={selectedVariantId}
            onVariantChange={(v) => setSelectedVariantId(v.id)}
          />
          {selectedLabel ? (
            <p className={`${homeSerifClass} mt-3 text-sm text-bp-text/60`}>
              Selected: <span className="font-semibold text-bp-text">{selectedLabel}</span>
            </p>
          ) : null}
        </div>
      ) : null}

      <button
        type="button"
        disabled={!canAdd}
        onClick={handleAdd}
        aria-label="Add to bag"
        className={clsx(
          `${homeHandClass} relative flex w-full items-center justify-center px-8 py-4 text-lg font-bold transition-all`,
          justAdded
            ? "animate-add-success bg-bp-text text-bp-canvas shadow-none"
            : canAdd
              ? "bg-bp-accent text-bp-canvas shadow-[3px_3px_0_rgba(1,2,0,0.2)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:scale-[0.98]"
              : "cursor-not-allowed bg-bp-accent/50 text-bp-canvas opacity-50 shadow-none",
        )}
      >
        {justAdded ? (
          <>
            <CheckIcon className="absolute left-5 h-5 w-5" aria-hidden />
            Added to bag
          </>
        ) : (
          <>
            <PlusIcon className="absolute left-5 h-5 w-5" aria-hidden />
            {canAdd ? "Add to bag →" : "Out of stock"}
          </>
        )}
      </button>
      <p aria-live="polite" className="sr-only" role="status">
        {justAdded ? "Item added to your bag" : message}
      </p>
    </div>
  );
}
