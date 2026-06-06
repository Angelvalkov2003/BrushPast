import Link from "next/link";
import { getAllOrdersAdmin, getAdminDashboardStats } from "lib/supabase/admin-orders";
import { formatPrice } from "lib/currency";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [stats, orders] = await Promise.all([getAdminDashboardStats(), getAllOrdersAdmin()]);
  const recent = orders.slice(0, 10);

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Dashboard</h1>
      <p className="mb-8 text-gray-600">Brush Past admin</p>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm text-gray-500">Total orders</h3>
          <p className="mt-2 text-3xl font-bold">{stats.totalOrders}</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm text-gray-500">Pending payment</h3>
          <p className="mt-2 text-3xl font-bold text-amber-600">{stats.pendingPayment}</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm text-gray-500">Revenue (last 7 days)</h3>
          <p className="mt-2 text-3xl font-bold text-green-700">{formatPrice(stats.weekRevenue)}</p>
          <p className="mt-1 text-sm text-gray-500">(excl. shipping)</p>
        </div>
      </div>

      <div className="rounded-lg bg-white shadow">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Recent orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Order #</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {recent.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    No orders yet.
                  </td>
                </tr>
              ) : (
                recent.map((o) => (
                  <tr key={o.id}>
                    <td className="px-4 py-3 font-mono">{o.order_number}</td>
                    <td className="px-4 py-3">
                      {[o.first_name, o.last_name].filter(Boolean).join(" ")}
                      <br />
                      <span className="text-xs text-gray-500">{o.email}</span>
                    </td>
                    <td className="px-4 py-3">
                      {o.grand_total != null ? formatPrice(Number(o.grand_total)) : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded bg-gray-100 px-2 py-1 text-xs">{o.order_status}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(o.created_at).toLocaleDateString("en-GB")}
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
    </div>
  );
}
