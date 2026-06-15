"use server";

import { isAdmin } from "lib/supabase/auth";
import { createCreator, deleteCreator, updateCreator } from "lib/supabase/admin-creators";
import {
  parseOptionalText,
  parseSortOrder,
  parseStatus,
} from "lib/admin/parse-form";
import { normalizeCreatorProfileUrl } from "lib/creator-profile-url";

function parseCreator(fd: FormData) {
  return {
    name: parseOptionalText(fd, "name"),
    image_url: (fd.get("image_url") as string) || undefined,
    short_description: (fd.get("short_description") as string) || undefined,
    profile_url: normalizeCreatorProfileUrl(parseOptionalText(fd, "profile_url")),
    is_anonymous: fd.get("is_anonymous") === "on",
    status: parseStatus(fd),
    sort_order: parseSortOrder(fd),
  };
}

export async function createCreatorAction(fd: FormData) {
  if (!(await isAdmin())) return { error: "Unauthorized" };
  try {
    await createCreator(parseCreator(fd));
    return {};
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed" };
  }
}

export async function updateCreatorAction(fd: FormData) {
  if (!(await isAdmin())) return { error: "Unauthorized" };
  const id = fd.get("id") as string;
  if (!id) return { error: "Missing id" };
  try {
    await updateCreator(id, parseCreator(fd));
    return {};
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed" };
  }
}

export async function deleteCreatorAction(id: string) {
  if (!(await isAdmin())) return { error: "Unauthorized" };
  try {
    await deleteCreator(id);
    return {};
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed" };
  }
}
