/**
 * One-shot: coffee title/variants + strip em/en dashes from product short_descriptions.
 */
import { readFileSync } from "fs";

for (const line of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
  const m = line.match(/^([^#=]+)=(.*)$/);
  if (!m) continue;
  process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Need NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const headers = {
  apikey: key,
  Authorization: `Bearer ${key}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

async function api(method, path, body) {
  const res = await fetch(`${url}/rest/v1/${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${path}: ${res.status} ${text}`);
  return text ? JSON.parse(text) : null;
}

function tidyDashes(s) {
  if (!s) return s;
  return s
    .replace(/\u2014/g, "-") // em
    .replace(/\u2013/g, "-"); // en
}

const COFFEE_SHORT =
  "Espresso Blend: Brazil & Costa Rica. Dark chocolate, caramelised almonds and red fruits. Roasted in Peckham. £16.50.";

const COFFEE_FULL = `Espresso Blend

A fresh start. A great cup of coffee.

Rich, smooth and full of character. Espresso Blend brings together coffee from Brazil and Costa Rica, with flavours of dark chocolate, caramelised almond and a hint of red fruit.

Origins: Brazil & Costa Rica
Regions: Cerrado Mineiro & San José
Roast: Medium
Taste notes: Dark chocolate, caramelised almonds, and red fruits
Recommended for: AeroPress, cafetière, espresso, moka pot

Options: whole beans, or ground for filter or cafetière.

Every cup carries a story. This isn't just speciality coffee - it's a way to put money, dignity and recognition directly into the hands of people who've been brushed past their whole lives.

Each box comes with a randomly selected card featuring one of the creators or organisations we support.

65% of profits directly empower the creators and organisations that support those in need.

Stories first. Coffee second. Both exceptional.`;

const coffee = (
  await api("GET", "products?slug=eq.new-page&select=id,title")
)[0];
if (!coffee) {
  console.error("Coffee product new-page not found");
  process.exit(1);
}

await api("PATCH", `products?id=eq.${coffee.id}`, {
  title: "Espresso Blend",
  short_description: COFFEE_SHORT,
  full_description: COFFEE_FULL,
});
console.log("coffee product → Espresso Blend");

const variants = await api(
  "GET",
  `product_variants?product_id=eq.${coffee.id}&select=id,variant_name,sku,status`,
);

for (const v of variants) {
  const name = v.variant_name || "";
  if (/espresso/i.test(name) && /ground/i.test(name)) {
    await api("PATCH", `product_variants?id=eq.${v.id}`, { status: "draft" });
    console.log("drafted espresso grind", v.sku);
    continue;
  }
  if (/whole\s*bean/i.test(name)) {
    await api("PATCH", `product_variants?id=eq.${v.id}`, {
      variant_name: "Whole beans",
      status: "active",
    });
    console.log("renamed", v.sku, "→ Whole beans");
    continue;
  }
  if (/filter/i.test(name)) {
    await api("PATCH", `product_variants?id=eq.${v.id}`, {
      variant_name: "Ground - Filter",
      status: "active",
    });
    console.log("renamed", v.sku, "→ Ground - Filter");
    continue;
  }
  if (/cafet|french/i.test(name)) {
    await api("PATCH", `product_variants?id=eq.${v.id}`, {
      variant_name: "Ground - Cafetière",
      status: "active",
    });
    console.log("renamed", v.sku, "→ Ground - Cafetière");
  }
}

const products = await api(
  "GET",
  "products?select=id,slug,title,short_description,full_description&status=eq.active",
);

let n = 0;
for (const p of products) {
  const short = tidyDashes(p.short_description);
  const full = tidyDashes(p.full_description);
  const title = tidyDashes(p.title);
  if (
    short === p.short_description &&
    full === p.full_description &&
    title === p.title
  ) {
    continue;
  }
  await api("PATCH", `products?id=eq.${p.id}`, {
    title,
    short_description: short,
    full_description: full,
  });
  n += 1;
  console.log("dashes cleaned", p.slug);
}
console.log(`cleaned ${n} products`);
