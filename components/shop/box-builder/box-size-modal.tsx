"use client";

import { useEffect, useMemo, useState } from "react";
import { Modal } from "components/ui/modal";
import { VariantPicker } from "components/product/variant-picker";
import { CoffeeFormatPicker } from "components/product/coffee-format-picker";
import {
  bpBodyClass,
  bpBodySmClass,
  bpTitleClass,
  bpTitleUtility,
} from "components/home/home-typography";
import {
  coffeeStorefrontVariants,
  formatCoffeeCartLabel,
  isCoffeeProduct,
} from "lib/coffee-format";
import {
  enrichVariants,
  formatVariantLabel,
  optionsFromVariant,
} from "lib/product-variants";
import type { BoxCatalogProduct } from "lib/supabase/shop-box-products";
import type { ProductVariant } from "lib/types";

export function productNeedsVariantChoice(product: BoxCatalogProduct): boolean {
  if (isCoffeeProduct(product)) {
    return coffeeStorefrontVariants(product.variants).length > 1;
  }
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
  if (isCoffeeProduct(product)) {
    const beans = coffeeStorefrontVariants(variants).find((v) =>
      /whole\s*bean/i.test(v.title),
    );
    return beans ?? coffeeStorefrontVariants(variants)[0] ?? null;
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
  const isCoffee = product ? isCoffeeProduct(product) : false;
  const variants = useMemo(
    () => (product ? enrichVariants(product.variants) : []),
    [product],
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (!open) setSelectedId(null);
  }, [open, product?.id]);

  const selected = selectedId
    ? (variants.find((variant) => variant.id === selectedId) ?? null)
    : null;

  const label = selected
    ? isCoffee
      ? formatCoffeeCartLabel(selected)
      : formatVariantLabel(optionsFromVariant(selected), selected.title)
    : "";

  if (!product) return null;

  const canConfirm = Boolean(selected?.available);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isCoffee ? product.title : `Choose size - ${product.title}`}
    >
      {isCoffee ? null : (
        <p className={`${bpBodyClass} mb-5 text-sm text-bp-text/70`}>
          Pick a size before this piece is added to your box.
        </p>
      )}
      {isCoffee ? (
        <CoffeeFormatPicker
          key={`${product.id}-${open ? "open" : "closed"}`}
          variants={variants}
          selectedVariantId={selectedId}
          onVariantChange={(variant) => setSelectedId(variant?.id ?? null)}
        />
      ) : (
        <VariantPicker
          variants={variants}
          selectedVariantId={selected?.id ?? null}
          onVariantChange={(variant) => setSelectedId(variant.id)}
        />
      )}
      {label && !isCoffee ? (
        <p className={`${bpBodySmClass} mt-4 text-bp-text/60`}>
          Selected: <span className="font-semibold text-bp-text">{label}</span>
        </p>
      ) : null}
      <button
        type="button"
        disabled={!canConfirm}
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
