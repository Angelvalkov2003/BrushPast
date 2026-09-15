"use client";

import { useState } from "react";
import clsx from "clsx";
import { Squares2X2Icon, ViewColumnsIcon } from "@heroicons/react/24/outline";
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
  /** false = roomy (1–2 cols), true = denser (up to 3) — same idea as Stories toggle */
  const [compactGrid, setCompactGrid] = useState(true);

  return (
    <section
      id={`box-section-${categoryKey}`}
      aria-labelledby={`box-section-heading-${categoryKey}`}
      className="scroll-mt-28 border-b border-bp-text/10 py-8"
    >
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div className="flex min-w-0 flex-wrap items-baseline gap-3">
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
            <span
              className={`${bpBodySmClass} uppercase tracking-[0.14em] text-bp-text/40`}
            >
              Pick one
            </span>
          )}
          <span className={`${bpBodySmClass} text-bp-text/45`}>
            {products.length}{" "}
            {products.length === 1 ? "piece" : "pieces"}
          </span>
        </div>

        {products.length > 1 ? (
          <button
            type="button"
            onClick={() => setCompactGrid((v) => !v)}
            className="flex h-[42px] w-[42px] shrink-0 items-center justify-center border border-bp-text/20 bg-bp-canvas/60 text-bp-text shadow-[2px_2px_0_rgba(1,2,0,0.04)] transition-colors hover:border-bp-accent/40 hover:text-bp-accent"
            aria-pressed={compactGrid}
            aria-label={
              compactGrid ? "Show larger cards" : "Show three-up grid"
            }
            title={compactGrid ? "Larger cards" : "Three-up grid"}
          >
            {compactGrid ? (
              <ViewColumnsIcon className="h-4 w-4" strokeWidth={2} />
            ) : (
              <Squares2X2Icon className="h-4 w-4" strokeWidth={2} />
            )}
          </button>
        ) : null}
      </div>

      {products.length === 0 ? (
        <p className={`${bpBodyClass} text-bp-text/50`}>
          Nothing in this category yet.
        </p>
      ) : (
        <div
          className={clsx(
            "grid gap-5 sm:gap-6",
            compactGrid
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 sm:grid-cols-2",
          )}
        >
          {products.map((product, index) => (
            <BoxProductTile
              key={product.id}
              product={product}
              index={index}
              layout={compactGrid ? "grid" : "stack"}
              selected={selectedProductId === product.id}
              onSelect={() => onSelectProduct(product)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
