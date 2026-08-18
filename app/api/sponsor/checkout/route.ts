import { NextRequest, NextResponse } from "next/server";
import { baseUrl } from "lib/utils";
import {
  parseSponsorAmount,
  resolveSponsorTier,
  validateSponsorAmount,
} from "lib/sponsor-config";
import {
  createPendingSponsor,
  deletePendingSponsor,
  setSponsorStripeSession,
} from "lib/supabase/sponsors";
import { createSponsorCheckoutSession } from "lib/stripe-sponsors";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const fullName = String(body.full_name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const amount =
      typeof body.amount_gbp === "number"
        ? body.amount_gbp
        : parseSponsorAmount(String(body.amount_gbp ?? ""));

    if (!fullName) {
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    }
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please enter a valid email." },
        { status: 400 },
      );
    }
    if (body.privacy_policy_accepted !== true) {
      return NextResponse.json(
        { error: "Please accept the Privacy Policy to continue." },
        { status: 400 },
      );
    }
    if (amount == null) {
      return NextResponse.json(
        { error: "Choose a sponsorship amount." },
        { status: 400 },
      );
    }

    const valid = validateSponsorAmount(amount);
    if (!valid.ok) {
      return NextResponse.json({ error: valid.error }, { status: 400 });
    }

    const tier = resolveSponsorTier(amount);
    const sponsor = await createPendingSponsor({
      full_name: fullName,
      email,
      amount_gbp: amount,
      tier,
    });

    try {
      const session = await createSponsorCheckoutSession({
        sponsorId: sponsor.id,
        amountGbp: amount,
        tier,
        email,
        name: fullName,
        successUrl: `${baseUrl}/contact/sponsor/success?sponsorId=${sponsor.id}`,
        cancelUrl: `${baseUrl}/contact#become-a-sponsor`,
      });

      if (!session.url) {
        await deletePendingSponsor(sponsor.id);
        return NextResponse.json(
          { error: "Could not start Stripe checkout." },
          { status: 500 },
        );
      }

      await setSponsorStripeSession(sponsor.id, session.id);
      return NextResponse.json({ url: session.url });
    } catch (error) {
      await deletePendingSponsor(sponsor.id);
      throw error;
    }
  } catch (error: unknown) {
    console.error("sponsor checkout:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Could not start sponsorship",
      },
      { status: 500 },
    );
  }
}
