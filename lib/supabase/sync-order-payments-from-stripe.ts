import { stripe } from "lib/stripe";
import { getSupabaseServiceClient } from "lib/supabase/service";
import type { PaymentStatus } from "lib/types/admin";
import type Stripe from "stripe";

export type StripePaymentSyncResult = {
  orderId: string;
  orderNumber: string;
  previousStatus: string;
  nextStatus: PaymentStatus | null;
  action: "updated" | "unchanged" | "error";
  detail?: string;
};

type SyncableOrder = {
  id: string;
  order_number: string;
  payment_status: string;
  stripe_checkout_session_id: string;
  stripe_payment_intent_id: string | null;
};

function paymentIntentFullyRefunded(
  pi: Stripe.PaymentIntent | null | undefined,
): boolean {
  if (!pi) return false;
  // amount_refunded is present on PaymentIntent in the API; typings can lag.
  const refunded = Number(
    (pi as Stripe.PaymentIntent & { amount_refunded?: number }).amount_refunded ??
      0,
  );
  const amount = pi.amount ?? 0;
  return amount > 0 && refunded >= amount;
}

function resolvePaymentIntent(
  session: Stripe.Checkout.Session,
): Stripe.PaymentIntent | null {
  if (!session.payment_intent) return null;
  if (typeof session.payment_intent === "string") return null;
  return session.payment_intent;
}

/**
 * Pull latest Checkout Session / PaymentIntent state from Stripe and update
 * local payment_status for card orders.
 *
 * - Stripe paid → stripe_confirmed (does not overwrite `received`)
 * - Fully refunded → refunded
 * - Expired unpaid session → cancelled
 */
export async function syncOrderPaymentsFromStripe(): Promise<{
  checked: number;
  updated: number;
  results: StripePaymentSyncResult[];
}> {
  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase
    .from("orders")
    .select(
      "id, order_number, payment_status, stripe_checkout_session_id, stripe_payment_intent_id",
    )
    .eq("payment_method", "card")
    .not("stripe_checkout_session_id", "is", null)
    .in("payment_status", [
      "pending",
      "failed",
      "paid",
      "stripe_confirmed",
      "received",
    ])
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) throw new Error(error.message);

  const orders = (data ?? []) as SyncableOrder[];
  const results: StripePaymentSyncResult[] = [];
  let updated = 0;

  for (const order of orders) {
    try {
      const session = await stripe.checkout.sessions.retrieve(
        order.stripe_checkout_session_id,
        { expand: ["payment_intent"] },
      );
      const pi = resolvePaymentIntent(session);
      const previous = order.payment_status;

      let next: PaymentStatus | null = null;
      let detail: string | undefined;

      if (paymentIntentFullyRefunded(pi)) {
        if (previous !== "refunded") {
          next = "refunded";
          detail = "Stripe payment intent fully refunded";
        }
      } else if (
        session.payment_status === "paid" &&
        (previous === "pending" ||
          previous === "failed" ||
          previous === "paid")
      ) {
        // Use RPC so inventory + order_status side effects stay consistent.
        const { error: rpcError } = await supabase.rpc(
          "complete_order_from_stripe",
          {
            p_stripe_checkout_session_id: order.stripe_checkout_session_id,
            p_stripe_payment_intent_id:
              pi?.id ?? order.stripe_payment_intent_id,
            p_stripe_event_id: null,
          },
        );
        if (rpcError) throw new Error(rpcError.message);
        next = "stripe_confirmed";
        detail = "Stripe checkout session paid";
        updated += 1;
        results.push({
          orderId: order.id,
          orderNumber: order.order_number,
          previousStatus: previous,
          nextStatus: next,
          action: "updated",
          detail,
        });
        continue;
      } else if (
        session.status === "expired" &&
        session.payment_status !== "paid" &&
        (previous === "pending" || previous === "failed")
      ) {
        next = "cancelled";
        detail = "Stripe checkout session expired";
      }

      if (!next || next === previous) {
        results.push({
          orderId: order.id,
          orderNumber: order.order_number,
          previousStatus: previous,
          nextStatus: null,
          action: "unchanged",
          detail: detail ?? `Stripe session ${session.status}/${session.payment_status}`,
        });
        continue;
      }

      const patch: {
        payment_status: PaymentStatus;
        stripe_payment_intent_id?: string;
        order_status?: string;
        updated_at: string;
      } = {
        payment_status: next,
        updated_at: new Date().toISOString(),
      };
      if (pi?.id) patch.stripe_payment_intent_id = pi.id;
      if (next === "cancelled") {
        patch.order_status = "cancelled";
      }
      if (next === "refunded") {
        patch.order_status = "refunded";
      }

      const { error: updateError } = await supabase
        .from("orders")
        .update(patch)
        .eq("id", order.id);
      if (updateError) throw new Error(updateError.message);

      updated += 1;
      results.push({
        orderId: order.id,
        orderNumber: order.order_number,
        previousStatus: previous,
        nextStatus: next,
        action: "updated",
        detail,
      });
    } catch (err: unknown) {
      results.push({
        orderId: order.id,
        orderNumber: order.order_number,
        previousStatus: order.payment_status,
        nextStatus: null,
        action: "error",
        detail: err instanceof Error ? err.message : "Sync failed",
      });
    }
  }

  return { checked: orders.length, updated, results };
}
