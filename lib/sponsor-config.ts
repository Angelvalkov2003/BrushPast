export type SponsorTierId =
  | "supporter"
  | "creative_ally"
  | "project_backer"
  | "visionary"
  | "custom";

export type SponsorTier = {
  id: Exclude<SponsorTierId, "custom">;
  amountGbp: number;
  plus?: boolean;
  name: string;
  description: string;
  icon: "heart" | "spray" | "people" | "star";
};

export const SPONSOR_TIERS: SponsorTier[] = [
  {
    id: "supporter",
    amountGbp: 20,
    name: "Workshop Supporter",
    description: "Helps fund creative materials for a participant.",
    icon: "heart",
  },
  {
    id: "creative_ally",
    amountGbp: 50,
    name: "Creative Ally",
    description: "Helps fund mentoring and creative activity.",
    icon: "spray",
  },
  {
    id: "project_backer",
    amountGbp: 100,
    name: "Project Backer",
    description:
      "Helps fund workshops and opportunities to share the work.",
    icon: "people",
  },
  {
    id: "visionary",
    amountGbp: 500,
    name: "Programme Supporter",
    description: "Helps sustain and develop our charitable programmes.",
    icon: "star",
  },
];

export const SPONSOR_CUSTOM_CARD = {
  name: "Your amount",
  description: "Enter what feels right to support the Foundation.",
} as const;

export const SPONSOR_MIN_GBP = 1;
export const SPONSOR_MAX_GBP = 25000;

export function formatSponsorAmount(amountGbp: number, plus = false): string {
  const formatted = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: amountGbp % 1 === 0 ? 0 : 2,
  }).format(amountGbp);
  return plus ? `${formatted}+` : formatted;
}

export function resolveSponsorTier(amountGbp: number): SponsorTierId {
  const match = SPONSOR_TIERS.find(
    (tier) => !tier.plus && tier.amountGbp === amountGbp,
  );
  if (match) return match.id;
  const visionary = SPONSOR_TIERS.find((tier) => tier.id === "visionary");
  if (visionary && amountGbp >= visionary.amountGbp) return "visionary";
  return "custom";
}

export function sponsorTierLabel(tier: SponsorTierId): string {
  if (tier === "custom") return "Custom";
  return SPONSOR_TIERS.find((item) => item.id === tier)?.name ?? tier;
}

export function parseSponsorAmount(raw: string): number | null {
  const cleaned = raw.replace(/[£,\s]/g, "").trim();
  if (!cleaned) return null;
  const value = Number(cleaned);
  if (!Number.isFinite(value)) return null;
  return Math.round(value * 100) / 100;
}

export function validateSponsorAmount(
  amountGbp: number,
): { ok: true } | { ok: false; error: string } {
  if (!Number.isFinite(amountGbp) || amountGbp < SPONSOR_MIN_GBP) {
    return {
      ok: false,
      error: `Enter at least ${formatSponsorAmount(SPONSOR_MIN_GBP)}.`,
    };
  }
  if (amountGbp > SPONSOR_MAX_GBP) {
    return {
      ok: false,
      error: `The maximum sponsorship is ${formatSponsorAmount(SPONSOR_MAX_GBP)}.`,
    };
  }
  return { ok: true };
}
