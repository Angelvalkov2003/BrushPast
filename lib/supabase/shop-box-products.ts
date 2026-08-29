import { cache } from "react";
import { isSellableWithVariants } from "lib/product-variants";
import type { Product, ProductVariant } from "lib/types";
import {
  BOX_CATEGORY_ROWS,
  type BoxCategoryKey,
} from "lib/shop-box-config";
import { getProducts } from "./products";
import { loadVariantsByProductIds } from "./product-variant-stock";

export type BoxCatalogProduct = Product & {
  categoryKey: BoxCategoryKey;
  variants: ProductVariant[];
};

export type BoxCatalog = Record<BoxCategoryKey, BoxCatalogProduct[]>;

export { loadVariantsByProductIds, applyVariantAvailability } from "./product-variant-stock";

export const getBoxCatalog = cache(async (): Promise<BoxCatalog> => {
  const grouped = await Promise.all(
    BOX_CATEGORY_ROWS.map(async (row) => {
      const products = await getProducts({
        collection: row.slug,
        includeOutOfStock: true,
      });
      const variantsById = await loadVariantsByProductIds(products);
      const withVariants: BoxCatalogProduct[] = products.map((product) => {
        const variants = variantsById.get(product.id) ?? [];
        return {
          ...product,
          available: isSellableWithVariants(product.available, variants),
          categoryKey: row.key,
          variants,
        };
      });
      return [row.key, withVariants] as const;
    }),
  );

  return {
    coffee: grouped.find(([key]) => key === "coffee")?.[1] ?? [],
    tshirt: grouped.find(([key]) => key === "tshirt")?.[1] ?? [],
    print: grouped.find(([key]) => key === "print")?.[1] ?? [],
  };
});
