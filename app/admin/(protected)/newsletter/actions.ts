"use server";

import { revalidatePath } from "next/cache";
import { deleteNewsletterSubscriber } from "lib/supabase/admin-newsletter";

export async function deleteNewsletterSubscriberAction(id: string) {
  try {
    await deleteNewsletterSubscriber(id);
    revalidatePath("/admin/newsletter");
    return { success: true as const };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to delete subscriber",
    };
  }
}
