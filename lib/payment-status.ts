export type PaymentStatus =
  | "pending"
  | "paid"
  | "stripe_confirmed"
  | "received"
  | "failed"
  | "cancelled"
  | "refunded";

/** Statuses that mean money is (or was) collected — count toward revenue / inventory. */
export const MONEY_COLLECTED_PAYMENT_STATUSES: readonly PaymentStatus[] = [
  "paid",
  "stripe_confirmed",
  "received",
] as const;

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  pending: "Pending",
  paid: "Paid (legacy)",
  stripe_confirmed: "Stripe confirmed",
  received: "Funds in account",
  failed: "Failed",
  cancelled: "Cancelled",
  refunded: "Refunded",
};

/** Options shown in admin edit form (exclude legacy `paid`). */
export const ADMIN_PAYMENT_STATUS_OPTIONS: PaymentStatus[] = [
  "pending",
  "stripe_confirmed",
  "received",
  "failed",
  "cancelled",
  "refunded",
];

export function paymentStatusLabel(status: string | null | undefined): string {
  if (!status) return "—";
  return PAYMENT_STATUS_LABELS[status as PaymentStatus] ?? status;
}

export function isMoneyCollectedPaymentStatus(
  status: string | null | undefined,
): boolean {
  return MONEY_COLLECTED_PAYMENT_STATUSES.includes(status as PaymentStatus);
}

export function paymentStatusBadgeClass(status: string): string {
  switch (status) {
    case "stripe_confirmed":
      return "bg-sky-100 text-sky-800";
    case "received":
    case "paid":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-amber-100 text-amber-800";
    case "failed":
    case "cancelled":
    case "refunded":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-700";
  }
}
