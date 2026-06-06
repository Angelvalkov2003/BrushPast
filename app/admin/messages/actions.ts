"use server";

import { isAdmin } from "lib/supabase/auth";
import { deleteCustomerMessage } from "lib/supabase/admin-messages";

export async function deleteMessageAction(id: string) {
  if (!(await isAdmin())) return { error: "Unauthorized" };
  try {
    await deleteCustomerMessage(id);
    return {};
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed" };
  }
}
