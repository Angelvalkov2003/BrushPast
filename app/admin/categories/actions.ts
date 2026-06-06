"use server";

import { isAdmin } from "lib/supabase/auth";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "lib/supabase/admin-categories";
import type { ContentStatus } from "lib/types/admin";

export async function createCategoryAction(fd: FormData) {
  if (!(await isAdmin())) return { error: "Unauthorized" };
  try {
    await createCategory({
      name: (fd.get("name") as string)?.trim() || undefined,
      slug: (fd.get("slug") as string)?.trim() || undefined,
      image_url: (fd.get("image_url") as string) || undefined,
      short_description: (fd.get("short_description") as string) || undefined,
      shop_cta: (fd.get("shop_cta") as string) || undefined,
      status: (fd.get("status") as ContentStatus) || "draft",
      sort_order: parseInt((fd.get("sort_order") as string) || "0", 10),
    });
    return {};
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed" };
  }
}

export async function updateCategoryAction(fd: FormData) {
  if (!(await isAdmin())) return { error: "Unauthorized" };
  const id = fd.get("id") as string;
  if (!id) return { error: "Missing id" };
  try {
    await updateCategory(id, {
      name: (fd.get("name") as string)?.trim(),
      slug: (fd.get("slug") as string)?.trim(),
      image_url: (fd.get("image_url") as string) || undefined,
      short_description: (fd.get("short_description") as string) || undefined,
      shop_cta: (fd.get("shop_cta") as string) || undefined,
      status: fd.get("status") as ContentStatus,
      sort_order: parseInt((fd.get("sort_order") as string) || "0", 10),
    });
    return {};
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed" };
  }
}

export async function deleteCategoryAction(id: string) {
  if (!(await isAdmin())) return { error: "Unauthorized" };
  try {
    await deleteCategory(id);
    return {};
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed" };
  }
}
