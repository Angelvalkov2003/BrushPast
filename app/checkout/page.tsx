"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { VariantLabel } from "components/product/variant-picker";
import { useCart } from "components/cart/cart-context";
import Price from "components/price";
import { createOrder } from "app/checkout/actions";
import LoadingDots from "components/loading-dots";
import { SHIPPING_UK } from "lib/site-config";
import { UK_SHIPPING_SUMMARY, UK_RETURNS_SUMMARY, UK_VAT_NOTE } from "lib/uk-copy";
import { PrivacyPolicyCheckbox } from "components/legal/privacy-policy-checkbox";
import { CheckoutContribution } from "components/checkout/checkout-contribution";
import { UkDeliveryFields } from "components/checkout/uk-delivery-fields";
import {
  validateUkDeliveryFields,
  type UkDeliveryFormData,
} from "lib/uk-delivery";
import {
  bpBodyClass,
  bpBodySmClass,
  PAGE_HERO_H1_MINIMAL_CLASS,
  bpTitleClass,
  bpTitleUtility,
} from "components/home/home-typography";
import {
  boxComboIdToDb,
  categoryLabel,
} from "lib/shop-box-config";
import {
  boxStripeName,
  collectGiftMessages,
  flattenCartItemToOrderLines,
  isBoxCartItem,
  primaryBoxFromCart,
} from "lib/shop-box-cart";
import {
  CONTRIBUTION_COPY,
  contributionAllocationLabel,
  parseContributionAmount,
  validateContributionAmount,
  type ContributionAllocationId,
} from "lib/checkout-contribution";

const inputClass = `${bpBodyClass} w-full border border-bp-text/20 bg-bp-canvas px-4 py-2.5 text-bp-text focus:border-bp-accent focus:outline-none focus:ring-1 focus:ring-bp-accent/30`;
const labelClass = `${bpBodySmClass} mb-1 block font-medium text-bp-text/80`;
const radioCardClass =
  "flex cursor-pointer items-center border border-bp-text/15 p-4 transition-colors hover:border-bp-accent/40";

function ukShippingPrice() {
  return SHIPPING_UK.dpd.price;
}

export default function CheckoutPage() {
  const { cart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contributionPreset, setContributionPreset] = useState<number | null>(
    null,
  );
  const [contributionCustomRaw, setContributionCustomRaw] = useState("");
  const [allocation, setAllocation] = useState<ContributionAllocationId | "">(
    "",
  );
  const [formData, setFormData] = useState<{
    delivery: UkDeliveryFormData;
    payment_method: "cash_on_delivery" | "card";
    comment: string;
    privacy_policy_accepted: boolean;
  }>({
    delivery: {
      first_name: "",
      last_name: "",
      email: "",
      phone_kind: "mobile",
      phone: "",
      address_line_1: "",
      address_line_2: "",
      postcode: "",
      city: "",
      county: "",
    },
    payment_method: "card",
    comment: "",
    privacy_policy_accepted: false,
  });

  const contributionGbp = useMemo(() => {
    if (contributionCustomRaw.trim()) {
      return parseContributionAmount(contributionCustomRaw);
    }
    return contributionPreset;
  }, [contributionCustomRaw, contributionPreset]);

  if (!cart || cart.items.length === 0) {
    return (
      <div className="bp-surface flex min-h-screen flex-col items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <h1 className={`${PAGE_HERO_H1_MINIMAL_CLASS} mb-4`}>
            Your bag is empty
          </h1>
          <p className={`${bpBodyClass} mb-8 text-bp-text/65`}>
            Add items before checkout.
          </p>
          <button
            type="button"
            onClick={() => router.push("/shop")}
            className={`${bpTitleClass} ${bpTitleUtility} bg-bp-accent px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-bp-canvas transition-opacity hover:opacity-90`}
          >
            Browse the shop
          </button>
        </div>
      </div>
    );
  }

  const shippingCost = ukShippingPrice();
  const contributionAmount =
    contributionGbp != null && contributionGbp > 0 ? contributionGbp : 0;
  const orderTotal = cart.subtotal + shippingCost + contributionAmount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.privacy_policy_accepted) {
      setError("Please accept the Privacy Policy to continue.");
      return;
    }

    if (contributionCustomRaw.trim()) {
      const parsed = parseContributionAmount(contributionCustomRaw);
      if (parsed == null) {
        setError("Enter a valid contribution amount, or clear Other amount.");
        return;
      }
      const valid = validateContributionAmount(parsed);
      if (!valid.ok) {
        setError(valid.error);
        return;
      }
    }

    const deliveryResult = validateUkDeliveryFields(formData.delivery);
    if (!deliveryResult.ok) {
      setError(deliveryResult.error);
      return;
    }

    setIsSubmitting(true);

    try {
      const delivery = deliveryResult.values;
      const shipping_total = ukShippingPrice();
      const contribution =
        contributionGbp != null && contributionGbp > 0 ? contributionGbp : 0;
      const grand_total = cart.subtotal + shipping_total + contribution;

      const giftMessage = collectGiftMessages(cart.items);
      const primaryBox = primaryBoxFromCart(cart.items);
      const allocationLabel = contributionAllocationLabel(allocation);

      const order = await createOrder({
        delivery,
        first_name: delivery.first_name,
        last_name: delivery.last_name,
        email: delivery.email,
        phone: delivery.phone,
        address_line_1: delivery.address_line_1,
        address_line_2: delivery.address_line_2 || undefined,
        postcode: delivery.postcode,
        city: delivery.city,
        county: delivery.county || undefined,
        country: "GB",
        shipping_method_name: SHIPPING_UK.dpd.label,
        shipping_price: shipping_total,
        courier_name: "DPD",
        payment_method: formData.payment_method,
        customer_note: formData.comment || undefined,
        gift_message: giftMessage || undefined,
        box_type: primaryBox?.type,
        box_combo_id: boxComboIdToDb(primaryBox?.comboId),
        optional_contribution_gbp: contribution || undefined,
        contribution_allocation: allocation || undefined,
        privacy_policy_accepted: true,
        items: cart.items.flatMap((item) => flattenCartItemToOrderLines(item)),
        subtotal: cart.subtotal,
        shipping_total,
        grand_total,
      });

      if (formData.payment_method === "card") {
        const stripeContributionName = allocationLabel
          ? `${CONTRIBUTION_COPY.stripeName} — ${allocationLabel}`
          : CONTRIBUTION_COPY.stripeName;

        const response = await fetch("/api/checkout/create-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: order.id,
            cart,
            shippingTotal: shipping_total,
            contributionGbp: contribution,
            contributionLabel: stripeContributionName,
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
        router.push(`/checkout/success?orderId=${order.id}`);
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Could not place your order.",
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bp-surface min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className={`${PAGE_HERO_H1_MINIMAL_CLASS} mb-8 uppercase tracking-wide`}>
          Checkout
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="border border-bp-text/10 bg-bp-canvas p-6 shadow-[2px_3px_0_rgba(1,2,0,0.06)]"
            >
              <h2
                className={`${bpTitleClass} ${bpTitleUtility} mb-6 text-xl font-bold uppercase tracking-wide text-bp-text`}
              >
                UK delivery details
              </h2>

              {error ? (
                <div
                  className="mb-4 border border-red-400 bg-red-50 p-4 text-red-700"
                  role="alert"
                >
                  {error}
                </div>
              ) : null}

              <div className="space-y-4">
                <UkDeliveryFields
                  value={formData.delivery}
                  onChange={(delivery) =>
                    setFormData((current) => ({ ...current, delivery }))
                  }
                />

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
                  <label className={labelClass}>UK delivery *</label>
                  <p
                    className={`${bpBodySmClass} mt-2 border border-bp-text/15 p-4 text-bp-text/80`}
                  >
                    {SHIPPING_UK.dpd.label} — £{SHIPPING_UK.dpd.price.toFixed(2)}{" "}
                    ({SHIPPING_UK.dpd.days}). Shipping is paid by the customer.
                  </p>
                </div>

                <CheckoutContribution
                  presetGbp={contributionPreset}
                  customRaw={contributionCustomRaw}
                  allocation={allocation}
                  onPreset={setContributionPreset}
                  onCustomRaw={setContributionCustomRaw}
                  onAllocation={setAllocation}
                />

                <div>
                  <label className={`${labelClass} mb-3`}>Payment method *</label>
                  <div className="space-y-2">
                    <label className={radioCardClass}>
                      <input
                        type="radio"
                        name="payment_method"
                        value="card"
                        checked={formData.payment_method === "card"}
                        onChange={() =>
                          setFormData({ ...formData, payment_method: "card" })
                        }
                        className="mr-3 accent-bp-accent"
                      />
                      <div>
                        <div className={`${bpBodyClass} font-medium text-bp-text`}>
                          Card payment
                        </div>
                        <div className={`${bpBodySmClass} text-bp-text/60`}>
                          Secure checkout via Stripe (GBP)
                        </div>
                      </div>
                    </label>
                    <label className={radioCardClass}>
                      <input
                        type="radio"
                        name="payment_method"
                        value="cash_on_delivery"
                        checked={
                          formData.payment_method === "cash_on_delivery"
                        }
                        onChange={() =>
                          setFormData({
                            ...formData,
                            payment_method: "cash_on_delivery",
                          })
                        }
                        className="mr-3 accent-bp-accent"
                      />
                      <div>
                        <div className={`${bpBodyClass} font-medium text-bp-text`}>
                          Pay on delivery
                        </div>
                        <div className={`${bpBodySmClass} text-bp-text/60`}>
                          Pay when your order arrives (UK)
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="pt-4">
                  <PrivacyPolicyCheckbox
                    checked={formData.privacy_policy_accepted}
                    onChange={(checked) =>
                      setFormData({
                        ...formData,
                        privacy_policy_accepted: checked,
                      })
                    }
                    id="checkout-privacy"
                    suffix="for processing my data for this order"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !formData.privacy_policy_accepted}
                  className={`${bpTitleClass} ${bpTitleUtility} flex w-full items-center justify-center bg-bp-accent px-6 py-3.5 text-lg font-bold uppercase tracking-[0.08em] text-bp-canvas shadow-[3px_3px_0_rgba(1,2,0,0.2)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:hover:translate-x-0 disabled:hover:translate-y-0`}
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

          <div className="lg:col-span-1">
            <div className="sticky top-28 border border-bp-text/10 bg-bp-canvas p-6 shadow-[2px_3px_0_rgba(1,2,0,0.06)]">
              <h2
                className={`${bpTitleClass} ${bpTitleUtility} mb-4 text-xl font-bold uppercase tracking-wide text-bp-text`}
              >
                Order summary
              </h2>

              <div className="mb-6 space-y-4">
                {cart.items.map((item) => {
                  const box = isBoxCartItem(item);
                  return (
                    <div
                      key={item.id}
                      className="flex items-start justify-between border-b border-bp-text/10 pb-3"
                    >
                      <div className="min-w-0 flex-1 pr-3">
                        <p className={`${bpBodySmClass} font-medium text-bp-text`}>
                          {box ? boxStripeName(item) : item.product.title}
                        </p>
                        {box && item.box ? (
                          <ul className="mt-1 space-y-0.5 text-xs text-bp-text/55">
                            {item.box.contents.map((content) => (
                              <li key={content.id}>
                                {categoryLabel(content.categoryKey)}:{" "}
                                {content.title}
                                {content.variantLabel
                                  ? ` (${content.variantLabel})`
                                  : ""}
                              </li>
                            ))}
                          </ul>
                        ) : (
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
                        )}
                        {box ? null : (
                          <p className={`${bpBodySmClass} text-bp-text/55`}>
                            Qty: {item.quantity}
                          </p>
                        )}
                      </div>
                      <Price
                        amount={(item.price * item.quantity).toString()}
                        currencyCode={cart.currency}
                        className="text-sm font-medium"
                      />
                    </div>
                  );
                })}
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
                  <span className="text-bp-text/65">Delivery (DPD)</span>
                  <Price
                    amount={shippingCost.toString()}
                    currencyCode={cart.currency}
                    className="text-bp-text"
                  />
                </div>
                {contributionAmount > 0 ? (
                  <div className="flex justify-between text-sm">
                    <span className="text-bp-text/65">
                      Contribution
                      {allocation
                        ? ` · ${contributionAllocationLabel(allocation)}`
                        : ""}
                    </span>
                    <Price
                      amount={contributionAmount.toString()}
                      currencyCode={cart.currency}
                      className="text-bp-text"
                    />
                  </div>
                ) : null}
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
                  <p className="mt-2 text-center text-xs leading-snug text-bp-text/55">
                    {UK_RETURNS_SUMMARY}
                  </p>
                  <p className="mt-2 text-center text-xs text-bp-text/55">
                    {UK_VAT_NOTE}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
