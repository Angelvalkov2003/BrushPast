"use server";

import { isAdmin } from "lib/supabase/auth";
import { createWorkshop, deleteWorkshop, updateWorkshop } from "lib/supabase/admin-workshops";
import { parseOptionalId, parseOptionalText, parseSortOrder, parseStatus } from "lib/admin/parse-form";

function parseWorkshop(fd: FormData) {
  return {
    title: parseOptionalText(fd, "title"),
    slug: parseOptionalText(fd, "slug"),
    image_url: (fd.get("image_url") as string) || undefined,
    short_description: (fd.get("short_description") as string) || undefined,
    location_label: parseOptionalText(fd, "location_label"),
    page_url: parseOptionalId(fd, "page_url"),
    workshop_category: parseOptionalText(fd, "workshop_category"),
    organisation_id: parseOptionalId(fd, "organisation_id"),
    status: parseStatus(fd),
    sort_order: parseSortOrder(fd),
  };
}

export async function createWorkshopAction(fd: FormData) {
  if (!(await isAdmin())) return { error: "Unauthorized" };
  try {
    await createWorkshop(parseWorkshop(fd));
    return {};
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed" };
  }
}

export async function updateWorkshopAction(fd: FormData) {
  if (!(await isAdmin())) return { error: "Unauthorized" };
  const id = fd.get("id") as string;
  if (!id) return { error: "Missing id" };
  try {
    await updateWorkshop(id, parseWorkshop(fd));
    return {};
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed" };
  }
}

export async function deleteWorkshopAction(id: string) {
  if (!(await isAdmin())) return { error: "Unauthorized" };
  try {
    await deleteWorkshop(id);
    return {};
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed" };
  }
}
