"use server";

import { revalidatePath } from "next/cache";
import { deletePendingSponsorAdmin } from "lib/supabase/sponsors";

export async function deleteSponsorAction(id: string) {
  try {
    await deletePendingSponsorAdmin(id);
    revalidatePath("/admin/sponsors");
    return { success: true as const };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to delete sponsor",
    };
  }
}
