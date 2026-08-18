import { getSupabaseServiceClient } from "lib/supabase/service";
import type { SponsorTierId } from "lib/sponsor-config";

export type SponsorPaymentStatus = "pending" | "paid" | "failed" | "refunded";

export type SponsorRow = {
  id: string;
  full_name: string | null;
  email: string | null;
  amount_gbp: number;
  tier: SponsorTierId;
  payment_status: SponsorPaymentStatus;
  stripe_checkout_session_id: string | null;
  stripe_payment_intent_id: string | null;
  privacy_policy_accepted_at: string | null;
  created_at: string;
  updated_at: string;
};

export async function createPendingSponsor(input: {
  full_name: string;
  email: string;
  amount_gbp: number;
  tier: SponsorTierId;
}): Promise<SponsorRow> {
  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase
    .from("sponsors")
    .insert({
      full_name: input.full_name,
      email: input.email,
      amount_gbp: input.amount_gbp,
      tier: input.tier,
      payment_status: "pending",
      privacy_policy_accepted_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error || !data) {
    throw new Error(error?.message || "Failed to start sponsorship");
  }
  return data as SponsorRow;
}

export async function setSponsorStripeSession(
  sponsorId: string,
  sessionId: string,
) {
  const supabase = getSupabaseServiceClient();
  const { error } = await supabase
    .from("sponsors")
    .update({ stripe_checkout_session_id: sessionId })
    .eq("id", sponsorId);
  if (error) throw new Error(error.message);
}

export async function deletePendingSponsor(sponsorId: string) {
  const supabase = getSupabaseServiceClient();
  await supabase
    .from("sponsors")
    .delete()
    .eq("id", sponsorId)
    .eq("payment_status", "pending");
}

export async function completeSponsorFromStripe(input: {
  eventId: string;
  sessionId: string;
  sponsorId?: string | null;
  paymentIntentId: string | null;
  email?: string | null;
  name?: string | null;
}): Promise<{ alreadyProcessed: boolean; sponsor: SponsorRow | null }> {
  const supabase = getSupabaseServiceClient();

  let existing: SponsorRow | null = null;

  const bySession = await supabase
    .from("sponsors")
    .select("*")
    .eq("stripe_checkout_session_id", input.sessionId)
    .maybeSingle();
  if (bySession.error) throw new Error(bySession.error.message);
  existing = (bySession.data as SponsorRow | null) ?? null;

  if (!existing && input.sponsorId) {
    const byId = await supabase
      .from("sponsors")
      .select("*")
      .eq("id", input.sponsorId)
      .maybeSingle();
    if (byId.error) throw new Error(byId.error.message);
    existing = (byId.data as SponsorRow | null) ?? null;
  }

  if (!existing) {
    throw new Error(`Sponsor not found for Stripe session ${input.sessionId}`);
  }

  if (existing.payment_status === "paid") {
    return { alreadyProcessed: true, sponsor: existing };
  }

  const { error: eventError } = await supabase.from("stripe_webhook_events").insert({
    stripe_event_id: input.eventId,
    event_type: "checkout.session.completed",
    order_id: null,
  });

  if (eventError && eventError.code !== "23505") {
    throw new Error(eventError.message);
  }

  const { data: updated, error: updateError } = await supabase
    .from("sponsors")
    .update({
      payment_status: "paid",
      stripe_checkout_session_id: input.sessionId,
      stripe_payment_intent_id: input.paymentIntentId,
      email: input.email || existing.email,
      full_name: input.name || existing.full_name,
    })
    .eq("id", existing.id)
    .select()
    .single();

  if (updateError || !updated) {
    throw new Error(updateError?.message || "Failed to mark sponsor as paid");
  }

  return { alreadyProcessed: false, sponsor: updated as SponsorRow };
}

export async function getSponsorById(id: string): Promise<SponsorRow | null> {
  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase
    .from("sponsors")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return (data as SponsorRow | null) ?? null;
}

export async function getAllSponsorsAdmin(): Promise<SponsorRow[]> {
  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase
    .from("sponsors")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as SponsorRow[];
}

export async function deletePendingSponsorAdmin(id: string) {
  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase
    .from("sponsors")
    .delete()
    .eq("id", id)
    .eq("payment_status", "pending")
    .select("id")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) {
    throw new Error("Paid sponsorships cannot be deleted.");
  }
}

export async function getSponsorAdminStats() {
  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase
    .from("sponsors")
    .select("payment_status, amount_gbp");
  if (error) throw new Error(error.message);
  const list = data ?? [];
  const paid = list.filter((row) => row.payment_status === "paid");
  return {
    total: list.length,
    paid: paid.length,
    pending: list.filter((row) => row.payment_status === "pending").length,
    paidTotalGbp: paid.reduce((sum, row) => sum + Number(row.amount_gbp ?? 0), 0),
  };
}
