"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { AdminOrderDetail, OrderStatus, PaymentStatus } from "lib/types/admin";
import {
  ADMIN_PAYMENT_STATUS_OPTIONS,
  paymentStatusLabel,
} from "lib/payment-status";
import { updateOrderAdminAction } from "app/admin/(protected)/orders/[id]/actions";
import {
  adminButtonClass,
  adminGrid2Class,
  adminHelpClass,
  adminLabelClass,
  adminSelectClass,
  adminTextareaClass,
} from "./admin-form-styles";

const ORDER_STATUSES: OrderStatus[] = [
  "pending",
  "confirmed",
  "packed",
  "shipped",
  "delivered",
  "cancelled",
  "refunded",
];

export function AdminOrderEditForm({ order }: { order: AdminOrderDetail }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState<OrderStatus>(order.order_status);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(
    order.payment_status === "paid" ? "stripe_confirmed" : order.payment_status,
  );
  const [adminNote, setAdminNote] = useState(order.admin_note ?? "");

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await updateOrderAdminAction(order.id, {
      order_status: orderStatus,
      payment_status: paymentStatus,
      admin_note: adminNote,
    });
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Order updated");
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={save} className="space-y-5">
      <div className={adminGrid2Class}>
        <div>
          <label className={adminLabelClass}>Order status</label>
          <select
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value as OrderStatus)}
            className={adminSelectClass}
          >
            {ORDER_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={adminLabelClass}>Payment status</label>
          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value as PaymentStatus)}
            className={adminSelectClass}
          >
            {ADMIN_PAYMENT_STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {paymentStatusLabel(s)}
              </option>
            ))}
          </select>
          <p className={adminHelpClass}>
            Card: use Sync from Stripe for &quot;Stripe confirmed&quot;. Set
            &quot;Funds in account&quot; yourself once you see the money. Use
            Cancelled / Refunded when needed.
          </p>
        </div>
      </div>
      <div>
        <label className={adminLabelClass}>Admin note</label>
        <textarea
          value={adminNote}
          onChange={(e) => setAdminNote(e.target.value)}
          rows={5}
          className={adminTextareaClass}
        />
      </div>
      <button type="submit" disabled={loading} className={adminButtonClass}>
        {loading ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}
