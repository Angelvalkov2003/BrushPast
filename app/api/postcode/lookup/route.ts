import { NextRequest, NextResponse } from "next/server";
import {
  normalizeUkPostcode,
  type PostcodeLookupAddress,
  type PostcodeLookupResult,
} from "lib/uk-delivery";

type PostcodesIoResponse = {
  status: number;
  result?: {
    postcode: string;
    admin_district?: string | null;
    admin_county?: string | null;
    parish?: string | null;
    region?: string | null;
  };
};

type IdealPostcodesResult = {
  line_1?: string;
  line_2?: string;
  line_3?: string;
  post_town?: string;
  county?: string;
  postcode?: string;
  thoroughfare?: string;
  building_number?: string;
  building_name?: string;
  sub_building_name?: string;
  organisation_name?: string;
};

type IdealPostcodesResponse = {
  code?: number;
  message?: string;
  result?: IdealPostcodesResult[];
};

function parseIdealAddress(
  item: IdealPostcodesResult,
  fallbackPostcode: string,
): PostcodeLookupAddress {
  const line1 =
    item.line_1?.trim() ||
    [
      item.organisation_name,
      item.sub_building_name,
      item.building_number,
      item.building_name,
      item.thoroughfare,
    ]
      .filter(Boolean)
      .join(" ")
      .trim();
  const line2 = [item.line_2, item.line_3].filter(Boolean).join(", ").trim();
  const town = item.post_town?.trim() ?? "";
  const county = item.county?.trim() || undefined;
  const postcode = item.postcode?.trim() || fallbackPostcode;
  const label = [line1, line2, town, county, postcode]
    .filter(Boolean)
    .join(", ");

  return {
    label,
    line1,
    line2: line2 || undefined,
    town,
    county,
    postcode,
  };
}

async function lookupViaIdealPostcodes(
  postcode: string,
): Promise<PostcodeLookupAddress[] | null> {
  const apiKey =
    process.env.IDEAL_POSTCODES_API_KEY?.trim() ||
    // Public Ideal Postcodes test key — limited coverage; set a live key in production.
    "ak_test";

  const encoded = encodeURIComponent(postcode);
  const response = await fetch(
    `https://api.ideal-postcodes.co.uk/v1/postcodes/${encoded}?api_key=${apiKey}`,
    { next: { revalidate: 86400 } },
  );

  if (response.status === 404) return [];
  if (!response.ok) {
    console.error("ideal-postcodes lookup failed:", response.status);
    return null;
  }

  const data = (await response.json()) as IdealPostcodesResponse;
  if (!data.result?.length) return [];

  return data.result.map((item) => parseIdealAddress(item, postcode));
}

type GetAddressExpanded = {
  line_1?: string;
  line_2?: string;
  line_3?: string;
  line_4?: string;
  town_or_city?: string;
  county?: string;
  formatted_address?: string[];
};

type GetAddressFindResponse = {
  postcode?: string;
  addresses?: Array<string | GetAddressExpanded>;
};

async function lookupViaGetAddress(
  postcode: string,
): Promise<PostcodeLookupAddress[] | null> {
  const apiKey = process.env.GETADDRESS_API_KEY?.trim();
  if (!apiKey) return null;

  const encoded = encodeURIComponent(postcode.replace(/\s+/g, ""));
  const response = await fetch(
    `https://api.getAddress.io/find/${encoded}?api-key=${encodeURIComponent(apiKey)}&expand=true`,
    { next: { revalidate: 86400 } },
  );

  if (response.status === 404) return [];
  if (!response.ok) {
    console.error("getaddress lookup failed:", response.status);
    return null;
  }

  const data = (await response.json()) as GetAddressFindResponse;
  if (!data.addresses?.length) return [];

  return data.addresses.map((item) => {
    if (typeof item === "string") {
      const parts = item.split(",").map((p) => p.trim()).filter(Boolean);
      const line1 = parts[0] ?? "";
      const town = parts[parts.length - 2] ?? "";
      const line2 = parts.slice(1, -2).join(", ");
      const label = [item, data.postcode || postcode].filter(Boolean).join(", ");
      return {
        label,
        line1,
        line2: line2 || undefined,
        town,
        postcode: data.postcode || postcode,
      };
    }

    const line1 = item.line_1?.trim() || item.formatted_address?.[0]?.trim() || "";
    const line2 = [item.line_2, item.line_3, item.line_4]
      .filter(Boolean)
      .join(", ")
      .trim();
    const town = item.town_or_city?.trim() ?? "";
    const county = item.county?.trim() || undefined;
    const pc = data.postcode || postcode;
    const label = [line1, line2, town, county, pc].filter(Boolean).join(", ");
    return { label, line1, line2: line2 || undefined, town, county, postcode: pc };
  });
}

async function lookupViaPostcodesIo(postcode: string): Promise<{
  town: string | null;
  county: string | null;
} | null> {
  const encoded = encodeURIComponent(postcode.replace(/\s+/g, ""));
  const response = await fetch(`https://api.postcodes.io/postcodes/${encoded}`, {
    next: { revalidate: 86400 },
  });

  if (!response.ok) return null;

  const data = (await response.json()) as PostcodesIoResponse;
  if (data.status !== 200 || !data.result) return null;

  const town =
    data.result.admin_district?.trim() ||
    data.result.parish?.trim() ||
    null;
  const county =
    data.result.admin_county?.trim() ||
    data.result.region?.trim() ||
    null;

  return { town, county };
}

export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("postcode")?.trim() ?? "";
  if (!raw) {
    return NextResponse.json({ error: "Postcode is required." }, { status: 400 });
  }

  const postcode = normalizeUkPostcode(raw);
  if (!/^[A-Z]{1,2}\d[A-Z\d]?\s\d[A-Z]{2}$/.test(postcode)) {
    return NextResponse.json(
      { error: "Enter a valid UK postcode (e.g. SW1A 1AA)." },
      { status: 400 },
    );
  }

  try {
    const [addressesFromIdeal, addressesFromGetAddress, postcodesIo] =
      await Promise.all([
        lookupViaIdealPostcodes(postcode),
        lookupViaGetAddress(postcode),
        lookupViaPostcodesIo(postcode),
      ]);

    // Prefer a provider that returned real address rows.
    const addresses =
      (addressesFromGetAddress && addressesFromGetAddress.length > 0
        ? addressesFromGetAddress
        : null) ??
      (addressesFromIdeal && addressesFromIdeal.length > 0
        ? addressesFromIdeal
        : null) ??
      [];

    const providersFailed =
      addressesFromIdeal === null &&
      addressesFromGetAddress === null &&
      !postcodesIo;

    if (providersFailed) {
      return NextResponse.json(
        { error: "Could not look up that postcode. Check it and try again." },
        { status: 404 },
      );
    }

    if (!postcodesIo && addresses.length === 0) {
      return NextResponse.json(
        { error: "Could not find that postcode. Check it and try again." },
        { status: 404 },
      );
    }

    const result: PostcodeLookupResult = {
      postcode,
      town: addresses[0]?.town || postcodesIo?.town || null,
      county: addresses[0]?.county || postcodesIo?.county || null,
      addresses: addresses.map((item) => ({ ...item, postcode })),
    };

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error("postcode lookup:", error);
    return NextResponse.json(
      { error: "Address lookup failed. Try again or enter your address manually." },
      { status: 500 },
    );
  }
}
