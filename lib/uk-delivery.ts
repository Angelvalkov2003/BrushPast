export type UkPhoneKind = "mobile" | "landline";

export type UkDeliveryFormData = {
  first_name: string;
  last_name: string;
  email: string;
  phone_kind: UkPhoneKind;
  phone: string;
  address_line_1: string;
  address_line_2: string;
  postcode: string;
  city: string;
  county: string;
};

export const UK_PHONE_MAX_LENGTH: Record<UkPhoneKind, number> = {
  mobile: 16,
  landline: 17,
};

export const UK_POSTCODE_MAX_LENGTH = 8;

export function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

/** Normalise to leading 0 (e.g. +44 7710… → 07710…). */
export function normalizeUkPhoneDigits(raw: string): string {
  let digits = digitsOnly(raw);
  if (digits.startsWith("44")) digits = `0${digits.slice(2)}`;
  return digits;
}

export function formatUkPhoneForDisplay(raw: string): string {
  const digits = normalizeUkPhoneDigits(raw);
  if (digits.length <= 3) return digits;
  if (digits.startsWith("07") && digits.length <= 11) {
    return `${digits.slice(0, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`.trim();
  }
  if (digits.startsWith("02") && digits.length === 11) {
    return `${digits.slice(0, 3)} ${digits.slice(3, 7)} ${digits.slice(7)}`.trim();
  }
  if (digits.length >= 10) {
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`.trim();
  }
  return digits;
}

export function validateUkPhone(
  raw: string,
  kind: UkPhoneKind,
): { ok: true; normalized: string } | { ok: false; error: string } {
  const trimmed = raw.trim();
  if (!trimmed) {
    return { ok: false, error: "Phone number is required." };
  }

  const digits = normalizeUkPhoneDigits(trimmed);
  if (digits.length > UK_PHONE_MAX_LENGTH[kind]) {
    return { ok: false, error: "Phone number is too long." };
  }

  if (kind === "mobile") {
    if (!/^07\d{9}$/.test(digits)) {
      return {
        ok: false,
        error: "Enter a valid UK mobile (11 digits starting with 07).",
      };
    }
  } else if (!/^(01\d{8,9}|02\d{9}|03\d{9})$/.test(digits)) {
    return {
      ok: false,
      error: "Enter a valid UK landline (starts with 01, 02, or 03).",
    };
  }

  return { ok: true, normalized: formatUkPhoneForDisplay(digits) };
}

export function normalizeUkPostcode(raw: string): string {
  const cleaned = raw.replace(/[^\w\s]/g, "").trim().toUpperCase();
  const compact = cleaned.replace(/\s+/g, "");
  if (compact.length <= 3) return compact;
  return `${compact.slice(0, -3)} ${compact.slice(-3)}`;
}

export function validateUkPostcode(
  raw: string,
): { ok: true; normalized: string } | { ok: false; error: string } {
  const normalized = normalizeUkPostcode(raw);
  if (!normalized) {
    return { ok: false, error: "Postcode is required." };
  }
  if (!/^[A-Z]{1,2}\d[A-Z\d]?\s\d[A-Z]{2}$/.test(normalized)) {
    return { ok: false, error: "Enter a valid UK postcode (e.g. SW1A 1AA)." };
  }
  return { ok: true, normalized };
}

export function validateUkDeliveryFields(
  data: UkDeliveryFormData,
): { ok: true; values: UkDeliveryFormData } | { ok: false; error: string } {
  const first_name = data.first_name.trim();
  const last_name = data.last_name.trim();
  const email = data.email.trim();
  const address_line_1 = data.address_line_1.trim();
  const address_line_2 = data.address_line_2.trim();
  const city = data.city.trim();
  const county = data.county.trim();

  if (!first_name) return { ok: false, error: "Name is required." };
  if (!last_name) return { ok: false, error: "Surname is required." };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Enter a valid email address." };
  }

  const phoneResult = validateUkPhone(data.phone, data.phone_kind);
  if (!phoneResult.ok) return phoneResult;

  const postcodeResult = validateUkPostcode(data.postcode);
  if (!postcodeResult.ok) return postcodeResult;

  if (!address_line_1) {
    return { ok: false, error: "Street number and name are required." };
  }
  if (!city) return { ok: false, error: "Town is required." };

  return {
    ok: true,
    values: {
      ...data,
      first_name,
      last_name,
      email,
      phone: phoneResult.normalized,
      address_line_1,
      address_line_2,
      postcode: postcodeResult.normalized,
      city,
      county,
    },
  };
}

export type PostcodeLookupAddress = {
  label: string;
  line1: string;
  line2?: string;
  town: string;
  county?: string;
  postcode: string;
};

export type PostcodeLookupResult = {
  postcode: string;
  town: string | null;
  county: string | null;
  addresses: PostcodeLookupAddress[];
};
