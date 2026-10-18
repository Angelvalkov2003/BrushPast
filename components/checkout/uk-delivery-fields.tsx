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

const MANUAL_VALUE = "__manual__";

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
  const [lookupHint, setLookupHint] = useState<string | null>(null);
  const [lookupAddresses, setLookupAddresses] = useState<PostcodeLookupAddress[]>(
    [],
  );
  /** Index in lookupAddresses, or MANUAL_VALUE, or "" before search. */
  const [selectedAddressKey, setSelectedAddressKey] = useState("");
  const [lookupDone, setLookupDone] = useState(false);

  const patch = (partial: Partial<UkDeliveryFormData>) => {
    onChange({ ...value, ...partial });
  };

  const applyFullAddress = (address: PostcodeLookupAddress) => {
    patch({
      address_line_1: address.line1,
      address_line_2: address.line2 ?? "",
      city: address.town || value.city,
      county: address.county ?? value.county,
      postcode: address.postcode || value.postcode,
    });
  };

  const clearAddressLines = (keepTownCounty = false) => {
    patch({
      address_line_1: "",
      address_line_2: "",
      city: keepTownCounty ? value.city : "",
      county: keepTownCounty ? value.county : "",
    });
  };

  const runPostcodeLookup = async () => {
    setLookupError(null);
    setLookupHint(null);
    setLookupAddresses([]);
    setSelectedAddressKey("");
    setLookupDone(false);

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
        setLookupDone(true);
        setSelectedAddressKey(MANUAL_VALUE);
        return;
      }

      const resolvedPostcode = data.postcode ?? postcode;
      const addresses = data.addresses ?? [];
      setLookupAddresses(addresses);
      setLookupDone(true);

      if (addresses.length > 0) {
        const first = addresses[0]!;
        setSelectedAddressKey("0");
        patch({
          postcode: resolvedPostcode,
          address_line_1: first.line1,
          address_line_2: first.line2 ?? "",
          city: first.town || data.town || "",
          county: first.county ?? data.county ?? "",
        });
        setLookupHint(
          addresses.length === 1
            ? "Address found and filled in. Change it from the list if needed, or choose “Enter address manually”."
            : `${addresses.length} addresses found — we selected the first. Pick another from the list if needed.`,
        );
      } else {
        setSelectedAddressKey(MANUAL_VALUE);
        patch({
          postcode: resolvedPostcode,
          city: data.town ?? value.city,
          county: data.county ?? value.county,
          address_line_1: "",
          address_line_2: "",
        });
        setLookupHint(
          "Postcode found, but no full address list. Enter your address below.",
        );
      }
    } catch {
      setLookupError(
        "Address lookup failed. Try again or enter details manually.",
      );
      setLookupDone(true);
      setSelectedAddressKey(MANUAL_VALUE);
    } finally {
      setLookupLoading(false);
    }
  };

  const onAddressSelect = (key: string) => {
    setSelectedAddressKey(key);
    if (key === MANUAL_VALUE) {
      clearAddressLines(true);
      setLookupHint("Enter your address manually below.");
      return;
    }
    const picked = lookupAddresses[Number(key)];
    if (picked) {
      applyFullAddress(picked);
      setLookupHint("Address updated. You can still edit any field.");
    }
  };

  const showAddressFields =
    lookupDone ||
    Boolean(
      value.address_line_1 || value.address_line_2 || value.city || value.county,
    );
  const isManual = selectedAddressKey === MANUAL_VALUE || lookupAddresses.length === 0;

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
            value.phone_kind === "mobile" ? "07123456789" : "01234567890"
          }
          value={value.phone}
          onChange={(e) => patch({ phone: e.target.value })}
          className={inputClass}
        />
        <p className={`${bpBodySmClass} mt-1 text-bp-text/55`}>
          {value.phone_kind === "mobile"
            ? "UK mobile — e.g. 07123456789"
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
          Shipping address
        </h3>
        <p className={`${bpBodySmClass} mb-4 text-bp-text/60`}>
          Enter your UK postcode and we&apos;ll find matching addresses — like
          other UK checkouts. Pick from the list or enter manually.
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
                onChange={(e) => {
                  setLookupDone(false);
                  setLookupAddresses([]);
                  setSelectedAddressKey("");
                  setLookupHint(null);
                  setLookupError(null);
                  patch({ postcode: e.target.value.toUpperCase() });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    void runPostcodeLookup();
                  }
                }}
                placeholder="SW1A 1AA"
                className={inputClass}
              />
              <button
                type="button"
                disabled={lookupLoading}
                onClick={() => void runPostcodeLookup()}
                className={`${bpTitleClass} ${bpTitleUtility} shrink-0 border border-bp-text/20 bg-bp-canvas px-4 py-2.5 text-sm font-bold uppercase tracking-[0.08em] text-bp-text transition-colors hover:border-bp-accent disabled:cursor-not-allowed disabled:opacity-50`}
              >
                {lookupLoading ? "Finding…" : "Find address"}
              </button>
            </div>
            {lookupError ? (
              <p className="mt-1 text-xs text-red-700">{lookupError}</p>
            ) : null}
            {!lookupError && lookupHint ? (
              <p className="mt-1 text-xs text-bp-text/60">{lookupHint}</p>
            ) : null}
            {fieldErrors?.postcode ? (
              <p className="mt-1 text-xs text-red-700">{fieldErrors.postcode}</p>
            ) : null}
          </div>

          {lookupDone && lookupAddresses.length > 0 ? (
            <div>
              <label htmlFor="delivery_address_pick" className={labelClass}>
                Select address *
              </label>
              <select
                id="delivery_address_pick"
                value={selectedAddressKey}
                onChange={(e) => onAddressSelect(e.target.value)}
                className={inputClass}
              >
                {lookupAddresses.map((address, index) => (
                  <option key={`${address.label}-${index}`} value={String(index)}>
                    {address.label}
                  </option>
                ))}
                <option value={MANUAL_VALUE}>Enter address manually…</option>
              </select>
            </div>
          ) : null}

          {showAddressFields ? (
            <>
              {isManual && lookupAddresses.length > 0 ? (
                <p className={`${bpBodySmClass} text-bp-text/60`}>
                  Manual entry — type your address below, or pick one from the
                  list above.
                </p>
              ) : null}

              <div>
                <label htmlFor="delivery_address_line_1" className={labelClass}>
                  Address line 1 *
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
                  Address line 2 (optional)
                </label>
                <input
                  id="delivery_address_line_2"
                  type="text"
                  autoComplete="address-line2"
                  value={value.address_line_2}
                  onChange={(e) => patch({ address_line_2: e.target.value })}
                  placeholder="Flat, building, etc."
                  className={inputClass}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="delivery_city" className={labelClass}>
                    Town / city *
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
                    <p className="mt-1 text-xs text-red-700">
                      {fieldErrors.city}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="delivery_county" className={labelClass}>
                    County (optional)
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
            </>
          ) : (
            <p className={`${bpBodySmClass} text-bp-text/55`}>
              Press <span className="font-medium text-bp-text/80">Find address</span>{" "}
              to fill your details, or{" "}
              <button
                type="button"
                className="font-medium text-bp-accent underline-offset-2 hover:underline"
                onClick={() => {
                  setLookupDone(true);
                  setSelectedAddressKey(MANUAL_VALUE);
                  setLookupHint("Enter your address manually below.");
                }}
              >
                enter manually
              </button>
              .
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
