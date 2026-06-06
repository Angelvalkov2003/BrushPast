"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { VariantLabel } from "components/product/variant-picker";
import { useCart } from "components/cart/cart-context";
import Price from "components/price";
import { orderLineTitle } from "lib/product-variants";
import { createOrder } from "app/checkout/actions";
import LoadingDots from "components/loading-dots";
import { CONTACT_PHONE, SHIPPING_UK } from "lib/site-config";
import { UK_SHIPPING_SUMMARY, UK_VAT_NOTE } from "lib/uk-copy";

const inputClass =
  "w-full border border-bp-text/20 bg-bp-canvas px-4 py-2 text-bp-text focus:border-bp-accent focus:outline-none focus:ring-1 focus:ring-bp-accent";
const labelClass = "mb-1 block text-sm font-medium text-bp-text/80";
const radioCardClass =
  "flex cursor-pointer items-center border border-bp-text/15 p-4 transition-colors hover:border-bp-accent/40";

function ukShippingPrice(subtotal: number, method: "tracked48" | "dpd") {
  if (subtotal >= SHIPPING_UK.freeOver) return 0;
  return method === "dpd" ? SHIPPING_UK.dpd.price : SHIPPING_UK.tracked48.price;
}

export default function CheckoutPage() {
  const { cart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    customer_address: "",
    payment_method: "cash_on_delivery" as "cash_on_delivery" | "card",
    shipping_method: "tracked48" as "tracked48" | "dpd",
    comment: "",
    privacy_policy_accepted: false,
  });

  if (!cart || cart.items.length === 0) {
    return (
      <div className="bp-surface flex min-h-screen flex-col items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <h1 className="mb-4 text-3xl font-bold text-bp-text">Your bag is empty</h1>
          <p className="mb-8 text-lg text-bp-text/65">Add items before checkout.</p>
          <button
            onClick={() => router.push("/search")}
            className="bg-bp-accent px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-bp-canvas transition-opacity hover:opacity-90"
          >
            Browse the shop
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const nameParts = formData.customer_name.trim().split(/\s+/);
      const first_name = nameParts[0] || "";
      const last_name = nameParts.slice(1).join(" ") || first_name;
      const shipping_total = ukShippingPrice(cart.subtotal, formData.shipping_method);
      const grand_total = cart.subtotal + shipping_total;
      const shippingLabel =
        formData.shipping_method === "dpd"
          ? SHIPPING_UK.dpd.label
          : SHIPPING_UK.tracked48.label;

      const order = await createOrder({
        first_name,
        last_name,
        email: formData.customer_email,
        phone: formData.customer_phone || undefined,
        address_line_1: formData.customer_address,
        country: "GB",
        shipping_method_name: shippingLabel,
        shipping_price: shipping_total,
        courier_name: formData.shipping_method === "dpd" ? "DPD" : "Royal Mail",
        payment_method: formData.payment_method,
        customer_note: formData.comment || undefined,
        items: cart.items.map((item) => ({
          product_id: item.productId,
          variant_id: item.variantId !== item.productId ? item.variantId : undefined,
          product_title: orderLineTitle(item.product.title, {
            id: item.variant.id,
            title: item.variant.title,
            price: item.price,
            available: true,
            sku: item.variant.sku,
            selectedOptions: item.variant.selectedOptions,
          }),
          quantity: item.quantity,
          unit_price: item.price,
          sku: item.variant.sku,
        })),
        subtotal: cart.subtotal,
        shipping_total,
        grand_total,
      });

      // If card payment, redirect to Stripe
      if (formData.payment_method === "card") {
        // Redirect to Stripe checkout
        const response = await fetch("/api/checkout/create-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: order.id,
            cart,
            shippingTotal: shipping_total,
          }),
        });

        if (!response.ok) {
          throw new Error("Could not start card payment.");
        }

        const { url } = await response.json();
        if (url) {
          window.location.href = url;
          return;
        }
      } else {
        // Cash on delivery - redirect to success page
        router.push(`/checkout/success?orderId=${order.id}`);
      }
    } catch (err: any) {
      setError(err.message || "Could not place your order.");
      setIsSubmitting(false);
    }
  };

  const shippingCost = ukShippingPrice(cart.subtotal, formData.shipping_method);
  const orderTotal = cart.subtotal + shippingCost;

  return (
    <div className="bp-surface min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-bp-text">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="rounded-lg border border-bp-text/10 bg-bp-canvas p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold text-bp-text">UK delivery details</h2>

              {error && (
                <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 rounded">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="customer_name" className={labelClass}>
                    Full name *
                  </label>
                  <input
                    type="text"
                    id="customer_name"
                    required
                    value={formData.customer_name}
                    onChange={(e) =>
                      setFormData({ ...formData, customer_name: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="customer_email" className={labelClass}>
                    Email *
                  </label>
                  <input
                    type="email"
                    id="customer_email"
                    required
                    value={formData.customer_email}
                    onChange={(e) =>
                      setFormData({ ...formData, customer_email: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="customer_phone" className={labelClass}>
                    Phone (UK)
                  </label>
                  <input
                    type="tel"
                    id="customer_phone"
                    placeholder={CONTACT_PHONE}
                    value={formData.customer_phone}
                    onChange={(e) =>
                      setFormData({ ...formData, customer_phone: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="customer_address" className={labelClass}>
                    UK delivery address *
                  </label>
                  <textarea
                    id="customer_address"
                    required
                    rows={3}
                    value={formData.customer_address}
                    onChange={(e) =>
                      setFormData({ ...formData, customer_address: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="comment" className={labelClass}>
                    Order notes (optional)
                  </label>
                  <textarea
                    id="comment"
                    rows={3}
                    value={formData.comment}
                    onChange={(e) =>
                      setFormData({ ...formData, comment: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={`${labelClass} mb-3`}>UK delivery *</label>
                  <div className="mb-4 space-y-2">
                    <label className={radioCardClass}>
                      <input
                        type="radio"
                        name="shipping_method"
                        value="tracked48"
                        checked={formData.shipping_method === "tracked48"}
                        onChange={() =>
                          setFormData({ ...formData, shipping_method: "tracked48" })
                        }
                        className="mr-3 accent-bp-accent"
                      />
                      <span className="text-sm">
                        {SHIPPING_UK.tracked48.label} — £{SHIPPING_UK.tracked48.price.toFixed(2)}
                        {cart.subtotal >= SHIPPING_UK.freeOver ? " (free over £40)" : ""}
                      </span>
                    </label>
                    <label className={radioCardClass}>
                      <input
                        type="radio"
                        name="shipping_method"
                        value="dpd"
                        checked={formData.shipping_method === "dpd"}
                        onChange={() => setFormData({ ...formData, shipping_method: "dpd" })}
                        className="mr-3 accent-bp-accent"
                      />
                      <span className="text-sm">
                        {SHIPPING_UK.dpd.label} — £{SHIPPING_UK.dpd.price.toFixed(2)}
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className={`${labelClass} mb-3`}>Payment method *</label>
                  <div className="space-y-2">
                    <label className={radioCardClass}>
                      <input
                        type="radio"
                        name="payment_method"
                        value="cash_on_delivery"
                        checked={formData.payment_method === "cash_on_delivery"}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            payment_method: e.target.value as "cash_on_delivery" | "card",
                          })
                        }
                        className="mr-3 accent-bp-accent"
                      />
                      <div>
                        <div className="font-medium text-bp-text">Pay on delivery</div>
                        <div className="text-sm text-bp-text/60">
                          Pay when your order arrives (UK)
                        </div>
                      </div>
                    </label>

                    <label className={radioCardClass}>
                      <input
                        type="radio"
                        name="payment_method"
                        value="card"
                        checked={formData.payment_method === "card"}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            payment_method: e.target.value as "cash_on_delivery" | "card",
                          })
                        }
                        className="mr-3 accent-bp-accent"
                      />
                      <div>
                        <div className="font-medium text-bp-text">Card payment</div>
                        <div className="text-sm text-bp-text/60">
                          Secure checkout via Stripe (GBP)
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="pt-4">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.privacy_policy_accepted}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          privacy_policy_accepted: e.target.checked,
                        })
                      }
                      className="mt-1 h-4 w-4 rounded border-bp-text/25 accent-bp-accent"
                    />
                    <span className="text-sm text-bp-text/80">
                      I agree to the{" "}
                      <a
                        href="/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-bp-accent underline hover:opacity-80"
                      >
                        Privacy Policy
                      </a>{" "}
                      for processing my data for this order. *
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !formData.privacy_policy_accepted}
                  className="flex w-full items-center justify-center rounded-lg bg-bp-accent py-3 px-6 font-medium text-bp-canvas transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <LoadingDots className="bg-white" />
                  ) : (
                    "Place order"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 rounded-lg border border-bp-text/10 bg-bp-canvas p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold text-bp-text">Order summary</h2>

              <div className="mb-6 space-y-4">
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between border-b border-bp-text/10 pb-3"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-bp-text">{item.product.title}</p>
                      <VariantLabel
                        variant={{
                          id: item.variant.id,
                          title: item.variant.title,
                          price: item.price,
                          available: true,
                          sku: item.variant.sku,
                          selectedOptions: item.variant.selectedOptions,
                        }}
                      />
                      <p className="text-sm text-bp-text/55">Qty: {item.quantity}</p>
                    </div>
                    <Price
                      amount={(item.price * item.quantity).toString()}
                      currencyCode={cart.currency}
                      className="text-sm font-medium"
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-bp-text/10 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-bp-text/65">Subtotal</span>
                  <Price
                    amount={cart.subtotal.toString()}
                    currencyCode={cart.currency}
                    className="font-medium text-bp-text"
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-bp-text/65">UK delivery</span>
                  <span className="text-right text-xs text-bp-text/55">See rates below</span>
                </div>
                <div className="flex justify-between pt-2 text-sm">
                  <span className="text-bp-text/65">Delivery</span>
                  <Price
                    amount={shippingCost.toString()}
                    currencyCode={cart.currency}
                    className="text-bp-text"
                  />
                </div>
                <div className="flex justify-between pt-2 text-lg font-bold">
                  <span className="text-bp-text">Total</span>
                  <Price
                    amount={orderTotal.toString()}
                    currencyCode={cart.currency}
                    className="text-bp-accent"
                  />
                </div>
                <div className="mt-4 border-t border-bp-text/10 pt-4">
                  <p className="text-center text-xs leading-snug text-bp-text/55">
                    {UK_SHIPPING_SUMMARY}
                  </p>
                  <p className="mt-2 text-center text-xs text-bp-text/55">{UK_VAT_NOTE}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
