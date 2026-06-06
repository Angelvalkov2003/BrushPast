import Link from "next/link";
import { getAllOrdersAdmin } from "lib/supabase/admin-orders";
import { formatPrice } from "lib/currency";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await getAllOrdersAdmin();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Orders</h1>
      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Order #</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                  No orders yet.
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o.id}>
                  <td className="px-4 py-3 font-mono">{o.order_number}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium">
                      {[o.first_name, o.last_name].filter(Boolean).join(" ") || "—"}
                    </div>
                    <div className="text-xs text-gray-500">{o.email}</div>
                  </td>
                  <td className="px-4 py-3">
                    {o.grand_total != null ? formatPrice(Number(o.grand_total)) : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs">{o.payment_method}</span>
                    <br />
                    <span className="text-xs text-gray-500">{o.payment_status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded bg-gray-100 px-2 py-1 text-xs">{o.order_status}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(o.created_at).toLocaleString("en-GB")}
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/orders/${o.id}`} className="text-indigo-600 hover:underline">
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
