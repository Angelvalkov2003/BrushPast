"use server";

import { isAdmin } from "lib/supabase/auth";
import { syncOrderPaymentsFromStripe } from "lib/supabase/sync-order-payments-from-stripe";

export async function syncStripePaymentsAction() {
  if (!(await isAdmin())) {
    return { error: "Unauthorized" as const };
  }
  try {
    const result = await syncOrderPaymentsFromStripe();
    return { ok: true as const, ...result };
  } catch (e: unknown) {
    return {
      error: e instanceof Error ? e.message : "Failed to sync Stripe payments",
    };
  }
}
