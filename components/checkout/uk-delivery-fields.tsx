"use client";

import { useState } from "react";
import clsx from "clsx";
import {
  bpBodyClass,
  bpBodySmClass,
  bpTitleClass,
  bpTitleUtility,
} from "components/home/home-typography";
import {
  UK_PHONE_MAX_LENGTH,
  UK_POSTCODE_MAX_LENGTH,
  normalizeUkPostcode,
  type PostcodeLookupAddress,
  type UkDeliveryFormData,
  type UkPhoneKind,
} from "lib/uk-delivery";

const inputClass = `${bpBodyClass} w-full border border-bp-text/20 bg-bp-canvas px-4 py-2.5 text-bp-text focus:border-bp-accent focus:outline-none focus:ring-1 focus:ring-bp-accent/30`;
const labelClass = `${bpBodySmClass} mb-1 block font-medium text-bp-text/80`;
const phoneKindClass = (selected: boolean) =>
  clsx(
    `${bpBodySmClass} border px-3 py-2 text-sm font-medium transition-colors`,
    selected
      ? "border-bp-accent bg-bp-accent/10 text-bp-text"
      : "border-bp-text/20 bg-bp-canvas text-bp-text/70 hover:border-bp-accent/40",
  );

export function UkDeliveryFields({
  value,
  onChange,
  fieldErrors,
}: {
  value: UkDeliveryFormData;
  onChange: (next: UkDeliveryFormData) => void;
  fieldErrors?: Partial<Record<keyof UkDeliveryFormData, string>>;
}) {
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [lookupAddresses, setLookupAddresses] = useState<PostcodeLookupAddress[]>(
    [],
  );

  const patch = (partial: Partial<UkDeliveryFormData>) => {
    onChange({ ...value, ...partial });
  };

  const runPostcodeLookup = async () => {
    setLookupError(null);
    setLookupAddresses([]);
    const postcode = normalizeUkPostcode(value.postcode);
    if (!postcode) {
      setLookupError("Enter a postcode first.");
      return;
    }

    patch({ postcode });
    setLookupLoading(true);
    try {
      const response = await fetch(
        `/api/postcode/lookup?postcode=${encodeURIComponent(postcode)}`,
      );
      const data = (await response.json()) as {
        error?: string;
        town?: string | null;
        county?: string | null;
        addresses?: PostcodeLookupAddress[];
        postcode?: string;
      };

      if (!response.ok) {
        setLookupError(data.error ?? "Could not find that postcode.");
        return;
      }

      patch({
        postcode: data.postcode ?? postcode,
        city: data.town ?? value.city,
        county: data.county ?? value.county,
      });
      setLookupAddresses(data.addresses ?? []);

      if (!data.addresses?.length) {
        setLookupError(
          "Postcode confirmed. Enter your street number and name below.",
        );
      }
    } catch {
      setLookupError("Address lookup failed. Try again or enter details manually.");
    } finally {
      setLookupLoading(false);
    }
  };

  const applyAddress = (address: PostcodeLookupAddress) => {
    patch({
      address_line_1: address.line1,
      address_line_2: address.line2 ?? value.address_line_2,
      city: address.town || value.city,
      county: address.county ?? value.county,
      postcode: address.postcode || value.postcode,
    });
    setLookupAddresses([]);
    setLookupError(null);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="delivery_first_name" className={labelClass}>
            Name *
          </label>
          <input
            id="delivery_first_name"
            type="text"
            autoComplete="given-name"
            required
            value={value.first_name}
            onChange={(e) => patch({ first_name: e.target.value })}
            className={inputClass}
          />
          {fieldErrors?.first_name ? (
            <p className="mt-1 text-xs text-red-700">{fieldErrors.first_name}</p>
          ) : null}
        </div>
        <div>
          <label htmlFor="delivery_last_name" className={labelClass}>
            Surname *
          </label>
          <input
            id="delivery_last_name"
            type="text"
            autoComplete="family-name"
            required
            value={value.last_name}
            onChange={(e) => patch({ last_name: e.target.value })}
            className={inputClass}
          />
          {fieldErrors?.last_name ? (
            <p className="mt-1 text-xs text-red-700">{fieldErrors.last_name}</p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="delivery_email" className={labelClass}>
          Email address *
        </label>
        <input
          id="delivery_email"
          type="email"
          autoComplete="email"
          required
          value={value.email}
          onChange={(e) => patch({ email: e.target.value })}
          className={inputClass}
        />
        {fieldErrors?.email ? (
          <p className="mt-1 text-xs text-red-700">{fieldErrors.email}</p>
        ) : null}
      </div>

      <div>
        <span className={labelClass}>Phone *</span>
        <div className="mb-2 flex flex-wrap gap-2">
          {(["mobile", "landline"] as UkPhoneKind[]).map((kind) => (
            <button
              key={kind}
              type="button"
              onClick={() => patch({ phone_kind: kind, phone: "" })}
              className={phoneKindClass(value.phone_kind === kind)}
              aria-pressed={value.phone_kind === kind}
            >
              {kind === "mobile" ? "Mobile" : "Landline"}
            </button>
          ))}
        </div>
        <input
          id="delivery_phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          required
          maxLength={UK_PHONE_MAX_LENGTH[value.phone_kind]}
          placeholder={
            value.phone_kind === "mobile" ? "07710 022 677" : "01234 567890"
          }
          value={value.phone}
          onChange={(e) => patch({ phone: e.target.value })}
          className={inputClass}
        />
        <p className={`${bpBodySmClass} mt-1 text-bp-text/55`}>
          {value.phone_kind === "mobile"
            ? "UK mobile — up to 11 digits (07…)."
            : "UK landline — starts with 01, 02, or 03."}
        </p>
        {fieldErrors?.phone ? (
          <p className="mt-1 text-xs text-red-700">{fieldErrors.phone}</p>
        ) : null}
      </div>

      <div className="border-t border-bp-text/10 pt-4">
        <h3
          className={`${bpTitleClass} ${bpTitleUtility} mb-1 text-sm font-bold uppercase tracking-[0.12em] text-bp-text`}
        >
          UK address
        </h3>
        <p className={`${bpBodySmClass} mb-4 text-bp-text/60`}>
          Delivery to UK addresses only.
        </p>

        <div className="space-y-4">
          <div>
            <label htmlFor="delivery_postcode" className={labelClass}>
              Postcode *
            </label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                id="delivery_postcode"
                type="text"
                autoComplete="postal-code"
                required
                maxLength={UK_POSTCODE_MAX_LENGTH}
                value={value.postcode}
                onChange={(e) =>
                  patch({ postcode: e.target.value.toUpperCase() })
                }
                placeholder="SW1A 1AA"
                className={inputClass}
              />
              <button
                type="button"
                disabled={lookupLoading}
                onClick={runPostcodeLookup}
                className={`${bpTitleClass} ${bpTitleUtility} shrink-0 border border-bp-text/20 bg-bp-canvas px-4 py-2.5 text-sm font-bold uppercase tracking-[0.08em] text-bp-text transition-colors hover:border-bp-accent disabled:cursor-not-allowed disabled:opacity-50`}
              >
                {lookupLoading ? "Finding…" : "Find address"}
              </button>
            </div>
            <p className={`${bpBodySmClass} mt-1 text-bp-text/55`}>
              Try postcode finder — we&apos;ll suggest town and county, or pick
              your address when available.
            </p>
            {lookupError ? (
              <p
                className={`mt-1 text-xs ${lookupAddresses.length ? "text-bp-text/60" : "text-red-700"}`}
              >
                {lookupError}
              </p>
            ) : null}
            {fieldErrors?.postcode ? (
              <p className="mt-1 text-xs text-red-700">{fieldErrors.postcode}</p>
            ) : null}
          </div>

          {lookupAddresses.length > 0 ? (
            <div>
              <label htmlFor="delivery_address_pick" className={labelClass}>
                Select your address
              </label>
              <select
                id="delivery_address_pick"
                defaultValue=""
                onChange={(e) => {
                  const picked = lookupAddresses[Number(e.target.value)];
                  if (picked) applyAddress(picked);
                }}
                className={inputClass}
              >
                <option value="" disabled>
                  Choose an address…
                </option>
                {lookupAddresses.map((address, index) => (
                  <option key={`${address.label}-${index}`} value={index}>
                    {address.label}
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          <div>
            <label htmlFor="delivery_address_line_1" className={labelClass}>
              Street number &amp; name *
            </label>
            <input
              id="delivery_address_line_1"
              type="text"
              autoComplete="address-line1"
              required
              value={value.address_line_1}
              onChange={(e) => patch({ address_line_1: e.target.value })}
              placeholder="12 Example Street"
              className={inputClass}
            />
            {fieldErrors?.address_line_1 ? (
              <p className="mt-1 text-xs text-red-700">
                {fieldErrors.address_line_1}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="delivery_address_line_2" className={labelClass}>
              Flat / building (optional)
            </label>
            <input
              id="delivery_address_line_2"
              type="text"
              autoComplete="address-line2"
              value={value.address_line_2}
              onChange={(e) => patch({ address_line_2: e.target.value })}
              className={inputClass}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="delivery_city" className={labelClass}>
                Town *
              </label>
              <input
                id="delivery_city"
                type="text"
                autoComplete="address-level2"
                required
                value={value.city}
                onChange={(e) => patch({ city: e.target.value })}
                className={inputClass}
              />
              {fieldErrors?.city ? (
                <p className="mt-1 text-xs text-red-700">{fieldErrors.city}</p>
              ) : null}
            </div>
            <div>
              <label htmlFor="delivery_county" className={labelClass}>
                County
              </label>
              <input
                id="delivery_county"
                type="text"
                autoComplete="address-level1"
                value={value.county}
                onChange={(e) => patch({ county: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
