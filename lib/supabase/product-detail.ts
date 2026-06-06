import { enrichVariants } from "lib/product-variants";
import type { ProductDetail, ProductVariant } from "lib/types";
import { cache } from "react";
import { createServerClient } from "./server";
import { getSupabaseServiceClient } from "./service";
import { transformProduct, loadGalleries } from "./products";

function isAvailable(row: {
  inventory_type?: string;
  inventory_quantity?: number | null;
}): boolean {
  if (row.inventory_type === "unlimited") return true;
  return (row.inventory_quantity ?? 0) > 0;
}

function mapVariants(
  rows: {
    id: string;
    variant_name: string | null;
    inventory_type: string;
    inventory_quantity: number | null;
    sku: string | null;
    price_override: number | null;
    status: string;
  }[],
  basePrice: number,
): ProductVariant[] {
  return rows
    .filter((v) => v.status === "active")
    .map((v) => {
      const qty = v.inventory_quantity ?? 0;
      const limited = v.inventory_type === "limited" || v.inventory_type === "single";
      const available = v.inventory_type === "unlimited" || qty > 0;
      const name = v.variant_name?.trim() || "Default";
      return {
        id: v.id,
        title: name,
        price: v.price_override != null ? Number(v.price_override) : basePrice,
        sku: v.sku ?? undefined,
        inventory: qty,
        available,
      };
    });
}

/** Active variants for a public product (service role — RLS may block anon reads). */
async function loadProductVariants(
  productId: string,
  basePrice: number,
): Promise<ProductVariant[]> {
  try {
    const supabase = getSupabaseServiceClient();
    const { data: variantRows, error } = await supabase
      .from("product_variants")
      .select("id, variant_name, inventory_type, inventory_quantity, sku, price_override, status")
      .eq("product_id", productId)
      .eq("status", "active")
      .order("sort_order", { ascending: false });

    if (error) {
      console.error("loadProductVariants:", error.message);
      return [];
    }

    return enrichVariants(mapVariants(variantRows ?? [], basePrice));
  } catch (error) {
    console.error("loadProductVariants:", error);
    return [];
  }
}

export const getProductDetail = cache(async (slug: string): Promise<ProductDetail | null> => {
  try {
    const supabase = await createServerClient();
    const trimmed = slug.trim();

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", trimmed)
      .eq("status", "active")
      .maybeSingle();

    if (error || !data) return null;

    const galleries = await loadGalleries(supabase, [data.id]);
    const base = transformProduct(data, galleries.get(data.id) ?? []);

    const [
      variants,
      { data: catLinks },
      { data: creatorLinks },
      { data: storyLinks },
    ] = await Promise.all([
      loadProductVariants(data.id, base.price),
      supabase.from("product_categories").select("category_id").eq("product_id", data.id),
      supabase.from("product_creators").select("creator_id").eq("product_id", data.id),
      supabase.from("product_stories").select("story_id").eq("product_id", data.id),
    ]);

    const categoryIds = (catLinks ?? []).map((l) => l.category_id);
    const creatorIds = (creatorLinks ?? []).map((l) => l.creator_id);
    const storyIds = (storyLinks ?? []).map((l) => l.story_id);

    const [{ data: categories }, { data: creators }, { data: stories }] = await Promise.all([
      categoryIds.length
        ? supabase.from("categories").select("slug, name").in("id", categoryIds).eq("status", "active")
        : Promise.resolve({ data: [] as { slug: string | null; name: string | null }[] }),
      creatorIds.length
        ? supabase.from("creators").select("name").in("id", creatorIds).eq("status", "active")
        : Promise.resolve({ data: [] as { name: string | null }[] }),
      storyIds.length
        ? supabase
            .from("stories")
            .select("title, slug, page_url")
            .in("id", storyIds)
            .eq("status", "active")
        : Promise.resolve({ data: [] as { title: string | null; slug: string | null; page_url: string | null }[] }),
    ]);

    const hasAvailableVariant = variants.some((v) => v.available);
    const productAvailable = isAvailable(data) && (variants.length === 0 || hasAvailableVariant);
    const primaryCategory = categories?.[0]?.slug ?? undefined;

    return {
      ...base,
      available: productAvailable,
      category: primaryCategory,
      description: (data.short_description as string) || base.description,
      shortDescription: (data.short_description as string) || "",
      fullDescription: (data.full_description as string) || (data.short_description as string) || "",
      storyNumber: (data.story_number as string) || null,
      productType: (data.product_type as string) || null,
      medium: (data.medium as string) || null,
      qrStoryUrl: (data.qr_story_url as string) || null,
      editionNumber: (data.edition_number as string) || null,
      totalEditionSize: (data.total_edition_size as string) || null,
      profitShareNote: (data.profit_share_note as string) || null,
      impactNote: (data.impact_note as string) || null,
      weight: (data.weight as string) || null,
      dimensions: (data.dimensions as string) || null,
      inventoryType: (data.inventory_type as string) || null,
      inventoryQuantity: (data.inventory_quantity as number) ?? null,
      variants,
      categories: (categories ?? []).map((c) => ({
        slug: c.slug || "",
        name: c.name || c.slug || "",
      })),
      creators: (creators ?? []).map((c) => ({ name: c.name || "Creator" })),
      stories: (stories ?? []).map((s) => ({
        title: s.title || s.slug || "Story",
        slug: s.slug || "",
        pageUrl: s.page_url?.trim() || (s.slug ? `/stories/${s.slug}` : null),
      })),
    };
  } catch (error) {
    console.error("getProductDetail:", error);
    return null;
  }
});
