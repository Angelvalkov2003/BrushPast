import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrderByIdAdmin } from "lib/supabase/admin-orders";
import { formatPrice } from "lib/currency";
import { AdminOrderEditForm } from "components/admin/admin-order-edit-form";
import { adminPanelClass, adminPageTitleClass } from "components/admin/admin-form-styles";

export const dynamic = "force-dynamic";

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await getOrderByIdAdmin(id);
  if (!order) notFound();

  const address = [
    order.address_line_1,
    order.address_line_2,
    order.city,
    order.county,
    order.postcode,
    order.country,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="w-full">
      <Link href="/admin/orders" className="text-sm text-indigo-600 hover:underline">
        ← Back to orders
      </Link>
      <h1 className={`mt-4 ${adminPageTitleClass}`}>Order {order.order_number}</h1>

      <div className={`mb-8 ${adminPanelClass}`}>
        <h2 className="mb-4 text-lg font-semibold">Update order</h2>
        <AdminOrderEditForm order={order} />
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <div className={adminPanelClass}>
          <h2 className="mb-4 text-lg font-semibold">Customer</h2>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="text-gray-500">Name</dt>
              <dd>{[order.first_name, order.last_name].filter(Boolean).join(" ") || "—"}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Email</dt>
              <dd>
                {order.email ? (
                  <a href={`mailto:${order.email}`} className="text-indigo-600">
                    {order.email}
                  </a>
                ) : (
                  "—"
                )}
              </dd>
            </div>
            <div>
              <dt className="text-gray-500">Phone</dt>
              <dd>{order.phone || "—"}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Address</dt>
              <dd className="whitespace-pre-line">{address || "—"}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Payment</dt>
              <dd>
                {order.payment_method} — {order.payment_status}
              </dd>
            </div>
          </dl>
        </div>

        <div className={adminPanelClass}>
          <h2 className="mb-4 text-lg font-semibold">Totals</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500">Subtotal</dt>
              <dd>{order.subtotal != null ? formatPrice(Number(order.subtotal)) : "—"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Shipping</dt>
              <dd>
                {order.shipping_total != null ? formatPrice(Number(order.shipping_total)) : "—"}
                {order.shipping_method_name ? ` (${order.shipping_method_name})` : ""}
              </dd>
            </div>
            <div className="flex justify-between border-t pt-2 font-semibold">
              <dt>Grand total</dt>
              <dd>{order.grand_total != null ? formatPrice(Number(order.grand_total)) : "—"}</dd>
            </div>
          </dl>
          {order.customer_note ? (
            <div className="mt-4">
              <p className="text-sm text-gray-500">Customer note</p>
              <p className="text-sm whitespace-pre-line">{order.customer_note}</p>
            </div>
          ) : null}
        </div>
      </div>

      <div className={adminPanelClass}>
        <h2 className="mb-4 text-lg font-semibold">Line items</h2>
        {order.items.length === 0 ? (
          <p className="text-gray-500 text-sm">No line items.</p>
        ) : (
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="pb-2">Product</th>
                <th className="pb-2">SKU</th>
                <th className="pb-2">Qty</th>
                <th className="pb-2">Unit</th>
                <th className="pb-2">Line total</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {order.items.map((item) => (
                <tr key={item.id}>
                  <td className="py-2">{item.product_title}</td>
                  <td className="py-2 text-gray-500">{item.sku || "—"}</td>
                  <td className="py-2">{item.quantity}</td>
                  <td className="py-2">
                    {item.unit_price != null ? formatPrice(Number(item.unit_price)) : "—"}
                  </td>
                  <td className="py-2">
                    {item.line_total != null ? formatPrice(Number(item.line_total)) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
