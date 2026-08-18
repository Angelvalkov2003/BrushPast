"use client";

import { useMemo, useState } from "react";
import { Modal } from "components/ui/modal";
import { VariantPicker } from "components/product/variant-picker";
import {
  bpBodyClass,
  bpBodySmClass,
  bpTitleClass,
  bpTitleUtility,
} from "components/home/home-typography";
import {
  enrichVariants,
  formatVariantLabel,
  optionsFromVariant,
} from "lib/product-variants";
import type { BoxCatalogProduct } from "lib/supabase/shop-box-products";
import type { ProductVariant } from "lib/types";

export function productNeedsVariantChoice(product: BoxCatalogProduct): boolean {
  const available = product.variants.filter((variant) => variant.available);
  return available.length > 1;
}

export function defaultVariantForProduct(
  product: BoxCatalogProduct,
): ProductVariant | null {
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
  return variants.find((variant) => variant.available) ?? variants[0] ?? null;
}

export function BoxSizeModal({
  product,
  open,
  onClose,
  onConfirm,
}: {
  product: BoxCatalogProduct | null;
  open: boolean;
  onClose: () => void;
  onConfirm: (variant: ProductVariant) => void;
}) {
  const variants = useMemo(
    () => (product ? enrichVariants(product.variants) : []),
    [product],
  );
  const firstAvailable = variants.find((variant) => variant.available) ?? variants[0];
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected =
    variants.find((variant) => variant.id === (selectedId ?? firstAvailable?.id)) ??
    firstAvailable ??
    null;
  const label = selected
    ? formatVariantLabel(optionsFromVariant(selected), selected.title)
    : "";

  if (!product) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Choose size — ${product.title}`}
    >
      <p className={`${bpBodyClass} mb-5 text-sm text-bp-text/70`}>
        Pick a size before this piece is added to your box.
      </p>
      <VariantPicker
        variants={variants}
        selectedVariantId={selected?.id ?? null}
        onVariantChange={(variant) => setSelectedId(variant.id)}
      />
      {label ? (
        <p className={`${bpBodySmClass} mt-4 text-bp-text/60`}>
          Selected: <span className="font-semibold text-bp-text">{label}</span>
        </p>
      ) : null}
      <button
        type="button"
        disabled={!selected?.available}
        onClick={() => {
          if (selected?.available) onConfirm(selected);
        }}
        className={`${bpTitleClass} ${bpTitleUtility} mt-6 w-full bg-bp-accent px-6 py-3 text-lg font-bold text-bp-canvas shadow-[3px_3px_0_rgba(1,2,0,0.2)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none`}
      >
        Add to box
      </button>
    </Modal>
  );
}
