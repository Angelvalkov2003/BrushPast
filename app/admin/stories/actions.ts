"use server";

import { isAdmin } from "lib/supabase/auth";
import { createStory, deleteStory, updateStory } from "lib/supabase/admin-stories";
import {
  parseOptionalId,
  parseOptionalText,
  parseSortOrder,
  parseStatus,
} from "lib/admin/parse-form";

function parseStory(fd: FormData) {
  const tags = fd.getAll("tags").map((t) => String(t).toLowerCase());
  return {
    title: parseOptionalText(fd, "title"),
    slug: parseOptionalText(fd, "slug"),
    image_url: (fd.get("image_url") as string)?.trim() || null,
    short_description: (fd.get("short_description") as string) || undefined,
    page_url: (fd.get("page_url") as string)?.trim() || null,
    tags,
    creator_id: parseOptionalId(fd, "creator_id"),
    organisation_id: parseOptionalId(fd, "organisation_id"),
    status: parseStatus(fd),
    sort_order: parseSortOrder(fd),
  };
}

export async function createStoryAction(fd: FormData) {
  if (!(await isAdmin())) return { error: "Unauthorized" };
  try {
    await createStory(parseStory(fd));
    return {};
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed" };
  }
}

export async function updateStoryAction(fd: FormData) {
  if (!(await isAdmin())) return { error: "Unauthorized" };
  const id = fd.get("id") as string;
  if (!id) return { error: "Missing id" };
  try {
    await updateStory(id, parseStory(fd));
    return {};
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed" };
  }
}

export async function deleteStoryAction(id: string) {
  if (!(await isAdmin())) return { error: "Unauthorized" };
  try {
    await deleteStory(id);
    return {};
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed" };
  }
}
