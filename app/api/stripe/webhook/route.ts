import { NextRequest, NextResponse } from "next/server";
import { stripe } from "lib/stripe";
import { getSupabaseServiceClient } from "lib/supabase/service";
import { completeSponsorFromStripe } from "lib/supabase/sponsors";
import { sendNewSponsorNotification } from "lib/email";
import { sponsorTierLabel } from "lib/sponsor-config";
import type Stripe from "stripe";

async function completeShopOrder(
  session: Stripe.Checkout.Session,
  eventId: string,
) {
  const sessionId = session.id;
  const pi =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id ?? null;

  const supabase = getSupabaseServiceClient();
  const { error } = await supabase.rpc("complete_order_from_stripe", {
    p_stripe_checkout_session_id: sessionId,
    p_stripe_payment_intent_id: pi,
    p_stripe_event_id: eventId,
  });

  if (error) {
    console.error("complete_order_from_stripe:", error);
    throw new Error(error.message);
  }
}

async function completeSponsorship(
  session: Stripe.Checkout.Session,
  eventId: string,
) {
  const pi =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id ?? null;

  if (session.payment_status && session.payment_status !== "paid") {
    throw new Error(
      `Sponsorship session ${session.id} is not paid (${session.payment_status}).`,
    );
  }

  const result = await completeSponsorFromStripe({
    eventId,
    sessionId: session.id,
    sponsorId: session.metadata?.sponsorId ?? null,
    paymentIntentId: pi,
    email: session.customer_details?.email ?? session.customer_email,
    name: session.customer_details?.name,
  });

  if (result.alreadyProcessed || !result.sponsor) return;

  try {
    await sendNewSponsorNotification({
      sponsorId: result.sponsor.id,
      fullName: result.sponsor.full_name || "Sponsor",
      email: result.sponsor.email || "",
      amountGbp: Number(result.sponsor.amount_gbp),
      tierLabel: sponsorTierLabel(result.sponsor.tier),
    });
  } catch (emailError) {
    console.error("sponsor email:", emailError);
  }
}

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
    try {
      if (session.metadata?.kind === "sponsorship") {
        await completeSponsorship(session, event.id);
      } else {
        await completeShopOrder(session, event.id);
      }
    } catch (error: unknown) {
      console.error("stripe webhook handler:", error);
      return NextResponse.json(
        { error: error instanceof Error ? error.message : "Webhook failed" },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ received: true });
}
