import Link from "next/link";
import {
  completeSponsorFromStripe,
  getSponsorById,
} from "lib/supabase/sponsors";
import { getDonationsStripe, isDonationsStripeConfigured } from "lib/stripe-donations";
import { sendNewSponsorNotification } from "lib/email";
import { formatSponsorAmount, sponsorTierLabel } from "lib/sponsor-config";
import {
  bpBodyClass,
  bpFontVariables,
  PAGE_HERO_H1_MINIMAL_CLASS,
  bpWhisperUtility,
  homeHandClass,
} from "components/home/home-typography";
import { TextureSection } from "components/shared/texture-section";
import { HomeCta } from "components/home/home-decor";
import Footer from "components/layout/footer";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Thank you — Support Us",
};

/**
 * Without a donations webhook, confirm payment here when Stripe redirects back
 * with session_id (same pattern as needing only secret + publishable keys).
 */
async function confirmDonationFromSuccessPage(input: {
  sponsorId?: string;
  sessionId?: string;
}) {
  if (!input.sessionId || !isDonationsStripeConfigured()) return;

  try {
    const stripe = getDonationsStripe();
    const session = await stripe.checkout.sessions.retrieve(input.sessionId);
    if (session.payment_status !== "paid") return;
    if (session.metadata?.kind !== "sponsorship") return;

    const pi =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent?.id ?? null;

    const result = await completeSponsorFromStripe({
      eventId: `success_page_${session.id}`,
      sessionId: session.id,
      sponsorId: session.metadata?.sponsorId ?? input.sponsorId ?? null,
      paymentIntentId: pi,
      email: session.customer_details?.email ?? session.customer_email,
      name: session.customer_details?.name,
    });

    if (!result.alreadyProcessed && result.sponsor) {
      try {
        await sendNewSponsorNotification({
          sponsorId: result.sponsor.id,
          fullName: result.sponsor.full_name || "Donor",
          email: result.sponsor.email || "",
          amountGbp: Number(result.sponsor.amount_gbp),
          tierLabel: sponsorTierLabel(result.sponsor.tier as never),
        });
      } catch (emailError) {
        console.error("donation success email:", emailError);
      }
    }
  } catch (error) {
    console.error("donation success confirm:", error);
  }
}

export default async function SponsorSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ sponsorId?: string; session_id?: string }>;
}) {
  const { sponsorId, session_id: sessionId } = await searchParams;

  await confirmDonationFromSuccessPage({ sponsorId, sessionId });

  const sponsor = sponsorId ? await getSponsorById(sponsorId) : null;

  return (
    <div
      className={`${bpFontVariables} max-w-full overflow-x-clip bg-bp-canvas text-bp-text`}
    >
      <TextureSection
        texture="secondary"
        overlay="cream"
        className="px-4 py-20 md:px-10 md:py-28"
      >
        <div className="mx-auto max-w-xl text-center">
          <p
            className={`${homeHandClass} ${bpWhisperUtility} text-2xl text-bp-accent`}
          >
            You&apos;re special to this cause.
          </p>
          <h1 className={`${PAGE_HERO_H1_MINIMAL_CLASS} mt-3 uppercase`}>
            Thank you.
          </h1>
          {sponsor ? (
            <p className={`${bpBodyClass} mt-6 text-bp-text/75`}>
              Your donation of{" "}
              <strong>{formatSponsorAmount(Number(sponsor.amount_gbp))}</strong>
              {sponsor.tier ? (
                <> ({sponsorTierLabel(sponsor.tier as never)})</>
              ) : null}{" "}
              helps creativity reach further.
            </p>
          ) : (
            <p className={`${bpBodyClass} mt-6 text-bp-text/75`}>
              Your donation helps creativity reach further. We&apos;ll be in
              touch soon.
            </p>
          )}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <HomeCta href="/sponsor" variant="primary">
              Back to Support Us
            </HomeCta>
            <HomeCta href="/" variant="outline">
              Home
            </HomeCta>
          </div>
          <p className={`${bpBodyClass} mt-8 text-sm text-bp-text/50`}>
            <Link href="/shop" className="underline hover:text-bp-accent">
              Visit the Archive Shop
            </Link>
          </p>
        </div>
      </TextureSection>
      <Footer />
    </div>
  );
}
