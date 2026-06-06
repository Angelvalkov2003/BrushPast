import { NextRequest, NextResponse } from "next/server";
import { stripe } from "lib/stripe";
import { getSupabaseServiceClient } from "lib/supabase/service";
import type Stripe from "stripe";

export async function POST(request: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const body = await request.text();
  const sig = request.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "No signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err: unknown) {
    console.error("Webhook signature:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const sessionId = session.id;
    const pi =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent?.id ?? null;

    const supabase = getSupabaseServiceClient();
    const { error } = await supabase.rpc("complete_order_from_stripe", {
      p_stripe_checkout_session_id: sessionId,
      p_stripe_payment_intent_id: pi,
      p_stripe_event_id: event.id,
    });

    if (error) {
      console.error("complete_order_from_stripe:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
