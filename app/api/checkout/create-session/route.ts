import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession } from "lib/stripe";
import { setOrderStripeSession } from "lib/supabase/checkout-orders";
import { toStripeMinorUnits } from "lib/currency";
import { baseUrl } from "lib/utils";

export async function POST(request: NextRequest) {
  try {
    const { orderId, cart, shippingTotal, contributionGbp, contributionLabel } =
      await request.json();
    if (!orderId || !cart?.items?.length) {
      return NextResponse.json({ error: "Invalid checkout data" }, { status: 400 });
    }

    const session = await createCheckoutSession(
      cart,
      `${baseUrl}/checkout/success?orderId=${orderId}`,
      `${baseUrl}/checkout/cancel`,
      orderId,
      toStripeMinorUnits(Number(shippingTotal ?? 0)),
      Number(contributionGbp ?? 0),
      typeof contributionLabel === "string" ? contributionLabel : undefined,
    );

    if (!session.url) {
      return NextResponse.json({ error: "No checkout URL" }, { status: 500 });
    }

    await setOrderStripeSession(orderId, session.id);
    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    console.error("create-session:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Checkout failed" },
      { status: 500 },
    );
  }
}
