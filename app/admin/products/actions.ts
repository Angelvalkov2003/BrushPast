"use server";

import { isAdmin } from "lib/supabase/auth";
import {
  createProductAdmin,
  deleteProductAdmin,
  updateProductAdmin,
} from "lib/supabase/admin-products";
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
  const categoryIds = JSON.parse((fd.get("category_ids") as string) || "[]") as string[];
  const gallery_urls = JSON.parse((fd.get("gallery_urls") as string) || "[]") as string[];
  const qty = fd.get("inventory_quantity") as string;

  return {
    title: (fd.get("title") as string)?.trim(),
    slug: (fd.get("slug") as string)?.trim() || undefined,
    short_description: (fd.get("short_description") as string) || undefined,
    full_description: (fd.get("full_description") as string) || undefined,
    main_image_url: (fd.get("main_image_url") as string) || undefined,
    price_gbp: parseFloat(fd.get("price_gbp") as string),
    inventory_type: (fd.get("inventory_type") as InventoryType) || "unlimited",
    inventory_quantity: qty ? parseInt(qty, 10) : null,
    status: (fd.get("status") as ContentStatus) || "draft",
    sort_order: parseInt((fd.get("sort_order") as string) || "0", 10),
    category_ids: categoryIds,
    gallery_urls,
    variants: parseVariants(fd),
  };
}

export async function createProductAction(fd: FormData) {
  if (!(await isAdmin())) return { error: "Unauthorized" };
  try {
    const input = parseForm(fd);
    if (!input.title || Number.isNaN(input.price_gbp)) return { error: "Title and price required" };
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
    await updateProductAdmin(id, parseForm(fd));
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
