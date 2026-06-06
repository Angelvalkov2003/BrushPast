import Link from "next/link";
import { getCheckoutOrderById } from "lib/supabase/checkout-orders";
import { sendNewOrderNotification } from "lib/email";
import { ClearCartOnSuccess } from "components/cart/clear-cart-on-success";
import { formatPrice } from "lib/currency";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;
  let order: Awaited<ReturnType<typeof getCheckoutOrderById>> | null = null;

  if (orderId) {
    try {
      order = await getCheckoutOrderById(orderId);
      await sendNewOrderNotification({
        orderId: order.id,
        customerName: [order.first_name, order.last_name].filter(Boolean).join(" "),
        customerEmail: order.email || "",
        customerPhone: order.phone || undefined,
        customerAddress: order.address_line_1 || "",
        totalPrice: Number(order.grand_total ?? 0),
        paymentMethod: order.payment_method as "cash_on_delivery" | "card",
        products: (order.items || []).map((i: { product_title: string | null; unit_price: number | null; quantity: number }) => ({
          id: "",
          name: i.product_title || "Item",
          price: Number(i.unit_price ?? 0),
          quantity: i.quantity,
        })),
        comment: order.customer_note || undefined,
      });
    } catch (e) {
      console.error("success page:", e);
    }
  }

  return (
    <>
      <ClearCartOnSuccess />
      <div className="bp-surface flex min-h-screen flex-col items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <h1 className="mb-4 text-3xl font-bold text-bp-text">Order received</h1>
          {order && (
            <div className="mb-6 border border-bp-text/10 bg-bp-canvas p-4 text-left text-sm text-bp-text/70">
              <p>
                <strong className="text-bp-text">Order:</strong> {order.order_number}
              </p>
              <p>
                <strong className="text-bp-text">Total:</strong>{" "}
                {formatPrice(Number(order.grand_total ?? 0))}
              </p>
              <p>
                <strong className="text-bp-text">Payment:</strong>{" "}
                {order.payment_method === "cash_on_delivery" ? "Pay on delivery" : "Card"}
              </p>
            </div>
          )}
          <p className="mb-8 text-lg text-bp-text/65">Thank you. We will email you shortly.</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="bg-bp-accent px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-bp-canvas transition-opacity hover:opacity-90"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="border border-bp-text/20 px-6 py-3 text-bp-text transition-colors hover:border-bp-accent"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
