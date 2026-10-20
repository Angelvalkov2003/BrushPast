/**
 * Sync Brush Past shop catalog from Jeremy/Angel product brief (Oct 2026).
 * - Keeps test123
 * - Does NOT set/overwrite images (main_image_url left as-is on updates; null on creates)
 * - Run: node scripts/shop-catalog-sync.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
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
if (!URL || !KEY) throw new Error("Missing Supabase env");

const headers = {
  apikey: KEY,
  Authorization: `Bearer ${KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

async function api(method, path, body) {
  const res = await fetch(`${URL}/rest/v1/${path}`, {
    method,
    headers:
      method === "GET"
        ? { apikey: KEY, Authorization: `Bearer ${KEY}` }
        : headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  if (!res.ok) {
    throw new Error(`${method} ${path} → ${res.status}: ${text.slice(0, 500)}`);
  }
  return data;
}

const CAT = {
  wear: "44444444-4444-4444-8444-444444444401",
  drink: "44444444-4444-4444-8444-444444444402",
  frame: "44444444-4444-4444-8444-444444444403",
};

const TEE_SHARED_SHORT =
  "Made from premium 180gsm organic cotton, with a soft feel and a modern unisex fit. Not too heavy, not too light — just a really good everyday T-shirt. Comfortable, durable and made to be worn again and again.";

const TEE_SIZE_GUIDE = `Size guide (Stanley/Stella Creator 2.0 STTU169 — measurements in cm):
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

function teeFull(storyBlurb) {
  return `A great story deserves a great T-shirt.

${TEE_SHARED_SHORT}

${storyBlurb}

${TEE_DETAILS}

${TEE_SIZE_GUIDE}`;
}

const IMPACT =
  "Every purchase helps support creativity, mentoring and second chances.";
const PROFIT = "65% of profits directly empower creators and partner organisations.";

const DELETE_SLUGS = [
  "dummy-tee-night-bus-sketch",
  "dummy-tee-roundabout-words",
  "dummy-tee-pollen-mark",
  "dummy-print-window-light",
  "dummy-print-kitchen-table-map",
  "dummy-print-soft-rebellion",
  "bobby-workshop-tee",
  "errol-peckham-morning",
  "food-waste",
  "story-card-bobby",
  "chemistry",
  "hope",
  "fish-out-of-water",
  // Old generic coffee — replaced by new-page
  "coffee",
];

const PRINTS = [
  {
    slug: "fish-might-talk",
    oldSlug: "fish-might-chat",
    title: "Fish Might Talk",
    artist: "Ed Beerbohm",
    storySlugs: ["ed-beerbohm"],
    dimensions: "30 × 20 cm",
    storyNumber: "PRT-FISH-MIGHT-TALK",
    short:
      "Fine art print on Hahnemühle German Etching 310gsm by Ed Beerbohm — Fish Might Talk. From his painted interior world where everyday spaces become unexpected vistas.",
  },
  {
    slug: "beyond-the-walls",
    title: "Beyond the Walls",
    artist: "Ed Beerbohm",
    storySlugs: ["ed-beerbohm"],
    dimensions: "30 × 40 cm",
    storyNumber: "PRT-BEYOND-THE-WALLS",
    short:
      "Fine art print on Hahnemühle German Etching 310gsm by Ed Beerbohm — Beyond the Walls. Artwork from the Brush Past archive, made to frame and live with.",
  },
  {
    slug: "sons-of-anarchy",
    title: "Sons of Anarchy",
    artist: "Bobby",
    storySlugs: ["bobby"],
    dimensions: "24 × 40 cm",
    storyNumber: "PRT-SONS-OF-ANARCHY",
    short:
      "Fine art print linked to Bobby’s story — Sons of Anarchy. One size print from the Brush Past archive.",
  },
  {
    slug: "alternative-vista",
    title: "Alternative Vista",
    artist: "Ed Beerbohm",
    storySlugs: ["ed-beerbohm"],
    dimensions: "30 × 45 cm",
    storyNumber: "PRT-ALTERNATIVE-VISTA",
    short:
      "Fine art print by Ed Beerbohm — Alternative Vista. Walls transformed from barriers into something you can look into.",
  },
  {
    slug: "sandra-print",
    title: "Sandra",
    artist: "Karl Rudziak",
    storySlugs: ["sandra", "karl"],
    dimensions: "30 × 30 cm",
    storyNumber: "PRT-SANDRA",
    short:
      "Portrait print — Sandra, from Karl Rudziak’s work. Painted after weeks of coffee-morning conversations.",
  },
  {
    slug: "jed-print",
    title: "Jed",
    artist: "Karl Rudziak",
    storySlugs: ["jed", "karl"],
    dimensions: "24 × 30 cm",
    storyNumber: "PRT-JED",
    short:
      "Portrait print — Jed, from Karl Rudziak’s work. A Brush Past archive print ready to frame.",
  },
  {
    slug: "mighty-culture",
    title: "Mighty Culture",
    artist: "Maimouna",
    storySlugs: ["maimouna"],
    dimensions: "30 × 30 cm",
    storyNumber: "PRT-MIGHTY-CULTURE",
    short:
      "Fine art print linked to Maimouna — Mighty Culture. Colour, character and everyday culture on paper.",
  },
  {
    slug: "human-beans",
    title: "Human Beans",
    artist: "Bobby",
    storySlugs: ["bobby"],
    dimensions: "30 × 45 cm",
    storyNumber: "PRT-HUMAN-BEANS",
    short:
      "Fine art print linked to Bobby’s story — Human Beans. Archive artwork to hang and share.",
  },
  {
    slug: "glimpses-of-light",
    oldSlug: "glimpse-of-light",
    title: "Glimpses of Light",
    artist: "Little George",
    storySlugs: ["little-george"],
    dimensions: "30 × 40 cm",
    storyNumber: "PRT-GLIMPSES-OF-LIGHT",
    short:
      "Fine art print by Little George — Glimpses of Light. A quiet study from the Brush Past archive.",
  },
];

const TEES = [
  {
    slug: "human-beans-tee",
    title: "Human Beans",
    code: "BP-001",
    colour: "Blue / washed blue",
    storySlugs: ["bobby"],
    storyBlurb:
      "Artwork: Human Beans. Creator credit to be confirmed with final sign-off — linked for now to Bobby’s story world.",
  },
  {
    slug: "portrait-tee",
    title: "Portrait (title TBC)",
    code: "BP-002",
    colour: "Black",
    storySlugs: [],
    storyBlurb:
      "Artwork: Portrait (working title). Final title and creator credit pending confirmation.",
  },
  {
    slug: "myokinase-tee",
    title: "Myokinase (title TBC)",
    code: "BP-003",
    colour: "Natural / ecru",
    storySlugs: [],
    storyBlurb:
      "Artwork: Myokinase (working title). Final title and creator credit pending confirmation.",
  },
  {
    slug: "hope-grows-tee",
    title: "Hope Grows",
    code: "BP-004",
    colour: "Black",
    storySlugs: [],
    storyBlurb:
      "Artwork: Hope Grows. Story attribution and story number pending verification with the team.",
  },
  {
    slug: "pollen-ate",
    title: "Pollen-ate",
    code: "BP-005",
    colour: "Natural / ecru",
    storySlugs: ["ed-beerbohm"],
    storyBlurb:
      "Artwork: Pollen-ate by Ed Beerbohm — from the flat-as-studio world where painting and film remake everyday space.",
  },
  {
    slug: "fish-tee",
    title: "Fish (title TBC)",
    code: "BP-006",
    colour: "Black",
    storySlugs: ["jeremy"],
    storyBlurb:
      "Artwork: Fish (working title). Attribution with Jeremy pending confirmation; smaller artwork option may apply in production.",
  },
];

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

Stories first. Coffee second. Both exceptional.

HOW TO BREW

Espresso machine
18.5g coffee | 40g espresso | 28–31 seconds
1. Grind finely.
2. Dose 18.5g into the filter basket and tamp evenly.
3. Brew for around 30 seconds, aiming for 40g of espresso.
4. Enjoy black or with your favourite milk.

Cafetière (French press)
30g coffee | 500ml water | 4 minutes
1. Add 30g of coarsely ground coffee.
2. Pour in 500ml of hot water, just off the boil.
3. Stir gently, steep for 4 minutes, then plunge and pour.

Filter / pour-over
Use a medium grind and your usual filter ratio; start around 60g coffee per litre of water and adjust to taste.

Note: Bag weight, caffeine content and nutrition/macros to be confirmed with the roaster before final label copy is published.`;

async function getStoriesBySlug() {
  const rows = await api("GET", "stories?select=id,slug");
  return new Map(rows.map((r) => [r.slug, r.id]));
}

async function getProductsBySlug() {
  const rows = await api(
    "GET",
    "products?select=id,slug,main_image_url,status,title",
  );
  return new Map(rows.map((r) => [r.slug, r]));
}

async function deleteProduct(id, slug) {
  await api("DELETE", `product_variants?product_id=eq.${id}`);
  await api("DELETE", `product_images?product_id=eq.${id}`);
  await api("DELETE", `product_stories?product_id=eq.${id}`);
  await api("DELETE", `product_organisations?product_id=eq.${id}`);
  await api("DELETE", `product_categories?product_id=eq.${id}`);
  await api("DELETE", `products?id=eq.${id}`);
  console.log("deleted", slug);
}

async function setCategories(productId, categoryIds) {
  await api("DELETE", `product_categories?product_id=eq.${productId}`);
  if (!categoryIds.length) return;
  await api(
    "POST",
    "product_categories",
    categoryIds.map((category_id) => ({ product_id: productId, category_id })),
  );
}

async function setStories(productId, storyIds) {
  await api("DELETE", `product_stories?product_id=eq.${productId}`);
  if (!storyIds.length) return;
  await api(
    "POST",
    "product_stories",
    storyIds.map((story_id) => ({ product_id: productId, story_id })),
  );
}

async function replaceVariants(productId, variants) {
  await api("DELETE", `product_variants?product_id=eq.${productId}`);
  if (!variants.length) return;
  await api(
    "POST",
    "product_variants",
    variants.map((v, i) => ({
      id: randomUUID(),
      product_id: productId,
      variant_name: v.name,
      inventory_type: v.inventory_type ?? "unlimited",
      inventory_quantity: v.qty ?? null,
      sku: v.sku,
      price_override: null,
      status: v.status ?? "active",
      sort_order: (i + 1) * 10,
    })),
  );
}

async function upsertProduct(existing, patch) {
  if (existing) {
    const { id, ...rest } = patch;
    // Never overwrite images — Angel uploads those
    delete rest.main_image_url;
    const updated = await api("PATCH", `products?id=eq.${existing.id}`, {
      ...rest,
      updated_at: new Date().toISOString(),
    });
    return updated[0] ?? { ...existing, ...rest };
  }
  const created = await api("POST", "products", {
    id: patch.id ?? randomUUID(),
    main_image_url: null,
    ...patch,
  });
  return created[0];
}

async function main() {
  const stories = await getStoriesBySlug();
  const products = await getProductsBySlug();

  console.log("\n=== DELETE obsolete ===");
  for (const slug of DELETE_SLUGS) {
    const p = products.get(slug);
    if (!p) {
      console.log("skip missing", slug);
      continue;
    }
    if (slug === "test123") throw new Error("Refusing to delete test123");
    await deleteProduct(p.id, slug);
    products.delete(slug);
  }

  console.log("\n=== PRINTS (9) ===");
  let sort = 90;
  for (const pr of PRINTS) {
    const existing =
      products.get(pr.slug) ||
      (pr.oldSlug ? products.get(pr.oldSlug) : undefined);
    const id = existing?.id ?? randomUUID();
    const full = `${pr.short}

Print size: ${pr.dimensions}
Artist / credit: ${pr.artist}
Material: fine art print on Hahnemühle German Etching 310gsm.
One size only.

${IMPACT}`;

    const row = await upsertProduct(existing, {
      id,
      title: pr.title,
      slug: pr.slug,
      short_description: pr.short,
      full_description: full,
      price_gbp: 28,
      story_number: pr.storyNumber,
      product_type: "print",
    medium: "Fine art print on Hahnemühle German Etching 310gsm",
    dimensions: pr.dimensions,
    weight: null,
    profit_share_note: PROFIT,
    impact_note: IMPACT,
    inventory_type: "unlimited",
    inventory_quantity: null,
    status: "active",
    sort_order: sort--,
    });

    if (pr.oldSlug && pr.oldSlug !== pr.slug && products.get(pr.oldSlug)) {
      products.delete(pr.oldSlug);
    }
    products.set(pr.slug, row);

    await setCategories(row.id, [CAT.frame]);
    const storyIds = pr.storySlugs
      .map((s) => stories.get(s))
      .filter(Boolean);
    await setStories(row.id, storyIds);
    await replaceVariants(row.id, [
      {
        name: `${pr.dimensions}`,
        sku: `${pr.storyNumber}`,
        status: "active",
        inventory_type: "unlimited",
      },
    ]);
    console.log("print ok", pr.slug, existing ? "(updated)" : "(created)");
  }

  console.log("\n=== T-SHIRTS (6 drafts @ £39) ===");
  sort = 80;
  for (const tee of TEES) {
    const existing = products.get(tee.slug);
    const id = existing?.id ?? randomUUID();
    const short = `${TEE_SHARED_SHORT} Colour: ${tee.colour}.`;
    const row = await upsertProduct(existing, {
      id,
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
      status: "draft",
      sort_order: sort--,
    });
    products.set(tee.slug, row);
    await setCategories(row.id, [CAT.wear]);
    const storyIds = tee.storySlugs
      .map((s) => stories.get(s))
      .filter(Boolean);
    await setStories(row.id, storyIds);
    await replaceVariants(
      row.id,
      ["S", "M", "L", "XL"].map((size) => ({
        name: `Size ${size} · ${tee.colour}`,
        sku: `${tee.code}-${size}`,
        status: "draft",
        inventory_type: "unlimited",
        qty: null,
      })),
    );
    console.log("tee ok", tee.slug, existing ? "(updated)" : "(created)");
  }

  console.log("\n=== COFFEE New Page ===");
  {
    const existing = products.get("new-page");
    const id = existing?.id ?? randomUUID();
    const row = await upsertProduct(existing, {
      id,
      title: "Espresso Blend",
      slug: "new-page",
      short_description: COFFEE_SHORT,
      full_description: COFFEE_FULL,
      price_gbp: 16.5,
      story_number: "COFFEE-NEW-PAGE",
      product_type: "coffee",
      medium: "Specialty coffee · roasted in Peckham",
      dimensions: null,
      weight: "TBC (confirm bag weight with roaster)",
      profit_share_note: PROFIT,
      impact_note: IMPACT,
      inventory_type: "unlimited",
      inventory_quantity: null,
      status: "active",
      sort_order: 100,
    });
    await setCategories(row.id, [CAT.drink]);
    await setStories(row.id, []);
    await replaceVariants(row.id, [
      { name: "Whole beans", sku: "COFFEE-NEW-PAGE-BEANS", status: "active" },
      {
        name: "Ground - Filter",
        sku: "COFFEE-NEW-PAGE-FILTER",
        status: "active",
      },
      {
        name: "Ground - Cafetière",
        sku: "COFFEE-NEW-PAGE-FP",
        status: "active",
      },
    ]);
    console.log("coffee ok new-page");
  }

  const left = await api(
    "GET",
    "products?select=slug,title,status,price_gbp,product_type&order=product_type,title",
  );
  console.log("\n=== CATALOG NOW ===");
  for (const p of left) {
    console.log(
      `${p.status.padEnd(6)} ${String(p.product_type || "-").padEnd(10)} £${p.price_gbp}  ${p.slug} — ${p.title}`,
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
