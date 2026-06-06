import { sanitizeImageUrl } from "lib/image-url";
import type { Product } from "lib/types";
import { createServerClient } from "./server";
import { transformProduct } from "./products";

export type StoryArtworkImage = { id: string; url: string; title: string };

export async function getStoryProductsBySlug(slug: string): Promise<Product[]> {
  const supabase = await createServerClient();
  const { data: story } = await supabase
    .from("stories")
    .select("id")
    .eq("slug", slug.trim())
    .eq("status", "active")
    .maybeSingle();

  if (!story) return [];

  const { data: links } = await supabase
    .from("product_stories")
    .select("product_id")
    .eq("story_id", story.id);

  const productIds = (links ?? []).map((l) => l.product_id);
  if (!productIds.length) return [];

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .in("id", productIds)
    .eq("status", "active")
    .order("sort_order", { ascending: false });

  if (error || !data) return [];

  const { data: galleryRows } = await supabase
    .from("product_images")
    .select("id, product_id, image_url, sort_order")
    .in("product_id", productIds)
    .order("sort_order", { ascending: false });

  const galleries = new Map<string, { id: string; url: string; altText?: string }[]>();
  for (const row of galleryRows ?? []) {
    const url = sanitizeImageUrl(row.image_url);
    if (!url) continue;
    const list = galleries.get(row.product_id) ?? [];
    list.push({ id: row.id, url });
    galleries.set(row.product_id, list);
  }

  return data.map((p) => transformProduct(p, galleries.get(p.id) ?? []));
}

export async function getStoryArtworkBySlug(slug: string): Promise<StoryArtworkImage[]> {
  const products = await getStoryProductsBySlug(slug);
  const images: StoryArtworkImage[] = [];
  for (const p of products) {
    const main = p.featuredImage?.url;
    if (main && main !== "/placeholder-image.jpg") {
      images.push({ id: `${p.id}-main`, url: main, title: p.title });
    }
    for (const img of p.images ?? []) {
      if (img.url) images.push({ id: img.id, url: img.url, title: p.title });
    }
  }
  return images;
}
