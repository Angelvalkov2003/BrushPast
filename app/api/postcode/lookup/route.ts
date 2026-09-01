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

type GetAddressResponse = {
  addresses?: string[];
  postcode?: string;
  latitude?: number;
  longitude?: number;
};

function parseGetAddressLine(line: string): PostcodeLookupAddress {
  const parts = line.split(",").map((part) => part.trim()).filter(Boolean);
  const line1 = parts[0] ?? line.trim();
  const town = parts[parts.length - 2] ?? parts[parts.length - 1] ?? "";
  const county = parts.length > 2 ? parts[parts.length - 1] : undefined;

  return {
    label: line.trim(),
    line1,
    town,
    county,
    postcode: "",
  };
}

async function lookupViaGetAddress(
  postcode: string,
): Promise<PostcodeLookupAddress[] | null> {
  const apiKey = process.env.GETADDRESS_API_KEY?.trim();
  if (!apiKey) return null;

  const encoded = encodeURIComponent(postcode.replace(/\s+/g, ""));
  const response = await fetch(
    `https://api.getAddress.io/find/${encoded}?api-key=${apiKey}&expand=false`,
    { next: { revalidate: 86400 } },
  );

  if (!response.ok) return null;

  const data = (await response.json()) as GetAddressResponse;
  if (!data.addresses?.length) return [];

  return data.addresses.map((line) => ({
    ...parseGetAddressLine(line),
    postcode,
  }));
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
    const [addressesFromGetAddress, postcodesIo] = await Promise.all([
      lookupViaGetAddress(postcode),
      lookupViaPostcodesIo(postcode),
    ]);

    if (!postcodesIo && addressesFromGetAddress === null) {
      return NextResponse.json(
        { error: "Could not look up that postcode. Check it and try again." },
        { status: 404 },
      );
    }

    const addresses = addressesFromGetAddress ?? [];
    const result: PostcodeLookupResult = {
      postcode,
      town: postcodesIo?.town ?? addresses[0]?.town ?? null,
      county: postcodesIo?.county ?? addresses[0]?.county ?? null,
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
