"use client";

import clsx from "clsx";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  COFFEE_FORMAT_LABELS,
  COFFEE_GRIND_LABELS,
  classifyCoffeeVariant,
  coffeeStorefrontVariants,
  findCoffeeVariant,
  formatCoffeeCartLabel,
  type CoffeeFormat,
  type CoffeeGrind,
} from "lib/coffee-format";
import type { ProductVariant } from "lib/types";
import { useEffect, useId, useMemo, useRef, useState } from "react";

type CoffeeFormatPickerProps = {
  variants: ProductVariant[];
  selectedVariantId: string | null;
  onVariantChange: (variant: ProductVariant | null) => void;
  compact?: boolean;
};

const GRIND_OPTIONS: CoffeeGrind[] = ["filter", "cafetiere"];

export function CoffeeFormatPicker({
  variants,
  selectedVariantId,
  onVariantChange,
  compact = false,
}: CoffeeFormatPickerProps) {
  const storefront = useMemo(
    () => coffeeStorefrontVariants(variants),
    [variants],
  );
  const grindListId = useId();
  const grindRef = useRef<HTMLDivElement>(null);

  const [format, setFormat] = useState<CoffeeFormat | null>(null);
  const [grind, setGrind] = useState<CoffeeGrind | null>(null);
  const [grindOpen, setGrindOpen] = useState(false);

  // Sync FROM a resolved variant only — keep Ground selected while grind is pending.
  useEffect(() => {
    if (!selectedVariantId) return;
    const match = storefront.find((v) => v.id === selectedVariantId);
    if (!match) return;
    const classified = classifyCoffeeVariant(match);
    if (!classified) return;
    setFormat(classified.format);
    setGrind(classified.grind ?? null);
  }, [selectedVariantId, storefront]);

  useEffect(() => {
    if (!grindOpen) return;
    const onPointer = (event: MouseEvent) => {
      if (!grindRef.current?.contains(event.target as Node)) {
        setGrindOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setGrindOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [grindOpen]);

  const labelClass = compact
    ? "text-[10px] font-bold uppercase tracking-[0.15em] text-bp-text/50"
    : "text-xs font-bold uppercase tracking-[0.18em] text-bp-text";

  const chipClass = (active: boolean) =>
    clsx(
      compact
        ? "min-w-[5.75rem] flex-1 px-3 py-2 text-[10px]"
        : "min-w-[8rem] flex-1 px-4 py-3 text-xs",
      "border font-semibold uppercase tracking-[0.12em] transition-all",
      active
        ? "border-bp-text bg-bp-text text-bp-canvas shadow-[3px_3px_0_rgba(1,2,0,0.18)]"
        : "border-bp-text/20 bg-bp-canvas text-bp-text hover:border-bp-accent hover:text-bp-accent hover:shadow-[2px_2px_0_rgba(196,48,43,0.15)]",
    );

  const pickFormat = (next: CoffeeFormat) => {
    setGrindOpen(false);
    if (next === "beans") {
      setFormat("beans");
      setGrind(null);
      onVariantChange(findCoffeeVariant(storefront, "beans", null));
      return;
    }
    setFormat("ground");
    setGrind(null);
    onVariantChange(null);
  };

  const pickGrind = (next: CoffeeGrind) => {
    setFormat("ground");
    setGrind(next);
    setGrindOpen(false);
    onVariantChange(findCoffeeVariant(storefront, "ground", next));
  };

  const resolved =
    format === "beans"
      ? findCoffeeVariant(storefront, "beans", null)
      : format === "ground" && grind
        ? findCoffeeVariant(storefront, "ground", grind)
        : null;

  return (
    <div className={compact ? "space-y-3" : "space-y-5"}>
      <div>
        <p className={labelClass}>How would you like your coffee?</p>
        <ul
          className={clsx("mt-3 flex", compact ? "gap-1.5" : "gap-2")}
          role="radiogroup"
          aria-label="Coffee format"
        >
          {(["beans", "ground"] as CoffeeFormat[]).map((value) => (
            <li key={value} className="flex flex-1">
              <button
                type="button"
                onClick={() => pickFormat(value)}
                className={chipClass(format === value)}
                aria-pressed={format === value}
              >
                {COFFEE_FORMAT_LABELS[value]}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {format === "ground" ? (
        <div
          ref={grindRef}
          className={clsx(
            "relative border border-bp-text/15 bg-bp-canvas",
            compact ? "p-3" : "p-4",
            "shadow-[3px_3px_0_rgba(1,2,0,0.08)]",
          )}
        >
          <p className={labelClass} id={`${grindListId}-label`}>
            Choose your grind
          </p>

          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={grindOpen}
            aria-labelledby={`${grindListId}-label`}
            onClick={() => setGrindOpen((open) => !open)}
            className={clsx(
              "mt-3 flex w-full items-center justify-between gap-3 border bg-bp-surface/50 text-left transition-colors",
              compact ? "px-3 py-2.5 text-xs" : "px-4 py-3 text-sm",
              grind
                ? "border-bp-text bg-bp-text text-bp-canvas"
                : "border-bp-text/25 text-bp-text hover:border-bp-accent",
            )}
          >
            <span
              className={clsx(
                "font-semibold uppercase tracking-[0.1em]",
                !grind && "text-bp-text/45",
                grind && "text-inherit",
              )}
            >
              {grind ? COFFEE_GRIND_LABELS[grind] : "Select grind"}
            </span>
            <ChevronDownIcon
              className={clsx(
                "h-4 w-4 shrink-0 transition-transform",
                grindOpen && "rotate-180",
                grind ? "text-bp-canvas/80" : "text-bp-accent",
              )}
              aria-hidden
            />
          </button>

          {grindOpen ? (
            <ul
              id={grindListId}
              role="listbox"
              aria-labelledby={`${grindListId}-label`}
              className="absolute left-4 right-4 z-20 mt-1.5 border border-bp-text bg-bp-canvas shadow-[4px_4px_0_rgba(1,2,0,0.16)]"
            >
              {GRIND_OPTIONS.map((value) => {
                const active = grind === value;
                return (
                  <li key={value} role="option" aria-selected={active}>
                    <button
                      type="button"
                      onClick={() => pickGrind(value)}
                      className={clsx(
                        "flex w-full items-center justify-between px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.12em] transition-colors",
                        active
                          ? "bg-bp-accent text-bp-canvas"
                          : "text-bp-text hover:bg-bp-accent/10 hover:text-bp-accent",
                      )}
                    >
                      <span>{COFFEE_GRIND_LABELS[value]}</span>
                      <span className="text-[10px] tracking-[0.16em] opacity-70">
                        Ground - {COFFEE_GRIND_LABELS[value]}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : null}

          {!grind ? (
            <p className="mt-3 text-xs font-medium text-bp-accent">
              Grind is required for ground coffee.
            </p>
          ) : null}
        </div>
      ) : null}

      {resolved ? (
        <p className="text-xs text-bp-text/55">
          Selected:{" "}
          <span className="font-semibold text-bp-text">
            {formatCoffeeCartLabel(resolved)}
          </span>
        </p>
      ) : null}
    </div>
  );
}
