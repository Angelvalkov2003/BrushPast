"use client";

import { VariantLabel, VariantPicker } from "components/product/variant-picker";
import { enrichVariants } from "lib/product-variants";
import type { CartItem, ProductVariant } from "lib/types";
import { useCart } from "./cart-context";

function cartOptionsToVariants(item: CartItem): ProductVariant[] {
  if (!item.variantOptions?.length) return [];
  return enrichVariants(
    item.variantOptions.map((o) => ({
      id: o.id,
      title: o.title,
      price: o.price,
      available: o.available,
      sku: o.sku,
      selectedOptions: o.selectedOptions,
    })),
  );
}

export function CartLineVariant({ item }: { item: CartItem }) {
  const { updateCartVariant } = useCart();
  const variants = cartOptionsToVariants(item);

  if (variants.length <= 1) {
    const displayVariant: ProductVariant = {
      id: item.variant.id,
      title: item.variant.title,
      price: item.price,
      available: true,
      sku: item.variant.sku,
      selectedOptions: item.variant.selectedOptions,
    };
    return <VariantLabel variant={displayVariant} />;
  }

  return (
    <div className="mt-2">
      <VariantPicker
        variants={variants}
        selectedVariantId={item.variantId}
        compact
        onVariantChange={(v) => updateCartVariant(item.id, v)}
      />
    </div>
  );
}
