import { cache } from "react";
import { enrichVariants } from "lib/product-variants";
import type { Product, ProductVariant } from "lib/types";
import {
  BOX_CATEGORY_ROWS,
  type BoxCategoryKey,
} from "lib/shop-box-config";
import { getProducts } from "./products";
import { getSupabaseServiceClient } from "./service";

export type BoxCatalogProduct = Product & {
  categoryKey: BoxCategoryKey;
  variants: ProductVariant[];
};

export type BoxCatalog = Record<BoxCategoryKey, BoxCatalogProduct[]>;

type VariantRow = {
  id: string;
  product_id: string;
  variant_name: string | null;
  inventory_type: string;
  inventory_quantity: number | null;
  sku: string | null;
  price_override: number | null;
  status: string;
};

function mapVariant(row: VariantRow, basePrice: number): ProductVariant {
  const qty = row.inventory_quantity ?? 0;
  const limited = row.inventory_type !== "unlimited";
  const available = row.inventory_type === "unlimited" || qty > 0;
  const name = row.variant_name?.trim() || "Default";
  return {
    id: row.id,
    title: name,
    price: row.price_override != null ? Number(row.price_override) : basePrice,
    sku: row.sku ?? undefined,
    inventory: qty,
    maxQuantity: limited ? qty : undefined,
    available,
  };
}

async function loadVariantsByProductIds(
  products: Product[],
): Promise<Map<string, ProductVariant[]>> {
  const map = new Map<string, ProductVariant[]>();
  if (!products.length) return map;

  const priceById = new Map(products.map((p) => [p.id, p.price]));
  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase
    .from("product_variants")
    .select(
      "id, product_id, variant_name, inventory_type, inventory_quantity, sku, price_override, status",
    )
    .in(
      "product_id",
      products.map((p) => p.id),
    )
    .eq("status", "active")
    .order("sort_order", { ascending: false });

  if (error) {
    console.error("loadVariantsByProductIds:", error.message);
    return map;
  }

  for (const row of (data ?? []) as VariantRow[]) {
    const basePrice = priceById.get(row.product_id) ?? 0;
    const list = map.get(row.product_id) ?? [];
    list.push(mapVariant(row, basePrice));
    map.set(row.product_id, list);
  }

  for (const [id, variants] of map) {
    map.set(id, enrichVariants(variants));
  }

  return map;
}

export const getBoxCatalog = cache(async (): Promise<BoxCatalog> => {
  const grouped = await Promise.all(
    BOX_CATEGORY_ROWS.map(async (row) => {
      const products = await getProducts({ collection: row.slug });
      const variantsById = await loadVariantsByProductIds(products);
      const withVariants: BoxCatalogProduct[] = products.map((product) => ({
        ...product,
        categoryKey: row.key,
        variants: variantsById.get(product.id) ?? [],
      }));
      return [row.key, withVariants] as const;
    }),
  );

  return {
    coffee: grouped.find(([key]) => key === "coffee")?.[1] ?? [],
    tshirt: grouped.find(([key]) => key === "tshirt")?.[1] ?? [],
    print: grouped.find(([key]) => key === "print")?.[1] ?? [],
  };
});
