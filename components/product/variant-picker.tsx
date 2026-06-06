"use client";

import clsx from "clsx";
import {
  formatVariantLabel,
  getVariantAxes,
  isOptionValueAvailable,
  optionsFromVariant,
  resolveVariant,
  selectionFromVariant,
} from "lib/product-variants";
import type { ProductVariant } from "lib/types";
import { useEffect, useMemo, useState } from "react";

type VariantPickerProps = {
  variants: ProductVariant[];
  selectedVariantId: string | null;
  onVariantChange: (variant: ProductVariant) => void;
  /** Smaller buttons for cart drawer */
  compact?: boolean;
};

export function VariantPicker({
  variants,
  selectedVariantId,
  onVariantChange,
  compact = false,
}: VariantPickerProps) {
  const axes = useMemo(() => getVariantAxes(variants), [variants]);

  const initialVariant = useMemo(() => {
    const byId = variants.find((v) => v.id === selectedVariantId);
    const available = variants.find((v) => v.available);
    return byId ?? available ?? variants[0] ?? null;
  }, [variants, selectedVariantId]);

  const [selection, setSelection] = useState<Record<string, string>>(() =>
    initialVariant ? selectionFromVariant(initialVariant) : {},
  );

  useEffect(() => {
    if (!selectedVariantId) return;
    const current = variants.find((v) => v.id === selectedVariantId);
    if (current) setSelection(selectionFromVariant(current));
  }, [selectedVariantId, variants]);

  if (variants.length <= 1) return null;

  const labelClass = compact
    ? "text-[10px] font-bold uppercase tracking-[0.15em] text-bp-text/50"
    : "text-xs font-bold uppercase tracking-[0.2em] text-bp-text";

  const buttonClass = (selected: boolean, available: boolean) =>
    clsx(
      compact ? "min-w-[2.25rem] px-2.5 py-1 text-[10px]" : "min-w-[3rem] px-4 py-2.5 text-xs",
      "border font-semibold uppercase tracking-[0.1em] transition-colors",
      selected
        ? "border-bp-text bg-bp-text text-bp-canvas"
        : available
          ? compact
            ? "border-bp-text/20 bg-bp-canvas text-bp-text hover:border-bp-accent"
            : "border-bp-text/25 bg-bp-canvas text-bp-text hover:border-bp-accent hover:text-bp-accent"
          : "cursor-not-allowed border-bp-text/15 text-bp-text/35 line-through",
    );

  /** Flat list when variant names cannot be split into axes (e.g. custom labels). */
  if (axes.length === 0) {
    return (
      <div className={compact ? "space-y-2" : "space-y-3"}>
        <p className={labelClass}>Choose option</p>
        <ul className={clsx("flex flex-wrap", compact ? "gap-1.5" : "gap-2")}>
          {variants.map((v) => {
            const selected = v.id === selectedVariantId;
            const label = formatVariantLabel(optionsFromVariant(v), v.title) || v.title;
            return (
              <li key={v.id}>
                <button
                  type="button"
                  disabled={!v.available}
                  onClick={() => onVariantChange(v)}
                  className={buttonClass(selected, v.available)}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  const resolved = resolveVariant(variants, selection);

  const handlePick = (axisName: string, value: string) => {
    const next = { ...selection, [axisName]: value };
    setSelection(next);
    const match = resolveVariant(variants, next);
    if (match) onVariantChange(match);
  };

  return (
    <div className={compact ? "space-y-2" : "space-y-6"}>
      {axes.map((axis) => (
        <div key={axis.name}>
          <p className={labelClass}>{axis.name}</p>
          <ul className={clsx("flex flex-wrap", compact ? "mt-1.5 gap-1.5" : "mt-3 gap-2")}>
            {axis.values.map((value) => {
              const selected = selection[axis.name] === value;
              const available = isOptionValueAvailable(
                variants,
                axis.name,
                value,
                selection,
              );
              return (
                <li key={`${axis.name}-${value}`}>
                  <button
                    type="button"
                    disabled={!available}
                    onClick={() => handlePick(axis.name, value)}
                    className={buttonClass(selected, available)}
                  >
                    {value}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      {resolved && !resolved.available ? (
        <p className="text-xs text-bp-accent">This combination is out of stock.</p>
      ) : null}
    </div>
  );
}

/** Read-only variant label for cart / checkout summaries. */
export function VariantLabel({ variant }: { variant: ProductVariant }) {
  const label = optionsFromVariant(variant);
  const text =
    label.length > 0
      ? label.map((o) => `${o.name} ${o.value}`).join(" · ")
      : variant.title !== "Default"
        ? variant.title
        : "";

  if (!text) return null;

  return (
    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-bp-text/55">
      {text}
    </p>
  );
}
