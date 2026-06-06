import { sanitizeImageUrl } from "lib/image-url";
import { createServerClient } from "./server";

export type ShopCategory = {
  id: string;
  slug: string;
  name: string;
  image_url: string | null;
  short_description: string | null;
  shop_cta: string | null;
  sort_order: number;
};

export async function getShopCategories(): Promise<ShopCategory[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("categories")
    .select("id, slug, name, image_url, short_description, shop_cta, sort_order")
    .eq("status", "active")
    .order("sort_order", { ascending: false });

  if (error || !data) return [];
  return data
    .filter((c) => c.slug)
    .map((c) => ({
      id: c.id,
      slug: c.slug as string,
      name: c.name || c.slug || "",
      image_url: sanitizeImageUrl(c.image_url),
      short_description: c.short_description,
      shop_cta: c.shop_cta,
      sort_order: c.sort_order,
    }));
}

export async function getShopCategoryBySlug(slug: string): Promise<ShopCategory | null> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("categories")
    .select("id, slug, name, image_url, short_description, shop_cta, sort_order")
    .eq("slug", slug.trim())
    .eq("status", "active")
    .maybeSingle();

  if (error || !data || !data.slug) return null;
  return {
    id: data.id,
    slug: data.slug,
    name: data.name || data.slug,
    image_url: sanitizeImageUrl(data.image_url),
    short_description: data.short_description,
    shop_cta: data.shop_cta,
    sort_order: data.sort_order,
  };
}
