"use server";

import { isAdmin } from "lib/supabase/auth";
import {
  createJournalPost,
  deleteJournalPost,
  updateJournalPost,
} from "lib/supabase/admin-journal";
import {
  parseOptionalText,
  parseSortOrder,
  parseStatus,
} from "lib/admin/parse-form";

function parseGallery(fd: FormData): string[] {
  const raw = (fd.get("gallery_urls") as string) || "[]";
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(String).filter(Boolean) : [];
  } catch {
    return [];
  }
}

function parseJournal(fd: FormData) {
  return {
    title: parseOptionalText(fd, "title"),
    slug: parseOptionalText(fd, "slug"),
    description: (fd.get("description") as string) || undefined,
    main_image_url: (fd.get("main_image_url") as string)?.trim() || null,
    body: (fd.get("body") as string) || undefined,
    status: parseStatus(fd),
    sort_order: parseSortOrder(fd),
    gallery_urls: parseGallery(fd),
  };
}

export async function createJournalPostAction(fd: FormData) {
  if (!(await isAdmin())) return { error: "Unauthorized" };
  try {
    await createJournalPost(parseJournal(fd));
    return {};
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed" };
  }
}

export async function updateJournalPostAction(fd: FormData) {
  if (!(await isAdmin())) return { error: "Unauthorized" };
  const id = fd.get("id") as string;
  if (!id) return { error: "Missing id" };
  try {
    await updateJournalPost(id, parseJournal(fd));
    return {};
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed" };
  }
}

export async function deleteJournalPostAction(id: string) {
  if (!(await isAdmin())) return { error: "Unauthorized" };
  try {
    await deleteJournalPost(id);
    return {};
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed" };
  }
}
