/**
 * One-shot: upsert print products + story stubs + light date/price fixes.
 * Does NOT overwrite story page copy in the app — only Supabase listing rows.
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";

function loadEnvLocal() {
  const raw = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
  const env = {};
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!m) continue;
    env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
  }
  return env;
}

const env = loadEnvLocal();
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const FRAME_CATEGORY = "44444444-4444-4444-8444-444444444403";
const DRINK_CATEGORY = "44444444-4444-4444-8444-444444444402";
const PRINT_PRICE = 28;

/** Minimal story listing rows for portrait pages that already exist in the app. */
const STORY_STUBS = [
  {
    title: "Sandra",
    slug: "sandra",
    short_description: "Once I met Sandra, I knew I had to paint her.",
    page_url: "/stories/sandra",
    image_url: "/stories/KARL/sandra.jpg",
    tags: ["art", "portraiture", "community-stories"],
    sort_order: 56,
  },
  {
    title: "Jed",
    slug: "jed",
    short_description: "Jed — a healer and a lovely human being.",
    page_url: "/stories/jed",
    image_url: "/stories/KARL/jed.jpg",
    tags: ["art", "portraiture", "community-stories"],
    sort_order: 55,
  },
];

/**
 * Print products — no images (upload later in admin).
 * storySlugs: existing / stub story slugs to link via product_stories.
 */
const PRINTS = [
  {
    title: "Hope",
    slug: "hope",
    storySlugs: ["karl"],
    short_description: "Print from Karl’s world of portraits and conversations.",
  },
  {
    title: "Pollen Ate",
    slug: "pollen-ate",
    storySlugs: [],
    short_description: "Brush Past print — artwork title awaiting final credit.",
  },
  {
    title: "Human Beans",
    slug: "human-beans",
    storySlugs: ["bobby"],
    short_description: "Print linked to Bobby’s story.",
  },
  {
    title: "Chemistry",
    slug: "chemistry",
    storySlugs: [],
    short_description: "Brush Past print — artwork title awaiting final credit.",
  },
  {
    title: "Fish Out of Water",
    slug: "fish-out-of-water",
    storySlugs: [],
    short_description: "Brush Past print — artwork title awaiting final credit.",
  },
  {
    title: "Sandra",
    slug: "sandra-print",
    storySlugs: ["sandra", "karl"],
    short_description: "Portrait print — Sandra, from Karl Rudziak’s work.",
  },
  {
    title: "Sons of Anarchy",
    slug: "sons-of-anarchy",
    storySlugs: ["bobby"],
    short_description: "Print linked to Bobby’s story.",
  },
  {
    title: "Mighty Culture",
    slug: "mighty-culture",
    storySlugs: ["maimouna"],
    short_description: "Print linked to Maimouna / Mighty Culture.",
  },
  {
    title: "Jed",
    slug: "jed-print",
    storySlugs: ["jed", "karl"],
    short_description: "Portrait print — Jed, from Karl Rudziak’s work.",
  },
  {
    title: "Alternative Vista",
    slug: "alternative-vista",
    storySlugs: ["ed-beerbohm"],
    short_description: "Print by Ed Beerbohm.",
  },
  {
    title: "Fish Might Chat",
    slug: "fish-might-chat",
    storySlugs: ["ed-beerbohm"],
    short_description: "Print by Ed Beerbohm.",
  },
  {
    title: "Glimpse of Light",
    slug: "glimpse-of-light",
    storySlugs: ["little-george"],
    short_description: "Print by Little George.",
  },
  {
    title: "Beyond the Walls",
    slug: "beyond-the-walls",
    storySlugs: ["ed-beerbohm"],
    short_description: "Print by Ed Beerbohm.",
  },
];

async function upsertStoryStub(stub) {
  const { data: existing, error: findErr } = await supabase
    .from("stories")
    .select("id, slug")
    .eq("slug", stub.slug)
    .maybeSingle();
  if (findErr) throw findErr;
  if (existing) {
    console.log(`story exists: ${stub.slug}`);
    return existing;
  }
  const { data, error } = await supabase
    .from("stories")
    .insert({
      ...stub,
      is_anonymous: false,
      status: "active",
    })
    .select("id, slug")
    .single();
  if (error) throw error;
  console.log(`story created: ${stub.slug}`);
  return data;
}

async function upsertPrint(print, storyIdBySlug) {
  const payload = {
    title: print.title,
    slug: print.slug,
    short_description: print.short_description,
    full_description: null,
    main_image_url: null,
    price_gbp: PRINT_PRICE,
    product_type: "print",
    medium: "print",
    qr_story_url:
      print.storySlugs[0] != null
        ? `https://brushpast.org/stories/${print.storySlugs[0]}`
        : null,
    inventory_type: "unlimited",
    inventory_quantity: null,
    status: "active",
    sort_order: 40,
  };

  const { data: existing, error: findErr } = await supabase
    .from("products")
    .select("id, slug, main_image_url, short_description, full_description")
    .eq("slug", print.slug)
    .maybeSingle();
  if (findErr) throw findErr;

  let productId;
  if (existing) {
    // Keep any admin-uploaded image and any fuller descriptions already written.
    const { data, error } = await supabase
      .from("products")
      .update({
        title: payload.title,
        price_gbp: payload.price_gbp,
        product_type: payload.product_type,
        medium: payload.medium,
        qr_story_url: payload.qr_story_url,
        status: "active",
        short_description:
          existing.short_description?.trim() || payload.short_description,
        main_image_url: existing.main_image_url,
      })
      .eq("id", existing.id)
      .select("id, slug")
      .single();
    if (error) throw error;
    productId = data.id;
    console.log(`product updated: ${print.slug}`);
  } else {
    const { data, error } = await supabase
      .from("products")
      .insert(payload)
      .select("id, slug")
      .single();
    if (error) throw error;
    productId = data.id;
    console.log(`product created: ${print.slug}`);
  }

  // Category frame-the-story
  const { error: catErr } = await supabase.from("product_categories").upsert(
    { product_id: productId, category_id: FRAME_CATEGORY },
    { onConflict: "product_id,category_id" },
  );
  if (catErr) throw catErr;

  // Default variant (no price override — box uses category £28)
  const { data: variants, error: varFindErr } = await supabase
    .from("product_variants")
    .select("id")
    .eq("product_id", productId);
  if (varFindErr) throw varFindErr;
  if (!variants?.length) {
    const sku = `BP-PRT-${print.slug.slice(0, 12).toUpperCase().replace(/-/g, "")}`;
    const { error: varErr } = await supabase.from("product_variants").insert({
      product_id: productId,
      variant_name: "Standard",
      inventory_type: "unlimited",
      sku,
      price_override: null,
      status: "active",
      sort_order: 0,
    });
    if (varErr) throw varErr;
  }

  // Story links
  for (const storySlug of print.storySlugs) {
    const storyId = storyIdBySlug.get(storySlug);
    if (!storyId) {
      console.warn(`  missing story for link: ${storySlug}`);
      continue;
    }
    const { error: linkErr } = await supabase.from("product_stories").upsert(
      { product_id: productId, story_id: storyId },
      { onConflict: "product_id,story_id" },
    );
    if (linkErr) throw linkErr;
    console.log(`  linked -> ${storySlug}`);
  }
}

async function fixCoffee() {
  const { data: coffee, error } = await supabase
    .from("products")
    .select("id")
    .eq("slug", "coffee")
    .maybeSingle();
  if (error) throw error;
  if (!coffee) {
    console.log("coffee product not found — skip");
    return;
  }
  const { error: updErr } = await supabase
    .from("products")
    .update({
      price_gbp: 16,
      product_type: "coffee",
      status: "active",
      title: "Coffee",
    })
    .eq("id", coffee.id);
  if (updErr) throw updErr;
  const { error: catErr } = await supabase.from("product_categories").upsert(
    { product_id: coffee.id, category_id: DRINK_CATEGORY },
    { onConflict: "product_id,category_id" },
  );
  if (catErr) throw catErr;
  console.log("coffee price -> £16 + drink-the-story category");
}

async function draftDummies() {
  const { data, error } = await supabase
    .from("products")
    .update({ status: "draft" })
    .or("slug.like.dummy-%,slug.eq.test123")
    .select("slug");
  if (error) throw error;
  console.log(
    `drafted placeholders: ${(data ?? []).map((r) => r.slug).join(", ") || "(none)"}`,
  );
}

async function fixJournalDates() {
  // Distinct publication moments — does not change titles/bodies.
  const dates = {
    "kettle-gallery": "2026-03-01T10:00:00.000Z",
    "cotton-gardens-photography-workshop": "2026-04-12T10:00:00.000Z",
    "groundswell-x-brushpast": "2026-05-08T10:00:00.000Z",
    "something-to-take-off-the-edge": "2026-06-02T10:00:00.000Z",
  };
  for (const [slug, created_at] of Object.entries(dates)) {
    const { error } = await supabase
      .from("journal_posts")
      .update({ created_at })
      .eq("slug", slug);
    if (error) throw error;
    console.log(`journal date ${slug} -> ${created_at.slice(0, 10)}`);
  }
}

async function main() {
  const storyIdBySlug = new Map();

  for (const stub of STORY_STUBS) {
    const row = await upsertStoryStub(stub);
    storyIdBySlug.set(row.slug, row.id);
  }

  const { data: stories, error: storiesErr } = await supabase
    .from("stories")
    .select("id, slug");
  if (storiesErr) throw storiesErr;
  for (const s of stories ?? []) storyIdBySlug.set(s.slug, s.id);

  for (const print of PRINTS) {
    await upsertPrint(print, storyIdBySlug);
  }

  await fixCoffee();
  await draftDummies();
  await fixJournalDates();

  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
