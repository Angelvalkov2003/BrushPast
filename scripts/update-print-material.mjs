import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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
const medium = "Fine art print on Hahnemühle German Etching 310gsm";
const materialLine =
  "Material: fine art print on Hahnemühle German Etching 310gsm.";

const prints = await fetch(
  `${URL}/rest/v1/products?product_type=eq.print&select=id,slug,short_description,full_description`,
  { headers: { apikey: KEY, Authorization: `Bearer ${KEY}` } },
).then((r) => r.json());

for (const p of prints) {
  let full = p.full_description || "";
  if (/Material:/i.test(full)) {
    full = full.replace(/Material:[^\n]*/i, materialLine);
  } else if (/Print size:/i.test(full)) {
    full = full.replace(/(Print size:[^\n]*\n)/i, `$1${materialLine}\n`);
  } else {
    full = `${full.trim()}\n\n${materialLine}`;
  }

  let short = p.short_description || "";
  if (short && !/German Etching|Hahnemühle/i.test(short)) {
    short = short.replace(/^Fine art print/i, "Fine art print on Hahnemühle German Etching 310gsm");
  }

  await fetch(`${URL}/rest/v1/products?id=eq.${p.id}`, {
    method: "PATCH",
    headers: {
      apikey: KEY,
      Authorization: `Bearer ${KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      medium,
      short_description: short,
      full_description: full,
      updated_at: new Date().toISOString(),
    }),
  });
  console.log("updated", p.slug);
}

// Confirm coffee variants still present
const coffee = await fetch(
  `${URL}/rest/v1/products?slug=eq.new-page&select=id,title,price_gbp,status`,
  { headers: { apikey: KEY, Authorization: `Bearer ${KEY}` } },
).then((r) => r.json());
const variants = await fetch(
  `${URL}/rest/v1/product_variants?product_id=eq.${coffee[0].id}&select=variant_name,sku&order=sort_order`,
  { headers: { apikey: KEY, Authorization: `Bearer ${KEY}` } },
).then((r) => r.json());
console.log("\nCoffee:", coffee[0]);
console.log("Variants:", variants.map((v) => v.variant_name).join(" | "));
