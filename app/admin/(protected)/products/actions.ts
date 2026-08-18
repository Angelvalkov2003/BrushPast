"use server";

import { isAdmin } from "lib/supabase/auth";
import {
  createProductAdmin,
  deleteProductAdmin,
  updateProductAdmin,
} from "lib/supabase/admin-products";
import { getAllCategoriesAdmin } from "lib/supabase/admin-categories";
import { boxCategoriesFromAdmin } from "lib/shop-box-config";
import type { ContentStatus, InventoryType, AdminProductVariantInput } from "lib/types/admin";

function parseVariants(fd: FormData) {
  try {
    const raw = JSON.parse((fd.get("variants") as string) || "[]") as AdminProductVariantInput[];
    return raw.filter((v) => v.variant_name?.trim());
  } catch {
    return [];
  }
}

function parseForm(fd: FormData) {
  const categoryIds = parseCategoryIds(fd);
  const gallery_urls = JSON.parse((fd.get("gallery_urls") as string) || "[]") as string[];
  const qty = fd.get("inventory_quantity") as string;
  const optional = (key: string) => {
    const value = (fd.get(key) as string)?.trim();
    return value || undefined;
  };

  return {
    title: (fd.get("title") as string)?.trim(),
    slug: (fd.get("slug") as string)?.trim() || undefined,
    short_description: (fd.get("short_description") as string) || undefined,
    full_description: (fd.get("full_description") as string) || undefined,
    main_image_url: (fd.get("main_image_url") as string) || undefined,
    price_gbp: parseFloat(fd.get("price_gbp") as string),
    story_number: optional("story_number"),
    product_type: optional("product_type"),
    medium: optional("medium"),
    qr_story_url: optional("qr_story_url"),
    edition_number: optional("edition_number"),
    total_edition_size: optional("total_edition_size"),
    profit_share_note: optional("profit_share_note"),
    impact_note: optional("impact_note"),
    weight: optional("weight"),
    dimensions: optional("dimensions"),
    inventory_type: (fd.get("inventory_type") as InventoryType) || "unlimited",
    inventory_quantity: qty ? parseInt(qty, 10) : null,
    status: (fd.get("status") as ContentStatus) || "draft",
    sort_order: parseInt((fd.get("sort_order") as string) || "0", 10),
    category_ids: categoryIds,
    story_ids: JSON.parse((fd.get("story_ids") as string) || "[]") as string[],
    organisation_ids: JSON.parse((fd.get("organisation_ids") as string) || "[]") as string[],
    workshop_id: optional("workshop_id") ?? null,
    gallery_urls,
    variants: parseVariants(fd),
  };
}

function parseCategoryIds(fd: FormData): string[] {
  const single = (fd.get("category_id") as string)?.trim();
  if (single) return [single];
  try {
    const ids = JSON.parse((fd.get("category_ids") as string) || "[]") as string[];
    return ids.filter(Boolean).slice(0, 1);
  } catch {
    return [];
  }
}

async function requireBoxCategory(categoryIds: string[]) {
  if (categoryIds.length !== 1) {
    throw new Error("Choose one category: T-Shirt, Coffee or Print.");
  }

  const categories = await getAllCategoriesAdmin();
  const allowed = new Set(boxCategoriesFromAdmin(categories).map((item) => item.id));
  if (!allowed.has(categoryIds[0]!)) {
    throw new Error("Choose one category: T-Shirt, Coffee or Print.");
  }
}

export async function createProductAction(fd: FormData) {
  if (!(await isAdmin())) return { error: "Unauthorized" };
  try {
    const input = parseForm(fd);
    if (!input.title || Number.isNaN(input.price_gbp)) return { error: "Title and price required" };
    await requireBoxCategory(input.category_ids);
    await createProductAdmin(input);
    return {};
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed to create" };
  }
}

export async function updateProductAction(fd: FormData) {
  if (!(await isAdmin())) return { error: "Unauthorized" };
  const id = fd.get("id") as string;
  if (!id) return { error: "Missing product id" };
  try {
    const input = parseForm(fd);
    await requireBoxCategory(input.category_ids);
    await updateProductAdmin(id, input);
    return {};
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed to update" };
  }
}

export async function deleteProductAction(id: string) {
  if (!(await isAdmin())) return { error: "Unauthorized" };
  try {
    await deleteProductAdmin(id);
    return {};
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed to delete" };
  }
}

export async function toggleProductStatusAction(id: string, status: ContentStatus) {
  if (!(await isAdmin())) return { error: "Unauthorized" };
  try {
    await updateProductAdmin(id, { status });
    return {};
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed" };
  }
}
