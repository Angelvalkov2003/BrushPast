import { getSupabaseServiceClient } from "lib/supabase/service";
import type {
  AdminProduct,
  AdminProductVariantInput,
  ContentStatus,
  InventoryType,
} from "lib/types/admin";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function getAllProductsAdmin(params?: {
  status?: ContentStatus;
  categoryId?: string;
}): Promise<AdminProduct[]> {
  const supabase = getSupabaseServiceClient();

  let productIds: string[] | null = null;
  if (params?.categoryId) {
    const { data: links } = await supabase
      .from("product_categories")
      .select("product_id")
      .eq("category_id", params.categoryId);
    productIds = (links ?? []).map((l) => l.product_id);
    if (productIds.length === 0) return [];
  }

  let query = supabase.from("products").select("*").order("sort_order", { ascending: false });

  if (params?.status) query = query.eq("status", params.status);
  if (productIds) query = query.in("id", productIds);

  const { data, error } = await query;
  if (error) throw new Error(error.message);

  const products = (data ?? []) as AdminProduct[];
  if (products.length === 0) return [];

  const ids = products.map((p) => p.id);
  const { data: catLinks } = await supabase
    .from("product_categories")
    .select("product_id, category_id")
    .in("product_id", ids);

  const map = new Map<string, string[]>();
  for (const link of catLinks ?? []) {
    const arr = map.get(link.product_id) ?? [];
    arr.push(link.category_id);
    map.set(link.product_id, arr);
  }

  return products.map((p) => ({ ...p, category_ids: map.get(p.id) ?? [] }));
}

export async function getProductByIdAdmin(id: string): Promise<AdminProduct | null> {
  const supabase = getSupabaseServiceClient();
  const { data: product, error } = await supabase.from("products").select("*").eq("id", id).single();
  if (error || !product) return null;

  const [{ data: catLinks }, { data: images }, { data: variants }, { data: storyLinks }, { data: orgLinks }] =
    await Promise.all([
    supabase.from("product_categories").select("category_id").eq("product_id", id),
    supabase
      .from("product_images")
      .select("id, image_url, sort_order")
      .eq("product_id", id)
      .order("sort_order", { ascending: false }),
    supabase
      .from("product_variants")
      .select("*")
      .eq("product_id", id)
      .order("sort_order", { ascending: false }),
    supabase.from("product_stories").select("story_id").eq("product_id", id),
    supabase.from("product_organisations").select("organisation_id").eq("product_id", id),
  ]);

  const row = product as AdminProduct;

  return {
    ...row,
    category_ids: (catLinks ?? []).map((c) => c.category_id),
    story_ids: (storyLinks ?? []).map((s) => s.story_id),
    organisation_ids: (orgLinks ?? []).map((o) => o.organisation_id),
    workshop_id: row.workshop_id ?? null,
    images: images ?? [],
    variants: variants ?? [],
  };
}

export type ProductInput = {
  title: string;
  slug?: string;
  short_description?: string;
  full_description?: string;
  main_image_url?: string;
  price_gbp: number;
  story_number?: string;
  product_type?: string;
  medium?: string;
  qr_story_url?: string;
  edition_number?: string;
  total_edition_size?: string;
  profit_share_note?: string;
  impact_note?: string;
  weight?: string;
  dimensions?: string;
  inventory_type?: InventoryType;
  inventory_quantity?: number | null;
  status?: ContentStatus;
  sort_order?: number;
  category_ids?: string[];
  story_ids?: string[];
  organisation_ids?: string[];
  workshop_id?: string | null;
  gallery_urls?: string[];
  variants?: AdminProductVariantInput[];
};

async function syncProductStories(productId: string, storyIds: string[]) {
  const supabase = getSupabaseServiceClient();
  await supabase.from("product_stories").delete().eq("product_id", productId);
  if (storyIds.length === 0) return;
  await supabase.from("product_stories").insert(
    storyIds.map((story_id) => ({ product_id: productId, story_id })),
  );
}

async function syncProductOrganisations(productId: string, organisationIds: string[]) {
  const supabase = getSupabaseServiceClient();
  await supabase.from("product_organisations").delete().eq("product_id", productId);
  if (organisationIds.length === 0) return;
  await supabase.from("product_organisations").insert(
    organisationIds.map((organisation_id) => ({ product_id: productId, organisation_id })),
  );
}

async function syncProductCategories(productId: string, categoryIds: string[]) {
  const supabase = getSupabaseServiceClient();
  await supabase.from("product_categories").delete().eq("product_id", productId);
  if (categoryIds.length === 0) return;
  await supabase.from("product_categories").insert(
    categoryIds.map((category_id) => ({ product_id: productId, category_id })),
  );
}

async function syncProductImages(productId: string, urls: string[]) {
  const supabase = getSupabaseServiceClient();
  await supabase.from("product_images").delete().eq("product_id", productId);
  const filtered = urls.filter(Boolean);
  if (filtered.length === 0) return;
  await supabase.from("product_images").insert(
    filtered.map((image_url, index) => ({
      product_id: productId,
      image_url,
      sort_order: filtered.length - index,
    })),
  );
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isUuid(value: string) {
  return UUID_RE.test(value);
}

export async function syncProductVariants(
  productId: string,
  variants: AdminProductVariantInput[],
) {
  const supabase = getSupabaseServiceClient();
  const cleaned = variants
    .map((v) => ({
      ...v,
      variant_name: v.variant_name.trim(),
      sku: v.sku?.trim() || undefined,
    }))
    .filter((v) => v.variant_name.length > 0);

  const { data: existing } = await supabase
    .from("product_variants")
    .select("id")
    .eq("product_id", productId);

  const keepIds = new Set(
    cleaned.filter((v) => v.id && isUuid(v.id)).map((v) => v.id as string),
  );
  const deleteIds = (existing ?? [])
    .map((row) => row.id)
    .filter((id) => !keepIds.has(id));

  if (deleteIds.length > 0) {
    const { error } = await supabase.from("product_variants").delete().in("id", deleteIds);
    if (error) throw new Error(error.message);
  }

  for (let index = 0; index < cleaned.length; index++) {
    const variant = cleaned[index]!;
    const row = {
      product_id: productId,
      variant_name: variant.variant_name,
      inventory_type: variant.inventory_type ?? "limited",
      inventory_quantity: variant.inventory_quantity ?? null,
      sku: variant.sku || null,
      price_override: variant.price_override ?? null,
      status: variant.status ?? "active",
      sort_order: cleaned.length - index,
    };

    if (variant.id && isUuid(variant.id)) {
      const { error } = await supabase.from("product_variants").update(row).eq("id", variant.id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabase.from("product_variants").insert(row);
      if (error) throw new Error(error.message);
    }
  }
}

export async function createProductAdmin(input: ProductInput) {
  const supabase = getSupabaseServiceClient();
  const slug = (input.slug?.trim() || slugify(input.title)) || `product-${Date.now()}`;

  const { data, error } = await supabase
    .from("products")
    .insert({
      title: input.title,
      slug,
      short_description: input.short_description ?? null,
      full_description: input.full_description ?? null,
      main_image_url: input.main_image_url ?? null,
      price_gbp: input.price_gbp,
      story_number: input.story_number?.trim() || null,
      product_type: input.product_type?.trim() || null,
      medium: input.medium?.trim() || null,
      qr_story_url: input.qr_story_url?.trim() || null,
      edition_number: input.edition_number?.trim() || null,
      total_edition_size: input.total_edition_size?.trim() || null,
      profit_share_note: input.profit_share_note?.trim() || null,
      impact_note: input.impact_note?.trim() || null,
      weight: input.weight?.trim() || null,
      dimensions: input.dimensions?.trim() || null,
      workshop_id: input.workshop_id?.trim() || null,
      inventory_type: input.inventory_type ?? "unlimited",
      inventory_quantity: input.inventory_quantity ?? null,
      status: input.status ?? "draft",
      sort_order: input.sort_order ?? 0,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  await syncProductCategories(data.id, input.category_ids ?? []);
  await syncProductStories(data.id, input.story_ids ?? []);
  await syncProductOrganisations(data.id, input.organisation_ids ?? []);
  await syncProductImages(data.id, input.gallery_urls ?? []);
  if (input.variants !== undefined) {
    await syncProductVariants(data.id, input.variants);
  }

  return getProductByIdAdmin(data.id);
}

export async function updateProductAdmin(id: string, input: Partial<ProductInput>) {
  const supabase = getSupabaseServiceClient();
  const patch: Record<string, unknown> = {};

  if (input.title !== undefined) patch.title = input.title;
  if (input.slug !== undefined) patch.slug = input.slug;
  if (input.short_description !== undefined) patch.short_description = input.short_description;
  if (input.full_description !== undefined) patch.full_description = input.full_description;
  if (input.main_image_url !== undefined) patch.main_image_url = input.main_image_url;
  if (input.price_gbp !== undefined) patch.price_gbp = input.price_gbp;
  if (input.story_number !== undefined) patch.story_number = input.story_number.trim() || null;
  if (input.product_type !== undefined) patch.product_type = input.product_type.trim() || null;
  if (input.medium !== undefined) patch.medium = input.medium.trim() || null;
  if (input.qr_story_url !== undefined) patch.qr_story_url = input.qr_story_url.trim() || null;
  if (input.edition_number !== undefined) patch.edition_number = input.edition_number.trim() || null;
  if (input.total_edition_size !== undefined) {
    patch.total_edition_size = input.total_edition_size.trim() || null;
  }
  if (input.profit_share_note !== undefined) {
    patch.profit_share_note = input.profit_share_note.trim() || null;
  }
  if (input.impact_note !== undefined) patch.impact_note = input.impact_note.trim() || null;
  if (input.weight !== undefined) patch.weight = input.weight.trim() || null;
  if (input.dimensions !== undefined) patch.dimensions = input.dimensions.trim() || null;
  if (input.workshop_id !== undefined) patch.workshop_id = input.workshop_id?.trim() || null;
  if (input.inventory_type !== undefined) patch.inventory_type = input.inventory_type;
  if (input.inventory_quantity !== undefined) patch.inventory_quantity = input.inventory_quantity;
  if (input.status !== undefined) patch.status = input.status;
  if (input.sort_order !== undefined) patch.sort_order = input.sort_order;

  if (Object.keys(patch).length > 0) {
    const { error } = await supabase.from("products").update(patch).eq("id", id);
    if (error) throw new Error(error.message);
  }

  if (input.category_ids !== undefined) await syncProductCategories(id, input.category_ids);
  if (input.story_ids !== undefined) await syncProductStories(id, input.story_ids);
  if (input.organisation_ids !== undefined) {
    await syncProductOrganisations(id, input.organisation_ids);
  }
  if (input.gallery_urls !== undefined) await syncProductImages(id, input.gallery_urls);
  if (input.variants !== undefined) await syncProductVariants(id, input.variants);

  return getProductByIdAdmin(id);
}

export async function deleteProductAdmin(id: string) {
  const supabase = getSupabaseServiceClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function toggleProductStatusAdmin(id: string, status: ContentStatus) {
  return updateProductAdmin(id, { status });
}
