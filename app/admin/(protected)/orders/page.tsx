import Link from "next/link";
import { getAllOrdersAdmin } from "lib/supabase/admin-orders";
import { formatPrice } from "lib/currency";
import {
  paymentStatusBadgeClass,
  paymentStatusLabel,
} from "lib/payment-status";
import { AdminTableShell } from "components/admin/admin-table-shell";
import {
  adminPageHeaderClass,
  adminPageTitleClass,
} from "components/admin/admin-form-styles";
import { SyncStripePaymentsButton } from "components/admin/sync-stripe-payments-button";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await getAllOrdersAdmin();

  return (
    <div>
      <div className={adminPageHeaderClass}>
        <h1 className={`${adminPageTitleClass} mb-0 sm:mb-0`}>Orders</h1>
        <SyncStripePaymentsButton />
      </div>

      <AdminTableShell>
        <table className="admin-data-table min-w-full">
          <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th>Order #</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Contribution</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-gray-500">
                  No orders yet.
                </td>
              </tr>
            ) : (
              orders.map((o) => {
                const tip =
                  o.optional_contribution_gbp != null
                    ? Number(o.optional_contribution_gbp)
                    : 0;
                return (
                  <tr key={o.id}>
                    <td className="font-mono">{o.order_number}</td>
                    <td>
                      <div className="font-medium">
                        {[o.first_name, o.last_name].filter(Boolean).join(" ") ||
                          "-"}
                      </div>
                      <div className="text-xs text-gray-500">{o.email}</div>
                    </td>
                    <td>
                      {o.grand_total != null
                        ? formatPrice(Number(o.grand_total))
                        : "-"}
                    </td>
                    <td>
                      {tip > 0 ? (
                        <span className="rounded bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-800">
                          {formatPrice(tip)}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>
                    <td>
                      <span className="text-xs text-gray-500">
                        {o.payment_method ?? "—"}
                      </span>
                      <br />
                      <span
                        className={`mt-1 inline-block rounded px-2 py-0.5 text-xs font-medium ${paymentStatusBadgeClass(o.payment_status)}`}
                      >
                        {paymentStatusLabel(o.payment_status)}
                      </span>
                    </td>
                    <td>
                      <span className="rounded bg-gray-100 px-2 py-1 text-xs">
                        {o.order_status}
                      </span>
                    </td>
                    <td className="text-gray-500">
                      {new Date(o.created_at).toLocaleString("en-GB")}
                    </td>
                    <td>
                      <Link
                        href={`/admin/orders/${o.id}`}
                        className="text-indigo-600 hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </AdminTableShell>
    </div>
  );
}
