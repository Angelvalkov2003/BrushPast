import Link from "next/link";
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
import { TextureSection } from "components/shared/texture-section";
import { HomeCta } from "components/home/home-decor";
import Footer from "components/layout/footer";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Thank you — Sponsor",
};

export default async function SponsorSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ sponsorId?: string }>;
}) {
  const { sponsorId } = await searchParams;
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
          <h1
            className={`${bpTitleClass} ${bpTitleUtility} mt-3 text-[clamp(2.5rem,6vw,4rem)] font-bold uppercase leading-[0.95] text-bp-text`}
          >
            Thank you.
          </h1>
          {sponsor ? (
            <>
              <p className={`${bpBodyClass} mt-6 text-bp-text/75`}>
                Your sponsorship of{" "}
                <strong>{formatSponsorAmount(Number(sponsor.amount_gbp))}</strong>
                {sponsor.tier ? (
                  <>
                    {" "}
                    ({sponsorTierLabel(sponsor.tier as never)})
                  </>
                ) : null}{" "}
                helps creativity reach further.
              </p>
            </>
          ) : (
            <p className={`${bpBodyClass} mt-6 text-bp-text/75`}>
              Your sponsorship helps creativity reach further. We&apos;ll be in
              touch soon.
            </p>
          )}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <HomeCta href="/sponsor" variant="primary">
              Back to Sponsor
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
