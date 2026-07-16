import Link from "next/link";
import {
  getAllOrdersAdmin,
  getAdminDashboardStats,
} from "lib/supabase/admin-orders";
import { formatPrice } from "lib/currency";
import { AdminTableShell } from "components/admin/admin-table-shell";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [stats, orders] = await Promise.all([
    getAdminDashboardStats(),
    getAllOrdersAdmin(),
  ]);
  const recent = orders.slice(0, 10);

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
        Dashboard
      </h1>
      <p className="mb-6 text-sm text-gray-600 sm:mb-8">Brush Past admin</p>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:mb-8 sm:gap-6 md:grid-cols-3">
        <div className="rounded-lg bg-white p-4 shadow sm:p-6">
          <h3 className="text-sm text-gray-500">Total orders</h3>
          <p className="mt-2 text-2xl font-bold sm:text-3xl">
            {stats.totalOrders}
          </p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow sm:p-6">
          <h3 className="text-sm text-gray-500">Pending payment</h3>
          <p className="mt-2 text-2xl font-bold text-amber-600 sm:text-3xl">
            {stats.pendingPayment}
          </p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow sm:p-6">
          <h3 className="text-sm text-gray-500">Revenue (last 7 days)</h3>
          <p className="mt-2 text-2xl font-bold text-green-700 sm:text-3xl">
            {formatPrice(stats.weekRevenue)}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            (excl. shipping, incl. pending orders)
          </p>
        </div>
      </div>

      <div className="rounded-lg bg-white shadow">
        <div className="border-b px-4 py-3 sm:px-6 sm:py-4">
          <h2 className="text-base font-semibold sm:text-lg">Recent orders</h2>
        </div>
        <AdminTableShell>
          <table className="admin-data-table min-w-full">
            <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
              <tr>
                <th>Order #</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {recent.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    No orders yet.
                  </td>
                </tr>
              ) : (
                recent.map((o) => (
                  <tr key={o.id}>
                    <td className="font-mono">{o.order_number}</td>
                    <td>
                      {[o.first_name, o.last_name].filter(Boolean).join(" ")}
                      <br />
                      <span className="text-xs text-gray-500">{o.email}</span>
                    </td>
                    <td>
                      {o.grand_total != null
                        ? formatPrice(Number(o.grand_total))
                        : "-"}
                    </td>
                    <td>
                      <span className="rounded bg-gray-100 px-2 py-1 text-xs">
                        {o.order_status}
                      </span>
                    </td>
                    <td className="text-gray-500">
                      {new Date(o.created_at).toLocaleDateString("en-GB")}
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
                ))
              )}
            </tbody>
          </table>
        </AdminTableShell>
      </div>
    </div>
  );
}
