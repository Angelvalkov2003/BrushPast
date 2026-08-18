"use client";

import clsx from "clsx";
import { BoxProductTile } from "./box-product-tile";
import {
  bpBodyClass,
  bpBodySmClass,
  bpTitleClass,
  bpTitleUtility,
} from "components/home/home-typography";
import type { BoxCategoryKey } from "lib/shop-box-config";
import type { BoxCatalogProduct } from "lib/supabase/shop-box-products";

export function BoxCategorySection({
  categoryKey,
  label,
  products,
  selectedProductId,
  selected = false,
  onSelectProduct,
}: {
  categoryKey: BoxCategoryKey;
  label: string;
  products: BoxCatalogProduct[];
  selectedProductId?: string;
  selected?: boolean;
  onSelectProduct: (product: BoxCatalogProduct) => void;
}) {
  return (
    <section
      id={`box-section-${categoryKey}`}
      aria-labelledby={`box-section-heading-${categoryKey}`}
      className="scroll-mt-28 border-b border-bp-text/10 py-8"
    >
      <div className="mb-5 flex flex-wrap items-baseline gap-3">
        <h2
          id={`box-section-heading-${categoryKey}`}
          className={`${bpTitleClass} ${bpTitleUtility} text-3xl font-bold uppercase tracking-wide text-bp-text`}
        >
          {label}
        </h2>
        {selected ? (
          <span
            className={`${bpBodySmClass} border border-bp-accent/40 bg-bp-accent/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-bp-accent`}
          >
            In your box
          </span>
        ) : (
          <span className={`${bpBodySmClass} uppercase tracking-[0.14em] text-bp-text/40`}>
            Pick one
          </span>
        )}
      </div>

      {products.length === 0 ? (
        <p className={`${bpBodyClass} text-bp-text/50`}>
          Nothing in this category yet.
        </p>
      ) : (
        <div className="flex max-w-full snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-2 pt-1">
          {products.map((product, index) => (
            <BoxProductTile
              key={product.id}
              product={product}
              index={index}
              selected={selectedProductId === product.id}
              onSelect={() => onSelectProduct(product)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
