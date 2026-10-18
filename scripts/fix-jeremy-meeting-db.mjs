import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const env = Object.fromEntries(
  fs
    .readFileSync(path.join(root, ".env.local"), "utf8")
    .split(/\r?\n/)
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i), l.slice(i + 1)];
    }),
);

const URL = env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = env.SUPABASE_SERVICE_ROLE_KEY;
const h = {
  apikey: KEY,
  Authorization: `Bearer ${KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

async function api(method, p, body) {
  const r = await fetch(`${URL}/rest/v1/${p}`, {
    method,
    headers:
      method === "GET"
        ? { apikey: KEY, Authorization: `Bearer ${KEY}` }
        : h,
    body: body ? JSON.stringify(body) : undefined,
  });
  const t = await r.text();
  let d;
  try {
    d = t ? JSON.parse(t) : null;
  } catch {
    d = t;
  }
  if (!r.ok) throw new Error(`${method} ${p} ${r.status} ${String(t).slice(0, 400)}`);
  return d;
}

for (const slug of ["sandra", "jed"]) {
  await api("PATCH", `stories?slug=eq.${slug}`, {
    status: "archived",
    updated_at: new Date().toISOString(),
  });
  console.log("archived story", slug);
}

const tee = (await api("GET", "products?slug=eq.fish-tee&select=*"))[0];
if (tee) {
  await api("PATCH", `products?id=eq.${tee.id}`, {
    title: "Fish Out of Water",
    short_description: (tee.short_description || "").replace(
      /Fish Might Talk/g,
      "Fish Out of Water",
    ),
    full_description: (tee.full_description || "").replace(
      /Fish Might Talk/g,
      "Fish Out of Water",
    ),
    updated_at: new Date().toISOString(),
  });
  console.log("renamed fish-tee → Fish Out of Water");
}

const fmt = (
  await api("GET", "products?slug=eq.fish-might-talk&select=id,title,main_image_url")
)[0];
console.log("fish-might-talk", fmt?.title, Boolean(fmt?.main_image_url));

const CAT_FRAME = "44444444-4444-4444-8444-444444444403";
const ed = (await api("GET", "stories?slug=eq.ed-beerbohm&select=id"))[0];
const IMPACT =
  "Every purchase helps support creativity, mentoring and second chances.";
const PROFIT =
  "65% of profits directly empower creators and partner organisations.";
const medium = "Fine art print on Hahnemühle German Etching 310gsm";
const foowDims = "30 × 40 cm";
const short = `${medium} by Ed Beerbohm — Fish Out of Water. The fish skeleton artwork also featured on the matching T-shirt.`;
const full = `${short}

Print size: ${foowDims}
Artist / credit: Ed Beerbohm
Material: fine art print on Hahnemühle German Etching 310gsm.
One size only.

${IMPACT}`;

let foow = (await api("GET", "products?slug=eq.fish-out-of-water&select=*"))[0];
if (!foow) {
  const id = randomUUID();
  foow = (
    await api("POST", "products", {
      id,
      title: "Fish Out of Water",
      slug: "fish-out-of-water",
      short_description: short,
      full_description: full,
      main_image_url: "/stories/ED-BEERBOHM/5.jpg",
      price_gbp: 28,
      story_number: "PRT-FISH-OUT-OF-WATER",
      product_type: "print",
      medium,
      dimensions: foowDims,
      profit_share_note: PROFIT,
      impact_note: IMPACT,
      inventory_type: "unlimited",
      inventory_quantity: null,
      status: "active",
      sort_order: 88,
    })
  )[0];
  await api("POST", "product_categories", [
    { product_id: id, category_id: CAT_FRAME },
  ]);
  if (ed) {
    await api("POST", "product_stories", [
      { product_id: id, story_id: ed.id },
    ]);
  }
  await api("POST", "product_variants", [
    {
      id: randomUUID(),
      product_id: id,
      variant_name: foowDims,
      inventory_type: "unlimited",
      inventory_quantity: null,
      sku: "PRT-FISH-OUT-OF-WATER",
      price_override: null,
      status: "active",
      sort_order: 10,
    },
  ]);
  console.log("created fish-out-of-water print");
} else {
  await api("PATCH", `products?id=eq.${foow.id}`, {
    title: "Fish Out of Water",
    status: "active",
    short_description: short,
    full_description: full,
    main_image_url: foow.main_image_url || "/stories/ED-BEERBOHM/5.jpg",
    medium,
    dimensions: foow.dimensions || foowDims,
    price_gbp: 28,
    product_type: "print",
    updated_at: new Date().toISOString(),
  });
  console.log("reactivated fish-out-of-water print");
}

console.log("done");
