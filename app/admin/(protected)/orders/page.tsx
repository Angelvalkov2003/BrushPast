import Link from "next/link";
import { getAllOrdersAdmin } from "lib/supabase/admin-orders";
import { formatPrice } from "lib/currency";
import { AdminTableShell } from "components/admin/admin-table-shell";
import { adminPageTitleClass } from "components/admin/admin-form-styles";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await getAllOrdersAdmin();

  return (
    <div>
      <h1 className={adminPageTitleClass}>Orders</h1>
      <AdminTableShell>
        <table className="admin-data-table min-w-full">
          <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th>Order #</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-500">
                  No orders yet.
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o.id}>
                  <td className="font-mono">{o.order_number}</td>
                  <td>
                    <div className="font-medium">
                      {[o.first_name, o.last_name].filter(Boolean).join(" ") || "-"}
                    </div>
                    <div className="text-xs text-gray-500">{o.email}</div>
                  </td>
                  <td>
                    {o.grand_total != null ? formatPrice(Number(o.grand_total)) : "-"}
                  </td>
                  <td>
                    <span className="text-xs">{o.payment_method}</span>
                    <br />
                    <span className="text-xs text-gray-500">{o.payment_status}</span>
                  </td>
                  <td>
                    <span className="rounded bg-gray-100 px-2 py-1 text-xs">{o.order_status}</span>
                  </td>
                  <td className="text-gray-500">
                    {new Date(o.created_at).toLocaleString("en-GB")}
                  </td>
                  <td>
                    <Link href={`/admin/orders/${o.id}`} className="text-indigo-600 hover:underline">
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </AdminTableShell>
    </div>
  );
}
