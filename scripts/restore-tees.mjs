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

const CAT_WEAR = "44444444-4444-4444-8444-444444444401";
const TEE_SHORT =
  "Made from premium 180gsm organic cotton, with a soft feel and a modern unisex fit. Not too heavy, not too light — just a really good everyday T-shirt. Comfortable, durable and made to be worn again and again.";
const TEE_SIZE = `Size guide (Stanley/Stella Creator 2.0 STTU169 — measurements in cm):
S — half chest 49.5 · body length 69 · sleeve 22.5
M — half chest 53.5 · body length 73 · sleeve 24
L — half chest 56.5 · body length 75 · sleeve 24.5
XL — half chest 59.5 · body length 77 · sleeve 25
(Half chest = width across chest, garment laid flat.)`;
const TEE_DETAILS = `The details
• 100% organic combed ring-spun cotton*
• Premium 180gsm fabric
• Modern unisex medium fit (Stanley/Stella Creator 2.0 STTU169)
• Soft, comfortable feel
• Classic crew neck
• High-quality DTG printed artwork
• Brushpast branding

*Fabric composition may vary by colour. Confirm final chosen garment colours with supplier.

Care: Wash inside out at 30°C with similar colours. Do not tumble dry or iron directly over the print.

Every purchase helps support creativity, mentoring and second chances.`;
const IMPACT =
  "Every purchase helps support creativity, mentoring and second chances.";
const PROFIT =
  "65% of profits directly empower creators and partner organisations.";

function teeFull(blurb) {
  return `A great story deserves a great T-shirt.

${TEE_SHORT}

${blurb}

${TEE_DETAILS}

${TEE_SIZE}`;
}

const stories = new Map(
  (await api("GET", "stories?select=id,slug")).map((s) => [s.slug, s.id]),
);
const products = new Map(
  (await api("GET", "products?select=id,slug")).map((p) => [p.slug, p]),
);

async function setCat(id) {
  await api("DELETE", `product_categories?product_id=eq.${id}`);
  await api("POST", "product_categories", [
    { product_id: id, category_id: CAT_WEAR },
  ]);
}

async function setStories(id, slugs) {
  await api("DELETE", `product_stories?product_id=eq.${id}`);
  const ids = slugs.map((s) => stories.get(s)).filter(Boolean);
  if (ids.length) {
    await api(
      "POST",
      "product_stories",
      ids.map((story_id) => ({ product_id: id, story_id })),
    );
  }
}

async function setVariants(id, code, colour) {
  await api("DELETE", `product_variants?product_id=eq.${id}`);
  await api(
    "POST",
    "product_variants",
    ["S", "M", "L", "XL"].map((size, i) => ({
      id: randomUUID(),
      product_id: id,
      variant_name: `Size ${size} · ${colour}`,
      inventory_type: "unlimited",
      inventory_quantity: null,
      sku: `${code}-${size}`,
      price_override: null,
      status: "active",
      sort_order: (i + 1) * 10,
    })),
  );
}

async function upsertTee(tee) {
  const existing = products.get(tee.slug);
  const id = existing?.id ?? randomUUID();
  const short = `${TEE_SHORT} Colour: ${tee.colour}.`;
  const body = {
    title: tee.title,
    slug: tee.slug,
    short_description: short,
    full_description: teeFull(tee.storyBlurb),
    price_gbp: 39,
    story_number: tee.code,
    product_type: "t-shirt",
    medium: "100% organic cotton · DTG · Creator 2.0 STTU169",
    dimensions: "S / M / L / XL — see size guide in description",
    weight: "180gsm",
    profit_share_note: PROFIT,
    impact_note: IMPACT,
    inventory_type: "unlimited",
    inventory_quantity: null,
    status: "active",
    sort_order: tee.sort,
    updated_at: new Date().toISOString(),
  };
  let row;
  if (existing) {
    row = (await api("PATCH", `products?id=eq.${id}`, body))[0];
    console.log("updated", tee.slug, "→", tee.title);
  } else {
    row = (
      await api("POST", "products", { id, main_image_url: null, ...body })
    )[0];
    console.log("created", tee.slug, "→", tee.title);
  }
  products.set(tee.slug, row);
  await setCat(row.id);
  await setStories(row.id, tee.storySlugs);
  await setVariants(row.id, tee.code, tee.colour);
}

/**
 * TBD → print title mapping:
 * - Fish → Fish Might Talk
 * - Portrait → Sandra (portrait print; black tee colour)
 * - Myokinase → no matching print name in catalog (kept as Myokinase, TBC removed)
 */
const tees = [
  {
    slug: "human-beans-tee",
    title: "Human Beans",
    code: "BP-001",
    colour: "Blue / washed blue",
    sort: 80,
    storySlugs: ["bobby"],
    storyBlurb: "Artwork: Human Beans — linked to Bobby’s story world.",
  },
  {
    slug: "portrait-tee",
    title: "Sandra",
    code: "BP-002",
    colour: "Black",
    sort: 79,
    storySlugs: ["sandra", "karl"],
    storyBlurb:
      "Artwork: Sandra — title taken from the Sandra fine art print (Karl Rudziak).",
  },
  {
    slug: "myokinase-tee",
    title: "Myokinase",
    code: "BP-003",
    colour: "Natural / ecru",
    sort: 78,
    storySlugs: [],
    storyBlurb:
      "Artwork: Myokinase. No matching print title in the current print list — confirm final name if this should match another print.",
  },
  {
    slug: "hope-grows-tee",
    title: "Hope Grows",
    code: "BP-004",
    colour: "Black",
    sort: 77,
    storySlugs: [],
    storyBlurb: "Artwork: Hope Grows.",
  },
  {
    slug: "pollen-ate",
    title: "Pollen-ate",
    code: "BP-005",
    colour: "Natural / ecru",
    sort: 76,
    storySlugs: ["ed-beerbohm"],
    storyBlurb: "Artwork: Pollen-ate by Ed Beerbohm.",
  },
  {
    slug: "fish-tee",
    title: "Fish Might Talk",
    code: "BP-006",
    colour: "Black",
    sort: 75,
    storySlugs: ["ed-beerbohm", "jeremy"],
    storyBlurb:
      "Artwork: Fish Might Talk — title matched to the fine art print of the same name.",
  },
];

for (const t of tees) await upsertTee(t);

const all = await api(
  "GET",
  "products?product_type=eq.t-shirt&select=slug,title,status,price_gbp&order=sort_order.desc",
);
console.log("\n=== T-SHIRTS NOW ===");
for (const p of all) {
  console.log(`${p.status} ${p.slug} | ${p.title} | £${p.price_gbp}`);
}
