/** Optional checkout contribution — MAKE YOUR GIFT GO FURTHER */

export type ContributionAllocationId =
  | "support_creator"
  | "fund_workshop"
  | "where_needed";

export const CONTRIBUTION_PRESETS_GBP = [5, 10, 20] as const;

export const CONTRIBUTION_COPY = {
  heading: "Make your gift go further",
  body: "Your purchase already creates impact. Add an optional contribution to help fund the next chapter.",
  thankYouTitle: "Thank you. This gift gave a little more.",
  thankYouBody:
    "Alongside your gift, an additional contribution was made to help create the next chapter.",
  stripeName: "Additional contribution",
} as const;

export const CONTRIBUTION_ALLOCATIONS: {
  id: ContributionAllocationId;
  label: string;
}[] = [
  { id: "support_creator", label: "Support the Creator" },
  { id: "fund_workshop", label: "Fund the Next Workshop" },
  { id: "where_needed", label: "Where It’s Needed Most" },
];

export const CONTRIBUTION_MIN_GBP = 1;
export const CONTRIBUTION_MAX_GBP = 25000;

export function parseContributionAmount(raw: string): number | null {
  const cleaned = raw.replace(/[£,\s]/g, "").trim();
  if (!cleaned) return null;
  const value = Number(cleaned);
  if (!Number.isFinite(value)) return null;
  return Math.round(value * 100) / 100;
}

export function validateContributionAmount(
  amountGbp: number,
): { ok: true } | { ok: false; error: string } {
  if (!Number.isFinite(amountGbp) || amountGbp < CONTRIBUTION_MIN_GBP) {
    return { ok: false, error: `Enter at least £${CONTRIBUTION_MIN_GBP}.` };
  }
  if (amountGbp > CONTRIBUTION_MAX_GBP) {
    return {
      ok: false,
      error: `The maximum contribution is £${CONTRIBUTION_MAX_GBP.toLocaleString("en-GB")}.`,
    };
  }
  return { ok: true };
}

export function contributionAllocationLabel(
  id: ContributionAllocationId | string | null | undefined,
): string | null {
  if (!id) return null;
  return (
    CONTRIBUTION_ALLOCATIONS.find((item) => item.id === id)?.label ?? null
  );
}

export function isContributionAllocationId(
  value: string,
): value is ContributionAllocationId {
  return CONTRIBUTION_ALLOCATIONS.some((item) => item.id === value);
}
