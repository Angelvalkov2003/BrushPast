"use server";

import { isAdmin } from "lib/supabase/auth";
import {
  createOrganisation,
  deleteOrganisation,
  updateOrganisation,
} from "lib/supabase/admin-organisations";
import { parseOptionalText, parseSortOrder, parseStatus } from "lib/admin/parse-form";

function parseOrg(fd: FormData) {
  return {
    name: parseOptionalText(fd, "name"),
    slug: parseOptionalText(fd, "slug"),
    image_url: (fd.get("image_url") as string) || undefined,
    short_description: (fd.get("short_description") as string) || undefined,
    external_url: parseOptionalText(fd, "external_url"),
    status: parseStatus(fd),
    sort_order: parseSortOrder(fd),
  };
}

export async function createOrganisationAction(fd: FormData) {
  if (!(await isAdmin())) return { error: "Unauthorized" };
  try {
    await createOrganisation(parseOrg(fd));
    return {};
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed" };
  }
}

export async function updateOrganisationAction(fd: FormData) {
  if (!(await isAdmin())) return { error: "Unauthorized" };
  const id = fd.get("id") as string;
  if (!id) return { error: "Missing id" };
  try {
    await updateOrganisation(id, parseOrg(fd));
    return {};
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed" };
  }
}

export async function deleteOrganisationAction(id: string) {
  if (!(await isAdmin())) return { error: "Unauthorized" };
  try {
    await deleteOrganisation(id);
    return {};
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed" };
  }
}
