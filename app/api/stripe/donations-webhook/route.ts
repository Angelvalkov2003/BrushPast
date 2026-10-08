import { NextRequest, NextResponse } from "next/server";
import { getDonationsStripe } from "lib/stripe-donations";
import { completeSponsorFromStripe } from "lib/supabase/sponsors";
import { sendNewSponsorNotification } from "lib/email";
import { sponsorTierLabel } from "lib/sponsor-config";
import type Stripe from "stripe";

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
      `Donation session ${session.id} is not paid (${session.payment_status}).`,
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
      fullName: result.sponsor.full_name || "Donor",
      email: result.sponsor.email || "",
      amountGbp: Number(result.sponsor.amount_gbp),
      tierLabel: sponsorTierLabel(result.sponsor.tier),
    });
  } catch (emailError) {
    console.error("donation email:", emailError);
  }
}

/**
 * Webhook for the charity Stripe account only.
 * Point this endpoint at the Foundation account (not the shop account).
 * URL: /api/stripe/donations-webhook
 */
export async function POST(request: NextRequest) {
  const secret = process.env.STRIPE_DONATIONS_WEBHOOK_SECRET?.trim();
  if (!secret) {
    return NextResponse.json(
      { error: "Donations webhook not configured" },
      { status: 500 },
    );
  }

  let stripe: Stripe;
  try {
    stripe = getDonationsStripe();
  } catch {
    return NextResponse.json(
      { error: "Donations Stripe not configured" },
      { status: 500 },
    );
  }

  const body = await request.text();
  const sig = request.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err: unknown) {
    console.error("Donations webhook signature:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    try {
      if (session.metadata?.kind === "sponsorship") {
        await completeSponsorship(session, event.id);
      }
    } catch (error: unknown) {
      console.error("donations webhook handler:", error);
      return NextResponse.json(
        { error: error instanceof Error ? error.message : "Webhook failed" },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ received: true });
}
