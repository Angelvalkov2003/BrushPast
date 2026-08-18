import { getSponsorById } from "lib/supabase/sponsors";
import { formatSponsorAmount, sponsorTierLabel } from "lib/sponsor-config";
import {
  bpBodyClass,
  bpFontVariables,
  bpTitleClass,
  bpTitleUtility,
  bpWhisperUtility,
  homeHandClass,
} from "components/home/home-typography";
import { HomeCta, SectionEyebrow } from "components/home/home-decor";
import { TextureSection } from "components/shared/texture-section";
import Footer from "components/layout/footer";

export const metadata = {
  title: "Thank you — Sponsorship",
  description: "Thank you for becoming a Brush Past sponsor.",
};

export const dynamic = "force-dynamic";

export default async function SponsorSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ sponsorId?: string }>;
}) {
  const { sponsorId } = await searchParams;
  let sponsor = null;
  if (sponsorId) {
    try {
      sponsor = await getSponsorById(sponsorId);
    } catch {
      sponsor = null;
    }
  }

  return (
    <div
      className={`${bpFontVariables} bg-bp-canvas text-bp-text selection:bg-bp-accent-bg`}
    >
      <TextureSection
        texture="secondary"
        overlay="cream"
        className="px-4 py-20 md:px-10 md:py-28"
      >
        <div className="mx-auto max-w-xl text-center">
          <SectionEyebrow>Become a sponsor</SectionEyebrow>
          <h1
            className={`${bpTitleClass} ${bpTitleUtility} mt-2 text-[clamp(2.4rem,6vw,3.75rem)] font-bold leading-[0.95]`}
          >
            {sponsor?.payment_status === "pending"
              ? "We're confirming your gift."
              : "Thank you."}
          </h1>
          <p
            className={`${homeHandClass} ${bpWhisperUtility} mt-4 text-2xl text-bp-accent`}
          >
            You&apos;re special to this cause.
          </p>
          <p className={`${bpBodyClass} mt-4 text-bp-text/80`}>
            {sponsor?.payment_status === "pending"
              ? "Stripe is still confirming the payment. This usually takes a moment — then we'll be in touch personally."
              : sponsor
                ? `Your ${sponsorTierLabel(sponsor.tier)} sponsorship of ${formatSponsorAmount(Number(sponsor.amount_gbp))} helps fund workshops, artists and the next story. We'll be in touch personally — this gift deserves a conversation, not just a receipt.`
                : "We'll be in touch personally — this gift deserves a conversation, not just a receipt."}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <HomeCta href="/contact" variant="outline">
              Back to Get in Touch
            </HomeCta>
            <HomeCta href="/stories" variant="primary">
              Read the stories →
            </HomeCta>
          </div>
        </div>
      </TextureSection>
      <Footer />
    </div>
  );
}
