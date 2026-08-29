import { redirect } from "next/navigation";

/** Legacy success URL — Stripe may still hit this until sessions expire. */
export default async function LegacySponsorSuccessRedirect({
  searchParams,
}: {
  searchParams: Promise<{ sponsorId?: string }>;
}) {
  const { sponsorId } = await searchParams;
  redirect(
    sponsorId
      ? `/sponsor/success?sponsorId=${encodeURIComponent(sponsorId)}`
      : "/sponsor/success",
  );
}
