import type { ShopCategory } from "lib/supabase/categories";

export function categoryCtaLabel(category: ShopCategory): string {
  if (category.shop_cta?.trim()) return category.shop_cta.trim();
  return `Shop ${category.name}`.replace(/\s+/g, " ");
}
