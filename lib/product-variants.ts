import type { ProductVariant } from "lib/types";

export type VariantOption = { name: string; value: string };

export type VariantAxis = { name: string; values: string[] };

const PREFIX_RE = /^(size|colour|color|style|finish)\s+(.+)$/i;

const COLOR_NAMES = new Set([
  "black",
  "white",
  "red",
  "blue",
  "green",
  "navy",
  "grey",
  "gray",
  "yellow",
  "orange",
  "pink",
  "purple",
  "brown",
  "beige",
  "cream",
  "charcoal",
  "olive",
  "teal",
  "burgundy",
  "maroon",
]);

function normalizeOptionName(raw: string): string {
  const lower = raw.toLowerCase();
  if (lower === "color") return "Colour";
  return raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
}

function parseSinglePart(part: string): VariantOption {
  const trimmed = part.trim();
  const prefixed = trimmed.match(PREFIX_RE);
  if (prefixed) {
    return { name: normalizeOptionName(prefixed[1]!), value: prefixed[2]!.trim() };
  }

  const lower = trimmed.toLowerCase();
  if (COLOR_NAMES.has(lower)) return { name: "Colour", value: trimmed };
  if (lower === "framed" || lower === "unframed") return { name: "Style", value: trimmed };
  if (/^(xxs|xs|s|m|l|xl|xxl|2xl|3xl|\d+)$/i.test(trimmed)) {
    return { name: "Size", value: trimmed };
  }

  return { name: "Option", value: trimmed };
}

/** Parse `variant_name` from DB - e.g. "Size M", "Black", "Size M / Colour Red". */
export function parseVariantTitle(title: string): VariantOption[] {
  const trimmed = title.trim();
  if (!trimmed || trimmed === "Default") return [];

  const parts = trimmed.split(/\s*\/\s*/);
  return parts.map(parseSinglePart).filter((o) => o.value.length > 0);
}

function inferAxisName(values: string[]): string {
  if (values.every((v) => COLOR_NAMES.has(v.toLowerCase()))) return "Colour";
  if (values.every((v) => ["framed", "unframed"].includes(v.toLowerCase()))) {
    return "Style";
  }
  if (values.every((v) => /^(xxs|xs|s|m|l|xl|xxl|2xl|3xl|\d+)$/i.test(v))) {
    return "Size";
  }
  return "Option";
}

export function enrichVariant(variant: ProductVariant): ProductVariant {
  const selectedOptions =
    variant.selectedOptions?.length
      ? variant.selectedOptions
      : parseVariantTitle(variant.title);

  return { ...variant, selectedOptions };
}

export function enrichVariants(variants: ProductVariant[]): ProductVariant[] {
  return variants.map(enrichVariant);
}

export function getVariantAxes(variants: ProductVariant[]): VariantAxis[] {
  const enriched = enrichVariants(variants);
  const axisMap = new Map<string, Set<string>>();

  for (const variant of enriched) {
    for (const opt of variant.selectedOptions ?? []) {
      if (!axisMap.has(opt.name)) axisMap.set(opt.name, new Set());
      axisMap.get(opt.name)!.add(opt.value);
    }
  }

  const axes = Array.from(axisMap.entries()).map(([name, values]) => ({
    name,
    values: Array.from(values),
  }));

  if (axes.length === 1 && axes[0]!.name === "Option") {
    const inferred = inferAxisName(axes[0]!.values);
    if (inferred !== "Option") {
      return [{ name: inferred, values: axes[0]!.values }];
    }
  }

  return axes;
}

export function optionsFromVariant(variant: ProductVariant): VariantOption[] {
  return enrichVariant(variant).selectedOptions ?? [];
}

export function formatVariantLabel(
  options: VariantOption[] | undefined,
  title?: string,
): string {
  if (options?.length) {
    return options.map((o) => `${o.name} ${o.value}`).join(" · ");
  }
  if (!title || title === "Default") return "";
  return title;
}

export function selectionFromVariant(variant: ProductVariant): Record<string, string> {
  const selection: Record<string, string> = {};
  for (const opt of optionsFromVariant(variant)) {
    selection[opt.name] = opt.value;
  }
  return selection;
}

export function resolveVariant(
  variants: ProductVariant[],
  selection: Record<string, string>,
): ProductVariant | null {
  const enriched = enrichVariants(variants);
  return (
    enriched.find((variant) => {
      const opts = variant.selectedOptions ?? [];
      return Object.entries(selection).every(([name, value]) =>
        opts.some((o) => o.name === name && o.value === value),
      );
    }) ?? null
  );
}

/** Whether a value is available given other selected axes. */
export function isOptionValueAvailable(
  variants: ProductVariant[],
  axisName: string,
  value: string,
  selection: Record<string, string>,
): boolean {
  const enriched = enrichVariants(variants);
  const axes = getVariantAxes(variants);

  if (axes.length === 1 && axes[0]!.name === axisName) {
    const match = enriched.find((v) =>
      (v.selectedOptions ?? []).some((o) => o.name === axisName && o.value === value),
    );
    return match?.available ?? false;
  }

  const trial = { ...selection, [axisName]: value };
  const required = axes.map((a) => a.name);
  if (!required.every((name) => trial[name])) {
    const partial = enriched.find((v) =>
      (v.selectedOptions ?? []).some((o) => o.name === axisName && o.value === value),
    );
    return partial?.available ?? false;
  }
  const match = resolveVariant(variants, trial);
  return match?.available ?? false;
}

export function orderLineTitle(productTitle: string, variant: ProductVariant): string {
  const label = formatVariantLabel(optionsFromVariant(variant), variant.title);
  return label ? `${productTitle} - ${label}` : productTitle;
}

export type SizeAvailability = {
  label: string;
  available: boolean;
};

const SIZE_SORT_RANK: Record<string, number> = {
  XXS: 0,
  XS: 1,
  S: 2,
  M: 3,
  L: 4,
  XL: 5,
  XXL: 6,
  "2XL": 6,
  "3XL": 7,
  "4XL": 8,
};

function sizeSortKey(label: string): number {
  const key = label.trim().toUpperCase();
  if (key in SIZE_SORT_RANK) return SIZE_SORT_RANK[key]!;
  const asNum = Number(label);
  if (Number.isFinite(asNum)) return 100 + asNum;
  return 200;
}

function sizeLabelFromVariant(variant: ProductVariant): string | null {
  const fromOptions = optionsFromVariant(variant).find(
    (opt) => opt.name === "Size",
  )?.value;
  if (fromOptions) return fromOptions.trim();

  const title = variant.title.trim();
  if (/^(xxs|xs|s|m|l|xl|xxl|2xl|3xl|4xl|\d+)$/i.test(title)) {
    return title;
  }
  return null;
}

/** Size chips for product tiles — unavailable sizes stay listed but struck through. */
export function sizeAvailabilityFromVariants(
  variants: ProductVariant[],
): SizeAvailability[] {
  const byLabel = new Map<string, boolean>();

  for (const variant of enrichVariants(variants)) {
    const label = sizeLabelFromVariant(variant);
    if (!label) continue;
    byLabel.set(label, (byLabel.get(label) ?? false) || variant.available);
  }

  return Array.from(byLabel.entries())
    .sort(([a], [b]) => {
      const rank = sizeSortKey(a) - sizeSortKey(b);
      return rank !== 0 ? rank : a.localeCompare(b, "en");
    })
    .map(([label, available]) => ({ label, available }));
}

/**
 * When size/colour variants exist, stock is per-variant.
 * Product-level `available` alone is not enough for tees.
 */
export function isSellableWithVariants(
  productAvailable: boolean,
  variants: ProductVariant[],
): boolean {
  if (!variants.length) return productAvailable;
  return variants.some((variant) => variant.available);
}

