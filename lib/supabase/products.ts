import { sanitizeImageUrl } from "lib/image-url";
import type { Product, Collection } from "lib/types";
import { cache } from "react";
import { createServerClient } from "./server";

function isReactPostpone(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "$$typeof" in error &&
    error.$$typeof === Symbol.for("react.postpone")
  );
}

function isAvailable(row: {
  inventory_type?: string;
  inventory_quantity?: number | null;
}): boolean {
  if (row.inventory_type === "unlimited") return true;
  if (row.inventory_type === "single") return (row.inventory_quantity ?? 0) > 0;
  return (row.inventory_quantity ?? 0) > 0;
}

export function transformProduct(
  data: Record<string, unknown>,
  gallery: { id: string; url: string; altText?: string }[] = [],
): Product {
  const title = (data.title as string) || "";
  const main = sanitizeImageUrl(data.main_image_url as string) || "";
  return {
    id: data.id as string,
    handle: (data.slug as string) || "",
    title,
    description: ((data.short_description || data.full_description) as string) || "",
    featuredImage: {
      id: data.id as string,
      url: main,
      altText: title,
    },
    images: gallery,
    price: Number(data.price_gbp ?? 0),
    createdAt: data.created_at as string,
    updatedAt: data.updated_at as string,
    available: isAvailable(data as { inventory_type?: string; inventory_quantity?: number | null }),
  };
}

export async function loadGalleries(
  supabase: Awaited<ReturnType<typeof createServerClient>>,
  productIds: string[],
) {
  const map = new Map<string, { id: string; url: string; altText?: string }[]>();
  if (!productIds.length) return map;
  const { data } = await supabase
    .from("product_images")
    .select("id, product_id, image_url, sort_order")
    .in("product_id", productIds)
    .order("sort_order", { ascending: false });
  for (const row of data ?? []) {
    const url = sanitizeImageUrl(row.image_url);
    if (!url) continue;
    const list = map.get(row.product_id) ?? [];
    list.push({ id: row.id, url });
    map.set(row.product_id, list);
  }
  return map;
}

export async function getProducts(params?: {
  query?: string;
  collection?: string;
  limit?: number;
  offset?: number;
  excludeId?: string;
  sort?: "price-asc" | "price-desc" | "name-asc" | "newest" | "discount-desc";
  minPrice?: number;
  maxPrice?: number;
  categories?: string[];
  onSaleOnly?: boolean;
  /** Keep sold-out products in the list (show with Out of stock UI). */
  includeOutOfStock?: boolean;
}): Promise<Product[]> {
  try {
    const supabase = await createServerClient();
    let productIds: string[] | null = null;

    if (params?.collection) {
      const { data: cat } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", params.collection)
        .eq("status", "active")
        .maybeSingle();
      if (!cat) return [];
      const { data: links } = await supabase
        .from("product_categories")
        .select("product_id")
        .eq("category_id", cat.id);
      productIds = (links ?? []).map((l) => l.product_id);
      if (!productIds.length) return [];
    }

    let query = supabase.from("products").select("*").eq("status", "active");
    if (params?.query) {
      query = query.or(
        `title.ilike.%${params.query}%,short_description.ilike.%${params.query}%,full_description.ilike.%${params.query}%`,
      );
    }
    if (productIds) query = query.in("id", productIds);
    if (params?.excludeId) query = query.neq("id", params.excludeId);
    if (params?.minPrice !== undefined) query = query.gte("price_gbp", params.minPrice);
    if (params?.maxPrice !== undefined) query = query.lte("price_gbp", params.maxPrice);

    const sort = params?.sort || "newest";
    if (sort === "price-asc") query = query.order("price_gbp", { ascending: true });
    else if (sort === "price-desc") query = query.order("price_gbp", { ascending: false });
    else if (sort === "name-asc") query = query.order("title", { ascending: true });
    else query = query.order("sort_order", { ascending: false }).order("created_at", { ascending: false });

    if (params?.limit) query = query.limit(params.limit);
    if (params?.offset && params?.limit) {
      query = query.range(params.offset, params.offset + params.limit - 1);
    }

    const { data, error } = await query;
    if (error || !data) return [];

    const galleries = await loadGalleries(
      supabase,
      data.map((p) => p.id),
    );
    const mapped = data.map((p) =>
      transformProduct(p, galleries.get(p.id) ?? []),
    );

    // Per-variant stock (e.g. tee sizes) can sell out while product row still looks available.
    const { applyVariantAvailability } = await import("./product-variant-stock");
    const withVariantStock = await applyVariantAvailability(mapped);

    if (params?.includeOutOfStock) return withVariantStock;
    return withVariantStock.filter((p) => p.available);
  } catch (error) {
    if (isReactPostpone(error)) throw error;
    console.error("getProducts:", error);
    return [];
  }
}

export const getProduct = cache(async (slugOrHandle: string): Promise<Product | null> => {
  try {
    const supabase = await createServerClient();
    const slug = slugOrHandle.trim();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .eq("status", "active")
      .maybeSingle();
    if (error || !data || !isAvailable(data)) return null;
    const galleries = await loadGalleries(supabase, [data.id]);
    return transformProduct(data, galleries.get(data.id) ?? []);
  } catch (error) {
    if (isReactPostpone(error)) throw error;
    console.error("getProduct:", error);
    return null;
  }
});

export async function getCollections(): Promise<Collection[]> {
  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from("categories")
      .select("id, slug, name, image_url, updated_at")
      .eq("status", "active")
      .order("sort_order", { ascending: false });
    if (error || !data) return [];
    return data.map((c) => ({
      id: c.id,
      handle: c.slug || "",
      title: c.name || c.slug || "",
      updatedAt: c.updated_at || new Date().toISOString(),
    }));
  } catch (error) {
    if (isReactPostpone(error)) throw error;
    return [];
  }
}

export async function getCollectionProducts(handle: string): Promise<Product[]> {
  return getProducts({ collection: handle, includeOutOfStock: true });
}
