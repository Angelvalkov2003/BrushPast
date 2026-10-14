/**
 * Align print ↔ story links with Jeremy's catalogue list.
 * Does not overwrite product titles/descriptions beyond link metadata + known images.
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
const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } },
);

/** Jeremy's mapping: product slug → story slugs (+ optional workshop / image). */
const MAP = [
  {
    slug: "hope",
    storySlugs: [], // Evolve T-shirt workshop (Workshop No.1), not Karl
    workshopSlug: "workshop-no-1",
    title: "Hope",
    short_description:
      "Print from the Evolve T-shirt workshop (Workshop No.1).",
    qr: "https://brushpast.org/workshops/workshop-no-1",
  },
  {
    slug: "pollen-ate",
    storySlugs: ["ed-beerbohm"],
    title: "Pollen-ate",
    short_description: "Print by Ed Beerbohm.",
    qr: "https://brushpast.org/stories/ed-beerbohm",
    // Confirmed: mural with "POLLEN -ATE" speech bubble
    image: "/stories/ED-BEERBOHM/3.webp",
  },
  {
    slug: "fish-out-of-water",
    storySlugs: ["ed-beerbohm"],
    title: "Fish Out of Water",
    short_description: "Print by Ed Beerbohm.",
    qr: "https://brushpast.org/stories/ed-beerbohm",
  },
  {
    slug: "alternative-vista",
    storySlugs: ["ed-beerbohm"],
    title: "Alternative Vista",
    short_description: "Print by Ed Beerbohm.",
    qr: "https://brushpast.org/stories/ed-beerbohm",
  },
  {
    slug: "fish-might-chat",
    storySlugs: ["ed-beerbohm"],
    title: "Fish Might Chat",
    short_description: "Print by Ed Beerbohm.",
    qr: "https://brushpast.org/stories/ed-beerbohm",
  },
  {
    slug: "beyond-the-walls",
    storySlugs: ["ed-beerbohm"],
    title: "Beyond the Walls",
    short_description: "Print by Ed Beerbohm.",
    qr: "https://brushpast.org/stories/ed-beerbohm",
  },
  {
    slug: "human-beans",
    storySlugs: ["bobby"],
    title: "Human Beans",
    short_description: "Print linked to Bobby’s story.",
    qr: "https://brushpast.org/stories/bobby",
    image: "/stories/bobby/human-beans.jpg",
  },
  {
    slug: "sons-of-anarchy",
    storySlugs: ["bobby"],
    title: "Sons of Anarchy",
    short_description: "Print linked to Bobby’s story.",
    qr: "https://brushpast.org/stories/bobby",
  },
  {
    slug: "chemistry",
    storySlugs: ["maimouna"],
    title: "Chemistry",
    short_description: "Print linked to Maimouna / Mighty Culture.",
    qr: "https://brushpast.org/stories/maimouna",
    image: "/stories/maimouna/2.webp",
  },
  {
    slug: "mighty-culture",
    storySlugs: ["maimouna"],
    title: "Mighty Culture",
    short_description: "Print linked to Maimouna / Mighty Culture.",
    qr: "https://brushpast.org/stories/maimouna",
    image: "/stories/maimouna/1.webp",
  },
  {
    slug: "sandra-print",
    storySlugs: ["sandra", "karl"],
    title: "Sandra",
    short_description:
      "Portrait print — Sandra (not Jess), from Karl Rudziak’s work.",
    qr: "https://brushpast.org/stories/sandra",
    image: "/stories/KARL/sandra.jpg",
  },
  {
    slug: "jed-print",
    storySlugs: ["jed", "karl"],
    title: "Jed",
    short_description: "Portrait print — Jed, from Karl Rudziak’s work.",
    qr: "https://brushpast.org/stories/jed",
    image: "/stories/KARL/jed.jpg",
  },
  {
    slug: "glimpse-of-light",
    storySlugs: ["little-george"],
    title: "Glimpse of Light",
    short_description: "Print by Little George.",
    qr: "https://brushpast.org/stories/little-george",
    image: "/stories/littleGeorge/1.webp",
  },
];

async function main() {
  const { data: stories, error: sErr } = await supabase
    .from("stories")
    .select("id, slug");
  if (sErr) throw sErr;
  const storyId = new Map((stories ?? []).map((s) => [s.slug, s.id]));

  const { data: workshops, error: wErr } = await supabase
    .from("workshops")
    .select("id, slug");
  if (wErr) throw wErr;
  const workshopId = new Map((workshops ?? []).map((w) => [w.slug, w.id]));

  for (const row of MAP) {
    const { data: product, error: pErr } = await supabase
      .from("products")
      .select("id, slug, main_image_url, short_description")
      .eq("slug", row.slug)
      .maybeSingle();
    if (pErr) throw pErr;
    if (!product) {
      console.warn(`MISSING product: ${row.slug}`);
      continue;
    }

    const patch = {
      title: row.title,
      qr_story_url: row.qr,
      product_type: "print",
      status: "active",
      short_description:
        product.short_description?.trim() || row.short_description,
      workshop_id: row.workshopSlug
        ? (workshopId.get(row.workshopSlug) ?? null)
        : null,
    };
    if (!product.main_image_url && row.image) {
      patch.main_image_url = row.image;
    }

    const { error: uErr } = await supabase
      .from("products")
      .update(patch)
      .eq("id", product.id);
    if (uErr) throw uErr;

    // Replace story links exactly
    const { error: delErr } = await supabase
      .from("product_stories")
      .delete()
      .eq("product_id", product.id);
    if (delErr) throw delErr;

    for (const slug of row.storySlugs) {
      const sid = storyId.get(slug);
      if (!sid) {
        console.warn(`  missing story ${slug} for ${row.slug}`);
        continue;
      }
      const { error: linkErr } = await supabase.from("product_stories").insert({
        product_id: product.id,
        story_id: sid,
      });
      if (linkErr) throw linkErr;
    }

    console.log(
      `OK ${row.slug} → [${row.storySlugs.join(", ") || "workshop only"}]${
        patch.main_image_url ? " +image" : ""
      }`,
    );
  }

  console.log("\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
